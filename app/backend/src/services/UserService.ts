import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { IToken } from '../Interfaces/login/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) {}

  public async login(
    data: IUser,
  ): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);

    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return {
          status: 'UNAUTHORIZED',
          data: { message: 'Invalid email or password' },
        };
      }

      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });

      return { status: 'SUCCESSFUL', data: { token } };
    }

    return {
      status: 'UNAUTHORIZED',
      data: { message: 'Invalid email or password' },
    };
  }

  public async loginRole(
    data: IUser,
  ): Promise<ServiceResponse<{ role: string | undefined }>> {
    const user = await this.userModel.findByEmail(data.email);
    return { status: 'SUCCESSFUL', data: { role: user?.role } };
  }
}
