import * as readline from "readline-sync"

import { Producto } from "./productos";
import { Proveedor } from "./proveedores";
import { Veterinarias } from "./veterinarias";
import { Cliente } from "./clientes";
import { Paciente } from "./pacientes";

export class Sucursal {
    protected nombreSucursal: string;
    public id: number;
    private direccion: string;
    private telefono: number;
    public productosDisponibles_en_sucursal: Producto[];
    clientes: Cliente[];

    constructor(nombreSucursal: string, direccion: string, telefono: number, idSucursal: number) {
        this.nombreSucursal = nombreSucursal;
        this.direccion = direccion;
        this.telefono = telefono;
        this.id = idSucursal;
        this.clientes = [];
        this.productosDisponibles_en_sucursal = [];
    }
    //-----------------------------------------------------------------------------------------------------------------------

    public mostrarProductos() {
        console.log("************************************************")
        console.log("       **PRODUCTOS DISPONIBLES EN SUCURSAL : ");
        console.log("************************************************")
        this.productosDisponibles_en_sucursal.forEach(producto => {
            console.log("          ", producto.getNombreProd());
            console.log("----", producto.getDescripcion());
            console.log("----Precio por unidad : $", producto.getPrecio());
            console.log("----Cantidad disponible : ", producto.getCantidadDisponible());
            console.log("------------------------------------------------------------------")
        })
    }

    public crearCliente() {
        console.log("************************************************")
        console.log("           **DATOS DEL DUEÑO : ");
        console.log("************************************************")
        let nombreDueno = readline.question("  *Nombre : ");
        nombreDueno = nombreDueno.charAt(0).toUpperCase() + nombreDueno.slice(1);
        let apellidoDueno = readline.question("  *Apellido : ");
        apellidoDueno = apellidoDueno.charAt(0).toUpperCase() + apellidoDueno.slice(1);
        let telefonoDueno = readline.questionInt("  *Telefono  :");
        let direccionDueno = readline.question("  *Direccion  :");
        direccionDueno = direccionDueno.charAt(0).toUpperCase() + direccionDueno.slice(1);

        let idAsignado = 0;
        while (idAsignado == 0) {
            idAsignado = Math.floor(Math.random() * 100) * 10000;
            this.clientes.forEach(item => {
                if (item.getIdCliente() == idAsignado) {
                    idAsignado = 0;
                }
            })
        }
        let nuevoCliente: Cliente = new Cliente(this.getNombreSucursal(), this.getIdSucursal(), nombreDueno, apellidoDueno, telefonoDueno, direccionDueno, idAsignado);
        nuevoCliente.getPaciente().push(nuevoCliente.crearPaciente())
        this.clientes.push(nuevoCliente);
        this.mostrarListaClientes();
    }

    public mostrarListaClientes() {
        console.log("------------------------------------------------------------------")
        console.log("            LISTA DE CLIENTES DE LA SUCURSAL : ", this.getNombreSucursal());
        console.log("-----------------------------------------------------------------")

        this.clientes.forEach(cliente => {
            console.log("--Nombre de cliente : ", cliente.getNombreCliente(), ", ", cliente.getApellidoCliente());
            console.log("--Sucursal perteneciente : ", "ID : ", cliente.getSucursalId(), " --", cliente.getPerteneceSucursal());
            console.log("--VIP : ", cliente.getVip());
            console.log("--ID Cliente : ", cliente.getIdCliente());
            console.log("--Paciente : ", cliente.pacientes);
        })
    }

    public eliminarCliente(persona: Cliente) {
        this.clientes.forEach(cliente => {
            if (cliente.getApellidoCliente() == persona.getApellidoCliente() && cliente.getNombreCliente() == persona.getNombreCliente()) {

            }
        })
    }


    getIdSucursal() {
        return this.id;
    }
    getNombreSucursal() {
        return this.nombreSucursal;
    }

    getDireccionSucursal() {
        return this.direccion;
    }
    getTelefono() {
        return this.telefono;
    }
    getClientes() {
        return this.clientes;
    }
    getProductosDisponibles() {
        return this.productosDisponibles_en_sucursal;
    }
    public setAgregarProductos(pedido){
        this.productosDisponibles_en_sucursal.push(pedido);
    }
}