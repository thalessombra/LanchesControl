document.addEventListener('DOMContentLoaded', function () {
  let funcionarios = [];
  let editando = false;
  let funcionarioEditando = null;

  const form = document.getElementById('funcionario-form');
  const tbody = document.getElementById('funcionarios-tbody');
  const tabelaFuncionarios = document.getElementById('tabela-funcionarios');
  const visualizarBtn = document.getElementById('visualizar-funcionarios');
  const cancelarEdicaoBtn = document.getElementById('cancelar-edicao');

  // Dados de exemplo
  const dadosIniciais = [
      { id: 1, nome: 'Ana Silva', cargo: 'Gerente', salario: '5000', data_contratacao: '2020-01-10', email: 'ana.silva@example.com', telefone: '123456789' },
      { id: 2, nome: 'Carlos Pereira', cargo: 'Analista', salario: '4000', data_contratacao: '2019-03-22', email: 'carlos.pereira@example.com', telefone: '987654321' }
  ];

  // Carregar dados iniciais
  funcionarios = dadosIniciais;
  renderTabela();

  form.addEventListener('submit', function (event) {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const cargo = document.getElementById('cargo').value;
      const salario = document.getElementById('salario').value;
      const data_contratacao = document.getElementById('data_contratacao').value;
      const email = document.getElementById('email').value;
      const telefone = document.getElementById('telefone').value;

      if (editando) {
          // Atualizar o funcionário existente
          funcionarioEditando.nome = nome;
          funcionarioEditando.cargo = cargo;
          funcionarioEditando.salario = salario;
          funcionarioEditando.data_contratacao = data_contratacao;
          funcionarioEditando.email = email;
          funcionarioEditando.telefone = telefone;

          editando = false;
          funcionarioEditando = null;
          cancelarEdicaoBtn.style.display = 'none';
      } else {
          // Adicionar novo funcionário
          const novoId = funcionarios.length ? funcionarios[funcionarios.length - 1].id + 1 : 1;
          const novoFuncionario = { id: novoId, nome, cargo, salario, data_contratacao, email, telefone };
          funcionarios.push(novoFuncionario);
      }

      renderTabela();
      resetForm();
  });

  cancelarEdicaoBtn.addEventListener('click', function () {
      editando = false;
      funcionarioEditando = null;
      cancelarEdicaoBtn.style.display = 'none';
      resetForm();
  });

  visualizarBtn.addEventListener('click', function () {
      if (tabelaFuncionarios.style.display === 'none') {
          tabelaFuncionarios.style.display = 'table';
      } else {
          tabelaFuncionarios.style.display = 'none';
      }
  });

  function renderTabela() {
      tbody.innerHTML = '';
      funcionarios.forEach(funcionario => {
          const tr = document.createElement('tr');

          tr.innerHTML = `
              <td class="border px-4 py-2">${funcionario.id}</td>
              <td class="border px-4 py-2">${funcionario.nome}</td>
              <td class="border px-4 py-2">${funcionario.cargo}</td>
              <td class="border px-4 py-2">${funcionario.salario}</td>
              <td class="border px-4 py-2">${funcionario.data_contratacao}</td>
              <td class="border px-4 py-2">${funcionario.email}</td>
              <td class="border px-4 py-2">${funcionario.telefone}</td>
              <td class="border px-4 py-2">
                  <button onclick="editarFuncionario(${funcionario.id})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2">
                      <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button onclick="deletarFuncionario(${funcionario.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                      <i class="fas fa-times"></i>
                  </button>
              </td>
          `;

          tbody.appendChild(tr);
      });
  }

  window.editarFuncionario = function (id) {
      const funcionario = funcionarios.find(func => func.id === id);
      document.getElementById('nome').value = funcionario.nome;
      document.getElementById('cargo').value = funcionario.cargo;
      document.getElementById('salario').value = funcionario.salario;
      document.getElementById('data_contratacao').value = funcionario.data_contratacao;
      document.getElementById('email').value = funcionario.email;
      document.getElementById('telefone').value = funcionario.telefone;

      editando = true;
      funcionarioEditando = funcionario;
      cancelarEdicaoBtn.style.display = 'inline-block';
  };

  window.deletarFuncionario = function (id) {
      funcionarios = funcionarios.filter(func => func.id !== id);
      renderTabela();
  };

  function resetForm() {
      form.reset();
  }
});
