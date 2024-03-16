import { Router } from "express";

import { createUserController } from "../modules/users/useCases/createUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";
import { showUserProfileController } from "../modules/users/useCases/showUserProfile";
import { turnUserAdminController } from "../modules/users/useCases/turnUserAdmin";
import { UsersRepository } from "modules/users/repositories/implementations/UsersRepository";

const usersRoutes = Router();



usersRoutes.post("/", (req, res) =>
  createUserController.handle(req, res)
);



usersRoutes.patch("/:user_id/admin", (req, res) =>
  turnUserAdminController.handle(req, res)
);

usersRoutes.get("/:user_id", (req, res) =>
  showUserProfileController.handle(req, res)
);

usersRoutes.get("/", (req, res) =>
  listAllUsersController.handle(req, res)
);

export { usersRoutes };
