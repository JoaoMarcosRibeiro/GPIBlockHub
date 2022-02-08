import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private service: UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<User[]> {
        return this.service.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('findById/:id')
    async get(@Param() params) {

        const user = await this.service.findById(params.id);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado')
        }

        return user
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() user: User) {
        return this.service.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async update(@Param() params, @Body() user: User): Promise<User> {
        try {
            return this.service.update(params.id, user);
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async remove(@Param() params) {
        try {
            return this.service.remove(params.id);
        }
        catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}