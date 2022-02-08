import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { Projeto } from './projeto.model';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('projeto')
export class ProjetoController {
    constructor(private service: ProjetoService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<Projeto[]> {
        return this.service.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('findById/:id')
    async get(@Param() params) {
        const projeto = await this.service.findById(params.id);

		if(!projeto){
			throw new NotFoundException(`Projeto não encontrado`)
		}

		return projeto
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() projeto: Projeto) {
        if(!projeto.inicio){
			throw new BadRequestException("Você deve especificar uma data de início para o projeto")
		}

		if(projeto.fim && projeto.inicio>=projeto.fim){
			throw new BadRequestException("Data de início do projeto não pode ser maior que data de fim")
		}

        return this.service.create(projeto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async update(@Param() params, @Body() projeto: Projeto): Promise<Projeto> {
        try{
			return this.service.update(params.id, projeto);
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
