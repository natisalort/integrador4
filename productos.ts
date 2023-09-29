
import * as readline from "readline-sync";

export class Producto {
    public nombreProd: string;
    public descripcion: string;
    private precio: number
    private categoria: string;
    private cantidad: number;

    public constructor(nombreProd: string, descripcion: string, categoria: string, precio: number, cantidad: number) {
        this.nombreProd = nombreProd;
        this.descripcion = descripcion;
        this.categoria = categoria; this.precio = precio;
        this.cantidad = cantidad;
    }

    public getNombreProd(): string {
        return this.nombreProd;
    }
    public getCategoria(): string {
        return this.categoria;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }

    public getPrecio(): number {
        return this.precio;
    }
    public getCantidadDisponible(): number {
        return this.cantidad;
    }
    public setAgregarProductos(num: number): number {
        this.cantidad += num;
        return this.cantidad;
    }
    public setModificarCantidad(num: number) {
        this.cantidad = num;

    }
    public setRestarProductos(num: number): number {
        this.cantidad -= num;
        return this.cantidad;
    }
}