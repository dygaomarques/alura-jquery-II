/* Buscando frase aleatória quando o evento de click acontece */
botaoShuffle.click(buscaFraseAleatoria);

/* Buscando frase única quando o evento de click acontece */
botaoBusca.click(buscaFrase);

/**
 * Caso o usuário venha a pressionar o ENTER depois de
 * escolher o id da frase chama a função buscaFrase()
 */
inputBusca.keypress(function(event){
    if (event.which == 13) {
        buscaFrase();
    }
});


/**
 * Função para buscar uma nova frase no banco de dados
 * e atualizar os contadores do jogo
 *
 * @param  {object} retorno recebe o objeto com as
 * informações da nova frase
 */
function buscaAJAX(callback, dado) {

    if (typeof dado == 'undefined') {
        dado = '';
    }

    /* Armazenando elementos */
    var spinner = $('#spinner');
    var erro = $('#erro');

    /* Mostrando animação de carregamento */
    spinner.toggle();

    /* Buscando nova frase */
    $.get('http://localhost:3000/frases', dado, callback).fail(function() {

        /* Mostrando erro */
        erro.toggle();

        /* Escondendo mensagem de erro depois de um tempo */
        setTimeout(function() {
            erro.toggle();
        }, 2000);

    }).always(function() {

        /* Escondendo animação de carregamento assim que a requisição termina */
        spinner.toggle();

    });

}


/**
 * Função para buscar uma única frase na API
 */
function buscaFrase() {

    /* Armazenando o id escolhido pelo usuário */
    var fraseId = $('#frase-id').val();

    /* Criando um objeto JS para receber o id da frase */
    var dado = {
        id: fraseId
    }

    /* Fazendo a busca na API passando a função de callback e os dados que estamos procurando */
    buscaAJAX(atualizaFrase, dado);

    /* Reiniciando o jogo */
    reiniciaJogo();

}


/**
 * Função para buscar uma frase aleatória na API
 */
function buscaFraseAleatoria() {

    /* Definindo o valor total possível */
    var retorno = 10;

    /* Gerando número aleatório */
    var numeroAleatorio = Math.floor(Math.random() * retorno);

    /* Criando um objeto JS para receber o id da frase */
    var dado = {
        id: numeroAleatorio
    }

    /* Fazendo a busca na API passando a função de callback e os dados que estamos procurando */
    buscaAJAX(atualizaFrase, dado);

    /* Reiniciando o jogo */
    reiniciaJogo();

}


/**
 * Função para atualizar a frase e as informações que
 * pertencem a mesma que foi retornada
 *
 * @param  {object} data Recebe o objeto retornado através
 * da requisição AJAX
 */
function atualizaFrase(data) {

    /* Atualizando o texto da frase */
    frase.text(data.texto);
    /* Atualizando tamanho da frase */
    atualizaTamanhoFrase();
    /* Atualizando tempo inicial */
    atualizaTempoInicial(data.tempo);

}
