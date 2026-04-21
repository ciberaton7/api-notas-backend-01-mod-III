import UserModel from "./user.model.js";
import HashService from "../../services/hash.service.js";

export default class UserMongoRepository {
    async save(userEntity) { return await UserModel.create(userEntity); }  
    async findByEmail(email) { return await UserModel.findOne({email}); }
}