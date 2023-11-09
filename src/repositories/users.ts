import pool from "../../config/postgresql";
import { User } from "../models/entity/user";

class UserRepository {
  static async getUsers(queryName: string): Promise<User[]> {
    const getUsers = await pool.query(
      "SELECT id, name FROM users WHERE name like $1",
      [`%${queryName}%`]
    );

    const response: User[] = getUsers.rows;

    return response;
  }

  static async createUser(user: User): Promise<User> {
    const createUser = await pool.query(
      "INSERT INTO users (name) VALUES ($1) RETURNING *",
      [user.name]
    );

    const createdUser: User = {
      id: createUser.rows[0].id,
      name: createUser.rows[0].name,
    };

    return createdUser;
  }
}

export default UserRepository;
