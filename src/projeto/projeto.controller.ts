import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { Projeto } from './projeto.model';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('projeto')
export class ProjetoController {
    constructor(private service: ProjetoService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('findById/:id')
    get(@Param() params) {
        return this.service.findById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() projeto: Projeto) {
        return this.service.create(projeto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    update(@Param() params, @Body() projeto: Projeto): Promise<Projeto> {
        return this.service.update(params.id, projeto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param() params) {
        return this.service.remove(params.id);
    }
}
