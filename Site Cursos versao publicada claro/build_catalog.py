import os

path = r"c:\Users\wilsi\OneDrive\OneDrive - Curso Digital\Página de Sites\Página de Links\Site Cursos claro Rascunho"

with open(os.path.join(path, "index.html"), "r", encoding="utf-8") as f:
    html = f.read()

# get <head>
head_start = html.find("<head>")
head_end = html.find("</head>") + 7
head = html[head_start:head_end]

# get header
header_start = html.find("<header>")
header_end = html.find("</header>") + 9
header = html[header_start:header_end]

# get footer
footer_start = html.find("<footer")
footer_end = html.find("</footer>") + 9
footer = html[footer_start:footer_end]

# catalog section header
catalog_start = html.find('<section id="cursos"')
catalog_header_end = html.find('<div class="tabs-list"')

catalog_header = html[catalog_start:catalog_header_end]

new_html = f"""<!DOCTYPE html>
<html lang="pt-BR">
{head}
<body>
{header}
<main style="padding-top: 62px;"> <!-- compensa navegação fixa -->
    {catalog_header}
        <!-- Contêiner dinâmico gerado pelo script -->
        <div id="tabs-container" class="tabs-list" role="tablist" aria-label="Selecione o estado ou modalidade do curso"></div>
        <div id="panels-container"></div>
    </section>
</main>
{footer}

<!-- Importa os dados do catálogo separados -->
<script src="dados_catalogo.js"></script>

<!-- Script para puxar dados e criar componentes -->
<script>
    // Renderizar Abas e Painéis dinamicamente
    const tabsContainer = document.getElementById("tabs-container");
    const panelsContainer = document.getElementById("panels-container");

    // 1. Criar as abas
    categoriasCatalogo.forEach((cat, index) => {{
        const isSelected = index === 0;
        const tab = document.createElement("button");
        tab.type = "button";
        tab.role = "tab";
        tab.className = "tab-trigger";
        tab.id = "tab-" + cat.id;
        tab.setAttribute("aria-selected", isSelected ? "true" : "false");
        tab.setAttribute("aria-controls", cat.id);
        if (!isSelected) {{
            tab.setAttribute("tabindex", "-1");
        }}
        tab.textContent = cat.titulo;
        tabsContainer.appendChild(tab);

        // 2. Criar os painéis
        const panel = document.createElement("div");
        panel.id = cat.id;
        panel.role = "tabpanel";
        panel.className = "tab-panel";
        panel.setAttribute("aria-labelledby", tab.id);
        panel.setAttribute("tabindex", "0");
        if (!isSelected) {{
            panel.setAttribute("hidden", "true");
        }}
        
        // 3. Adicionar grid de cursos
        const grid = document.createElement("div");
        grid.className = "course-grid";
        
        const cursosDaCategoria = cursosCatalogo.filter(c => c.categoriaId === cat.id);
        cursosDaCategoria.forEach(curso => {{
            const article = document.createElement("article");
            article.className = "course-card" + (curso.destaque ? " highlight-card" : "");
            
            let saibaMaisHTML = "";
            if (curso.linkSaibaMais && curso.linkSaibaMais.trim() !== "") {{
                saibaMaisHTML = `<a href="${{curso.linkSaibaMais}}" class="btn-info">Saiba mais</a>`;
            }}

            article.innerHTML = `
                <div class="course-cover">
                    <img src="${{curso.imagem}}" alt="Capa Curso ${{curso.titulo}}" loading="lazy">
                    <div class="img-fallback"><span>${{curso.imagem}}</span></div>
                </div>
                <div class="course-details">
                    <div class="badge-list">
                        <span class="badge-tag ${{curso.estiloSelo}}">${{curso.selo}}</span>
                    </div>
                    <h3 class="course-name">${{curso.titulo}}</h3>
                    <p class="course-type">${{curso.subtitulo}}</p>
                    <p class="course-price">R$&nbsp;${{curso.preco}} <span>à vista</span></p>
                    <a href="${{curso.linkCompra}}" class="btn-buy">Comprar agora</a>
                    ${{saibaMaisHTML}}
                </div>
            `;
            grid.appendChild(article);
        }});
        
        panel.appendChild(grid);
        panelsContainer.appendChild(panel);
    }});

    // Lógica de Tabs Acessíveis (WAI-ARIA)
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabTriggers.forEach(trigger => {{
        trigger.addEventListener('click', () => {{
            const targetPanelId = trigger.getAttribute('aria-controls');

            // Reset State
            tabTriggers.forEach(t => {{
                t.setAttribute('aria-selected', 'false');
                t.setAttribute('tabindex', '-1');
            }});
            tabPanels.forEach(p => p.setAttribute('hidden', 'true'));

            // Active State
            trigger.setAttribute('aria-selected', 'true');
            trigger.removeAttribute('tabindex');
            document.getElementById(targetPanelId).removeAttribute('hidden');
        }});

        // Suporte a teclado nas tabs (Setas Esquerda/Direita)
        trigger.addEventListener('keydown', (e) => {{
            let index = Array.from(tabTriggers).indexOf(e.target);
            let newIndex;

            if (e.key === 'ArrowRight') {{
                newIndex = (index + 1) % tabTriggers.length;
            }} else if (e.key === 'ArrowLeft') {{
                newIndex = (index - 1 + tabTriggers.length) % tabTriggers.length;
            }}

            if (newIndex !== undefined) {{
                tabTriggers[newIndex].focus();
                tabTriggers[newIndex].click();
            }}
        }});
    }});

    // Exibir elementos revelados instantaneamente, já que não temos a rolagem de página inteira
    document.querySelectorAll('.reveal').forEach(el => {{
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }});
</script>
</body>
</html>
"""

with open(os.path.join(path, "catalogo.html"), "w", encoding="utf-8") as f:
    f.write(new_html)

print("catalogo.html gerado com sucesso!")
