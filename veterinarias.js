"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veterinarias = void 0;
var readline = require("readline-sync");
var sucursales_1 = require("./sucursales");
var proveedores_1 = require("./proveedores");
var clientes_1 = require("./clientes");
var Veterinarias = /** @class */ (function () {
    function Veterinarias() {
        this.categoriaDeProductos = ["Alimentos", "Salud", "Higiene"];
        this.sucursales = [];
        this.proveedores = [];
    }
    //-----------------------------------------------------------------------------------------------
    Veterinarias.prototype.crearChequearId = function (array) {
        var IdExiste = true;
        var idAsignado = 0;
        while (IdExiste == true) {
            idAsignado = Math.floor(Math.random() * 100) * 10000;
            IdExiste = this.chequear_Id_proveedor_Existe(idAsignado, array);
        }
        return idAsignado;
    };
    Veterinarias.prototype.chequear_Id_proveedor_Existe = function (id, arreglo) {
        var existe = false;
        arreglo.forEach(function (item) {
            if (item.id == id) {
                existe = true;
            }
        });
        return existe;
    };
    Veterinarias.prototype.chequear_Id_Sucursal_Existe = function (id, arreglo) {
        var existe = false;
        arreglo.forEach(function (item) {
            if (item.id == id) {
                existe = true;
            }
        });
        return existe;
    };
    //---------------------------------------------------------------------------------------------------------------------
    Veterinarias.prototype.ingresarCheckearNumero = function () {
        var cantidad = 0;
        while (cantidad == 0) {
            var cantidadSolicitada = readline.questionInt("  **INGRESE LA  OPCION :  ");
            console.log("****************************************************************");
            if (cantidadSolicitada !== undefined) {
                cantidad = Math.floor(cantidadSolicitada);
            }
            else {
                console.log("Entrada no válida. Debe ingresar un número correcto.");
                cantidad = 0;
            }
        }
        return cantidad;
    };
    Veterinarias.prototype.ingresar_ChekearCategoria = function () {
        var categoriaIngresada = "";
        while (categoriaIngresada == "") {
            categoriaIngresada = readline.question("**INGRESE LA CATEGORIA  : Alimentos , Higiene o Salud----").toLowerCase();
            if (categoriaIngresada != "alimentos" && categoriaIngresada != "higiene" && categoriaIngresada != "salud") {
                categoriaIngresada = "";
            }
        }
        return categoriaIngresada;
    };
    //-----------------------
    Veterinarias.prototype.crearProveedor = function () {
        var rubros = [];
        console.log("************************************************");
        console.log("           **DATOS DEL PROVEEDOR: ");
        console.log("************************************************");
        var nombreProveedor = readline.question("  *Nombre: ");
        nombreProveedor = nombreProveedor.charAt(0).toUpperCase() + nombreProveedor.slice(1);
        var telefonoProveedor = readline.questionInt("  *Telefono:");
        var direccion = readline.question("  *Direccion:");
        // opciones de rubro
        console.log("************************************************");
        console.log("           **RUBROS DEL PROVEEDOR: ");
        console.log("************************************************");
        var agregar = 1;
        while (agregar == 1) {
            console.log("  *Indique rubro/s de proveedor : 1. Alimentos, 2. Salud, 3. Higiene :  ");
            var categ = this.ingresarCheckearNumero();
            var rubro = "";
            while (categ < 1 && categ > 3) {
                console.log("-----La opcion ingresada NO es correcta!------");
                console.log("  *Indique rubro/s de proveedor : 1. Alimentos, 2. Salud, 3. Higiene :  ");
                categ = this.ingresarCheckearNumero();
            }
            switch (categ) {
                case 1:
                    rubros.push("alimentos");
                    rubro = "alimentos";
                    break;
                case 2:
                    rubros.push("salud");
                    rubro = "alimentos";
                    break;
                case 3:
                    rubros.push("higiene");
                    rubro = "higiene";
                    break;
            }
            console.log("Desea agregar rubro a este proveedor? - si: ingrese 1 ,(o ingrese otro numero para terminar");
            agregar = this.ingresarCheckearNumero();
        }
        var idAsignado = this.crearChequearId(this.proveedores); //Creamos y cchequeamos no repetir ID
        this.proveedores.push(new proveedores_1.Proveedor(nombreProveedor, idAsignado, telefonoProveedor, direccion, rubros)); //Creamos un proveedor con todos los datos obtenidos y directamente los guardamos en la lista de proveedores.
    };
    Veterinarias.prototype.mostrarListaProveedores = function (array) {
        console.log("------------------------------------------------------------------");
        console.log("            LISTA DE PROVEEDORES  : ");
        console.log("-----------------------------------------------------------------");
        array.forEach(function (item) {
            console.log("--Nombre del proveedor: ", item.getNombreProveedor());
            console.log("--ID del proveedor: ", item.getIdProveedor());
            console.log("--Telefono del proveedor: ", item.getTelefonoProveedor());
            console.log("--Rubro: ", item.getRubroProveedor());
            console.log("      ------------------------------------------");
        });
    };
    Veterinarias.prototype.modificarProveedor = function () {
        var _this = this;
        this.mostrarListaProveedores(this.proveedores);
        var proveedorElegido = this.traerProveedor();
        var otraModificacion = 1;
        while (otraModificacion == 1) {
            console.log("          Desea modificar? presione 1.");
            console.log("      < ---------------------------------- >          ");
            console.log("      Desea eliminar proveedor? presione 2.");
            var opcionSeleccionada1 = 0;
            while (opcionSeleccionada1 < 1 || opcionSeleccionada1 > 2) {
                var accion = this.ingresarCheckearNumero();
                opcionSeleccionada1 = accion;
            }
            if (opcionSeleccionada1 == 1) {
                console.log("------------------------------------------------------------------------");
                console.log("INGRESE OPCION A MODIFICAR : ");
                console.log("       -Modificar Nombre de proveedor:  -Ingrese 1.");
                console.log("       -ModificarTelefono de proveedor:  -Ingrese 2.");
                console.log("       -Modificar Direccion de proveedor:  -Ingrese 3.");
                console.log("       -Agregar rubro a proveedor:  -Ingrese 4.");
                console.log("       -Eliminar rubro de proveedor:  -Ingrese 5.");
                console.log("------------------------------------------------------------------------");
                var OPCIONES = {
                    1: function () { return proveedorElegido.setNombreProveedor(readline.question("INGRESE NUEVO NOMBRE DE PROVEEDOR : ")); },
                    2: function () { return proveedorElegido.setTelefonoProveedor(readline.questionInt("INGRESE NUEVO TELEFONO DE PROVEEDOR : ")); },
                    3: function () { return proveedorElegido.setDireccionProveedor(readline.question("INGRESE NUEVA DIRECCION DE PROVEEDOR : ")); },
                    4: function () { return proveedorElegido.setRubroProveedor(_this.ingresar_ChekearCategoria()); },
                    5: function () {
                        var rubro_a_eliminar = _this.ingresar_ChekearCategoria();
                        proveedorElegido.getRubroProveedor().forEach(function (rubro) {
                            if (rubro == rubro_a_eliminar) {
                                proveedorElegido.getRubroProveedor().splice(proveedorElegido.getRubroProveedor().indexOf(rubro), 1);
                                console.log("------------------------------------------------------------------------");
                                console.log("    !!!!Se ha eliminado el rubro  ", rubro, "del proveedor ", proveedorElegido.getNombreProveedor());
                                console.log("------------------------------------------------------------------------");
                            }
                        });
                    }
                };
                var opcionModificacion2 = 0;
                while (opcionModificacion2 > 5 || opcionModificacion2 < 1) {
                    opcionModificacion2 = this.ingresarCheckearNumero();
                }
                OPCIONES[opcionModificacion2](); //Aqui llama a ejecutar
                console.log("          Cambios establecidos en proveedor :", proveedorElegido.getNombreProveedor());
                console.log("          Nombre :", proveedorElegido.getNombreProveedor());
                console.log("          Telefono :", proveedorElegido.getTelefonoProveedor());
                console.log("          Direccion :", proveedorElegido.getDireccionProveedor());
                console.log("          Rubro/s :", proveedorElegido.getRubroProveedor());
            }
            if (opcionSeleccionada1 == 2) {
                this.proveedores.splice(this.proveedores.indexOf(proveedorElegido, 1));
                this.mostrarListaProveedores(this.getProveedores());
                console.log("!!!Se elimino de la lista de proveedores a ", proveedorElegido.getNombreProveedor());
                break;
            }
            console.log("Desea realizar otra modificacin a este proveedor? - SI:ingrese 1. (o presione cualquier otro numero para terminar)");
            otraModificacion = this.ingresarCheckearNumero();
        }
    };
    //--------------------------------------------------------------------------------------------------
    Veterinarias.prototype.crearSucursal = function (nombreSucursal, direccion, telefono) {
        var idSucursal = 0;
        while (idSucursal == 0) {
            idSucursal = Math.floor(Math.random() * 100); //Se genera un numero aleatorio hasta el 100.
            this.sucursales.forEach(function (sucursal) {
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
        console.log("---------------------------------------------------------");
        console.log("            NUMERO ID DE CADA SUCURSAL :    ");
        console.log("---------------------------------------------------------");
        this.sucursales.forEach(function (sucur) {
            console.log("             *SUCURSAL ", sucur.getNombreSucursal(), " ID : ", sucur.id);
            console.log("     < ------------------------------------------- >                       ");
        });
    };
    Veterinarias.prototype.buscarSucursal_por_Id = function () {
        var existe = false;
        var numSucursal = 0; //Aqui nos aseguramos que el ID ingresado sea correcto.
        while (existe == false) {
            console.log("**Ingrese el numero ID de la sucursal seleccionada : ");
            numSucursal = this.ingresarCheckearNumero();
            existe = this.chequear_Id_Sucursal_Existe(numSucursal, this.sucursales);
        }
        var sucursalElegida = new sucursales_1.Sucursal("", "", 0, 0);
        this.sucursales.forEach(function (sucursal) {
            if (sucursal.getIdSucursal() == numSucursal) {
                sucursalElegida = sucursal;
            }
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
    Veterinarias.prototype.traerProveedor = function () {
        var proveedorExiste = false;
        var proveedorSeleccionado = 0;
        while (proveedorExiste == false) {
            proveedorSeleccionado = readline.question("Ingrese ID de proveedor seleccionado : ");
            proveedorExiste = this.chequear_Id_proveedor_Existe(proveedorSeleccionado, this.proveedores);
        }
        var proveedor = this.proveedores.filter(function (x) { return x.id == proveedorSeleccionado; });
        return proveedor[0];
    };
    Veterinarias.prototype.enviarProductos_a_sucursal = function () {
        var sucursalDestino = this.buscarSucursal_por_Id(); //Selecciona una sucursal y la trae para modificar su lista de productos disponibles.
        var elegirProveedor = []; //Aqui guardaremos los proveedores que tengan la categoria de productos que queremos enviar.
        var pedido = [];
        var categoriaDelEnvio = "";
        var nuevoEnvio = false;
        while (nuevoEnvio == false) {
            console.log("INGRESE LA CATEGORIA DEL PRODUCTO QUE SE ENVIARA A SUCURSAL : ----", sucursalDestino.getNombreSucursal());
            categoriaDelEnvio = this.ingresar_ChekearCategoria();
            this.proveedores.forEach(function (proveedor) {
                proveedor.getRubroProveedor().forEach(function (rubro) {
                    if (rubro == categoriaDelEnvio) { //Si este proveedor tiene la categoria que deseo enviar
                        elegirProveedor.push(proveedor); //Me guarda este proveedor en la lista de opciones de proveedores.
                        nuevoEnvio = true;
                    }
                });
            });
        }
        console.log("//////////////////////////////////////////////////////////////////////////////////");
        console.log("          PROVEEDORES DE CATEGORIA  --**", categoriaDelEnvio);
        console.log("//////////////////////////////////////////////////////////////////////////////////");
        console.log("-----------------------------------------------------------------------------------");
        this.mostrarListaProveedores(elegirProveedor);
        console.log("-----------------------------------------------------------------------------------");
        var proveedorElegido = this.traerProveedor();
        pedido.push(proveedorElegido.generarPedido(categoriaDelEnvio));
        proveedorElegido.enviarProductos_a_sucursal(sucursalDestino, pedido);
        sucursalDestino.mostrarProductos();
        //console.log("PRODUCTOS DISPONIBLES EN SUCURSAL ", sucursalDestino.getNombreSucursal(), sucursalDestino.getProductosDisponibles());
    };
    Veterinarias.prototype.getSucursales = function () {
        return this.sucursales;
    };
    Veterinarias.prototype.getProveedores = function () {
        return this.proveedores;
    };
    return Veterinarias;
}());
exports.Veterinarias = Veterinarias;
