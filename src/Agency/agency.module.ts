import { Module } from '@nestjs/common';
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './entities/agency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agency])],
  controllers: [AgencyController],
  providers: [AgencyService],
  exports: [AgencyService],
})
export class AgencyModule {}
