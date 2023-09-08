import { Sucursal } from "./clase_sucursales";
import { Producto } from "./clase_productos";
import { Proveedor } from "./clase_proveedores";

export class Veterinarias {
    prodAlimentos: Producto[];
    prodSalud: Producto[];
    prodHigiene: Producto[];
    sucursales: Sucursal[];
    proveedores: Proveedor[];
    

    constructor() {
        this.prodAlimentos=[];
        this.prodSalud=[];
        this.prodHigiene=[];
        this.sucursales=[];
        this.proveedores=[];
    }
}