"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
var readline = require("readline-sync");
var productos_1 = require("./productos");
var Proveedor = /** @class */ (function () {
    // constructor:
    function Proveedor(nombreProveedor, idProveedor, telefonoProveedor, direccion, rubros) {
        var _this = this;
        this.nombre = nombreProveedor;
        this.id = idProveedor;
        this.telefono = telefonoProveedor;
        this.direccion = direccion;
        this.rubros = rubros;
        this.catalogo = [];
        this.pedido = [];
        this.rubros.forEach(function (rubro) {
            switch (rubro) {
                case "alimentos":
                    _this.agregarProductosAlimentos();
                    break;
                case "salud":
                    _this.agregarProductosSalud();
                    break;
                case "higiene":
                    _this.agregarProductosHigiene();
                    break;
            }
        });
    }
    // metodos:
    Proveedor.prototype.agregarProductosAlimentos = function () {
        this.catalogo.push(new productos_1.Producto("Dog chow", "Alimento para perros 20kg.", "alimentos", 3000, 50));
        this.catalogo.push(new productos_1.Producto("Canin", "Alimento para perros 20kg.", "alimentos", 3000, 50));
        this.catalogo.push(new productos_1.Producto("Voraz", "Alimento para perros 10kg.", "alimentos", 1000, 50));
        this.catalogo.push(new productos_1.Producto("Exelence", "Alimento para perros 20kg.", "alimentos", 3500, 50));
        this.catalogo.push(new productos_1.Producto("Pedigree", "Alimento para perros 15kg.", "alimentos", 2000, 50));
    };
    Proveedor.prototype.agregarProductosSalud = function () {
        this.catalogo.push(new productos_1.Producto("Frontline", "Pipeta `para perros de hasta 20 kg.", "salud", 2000, 30));
        this.catalogo.push(new productos_1.Producto("Protect", "Pipeta `para perros de hasta 15 kg.", "salud", 1500, 30));
        this.catalogo.push(new productos_1.Producto("Dist", "Pipeta `para perros de hasta 20 kg.", "salud", 2000, 30));
        this.catalogo.push(new productos_1.Producto("Aqua", "Pipeta `para perros de hasta 10 kg.", "salud", 1000, 30));
    };
    Proveedor.prototype.agregarProductosHigiene = function () {
        this.catalogo.push(new productos_1.Producto("Limpito", "Shampoo para perros y gatos 500cc.", "higiene", 1500, 20));
        this.catalogo.push(new productos_1.Producto("Clean", "Shampoo para perros 500cc.", "higiene", 500, 20));
        this.catalogo.push(new productos_1.Producto("Fit pro", "Shampoo para gatos 500cc.", "higiene", 500, 20));
        this.catalogo.push(new productos_1.Producto("Buble", "Shampoo para perros y gatos 500cc.", "higiene", 1500, 20));
    };
    Proveedor.prototype.mostrarCatalogoDeCategoria = function (categoria) {
        console.log("******************************************************");
        console.log("           CATALOGO DE ", categoria);
        console.log("******************************************************");
        this.catalogo.forEach(function (Producto) {
            if (Producto.getCategoria() == categoria) {
                console.log("          ", Producto.getNombreProd());
                console.log("----", Producto.getDescripcion());
                console.log("----Precio por unidad : $", Producto.getPrecio());
                console.log("----Cantidad disponible : ", Producto.getCantidadDisponible());
                console.log("------------------------------------------------------------------");
            }
        });
    };
    //---------------------------------------------------------------------------------------------------------------------
    //Esta funcion sera utilizada cada vez que se necesite pedir ingresar un numero por teclado. Asegura el ingreso de un entero.
    Proveedor.prototype.ingresar_checkearnumero = function () {
        var cantidad = 0;
        while (cantidad == 0) {
            var cantidadSolicitada = readline.questionInt("INGRESE OPCION :");
            if (cantidadSolicitada !== undefined) {
                cantidad = Math.floor(cantidadSolicitada);
            }
            else {
                console.log("Entrada no válida. Debe ingresar un número entero.");
                cantidad = 0;
            }
        }
        return cantidad;
    };
    //----------------------------------------------------------------------------------------------------------------------
    Proveedor.prototype.generarPedido = function (categoria) {
        var _this = this;
        this.mostrarCatalogoDeCategoria(categoria);
        var productoExiste = 1;
        var productoElegido = "";
        var _loop_1 = function () {
            productoElegido = readline.question("INGRESE NOMBRE DE PRODUCTO : ");
            productoElegido = productoElegido.charAt(0).toUpperCase() + productoElegido.slice(1).toLowerCase();
            var productoAgregado_a_pedido; //Inicializamos una variable que guardara provisoriamente el producto tal cual, solo con la cantidad modificada, que es la que tendra la sucursal.
            this_1.catalogo.forEach(function (prod) {
                if (prod.getNombreProd() == productoElegido) {
                    console.log("LA CANTIDAD DISPONIBLE DE ", prod.getNombreProd(), "ES : ", prod.getCantidadDisponible());
                    console.log("INGRESE LA CANTIDAD SOLICITADA :");
                    var cantidadSolicitada = _this.ingresar_checkearnumero();
                    while (cantidadSolicitada > prod.getCantidadDisponible()) {
                        console.log("La cantidad seleccionada excede el stock disponible. Ingrese nuevamente una cantidad : ");
                        cantidadSolicitada = _this.ingresar_checkearnumero();
                    }
                    productoAgregado_a_pedido = new productos_1.Producto(prod.getNombreProd(), prod.getDescripcion(), prod.getDescripcion(), prod.getPrecio(), cantidadSolicitada);
                    prod.setRestarProductos(cantidadSolicitada); //Restamos al stock del proveedor la cantidad que nos entregara.
                    console.log("La cantidad disponible actual en stock  de ", prod.getNombreProd(), " es : ", prod.getCantidadDisponible()); //Mostramos el stock actual del proveedor.
                    _this.pedido.push(productoAgregado_a_pedido);
                    productoExiste = readline.questionInt("Desea agregar otro/s productos de la categoria ", categoria, "al pedido? - Ingrese: si:1 (o cualquier otro numero para salir de categoria.)");
                }
            });
        };
        var this_1 = this;
        while (productoExiste == 1) {
            _loop_1();
        }
        return this.pedido;
    };
    //------------------------------------------------------------------------------------------
    Proveedor.prototype.enviarProductos_a_sucursal = function (sucursalDestino, pedido) {
        pedido.forEach(function (paq) {
            paq.forEach(function (prod) {
                sucursalDestino.getProductosDisponibles().push(prod);
                console.log("PRODUCTO : ", prod.getNombreProd(), " ENVIADO A SUCURSAL : --", sucursalDestino.getNombreSucursal());
            });
        });
    };
    //---getters-setters
    Proveedor.prototype.getNombreProveedor = function () {
        return this.nombre;
    };
    Proveedor.prototype.getIdProveedor = function () {
        return this.id;
    };
    Proveedor.prototype.getTelefonoProveedor = function () {
        return this.telefono;
    };
    Proveedor.prototype.getRubroProveedor = function () {
        return this.rubros;
    };
    return Proveedor;
}());
exports.Proveedor = Proveedor;
