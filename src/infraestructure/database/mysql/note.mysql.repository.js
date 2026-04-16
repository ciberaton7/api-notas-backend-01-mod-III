/*import { DataTypes } from "sequelize";
import sequelize from "./connection.js";
//acá definimos nuestro modelo

const NoteModel = sequelize.define("Note",
    {
        title: {type:DataTypes.STRING, allowNull:false},
        content: {type:DataTypes.TEXT, allowNull:false},
        imageUrl: {type:DataTypes.STRING},
        isPrivate: {type:DataTypes.BOOLEAN, defaultValue:false},
        userId: {type:DataTypes.STRING, allowNull:false},
    }, {timestamps:true});*/

import NoteModel from "./note.model.js";

export default class NoteMySQLRepository{
    async save(noteEntity){
        //return await NoteModel.create(noteEntity);
        const note = await NoteModel.create({
            title: noteEntity.title,
            Content: noteEntity.Content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userId
        });
        return note.toJSON();
    }
    async findByUserId(userId)
    {
        return await NoteModel.findAll({where:{userId}});
    }
}
//hoy no les voy a enseñar sobre Inteligencia Artificial
//Les voy a mostrar como podrían utilizarla a largo plazo