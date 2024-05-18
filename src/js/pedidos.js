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
        { id: 1, cliente: 'Cliente 1', data: '2022-05-10', total: '150.00', status: 'Pendente' },
        { id: 2, cliente: 'Cliente 2', data: '2022-05-12', total: '250.00', status: 'Concluído' }
    ];

    // Carregar dados iniciais
    pedidos = dadosIniciais;
    renderTabela();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const cliente = document.getElementById('cliente').value;
        const data = document.getElementById('data').value;
        const total = document.getElementById('total').value;
        const status = document.getElementById('status').value;

        if (editando) {
            // Atualizar o pedido existente
            pedidoEditando.cliente = cliente;
            pedidoEditando.data = data;
            pedidoEditando.total = total;
            pedidoEditando.status = status;

            editando = false;
            pedidoEditando = null;
            cancelarEdicaoBtn.style.display = 'none';
        } else {
            // Adicionar novo pedido
            const novoId = pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1;
            const novoPedido = { id: novoId, cliente, data, total, status };
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
                <td class="border px-4 py-2">${pedido.id}</td>
                <td class="border px-4 py-2">${pedido.cliente}</td>
                <td class="border px-4 py-2">${pedido.data}</td>
                <td class="border px-4 py-2">${pedido.total}</td>
                <td class="border px-4 py-2">${pedido.status}</td>
                <td class="border px-4 py-2">
                    <button onclick="editarPedido(${pedido.id})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button onclick="deletarPedido(${pedido.id})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
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

    window.editarPedido = function (id) {
        const pedido = pedidos.find(ped => ped.id === id);
        document.getElementById('cliente').value = pedido.cliente;
        document.getElementById('data').value = pedido.data;
        document.getElementById('total').value = pedido.total;
        document.getElementById('status').value = pedido.status;

        editando = true;
        pedidoEditando = pedido;
        cancelarEdicaoBtn.style.display = 'inline-block';
        form.style.display = 'block'; // Exibir o formulário ao editar pedido
    };

    window.deletarPedido = function (id) {
        pedidos = pedidos.filter(ped => ped.id !== id);
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
