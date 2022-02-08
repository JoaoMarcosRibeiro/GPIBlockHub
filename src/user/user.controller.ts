import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private service: UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('findById/:id')
    get(@Param() params) {
        return this.service.findById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() user: User) {
        return this.service.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    update(@Param() params, @Body() user: User): Promise<User> {
        return this.service.update(params.id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param() params) {
        return this.service.remove(params.id);
    }
}