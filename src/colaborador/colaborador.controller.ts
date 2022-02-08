import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColaboradorService } from './colaborador.service';
import { Colaborador } from './colaborador.model';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('colaborador')
export class ColaboradorController {
    constructor(private service: ColaboradorService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('findById/:id')
    async get(@Param() params) {
        const colaborador = await this.service.findById(params.id);

		if(!colaborador){
			throw new NotFoundException('Colaborador não encontrado!')
		}

		return colaborador
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() colaborador: Colaborador) {
        return this.service.create(colaborador);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async update(@Param() params, @Body() colaborador: Colaborador): Promise<Colaborador> {
        try{
			return this.service.update(params.id, colaborador);
		}
		catch(error){
			throw new BadRequestException(error.message)
		}        
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async remove(@Param() params) {
        try{
			return this.service.remove(params.id);
		}
		catch(error){
			throw new BadRequestException(error.message)
		}        
    }
}