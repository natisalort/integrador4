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
    Proveedor.prototype.generarPedido = function (categoria) {
        var _this = this;
        this.mostrarCatalogoDeCategoria(categoria);
        var productoExiste = false;
        var productoElegido = "";
        var _loop_1 = function () {
            productoElegido = readline.question("INGRESE NOMBRE DE PRODUCTO : ");
            productoElegido = productoElegido.charAt(0).toUpperCase() + productoElegido.slice(1).toLowerCase();
            var productoAgregado_a_pedido; //Inicializamos una variable que guardara provisoriamente el producto tal cual, solo con la cantidad modificada, que es la que tendra la sucursal.
            this_1.catalogo.forEach(function (prod) {
                if (prod.getNombreProd() == productoElegido) {
                    console.log("LA CANTIDAD DISPONIBLE DE ", prod.getNombreProd(), "ES : ", prod.getCantidadDisponible());
                    var cantidadSolicitada = 0;
                    while (cantidadSolicitada == 0) {
                        cantidadSolicitada = readline.questionInt("INGRESE LA CANTIDAD SOLICITADA :");
                        if (cantidadSolicitada > prod.getCantidadDisponible()) {
                            console.log("La cantidad seleccionada excede el stock disponible. Ingrese nuevamente una cantidad : ");
                            cantidadSolicitada = 0;
                        }
                        else {
                            productoAgregado_a_pedido = prod;
                            productoAgregado_a_pedido.setModificarCantidad(cantidadSolicitada);
                        }
                        prod.setRestarProductos(cantidadSolicitada); //Restamos al stock del proveedor la cantidad que nos entregara.
                        console.log("La cantidad disponible actual en stock es de ", prod.getNombreProd(), " es : ", prod.getCantidadDisponible()); //Mostramos el stock actual del proveedor.
                        _this.pedido.push(productoAgregado_a_pedido);
                        console.log("PEDIDO : ", _this.pedido);
                        productoExiste = true;
                    }
                }
            });
        };
        var this_1 = this;
        while (productoExiste == false) {
            _loop_1();
        }
        return this.pedido;
    };
    //------------------------------------------------------------------------------------------
    Proveedor.prototype.enviarProductos_a_sucursal = function (sucursalDestino, pedido) {
        sucursalDestino.getProductosDisponibles().push(pedido);
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
