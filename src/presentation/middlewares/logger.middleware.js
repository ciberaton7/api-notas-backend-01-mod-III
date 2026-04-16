export const LoggerMiddleware = (req,res,next) => {
    console.log(`[$(new Date().toISOString()}] metodo: ${req.method} | Ruta: ${req.url}`);
    next();
}