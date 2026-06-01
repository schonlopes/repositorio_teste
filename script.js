/**
 * 3DForge Pro - Arquivo de Regras de Negócio e Engenharia Funcional
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // DATA MATRIX (Arrays de Objetos para Componentes Complexos)
    // ==========================================================================
    
    const PRODUTOS_APLICACOES = [
        {
            titulo: "Gabaritos e Fixadores Industriais",
            descricao: "Ferramental robusto customizado para linhas de manufatura automatizadas. Excelente absorção de impacto.",
            icone: "fa-sliders"
        },
        {
            titulo: "Engrenagens e Componentes Mecânicos",
            descricao: "Produção avançada em Nylon com Fibra de Carbono. Alta tolerância ao atrito estrutural e tração.",
            icone: "fa-gear"
        },
        {
            titulo: "Modelos Odontológicos e Guias",
            descricao: "Impressão em resina biocompatível de altíssima fidelidade microscópica para exames e moldagens.",
            icone: "fa-tooth"
        },
        {
            titulo: "Maquetes de Arquitetura e Urbanismo",
            descricao: "Exposição volumétrica de alta fidelidade visual, com riqueza de contornos geométricos finos.",
            icone: "fa-building"
        },
        {
            titulo: "Prototipagem de Produtos Eletrônicos",
            descricao: "Cases, gabinetes protetores e encaixes sob medida com blindagem e furação milimétrica perfeita.",
            icone: "fa-microchip"
        }
    ];

    const FAQ_DATA = [
        {
            pergunta: "Quais formatos de arquivos digitais vocês aceitam?",
            resposta: "Aceitamos primordialmente extensões nativas de modelagem 3D, tais como .STL, .STEP, .IGES e .OBJ. Se você possuir apenas desenhos técnicos bidimensionais (2D), nossa equipe de engenharia reversa pode realizar a modelagem sob consulta prévia."
        },
        {
            pergunta: "Qual o prazo padrão para produção e entrega das peças?",
            resposta: "Para protótipos e pequenos lotes de engenharia, enviamos o relatório técnico e postamos as peças acabadas em até 48 horas úteis após a aprovação formal do orçamento e pagamento."
        },
        {
            pergunta: "Como escolher o material correto para o meu projeto?",
            resposta: "A escolha depende da aplicação prática da peça. Esforço mecânico e tração demandam Nylon ou PETG. Resistência térmica a altas temperaturas exige ABS ou Policarbonato. Detalhes minuciosos e acabamento liso perfeito requerem Resina Estereolitográfica (SLA)."
        },
        {
            pergunta: "Vocês trabalham sob termos de confidencialidade industrial?",
            resposta: "Sim. Todos os arquivos anexados em nosso ecossistema de dados estão resguardados por rígidos protocolos de segurança digital. Assinamos Acordos de Confidencialidade (NDA) corporativos antes do recebimento de geometrias proprietárias."
        }
    ];

    // ==========================================================================
    // LOGICA DE ACESSIBILIDADE DE FONTES & CONTRASTE
    // ==========================================================================
    let tamanhoFonteAtual = 16;
    const rootHtml = document.documentElement;

    document.getElementById('btn-font-increase').addEventListener('click', () => {
        if (tamanhoFonteAtual < 24) {
            tamanhoFonteAtual += 2;
            rootHtml.style.setProperty('--base-font-size', `${tamanhoFonteAtual}px`);
        }
    });

    document.getElementById('btn-font-decrease').addEventListener('click', () => {
        if (tamanhoFonteAtual > 12) {
            tamanhoFonteAtual -= 2;
            rootHtml.style.setProperty('--base-font-size', `${tamanhoFonteAtual}px`);
        }
    });

    document.getElementById('btn-toggle-contrast').addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // ==========================================================================
    // RENDERIZADOR & CONTROLADOR DO CARROSSEL
    // ==========================================================================
    const track = document.getElementById('carousel-track');
    
    PRODUTOS_APLICACOES.forEach(item => {
        const divItem = document.createElement('div');
        divItem.classList.add('carousel-item');
        divItem.innerHTML = `
            <div class="carousel-img-placeholder">
                <i class="fas ${item.icone}"></i>
                <span>Visualização Industrial</span>
            </div>
            <div class="carousel-info">
                <h3>${item.titulo}</h3>
                <p>${item.descricao}</p>
            </div>
        `;
        track.appendChild(divItem);
    });

    // Mecânica de Movimentação do Carrossel
    const btnNext = document.getElementById('carousel-next');
    const btnPrev = document.getElementById('carousel-prev');
    let currentIndex = 0;

    function updateCarouselPosition() {
        const cardWidth = document.querySelector('.carousel-item').offsetWidth;
        const gap = 32; // Equivalente a 2rem do CSS
        track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    }

    btnNext.addEventListener('click', () => {
        const totalItems = PRODUTOS_APLICACOES.length;
        const visibleCards = window.innerWidth > 992 ? 3 : window.innerWidth > 600 ? 2 : 1;
        if (currentIndex < totalItems - visibleCards) {
            currentIndex++;
            updateCarouselPosition();
        } else {
            currentIndex = 0; // Loop infinito simplificado
            updateCarouselPosition();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
        }
    });

    window.addEventListener('resize', updateCarouselPosition);

    // ==========================================================================
    // RENDERIZADOR & CONTROLADOR DO ACORDEÃO (FAQ)
    // ==========================================================================
    const faqContainer = document.getElementById('faq-accordion');

    FAQ_DATA.forEach((faq, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');
        
        accordionItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false" aria-controls="faq-answer-${index}">
                <span>${faq.pergunta}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div id="faq-answer-${index}" class="accordion-content" role="region">
                <p>${faq.resposta}</p>
            </div>
        `;
        
        faqContainer.appendChild(accordionItem);
    });

    // Event Delegation para gerenciamento de estado do Acordeão
    faqContainer.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (!header) return;

        const currentItem = header.parentElement;
        const isActive = currentItem.classList.contains('active');

        // Fecha todos antes de abrir o alvo
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
            currentItem.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
        }
    });
});