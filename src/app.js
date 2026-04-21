import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';

import { LoggerMiddleware } from './presentation/middlewares/logger.middleware.js';
import noteRoutes from './presentation/routes/note.routes.js';
import { connectMongo } from './infraestructure/database/mongo/conection.js';
import {connectMysql} from './infraestructure/database/mysql/connection.js';

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
//import dns from "node:dns/promises";
//dns.setServers(["8.8..8.8"]);



await connectMongo();
//await connectMysql();

const app = express();

app.use(cors());
app.use(express.json());
app.use(LoggerMiddleware);
app.use(morgan('dev'));
//imágenes estáticas
//app.use('/uploads', express.static('uploads'));
app.use('uploads', express.static('uploads'));
/*app.use('/api/v1/notes' , (requ,res,next) =>{

})*/
app.use('/api/v1/notes', noteRoutes);

app.get('/api/health', (req, res) => 
                                    {
                                        res.status(200).json(
                                                                { status: 'ok',message: 'API de notas activa y funcionando' }
                                                            );
                                    });

//middleware de manejo de errores
//middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
                            {
                                console.log(`Servidor escuchando en el puerto ${PORT}`);
                            }
            );  


export default app;