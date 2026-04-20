// ==========================================
// CONFIGURAÇÃO SUPABASE
// ==========================================
// Substitua pelas credenciais do seu projeto Supabase Real
const SUPABASE_URL = 'https://sua-url-aqui.supabase.co';
const SUPABASE_KEY = 'sua-anon-key-aqui';

let supabase;
try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
} catch(e) {
    console.error("Supabase inativo no modo MOCK");
}

let usuarioAtivo = { id: 'mock-uuid-123' }; // Fixado mock direto
let metasDoDia = [];
let respondidasCache = new Set();
let metaSelecionada = null;
let configLocalEmMock = { metas: 4 }; // Forçando 4 metas por dia

// ==========================================
// MÁQUINA DE ESTADOS (SPA)
// ==========================================
function mudarTela(id_tela) {
    document.querySelectorAll('.aba-tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById(id_tela).classList.add('ativa');
}

// ==========================================
// ROTEAMENTO DE DADOS MOCK (PULANDO LOGIN)
// ==========================================
function carregarConfigOuPainel() {
    mudarTela('tela-dashboard');
    carregarDadosCompletos(usuarioAtivo.id);
}

// ==========================================
// CHAMANDO AS RPC'S PROMETIDAS NA ARQUITETURA
// ==========================================
async function carregarDadosCompletos(uid) {
    document.getElementById('listaMetas').innerHTML = '<div style="text-align: center; color: var(--color-cinza-verdeado); padding: 40px;">Buscando as metas de hoje...</div>';
    
    // MODO MOCK PURO E DIRETO
    setTimeout(() => {
        document.getElementById('estaTotal').innerHTML = `<b>80.5%</b> (32/40 acertos)`;
        document.getElementById('estaClassifica').innerText = 'Ótimo';
        document.getElementById('estaClassifica').style.backgroundColor = 'var(--color-azul-claro-ord)';
        
        const numMetas = configLocalEmMock.metas;
        metasDoDia = [];
        for(let i = 1; i <= numMetas; i++) {
            metasDoDia.push({
               meta_id: i,
               disciplina: 'AFO MOCK TELA ' + i,
               descricao: 'Mock visual de conteúdo programático número ' + i,
               concluida: respondidasCache.has(i),
               resp_questoes: 10,
               resp_acertos: 8
            });
        }
        renderizarLista();
    }, 150);
}

function renderizarLista() {
    const container = document.getElementById('listaMetas');
    container.innerHTML = '';
    
    metasDoDia.forEach((m, idx) => {
        const div = document.createElement('div');
        div.className = 'card' + (m.concluida ? ' concluido' : '');
        div.innerHTML = `
            <div class="disciplina">META DE HOJE #${idx+1} | ${m.disciplina}</div>
            <div class="descricao">${m.descricao}</div>
            <div class="acoes-card" style="margin-top: 8px;">
            ${ m.concluida
                ? \`<div class="badge-concluido">Respondida (\${m.resp_acertos}/\${m.resp_questoes}) ✓</div>\`
                : \`<button class="botao" onclick="abrirModal(\${m.meta_id}, '\${m.disciplina.replace(/'/g, "\\'")}')">Reportar Conclusão</button>\`
            }
            </div>
        `;
        container.appendChild(div);
    });
}

// ==========================================
// LOGICA DE REPORTE PURAMENTE COM VALIDAÇÕES
// ==========================================
function abrirModal(id_meta, nome_meta) {
    metaSelecionada = id_meta;
    document.getElementById('modalNomeMeta').innerText = nome_meta;
    document.getElementById('qtdQuestoes').value = '';
    document.getElementById('qtdAcertos').value = '';
    document.getElementById('linkErros').value = '';
    
    document.getElementById('modal').style.display = 'flex';
}

function fecharModal() {
    metaSelecionada = null;
    document.getElementById('modal').style.display = 'none';
}

async function salvarResposta() {
    const questoesStr = document.getElementById('qtdQuestoes').value;
    const acertosStr = document.getElementById('qtdAcertos').value;
    const link = document.getElementById('linkErros').value;

    const q = parseInt(questoesStr);
    const a = parseInt(acertosStr);

    if (isNaN(q) || q <= 0) return alert('Erro: Quantidade de questões inválida.');
    if (isNaN(a) || a < 0) return alert('Erro: Quantidade de acertos não pode ser menor que Zero.');
    if (a > q) return alert('Erro: Você não pode ter mais acertos do que o total de questões!');

    const originalText = document.getElementById('btnSalvarResposta').innerText;
    document.getElementById('btnSalvarResposta').innerText = "Enviando...";

    // Mock bypass salvamento veloz
    setTimeout(() => {
        respondidasCache.add(metaSelecionada);
        document.getElementById('btnSalvarResposta').innerText = originalText;
        fecharModal();
        carregarDadosCompletos(usuarioAtivo.id);
    }, 200);
}

// Em vez de chegar auth, pula direto pro carregamento de dados e mostra o Painel
document.addEventListener('DOMContentLoaded', () => {
    carregarConfigOuPainel();
});
