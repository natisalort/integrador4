import * as readline from "readline-sync"
import { Sucursal } from "./sucursales";
import { Producto } from "./productos";
import { Proveedor } from "./proveedores";
import { Veterinarias } from "./veterinarias";
import { Cliente } from "./clientes";
import { Paciente } from "./pacientes";

//Aqui implementamos la clase "Veterinarias" :
let miVeterinaria: Veterinarias = new Veterinarias();
//-----------------------------------------------------------------------------------------------------

console.log("    BIENVENIDO A NUESTRA RED DE VETERINARIAS ¨*SMALL-PETS*¨  !!!");
console.log("**********************************************************************");
console.log("----------------------------------------------");
console.log("Crearemos nuevas sucursales  :  ");             //Precargamos 4 sucursales.
console.log("----------------------------------------------");
miVeterinaria.crearSucursal("Matienzo", "Castro Barros 5000", 152835959);
miVeterinaria.crearSucursal("Cerro", "La libertad 2569", 152835959);
miVeterinaria.crearSucursal("Jardin", "Nores Martinez 3500", 152835959);
miVeterinaria.crearSucursal("Alberdi", "Olegario Correa 1478", 152835959);
miVeterinaria.mostrarSucursales();
//--------------------------------------------------------------------------
console.log("---------------------------------------------------------");
console.log("CONTRATAREMOS NUEVOS PROVEEDORES: (3) ");
console.log("---------------------------------------------------------");
miVeterinaria.crearProveedor();
//miVeterinaria.crearProveedor();
//miVeterinaria.crearProveedor();
console.log("**********************************************************");


console.log("**********************************************************");
console.log("       **      MODIFICAR PROVEEDOR      **");
console.log("**********************************************************");
miVeterinaria.modificarProveedor();
//---------------------------------------------------------------------------------------
console.log("---------------------------------------------------------");
console.log("ENVIAREMOS PRODUCTOS DE DISTINTAS CATEGORIAS A SUCURSAL  :  ");
console.log("---------------------------------------------------------");
miVeterinaria.mostrarIdDeSucursales();
console.log("");
console.log("-------------------------------------------------------------");
miVeterinaria.enviarProductos_a_sucursal();
console.log("-------------------------------------------------------------");
//--------------------------------------------------------------------------------------------------
console.log("**********************************************************");
console.log(" ** CREAREMOS UN NUEVO CLIENTE EN LA SUCURSAL DESEADA  **");
console.log("**********************************************************");
miVeterinaria.mostrarSucursales();
console.log("******************************************************");
miVeterinaria.buscarSucursal_por_Id().crearCliente();
//--------------------------------------------------------------------------------------
console.log("**********************************************************");
console.log("       **      MODIFICAR CLIENTE       **");
console.log("**********************************************************");
//Se pide el nombre del cliente.
let nombre = readline.question("    *INGRESE  NOMBRE  : ");
nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();       //Se pone la mayuscula en la primer letra.
console.log(nombre);
//Se pide el apellido del cliente.
let apellido = readline.question("   *INGRESE  APELLIDO  : ");
apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase();   //Se pone la mayuscula en la primer letra.
console.log(apellido);

let clienteExiste = miVeterinaria.chequearClienteExiste(nombre, apellido);
while (clienteExiste == false) {
   clienteExiste = miVeterinaria.chequearClienteExiste(nombre, apellido);
   
}

miVeterinaria.traerCliente(nombre, apellido).modificarCliente(miVeterinaria);
//---------------------------------------------------------------------------------------
console.log("*********************************************************************");
console.log("           ** MODIFICAR SUCURSAL **");
console.log("***********************************************************************");
 
miVeterinaria.modificarSucursal() ; //Mostramos la lista de sucursales actualizada.









