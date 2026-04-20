/**
 * render_catalogo.js
 * Renderiza dinamicamente o catálogo de cursos e os cursos da barra lateral
 * com base nos dados de dados_catalogo.js
 */

// Prefixo de caminho para imagens — pode ser sobrescrito por páginas em subpastas
// Exemplo em subpasta: <script>var CATALOG_IMG_BASE = '../../';</script>
const _imgBase = (typeof CATALOG_IMG_BASE !== 'undefined') ? CATALOG_IMG_BASE : '';

function _imgSrc(imagem) {
    return _imgBase + imagem.replace('.webp', '.png');
}

document.addEventListener("DOMContentLoaded", () => {
    renderSidebar();
    renderMainCatalog();
});

function renderSidebar() {
    const sidebarContainers = document.querySelectorAll(".sidebar, #sidebar-courses");
    if (sidebarContainers.length === 0) return;

    // Selecionar cursos para a sidebar (prioridade para destaques)
    const featuredCursos = cursosCatalogo.filter(c => c.destaque);
    const otherCursos = cursosCatalogo.filter(c => !c.destaque);
    const selectedCursos = [...featuredCursos, ...otherCursos].slice(0, 3);

    sidebarContainers.forEach(container => {
        // Limpar conteúdo anterior se necessário (opcional)
        // container.innerHTML = ''; 

        // Se o container for a própria sidebar, podemos adicionar ao final ou substituir
        // Para manter a estrutura, vamos procurar se existe um local específico ou apenas apendar
        
        let sidebarHTML = "";
        selectedCursos.forEach(curso => {
            sidebarHTML += `
                <div class="course-card">
                    <div class="course-book-cover">
                        <img src="${_imgSrc(curso.imagem)}" alt="Capa ${curso.titulo}">
                    </div>
                    ${curso.selo ? `<span class="course-badge">⭐ ${curso.selo}</span>` : ''}
                    <h4 class="course-card-title">${curso.titulo}</h4>
                    <p class="course-card-subtitle">${curso.subtitulo}</p>
                    <div class="course-price-box">
                        <span class="price">R$ ${curso.preco}</span> <span class="term">à vista</span>
                    </div>
                    <a href="${curso.linkCompra}" class="btn-comprar" style="text-align: center; text-decoration: none; display: block;">COMPRAR AGORA</a>
                    <a href="${curso.linkSaibaMais}" class="btn-saiba" style="text-align: center; text-decoration: none; display: block;">Saiba Mais</a>
                </div>
            `;
        });

        // Se houver um ID específico para a sidebar de cursos, usamos ele.
        // Caso contrário, limpamos a sidebar e colocamos os novos cards.
        if (container.id === "sidebar-courses") {
            container.innerHTML = sidebarHTML;
        } else {
            // Em index.html e artigos, a sidebar contém os cards diretamente.
            // Vamos substituir os cards antigos.
            const oldCards = container.querySelectorAll(".course-card");
            oldCards.forEach(card => card.remove());
            container.insertAdjacentHTML('beforeend', sidebarHTML);
        }
    });
}

function renderMainCatalog() {
    // Tenta encontrar um container específico, caso contrário usa a seção #cursos
    const catalogContainer = document.getElementById("catalog-container") || document.getElementById("cursos");
    if (!catalogContainer) return;

    // Selecionar o cabeçalho se ele já existir para não perdê-lo (opcional, mas bom para index.html)
    const existingHeader = catalogContainer.querySelector(".section-header");
    
    let catalogHTML = "";
    
    // Se não houver header existente, criamos um padrão
    if (!existingHeader) {
        catalogHTML += `
            <header class="section-header center">
                <div class="hero-eyebrow">Catálogo</div>
                <h2 class="hero-title">Escolha seu <em>concurso</em></h2>
            </header>
        `;
    }

    catalogHTML += `
        <div class="tabs-list" role="tablist" aria-label="Selecione o estado ou modalidade do curso">
            ${categoriasCatalogo.map((cat, index) => `
                <button type="button" role="tab" 
                    aria-selected="${index === 0 ? 'true' : 'false'}" 
                    aria-controls="${cat.id}" 
                    id="tab-${cat.id}" 
                    class="tab-trigger" 
                    ${index !== 0 ? 'tabindex="-1"' : ''}>
                    ${cat.titulo}
                </button>
            `).join('')}
        </div>

        ${categoriasCatalogo.map((cat, index) => `
            <div id="${cat.id}" role="tabpanel" tabindex="0" aria-labelledby="tab-${cat.id}" class="tab-panel" ${index !== 0 ? 'hidden' : ''}>
                <div class="course-grid">
                    ${cursosCatalogo.filter(c => c.categoriaId === cat.id).map(curso => `
                        <article class="cat-card reveal ${curso.destaque ? 'highlight-card' : ''}">
                            <div class="cat-cover">
                                <img src="${_imgSrc(curso.imagem)}" alt="Capa Curso ${curso.titulo}">
                            </div>
                            <div class="cat-details">
                                <div class="badge-list">
                                    <span class="badge-tag ${curso.estiloSelo}">${curso.selo}</span>
                                </div>
                                <h3 class="cat-name">${curso.titulo}</h3>
                                <p class="cat-type">${curso.subtitulo}</p>
                                <p class="cat-price">R$&nbsp;${curso.preco} <span>à vista</span></p>
                                <a href="${curso.linkCompra}" class="cat-btn-buy">Comprar agora</a>
                                ${curso.linkSaibaMais ? `<a href="${curso.linkSaibaMais}" class="cat-btn-info">Saiba mais</a>` : ''}
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    `;

    // Se o container for #cursos e tiver cabeçalho, injetamos após o cabeçalho
    if (catalogContainer.id === "cursos" && existingHeader) {
        // Removemos o conteúdo antigo exceto o cabeçalho e a barra de garantia
        const children = Array.from(catalogContainer.children);
        children.forEach(child => {
            if (!child.classList.contains('section-header') && !child.classList.contains('guarantee-bar')) {
                child.remove();
            }
        });
        // Inserimos o catálogo após o header
        existingHeader.insertAdjacentHTML('afterend', catalogHTML);
    } else {
        catalogContainer.innerHTML = catalogHTML;
    }

    // Re-iniciar o observador de animações para os novos elementos
    if (window.observer) {
        catalogContainer.querySelectorAll('.reveal').forEach(el => window.observer.observe(el));
    }

    setupTabs();
}

function setupTabs() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetPanelId = trigger.getAttribute('aria-controls');

            // Reset
            tabTriggers.forEach(t => {
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            });
            tabPanels.forEach(p => p.setAttribute('hidden', 'true'));

            // Active
            trigger.setAttribute('aria-selected', 'true');
            trigger.removeAttribute('tabindex');
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) targetPanel.removeAttribute('hidden');
        });

        // Teclado
        trigger.addEventListener('keydown', (e) => {
            let index = Array.from(tabTriggers).indexOf(e.target);
            let newIndex;

            if (e.key === 'ArrowRight') {
                newIndex = (index + 1) % tabTriggers.length;
            } else if (e.key === 'ArrowLeft') {
                newIndex = (index - 1 + tabTriggers.length) % tabTriggers.length;
            }

            if (newIndex !== undefined) {
                tabTriggers[newIndex].focus();
                tabTriggers[newIndex].click();
            }
        });
    });
}
