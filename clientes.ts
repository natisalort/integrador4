import * as readline from "readline-sync"
import { Sucursal } from "./sucursales";
import { Paciente } from "./pacientes";
import { Veterinarias } from "./veterinarias";

export class Cliente {
    nombreDueno: string;
    apellido: string;
    telefonoCliente: number;
    direccionCliente: string;
    idCliente: number;
    idSucursalPerteneciente: number;
    perteneceSucursal: string
    visitas: number;
    vip: boolean;
    pacientes: Paciente[];   //Objeto con los datos del animal.

    constructor(nombreSucursal: string, idSucursal: number, nombreDueño: string, apellido: string, telefono: number, direccion: string, idCliente: number) {

        this.nombreDueno = nombreDueño;
        this.apellido = apellido;
        this.telefonoCliente = telefono;
        this.direccionCliente = direccion;
        this.idCliente = idCliente;
        this.idSucursalPerteneciente = idSucursal;
        this.perteneceSucursal = nombreSucursal;
        this.visitas = 0;
        this.vip = false;
        this.pacientes = []

    }



    crearPaciente(): Paciente {
        console.log("************************************************");
        console.log("          **DATOS DEL PACIENTE : ");
        console.log("************************************************");
        let nomb = readline.question(" *Nombre del paciente :  ");
        nomb = nomb.charAt(0) + nomb.slice(1).toLowerCase();
        let especie = readline.question(" *Especie/raza :  ");
        especie = especie.charAt(0) + especie.slice(1).toLowerCase();
        let edadAnimal = readline.questionInt(" *Edad del animal :  ");
        let paciente: Paciente = new Paciente(nomb, especie, edadAnimal, this.idCliente);
        return paciente
    }

    modificarCliente(miVeterinaria) {
        let otraModificacion = 1;
        while (otraModificacion == 1) {
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
                    console.log("VISITA REGISTRADA !!!")
                    if (this.visitas >= 4) {
                        console.log("       FELICIDADES SE HA CONVERTIDO EN UN CLIENTE VIP !!!");
                        this.vip = true;
                    }
                    break;
                case 2:
                    let exSucursal = this.getPerteneceSucursal();
                    let sucursalDestino: Sucursal = miVeterinaria.buscarSucursal_por_Id();
                    this.perteneceSucursal = sucursalDestino.getNombreSucursal();
                    this.idSucursalPerteneciente = sucursalDestino.getIdSucursal();
                    sucursalDestino.getClientes().push(this);  //AQUI AGREGA EL CLIENTE A LA LISTA DE CLIENTES DE LA SUCURSAL ELEGIDA.
                    sucursalDestino.mostrarListaClientes();

                    miVeterinaria.getSucursales().forEach(sucursal => {
                        if (sucursal.getIdSucursal() == this.getSucursalId()) {
                            let borrar = sucursal.getClientes().indexOf(this);
                            sucursal.getClientes().splice(borrar, 1);
                            sucursal.eliminarCliente(this)
                        }
                    })
                    console.log("  !!SE HA AGREGADO A LA SUCURSAL : ", sucursalDestino.getNombreSucursal(), " EL CLIENTE : ", this.getNombreCliente(), ",", this.getApellidoCliente())
                    console.log("   !!SE HA CAMBIADO DE SUCURSAL ", exSucursal, "  EL CIENTE :  ", this.getNombreCliente(), ",", this.getApellidoCliente());

                    break;
                case 3:
                    this.pacientes.push(this.crearPaciente());
                    console.log("   SE HA AGREGADO UN PACIENTE AL CLIENTE : ", this.getNombreCliente(), ", ", this.getApellidoCliente());
                    console.log(this.pacientes);
                    break;
            }
            otraModificacion=readline.questionInt("**DESEA REALIZAR OTRA MODIFICACION A ESTE CLIENTE?- 1:si (o cualquier numero para salir)")
        }
    }

    public getIdCliente(): number {
        return this.idCliente;
    }
    public getNombreCliente(): string {
        return this.nombreDueno;
    }
    public getApellidoCliente(): string {
        return this.apellido;
    }
    public getPaciente() {
        return this.pacientes;
    }
    public getSucursalId(): number {
        return this.idSucursalPerteneciente;
    }
    public getPerteneceSucursal(): string {
        return this.perteneceSucursal;
    }
    public getVip(): string {
        if (this.vip == false) {
            return "NO";
        } else {
            return "SI";
        }
    }

    public setVisita() {
        this.visitas += 1;
    }
}

