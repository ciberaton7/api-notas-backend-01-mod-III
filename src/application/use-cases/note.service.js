//importante al trabajar con nuestros archivos debemos añadir al final .js para que el sistema pueda reconocerlo
//requerido para ESM
import NoteEntity from "../../domain/entities/note.entity.js";

export default class NoteService
{
    constructor(noteRepository)
    {
        this.noteRepository = noteRepository;
    }

    async createNote(noteData)
    {
        if (!DataTransfer.title||!DataTransfer.content){
            throw new Error("Title and content are required");}

            const note = new NoteEntity(data);
            return await this.noteRepository.create(note);
    }

    async getNoteByUser(userId)
    {
        return await this.noteRepository.findByUserId(userId);
        
    }
}

