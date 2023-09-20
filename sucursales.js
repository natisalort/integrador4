"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sucursal = void 0;
var readline = require("readline-sync");
var clientes_1 = require("./clientes");
var Sucursal = /** @class */ (function () {
    function Sucursal(nombreSucursal, direccion, telefono, idSucursal) {
        this.nombreSucursal = nombreSucursal;
        this.direccion = direccion;
        this.telefono = telefono;
        this.idSucursal = idSucursal;
        this.clientes = [];
        this.productosDisponibles_en_sucursal = [];
    }
    //-----------------------------------------------------------------------------------------------------------------------
    Sucursal.prototype.mostrarProductos = function () {
        this.productosDisponibles_en_sucursal.forEach(function (producto) {
            console.log("          ", producto.getNombreProd());
            console.log("----", producto.getDescripcion());
            console.log("----Precio por unidad : $", producto.getPrecio());
            console.log("----Cantidad disponible : ", producto.getCantidadDisponible());
            console.log("------------------------------------------------------------------");
        });
    };
    Sucursal.prototype.crearCliente = function () {
        console.log("************************************************");
        console.log("           **DATOS DEL DUEÑO : ");
        console.log("************************************************");
        var nombreDueno = readline.question("  *Nombre : ");
        nombreDueno = nombreDueno.charAt(0).toUpperCase() + nombreDueno.slice(1);
        var apellidoDueno = readline.question("  *Apellido : ");
        apellidoDueno = apellidoDueno.charAt(0).toUpperCase() + apellidoDueno.slice(1);
        var telefonoDueno = readline.questionInt("  *Telefono  :");
        var direccionDueno = readline.question("  *Direccion  :");
        direccionDueno = direccionDueno.charAt(0).toUpperCase() + direccionDueno.slice(1);
        var idAsignado = 0;
        while (idAsignado == 0) {
            idAsignado = Math.floor(Math.random() * 100) * 10000;
            this.clientes.forEach(function (item) {
                if (item.getIdCliente() == idAsignado) {
                    idAsignado = 0;
                }
            });
        }
        var nuevoCliente = new clientes_1.Cliente(this.getNombreSucursal(), this.getIdSucursal(), nombreDueno, apellidoDueno, telefonoDueno, direccionDueno, idAsignado);
        nuevoCliente.getPaciente().push(nuevoCliente.crearPaciente());
        this.clientes.push(nuevoCliente);
        this.mostrarListaClientes();
    };
    Sucursal.prototype.mostrarListaClientes = function () {
        console.log("------------------------------------------------------------------");
        console.log("            LISTA DE CLIENTES DE LA SUCURSAL : ", this.getNombreSucursal());
        console.log("-----------------------------------------------------------------");
        this.clientes.forEach(function (cliente) {
            console.log("--Nombre de cliente : ", cliente.getNombreCliente(), ", ", cliente.getApellidoCliente());
            console.log("--Sucursal perteneciente : ", "ID : ", cliente.getSucursalId(), " --", cliente.getPerteneceSucursal());
            console.log("--VIP : ", cliente.getVip());
            console.log("--ID Cliente : ", cliente.getIdCliente());
            console.log("--Paciente : ", cliente.pacientes);
        });
    };
    Sucursal.prototype.eliminarCliente = function (persona) {
        this.clientes.forEach(function (cliente) {
            if (cliente.getApellidoCliente() == persona.getApellidoCliente() && cliente.getNombreCliente() == persona.getNombreCliente()) {
            }
        });
    };
    Sucursal.prototype.getIdSucursal = function () {
        return this.idSucursal;
    };
    Sucursal.prototype.getNombreSucursal = function () {
        return this.nombreSucursal;
    };
    Sucursal.prototype.getDireccionSucursal = function () {
        return this.direccion;
    };
    Sucursal.prototype.getTelefono = function () {
        return this.telefono;
    };
    Sucursal.prototype.getClientes = function () {
        return this.clientes;
    };
    Sucursal.prototype.getProductosDisponibles = function () {
        return this.productosDisponibles_en_sucursal;
    };
    return Sucursal;
}());
exports.Sucursal = Sucursal;
