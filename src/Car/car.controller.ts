import { Body, Controller, Get, Injectable, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';
import { CarService } from './car.service';
import { UpdateCarDto } from './dto/update.car.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async getCars(@Query() paginationDto: PaginationDto): Promise<Car[]> {
    console.log(paginationDto);
    return this.carService.getAllCars(paginationDto);
  }

  @Get(':id')
  async getCarById(@Param('id', ParseIntPipe) id: number): Promise<Car> {
    return this.carService.getCarById(id);
  }

  @Post()
  async createCar(@Body() car: CreateCarDto): Promise<Car> {
    return await this.carService.createCar(car);
  }

  @Patch(':id')
  async updateCar(@Param('id', ParseIntPipe) id: number, @Body() updateCarDto: UpdateCarDto): Promise<Car> {
    return this.carService.updateCar(id, updateCarDto);
  }
}
