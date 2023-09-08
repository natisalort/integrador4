import{Cliente} from "./clase_clientes" ;
import{Veterinarias} from "./clase_veterinarias";

export class Sucursal extends Veterinarias{
    nombreSucursal:string;
    id:number;
    direccion:string;
    clientes:Cliente[];

    constructor(){
        super();

    }
}