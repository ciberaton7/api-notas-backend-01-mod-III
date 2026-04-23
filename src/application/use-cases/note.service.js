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
        if (!noteData.title || !noteData.content) {//(!DataTransfer.title||!DataTransfer.content){
            throw new Error("Title and content are required");}

            const note = new NoteEntity(noteData);
            return await this.noteRepository.save(note);
    }

    async getNotesByUserId(userId)
    {
        return await this.noteRepository.findByUserId(userId);
        
    }

    // Métodos para la Tarea 1: getNoteById, updateNote y deleteNote
    async getNoteById(noteId)
    {
        // El servicio le pedirá al (repositorio) que busque la nota
        const note = await this.noteRepository.findById(noteId);
        
        // Si el repositorio no logra encontrarlo, el servicio avisa que hay un error
        // (Este error viaja de vuelta al Controlador, quien lo muestra como un 404 Not Found)
        if (!note) {
            throw new Error("Note not found");
        }
        
        return note;
    }

    async updateNote(noteId, updateData)
    {
        // El servicio le pedirá al (repositorio) que actualice la nota
        const updatedNote = await this.noteRepository.update(noteId, updateData);
        
        if (!updatedNote) {
            throw new Error("Note not found or could not be updated");
        }
        
        return updatedNote;
    }

    async deleteNote(noteId)
    {
        // El servicio le pedirá al (repositorio) que elimine la nota
        const deletedNote = await this.noteRepository.delete(noteId);
        
        if (!deletedNote) {
            throw new Error("Note not found or could not be deleted");
        }
        
        return deletedNote;
    }
}

