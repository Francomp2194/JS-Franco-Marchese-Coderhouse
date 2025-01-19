// Definición de la clase Producto
class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

// Creación de instancias de Producto y almacenamiento en un array
const productos = [
    new Producto(1, "Camiseta Blanca", 2000, "./img/camiseta.jpg"),
    new Producto(2, "Pantalón Vaquero", 3000, "./img/vaquero.jpg"),
    new Producto(3, "Vestido Floral", 4500, "./img/vestido floral.jpg"),
    new Producto(4, "Campera de Cuero", 5500, "./img/campera de cuero.jpg"),
    new Producto(5, "Camisa a Cuadros", 2500, "./img/camisa a cuadros.jpg"),
    new Producto(6, "Falda Larga", 3000, "./img/falda larga.jpg")
];

// Inicialización del carrito, se cargará de localStorage si existe, si no, será un array vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.querySelector('.productos-container');
    const carritoItems = document.getElementById('carrito-items');
    const totalElement = document.createElement('p'); // Nuevo elemento para el total

    function renderizarProductos() {
        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-card');
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button data-id="${producto.id}">Agregar al Carrito</button>
            `;
            productosContainer.appendChild(productoDiv);

            // Evento para agregar al carrito
            productoDiv.querySelector('button').addEventListener('click', () => {
                if (carrito.length < productos.length) { // Aseguramos que no se agregen más de los disponibles
                    if (!carrito.some(item => item.id === producto.id)) {
                        carrito.push(producto);
                        localStorage.setItem('carrito', JSON.stringify(carrito));
                        actualizarCarrito();
                    }
                } else {
                    alert("Todos los productos ya están en el carrito.");
                }
            });

            // Efecto hover
            productoDiv.addEventListener('mouseenter', () => productoDiv.classList.add('hover-effect'));
            productoDiv.addEventListener('mouseleave', () => productoDiv.classList.remove('hover-effect'));
        });
    }

    function actualizarCarrito() {
        carritoItems.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio}`;
            carritoItems.appendChild(li);
            total += item.precio;
        });

        totalElement.textContent = `Total: $${total}`;
        carritoItems.appendChild(totalElement);
    }

    // Renderizar productos y actualizar carrito al iniciar
    renderizarProductos();
    
    // Verificar si hay productos en el carrito al cargar la página
    if (carrito.length === 0) {
        console.log("El carrito está vacío al cargar la página.");
    } else {
        console.log("Carrito cargado con:", carrito);
    }
    actualizarCarrito();
});