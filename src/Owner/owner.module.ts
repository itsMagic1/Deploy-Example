import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/Owner.entity';
import { Agency } from 'src/Agency/entities/agency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Agency])],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
