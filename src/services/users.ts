import { UserRequest } from "../models/dto/user";
import { User } from "../models/entity/user";
import UserRepository from "../repositories/users";

class UserService {
    static async getUsers(queryName: string): Promise<User[]> {
        // TODO: call repo function to query from database
        const listUser = await UserRepository.getUsers(queryName);

        return listUser;
    }

    static async createUser(user: UserRequest): Promise<User> {
        // TODO: call rep to create user

        const userToCreate: User = {
            name: user.name
        }
        const createdUser = await UserRepository.createUser(userToCreate);

        return createdUser;
    }
}

export default UserService;