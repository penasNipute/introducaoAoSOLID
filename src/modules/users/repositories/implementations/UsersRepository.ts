import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {

    const user = new User()

    Object.assign(user,{
      name,
      email,
      updated_at:new Date()
    })

    this.users.push(user)
    return user
  }

  findById(id: string): User | undefined {
    const userAlreadyExists = this.users.find( user => user.id === id)

    return userAlreadyExists
  }

  findByEmail(email: string): User | undefined {
    const userAlreadyExists = this.users.find( user => user.email === email)
    return userAlreadyExists
  }

  turnAdmin(receivedUser: User): User {
      if (receivedUser.admin === true) {
        throw new Error('User is already an admin'); // Lança erro se já for admin
      }
    
      receivedUser.admin = true;
      receivedUser.updated_at = new Date();
    
      return receivedUser;
  }

  list(): User[] {
    return this.users
  }
}

export { UsersRepository };
