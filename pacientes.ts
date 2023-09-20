export class Paciente {
    private nombreMascota: string;
    private especie: string;
    private edadMascota: number;
    private id_paciente:number;

    constructor(nombreMascota: string, especie: string, edad: number,id:number) {
        this.nombreMascota = nombreMascota;
        this.especie = especie;
        this.edadMascota = edad;
        this.id_paciente=id;
       
    }
}