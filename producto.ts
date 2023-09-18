import  * as readline from "readline-sync";

export class Producto{
    private nombreProd:string;
    private descripcion:string;
    private precio:number
    private categoria:string;

    constructor(nombreProd:string,descripcion:string,categoria:string,precio:number){
        this.nombreProd=nombreProd;
        this.descripcion=descripcion;
        this.categoria=categoria;this.precio=precio;
    }

    getNombreProd(){
        return this.nombreProd;
    }

    getDescripcion(){
        return this.descripcion;
    }

    getPrecio(){
        return this.precio;
    }
}