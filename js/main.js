const productos = [
  {
    id: "01",
    nombre: "Hamburguesa Simple",
    img: "https://images.pexels.com/photos/551991/pexels-photo-551991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    precio: 600,
  },

  {
    id: "02",
    nombre: "Hamburguesa Bacon",
    img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    precio: 1100,
  },

  {
    id: "03",
    nombre: "Hamburguesa Pollo",
    img: "https://images.pexels.com/photos/1893557/pexels-photo-1893557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    precio: 950,
  },

  {
    id: "04",
    nombre: "Hamburguesa 4 quesos",
    img: "https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    precio: 1150,
  },

  {
    id: "05",
    nombre: "Hamburguesa Vegetariana",
    img: "https://images.pexels.com/photos/12325277/pexels-photo-12325277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    precio: 1200,
  },

  {
    id: "06",
    nombre: "Papas Fritas",
    img: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    precio: 600,
  },
];

const contenedorProductos = document.querySelector("#cardsContainer");
let botonAgregar = document.querySelectorAll(".btn-primary");
const numerito = document.querySelector("#numerito");

function cargaProductos() {
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <div class="card" style="width: 18rem">
    <img
    src="${producto.img}"
    class="card-img-top"
    alt="${producto.nombre}"
    />
    <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">
          $${producto.precio}
          </p>
          <button class="btn-primary" id="${producto.id}">Agregar</button>
          </div>
          </div>
          `;

    contenedorProductos.append(div);
  });
  actualizarBotonAgregar();
}
cargaProductos();

function actualizarBotonAgregar() {
  botonAgregar = document.querySelectorAll(".btn-primary");
  botonAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  Toastify({
    text: "Producto Agregado",
    duration: 3000,

    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #01A1A1, #000)",
      borderRadius: "2rem",
      fontSize: "1rem",
    },
    offset: {
      x: "1rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
      y: "3rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }
  actualizarNumerito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}
