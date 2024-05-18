document.addEventListener('DOMContentLoaded', function () {
  let itensPedido = [];
  let editando = false;
  let itemEditando = null;

  const form = document.getElementById('item-form');
  const tbody = document.getElementById('itens-tbody');
  const tabelaItens = document.getElementById('tabela-itens');
  const visualizarBtn = document.getElementById('visualizar-itens');
  const cancelarEdicaoBtn = document.getElementById('cancelar-edicao');

  // Dados de exemplo
  const dadosIniciais = [
      { idPedido: 1, idProduto: 1, quantidade: 2, preco: 50 },
      { idPedido: 1, idProduto: 2, quantidade: 1, preco: 30 }
  ];

  // Carregar dados iniciais
  itensPedido = dadosIniciais;
  renderTabela();

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const idPedido = document.getElementById('id-pedido').value;
      const idProduto = document.getElementById('id-produto').value;
      const quantidade = document.getElementById('quantidade').value;
      const preco = document.getElementById('preco').value;

      if (editando) {
          // Atualizar o item do pedido existente
          itemEditando.idPedido = idPedido;
          itemEditando.idProduto = idProduto;
          itemEditando.quantidade = quantidade;
          itemEditando.preco = preco;

          editando = false;
          itemEditando = null;
          cancelarEdicaoBtn.style.display = 'none';
      } else {
          // Adicionar novo item do pedido
          const novoItem = { idPedido, idProduto, quantidade, preco };
          itensPedido.push(novoItem);
      }

      renderTabela();
      resetForm();
  });

  cancelarEdicaoBtn.addEventListener('click', function () {
      editando = false;
      itemEditando = null;
      cancelarEdicaoBtn.style.display = 'none';
      resetForm();
  });

  visualizarBtn.addEventListener('click', function () {
      if (tabelaItens.style.display === 'none') {
          tabelaItens.style.display = 'table';
      } else {
          tabelaItens.style.display = 'none';
      }
  });

  function renderTabela() {
      tbody.innerHTML = '';
      itensPedido.forEach(item => {
          const tr = document.createElement('tr');

          tr.innerHTML = `
              <td class="border px-4 py-2">${item.idPedido}</td>
              <td class="border px-4 py-2">${item.idProduto}</td>
              <td class="border px-4 py-2">${item.quantidade}</td>
              <td class="border px-4 py-2">${item.preco}</td>
              <td class="border px-4 py-2">
                  <button onclick="editarItem(${item.idPedido}, ${item.idProduto})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2">
                      <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button onclick="deletarItem(${item.idPedido}, ${item.idProduto})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                      <i class="fas fa-times"></i>
                  </button>
              </td>
          `;

          tbody.appendChild(tr);
      });
  }

  window.editarItem = function (idPedido, idProduto) {
      const item = itensPedido.find(it => it.idPedido === idPedido && it.idProduto === idProduto);
      document.getElementById('id-pedido').value = item.idPedido;
      document.getElementById('id-produto').value = item.idProduto;
      document.getElementById('quantidade').value = item.quantidade;
      document.getElementById('preco').value = item.preco;

      editando = true;
      itemEditando = item;
      cancelarEdicaoBtn.style.display = 'inline-block';
  };

  window.deletarItem = function (idPedido, idProduto) {
      itensPedido = itensPedido.filter(it => it.idPedido !== idPedido || it.idProduto !== idProduto);
      renderTabela();
    };

    function resetForm() {
        form.reset();
    }
});
