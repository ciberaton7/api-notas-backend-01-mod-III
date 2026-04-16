//patrón repositorio lo que hace es implementar dos diferentes formas de escritura en base de datos
//si nos vamos al diagrama de clean arquitecture una de las ventajas a este nivel es que la infraestructura se puede tocar con diferentes bases de datos sin afectar 
//el proyecto

import { Schema, model } from "mongoose";
//import { format } from "mongoose";

const noteSchema = new Schema({
    title: {type:String, required:true},
    content: {type: String, required:true},
    imageUrl:{type:String},
    password: {type:String},
    userId:{type:String, required:true}
} , {timestamps:true});

export default model ('Note', noteSchema);

//tengo mi modelo y representa esta entidad que esta en mi dominio

