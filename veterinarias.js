"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veterinarias = void 0;
var readline = require("readline-sync");
var sucursales_1 = require("./sucursales");
var productos_1 = require("./productos");
var clientes_1 = require("./clientes");
var Veterinarias = /** @class */ (function () {
    function Veterinarias() {
        this.categoriaDeProductos = ["Alimentos", "Salud", "Higiene"];
        this.prodAlimentos = [];
        this.prodSalud = [];
        this.prodHigiene = [];
        this.sucursales = [];
        this.proveedores = [];
    }
    //-----------------------------------------------------------------------------------------------
    Veterinarias.prototype.agregarProductosAlCatalogo = function () {
        var dogchow = new productos_1.Producto("Dog chow", "Alimento para perros 20kg.", "alimentos", 3000, 50);
        this.prodAlimentos.push(dogchow);
        var shampoo = new productos_1.Producto("Limpito", "Shampoo para perros y gatos 500cc.", "higiene", 1500, 20);
        this.prodHigiene.push(shampoo);
        var pipeta = new productos_1.Producto("Frontline", "Pipeta `para perros de hasta 20 kg.", "salud", 2000, 30);
        this.prodSalud.push(pipeta);
    };
    //--------------------------------------------------------------------------------------------------
    Veterinarias.prototype.crearSucursal = function (nombreSucursal, direccion, telefono) {
        var idSucursal = 0;
        while (idSucursal == 0) {
            idSucursal = Math.floor(Math.random() * 100); //Se genera un numero aleatorio hasta el 100.
            this.getSucursales().forEach(function (sucursal) {
                if (sucursal.getIdSucursal() == idSucursal) { //Chekea si se repite el numero generado.
                    idSucursal = 0;
                }
            });
        }
        this.sucursales.push(new sucursales_1.Sucursal(nombreSucursal, direccion, telefono, idSucursal)); // aqui directamente creamos una sucursal (con los parametros pasados y automaticamente se guarda en la lista de "sucursales.")
        console.log("--------SE HA CREADO LA SUCURSAL DE BARRIO ", nombreSucursal, "-------");
    };
    //-----------------------------------------------------------------------------------------------
    Veterinarias.prototype.mostrarSucursales = function () {
        console.log("*************************************************");
        console.log("           SUCURSALES DISPONIBLES :  ");
        console.log("*************************************************");
        this.sucursales.forEach(function (e) {
            console.log("--Nombre de sucursal : --", e.getNombreSucursal());
            console.log("--Direccion : --", e.getDireccionSucursal());
            console.log("--Telefono : --", e.getTelefono());
            console.log("--ID : --", e.getIdSucursal());
            console.log("-----------------------------------------------------");
        });
    };
    Veterinarias.prototype.mostrarIdDeSucursales = function () {
        this.getSucursales().forEach(function (sucur) {
            console.log("             *SUCURSAL ", sucur.getNombreSucursal(), " ID : ", sucur.idSucursal);
            console.log("     < ------------------------------------------- >                       ");
        });
    };
    Veterinarias.prototype.chequear_Id_Sucursal_Existe = function (id) {
        var existe = false;
        this.sucursales.forEach(function (sucursal) {
            if (sucursal.getIdSucursal() == id) {
                existe = true;
            }
        });
        return existe;
    };
    Veterinarias.prototype.buscarSucursal_por_Id = function () {
        var existe = false;
        var numSucursal = 0; //Aqui nos aseguramos que el ID ingresado sea correcto.
        while (existe == false) {
            numSucursal = readline.questionInt("**Ingrese el numero ID de la sucursal seleccionada : ");
            existe = this.chequear_Id_Sucursal_Existe(numSucursal);
        }
        var sucursalElegida = new sucursales_1.Sucursal("", "", 0, 0);
        this.sucursales.forEach(function (sucursal) {
            if (sucursal.getIdSucursal() == numSucursal) {
                sucursalElegida = sucursal;
            }
            return sucursalElegida;
        });
        return sucursalElegida;
    };
    Veterinarias.prototype.eliminarSucursal = function () {
        //Aqui "indice" guardara la posicion en la que se encuentra la sucursal.
        var indice = this.getSucursales().indexOf(this.buscarSucursal_por_Id());
        var sucursalEliminada = this.getSucursales()[indice].getNombreSucursal();
        this.getSucursales().splice(indice, 1);
        console.log("      !! SE HA ELIMINADO LA SUCURSAL : ", sucursalEliminada);
    };
    Veterinarias.prototype.chequearClienteExiste = function (nombre, apellido) {
        var existe = false;
        this.sucursales.forEach(function (sucursal) {
            sucursal.getClientes().forEach(function (cliente) {
                if (cliente.getApellidoCliente() == apellido && cliente.getNombreCliente() == nombre) {
                    existe = true;
                }
            });
        });
        return existe;
    };
    Veterinarias.prototype.traerCliente = function (nombre, apellido) {
        var sucursalElegida = new clientes_1.Cliente("", 0, "", "", 0, "", 0);
        this.sucursales.forEach(function (sucursal) {
            sucursal.getClientes().forEach(function (cliente) {
                if (cliente.getApellidoCliente() == apellido && cliente.getNombreCliente() == nombre) {
                    sucursalElegida = cliente;
                }
            });
        });
        return sucursalElegida;
    };
    Veterinarias.prototype.enviarProductos_a_sucursal = function () {
        var sucursalDestino = this.buscarSucursal_por_Id(); //Selecciona una sucursal y la trae para modificar su lista de productos disponibles.
        var cantidadTotalDeEnvios = readline.questionInt("Ingrese la cantidad total de envios que desea realizar : ");
        var _loop_1 = function () {
            var categoriaDelEnvio = readline.question("INGRESE LA CATEGORIA DEL PRODUCTO QUE SE ENVIARA A SUCURSAL : ----").toLowerCase(); // Convierte todo el texto a minuscula.
            var nombreProducto = readline.question("INGRESE NOMBRE DEL PRODUCTO QUE ENVIA A SUCURSAL : ----");
            nombreProducto = nombreProducto.charAt(0).toUpperCase() + nombreProducto.slice(1).toLowerCase(); //Convierte la primera letra a mayuscula. Esto es necesario para buscar en la lista de productos, el nombre que siempre estara en mayuscula.
            var cantidad_a_Enviar = readline.questionInt("CANTIDAD A ENVIAR DE ESTE PRODUCTO : ----");
            switch (categoriaDelEnvio) {
                case "alimentos":
                    this_1.prodAlimentos.forEach(function (prod) {
                        if (prod.getNombreProd() == nombreProducto) {
                            sucursalDestino.getProductosDisponibles().push(prod);
                            cantidadTotalDeEnvios -= cantidad_a_Enviar;
                            prod.setAgregarProductos(cantidad_a_Enviar);
                            console.log("     SE ENVIARON A SUCURSAL ", sucursalDestino.getNombreSucursal(), " : ", cantidad_a_Enviar, prod.getNombreProd());
                        }
                    });
                    break;
                case "salud":
                    this_1.prodSalud.forEach(function (prod) {
                        if (prod.getNombreProd() == nombreProducto) {
                            sucursalDestino.getProductosDisponibles().push(prod);
                            cantidadTotalDeEnvios -= cantidad_a_Enviar;
                            prod.setAgregarProductos(cantidad_a_Enviar);
                            console.log("      SE ENVIARON A SUCURSAL ", sucursalDestino.getNombreSucursal(), " : ", cantidad_a_Enviar, prod.getNombreProd());
                        }
                    });
                    break;
                case "higiene":
                    this_1.prodHigiene.forEach(function (prod) {
                        if (prod.getNombreProd() == nombreProducto) {
                            sucursalDestino.getProductosDisponibles().push(prod);
                            cantidadTotalDeEnvios -= cantidad_a_Enviar;
                            prod.setAgregarProductos(cantidad_a_Enviar);
                            console.log("     SE ENVIARON A SUCURSAL ", sucursalDestino.getNombreSucursal(), " : ", cantidad_a_Enviar, prod.getNombreProd());
                        }
                    });
                    break;
            }
        };
        var this_1 = this;
        while (cantidadTotalDeEnvios > 0) {
            _loop_1();
        }
        console.log("//////////////////////////////////////////////////////////////////////////////////");
        console.log("PRODUCTOS DISPONIBLES EN SUCURSAL  ", sucursalDestino.getNombreSucursal(), " :  ");
        console.log("-----------------------------------------------------------------------------------");
        console.log(sucursalDestino.mostrarProductos());
        console.log("//////////////////////////////////////////////////////////////////////////////////");
    };
    Veterinarias.prototype.getSucursales = function () {
        return this.sucursales;
    };
    return Veterinarias;
}());
exports.Veterinarias = Veterinarias;
