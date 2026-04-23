import JwtService from "../../infraestructure/security/jwt.service.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) 
        {return res.status(401).json({message: "Authorization header missing or invalid"});}

    const token = authHeader.split(" ")[1];
    try {
        const payload = JwtService.verifyToken(token);
        req.user = payload; // Agregar la información del usuario al objeto de solicitud CONTIENE EL ID, EMAIL, ROLE INCRUSTADO EN LA REQUESTE PARA QUE EL CONTROLLER LO PUEDA USAR
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid token"});
    }
};
