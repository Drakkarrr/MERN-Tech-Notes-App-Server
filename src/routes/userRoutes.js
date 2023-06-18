import { Router } from "express";
import userController from "../controller/user.controller.js";

const router = Router();

router.route("/")
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


export default router;