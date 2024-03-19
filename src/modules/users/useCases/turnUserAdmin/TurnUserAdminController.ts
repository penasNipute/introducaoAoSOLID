import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(req: Request, res: Response): Response {
    const {user_id} = req.params

    try {
      const user = this.turnUserAdminUseCase.execute({user_id})
      return res.status(200).json(user)
    } catch (error) {
      if (error.message === 'User not found') {
        // Handle user not found error
        return res.status(400).json({ error: 'User not found' });
      } else if (error.message.startsWith("Forbidden:")) {
        // Handle non-admin error
        return res.status(403).json({ error: "Forbidden: User is already an admin" });
      } else {
        // Handle other errors
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  }
}

export { TurnUserAdminController };
