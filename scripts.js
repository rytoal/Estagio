let carrinho = [];

function mostrarSecao(secao) {
    const secoes = document.querySelectorAll('.secao');
    secoes.forEach(s => s.style.display = 'none');
    document.getElementById(secao).style.display = 'block';

    const abas = document.querySelectorAll('nav ul li');
    abas.forEach(aba => {
        aba.classList.toggle('ativo', aba.querySelector('a').getAttribute('onclick').includes(secao));
    });
}

function adicionarAoCarrinho(nome, preco) {
    const nomeImagem = nome.toLowerCase().replace(/\s+/g, '');
    carrinho.push({ nome, preco, nomeImagem, observacao: '' });
    mostrarNotificacao(`${nome} foi adicionado ao carrinho!`);
}

function abrirCarrinho() {
    const janela = document.getElementById('carrinho-janela');
    const itensCarrinho = carrinho.map((item, indice) => `
        <div class="item">
            <img src="img/${item.nomeImagem}.png" alt="${item.nome}">
            <div class="info">
                <p>${item.nome} - ${item.preco}</p>
                <textarea placeholder="Observações" oninput="atualizarObservacao(${indice}, this.value)">${item.observacao}</textarea>
                <button onclick="removerDoCarrinho(${indice})">Remover</button>
            </div>
        </div>
    `).join('');
    document.querySelector('#carrinho-janela .corpo').innerHTML = itensCarrinho;
    janela.style.display = 'flex';
}

function fecharCarrinho() {
    document.getElementById('carrinho-janela').style.display = 'none';
}

function removerDoCarrinho(indice) {
    carrinho.splice(indice, 1);
    abrirCarrinho();
    mostrarNotificacao('Item removido do carrinho!', 'erro');
}

function atualizarObservacao(indice, valor) {
    carrinho[indice].observacao = valor;
}

function finalizarPedido() {
    fecharCarrinho();
    document.getElementById('finalizar-janela').style.display = 'flex';
}

function fecharFinalizar() {
    document.getElementById('finalizar-janela').style.display = 'none';
}

document.getElementById('pagamento').addEventListener('change', function() {
    document.getElementById('troco').style.display = this.value === 'Dinheiro' ? 'block' : 'none';
});

function enviarPedido() {
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const pagamento = document.getElementById('pagamento').value;
    const trocoValor = document.getElementById('troco-valor').value;

    let mensagem = '*Acabei de fazer meu pedido!*%0A%0A';
    mensagem += `Meu nome é ${encodeURIComponent(nome)}, a entrega será no endereço ${encodeURIComponent(endereco)}, ${encodeURIComponent(bairro)}%0A`;
    mensagem += `A forma de pagamento escolhida foi ${encodeURIComponent(pagamento)}`;
    if (pagamento === 'Dinheiro' && trocoValor) {
        mensagem += ` e preciso de troco para ${encodeURIComponent(trocoValor)}%0A`;
    } else {
        mensagem += `%0A`;
    }

    mensagem += `%0A*Detalhes do pedido:*%0A`;
    carrinho.forEach(item => {
        mensagem += `${encodeURIComponent(item.nome)} - ${encodeURIComponent(item.preco)}`;
        if (item.observacao) {
            mensagem += ` (Observação: ${encodeURIComponent(item.observacao)})`;
        }
        mensagem += `%0A`;
    });

    const whatsappUrl = `https://wa.me/5528999999999?text=${mensagem}`;
    window.open(whatsappUrl, '_blank');
}


function mostrarNotificacao(mensagem, tipo = 'success') {
    const notificacao = document.getElementById('notificacao');
    notificacao.textContent = mensagem;
    notificacao.className = `notificacao ${tipo}`;
    notificacao.style.display = 'block';
    setTimeout(() => {
        notificacao.style.display = 'none';
    }, 3000);
}

mostrarSecao('lanches');