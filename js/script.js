const IVA = 0.21;
let carrito = [];
let total = 0;
const productos = [
    { id: 1, nombre: "Camiseta", precio: 400 },
    { id: 2, nombre: "Pantalón", precio: 600 },
    { id: 3, nombre: "Buzo", precio: 500 }
];

function mostrarProductos() {
    let listado = "";
    for (let producto of productos) {
        listado += `${producto.id} - ${producto.nombre}: $${producto.precio}\n`;
    }
    console.log(listado);
}

// agregar productos al carrito
function agregarAlCarrito() {
    let seleccion = parseInt(prompt("Seleccione el ID del producto a comprar:"));
    let producto = productos.find(p => p.id === seleccion);
    if (producto) {
        carrito.push(producto);
        total += producto.precio;
        alert(`Se agregó ${producto.nombre} al carrito.`);
    } else {
        alert("Producto no encontrado.");
    }
}

// para mostrar el total y aplicar IVA
function calcularTotal() {
    let totalFinal = total * (1 + IVA);
    console.log(`Total sin IVA: $${total}`);
    console.log(`IVA (${IVA * 100}%): $${total * IVA}`);
    console.log(`Total con IVA: $${totalFinal}`);
}

// Ciclo de interacción con el usuario
let continuar = true;
while (continuar) {
    mostrarProductos();
    agregarAlCarrito();
    continuar = confirm("¿Desea agregar otro producto?");
}
calcularTotal();