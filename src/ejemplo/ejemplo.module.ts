import { Module } from '@nestjs/common';
import { EjemploService } from './ejemplo.service';
import { EjemploGateway } from './ejemplo.gateway';

@Module({
  providers: [EjemploGateway, EjemploService],
})
export class EjemploModule {}
