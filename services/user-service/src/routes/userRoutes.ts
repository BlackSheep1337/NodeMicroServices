import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/userController";

const router = Router();

router.use("/", getUsers);
router.use("/", createUser);
router.use("/:id", getUser);
router.use("/:id", updateUser);
router.use("/:id", deleteUser);

export default router;