import { Request, Response } from "express";
import { DefaultResponse } from "../models/dto/default";
import { User } from "../models/entity/user";
import listUser from "../../data/users.json";
import { UserRequest } from "../models/dto/user";
import fs from "fs";
import UserService from "../services/users";

class UserHandler {
  async getUsers(req: Request, res: Response) {
    const queryName: string = req.query.name as string;

    const userList: User[] = await UserService.getUsers(queryName);

    const response: DefaultResponse = {
      status: "ok",
      message: "sukses menampilkan data",
      data: {
        users: userList,
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
        // TODO: call servicr to create user
        const createUser: User = await UserService.createUser(payload);

        const response: DefaultResponse = {
            status: "Data Ditambahkan",
            message: "User berhasil ditambahkan",
            data: {
                created_user: createUser,
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
