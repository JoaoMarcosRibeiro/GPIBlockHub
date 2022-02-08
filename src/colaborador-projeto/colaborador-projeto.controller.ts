import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColaboradorProjetoService } from './colaborador-projeto.service';
import { ColaboradorProjeto } from './colaborador-projeto.model';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('colaborador-projeto')
export class ColaboradorProjetoController {
  constructor(private service: ColaboradorProjetoService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<ColaboradorProjeto[]> {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('findById/:id')
  async get(@Param() params) {
    const colaboradorProjeto = await this.service.findById(params.id);

    if (!colaboradorProjeto) {
      throw new NotFoundException(`Relação entre Projeto e Colaborador não encontrada`)
    }

    return colaboradorProjeto
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() colaboradorProjeto: ColaboradorProjeto) {
    return this.service.create(colaboradorProjeto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Param() params, @Body() colaboradorProjeto: ColaboradorProjeto): Promise<ColaboradorProjeto> {
    return this.service.update(params.id, colaboradorProjeto);
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