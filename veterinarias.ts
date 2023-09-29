
import * as readline from "readline-sync"

import { Sucursal } from "./sucursales";
import { Producto } from "./productos";
import { Proveedor } from "./proveedores";
import { Cliente } from "./clientes";
import { Paciente } from "./pacientes";

export class Veterinarias {
    private categoriaDeProductos: string[];
    private prodAlimentos: Producto[];
    private prodSalud: Producto[];
    private prodHigiene: Producto[];
    protected sucursales: Sucursal[];
    protected proveedores: Proveedor[];

    public constructor() {
        this.categoriaDeProductos = ["Alimentos", "Salud", "Higiene"]
        this.prodAlimentos = [];
        this.prodSalud = [];
        this.prodHigiene = [];
        this.sucursales = [];
        this.proveedores = [];
    }
    //-----------------------------------------------------------------------------------------------
    public crearChequearId(array) {
        let IdExiste = true;
        let idAsignado = 0;
        while (IdExiste == true) {
            idAsignado = Math.floor(Math.random() * 100) * 10000;
            IdExiste = this.chequear_Id_Existe(idAsignado, array)
        }
        return idAsignado;
    }
    public chequear_Id_Existe(id: number, arreglo): boolean {
        let existe = false;
        arreglo.forEach(item => {
            if (item.id == id) {
                existe = true;
            }
        })
        return existe;
    }

    public crearProveedor() {
        let rubros: string[] = [];
        console.log("************************************************")
        console.log("           **DATOS DEL PROVEEDOR: ");
        console.log("************************************************")
        let nombreProveedor = readline.question("  *Nombre: ");
        nombreProveedor = nombreProveedor.charAt(0).toUpperCase() + nombreProveedor.slice(1);
        let telefonoProveedor = readline.questionInt("  *Telefono:");
        let direccion = readline.question("  *Direccion:");


        // opciones de rubro
        console.log("************************************************")
        console.log("           **RUBROS DEL PROVEEDOR: ");
        console.log("************************************************")
        let categ = 0;
        let rubro="";
        let agregar = 1
        while (categ <1 && categ > 3 || agregar == 1) {
            categ = readline.questionInt("  *Rubro: indique rubro de proveedor : 1. Alimentos, 2. Salud, 3. Higiene :  ");
            switch (categ) {
                case 1:
                    rubros.push("alimentos");
                    rubro="alimentos"
                    break;
                case 2:
                    rubros.push("salud");
                    rubro="alimentos"
                    break;
                case 3:
                    rubros.push("higiene");
                    rubro="higiene";
                    break;
            default:
                console.log("La opcion ingresada no es correcta. Por favor ingrese nuevamente");
            }
            agregar=readline.questionInt("Desea agregar rubro a este proveedor? - si: ingrese 1 (o ingrese otro numero para terminar)");
        }

        let idAsignado = this.crearChequearId(this.proveedores);//Creamos y cchequeamos no repetir ID
        this.proveedores.push(new Proveedor(nombreProveedor, idAsignado, telefonoProveedor, direccion, rubros));//Creamos un proveedor con todos los datos obtenidos y directamente los guardamos en la lista de proveedores.
    }

    public mostrarListaProveedores(array:Proveedor[]) {
        console.log("------------------------------------------------------------------")
        console.log("            LISTA DE PROVEEDORES (contratados): ");
        console.log("-----------------------------------------------------------------")
        array.forEach(item => {
            console.log("--Nombre del proveedor: ", item.getNombreProveedor());
            console.log("--Telefono del proveedor: ", item.getTelefonoProveedor());
            console.log("--Rubro: ", item.getRubroProveedor());
        })
    }
    //--------------------------------------------------------------------------------------------------
    public crearSucursal(nombreSucursal: string, direccion: string, telefono: number) {
        let idSucursal = 0;
        while (idSucursal == 0) {
            idSucursal = Math.floor(Math.random() * 100);//Se genera un numero aleatorio hasta el 100.
            this.sucursales.forEach(sucursal => {
                if (sucursal.getIdSucursal() == idSucursal) { //Chekea si se repite el numero generado.
                    idSucursal = 0;
                }
            })
        }
        this.sucursales.push(new Sucursal(nombreSucursal, direccion, telefono, idSucursal));// aqui directamente creamos una sucursal (con los parametros pasados y automaticamente se guarda en la lista de "sucursales.")
        console.log("--------SE HA CREADO LA SUCURSAL DE BARRIO ", nombreSucursal, "-------");
    }
    //-----------------------------------------------------------------------------------------------

    public mostrarSucursales() {
        console.log("*************************************************");
        console.log("           SUCURSALES DISPONIBLES :  ");
        console.log("*************************************************");
        this.sucursales.forEach(e => {
            console.log("--Nombre de sucursal : --", e.getNombreSucursal());
            console.log("--Direccion : --", e.getDireccionSucursal());
            console.log("--Telefono : --", e.getTelefono());
            console.log("--ID : --", e.getIdSucursal());
            console.log("-----------------------------------------------------")
        });
    }

    public mostrarIdDeSucursales() {
        console.log("---------------------------------------------------------");
        console.log("            NUMERO ID DE CADA SUCURSAL :    ");
        console.log("---------------------------------------------------------");
        this.sucursales.forEach(sucur => {
            console.log("             *SUCURSAL ", sucur.getNombreSucursal(), " ID : ", sucur.id);
            console.log("     < ------------------------------------------- >                       ")
        })
    }



    public buscarSucursal_por_Id(): Sucursal {
        let existe = false;
        let numSucursal = 0;     //Aqui nos aseguramos que el ID ingresado sea correcto.
        while (existe == false) {
            numSucursal = readline.questionInt("**Ingrese el numero ID de la sucursal seleccionada : ");
            existe = this.chequear_Id_Existe(numSucursal, this.getSucursales());
        }

        let sucursalElegida: Sucursal = new Sucursal("", "", 0, 0);
        this.sucursales.forEach(sucursal => {
            if (sucursal.getIdSucursal() == numSucursal) {
                sucursalElegida = sucursal;
            }
            return sucursalElegida;
        })
        return sucursalElegida;
    }


    public eliminarSucursal() {
        //Aqui "indice" guardara la posicion en la que se encuentra la sucursal.
        let indice = this.getSucursales().indexOf(this.buscarSucursal_por_Id());
        let sucursalEliminada = this.getSucursales()[indice].getNombreSucursal()
        this.getSucursales().splice(indice, 1);
        console.log("      !! SE HA ELIMINADO LA SUCURSAL : ", sucursalEliminada);

    }

    public chequearClienteExiste(nombre: string, apellido: string): boolean {
        let existe = false;
        this.sucursales.forEach(sucursal => {
            sucursal.getClientes().forEach(cliente => {
                if (cliente.getApellidoCliente() == apellido && cliente.getNombreCliente() == nombre) {
                    existe = true;
                }
            })
        })
        return existe;
    }


    public traerCliente(nombre: string, apellido: string): Cliente {
        let sucursalElegida: Cliente = new Cliente("", 0, "", "", 0, "", 0);
        this.sucursales.forEach(sucursal => {
            sucursal.getClientes().forEach(cliente => {
                if (cliente.getApellidoCliente() == apellido && cliente.getNombreCliente() == nombre) {
                    sucursalElegida = cliente;

                }
            })
        })
        return sucursalElegida;
    }

    public traerProveedor(lista): Proveedor {
        let proveedorExiste = false;
        let proveedorSeleccionado = 0;
        while (proveedorExiste == false) {
            proveedorSeleccionado = readline.question("Ingrese ID de proveedor seleccionado : ");
            proveedorExiste = this.chequear_Id_Existe(proveedorSeleccionado, this.proveedores)
        }

        let proveedor = this.proveedores.filter(x => x.id == proveedorSeleccionado);
        return proveedor[0];
    }

    public enviarProductos_a_sucursal() {
        let sucursalDestino = this.buscarSucursal_por_Id();//Selecciona una sucursal y la trae para modificar su lista de productos disponibles.
        let elegirProveedor: Proveedor[] = []; //Aqui guardaremos los proveedores que tengan la categoria de productos que queremos enviar.
        let categoriaDelEnvio = "";
        let nuevoEnvio = false;
        while (nuevoEnvio == false) {

            categoriaDelEnvio = readline.question("INGRESE LA CATEGORIA DEL PRODUCTO QUE SE ENVIARA A SUCURSAL : ----").toLowerCase();// Convierte todo el texto a minuscula.

            this.proveedores.forEach(proveedor => {
                proveedor.getRubroProveedor().forEach(rubro => {
                    if (rubro == categoriaDelEnvio) { //Si este proveedor tiene la categoria que deseo enviar
                        elegirProveedor.push(proveedor); //Me guarda este proveedor en la lista de opciones de proveedores.
                        nuevoEnvio=true;
                    }
                })
            })
        }

        console.log("//////////////////////////////////////////////////////////////////////////////////")
        console.log("PROVEEDORES DE CATEGORIA  *", categoriaDelEnvio);
        console.log(elegirProveedor);
        console.log("-----------------------------------------------------------------------------------");
        let proveedorElegido = this.traerProveedor(elegirProveedor);
        let pedido = proveedorElegido.generarPedido(categoriaDelEnvio);
        proveedorElegido.enviarProductos_a_sucursal(sucursalDestino, pedido);
        sucursalDestino.mostrarProductos();
    }




    public getSucursales() {
        return this.sucursales;
    }
    public getProveedores(){
        return this.proveedores;
    }

}