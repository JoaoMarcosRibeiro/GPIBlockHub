import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColaboradorProjetoService } from './colaborador-projeto.service';
import { ColaboradorProjeto } from './colaborador-projeto.model';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('colaborador-projeto')
export class ColaboradorProjetoController {
  constructor(private service: ColaboradorProjetoService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get('findById/:id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() colaboradorProjeto: ColaboradorProjeto) {
    return this.service.create(colaboradorProjeto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  update(@Param() params, @Body() colaboradorProjeto: ColaboradorProjeto): Promise<ColaboradorProjeto> {
    return this.service.update(params.id, colaboradorProjeto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}