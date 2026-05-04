import AuthService from "../../application/use-cases/auth.service.js";
import HashService from "../../infraestructure/security/hash.service.js";
import JwtService from "../../infraestructure/security/jwt.service.js";
import {jest} from '@jest/globals';

/* Mock del repositorio de usuarios */
const mockUserRepository = {
    save: jest.fn(),
    findByEmail: jest.fn(),
}
describe ('AuthService - Pruebas Unitarias', () => {
    let authService;

    beforeEach(() => {
        jest.clearAllMocks();
        authService = new AuthService(mockUserRepository);
    });
    test('Debería registrar un nuevo usuario', async () => {
        //arrange
        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockUserRepository.save.mockResolvedValue(true);
        const userData = { email: "test@example.com", password: "password123", name: "Test User" };
        //act
        const result = await authService.register(userData);
        //assert
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
        expect(mockUserRepository.save).toHaveBeenCalled();
        //expect(result).toBe("User Registered successfully");
        expect(result).toEqual({message: "User Registered successfully"});
    });

    test('Debería lanzar error si el email ya existe', async () => {
        //arrange
        mockUserRepository.findByEmail.mockResolvedValue({id: "1", email: "test@example.com", password: "hashedpassword", name: "Existing User" });
        const userData = { email: "test@example.com", password: "password123", name: "Test User" };
        //act & assert
        await expect(authService.register(userData)).rejects.toThrow("email already in use");
    });
});


/**
 CODIGO INGE
 import AuthService from "../../application/auth.service.js";
import hashService from "../../infrastructure/security/hash.service.js";
import jwtService from "../../infrastructure/security/jwt.service.js";
 
 Mock del repositorio de usuarios 
const mockUserRepository = {
    save: jest.fn(),
    findByEmail: jest.fn(),
}
 
describe('AuthService - Pruebas unitarias', () => {
    let authService;
 
    beforeEach(() => {
        jest.clearAllMocks();
        authService = new AuthService(mockUserRepository);
    });
 
    test('deberia registrar un nuevo usuario', async () => {
        //arrange
        mockUserRepository.findByEmail.mockResolvedValue(null);// No existe el email
        mockUserRepository.save.mockResolvedValue(true); // Simula guardado exitoso
        const userData = { email: "test@example.com", password: "password123" };
 
        //act
        const result = await authService.register(userData);
 
        //assert
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(userData.email);
        expect(mockUserRepository.save).toHaveBeenCalled();
        expect(result).toBe("User registered successfully");    
    });
 
    test('deberia lanzar error si el email ya existe', async () => {
        //arrange
        mockUserRepository.findByEmail.mockResolvedValue({ id: "1", email: "test@example.com" });
 
        const userData = { email: "test@example.com", password: "password123" };
 
        //act & assert
        await expect(authService.register(userData)).rejects.toThrow("Email already exists");
    });
});

 */
