import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { Colaborador } from './colaborador.model';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('colaborador')
export class ColaboradorController {
    constructor(private service: ColaboradorService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('findById/:id')
    get(@Param() params) {
        return this.service.findById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() colaborador: Colaborador) {
        return this.service.create(colaborador);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    update(@Param() params, @Body() colaborador: Colaborador): Promise<Colaborador> {
        return this.service.update(params.id, colaborador);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    remove(@Param() params) {
        return this.service.remove(params.id);
    }
}