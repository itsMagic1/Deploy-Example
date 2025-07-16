import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { Agency } from './entities/agency.entity';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Get()
  getAllAgencies() {
    return this.agencyService.getAllAgencies();
  }

  @Get(':id')
  async getAgencyById(@Param('id', ParseIntPipe) id: number): Promise<Agency> {
    return await this.agencyService.getAgencyById(id);
  }

  @Post()
  async createAgency(@Body() createAgencyDto: CreateAgencyDto) {
    return await this.agencyService.createAgency(createAgencyDto);
  }

  @Patch(':id')
  async updateAgency(@Param('id', ParseIntPipe) id: number, @Body() updateAgencyDto: UpdateAgencyDto): Promise<UpdateResult> {
    return this.agencyService.updateAgency(id, updateAgencyDto);
  }

  @Delete(':id')
  async deleteAgency(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.agencyService.deleteAgency(id);
  }
}
