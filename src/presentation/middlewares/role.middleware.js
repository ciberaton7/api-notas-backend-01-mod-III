export const roleMiddleware = (rolesPermited) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!req.user || !rolesPermited.includes(req.user.role)){
            return res.status(403).json({message: "Forbidden: You don't have permission to access this resource"});
        }
        next();
    };

}