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
import { OwnerService } from './owner.service';
import { Owner } from './entities/Owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get()
  getAllOwners(): Promise<Owner[]> {
    return this.ownerService.getAllOwners();
  }

  @Get(':id')
  async getOwnerById(@Param('id', ParseIntPipe) id: number): Promise<Owner> {
    return this.ownerService.getOwnerById(id);
  }

  @Post()
  async createOwner(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownerService.createOwner(createOwnerDto);
  }

  @Patch(':id')
  async updateOwner(@Param('id', ParseIntPipe) id: number, @Body() updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
    return this.ownerService.updateOwner(id, updateOwnerDto);
  }

  @Delete(':id')
  async deleteOwner(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.ownerService.deleteOwner(id);
  }

  @Get(':id/cars')
  async getCarsByOwner(@Param('id', ParseIntPipe) id: number) {
    return this.ownerService.getCarsByOwner(id);
  }
}
