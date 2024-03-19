import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute( {user_id}: IRequest): User[] { 

    
    const IsAdmin = this.usersRepository.findById(user_id)

    if(!IsAdmin){
      throw new Error("User not found")
    }

    if(IsAdmin.admin !== true){
      throw new Error("Unauthorized: User is not an admin")
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
