import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {
  }

  public key() {
    return process.env.SECRET_KEY;
  }

  public passwordHash(password): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  public accessToken(id: string, name: string, surname: string, role: string) {
    return this.jwtService.sign({ id, name, surname, role }, { secret: process.env.SECRET_KEY });
  }

  public bcryptPassword(password: string, userPassword: string) {
    return bcrypt.compare(password, userPassword);
  }

  public decodeToken(token: string) {
    try {
      if (!token) {
        throw new Error();
      }

      return this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
    } catch (e) {
      throw new Error();
    }
  }
}
