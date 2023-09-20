"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var readline = require("readline-sync");
var pacientes_1 = require("./pacientes");
var Cliente = /** @class */ (function () {
    function Cliente(nombreSucursal, idSucursal, nombreDueño, apellido, telefono, direccion, idCliente) {
        this.nombreDueño = nombreDueño;
        this.apellido = apellido;
        this.telefonoCliente = telefono;
        this.direccionCliente = direccion;
        this.idCliente = idCliente;
        this.idSucursalPerteneciente = idSucursal;
        this.perteneceSucursal = nombreSucursal;
        this.visitas = 0;
        this.vip = false;
        this.pacientes = [];
    }
    Cliente.prototype.crearPaciente = function () {
        console.log("************************************************");
        console.log("          **DATOS DEL PACIENTE : ");
        console.log("************************************************");
        var nomb = readline.question(" *Nombre del paciente :  ");
        nomb = nomb.charAt(0) + nomb.slice(1).toLowerCase();
        var especie = readline.question(" *Especie/raza :  ");
        especie = especie.charAt(0) + especie.slice(1).toLowerCase();
        var edadAnimal = readline.questionInt(" *Edad del animal :  ");
        var paciente = new pacientes_1.Paciente(nomb, especie, edadAnimal, this.idCliente);
        return paciente;
    };
    Cliente.prototype.modificarCliente = function (miVeterinaria) {
        var _this = this;
        console.log("------------------------------------------------------------------------");
        console.log("SELECCIONE OPCION DESEADA : ");
        console.log("       -Registrar visita :  -Ingrese 1.");
        console.log("       -Cambiar de sucursal : -Ingrese 2.");
        console.log("       -Agregar  nuevo paciente : -Ingrese 3.");
        console.log("------------------------------------------------------------------------");
        var opcion = readline.questionInt("             *Ingrese opcion seleccionada : ");
        console.log("------------------------------------------------------------------------");
        switch (opcion) {
            case 1:
                this.setVisita();
                if (this.visitas >= 5) {
                    console.log("       FELICIDADES SE HA CONVERTIDO EN UN CLIENTE VIP !!!");
                    this.vip = true;
                }
                break;
            case 2:
                var exSucursal = this.getPerteneceSucursal();
                var sucursalDestino = miVeterinaria.buscarSucursal_por_Id();
                this.perteneceSucursal = sucursalDestino.getNombreSucursal();
                this.idSucursalPerteneciente = sucursalDestino.getIdSucursal();
                sucursalDestino.getClientes().push(this); //AQUI AGREGA EL CLIENTE A LA LISTA DE CLIENTES DE LA SUCURSAL ELEGIDA.
                sucursalDestino.mostrarListaClientes();
                miVeterinaria.getSucursales().forEach(function (sucursal) {
                    if (sucursal.getIdSucursal() == _this.getSucursalId()) {
                        var borrar = sucursal.getClientes().indexOf(_this);
                        sucursal.getClientes().splice(borrar, 1);
                        sucursal.eliminarCliente(_this);
                    }
                });
                console.log("  !!SE HA AGREGADO A LA SUCURSAL : ", sucursalDestino.getNombreSucursal(), " EL CLIENTE : ", this.getNombreCliente(), ",", this.getApellidoCliente());
                console.log("   !!SE HA CAMBIADO DE SUCURSAL ", exSucursal, "  EL CIENTE :  ", this.getNombreCliente(), ",", this.getApellidoCliente());
                break;
            case 3:
                this.pacientes.push(this.crearPaciente());
                console.log("   SE HA AGREGADO UN PACIENTE AL CLIENTE : ", this.getNombreCliente(), ", ", this.getApellidoCliente());
                console.log(this.pacientes);
                break;
        }
    };
    Cliente.prototype.crearVIP = function (visitas) {
        if (visitas >= 5) {
            this.vip = true;
            console.log("FELICIDADES!!... AHORA ES UN CLIENTE VIP.");
        }
    };
    Cliente.prototype.getIdCliente = function () {
        return this.idCliente;
    };
    Cliente.prototype.getNombreCliente = function () {
        return this.nombreDueño;
    };
    Cliente.prototype.getApellidoCliente = function () {
        return this.apellido;
    };
    Cliente.prototype.getPaciente = function () {
        return this.pacientes;
    };
    Cliente.prototype.getSucursalId = function () {
        return this.idSucursalPerteneciente;
    };
    Cliente.prototype.getPerteneceSucursal = function () {
        return this.perteneceSucursal;
    };
    Cliente.prototype.getVip = function () {
        if (this.vip == false) {
            return "NO";
        }
        else {
            return "SI";
        }
    };
    Cliente.prototype.setVisita = function () {
        this.visitas += 1;
    };
    return Cliente;
}());
exports.Cliente = Cliente;
