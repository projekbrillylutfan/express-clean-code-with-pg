import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import { User } from "../models/entity/user";
import listUser from "../../data/users.json";
import { UserRequest } from "../models/dto/user";
import fs from "fs";

class UserHandler {
  async getUsers(req: Request, res: Response) {
    const nameQuery: string = req.query.name as string;

    let filteredUsers: User[] = listUser.map((user: User) => ({
      id: user.id,
      name: user.name || "",
    }));

    if (nameQuery) {
      filteredUsers = filteredUsers.filter((user: User) =>
        user.name?.toLowerCase().includes(nameQuery.toLowerCase())
      );
    }

    const response: DefaultResponse = {
      status: "ok",
      message: "sukses menampilkan data",
      data: {
        users: filteredUsers,
      },
    };

    res.status(200).send(response);
  }

  async getUserById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    const user = listUser.find((user) => user.id === id);

    const responseEror: DefaultResponse = {
        status: "ERROR",
        message: "User not found",
        data: null,
      };

      const responseSuccses: DefaultResponse = {
        status: "OK",
        message: "Success retrieving data",
        data: user,
      };

    if (!user) {
      res.status(404).send(responseEror);
    } else {
        res.status(200).send(responseSuccses);
    }
  }

  async creatUser(req: Request, res: Response) {
    const payload: UserRequest = req.body;

    if (!payload.name) {
        const response: DefaultResponse = {
            status: "Bad Request",
            message: "Nama tidak boleh kosong",
            data: {
                created_user: null,
            }
        }

        res.status(400).send(response)
    } else {
        const userToCreate: User = {
            id: listUser[listUser.length - 1].id + 1,
            name: payload.name,
        }

        const users: User[] = listUser;
        users.push(userToCreate);

        fs.writeFileSync("./data/users.json", JSON.stringify(users));

        const response: DefaultResponse = {
            status: "Data Ditambahkan",
            message: "User berhasil ditambahkan",
            data: {
                created_user: userToCreate,
            }
        }

        res.status(201).send(response)
    }
  }

  async deleteUserById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    const filteredUsers = listUser.filter((user) => user.id !== id)

    const user = listUser.find((user) => user.id === id)

    if (!user) {
        const response: DefaultResponse = {
            status: "error",
            message: "User tidak ditemukan",
            data: null,
        }

        res.status(404).send(response);
    } else {
        fs.writeFileSync("./data/users.json",  JSON.stringify(filteredUsers));

        const response: DefaultResponse = {
            status: "DELETE",
            message: "berhasil menghapus data user",
            data: {
                delete_user: listUser.find((user) => user.id === id)
            },
        }

        res.status(200).send(response)
    }
  }
}

export default UserHandler;
