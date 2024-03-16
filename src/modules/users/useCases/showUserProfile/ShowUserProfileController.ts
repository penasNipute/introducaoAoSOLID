import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(req: Request, res: Response): Response {
    const { user_id } = req.params
    try {
      const profile = this.showUserProfileUseCase.execute({user_id})

      return res.status(200).json(profile)
    } catch (error) {
      return res.status(404).json({error:error.message})
    }
   
  }
}

export { ShowUserProfileController };
