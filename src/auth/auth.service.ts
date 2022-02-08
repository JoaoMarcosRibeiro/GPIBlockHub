import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,

    ) { }

    async validateUser(userLogin: string, userSenha: string) {
        const user = await this.userService.findByLogin(userLogin);
        if (user && user.senha === userSenha) {
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
