import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/Owner.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Car } from 'src/Car/entities/car.entity';
import { Agency } from 'src/Agency/entities/agency.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private readonly ownerRepo: Repository<Owner>,
    @InjectRepository(Agency) private readonly agencyRepo: Repository<Agency>,
  ) {}

  async getAllOwners(): Promise<Owner[]> {
    return this.ownerRepo.find();
  }

  async getOwnerById(id: number): Promise<Owner> {
    const owner = await this.ownerRepo.findOne({where: {id}, relations: ['cars', 'agency']});

    if (!owner) {
      throw new NotFoundException('This Owner is not Found');
    }

    return owner;
  }

  async createOwner(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    try {
    const agency = await this.agencyRepo.findOneBy({id: createOwnerDto.agencyid});
      if (!agency) {
        throw new NotFoundException('This agency is not Found');
      }

      const { agencyid, ...createOwner } = createOwnerDto;

      const owner = this.ownerRepo.create({ ...createOwner, agency });
      await this.ownerRepo.save(owner);

      const saved = await this.ownerRepo.findOne({where: {id: owner.id}, relations: ['agency']})

      if (!saved) {
        throw new NotFoundException('This owner is not Found');
      }

      return saved;
    } catch {
      throw new InternalServerErrorException('Error creating an Owner');
    }
  }

  async updateOwner(id: number, updateDto: UpdateOwnerDto): Promise<Owner> {
    const owner = await this.ownerRepo.findOne({
      where: { id },
      relations: ['agency', 'cars'],
    });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    if (updateDto.name !== undefined) {
      owner.name = updateDto.name;
    }

    if (updateDto.agencyid !== undefined) {
      const agency = await this.agencyRepo.findOneBy({
        id: updateDto.agencyid,
      });
      if (!agency) {
        throw new NotFoundException('Agency not found');
      }
      owner.agency = agency;
    }

    return await this.ownerRepo.save(owner);
  }

  async deleteOwner(id: number): Promise<DeleteResult> {
    const deleteResult = await this.ownerRepo.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('This Owner is not Found');
    }

    return deleteResult;
  }

  async getCarsByOwner(ownerId: number): Promise<Car[]> {
    const owner = await this.ownerRepo.findOne({where: {id: ownerId}, relations: ['cars']});

    if (!owner) {
      throw new NotFoundException('This Owner is not Found');
    }
    return owner.cars;
  }
}
