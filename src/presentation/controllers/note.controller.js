export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }
 
    createNote = async (req, res) => {
        const data = req.body;
        if (req.file) data.imageurl = '/uploads/' + req.file.filename;
        data.userId = 'user_123';  //TODO:  LUEGO OBTENER EL USUARIO DE LA SESION O TOKEN
        try {
            const note = await this.noteService.createNote(data);
            res.status(201).json(note); // 201 Created
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
 
    getNotesByUserId = async (req, res) => {
        const userId = 'user_123';
        try {
            const notes = await this.noteService.getNotesByUserId(userId);
            res.status(200).json(notes); // 200 OK
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    // Métodos para la Tarea 1: getNoteById, updateNote y deleteNote
    getNoteById = async (req, res) => {
        try {
            // Extraemos el ID de los parámetros de la URL (req.params)
            const { id } = req.params;
            
            // Le pedimos al servicio que busque la nota
            const note = await this.noteService.getNoteById(id);
            
            // Si todo sale bien, respondemos con la nota
            res.status(200).json(note);
        } catch (error) {
            // Si el servicio lanza un error (ej. "Nota no encontrada"), lo capturamos
            res.status(404).json({ message: error.message });
        }
    }

    updateNote = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body; // Aquí vienen los cambios (título, contenido, etc.)
            
            // Se podría recibir req.file también para cambiar imágenes
            if (req.file) {
                updateData.imageUrl = req.file.path;
            }

            const updatedNote = await this.noteService.updateNote(id, updateData);
            res.status(200).json(updatedNote);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    deleteNote = async (req, res) => {
        try {
            const { id } = req.params;
            
            await this.noteService.deleteNote(id);
            
            // Respondemos con un mensaje de éxito
            res.status(200).json({ message: "Note deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    getPublicNote = async (req, res) => {
        try {
            const { id } = req.params; // Sacamos el ID de la ruta (/api/v1/notes/123/public)
            const note = await this.noteService.getPublicNoteById(id);
            
            res.status(200).json(note);
        } catch (error) {
            // Si el error es por privacidad, devolvemos un 403 (Prohibido)
            if (error.message.includes("Acceso denegado")) {
                return res.status(403).json({ error: error.message });
            }
            // Si es porque no se encontró, devolvemos 404 (No encontrado)
            res.status(404).json({ error: error.message });
        }
    }
}