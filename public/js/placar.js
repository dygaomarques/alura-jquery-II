/**
 * Insere novo elemento na tabela
 */
function inserirNovaLinha() {

    /* Armazenando o tbody da tabela */
    var placar = $('.placar').find('tbody');

    /* Armazenando nome e pontuação do jogador */
    var nomeJogador = 'Rodrigo';
    var pontuacaoJogador = $('#contador-palavras').text();

    /* Armazenando novo objeto criado */
    var novaLinha = criarNovaLinha(nomeJogador, pontuacaoJogador);

    /* Atribuindo evento de click para excluir elemento */
    novaLinha.find('#botao-remover').click(excluirElemento);

    /* Atribuindo objeto como primeiro filho do tbody */
    placar.prepend(novaLinha);

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
    var iconeRemover = $('<i>').addClass('small material-icons').text('delete_forever');

    /* Atribuindo icone remover como filho do botão remover */
    botaoRemover.append(iconeRemover);
    /* Atribuindo botão remover como filho da coluna botão */
    colunaBotao.append(botaoRemover);
    /* Atribuindo colunas a linha principal */
    linhaPlacar.append(colunaNome, colunaPontos, colunaBotao);

    /* Retornando o novo objeto criado */
    return linhaPlacar;

}

/**
 * Função para excluir elemento quando o botão excluir é acionado
 */
function excluirElemento() {

    /* Captura o elemento que foi clicado e exclui o seu parente avôs */
    $(this).parent().parent().remove();

}

/* Teste */
