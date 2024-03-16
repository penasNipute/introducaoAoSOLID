import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";
import { IRequest } from "../turnUserAdmin/TurnUserAdminUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(req: Request, res: Response): Response {
    const user_id = req.headers['user_id'] as string; // Extract user_id as string

    // Create an IRequest object with the extracted user_id
    const requestData: IRequest = { user_id }; // Assuming user_id is the only property in IRequest

    try {
      const users = this.listAllUsersUseCase.execute(requestData);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    
  }
}

export { ListAllUsersController };
