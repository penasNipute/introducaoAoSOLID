import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";
import { IRequest } from "../turnUserAdmin/TurnUserAdminUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(req: Request, res: Response): Response {
    const  user_id = req.headers['user_id'] as string; // Extract user_id as string

    // Create an IRequest object with the extracted user_id
    const requestData: IRequest = { user_id }; // Assuming user_id is the only property in IRequest

    try {
      const users = this.listAllUsersUseCase.execute(requestData);
      return res.status(200).json(users);
    } catch (error) {
      if (error.message === "User not found") {
        // Handle user not found error
        return res.status(400).json({ error: "User not found" });
      } else if (error.message.startsWith("Unauthorized:")) {
        // Handle non-admin error
        return res.status(401).json({ error: "Unauthorized: User is not an admin" });
      } else {
        // Handle other errors
        return res.status(500).json({ error: "Internal server error" });
      }
    }
    
  }
}

export { ListAllUsersController };
