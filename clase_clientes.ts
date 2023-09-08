import{Sucursal} from "./clase_sucursales";


export class Cliente extends Sucursal{
    nombreDueño: string;
    telefono:number;
    id:number;
    vip:boolean;
    pacientes:Paciente[];   //En el caso que el cliente tenga mas de una mascota como paciente de la sucursal.
    
     crearPaciente(nombre:string, especie:string){
       // filu
    }
}

class Paciente  {
    private nombreMascota:string;
    private especie:string;
    animalito:{
        nombre:string;
        especie:string;
    }

    constructor(nombreMascota:string,especie:string,nombreDueño: string,telefono:number,){
        
        this.animalito={
            nombre:nombreMascota,
            especie:especie,
        }

        this.pacientes.push(animalito)
       
    }
    

}