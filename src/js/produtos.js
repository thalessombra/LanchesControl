document.addEventListener('DOMContentLoaded', function () {
  let produtos = [];
  let editando = false;
  let produtoEditando = null;

  const form = document.getElementById('produto-form');
  const tbody = document.getElementById('produtos-tbody');
  const tabelaProdutos = document.getElementById('tabela-produtos');
  const visualizarBtn = document.getElementById('visualizar-produtos');
  const cancelarEdicaoBtn = document.getElementById('cancelar-edicao');

  // Dados de exemplo
  const dadosIniciais = [
      { id: 1, nome: 'Produto 1', descricao: 'Descrição 1', preco: '100', categoria: 'Categoria 1', estoque: '10' },
      { id: 2, nome: 'Produto 2', descricao: 'Descrição 2', preco: '200', categoria: 'Categoria 2', estoque: '20' }
  ];

  // Carregar dados iniciais
  produtos = dadosIniciais;
  renderTabela();

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const descricao = document.getElementById('descricao').value;
      const preco = document.getElementById('preco').value;
      const categoria = document.getElementById('categoria').value;
      const estoque = document.getElementById('estoque').value;

      if (editando) {
          // Atualizar o produto existente
          produtoEditando.nome = nome;
          produtoEditando.descricao = descricao;
          produtoEditando.preco = preco;
          produtoEditando.categoria = categoria;
          produtoEditando.estoque = estoque;

          editando = false;
          produtoEditando = null;
          cancelarEdicaoBtn.style.display = 'none';
      } else {
          // Adicionar novo produto
          const novoId = produtos.length ? produtos[produtos.length - 1].id + 1 : 1;
          const novoProduto = { id: novoId, nome, descricao, preco, categoria, estoque };
          produtos.push(novoProduto);
      }

      renderTabela();
      resetForm();
  });

  cancelarEdicaoBtn.addEventListener('click', function () {
      editando = false;
      produtoEditando = null;
      cancelarEdicaoBtn.style.display = 'none';
      resetForm();
  });

  visualizarBtn.addEventListener('click', function () {
      if (tabelaProdutos.style.display === 'none') {
          tabelaProdutos.style.display = 'table';
      } else {
          tabelaProdutos.style.display = 'none';
      }
  });

  function renderTabela() {
      tbody.innerHTML = '';
      produtos.forEach(produto => {
          const tr = document.createElement('tr');

          tr.innerHTML = `
              <td class="border px-4 py-2">${produto.id}</td>
              <td class="border px-4 py-2">${produto.nome}</td>
              <td class="border px-4 py-2">${produto.descricao}</td>
              <td class="border px-4 py-2">${produto.preco}</td>
              <td class="border px-4 py-2">${produto.categoria}</td>
              <td class="border px-4 py-2">${produto.estoque}</td>
              <td class="border px-4 py-2">
                  <button onclick="editarProduto(${produto.id})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2">
                      <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button onclick="deletarProduto(${produto.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                      <i class="fas fa-times"></i>
                  </button>
              </td>
          `;

          tbody.appendChild(tr);
      });
  }

  window.editarProduto = function (id) {
      const produto = produtos.find(prod => prod.id === id);
      document.getElementById('nome').value = produto.nome;
      document.getElementById('descricao').value = produto.descricao;
      document.getElementById('preco').value = produto.preco;
      document.getElementById('categoria').value = produto.categoria;
      document.getElementById('estoque').value = produto.estoque;

      editando = true;
      produtoEditando = produto;
      cancelarEdicaoBtn.style.display = 'inline-block';
  };

  window.deletarProduto = function (id) {
      produtos = produtos.filter(prod => prod.id !== id);
      renderTabela();
  };

  function resetForm() {
      form.reset();
  }
});
