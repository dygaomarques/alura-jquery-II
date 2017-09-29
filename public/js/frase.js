botaoShuffle.click(atualizaJogo);

/**
 * Função para buscar uma nova frase no banco de dados
 * e atualizar os contadores do jogo
 *
 * @param  {object} retorno recebe o objeto com as
 * informações da nova frase
 */
function atualizaJogo() {

    /* Armazenando elementos */
    var spinner = $('#spinner');
    var erro = $('#erro');

    /* Mostrando animação de carregamento */
    spinner.toggle();

    /* Buscando nova frase */
    $.get('http://localhost:3000/frases', function(retorno) {

        /* Gerando número aleatório */
        var numeroAleatorio = Math.floor(Math.random() * retorno.length);

        /* Atualizando variavel que armazena a frase */
        frase.text(retorno[numeroAleatorio].texto);

        /* Atualizando tamanho da frase */
        atualizaTamanhoFrase();
        /* Atualizando tempo inicial */
        atualizaTempoInicial(retorno[numeroAleatorio].tempo);

        /* Reiniciando o jogo depois de atualizar a frase */
        reiniciaJogo();

    }).fail(function() {

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
