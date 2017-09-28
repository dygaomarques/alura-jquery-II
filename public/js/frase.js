botaoShuffle.click(function() {


});

/**
 * Função para buscar uma nova frase no banco de dados
 * e atualizar os contadores do jogo
 * 
 * @param  {object} retorno recebe o objeto com as
 * informações da nova frase
 */
function atualizaJogo(retorno) {

    /* Buscando nova frase */
    $.get('http://localhost:3000/frases', function() {

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

    });

}
