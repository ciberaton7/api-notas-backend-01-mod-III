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

    // acá ponemos el servicio solicitado en el ejercicio 3.3, que es el servicio para obtener las notas de un usuario filtradas por categorí
    async getPublicNoteById(noteId) {
        // 1. Buscamos la nota en la base de datos usando el método que ya tienes
        const note = await this.noteRepository.findById(noteId);
        
        // 2. Si no existe, lanzamos error
        if (!note) throw new Error("Nota no encontrada");
        
        // 3. Verificamos si es privada, si lo es bloqueamos el acceso
        if (note.isPrivate === true) {
            throw new Error("Acceso denegado: Esta nota es privada y no puede compartirse");
        }
        
        // 4. Si pasa las validaciones, la devolvemos
        return note;
    }
}

