window.onload = function () {
    const sessaoPrincipal = document.getElementById("principal");
    const sessaoTimer = document.getElementById("timer");
    const sessaoVerificacao = document.getElementById("verificacao");
    const sessaoPenalidade = document.getElementById("penalidade");

    sessaoPrincipal.style.display = 'flex';
    sessaoTimer.style.display = 'none';
    sessaoVerificacao.style.display = 'none';
    sessaoPenalidade.style.display = 'none';

    // Adiciona os eventos só uma vez aqui
    const botaoConcluirTarefa = document.querySelector("#timer .botoes .concluir button");
    const botaoDeletarTarefa = document.querySelector("#timer .botoes .deletar");
    const botaoConcluirVerificacao = document.querySelector("#verificacao .botoes .concluido button");
    const botaoNaoConcluido = document.querySelector("#verificacao .botoes .nao_concluido button");
    const botaoConcluirPenalidade = document.querySelector("#penalidade .botoes .botao_concluirPenalidade button");

    botaoConcluirTarefa.addEventListener("click", () => {
        document.querySelector("#timer .cronometro .tarefa_ativa p").textContent = "";
        sessaoPrincipal.style.display = 'flex';
        sessaoTimer.style.display = 'none';
        pararTimer();
    });

    botaoDeletarTarefa.addEventListener("click", () => {
        document.querySelector("#timer .cronometro .tarefa_ativa p").textContent = "";
        sessaoPrincipal.style.display = 'flex';
        sessaoTimer.style.display = 'none';
        pararTimer();
    });

    botaoConcluirVerificacao.addEventListener("click", () => {
        sessaoPrincipal.style.display = 'flex';
        sessaoTimer.style.display = 'none';
        sessaoVerificacao.style.display = 'none';
        sessaoPenalidade.style.display = 'none';
    });

    botaoNaoConcluido.addEventListener("click", () => {
        sessaoPrincipal.style.display = 'none';
        sessaoTimer.style.display = 'none';
        sessaoVerificacao.style.display = 'none';
        sessaoPenalidade.style.display = 'flex';
    });

    botaoConcluirPenalidade.addEventListener("click", () => {
        sessaoPrincipal.style.display = 'flex';
        sessaoTimer.style.display = 'none';
        sessaoVerificacao.style.display = 'none';
        sessaoPenalidade.style.display = 'none';
    });

    
}

let tempoRestante = 5; // define aqui o tempo inicial (ex: 3600 para 1h)
let timer = null;
let rodando = false;

function adicionarTarefa() {
    tempoRestante = 5; // reinicia o tempo (pode mudar para 3600)
    const sessaoPrincipal = document.getElementById("principal");
    const sessaoTimer = document.getElementById("timer");
    const inputEntrada = document.querySelector("#principal .entrada_de_dados input").value;
    const tarefa_ativa = document.querySelector("#timer .cronometro .tarefa_ativa p");

    sessaoPrincipal.style.display = 'none';
    sessaoTimer.style.display = 'flex';

    tarefa_ativa.textContent = inputEntrada;

    iniciarTimer(); // inicia o cronômetro
}

function atualizarDisplay() {
    const horas = Math.floor(tempoRestante / 3600);
    const minutos = Math.floor((tempoRestante % 3600) / 60);
    const segundos = tempoRestante % 60;

    document.querySelector("#timer .cronometro .timer span").textContent =
        `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function iniciarTimer() {
    const sessaoPrincipal = document.getElementById("principal");
    const sessaoTimer = document.getElementById("timer");
    const sessaoVerificacao = document.getElementById("verificacao");
    const sessaoPenalidade = document.getElementById("penalidade");

    if (rodando) return;
    rodando = true;

    atualizarDisplay();

    timer = setInterval(() => {
        tempoRestante--;

        if (tempoRestante <= 0) {
            clearInterval(timer);
            rodando = false;
            tempoRestante = 0;

            // mostra a tela de verificação
            sessaoPrincipal.style.display = 'none';
            sessaoTimer.style.display = 'none';
            sessaoVerificacao.style.display = 'flex';
            sessaoPenalidade.style.display = 'none';
        }

        atualizarDisplay();
    }, 1000);
}

function pararTimer() {
    clearInterval(timer);
    rodando = false;
}
