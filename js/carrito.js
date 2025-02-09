let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const carritoItems = document.getElementById('carrito-items');
    const totalElement = document.getElementById('totalCarrito');
    const btnFinalizarCompra = document.getElementById('finalizarCompra');
    const carritoCantidad = document.querySelector('.carrito-cantidad');

    if (!Array.isArray(carrito)) {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    actualizarCarrito();

    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.nombre} - $${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad} 
                <button class="eliminar" data-id="${item.id}">Eliminar</button>
            `;
            carritoItems.appendChild(li);
            li.querySelector('.eliminar').addEventListener('click', () => {
                carrito = carrito.filter(producto => producto.id !== item.id);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            });
            total += item.precio * item.cantidad;
        });

        totalElement.textContent = total;
        carritoCantidad.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);

        btnFinalizarCompra.disabled = carrito.length === 0;
    }

    btnFinalizarCompra.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('Carrito vacío: No hay productos en el carrito para finalizar la compra.');
        } else {
            alert('Compra Finalizada: ¡Gracias por tu compra!');
            carrito = [];
            localStorage.removeItem('carrito');
            actualizarCarrito();
        }
    });
});