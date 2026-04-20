/**
 * Creator Studio - Core Engine
 * Handcrafted for Prof. Wilsinho Tavares
 */

const assetManifest = {
    thumbnailPhotos: [
        'foto_001.png', 'foto_002.png', 'foto_003.png',
        'foto_004.png', 'foto_005.png', 'Foto_008.png'
    ],
    avatarFolders: {
        'Wilson': ['WILSON v1.png'],
        'SefazBahia': ['WILSON v1.png', 'autorizacao-concurso-sefaz-ba.jpg', 'remuneraca Auditor de tributos.jpg'],
        'CGE_AL': ['WILSON v1.png']
    }
};

const state = {
    activeTemplate: 'toutubeferramentastec',
    zoom: 0.35,
    data: {
        toutubeferramentastec: {
            badge: 'Tutorial',
            title: 'Como Criar um <br>SIMULADO com filtros<br>de um CADERNO PRONTO no',
            brand: 'tecconcursos',
            image: 'assets/toutubeferramentastec/foto_004.png',
            imgZoom: 1,
            imgX: 50,
            imgY: 0,
            textZoom: 1,
            groupX: 0,
            groupY: 0,
            badgeRowX: 0,
            badgeRowY: 0,
            badgeRowZoom: 1,
            badgeTutorialX: 0,
            badgeTutorialY: 0,
            badgeFerramentasX: 0,
            badgeFerramentasY: 0,
            titleX: 0,
            titleY: 0,
            titleSize: 92,
            titleSpacing: -2,
            titleLineHeight: 1.1
        },
        instagram: {
            category: 'fisco',
            principal: 'Editais ISS: Oportunidades',
            content: '<p>Confira uma seleção de editais de <strong>ISS (Fisco Municipal)</strong> que estão com inscrições abertas ou previstas para os próximos dias.</p>',
            folder: 'Wilson',
            avatar: 'assets/instagram/Wilson/WILSON v1.png',
            imgZoom: 1,
            imgX: 50,
            imgY: 0,
            textZoom: 1,
            groupX: 0,
            groupY: 0,
            badgeX: 0,
            badgeY: 0,
            titleX: 0,
            titleY: 0,
            titleSize: 52,
            titleSpacing: -1,
            titleLineHeight: 1.2,
            contentSize: 60,
            contentSpacing: 0,
            contentLineHeight: 1.6
        }
    }
};

const templates = {
    toutubeferramentastec: {
        name: 'YouTube Ferramentas TEC',
        fields: [
            { label: 'Conteúdo Principal', type: 'section' },
            { id: 'badge', label: 'Texto do Badge', type: 'text' },
            { id: 'title', label: 'Título Principal (HTML permitido)', type: 'textarea' },
            { id: 'brand', label: 'Marca / Complemento', type: 'text' },
            { label: 'Imagem', type: 'section' },
            {
                id: 'image',
                label: 'Foto da Miniatura',
                type: 'select-with-custom',
                options: assetManifest.thumbnailPhotos.map(f => ({ value: `assets/toutubeferramentastec/${f}`, label: f }))
            },
            { id: 'imgZoom', label: 'Zoom da Imagem', type: 'range', min: 0.5, max: 3, step: 0.1 },
            { id: 'imgX', label: 'Posição Horizontal (%)', type: 'range', min: 0, max: 100, step: 1 },
            { id: 'imgY', label: 'Posição Vertical (%)', type: 'range', min: -50, max: 150, step: 1 },
            { label: 'Posicionamento Geral', type: 'section' },
            { id: 'textZoom', label: 'Zoom do Bloco de Texto', type: 'range', min: 0.5, max: 2, step: 0.05 },
            { id: 'groupX', label: 'Mover Tudo X (px)', type: 'range', min: -500, max: 500, step: 2 },
            { id: 'groupY', label: 'Mover Tudo Y (px)', type: 'range', min: -500, max: 500, step: 2 },
            
            { label: 'Posicionamento dos Selos (Grupo)', type: 'section' },
            { id: 'badgeRowZoom', label: 'Zoom do Grupo de Selos', type: 'range', min: 0.5, max: 2, step: 0.05 },
            { id: 'badgeRowX', label: 'Mover Selos Juntos X (px)', type: 'range', min: -300, max: 500, step: 2 },
            { id: 'badgeRowY', label: 'Mover Selos Juntos Y (px)', type: 'range', min: -300, max: 300, step: 2 },

            { label: 'Posicionamento Independente', type: 'section' },
            { id: 'badgeTutorialX', label: 'Selo Tutorial X (px)', type: 'range', min: -200, max: 200, step: 2 },
            { id: 'badgeTutorialY', label: 'Selo Tutorial Y (px)', type: 'range', min: -200, max: 200, step: 2 },
            { id: 'badgeFerramentasX', label: 'Selo Ferramentas X (px)', type: 'range', min: -200, max: 200, step: 2 },
            { id: 'badgeFerramentasY', label: 'Selo Ferramentas Y (px)', type: 'range', min: -200, max: 200, step: 2 },
            { id: 'titleX', label: 'Deslocar Título X (px)', type: 'range', min: -300, max: 500, step: 2 },
            { id: 'titleY', label: 'Deslocar Título Y (px)', type: 'range', min: -300, max: 300, step: 2 },
            { label: 'Tipografia do Título', type: 'section' },
            { id: 'titleSize', label: 'Tamanho da Fonte (px)', type: 'range', min: 50, max: 150, step: 2 },
            { id: 'titleSpacing', label: 'Espaçamento (px)', type: 'range', min: -10, max: 20, step: 0.5 },
            { id: 'titleLineHeight', label: 'Distância entre Linhas', type: 'range', min: 0.8, max: 2, step: 0.05 }
        ],
        render: (data) => `
            <div class="tft-thumbnail-wrapper" style="width: 1920px; height: 1080px; position: relative; overflow: hidden; background: #1a7ed4;">
                <div class="bg-layer" style="position: absolute; inset: 0; background: #1a7ed4;"></div>
                <div class="bg-pattern" style="position: absolute; inset: 0; opacity: 0.16; background-image: url('assets/brands/logotecconcursos.png'); background-size: 270px auto; transform: rotate(-15deg) scale(1);"></div>
                <div class="bg-gradient" style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(10, 70, 150, 0.35) 100%);"></div>

                <div class="left-area" style="position: absolute; left: 60px; top: 0; bottom: 0; width: 1200px; display: flex; flex-direction: column; justify-content: center; z-index: 10; transform-origin: left center; transform: scale(${data.textZoom}) translate(${data.groupX}px, ${data.groupY}px);">
                    <div class="badges-row" style="transform-origin: left center; transform: translate(${data.badgeRowX}px, ${data.badgeRowY}px) scale(${data.badgeRowZoom}) rotate(-2deg); display: flex; flex-direction: column; align-items: flex-start; gap: 10px; margin-bottom: 32px; margin-left: 10px;">
                        <div class="badge-tutorial" style="transform: translate(${data.badgeTutorialX}px, ${data.badgeTutorialY}px); background: #ffffff; color: #1a7ed4; font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 100px; padding: 15px 54px; margin-left: 90px; border-radius: 75px; box-shadow: 0 6px 30px rgba(0,0,0,0.2);">${data.badge}</div>
                        <div class="badge-ferramentas" style="transform: translate(${data.badgeFerramentasX}px, ${data.badgeFerramentasY}px); background: #111111; color: #ffffff; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 90px; padding: 18px 48px 18px 30px; border-radius: 75px; display: flex; align-items: center; gap: 20px; box-shadow: 0 6px 30px rgba(0,0,0,0.3);">
                            <div class="badge-icon" style="width: 63px; height: 63px; background: #1a7ed4; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <svg viewBox="0 0 24 24" fill="white" style="width: 36px; height: 36px;"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" /></svg>
                            </div>
                            ferramentas
                        </div>
                    </div>
                    <div class="main-title" style="transform: translate(${data.titleX}px, ${data.titleY}px); font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: ${data.titleSize}px; line-height: 1.10; letter-spacing: -2px; color: #ffffff; text-shadow: 0 6px 36px rgba(0,0,0,0.25);">
                        ${data.title}
                        <span class="tec-word" style="display: inline-flex; align-items: baseline; gap: 0;">
                            <span class="tec-box" style="background: #ffffff; color: #111111; padding: 0 10px 4px 10px; border-radius: 18px; margin-right: 2px; line-height: 1.1;">tec</span>${data.brand}
                        </span>
                    </div>
                </div>

                <div class="right-area" style="position: absolute; right: 80px; top: 50%; transform: translateY(-50%); z-index: 10;">
                    <div class="photo-card" style="width: 645px; height: 855px; border-radius: 48px; overflow: hidden; box-shadow: 0 0 0 6px rgba(255,255,255,0.35), 0 45px 120px rgba(0,0,0,0.4); position: relative; background: #0a25c3; background-image: url('${data.image}'); background-size: ${data.imgZoom * 100}%; background-position: ${data.imgX}% ${data.imgY}%; background-repeat: no-repeat;">
                        <div class="photo-badge" style="position: absolute; bottom: 24px; right: 24px; width: 60px; height: 60px; background: rgba(0,0,0,0.55); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <svg viewBox="0 0 24 24" fill="white" style="width: 33px; height: 33px;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    instagram: {
        name: 'Instagram Carousel',
        fields: [
            { label: 'Conteúdo', type: 'section' },
            { id: 'category', label: 'Categoria', type: 'select', options: [{ value: 'fisco', label: 'Fisco' }, { value: 'controle', label: 'Controle' }, { value: 'noticias', label: 'Notícias' }] },
            { id: 'principal', label: 'Chamada Principal', type: 'text' },
            { id: 'content', label: 'Conteúdo Principal (HTML)', type: 'textarea' },
            { label: 'Avatar & Enquadramento', type: 'section' },
            {
                id: 'folder',
                label: 'Pasta do Avatar',
                type: 'select',
                options: [...Object.keys(assetManifest.avatarFolders).map(f => ({ value: f, label: f })), { value: 'custom', label: 'Personalizado...' }]
            },
            {
                id: 'avatar',
                label: 'Foto do Avatar',
                type: 'select',
                dependsOn: 'folder'
            },
            { id: 'imgZoom', label: 'Zoom do Avatar', type: 'range', min: 0.5, max: 3, step: 0.05 },
            { id: 'imgX', label: 'Posição X (%)', type: 'range', min: 0, max: 100, step: 1 },
            { id: 'imgY', label: 'Posição Y (%)', type: 'range', min: -50, max: 150, step: 1 },
            { label: 'Posicionamento Geral', type: 'section' },
            { id: 'textZoom', label: 'Zoom do Conteúdo', type: 'range', min: 0.5, max: 2, step: 0.05 },
            { id: 'groupX', label: 'Mover Tudo X (px)', type: 'range', min: -500, max: 500, step: 2 },
            { id: 'groupY', label: 'Mover Tudo Y (px)', type: 'range', min: -500, max: 500, step: 2 },
            
            { label: 'Posicionamento Independente', type: 'section' },
            { id: 'badgeX', label: 'Mover Avatar X (px)', type: 'range', min: -200, max: 200, step: 2 },
            { id: 'badgeY', label: 'Mover Avatar Y (px)', type: 'range', min: -200, max: 200, step: 2 },
            { id: 'titleX', label: 'Mover Chamada X (px)', type: 'range', min: -200, max: 200, step: 2 },
            { id: 'titleY', label: 'Mover Chamada Y (px)', type: 'range', min: -200, max: 200, step: 2 },
            { label: 'Tipografia da Chamada', type: 'section' },
            { id: 'titleSize', label: 'Tam. Título (px)', type: 'range', min: 30, max: 90, step: 1 },
            { id: 'titleSpacing', label: 'Espaç. Título (px)', type: 'range', min: -5, max: 10, step: 0.5 },
            { id: 'titleLineHeight', label: 'Alt. Linha Título', type: 'range', min: 0.8, max: 2, step: 0.05 },
            { label: 'Tipografia do Conteúdo', type: 'section' },
            { id: 'contentSize', label: 'Tam. Texto (px)', type: 'range', min: 30, max: 100, step: 1 },
            { id: 'contentSpacing', label: 'Espaç. Texto (px)', type: 'range', min: -5, max: 10, step: 0.5 },
            { id: 'contentLineHeight', label: 'Alt. Linha Texto', type: 'range', min: 1, max: 2.5, step: 0.05 }
        ],
        render: (data) => {
            const colors = {
                fisco: 'linear-gradient(90deg, #1c4fa3, #2f7df6)',
                controle: 'linear-gradient(90deg, #E0115F, rgb(172, 2, 28))',
                noticias: 'linear-gradient(90deg, #03744e, #05704c)'
            };
            const activeColor = colors[data.category] || colors.fisco;

            return `
            <div class="instagram-wrapper" style="width: 1080px; height: 1350px; background: #ffffff; border-radius: 40px; padding: 100px; display: flex; flex-direction: column; font-family: 'Inter', sans-serif; position: relative; overflow: hidden; box-shadow: 0 30px 100px rgba(0,0,0,0.08);">
                <div class="content-body" style="flex-grow: 1; display: flex; flex-direction: column; transform-origin: center top; transform: scale(${data.textZoom}) translate(${data.groupX}px, ${data.groupY}px);">
                    <div class="header" style="transform: translate(${data.badgeX}px, ${data.badgeY}px); display: flex; align-items: center; gap: 20px; margin-bottom: 20px;">
                        <div class="avatar" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid #EFF3F4; background-image: url('${data.avatar}'); background-size: ${data.imgZoom * 100}%; background-position: ${data.imgX}% ${data.imgY}%; background-repeat: no-repeat;"></div>
                        <div class="user-info" style="display: flex; flex-direction: column; gap: 4px;">
                            <div class="name-wrapper" style="display: flex; align-items: center; gap: 8px;">
                                <span class="display-name" style="font-size: 42px; font-weight: 700; color: #0F1419; letter-spacing: -1px;">Prof Wilsinho Tavares</span>
                                <svg viewBox="0 0 24 24" style="width: 40px; height: 40px; color: #1D9BF0;" fill="currentColor">
                                    <g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2l-3.53-3.53 1.41-1.41 2.12 2.12 4.95-4.95 1.41 1.41-6.36 6.36z"></path></g>
                                </svg>
                            </div>
                            <span class="username" style="font-size: 32px; color: #536471; font-weight: 400;">profwilsontavares.concursos</span>
                        </div>
                    </div>

                    <div class="tag-principal" style="transform: translate(${data.titleX}px, ${data.titleY}px); display: flex; align-items: center; justify-content: center; background: ${activeColor}; color: #fff; font-family: 'Inter', sans-serif; font-weight: 800; font-size: ${data.titleSize}px; letter-spacing: ${data.titleSpacing}px; line-height: ${data.titleLineHeight}; padding: 35px 40px; border-radius: 35px; box-shadow: 0 15px 45px rgba(0,0,0,0.1); text-align: center; margin-bottom: 60px; width: 100%;">
                        ${data.principal}
                    </div>

                    <div class="content" style="flex-grow: 1;">
                        <div class="body-text" style="font-size: ${data.contentSize}px; line-height: ${data.contentLineHeight}; letter-spacing: ${data.contentSpacing}px; color: #0F1419; font-weight: 500; text-align: justify;">
                            ${data.content}
                        </div>
                    </div>
                </div>

                <div class="footer-decoration" style="margin-top: auto; border-top: 1px solid #EFF3F4; padding-top: 40px; display: flex; justify-content: flex-end; color: #536471; font-size: 25px; opacity: 0.5;">
                    <span>Estude com o Prof. Wilsinho</span>
                </div>
            </div>
            `;
        }
    }
};

/**
 * UTILS
 */
function updatePreview() {
    const container = document.getElementById('preview-container');
    const template = templates[state.activeTemplate];
    const data = state.data[state.activeTemplate];
    if (!container || !template) return;

    container.innerHTML = template.render(data);

    document.documentElement.style.setProperty('--zoom', state.zoom);
    const zoomLevelEl = document.getElementById('zoom-level');
    if (zoomLevelEl) zoomLevelEl.innerText = `${Math.round(state.zoom * 100)}%`;
}

function renderForm() {
    const form = document.getElementById('editor-form');
    const template = templates[state.activeTemplate];
    const data = state.data[state.activeTemplate];
    if (!form || !template) return;

    form.innerHTML = template.fields.map(field => {
        let fieldHtml = '';

        if (field.type === 'section') {
            return `<div class="form-section"><h3>${field.label}</h3></div>`;
        }

        if (field.type === 'textarea') {
            fieldHtml = `<textarea id="${field.id}" rows="4">${data[field.id]}</textarea>`;
        } else if (field.type === 'select' || field.type === 'select-with-custom') {
            let options = field.options || [];

            if (field.dependsOn) {
                const parentValue = data[field.dependsOn];
                if (parentValue === 'custom') {
                    fieldHtml = `
                        <div class="file-picker-row">
                            <button class="btn-secondary" onclick="document.getElementById('file-input-${field.id}').click()">📁 Carregar Foto</button>
                            <input type="file" id="file-input-${field.id}" style="display:none" accept="image/*" onchange="handleFileSelect(event, '${field.id}')">
                            <span class="file-name">${data[field.id].startsWith('blob:') ? 'Foto Carregada' : 'Nenhuma foto selecionada'}</span>
                        </div>`;
                } else {
                    const files = assetManifest.avatarFolders[parentValue] || [];
                    options = files.map(f => ({ value: `assets/instagram/${parentValue}/${f}`, label: f }));
                    if (!options.find(o => o.value === data[field.id]) && options.length > 0) {
                        data[field.id] = options[0].value;
                    }
                    fieldHtml = `<select id="${field.id}">${options.map(opt => `<option value="${opt.value}" ${data[field.id] === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}</select>`;
                }
            } else {
                if (field.type === 'select-with-custom') {
                    options = [...options, { value: 'custom', label: 'Personalizado...' }];
                    if (data[field.id] === 'custom') {
                        fieldHtml = `
                        <div class="field-col">
                            <select id="${field.id}">
                                ${options.map(opt => `<option value="${opt.value}" ${data[field.id] === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}
                            </select>
                            <div class="file-picker-row" style="margin-top: 10px;">
                                <button class="btn-secondary" onclick="document.getElementById('file-input-${field.id}').click()">📁 Carregar Foto</button>
                                <input type="file" id="file-input-${field.id}" style="display:none" accept="image/*" onchange="handleFileSelect(event, '${field.id}')">
                            </div>
                        </div>`;
                    } else {
                        fieldHtml = `<select id="${field.id}">${options.map(opt => `<option value="${opt.value}" ${data[field.id] === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}</select>`;
                    }
                } else {
                    fieldHtml = `<select id="${field.id}">${options.map(opt => `<option value="${opt.value}" ${data[field.id] === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}</select>`;
                }
            }
        } else if (field.type === 'range') {
            let suffix = 'px';
            if (field.id.toLowerCase().includes('zoom')) suffix = 'x';
            else if (field.id.includes('LineHeight')) suffix = ' ';
            
            fieldHtml = `
                <div class="range-group">
                    <input type="range" id="${field.id}" min="${field.min}" max="${field.max}" step="${field.step}" value="${data[field.id]}">
                    <span class="range-value">${data[field.id]}${suffix}</span>
                </div>`;
        } else {
            fieldHtml = `<input type="text" id="${field.id}" value="${data[field.id]}">`;
        }

        return `
            <div class="input-group">
                <label for="${field.id}">${field.label}</label>
                ${fieldHtml}
            </div>
        `;
    }).join('');

    // Attach listeners
    template.fields.forEach(field => {
        if (field.type === 'section') return;
        const el = document.getElementById(field.id);
        if (el) {
            el.addEventListener('input', (e) => {
                state.data[state.activeTemplate][field.id] = e.target.value;

                if (field.type === 'range') {
                    let suffix = 'px';
                    if (field.id.toLowerCase().includes('zoom')) suffix = 'x';
                    else if (field.id.includes('LineHeight')) suffix = ' ';
                    
                    const valEl = el.nextElementSibling;
                    if (valEl) valEl.innerText = `${e.target.value}${suffix}`;
                }

                const dependents = (field.dependsOn) || field.type === 'select-with-custom' || template.fields.some(f => f.dependsOn === field.id);
                if (dependents) {
                    renderForm();
                }

                updatePreview();
            });
        }
    });
}

/**
 * FILE HANDLING
 */
window.handleFileSelect = (event, fieldId) => {
    const file = event.target.files[0];
    if (!file) return;

    const oldUrl = state.data[state.activeTemplate][fieldId];
    if (oldUrl.startsWith('blob:')) {
        URL.revokeObjectURL(oldUrl);
    }

    const url = URL.createObjectURL(file);
    state.data[state.activeTemplate][fieldId] = url;

    renderForm();
    updatePreview();
};

/**
 * EXPORT
 */
document.getElementById('btn-download').addEventListener('click', async () => {
    const target = document.querySelector('.tft-thumbnail-wrapper') || document.querySelector('.instagram-wrapper');
    if (!target) return;

    const btn = document.getElementById('btn-download');
    const originalText = btn.innerHTML;
    btn.innerHTML = "Processando...";
    btn.disabled = true;

    try {
        const canvas = await html2canvas(target, {
            scale: 2,
            useCORS: true,
            width: target.offsetWidth,
            height: target.offsetHeight,
            onclone: (clonedDoc) => {
                // IMPORTANT: Reset zoom/scale on the cloned element so it captures at 1:1 scale
                const clonedTarget = clonedDoc.querySelector('.tft-thumbnail-wrapper') || clonedDoc.querySelector('.instagram-wrapper');
                if (clonedTarget) {
                    clonedTarget.style.transform = 'none';
                    clonedTarget.style.position = 'absolute';
                    clonedTarget.style.top = '0';
                    clonedTarget.style.left = '0';
                    
                    // Also ensure the body of the clone is big enough and clean
                    clonedDoc.body.style.width = target.offsetWidth + 'px';
                    clonedDoc.body.style.height = target.offsetHeight + 'px';
                    clonedDoc.body.style.background = 'transparent';
                    clonedDoc.body.style.overflow = 'visible';
                }
            }
        });
        
        const link = document.createElement('a');
        link.download = `studio-${state.activeTemplate}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (err) {
        console.error(err);
        alert("Erro ao exportar. Verifique o console.");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});

/**
 * UI CONTROLS
 */
document.getElementById('zoom-in').addEventListener('click', () => {
    state.zoom = Math.min(state.zoom + 0.05, 1);
    updatePreview();
});

document.getElementById('zoom-out').addEventListener('click', () => {
    state.zoom = Math.max(state.zoom - 0.05, 0.1);
    updatePreview();
});

document.getElementById('toggle-sidebar').addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const btn = document.getElementById('toggle-sidebar');
    if (sidebar && btn) {
        sidebar.classList.toggle('collapsed');
        btn.querySelector('span').innerText = sidebar.classList.contains('collapsed') ? '▶' : '◀';
    }
});

document.getElementById('toggle-editor').addEventListener('click', () => {
    const editor = document.querySelector('.editor-section');
    const btn = document.getElementById('toggle-editor');
    if (editor && btn) {
        editor.classList.toggle('collapsed');
        btn.querySelector('span').innerText = editor.classList.contains('collapsed') ? '◀' : '▶';
    }
});

/**
 * INITIALIZE
 */
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const templateId = e.target.closest('.nav-item').dataset.template;
        if (!templates[templateId]) return;

        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        state.activeTemplate = templateId;
        renderForm();
        updatePreview();
    });
});

renderForm();
updatePreview();
