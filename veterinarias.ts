
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
    public agregarProductosAlCatalogo() {
        let dogchow = new Producto("Dog chow", "Alimento para perros 20kg.", "alimentos", 3000, 50)
        this.prodAlimentos.push(dogchow);

        let shampoo = new Producto("Limpito", "Shampoo para perros y gatos 500cc.", "higiene", 1500, 20)
        this.prodHigiene.push(shampoo);

        let pipeta = new Producto("Frontline", "Pipeta `para perros de hasta 20 kg.", "salud", 2000, 30)
        this.prodSalud.push(pipeta);
    }
    //--------------------------------------------------------------------------------------------------
    public crearSucursal(nombreSucursal: string, direccion: string, telefono: number) {
        let idSucursal = 0;
        while (idSucursal == 0) {
            idSucursal = Math.floor(Math.random() * 100);//Se genera un numero aleatorio hasta el 100.
            this.getSucursales().forEach(sucursal => {
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
        this.getSucursales().forEach(sucur => {
            console.log("             *SUCURSAL ", sucur.getNombreSucursal(), " ID : ", sucur.idSucursal);
            console.log("     < ------------------------------------------- >                       ")
        })
    }

    public chequear_Id_Sucursal_Existe(id: number): boolean {
        let existe = false;
        this.sucursales.forEach(sucursal => {
            if (sucursal.getIdSucursal() == id) {
                existe = true;
            }
        })
        return existe;
    }


    public buscarSucursal_por_Id(): Sucursal {
        let existe = false;
        let numSucursal = 0;     //Aqui nos aseguramos que el ID ingresado sea correcto.
        while (existe == false) {
            numSucursal = readline.questionInt("**Ingrese el numero ID de la sucursal seleccionada : ");
            existe = this.chequear_Id_Sucursal_Existe(numSucursal);
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
        return sucursalElegida
    }

    public enviarProductos_a_sucursal() {
        let sucursalDestino = this.buscarSucursal_por_Id();//Selecciona una sucursal y la trae para modificar su lista de productos disponibles.

        let cantidadTotalDeEnvios = readline.questionInt("Ingrese la cantidad total de envios que desea realizar : ");
        while (cantidadTotalDeEnvios > 0) {

            let categoriaDelEnvio = readline.question("INGRESE LA CATEGORIA DEL PRODUCTO QUE SE ENVIARA A SUCURSAL : ----").toLowerCase();// Convierte todo el texto a minuscula.
            let nombreProducto = readline.question("INGRESE NOMBRE DEL PRODUCTO QUE ENVIA A SUCURSAL : ----");
            nombreProducto = nombreProducto.charAt(0).toUpperCase() + nombreProducto.slice(1).toLowerCase();  //Convierte la primera letra a mayuscula. Esto es necesario para buscar en la lista de productos, el nombre que siempre estara en mayuscula.
            let cantidad_a_Enviar = readline.questionInt("CANTIDAD A ENVIAR DE ESTE PRODUCTO : ----");

            switch (categoriaDelEnvio) {
                case "alimentos":
                    this.prodAlimentos.forEach(prod => {
                        if (prod.getNombreProd() == nombreProducto) {
                            sucursalDestino.getProductosDisponibles().push(prod);
                            cantidadTotalDeEnvios -= cantidad_a_Enviar;
                            prod.setAgregarProductos(cantidad_a_Enviar);
                            console.log("     SE ENVIARON A SUCURSAL ", sucursalDestino.getNombreSucursal(), " : ", cantidad_a_Enviar, prod.getNombreProd())
                        }
                    })
                    break;
                case "salud":
                    this.prodSalud.forEach(prod => {
                        if (prod.getNombreProd() == nombreProducto) {
                            sucursalDestino.getProductosDisponibles().push(prod);
                            cantidadTotalDeEnvios -= cantidad_a_Enviar;
                            prod.setAgregarProductos(cantidad_a_Enviar);
                            console.log("      SE ENVIARON A SUCURSAL ", sucursalDestino.getNombreSucursal(), " : ", cantidad_a_Enviar, prod.getNombreProd())

                        }
                    })
                    break;
                case "higiene":
                    this.prodHigiene.forEach(prod => {
                        if (prod.getNombreProd() == nombreProducto) {
                            sucursalDestino.getProductosDisponibles().push(prod);
                            cantidadTotalDeEnvios -= cantidad_a_Enviar;
                            prod.setAgregarProductos(cantidad_a_Enviar);
                            console.log("     SE ENVIARON A SUCURSAL ", sucursalDestino.getNombreSucursal(), " : ", cantidad_a_Enviar, prod.getNombreProd())

                        }
                    })
                    break;
            }
        }
        console.log("//////////////////////////////////////////////////////////////////////////////////")
        console.log("PRODUCTOS DISPONIBLES EN SUCURSAL  ", sucursalDestino.getNombreSucursal(), " :  ");
        console.log("-----------------------------------------------------------------------------------")

        console.log(sucursalDestino.mostrarProductos());
        console.log("//////////////////////////////////////////////////////////////////////////////////")
    }

    public getSucursales() {
        return this.sucursales;
    }
}