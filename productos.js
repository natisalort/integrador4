"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
var Producto = /** @class */ (function () {
    function Producto(nombreProd, descripcion, categoria, precio, cantidad) {
        this.nombreProd = nombreProd;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    Producto.prototype.getNombreProd = function () {
        return this.nombreProd;
    };
    Producto.prototype.getCategoria = function () {
        return this.categoria;
    };
    Producto.prototype.getDescripcion = function () {
        return this.descripcion;
    };
    Producto.prototype.getPrecio = function () {
        return this.precio;
    };
    Producto.prototype.getCantidadDisponible = function () {
        return this.cantidad;
    };
    Producto.prototype.setAgregarProductos = function (num) {
        this.cantidad += num;
    };
    Producto.prototype.setModificarCantidad = function (num) {
        this.cantidad = num;
    };
    Producto.prototype.setRestarProductos = function (num) {
        this.cantidad -= num;
    };
    return Producto;
}());
exports.Producto = Producto;
