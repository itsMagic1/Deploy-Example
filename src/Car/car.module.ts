import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from 'src/Owner/entities/Owner.entity';
import { Car } from './entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Owner])],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
