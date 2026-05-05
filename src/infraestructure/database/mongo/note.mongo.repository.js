//este repositorio recibe el modelo y se encargará de hacer la creación o de definir como se almacenará la info en este repositorio
import NoteModel from "./note.model.js";

export default class NoteMongoRepository {

    async save(noteEntity){
        const note = new NoteModel({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userId,
            categoryId: noteEntity.categoryId //LINEA AGREGADA PARA EL EJERCICIO 3.2, se agrega categoryId al momento de guardar la nota en Mongo
        });
        const savedNote = await note.save();
        return savedNote.toObject();
    }

    async findByUserId(userId){
        return await NoteModel.find({userId});
    }

    async findById(noteId)
    {
        // Buscamos entre los datos de Mongo por el ID solicitado
        return await NoteModel.findById(noteId);
    }

    async update(noteId, updateData)
    {
        return await NoteModel.findByIdAndUpdate(noteId, updateData, { new: true });
    }

    async delete(noteId)
    {
        // Eliminamos el documento permanentemente de Mongo
        return await NoteModel.findByIdAndDelete(noteId);
    }

}