
import * as readline from "readline-sync"

import { Producto } from "./productos";
import { Sucursal } from "./sucursales";
import { Veterinarias } from "./veterinarias";


export class Proveedor {

    // atributos:
    private nombre: string;
    public id: number;
    private telefono: number | undefined;
    private direccion: string;
    private rubros: string[];
    private catalogo: Producto[];
    private pedido: Producto[];

    // constructor:
    constructor(nombreProveedor: string, idProveedor: number, telefonoProveedor: number | undefined, direccion: string, rubros) {
        this.nombre = nombreProveedor;
        this.id = idProveedor;
        this.telefono = telefonoProveedor;
        this.direccion = direccion;
        this.rubros = rubros;
        this.catalogo = [];
        this.pedido = [];
        this.rubros.forEach(rubro => {
            switch (rubro) {
                case "alimentos":
                    this.agregarProductosAlimentos();
                    break;
                case "salud":
                    this.agregarProductosSalud();
                    break;
                case "higiene":
                    this.agregarProductosHigiene();
                    break;
            }
        })

    }



    // metodos:

    public agregarProductosAlimentos() {
        this.catalogo.push(new Producto("Dog chow", "Alimento para perros 20kg.", "alimentos", 3000, 50))
        this.catalogo.push(new Producto("Canin", "Alimento para perros 20kg.", "alimentos", 3000, 50))
        this.catalogo.push(new Producto("Voraz", "Alimento para perros 10kg.", "alimentos", 1000, 50))
        this.catalogo.push(new Producto("Exelence", "Alimento para perros 20kg.", "alimentos", 3500, 50))
        this.catalogo.push(new Producto("Pedigree", "Alimento para perros 15kg.", "alimentos", 2000, 50))
    }

    public agregarProductosSalud() {
        this.catalogo.push(new Producto("Frontline", "Pipeta `para perros de hasta 20 kg.", "salud", 2000, 30))
        this.catalogo.push(new Producto("Protect", "Pipeta `para perros de hasta 15 kg.", "salud", 1500, 30))
        this.catalogo.push(new Producto("Dist", "Pipeta `para perros de hasta 20 kg.", "salud", 2000, 30))
        this.catalogo.push(new Producto("Aqua", "Pipeta `para perros de hasta 10 kg.", "salud", 1000, 30))
    }

    public agregarProductosHigiene() {
        this.catalogo.push(new Producto("Limpito", "Shampoo para perros y gatos 500cc.", "higiene", 1500, 20))
        this.catalogo.push(new Producto("Clean", "Shampoo para perros 500cc.", "higiene", 500, 20))
        this.catalogo.push(new Producto("Fit pro", "Shampoo para gatos 500cc.", "higiene", 500, 20))
        this.catalogo.push(new Producto("Buble", "Shampoo para perros y gatos 500cc.", "higiene", 1500, 20))
    }


    public mostrarCatalogoDeCategoria(categoria: string) {
        console.log("******************************************************");
        console.log("           CATALOGO DE ", categoria);
        console.log("******************************************************");
        this.catalogo.forEach(Producto => {
            if (Producto.getCategoria() == categoria) {
                console.log("          ", Producto.getNombreProd());
                console.log("----", Producto.getDescripcion());
                console.log("----Precio por unidad : $", Producto.getPrecio());
                console.log("----Cantidad disponible : ", Producto.getCantidadDisponible());
                console.log("------------------------------------------------------------------")
            }

        })
    }
    //---------------------------------------------------------------------------------------------------------------------
    //Esta funcion sera utilizada cada vez que se necesite pedir ingresar un numero por teclado. Asegura el ingreso de un entero.
    public ingresar_checkearnumero(): number {
        let cantidad = 0;
        while (cantidad == 0) {
            let cantidadSolicitada: number = readline.questionInt("INGRESE OPCION :");
            if (cantidadSolicitada !== undefined) {
                cantidad = Math.floor(cantidadSolicitada);
            } else {
                console.log("Entrada no válida. Debe ingresar un número entero.");
                cantidad = 0;
            }
        }
        return cantidad;
    }
    //----------------------------------------------------------------------------------------------------------------------

    public generarPedido(categoria: string,): Producto[] {

        this.mostrarCatalogoDeCategoria(categoria);

        let productoExiste = 1;
        let productoElegido = "";
        while (productoExiste == 1) {
            productoElegido = readline.question("INGRESE NOMBRE DE PRODUCTO : ");
            productoElegido = productoElegido.charAt(0).toUpperCase() + productoElegido.slice(1).toLowerCase();

            let productoAgregado_a_pedido: Producto;//Inicializamos una variable que guardara provisoriamente el producto tal cual, solo con la cantidad modificada, que es la que tendra la sucursal.

            this.catalogo.forEach(prod => {
                if (prod.getNombreProd() == productoElegido) {
                    console.log("LA CANTIDAD DISPONIBLE DE ", prod.getNombreProd(), "ES : ", prod.getCantidadDisponible());
                    console.log("INGRESE LA CANTIDAD SOLICITADA :");
                    let cantidadSolicitada = this.ingresar_checkearnumero();
                    while (cantidadSolicitada > prod.getCantidadDisponible()) {
                        console.log("La cantidad seleccionada excede el stock disponible. Ingrese nuevamente una cantidad : ");
                        cantidadSolicitada = this.ingresar_checkearnumero();
                    }
                    productoAgregado_a_pedido = new Producto(prod.getNombreProd(), prod.getDescripcion(), prod.getDescripcion(), prod.getPrecio(), cantidadSolicitada)

                    prod.setRestarProductos(cantidadSolicitada); //Restamos al stock del proveedor la cantidad que nos entregara.
                    console.log("La cantidad disponible actual en stock  de ", prod.getNombreProd(), " es : ", prod.getCantidadDisponible())//Mostramos el stock actual del proveedor.

                    this.pedido.push(productoAgregado_a_pedido);

                    productoExiste = readline.questionInt("Desea agregar otro/s productos de la categoria ", categoria, "al pedido? - Ingrese: si:1 (o cualquier otro numero para salir de categoria.)"
                    )
                }
            })
        }
        return this.pedido;
    }

    //------------------------------------------------------------------------------------------
    public enviarProductos_a_sucursal(sucursalDestino: Sucursal, pedido: Producto[][]) {
        pedido.forEach(paq => {
            paq.forEach(prod => {
                sucursalDestino.getProductosDisponibles().push(prod);
                console.log("PRODUCTO : ", prod.getNombreProd(), " ENVIADO A SUCURSAL : --", sucursalDestino.getNombreSucursal());
            })
        })
    }


    //---getters-setters
    public getNombreProveedor() {
        return this.nombre;
    }

    public getIdProveedor() {
        return this.id;
    }

    public getTelefonoProveedor() {
        return this.telefono;
    }

    public getRubroProveedor() {
        return this.rubros;
    }

}
