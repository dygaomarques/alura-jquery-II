var placar = $('.placar');

/* Mostra o placar quando clicado */
$('#botao-placar').click(mostrarPlacar);

/**
 * Insere novo elemento na tabela
 */
function inserirNovaLinha() {

    /* Armazenando o tbody da tabela */
    var placarBody = placar.find('tbody');

    /* Armazenando nome e pontuação do jogador */
    var nomeJogador = 'Rodrigo';
    var pontuacaoJogador = $('#contador-palavras').text();

    /* Armazenando novo objeto criado */
    var novaLinha = criarNovaLinha(nomeJogador, pontuacaoJogador);

    /* Atribuindo evento de click para excluir elemento */
    novaLinha.find('#botao-remover').click(excluirElemento);

    /* Atribuindo objeto como primeiro filho do tbody */
    placarBody.prepend(novaLinha);

    /* Mostrando placar */
    placar.slideDown(600);

    scrollTo(placar, 1000);

}

/**
 * Cria novo objeto JavaScript para ser inserido na tabela
 */
function criarNovaLinha(jogador, pontuacao) {

    /* Criando coluna do nome do usuário */
    var colunaNome = $('<td>');
    /* Adicionando nome recebido pelo 1º argumento */
    colunaNome.text(jogador);

    /* Criando linha para receber as colunas */
    var linhaPlacar = $('<tr>');

    /* Criando coluna dos pontos */
    var colunaPontos = $('<td>');
    /* Atribuindo pontução recebida pelo 2º argumento */
    colunaPontos.text(pontuacao);

    /* Criando coluna do botão de remover */
    var colunaBotao = $('<td>');
    /* Criando botão de remover */
    var botaoRemover = $('<button>').attr('id', 'botao-remover');
    /* Criando icone da lixeira */
    var iconeRemover = $('<i>').addClass('small material-icons').text('cancel');

    /* Atribuindo icone remover como filho do botão remover */
    botaoRemover.append(iconeRemover);
    /* Atribuindo botão remover como filho da coluna botão */
    colunaBotao.append(botaoRemover);
    /* Atribuindo colunas a linha principal */
    linhaPlacar.append(colunaNome, colunaPontos, colunaBotao);

    linhaPlacar.mousemove()

    /* Retornando o novo objeto criado */
    return linhaPlacar;

}

/**
 * Função para excluir elemento quando o botão excluir é acionado
 */
function excluirElemento() {

    /* Captura o elemento que foi clicado e exclui o seu parente avôs */
    $this = $(this).parent().parent();

    /* Adiciona classe 'fade-out' e executa o metodo fadeOut() */
    $this.addClass('fade-out').fadeOut(1000);

    /* Aguarda o fadeOut() terminar para excluir o elemento */
    setTimeout(function() {
        $this.remove();
    }, 1000);

}

/**
 * Função para mostrar o placar
 */
function mostrarPlacar() {

    /* Para qualquer animação que esteja em execução e começa a slideToggle() */
    placar.stop().slideToggle(600);

}
