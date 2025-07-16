import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Owner } from 'src/Owner/entities/Owner.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update.car.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async getAllCars(paginationDto: PaginationDto): Promise<Car[]> {
    const { limit, offset } = paginationDto;

    return this.carRepository.find({ take: limit, skip: offset });
  }

  async getCarById(id: number): Promise<Car> {
    const car = await this.carRepository.findOneBy({ id });

    if (!car) {
      throw new NotFoundException('This car is not Found');
    }

    return car;
  }

  async createCar(createCarDto: CreateCarDto) {
    const owner = await this.ownerRepository.findOneBy({
      id: createCarDto.ownerId,
    });

    if (!owner) {
      throw new NotFoundException('This owner is not Found');
    }

    let { ownerId, ...car } = createCarDto;

    car = this.carRepository.create({ ...car, owner: owner });
    const savedCar = await this.carRepository.save(car);
    return savedCar;
  }

  async updateCar(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    try {
      const car = await this.carRepository.findOne({ where: { id } });

      if (!car) {
        throw new NotFoundException('Car not Found');
      }

      // Si el cliente quiere cambiar el owner
      if (updateCarDto.ownerId) {
        const owner = await this.ownerRepository.findOne({
          where: { id: updateCarDto.ownerId },
        });

        if (!owner) {
          throw new NotFoundException('Owner not Found');
        }

        car.owner = owner;
      }

      // Actualiza los demás campos si vienen en el dto
      if (updateCarDto.modelo !== undefined) car.modelo = updateCarDto.modelo;
      if (updateCarDto.marca !== undefined) car.marca = updateCarDto.marca;
      if (updateCarDto.color !== undefined) car.color = updateCarDto.color;

      const updatedCar = await this.carRepository.save(car);
      return updatedCar;
    } catch (error) {
      throw new InternalServerErrorException('Error updating the Car');
    }
  }
}
