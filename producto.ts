import * as readline from "readline-sync";

export class Producto {
    private nombreProd: string;
    private descripcion: string;
    private precio: number
    private categoria: string;
    private cantidad: number;

    constructor(nombreProd: string, descripcion: string, categoria: string, precio: number, cantidad: number) {
        this.nombreProd = nombreProd;
        this.descripcion = descripcion;
        this.categoria = categoria; this.precio = precio;
        this.cantidad = cantidad;
    }

    getNombreProd() {
        return this.nombreProd;
    }

    getDescripcion() {
        return this.descripcion;
    }

    getPrecio() {
        return this.precio;
    }
    getCantidadDisponible() {
        return this.cantidad;
    }
    setAgregarProductos(num: number) {
        this.cantidad += num;
    }
}