document.getElementById('saleForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    
    const totalPrice = quantity * price;

    const resultDiv = document.getElementById('saleResult');
    resultDiv.innerHTML = `
        <p><strong>Produto:</strong> ${productName}</p>
        <p><strong>Quantidade:</strong> ${quantity}</p>
        <p><strong>Preço Unitário:</strong> R$ ${price}</p>
        <p><strong>Preço Total:</strong> R$ ${totalPrice}</p>
    `;

    // Limpar formulário
    document.getElementById('saleForm').reset();
});
