import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,

    ) { }

    async validateUser(userLogin: string, userSenha: string) {
        const user = await this.userService.findByLogin(userLogin);
        const verificaSenha = bcrypt.compare(userSenha, user.senha) //Compara senha
        if (user && verificaSenha && user.active) {
            const { _id, login } = user;
            return { id: _id, login };
        }

        return null;
    }

    async login(user: any) {
        const payload = { login: user.login, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
