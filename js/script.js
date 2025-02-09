class Producto {
  constructor(id, nombre, precio, imagen, categoria) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.imagen = imagen;
      this.categoria = categoria;
  }
}

class ProductoEnCarrito {
  constructor(producto, cantidad) {
      this.id = producto.id;
      this.nombre = producto.nombre;
      this.precio = producto.precio;
      this.imagen = producto.imagen;
      this.cantidad = cantidad;
  }
}

let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
  const productosContainer = document.querySelector('.productos-container');
  const filtroNombre = document.getElementById('filtroNombre');
  const filtroCategoria = document.getElementById('filtroCategoria');
  const btnFiltrar = document.getElementById('btnFiltrar');

  if (!Array.isArray(carrito)) {
      carrito = [];
      localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Array estático de productos para depuración
  productos = [
      new Producto(1, "Camiseta Blanca", 2000, "./img/camiseta.jpg", "Camisetas"),
      new Producto(2, "Pantalón Vaquero", 3000, "./img/vaquero.jpg", "Pantalones"),
      new Producto(3, "Vestido Floral", 4500, "./img/vestido floral.jpg", "Vestidos"),
      new Producto(4, "Campera de Cuero", 5500, "./img/campera de cuero.jpg", "Cámporas"),
      new Producto(5, "Camisa a Cuadros", 2500, "./img/camisa a cuadros.jpg", "Camisas"),
      new Producto(6, "Falda Larga", 3000, "./img/falda larga.jpg", "Faldas")
  ];
  renderizarProductos(productos);

  btnFiltrar.addEventListener('click', filtrarProductos);

  function renderizarProductos(productos) {
      productosContainer.innerHTML = '';
      
      if (productos.length === 0) {
          productosContainer.textContent = 'No se encontraron productos';
          return;
      }

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

          productoDiv.querySelector('button').addEventListener('click', () => {
              let productoEnCarrito = carrito.find(item => item.id === producto.id);
              if (productoEnCarrito) {
                  productoEnCarrito.cantidad += 1;
              } else {
                  carrito.push(new ProductoEnCarrito(producto, 1));
              }
              localStorage.setItem('carrito', JSON.stringify(carrito));

              const notificacion = document.createElement('div');
              notificacion.classList.add('notificacion');
              notificacion.textContent = `${producto.nombre} añadido al carrito`;
              document.body.appendChild(notificacion);
              setTimeout(() => notificacion.remove(), 3000);

              document.querySelector('.carrito-cantidad').textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
          });
      });
  }

  function filtrarProductos() {
      const nombre = filtroNombre.value.toLowerCase();
      const categoria = filtroCategoria.value;

      const productosFiltrados = productos.filter(producto => {
          const nombreMatch = producto.nombre.toLowerCase().includes(nombre);
          const categoriaMatch = categoria === '' || producto.categoria === categoria;
          return nombreMatch && categoriaMatch;
      });

      renderizarProductos(productosFiltrados);
  }
});