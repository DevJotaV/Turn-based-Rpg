const PAGINAS = {
    INICIO: 'index.html',
    SELECAO: 'selecao.html',
    FASE: 'fase.html'
};

const MAX_PERSONAGENS = 3;

const statsPersonagens = {
    guerreiro: { vida: 150, mana: 25, ataque: 50, velocidade: 5 },
    mago: { vida: 150, mana: 25, ataque: 50, velocidade: 10 },
    arqueiro: { vida: 150, mana: 25, ataque: 50, velocidade: 15 },
    ladino: { vida: 150, mana: 25, ataque: 50, velocidade: 9 },
    paladino: { vida: 150, mana: 25, ataque: 50, velocidade: 10 },
    monge: { vida: 150, mana: 25, ataque: 50, velocidade: 10 },
    'god-slayer': { vida: 200, mana: 100, ataque: 100, velocidade: 100 }
};

const elementos = {
    personagens: document.querySelectorAll('.personagem'),
    divStatus: document.getElementById('status'),
    iniciarJogoBtn: document.getElementById('iniciarJogoBtn')
};

let personagensSelecionados = [];

function navegarPara(pagina) {
    window.location.href = pagina;
}


function capitalizarPrimeiraLetra(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function mostrarStats(classe) {
    const stats = statsPersonagens[classe];
    elementos.divStatus.innerHTML = `<p>${capitalizarPrimeiraLetra(classe)}: ${Object.entries(stats).map(([key, value]) => `${key}: ${value}`).join(', ')}</p>`;
}

function limparStats() {
    elementos.divStatus.innerHTML = '';
}

function togglePersonagem(classe, personagem) {
    if (personagensSelecionados.includes(classe)) {
        personagensSelecionados = personagensSelecionados.filter(p => p !== classe);
        personagem.classList.remove('selecionado');
    } else if (personagensSelecionados.length < MAX_PERSONAGENS) {
        personagensSelecionados.push(classe);
        personagem.classList.add('selecionado');
    } else {
        alert(`Você só pode escolher ${MAX_PERSONAGENS} personagens!`);
    }
}

function atualizarStatus() {
    elementos.divStatus.innerHTML = `<ul>
        ${personagensSelecionados.map(classe => `<li>${capitalizarPrimeiraLetra(classe)}: ${Object.entries(statsPersonagens[classe]).map(([key, value]) => `${key}: ${value}`).join(', ')}</li>`).join('')}
    </ul>`;
    elementos.iniciarJogoBtn.disabled = personagensSelecionados.length !== MAX_PERSONAGENS;
}

function iniciarFase() {
    localStorage.setItem('heroisSelecionados', JSON.stringify(personagensSelecionados));
    navegarPara(PAGINAS.FASE);
}

function inicializarEventos() {
    elementos.personagens.forEach(personagem => {
        personagem.addEventListener('click', () => {
            const classe = personagem.getAttribute('data-classe');
            togglePersonagem(classe, personagem);
            atualizarStatus();
        });
    });
}

inicializarEventos();

function iniciarJogo() {
    navegarPara(PAGINAS.SELECAO)
}