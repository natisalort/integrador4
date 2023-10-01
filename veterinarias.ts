
import * as readline from "readline-sync"

import { Sucursal } from "./sucursales";
import { Producto } from "./productos";
import { Proveedor } from "./proveedores";
import { Cliente } from "./clientes";
import { Paciente } from "./pacientes";

export class Veterinarias {
    private categoriaDeProductos: string[];
    protected sucursales: Sucursal[];
    protected proveedores: Proveedor[];

    public constructor() {
        this.categoriaDeProductos = ["Alimentos", "Salud", "Higiene"]
        this.sucursales = [];
        this.proveedores = [];
    }
    //-----------------------------------------------------------------------------------------------
    public crearChequearId(array: Proveedor[]) {
        let IdExiste = true;
        let idAsignado = 0;
        while (IdExiste == true) {
            idAsignado = Math.floor(Math.random() * 100) * 10000;
            IdExiste = this.chequear_Id_proveedor_Existe(idAsignado, array);
        }
        return idAsignado;


    }
    public chequear_Id_proveedor_Existe(id: number, arreglo: Proveedor[]): boolean {
        let existe = false;
        arreglo.forEach(item => {
            if (item.id == id) {
                existe = true;
            }
        })
        return existe;
    }

    public chequear_Id_Sucursal_Existe(id: number, arreglo: Sucursal[]): boolean {
        let existe = false;
        arreglo.forEach(item => {
            if (item.id == id) {
                existe = true;
            }
        })
        return existe;
    }

    //---------------------------------------------------------------------------------------------------------------------
    public ingresarCheckearNumero(): number {
        let cantidad = 0;
        while (cantidad == 0) {
            let cantidadSolicitada: number | undefined = readline.questionInt("  **INGRESE LA  OPCION :  ");
            console.log("****************************************************************")

            if (cantidadSolicitada !== undefined) {
                cantidad = Math.floor(cantidadSolicitada);
            } else {
                console.log("Entrada no válida. Debe ingresar un número correcto.");
                cantidad = 0;
            }
        }
        return cantidad;
    }

    public ingresar_ChekearCategoria(): string {
        let categoriaIngresada = "";
        while (categoriaIngresada == "") {
            categoriaIngresada = readline.question("**INGRESE LA CATEGORIA  : Alimentos , Higiene o Salud----").toLowerCase();
            if (categoriaIngresada != "alimentos" && categoriaIngresada != "higiene" && categoriaIngresada != "salud") {
                categoriaIngresada = "";
            }
        }
        return categoriaIngresada;
    }
    //-----------------------
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

        let agregar = 1;
        while (agregar == 1) {
            console.log("  *Indique rubro/s de proveedor : 1. Alimentos, 2. Salud, 3. Higiene :  ");
            let categ = this.ingresarCheckearNumero();
            let rubro = "";

            while (categ < 1 && categ > 3) {
                console.log("-----La opcion ingresada NO es correcta!------")
                console.log("  *Indique rubro/s de proveedor : 1. Alimentos, 2. Salud, 3. Higiene :  ");
                categ = this.ingresarCheckearNumero();
            }
            switch (categ) {
                case 1:
                    rubros.push("alimentos");
                    rubro = "alimentos"
                    break;
                case 2:
                    rubros.push("salud");
                    rubro = "alimentos"
                    break;
                case 3:
                    rubros.push("higiene");
                    rubro = "higiene";
                    break;
            }
            console.log("Desea agregar rubro a este proveedor? - si: ingrese 1 ,(o ingrese otro numero para terminar");
            agregar = this.ingresarCheckearNumero();

        }
        let idAsignado = this.crearChequearId(this.proveedores);//Creamos y cchequeamos no repetir ID
        this.proveedores.push(new Proveedor(nombreProveedor, idAsignado, telefonoProveedor, direccion, rubros));//Creamos un proveedor con todos los datos obtenidos y directamente los guardamos en la lista de proveedores.
    }

    public mostrarListaProveedores(array: Proveedor[]) {//Esta funcion puede mostrar la lista general de proveedores y tambien la lista que se genera al filtrar los proveedores segun sus rubros.
        console.log("------------------------------------------------------------------")
        console.log("            LISTA DE PROVEEDORES  : ");
        console.log("-----------------------------------------------------------------")
        array.forEach(item => {
            console.log("--Nombre del proveedor: ", item.getNombreProveedor());
            console.log("--ID del proveedor: ", item.getIdProveedor());

            console.log("--Telefono del proveedor: ", item.getTelefonoProveedor());
            console.log("--Rubro: ", item.getRubroProveedor());
            console.log("      ------------------------------------------");
        })
    }
    modificarProveedor() {

        this.mostrarListaProveedores(this.proveedores);
        let sucursalElegida = this.traerProveedor();
        let otraModificacion = 1;

        while (otraModificacion == 1) {
            console.log("          Desea modificar? presione 1.");
            console.log("      < ---------------------------------- >          ");
            console.log("      Desea eliminar proveedor? presione 2.");
            let opcionSeleccionada1 = 0;

            while (opcionSeleccionada1 < 1 || opcionSeleccionada1 > 2) {
                let accion = this.ingresarCheckearNumero();
                opcionSeleccionada1 = accion;
            }

            if (opcionSeleccionada1 == 1) {
                console.log("------------------------------------------------------------------------");
                console.log("INGRESE OPCION A MODIFICAR : ");
                console.log("       -Modificar Nombre de proveedor:  -Ingrese 1.")
                console.log("       -ModificarTelefono de proveedor:  -Ingrese 2.");
                console.log("       -Modificar Direccion de proveedor:  -Ingrese 3.");
                console.log("       -Agregar rubro a proveedor:  -Ingrese 4.");
                console.log("       -Eliminar rubro de proveedor:  -Ingrese 5.");
                console.log("------------------------------------------------------------------------");
                const OPCIONES = {
                    1: () => sucursalElegida.setNombreProveedor(readline.question("INGRESE NUEVO NOMBRE DE PROVEEDOR : ")),
                    2: () => sucursalElegida.setTelefonoProveedor(readline.questionInt("INGRESE NUEVO TELEFONO DE PROVEEDOR : ")),
                    3: () => sucursalElegida.setDireccionProveedor(readline.question("INGRESE NUEVA DIRECCION DE PROVEEDOR : ")),
                    4: () => sucursalElegida.setRubroProveedor(this.ingresar_ChekearCategoria()),
                    5: () => {
                        let rubro_a_eliminar = this.ingresar_ChekearCategoria();
                        sucursalElegida.getRubroProveedor().forEach(rubro => {
                            if (rubro == rubro_a_eliminar) {
                                sucursalElegida.getRubroProveedor().splice(sucursalElegida.getRubroProveedor().indexOf(rubro), 1);
                                console.log("------------------------------------------------------------------------");
                                console.log("    !!!!Se ha eliminado el rubro  ", rubro, "del proveedor ", sucursalElegida.getNombreProveedor());
                                console.log("------------------------------------------------------------------------");

                            }
                        })
                    }
                }
                let opcionModificacion2 = 0;
                while (opcionModificacion2 > 5 || opcionModificacion2 < 1) {
                    opcionModificacion2 = this.ingresarCheckearNumero();
                }
                OPCIONES[opcionModificacion2](); //Aqui llama a ejecutar
                console.log("          Cambios establecidos en proveedor :", sucursalElegida.getNombreProveedor());
                console.log("          Nombre :", sucursalElegida.getNombreProveedor());
                console.log("          Telefono :", sucursalElegida.getTelefonoProveedor());
                console.log("          Direccion :", sucursalElegida.getDireccionProveedor());
                console.log("          Rubro/s :", sucursalElegida.getRubroProveedor());

            }

            if (opcionSeleccionada1 == 2) {
                this.proveedores.splice(this.proveedores.indexOf(sucursalElegida, 1));
                this.mostrarListaProveedores(this.getProveedores());
                console.log("!!!Se elimino de la lista de proveedores a ", sucursalElegida.getNombreProveedor());
                break;
            }
            console.log("Desea realizar otra modificacin a este proveedor? - SI:ingrese 1. (o presione cualquier otro numero para terminar)");
            otraModificacion = this.ingresarCheckearNumero();
        }
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
            console.log("--Telefono : --", e.getTelefonoSucursal());
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
        let numSucursal: number = 0;     //Aqui nos aseguramos que el ID ingresado sea correcto.
        while (existe == false) {
            console.log("**Ingrese el numero ID de la sucursal seleccionada : ");
            numSucursal = this.ingresarCheckearNumero();
            existe = this.chequear_Id_Sucursal_Existe(numSucursal, this.sucursales);
        }

        let sucursalElegida: Sucursal = new Sucursal("", "", 0, 0);
        this.sucursales.forEach(sucursal => {
            if (sucursal.getIdSucursal() == numSucursal) {
                sucursalElegida = sucursal;
            }
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

//--------------------------------------------------------------------------------------------------
    modificarSucursal() {
        this.mostrarSucursales();
        let sucursalElegida = this.buscarSucursal_por_Id();
        let otraModificacion = 1;

        while (otraModificacion == 1) {
            console.log("       Desea modificar sucursal? : presione 1.");
            console.log("      < ---------------------------------- >          ");
            console.log("      Desea eliminar sucursal? : presione 2.");
            let opcionSeleccionada1 = 0;

            while (opcionSeleccionada1 < 1 || opcionSeleccionada1 > 2) {
                let accion = this.ingresarCheckearNumero();
                opcionSeleccionada1 = accion;
            }

            if (opcionSeleccionada1 == 1) {
                console.log("------------------------------------------------------------------------");
                console.log("INGRESE OPCION A MODIFICAR : ");
                console.log("       -Modificar Nombre de sucursal:  -Ingrese 1.")
                console.log("       -ModificarTelefono de sucursal:  -Ingrese 2.");
                console.log("       -Modificar Direccion de sucursal:  -Ingrese 3.");
                console.log("------------------------------------------------------------------------");
                const OPCIONES = {
                    1: () => sucursalElegida.setNombreSucursal(readline.question("INGRESE NUEVO NOMBRE DE PROVEEDOR : ")),
                    2: () => sucursalElegida.setTelefonoSucursal(readline.questionInt("INGRESE NUEVO TELEFONO DE PROVEEDOR : ")),
                    3: () => sucursalElegida.setDireccionSucursal(readline.question("INGRESE NUEVA DIRECCION DE PROVEEDOR : ")),
                    }
    
                let opcionModificacion2 = 0;
                while (opcionModificacion2 > 5 || opcionModificacion2 < 1) {
                    opcionModificacion2 = this.ingresarCheckearNumero();
                }
                OPCIONES[opcionModificacion2](); //Aqui llama a ejecutar
                console.log("          Cambios establecidos en sucursal :", sucursalElegida.getNombreSucursal());
                console.log("          Nombre :", sucursalElegida.getNombreSucursal());
                console.log("          Telefono :", sucursalElegida.getTelefonoSucursal());
                console.log("          Direccion :", sucursalElegida.getDireccionSucursal());
            }

            if (opcionSeleccionada1 == 2) {
                this.getSucursales().splice(this.getSucursales().indexOf(sucursalElegida, 1));
                this.mostrarSucursales();
                console.log("!!!Se elimino de la lista de sucursales a ", sucursalElegida.getNombreSucursal());
                break;
            }
            console.log("Desea realizar otra modificacin a este proveedor? - SI:ingrese 1. (o presione cualquier otro numero para terminar)");
            otraModificacion = this.ingresarCheckearNumero();
        }
    }
   
    //-----------------------------------------------------------------------------------------------

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
//--------------------------------------------------------------------------------------------------
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
//--------------------------------------------------------------------------------------------------

    public traerProveedor(): Proveedor {
        let proveedorExiste = false;
        let proveedorSeleccionado = 0;
        while (proveedorExiste == false) {
            proveedorSeleccionado = readline.question("Ingrese ID de proveedor seleccionado : ");
            proveedorExiste = this.chequear_Id_proveedor_Existe(proveedorSeleccionado, this.proveedores)
        }

        let proveedor = this.proveedores.filter(x => x.id == proveedorSeleccionado);
        return proveedor[0];
    }

    public enviarProductos_a_sucursal() {
        let sucursalDestino = this.buscarSucursal_por_Id();//Selecciona una sucursal y la trae para modificar su lista de productos disponibles.
        let elegirProveedor: Proveedor[] = []; //Aqui guardaremos los proveedores que tengan la categoria de productos que queremos enviar.
        let pedido: Producto[][] = [];
        let categoriaDelEnvio = "";
        let nuevoEnvio = false;
        while (nuevoEnvio == false) {
            console.log("INGRESE LA CATEGORIA DEL PRODUCTO QUE SE ENVIARA A SUCURSAL : ----", sucursalDestino.getNombreSucursal())
            categoriaDelEnvio = this.ingresar_ChekearCategoria();

            this.proveedores.forEach(proveedor => {
                proveedor.getRubroProveedor().forEach(rubro => {
                    if (rubro == categoriaDelEnvio) { //Si este proveedor tiene la categoria que deseo enviar
                        elegirProveedor.push(proveedor); //Me guarda este proveedor en la lista de opciones de proveedores.
                        nuevoEnvio = true;
                    }
                })
            })
        }

        console.log("//////////////////////////////////////////////////////////////////////////////////")
        console.log("          PROVEEDORES DE CATEGORIA  --**", categoriaDelEnvio);
        console.log("//////////////////////////////////////////////////////////////////////////////////")
        console.log("-----------------------------------------------------------------------------------");

        this.mostrarListaProveedores(elegirProveedor);
        console.log("-----------------------------------------------------------------------------------");
        let sucursalElegida = this.traerProveedor();
        pedido.push(sucursalElegida.generarPedido(categoriaDelEnvio));
        sucursalElegida.enviarProductos_a_sucursal(sucursalDestino, pedido);
        sucursalDestino.mostrarProductos()
        //console.log("PRODUCTOS DISPONIBLES EN SUCURSAL ", sucursalDestino.getNombreSucursal(), sucursalDestino.getProductosDisponibles());

    }

    public getSucursales() {
        return this.sucursales;
    }
    public getProveedores() {
        return this.proveedores;
    }

}