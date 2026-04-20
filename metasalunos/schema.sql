-- ==========================================
-- ESTRUTURA DE BANCO DE DADOS (SUPABASE)
-- Aplicativo: Metas Alunos
-- ==========================================

-- 1. TABELAS
CREATE TABLE alunos (
  id uuid primary key references auth.users(id),
  nome text not null,
  metas_por_dia int not null check (metas_por_dia in (4, 5)),
  data_inicio date not null default current_date
);

CREATE TABLE metas (
  id serial primary key,
  ordem_global int not null unique,
  disciplina text not null,
  descricao text not null
);

CREATE TABLE respostas (
  id serial primary key,
  aluno_id uuid references alunos(id),
  meta_id int references metas(id),
  qtd_questoes int not null check (qtd_questoes > 0),
  qtd_acertos int not null check (qtd_acertos >= 0 AND qtd_acertos <= qtd_questoes),
  link_erros text,
  created_at timestamp default now(),
  unique(aluno_id, meta_id)
);

CREATE TABLE resumo_dia (
  id serial primary key,
  aluno_id uuid references alunos(id),
  dia int not null,
  total_questoes int not null default 0,
  total_acertos int not null default 0,
  unique(aluno_id, dia)
);

-- ==========================================
-- 2. FUNÇÕES RPC (Regras de Negócio no Back)
-- ==========================================

-- A) BUSCAR METAS DO DIA ATUAL
-- Resolve dias passados, determina o lote de metas e cruza com as respostas
CREATE OR REPLACE FUNCTION get_metas_hoje(p_aluno uuid)
RETURNS TABLE (
  meta_id int,
  ordem_global int,
  disciplina text,
  descricao text,
  concluida boolean,
  resp_questoes int,
  resp_acertos int,
  resp_link_erros text
) AS $$
DECLARE
  v_inicio_data date;
  v_metas_dia int;
  v_dia_atual int;
  v_ordem_inicio int;
  v_ordem_fim int;
BEGIN
  -- Busca config do aluno
  SELECT data_inicio, metas_por_dia INTO v_inicio_data, v_metas_dia 
  FROM alunos WHERE id = p_aluno;
  
  -- Se aluno não existe, joga erro
  IF NOT FOUND THEN
      RAISE EXCEPTION 'Aluno não encontrado ou não configurado.';
  END IF;

  -- O dia atual é os dias passados desde o início do cronograma + 1
  v_dia_atual := (CURRENT_DATE - v_inicio_data) + 1;
  IF v_dia_atual < 1 THEN
      v_dia_atual := 1;
  END IF;

  -- Calcular range de metas pela ordem global
  v_ordem_inicio := (v_dia_atual - 1) * v_metas_dia + 1;
  v_ordem_fim := v_ordem_inicio + v_metas_dia - 1;

  -- Retornar as metas deste range, junto ao status preenchido
  RETURN QUERY
  SELECT 
    m.id AS meta_id,
    m.ordem_global,
    m.disciplina,
    m.descricao,
    (r.id IS NOT NULL) AS concluida,
    r.qtd_questoes AS resp_questoes,
    r.qtd_acertos AS resp_acertos,
    r.link_erros AS resp_link_erros
  FROM metas m
  LEFT JOIN respostas r ON r.meta_id = m.id AND r.aluno_id = p_aluno
  WHERE m.ordem_global BETWEEN v_ordem_inicio AND v_ordem_fim
  ORDER BY m.ordem_global ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- B) ESTATÍSTICAS E CLASSIFICAÇÃO
-- Faz o SUM universal para este UUID
CREATE OR REPLACE FUNCTION get_estatisticas_aluno(p_aluno uuid)
RETURNS TABLE (
  total_q int,
  total_a int,
  perc numeric,
  classif text
) AS $$
DECLARE
  v_questoes int;
  v_acertos int;
  v_per numeric;
  v_texto text;
BEGIN
  SELECT COALESCE(SUM(qtd_questoes), 0), COALESCE(SUM(qtd_acertos), 0)
  INTO v_questoes, v_acertos
  FROM respostas
  WHERE aluno_id = p_aluno;

  IF v_questoes = 0 THEN
      v_per := 0;
  ELSE
      v_per := ROUND((v_acertos::numeric / v_questoes::numeric) * 100, 1);
  END IF;

  IF v_per > 81.0 THEN
      v_texto := 'Excelente';
  ELSIF v_per >= 75.0 AND v_per <= 81.0 THEN
      v_texto := 'Ótimo';
  ELSE
      v_texto := 'Bom trabalho';
  END IF;

  RETURN QUERY SELECT v_questoes, v_acertos, v_per, v_texto;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==========================================
-- 3. TRIGGERS (Agregação Automática)
-- ==========================================
-- Conforme regra 11: Quando preencher, deve atualizar/inserir em resumo_dia
CREATE OR REPLACE FUNCTION atualiza_resumo_dia_tg()
RETURNS TRIGGER AS $$
DECLARE
   v_dia_atual int;
   v_inicio_data date;
BEGIN
   -- descobrir o dia logico (data_inicio vs data de inserção da resposta)
   SELECT data_inicio INTO v_inicio_data FROM alunos WHERE id = NEW.aluno_id;
   
   -- Aqui definimos o 'dia' como a diferença em relação à data fixada do aluno
   v_dia_atual := (CURRENT_DATE - v_inicio_data) + 1;
   IF v_dia_atual < 1 THEN v_dia_atual := 1; END IF;

   -- Realizar UPSERT (Se existe, soma. Se não, insere).
   INSERT INTO resumo_dia (aluno_id, dia, total_questoes, total_acertos)
   VALUES (NEW.aluno_id, v_dia_atual, NEW.qtd_questoes, NEW.qtd_acertos)
   ON CONFLICT (aluno_id, dia)
   DO UPDATE SET 
      total_questoes = resumo_dia.total_questoes + EXCLUDED.total_questoes,
      total_acertos = resumo_dia.total_acertos + EXCLUDED.total_acertos;

   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tg_agregacao_respostas
AFTER INSERT ON respostas
FOR EACH ROW EXECUTE FUNCTION atualiza_resumo_dia_tg();
