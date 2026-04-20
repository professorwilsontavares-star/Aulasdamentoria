-- ══════════════════════════════════════════════
-- CRIAR TABELA metas
-- ══════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.metas (
  id            BIGSERIAL PRIMARY KEY,
  plano         TEXT NOT NULL,
  ordem_plano   INTEGER NOT NULL,
  disciplina    TEXT,
  assunto       TEXT,
  disciplina_norm TEXT,
  assunto_norm  TEXT,
  item_edital   TEXT,
  dica          TEXT,
  link_resumo   TEXT,
  link_caderno  TEXT,
  link_orientacao TEXT,
  ativo         BOOLEAN DEFAULT true
);

-- ══════════════════════════════════════════════
-- HABILITAR LEITURA PÚBLICA (Row Level Security)
-- ══════════════════════════════════════════════
ALTER TABLE public.metas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Leitura pública de metas" ON public.metas;
CREATE POLICY "Leitura pública de metas"
  ON public.metas
  FOR SELECT
  USING (true);

-- ══════════════════════════════════════════════
-- INSERIR DADOS DO PLANO RFB
-- ══════════════════════════════════════════════
INSERT INTO public.metas (plano, ordem_plano, disciplina, assunto, disciplina_norm, assunto_norm, item_edital, dica, link_resumo, link_caderno, link_orientacao, ativo) VALUES
-- Semana 1
('RFB', 1,  'Direito Tributário',   'Imunidades Tributárias',      'direito tributario',   'imunidades tributarias',      '1.1', NULL, 'https://drive.google.com/file/d/1l9N-62SceHe8MOnDuMnXpQLo7nWJdrwt/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5n19W', 'https://drive.google.com/file/d/1l9N-62SceHe8MOnDuMnXpQLo7nWJdrwt/view?usp=sharing', true),
('RFB', 2,  'Direito Tributário',   'Princípios Tributários',       'direito tributario',   'principios tributarios',      '1.2', NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5mu0O', 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', true),
('RFB', 3,  'Direito Tributário',   'Competência Tributária',       'direito tributario',   'competencia tributaria',      '1.3', NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5mu1d', 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', true),
('RFB', 4,  'Direito Tributário',   'Crédito Tributário',           'direito tributario',   'credito tributario',          '2.1', NULL, 'https://drive.google.com/file/d/1pzL_tqCgpx7_SJAcx4PijNj3gM8ttm4x/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5mu55', 'https://drive.google.com/file/d/1pzL_tqCgpx7_SJAcx4PijNj3gM8ttm4x/view?usp=sharing', true),
('RFB', 5,  'AFO',                  'PPA',                          'afo',                  'ppa',                         '4.1', NULL, 'https://drive.google.com/file/d/1Bk-TzIt8d7GlxZjmG6MQeE-ffz_qbFgK/view?usp=drive_link', 'https://www.tecconcursos.com.br/s/Q5mu4U', 'https://drive.google.com/file/d/1Bk-TzIt8d7GlxZjmG6MQeE-ffz_qbFgK/view?usp=drive_link', true),
('RFB', 6,  'AFO',                  'LDO',                          'afo',                  'ldo',                         '4.2', NULL, NULL, 'https://www.tecconcursos.com.br/s/Q5n19W', 'https://drive.google.com/file/d/1itT1nZ1BGH-rvhUN7Mq7oyCisnGfvkzO/view?usp=sharing', true),
('RFB', 7,  'Direito Constitucional','Direitos Fundamentais',       'direito constitucional','direitos fundamentais',       '8.1', NULL, NULL, 'https://www.tecconcursos.com.br/s/Q5mu0O', NULL, true),
('RFB', 8,  'Direito Constitucional','Organização do Estado',       'direito constitucional','organizacao do estado',       '8.2', NULL, 'https://drive.google.com/file/d/1l9N-62SceHe8MOnDuMnXpQLo7nWJdrwt/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5mu1d', NULL, true),
('RFB', 9,  'Português',            'Concordância Verbal',          'portugues',            'concordancia verbal',         '9.1', NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5mu55', NULL, true),
('RFB', 10, 'Português',            'Regência',                     'portugues',            'regencia',                    '9.2', NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5mu4U', NULL, true),
('RFB', 11, 'Raciocínio Lógico',   'Proposições',                  'raciocinio logico',    'proposicoes',                 '10.1', NULL, 'https://drive.google.com/file/d/1pzL_tqCgpx7_SJAcx4PijNj3gM8ttm4x/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5n19W', 'https://drive.google.com/file/d/1l9N-62SceHe8MOnDuMnXpQLo7nWJdrwt/view?usp=sharing', true),
('RFB', 12, 'Raciocínio Lógico',   'Equivalências',                'raciocinio logico',    'equivalencias',               '10.2', NULL, 'https://drive.google.com/file/d/1Bk-TzIt8d7GlxZjmG6MQeE-ffz_qbFgK/view?usp=drive_link', 'https://www.tecconcursos.com.br/s/Q5mu0O', 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', true),
('RFB', 13, 'Contabilidade Geral', 'Balanço Patrimonial',          'contabilidade geral',  'balanco patrimonial',         '7.1', NULL, 'https://drive.google.com/file/d/1itT1nZ1BGH-rvhUN7Mq7oyCisnGfvkzO/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5mu1d', 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', true),
('RFB', 14, 'Contabilidade Geral', 'DRE',                          'contabilidade geral',  'dre',                         '7.2', NULL, NULL, 'https://www.tecconcursos.com.br/s/Q5mu55', 'https://drive.google.com/file/d/1pzL_tqCgpx7_SJAcx4PijNj3gM8ttm4x/view?usp=sharing', true),
-- Semana 2 (ordem_plano reinicia em 1 por semana, mas no banco precisamos de sequência global)
('RFB', 15, 'Direito Tributário',   'Obrigação Tributária',         'direito tributario',   'obrigacao tributaria',        '2.2', NULL, NULL, 'https://www.tecconcursos.com.br/s/Q5mu4U', 'https://drive.google.com/file/d/1Bk-TzIt8d7GlxZjmG6MQeE-ffz_qbFgK/view?usp=drive_link', true),
('RFB', 16, 'Direito Tributário',   'ICMS',                         'direito tributario',   'icms',                        '3.1', NULL, NULL, 'https://www.tecconcursos.com.br/s/Q5n19W', 'https://drive.google.com/file/d/1itT1nZ1BGH-rvhUN7Mq7oyCisnGfvkzO/view?usp=sharing', true),
('RFB', 17, 'Direito Tributário',   'ISS',                          'direito tributario',   'iss',                         '3.2', NULL, NULL, 'https://www.tecconcursos.com.br/s/Q5mu0O', NULL, true),
('RFB', 18, 'AFO',                  'LOA',                          'afo',                  'loa',                         '4.3', NULL, NULL, 'https://www.tecconcursos.com.br/s/Q5mu55', NULL, true),
('RFB', 19, 'AFO',                  'Ciclo Orçamentário',           'afo',                  'ciclo orcamentario',          '4.4', NULL, NULL, 'https://www.tecconcursos.com.br/s/Q5mu4U', NULL, true),
('RFB', 20, 'Direito Constitucional','Processo Legislativo',        'direito constitucional','processo legislativo',        '8.3', NULL, 'https://drive.google.com/file/d/1l9N-62SceHe8MOnDuMnXpQLo7nWJdrwt/view?usp=sharing', NULL, NULL, true),
('RFB', 21, 'Direito Constitucional','Controle de Constitucionalidade','direito constitucional','controle de constitucionalidade','8.4', NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', NULL, NULL, true),
('RFB', 22, 'Português',            'Crase',                        'portugues',            'crase',                       '9.3', NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', NULL, NULL, true),
('RFB', 23, 'Português',            'Pontuação',                    'portugues',            'pontuacao',                   '9.4', NULL, 'https://drive.google.com/file/d/1pzL_tqCgpx7_SJAcx4PijNj3gM8ttm4x/view?usp=sharing', NULL, NULL, true),
('RFB', 24, 'Raciocínio Lógico',   'Probabilidade',                'raciocinio logico',    'probabilidade',               '10.3', NULL, 'https://drive.google.com/file/d/1Bk-TzIt8d7GlxZjmG6MQeE-ffz_qbFgK/view?usp=drive_link', NULL, NULL, true),
('RFB', 25, 'Raciocínio Lógico',   'Análise Combinatória',         'raciocinio logico',    'analise combinatoria',        '10.4', NULL, NULL, NULL, NULL, true),
('RFB', 26, 'Contabilidade Geral', 'Escrituração',                 'contabilidade geral',  'escrituracao',                '7.3', NULL, NULL, NULL, 'https://drive.google.com/file/d/1l9N-62SceHe8MOnDuMnXpQLo7nWJdrwt/view?usp=sharing', true),
('RFB', 27, 'Contabilidade Geral', 'Patrimônio Líquido',           'contabilidade geral',  'patrimonio liquido',          '7.4', NULL, NULL, NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', true),
('RFB', 28, 'Direito Tributário',   'ICMS V2',                      'direito tributario',   'icms v2',                     '3.1', NULL, NULL, NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', true),
('RFB', 29, 'Direito Tributário',   'ISS V2',                       'direito tributario',   'iss v2',                      '3.2', NULL, NULL, NULL, 'https://drive.google.com/file/d/1pzL_tqCgpx7_SJAcx4PijNj3gM8ttm4x/view?usp=sharing', true),
('RFB', 30, 'Direito Tributário',   'ITBI V2',                      'direito tributario',   'itbi v2',                     '3.3', NULL, NULL, NULL, 'https://drive.google.com/file/d/1Bk-TzIt8d7GlxZjmG6MQeE-ffz_qbFgK/view?usp=drive_link', true),
('RFB', 31, 'Direito Tributário',   'Crédito Tributário V2',        'direito tributario',   'credito tributario v2',       '2.1', NULL, NULL, 'https://link/c32', 'https://drive.google.com/file/d/1itT1nZ1BGH-rvhUN7Mq7oyCisnGfvkzO/view?usp=sharing', true),
('RFB', 32, 'AFO',                  'PPA V2',                       'afo',                  'ppa v2',                      '4.1', NULL, NULL, 'https://link/c33', NULL, true),
('RFB', 33, 'AFO',                  'LDO V2',                       'afo',                  'ldo v2',                      '4.2', NULL, NULL, 'https://link/c34', NULL, true),
('RFB', 34, 'Direito Constitucional','Direitos Fundamentais V2',    'direito constitucional','direitos fundamentais v2',    '8.1', NULL, NULL, 'https://link/c35', NULL, true),
-- Semana 3
('RFB', 35, 'Português',            'Concordância V2',              'portugues',            'concordancia v2',             '9.1', NULL, 'https://drive.google.com/file/d/1l9N-62SceHe8MOnDuMnXpQLo7nWJdrwt/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5mu55', 'https://drive.google.com/file/d/1l9N-62SceHe8MOnDuMnXpQLo7nWJdrwt/view?usp=sharing', true),
('RFB', 36, 'Português',            'Regência V2',                  'portugues',            'regencia v2',                 '9.2', NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5mu4U', 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', true),
('RFB', 37, 'Raciocínio Lógico',   'Proposições V2',               'raciocinio logico',    'proposicoes v2',              '10.1', NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5n19W', 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', true),
('RFB', 38, 'Raciocínio Lógico',   'Equivalências V2',             'raciocinio logico',    'equivalencias v2',            '10.2', NULL, 'https://drive.google.com/file/d/1pzL_tqCgpx7_SJAcx4PijNj3gM8ttm4x/view?usp=sharing', 'https://www.tecconcursos.com.br/s/Q5mu0O', 'https://drive.google.com/file/d/1pzL_tqCgpx7_SJAcx4PijNj3gM8ttm4x/view?usp=sharing', true),
('RFB', 39, 'Contabilidade Geral', 'Balanço V2',                   'contabilidade geral',  'balanco v2',                  '7.1', NULL, 'https://drive.google.com/file/d/1Bk-TzIt8d7GlxZjmG6MQeE-ffz_qbFgK/view?usp=drive_link', 'https://link/c41', 'https://drive.google.com/file/d/1Bk-TzIt8d7GlxZjmG6MQeE-ffz_qbFgK/view?usp=drive_link', true),
('RFB', 40, 'Contabilidade Geral', 'DRE V2',                       'contabilidade geral',  'dre v2',                      '7.2', NULL, NULL, 'https://link/c42', 'https://drive.google.com/file/d/1itT1nZ1BGH-rvhUN7Mq7oyCisnGfvkzO/view?usp=sharing', true),
('RFB', 41, 'Direito Tributário',   'Imunidades V2',                'direito tributario',   'imunidades v2',               '1.1', NULL, NULL, 'https://link/c43', NULL, true),
('RFB', 42, 'Direito Tributário',   'Princípios V2',                'direito tributario',   'principios v2',               '1.2', NULL, NULL, 'https://link/c44', NULL, true),
('RFB', 43, 'Direito Tributário',   'Competência V2',               'direito tributario',   'competencia v2',              '1.3', NULL, 'https://drive.google.com/file/d/1l9N-62SceHe8MOnDuMnXpQLo7nWJdrwt/view?usp=sharing', 'https://link/c45', NULL, true),
('RFB', 44, 'Direito Tributário',   'Obrigação V2',                 'direito tributario',   'obrigacao v2',                '2.2', NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', 'https://link/c46', NULL, true),
('RFB', 45, 'AFO',                  'LOA V2',                       'afo',                  'loa v2',                      '4.3', NULL, 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', 'https://link/c47', NULL, true),
('RFB', 46, 'AFO',                  'Ciclo V2',                     'afo',                  'ciclo v2',                    '4.4', NULL, 'https://drive.google.com/file/d/1pzL_tqCgpx7_SJAcx4PijNj3gM8ttm4x/view?usp=sharing', 'https://link/c48', NULL, true),
('RFB', 47, 'Direito Constitucional','Processo V2',                 'direito constitucional','processo v2',                 '8.3', NULL, 'https://drive.google.com/file/d/1Bk-TzIt8d7GlxZjmG6MQeE-ffz_qbFgK/view?usp=drive_link', 'https://www.tecconcursos.com.br/s/Q5mu55', 'https://drive.google.com/file/d/1l9N-62SceHe8MOnDuMnXpQLo7nWJdrwt/view?usp=sharing', true),
('RFB', 48, 'Direito Constitucional','Organização V2',              'direito constitucional','organizacao v2',              '8.2', NULL, NULL, 'https://www.tecconcursos.com.br/s/Q5mu4U', 'https://drive.google.com/file/d/1uhUAArs8eps_jMn-rmqPWYTmF6DNU6LN/view?usp=sharing', true);
