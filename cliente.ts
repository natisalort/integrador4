import * as readline from "readline-sync"
import { Sucursal } from "./sucursal";
import { Paciente } from "./paciente";
import { Veterinarias } from "./veterinaria";

export class Cliente {
    nombreDueño: string;
    apellido: string;
    telefonoCliente: number;
    direccionCliente: string;
    idCliente: number;
    idSucursalPerteneciente: number;
    perteneceSucursal: string
    visitas: number;
    vip: boolean;
    paciente: Paciente;   //Objeto con los datos del animal.

    constructor(nombreSucursal: string, idSucursal: number, nombreDueño: string, apellido: string, telefono: number, direccion: string, idCliente: number) {

        this.nombreDueño = nombreDueño;
        this.apellido = apellido;
        this.telefonoCliente = telefono;
        this.direccionCliente = direccion;
        this.idCliente = idCliente;
        this.idSucursalPerteneciente = idSucursal;
        this.perteneceSucursal = nombreSucursal;
        this.visitas = 0;
        this.vip = false;

    }



    crearPaciente() {
        console.log("************************************************");
        console.log("          **DATOS DEL PACIENTE : ");
        console.log("************************************************");
        let nomb = readline.question(" *Nombre del paciente :  ");
        nomb = nomb.charAt(0) + nomb.slice(1).toLowerCase();
        let especie = readline.question(" *Especie/raza :  ");
        especie = especie.charAt(0) + especie.slice(1).toLowerCase();
        let edadAnimal = readline.question(" *Edad del animal :  ");
        this.paciente = new Paciente(nomb, especie, edadAnimal, this.idCliente);
    }

    modificarCliente(miVeterinaria) {
        console.log("------------------------------------------------------------------------");
        console.log("SELECCIONE OPCION DESEADA : ");
        console.log("       -Registrar visita :  -Ingrese 1.")
        console.log("       -Cambiar de sucursal : -Ingrese 2.");
        console.log("       -Agregar  nuevo paciente : -Ingrese 3.");
        console.log("------------------------------------------------------------------------");
        let opcion = readline.questionInt("             *Ingrese opcion seleccionada : ");
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
                let sucursalDestino = miVeterinaria.buscarSucursal_por_Id();
                this.perteneceSucursal = sucursalDestino.getNombreSucursal();
                this.idSucursalPerteneciente = sucursalDestino.getIdSucursal();
                sucursalDestino.getClientes().push(this);  //AQUI AGREGA EL CLIENTE A LA LISTA DE CLIENTES DE LA SUCURSAL ELEGIDA.
                sucursalDestino.mostrarListaClientes();

                miVeterinaria.getSucursales().forEach(sucursal => {
                    if (sucursal.getIdSucursal() == this.getSucursalId()) {
                        let borrar = sucursal.getClientes().indexOf(this);
                        sucursal.getClientes().splice(borrar, 1);
                        console.log("SE HA ELIMINADO DE LA SUCURSAL ", sucursal.getNombreSucursal(), "  EL CIENTE :  ", this.getNombreCliente(),",",this.getApellidoCliente());
                        sucursal.eliminarCliente(this)
                    }
                })
                break;
            case 3:
                console.groupCollapsed("Ya agregaremos jajajajajajajjajaajajal")
                break;
        }
    }

    crearVIP(visitas: number) {
        if (visitas >= 5) {
            this.vip = true;
            console.log("FELICIDADES!!... AHORA ES UN CLIENTE VIP.");
        }
    }

    getIdCliente() {
        return this.idCliente;
    }
    getNombreCliente() {
        return this.nombreDueño;
    }
    getApellidoCliente() {
        return this.apellido;
    }
    getSucursalId() {
        return this.idSucursalPerteneciente;
    }
    getPerteneceSucursal() {
        return this.perteneceSucursal;
    }
    getVip() {
        if (this.vip == false) {
            return "NO";
        } else {
            return "SI";
        }
    }

    setVisita() {
        this.visitas += 1;
    }
}
