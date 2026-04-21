import Userentity from "../../domain/entities/user.entity.js";
import HashService from "../../infraestructure/security/hash.service.js";
import jwt from "jsonwebtoken";

export default class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async register(data) {
        const exist = await this.userRepository.findByEmail(data.email);
        if (exist) throw new Error("email already in use");
        
        data.password = await HashService.hash(data.password);
        const newUser = new Userentity(data);
        return await this.userRepository.save(newUser);
        return {message: "User Registered successfully"};
    }
    async login ({email,password}) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await HashService.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign({id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});

        return {token, user:{id: user.id, name: user.name, email: user.email, role: user.role}};

        return {token}

    }
}