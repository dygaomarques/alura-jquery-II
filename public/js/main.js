/* Armazenando tempo padrão */
var tempoInicial = $('#tempo-restante').text();
/* Armazenando frase */
var frase = $('.frase');
/* Armazenando elemento textarea campo de digitacao */
var campoDigitacao = $('.campo-digitacao');
/* Armazenando botão reniciar */
var botaoReiniciar = $('#botao-reiniciar');
/* Armazenando botão shuffle */
var botaoShuffle = $('#botao-shuffle');
/* Armazenando botão busca */
var botaoBusca = $('#botao-busca');
/* Armazenando input busca */
var inputBusca = $('#frase-id');


/* Iniciando funções assim que a página termina de carregar */
$(function(){

    atualizaTamanhoFrase();
    inicializaCronometro();
    atualizaContadores();
    inicializaValidadores();

    /* Reiniciando o jogo quando clicar no botão */
    botaoReiniciar.click(reiniciaJogo);

});


/* Função para pegar o tamanho da frase a ser digitada */
function atualizaTamanhoFrase() {

    /* Armazenando numero de palavras da frase */
    var numPalavras = frase.text().split(/[\S\.]+/).length - 1;
    /* Alterando contador de palavras da frase  */
    $('#tamanho-frase').text(numPalavras);

}


/**
 * Função para atualizar o tempo inicial de cada rodada
 */
function atualizaTempoInicial(tempo) {

    /* Aterando valor da variável */
    tempoInicial = tempo;
    /* Atualizando tempo no elemento */
    $('#tempo-restante').text(tempoInicial);

}


/* Função para atualizar contadores de caracteres e palavras */
function atualizaContadores() {

    /* Ouvindo evento de input no campo de digitacao */
    campoDigitacao.on('input', function() {

        /* Armazenando valor do campo */
        var digitado = campoDigitacao.val();
        /* Retornando quantidade de palavras digitadas */
        var qtdPalavras = digitado.split(/\S+/).length - 1;
        /* Retornando quantidade de caracteres digitados */
        var qtdCaracteres = digitado.length;

        /* Atualizando contador de caracteres */
        $('#contador-caracteres').text(qtdCaracteres);
        /* Atualizando contador de palavras */
        $('#contador-palavras').text(qtdPalavras);

    });

}


/*
 * Criando evento para fazer a contagem regressiva assim que
 * o usuário clicar no campo de digitação
 */
function inicializaCronometro() {

    campoDigitacao.one('input', function() {

        /* Armazenando o span do tempo restante */
        var tempoRestante = tempoInicial;

        /* Desabilitando botões de ação */
        toggleDesabilitaBotoes(true);

        /* Armazenando ID do setInterval() para poder parar a
        * contagem assim que a variável tempoRestante for igual a 0
        * com a função clearInterval()
        */
        var contagemRegressivaID = setInterval(function() {

            /* Decrementando a variável tempoRestante */
            tempoRestante--;
            /* Atualizando o tempo dentro do span */
            $('#tempo-restante').text(tempoRestante);

            /*
            * Se tempoRestante for = 0 então a contagem e parada
            * e o campo de digitação é desabilitado
            */
            if(tempoRestante == 0) {

                /* Parando contagem */
                clearInterval(contagemRegressivaID);

                /* Finalizando jogo */
                finalizarJogo();

                /* Insere novo linha com o nome e pontução do jogador */
                inserirNovaLinha();

            }
        }, 1000);

    });

}


/* Função para mudar a cor da borda caso esteja correto ou incorreto */
function inicializaValidadores() {

    campoDigitacao.on('input', function(){

        /* Armazenando o que foi digitado */
        var digitado = campoDigitacao.val();
        /* Comparando o que foi digitado com a frase */
        var comparado = frase.text().substr(0, digitado.length);

        /* Verificando a comparação e adicionando classes */
        if (comparado == digitado) {
            campoDigitacao.removeClass('campo-invalido');
            campoDigitacao.addClass('campo-correto');
        } else {
            campoDigitacao.removeClass('campo-correto');
            campoDigitacao.addClass('campo-invalido');
        }

    });

}


/**
 * Função para finalizar o jogo
 */
function finalizarJogo() {

    toggleCampoDigitacao(true);

    $('.placar').focus();

    /* Habilitando botões de ação */
    toggleDesabilitaBotoes(false);

}


/**
 * Função para desabilitar o campo de digitação
 *
 * @param  {boolean} acao recebe o tipo de ação se true desabilita o
 * campo, se false habilita o campo e limpa o que foi digitado
 */
function toggleCampoDigitacao(acao) {

    /* Verificando o tipo da desabilitação */
    if (acao == true) {

        /* Desabilitando o campo */
        campoDigitacao.attr('disabled', true);

    } else {

        /* Habilitando o campo */
        campoDigitacao.attr('disabled', false);
        /* Limpando o campo */
        campoDigitacao.val('');

    }

    /* Alternando classe 'campo-desativado' */
    campoDigitacao.toggleClass('campo-desativado');

    /* Removendo classes de validação */
    campoDigitacao.removeClass('campo-correto');
    campoDigitacao.removeClass('campo-invalido');

}


/**
 * Função para desabilitar/habilitar botões de ação
 *
 * @param  {boolean} acao Recebe o tipo de ação
 */
function toggleDesabilitaBotoes(acao) {

    if (acao == true) {

        /* Desabilitando botão reiniciar */
        botaoReiniciar.attr('disabled', true);
        /* Desabilitando botão shuffle */
        botaoShuffle.attr('disabled', true);
        /* Desabilitando botão busca */
        botaoBusca.attr('disabled', true);
        /* Desabilitando input busca */
        inputBusca.attr('disabled', true);

    } else {

        /* Habilitando botão reiniciar */
        botaoReiniciar.attr('disabled', false);
        /* Habilitando botão shuffle */
        botaoShuffle.attr('disabled', false);
        /* Habilitando botão busca */
        botaoBusca.attr('disabled', false);
        /* Habilitando input busca */
        inputBusca.attr('disabled', false);

    }

}


/**
 * Reinicia game zerando campos de digitação e contadores
 * de caracteres e palavras e reiniciando cronometro
 */
function reiniciaJogo() {

    if (campoDigitacao.attr('disabled') == 'disabled') {

        /* Zerando contador de caracteres */
        $('#contador-caracteres').text('0');
        /* Zerando contador de palavras */
        $('#contador-palavras').text('0');
        /* Colocando tempo inicial */
        $('#tempo-restante').text(tempoInicial);

        /* Desabilitando o campo de digitação */
        toggleCampoDigitacao(false);

        /* Reiniciando cronomêtro */
        inicializaCronometro();

    }

    /**
     * Resolvendo bug =============================================
     * Pelo botão estar em um link que redireciona para o topo do
     * site o campo de digitação não dava foco porque o link
     * ficava executando o scroll para o topo ao mesmo tempo,
     * então o JS espera 100ms para executar o foco para o textarea
     * depois que o link é clicado
     */
    setTimeout(function(){
        /* Dando foco no campo de digitação novamente */
        campoDigitacao.focus();
    }, 100);

    /* Fazendo o scroll para o topo */
    scrollTo($('.jogo'), 200);

}


/**
 * Função para fazer o scroll para o elemento recebido
 * @param  {object} elemento Recebe o elemento desejado
 * @param  {number} tempo    Recebe o tempo de execução
 */
function scrollTo(elemento, tempo) {

    /* Armazenando a posição do elemento recebido */
    var posicao = elemento.offset().top;

    /**
     * Animando o body para scrollar para a posição do elemento
     * recebido. Deve ser selecionado com o $() tanto o 'HTML'
     * quanto o 'BODY' pois só funcionará dessa maneira, mas
     * nos meus testes somente selecionar o 'HTML' também funciona
     */
    $('html, body').animate({
        /* Executanto o scroll */
        scrollTop: posicao + 'px'
    }, tempo);

}
