import express, { Application, NextFunction } from "express";
import UserHandler from "./handlers/users";
import PostHandler from "./handlers/posts";

const app: Application = express();
const PORT: number = 8080;

app.use(express.json());

const userHandler = new UserHandler();
const postsHandler = new PostHandler();



app.get("/api/users", userHandler.getUsers);
app.get("/api/users/:id", userHandler.getUserById);
app.post("/api/users", userHandler.creatUser);
app.delete("/api/users/:id", userHandler.deleteUserById);


app.get("/api/posts", postsHandler.getPosts);
app.get("/api/posts/:id", postsHandler.getPostsById);
app.post("/api/posts", postsHandler.createPost);
app.patch("/api/posts/:id", postsHandler.updatePostById);
app.delete("/api/posts/:id", postsHandler.deletePostById);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});