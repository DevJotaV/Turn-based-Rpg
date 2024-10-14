const herois = {
    guerreiro: { 
        nome: "Guerreiro", 
        vida: 150, mana: 25, 
        ataque: 50, defesa: 30, 
        danoArcano: 10, defesaArcana: 10, 
        velocidade: 5,
        tipo: 'heroi',
        habilidades: {
            ataque: { nome: "Golpe Poderoso", custo: 0, dano: 50, tipo: "físico" },
            especial: { nome: "Investida Furiosa", custo: 10, dano: 70, tipo: "físico" },
            ultimate: { nome: "Fúria do Guerreiro", custo: 20, dano: 100, tipo: "físico" }
        }
    },
    mago: { 
        nome: "Mago", 
        vida: 120, mana: 60, 
        ataque: 30, defesa: 15, 
        danoArcano: 60, defesaArcana: 20, 
        velocidade: 11,
        tipo: 'heroi',
        habilidades: {
            ataque: { nome: "Dardo Mágico", custo: 0, dano: 40, tipo: "arcano" },
            especial: { nome: "Bola de Fogo", custo: 15, dano: 80, tipo: "arcano" },
            ultimate: { nome: "Meteoro", custo: 30, dano: 120, tipo: "arcano" }
        }
    },
    arqueiro: {
        nome: "Arqueiro",
        vida: 130, mana: 40,
        ataque: 45, defesa: 20,
        danoArcano: 15, defesaArcana: 15,
        velocidade: 12,
        tipo: 'heroi',
        habilidades: {
            ataque: { nome: "Tiro Certeiro", custo: 0, dano: 45, tipo: "físico" },
            especial: { nome: "Chuva de Flechas", custo: 12, dano: 65, tipo: "físico" },
            ultimate: { nome: "Flecha Perfurante", custo: 25, dano: 110, tipo: "físico" }
        }
    },
    ladino: {
        nome: "Ladino",
        vida: 125, mana: 35,
        ataque: 40, defesa: 25,
        danoArcano: 20, defesaArcana: 15,
        velocidade: 14,
        tipo: 'heroi',
        habilidades: {
            ataque: { nome: "Ataque Furtivo", custo: 0, dano: 40, tipo: "físico" },
            especial: { nome: "Golpe nas Sombras", custo: 10, dano: 60, tipo: "físico" },
            ultimate: { nome: "Assassinato", custo: 20, dano: 100, tipo: "físico" }
        }
    },
    paladino: {
        nome: "Paladino",
        vida: 160, mana: 45,
        ataque: 45, defesa: 40,
        danoArcano: 25, defesaArcana: 30,
        velocidade: 6,
        tipo: 'heroi',
        habilidades: {
            ataque: { nome: "Golpe Sagrado", custo: 0, dano: 45, tipo: "físico" },
            especial: { nome: "Escudo Divino", custo: 15, dano: 30, tipo: "arcano" },
            ultimate: { nome: "Julgamento Celestial", custo: 30, dano: 90, tipo: "arcano" }
        }
    },
    monge: {
        nome: "Monge",
        vida: 140, mana: 50,
        ataque: 35, defesa: 35,
        danoArcano: 40, defesaArcana: 25,
        velocidade: 10,
        tipo: 'heroi',
        habilidades: {
            ataque: { nome: "Punho de Ferro", custo: 0, dano: 35, tipo: "físico" },
            especial: { nome: "Palma Espiritual", custo: 12, dano: 55, tipo: "arcano" },
            ultimate: { nome: "Fúria dos Mil Punhos", custo: 25, dano: 95, tipo: "físico" }
        }
    }
};


const goblins = {
    goblin1: { 
        nome: "Goblin 1", 
        vida: 500, mana: 0, 
        ataque: 50, defesa: 5, 
        danoArcano: 0, defesaArcana: 5, 
        velocidade: 7,
        tipo: 'goblin',
        vidaMaxima: 500,
        habilidades: {
            ataque: { nome: "Golpe de Clava", custo: 0, dano: 10, tipo: "físico" }
        }
    },
    goblin2: { 
        nome: "Goblin 2", 
        vida: 500, mana: 0, 
        ataque: 50, defesa: 4, 
        danoArcano: 0, defesaArcana: 5, 
        velocidade: 6,
        tipo: 'goblin',
        vidaMaxima: 500,
        habilidades: {
            ataque: { nome: "Golpe de Clava", custo: 0, dano: 10, tipo: "físico" }
        }
    },
    goblin3: { 
        nome: "Goblin 3", 
        vida: 500, mana: 0, 
        ataque: 50, defesa: 6, 
        danoArcano: 0, defesaArcana: 5, 
        velocidade: 5,
        tipo: 'goblin',
        vidaMaxima: 500,
        habilidades: {
            ataque: { nome: "Golpe de Clava", custo: 0, dano: 10, tipo: "físico" }
        }
    },
};

let ordemTurnos = [];
let turnoAtual = 0;
let historicoComabate = [];

function exibirHerois() {
    const heroisContainer = document.querySelector('.personagem-escolhido');
    heroisContainer.innerHTML = '<h2>Heróis Selecionados</h2>';

    const heroisSelecionados = JSON.parse(localStorage.getItem('heroisSelecionados')) || [];

    heroisSelecionados.forEach(classe => {
        if (herois[classe]) {
            const heroiCopy = JSON.parse(JSON.stringify(herois[classe])); 
            const divHeroi = criarDivPersonagem(classe, heroiCopy);
            heroisContainer.appendChild(divHeroi);
        }
    });

    console.log('Heróis selecionados:', heroisSelecionados); 
}

function exibirGoblins() {
    const goblinsContainer = document.getElementById('goblins');
    goblinsContainer.innerHTML = '<h2>Goblins</h2>';

    ordemTurnos.filter(personagem => personagem.tipo == 'goblin').forEach((goblin, index) => {
        const divGoblin = criarDivPersonagem(`goblin${index + 1}`, goblin);
        goblinsContainer.appendChild(divGoblin);
    });
}

function criarDivPersonagem(key, personagem) {
    const div = document.createElement('div');
    div.className = 'personagem';
    div.id = personagem.nome.replace(/\s+/g, '-').toLowerCase();
    const imagemSrc = personagem.tipo === 'goblin' ? 'goblin.jpg' : `${key}.jpg`;
    div.innerHTML = `
        <img src="${imagemSrc}" alt="${personagem.nome}" onerror="this.src='fallback-image.png'">
        <div class="info">
            <h3>${personagem.nome}</h3>
            <p>Vida: <span class="vida-atual">${personagem.vida}</span>/${personagem.vida}</p>
            <p>Mana: <span class="mana-atual">${personagem.mana}</span>/${personagem.mana}</p>
            <div class="hp-bar">
                <div class="hp-bar-inner" style="width: 100%"></div>
            </div>
        </div>
    `;
    return div;
}

function criarMenuHabilidades(personagem) {
    const menu = document.getElementById('menu-habilidades');
    menu.innerHTML = '';
    
    Object.entries(personagem.habilidades).forEach(([tipo, habilidade]) => {
        const botao = document.createElement('button');
        botao.textContent = `${habilidade.nome} (Custo: ${habilidade.custo} MP)`;
        botao.onclick = () => ativarSelecaoAlvo(personagem, habilidade);
        menu.appendChild(botao);
    });
}

function ativarSelecaoAlvo(personagem, habilidade) {
    const alvos = personagem.tipo === 'heroi' ? goblins : herois;
    Object.values(alvos).forEach(alvo => {
        if (alvo.vida > 0) {
            const alvoEl = document.getElementById(alvo.nome.replace(/\s+/g, '-').toLowerCase());
            alvoEl.classList.add('alvo-selecionavel');
            alvoEl.onclick = () => {
                usarHabilidade(personagem, habilidade, alvo);
            };
        }
    });
}

function desativarSelecaoAlvo() {
    document.querySelectorAll('.alvo-selecionavel').forEach(el => {
        el.classList.remove('alvo-selecionavel');
        el.onclick = null;
    });
}


function usarHabilidade(personagem, habilidade, alvoEscolhido = null) {
    if (personagem.mana < habilidade.custo) {
        adicionarAoHistorico(`${personagem.nome} não tem mana suficiente para usar ${habilidade.nome}`);
        return;
    }

    let alvo = alvoEscolhido;
    if (!alvo) {
        const alvosDisponiveis = ordemTurnos.filter(p => p.tipo !== personagem.tipo && p.vida > 0);
        alvo = alvosDisponiveis[Math.floor(Math.random() * alvosDisponiveis.length)];
    }

    if (!alvo) {
        adicionarAoHistorico(`${personagem.nome} não encontrou alvos vivos para atacar!`);
        return;
    }

    let dano = calcularDano(personagem, alvo, habilidade);

    const atacanteEl = document.getElementById(personagem.nome.replace(/\s+/g, '-').toLowerCase());
    atacanteEl.classList.add('attacking');
    setTimeout(() => atacanteEl.classList.remove('attacking'), 500);

    alvo.vida = Math.max(0, alvo.vida - dano);
    personagem.mana -= habilidade.custo;

    adicionarAoHistorico(`${personagem.nome} usou ${habilidade.nome} em ${alvo.nome} causando ${dano} de dano!`);
    
    atualizarBarraHP(alvo);
    atualizarInfoPersonagem(alvo);
    atualizarInfoPersonagem(personagem);
    
    if (alvo.vida <= 0) {
        adicionarAoHistorico(`${alvo.nome} foi derrotado!`);
        removerPersonagemDerrotado(alvo);
    }

    desativarSelecaoAlvo();
    proximoTurno();
}

function calcularDano(atacante, defensor, habilidade) {
    let dano = habilidade.dano;
    if (habilidade.tipo === 'físico') {
        dano += atacante.ataque;
        dano -= defensor.defesa;
    } else if (habilidade.tipo === 'arcano') {
        dano += atacante.danoArcano;
        dano -= defensor.defesaArcana;
    }
    return Math.max(0, dano); 
}

function atualizarBarraHP(personagem) {
    const personagemEl = document.getElementById(personagem.nome.replace(/\s+/g, '-').toLowerCase());
    if (personagemEl) {
        const hpBarInner = personagemEl.querySelector('.hp-bar-inner');
        const porcentagemHP = (personagem.vida / personagem.vidaMaxima) * 100;
        hpBarInner.style.width = `${porcentagemHP}%`;
    }
}

function atualizarInfoPersonagem(personagem) {
    const personagemEl = document.getElementById(personagem.nome.replace(/\s+/g, '-').toLowerCase());
    if (personagemEl) {
        personagemEl.querySelector('.vida-atual').textContent = personagem.vida;
        personagemEl.querySelector('.mana-atual').textContent = personagem.mana;
    }
}

function escolherAlvoAleatorio(alvos) {
    const alvosVivos = Object.values(alvos).filter(alvo => alvo.vida > 0);
    if (alvosVivos.length === 0) {
        return null;  
    }
    return alvosVivos[Math.floor(Math.random() * alvosVivos.length)];
}

function removerPersonagemDerrotado(personagem) {
    ordemTurnos = ordemTurnos.filter(p => p !== personagem);
    const personagemEl = document.getElementById(personagem.nome.replace(/\s+/g, '-').toLowerCase());
    if (personagemEl) {
        personagemEl.classList.add('derrotado');
    }
}

function executarTurno() {
    const personagemAtual = ordemTurnos[turnoAtual];
    adicionarAoHistorico(`Turno de ${personagemAtual.nome} (${personagemAtual.tipo})`);
    
    document.querySelectorAll('.personagem').forEach(el => el.classList.remove('ativo'));
    
    const personagemAtualEl = document.getElementById(personagemAtual.nome.replace(/\s+/g, '-').toLowerCase());
    if (personagemAtualEl) {
        personagemAtualEl.classList.add('ativo');
    }
    atualizarProximoJogador();
    
    if (personagemAtual.tipo === 'heroi') {
        criarMenuHabilidades(personagemAtual);
    } else {
        const alvosVivos = Object.values(personagemAtual.tipo === 'heroi' ? goblins : herois).filter(alvo => alvo.vida > 0);
        if (alvosVivos.length > 0) {
            const habilidades = Object.values(personagemAtual.habilidades);
            const habilidadeEscolhida = habilidades[Math.floor(Math.random() * habilidades.length)];
            setTimeout(() => usarHabilidade(personagemAtual, habilidadeEscolhida), 1000);
        } else {
            adicionarAoHistorico(`${personagemAtual.nome} não encontrou alvos vivos para atacar!`);
            proximoTurno();
        }
    }
}

function verificarFimDeBatalha() {
    const heroisVivos = ordemTurnos.filter(p => p.tipo === 'heroi' && p.vida > 0);
    const goblinsVivos = ordemTurnos.filter(p => p.tipo === 'goblin' && p.vida > 0);

    if (heroisVivos.length === 0) {
        exibirFimDeBatalha("Os Goblins venceram! Você perdeu!");
        return true;
    }
    if (goblinsVivos.length === 0) {
        exibirFimDeBatalha("Os Heróis venceram! Você ganhou!");
        return true;
    }
    return false;
}

function exibirFimDeBatalha(mensagem) {
    const container = document.getElementById('container');
    container.innerHTML = `
        <div id="fim-batalha">
            <h2>${mensagem}</h2>
            <button id="reiniciar">Reiniciar Batalha</button>
            <button id="voltar-menu">Voltar ao Menu de Seleção</button>
        </div>
    `;

    document.getElementById('reiniciar').addEventListener('click', () => {
        location.reload();
    });

    document.getElementById('voltar-menu').addEventListener('click', () => {
        window.location.href = 'selecao.html';
    });
}


function adicionarAoHistorico(mensagem) {
    historicoComabate.push(mensagem);
    atualizarHistoricoNaInterface();
}

function atualizarHistoricoNaInterface() {
    const historicoContainer = document.getElementById('historico-combate');
    const historicoHTML = historicoComabate.map(msg => `<p>${msg}</p>`).join('');
    historicoContainer.innerHTML = `<h2>Histórico de Combate</h2>${historicoHTML}`;
    historicoContainer.scrollTop = historicoContainer.scrollHeight;
}

function atualizarProximoJogador() {
    const proximoJogadorIndex = (turnoAtual + 1) % ordemTurnos.length;
    const proximoJogador = ordemTurnos[proximoJogadorIndex];
    const proximoJogadorEl = document.getElementById('proximo-jogador');
    
    if (proximoJogadorEl) {
        const imagemSrc = proximoJogador.tipo === 'goblin' ? 'goblin.jpg' : `${proximoJogador.nome.toLowerCase()}.jpg`;
        
        proximoJogadorEl.innerHTML = `
            <img src="${imagemSrc}" alt="${proximoJogador.nome}" onerror="this.src='fallback-image.png'">
            <p>${proximoJogador.nome}</p>
        `;
    }
}

function proximoTurno() {
    turnoAtual = (turnoAtual + 1) % ordemTurnos.length;
    if (verificarFimDeBatalha()) {
        return;
    }
    atualizarProximoJogador();
    executarTurno();
}



function iniciarBatalha() {
    const heroisSelecionados = JSON.parse(localStorage.getItem('heroisSelecionados')) || [];
    
    const heroisParaBatalha = heroisSelecionados.map(classe => {
        if (herois[classe]) {
            const heroiCopy = JSON.parse(JSON.stringify(herois[classe]));
            heroiCopy.vidaMaxima = heroiCopy.vida;
            heroiCopy.manaMaxima = heroiCopy.mana;
            return heroiCopy;
        }
    }).filter(Boolean);

    const numGoblins = heroisParaBatalha.length;
    const goblinsParaBatalha = Object.values(goblins).slice(0, numGoblins).map(goblin => {
        const goblinCopy = JSON.parse(JSON.stringify(goblin));
        goblinCopy.vidaMaxima = goblinCopy.vida;
        goblinCopy.manaMaxima = goblinCopy.mana;
        return goblinCopy;
    });

    ordemTurnos = [...heroisParaBatalha, ...goblinsParaBatalha]
        .sort((a, b) => b.velocidade - a.velocidade);

    exibirHerois();
    exibirGoblins();
    atualizarProximoJogador();
    executarTurno();
}

function verificarHeroisSelecionados() {
    const heroisSelecionados = JSON.parse(localStorage.getItem('heroisSelecionados')) || [];
    console.log('Heróis selecionados no localStorage:', heroisSelecionados); // Para depuração
    if (heroisSelecionados.length === 0) {
        console.warn('Nenhum herói selecionado no localStorage');
    }
}

window.onload = function() {
    verificarHeroisSelecionados();
    iniciarBatalha();
};