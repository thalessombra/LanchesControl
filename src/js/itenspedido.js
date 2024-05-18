document.addEventListener('DOMContentLoaded', function () {
  let pedidos = [];
  let editando = false;
  let pedidoEditando = null;

  const form = document.getElementById('pedido-form');
  const tbody = document.getElementById('pedidos-tbody');
  const cancelarEdicaoBtn = document.getElementById('cancelar-edicao');

  // Esconder o formulário ao carregar a página
  form.style.display = 'none';

  // Dados de exemplo
  const dadosIniciais = [
      { id_pedido: 1, id_produto: '101', quantidade: 2, preco: '30.00' },
      { id_pedido: 2, id_produto: '102', quantidade: 1, preco: '45.00' }
  ];

  // Carregar dados iniciais
  pedidos = dadosIniciais;
  renderTabela();

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const id_produto = document.getElementById('id_produto').value;
      const quantidade = document.getElementById('quantidade').value;
      const preco = document.getElementById('preco').value;

      if (editando) {
          // Atualizar o pedido existente
          pedidoEditando.id_produto = id_produto;
          pedidoEditando.quantidade = quantidade;
          pedidoEditando.preco = preco;

          editando = false;
          pedidoEditando = null;
          cancelarEdicaoBtn.style.display = 'none';
      } else {
          // Adicionar novo pedido
          const novoIdPedido = pedidos.length ? pedidos[pedidos.length - 1].id_pedido + 1 : 1;
          const novoPedido = { id_pedido: novoIdPedido, id_produto, quantidade, preco };
          pedidos.push(novoPedido);
      }

      renderTabela();
      resetForm();
      form.style.display = 'none'; // Esconder o formulário após adicionar ou atualizar um pedido
  });

  cancelarEdicaoBtn.addEventListener('click', function () {
      editando = false;
      pedidoEditando = null;
      cancelarEdicaoBtn.style.display = 'none';
      resetForm();
      form.style.display = 'none'; // Esconder o formulário ao cancelar a edição
  });

  function renderTabela() {
      tbody.innerHTML = '';
      pedidos.forEach(pedido => {
          const tr = document.createElement('tr');

          tr.innerHTML = `
              <td class="border px-4 py-2">${pedido.id_pedido}</td>
              <td class="border px-4 py-2">${pedido.id_produto}</td>
              <td class="border px-4 py-2">${pedido.quantidade}</td>
              <td class="border px-4 py-2">${pedido.preco}</td>
              <td class="border px-4 py-2">
                  <button onclick="editarPedido(${pedido.id_pedido})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2">
                      <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button onclick="deletarPedido(${pedido.id_pedido})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                      <i class="fas fa-times"></i>
                  </button>
                  <button onclick="adicionarPedido()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2">
                      <i class="fas fa-plus"></i>
                  </button>
              </td>
          `;

          tbody.appendChild(tr);
      });
  }

  window.editarPedido = function (id_pedido) {
      const pedido = pedidos.find(ped => ped.id_pedido === id_pedido);
      document.getElementById('id_produto').value = pedido.id_produto;
      document.getElementById('quantidade').value = pedido.quantidade;
      document.getElementById('preco').value = pedido.preco;

      editando = true;
      pedidoEditando = pedido;
      cancelarEdicaoBtn.style.display = 'inline-block';
      form.style.display = 'block'; // Exibir o formulário ao editar pedido
  };

  window.deletarPedido = function (id_pedido) {
      pedidos = pedidos.filter(ped => ped.id_pedido !== id_pedido);
      renderTabela();
  };

  window.adicionarPedido = function () {
      editando = false;
      pedidoEditando = null;
      cancelarEdicaoBtn.style.display = 'none';
      resetForm();
      form.style.display = 'block'; // Exibir o formulário ao adicionar pedido
  };

  function resetForm() {
      form.reset();
  }
});
