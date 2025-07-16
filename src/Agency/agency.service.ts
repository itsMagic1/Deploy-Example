import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from './entities/agency.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Injectable()
export class AgencyService {
  constructor(@InjectRepository(Agency) private readonly agencyRepository: Repository<Agency>) {}

  async getAllAgencies(): Promise<Agency[]> {
    return this.agencyRepository.find({ relations: ['owners'] });
  }

  async createAgency(agency: CreateAgencyDto): Promise<Agency> {
    const createdAgency = this.agencyRepository.create(agency);
    await this.agencyRepository.save(createdAgency);

    const fullAgency = await this.agencyRepository.findOne({
      where: { id: createdAgency.id },
      relations: ['owners'],
    });

    if (!fullAgency) {
      throw new NotFoundException('This agency is not Found');
    }

    return fullAgency;
  }

  async getAgencyById(id: number): Promise<Agency> {
    const agency = await this.agencyRepository.findOne({
      where: { id },
      relations: ['owners'],
    });

    if (!agency) {
      throw new NotFoundException('This agency is not Found');
    }

    return agency;
  }

  async updateAgency(id: number, updateAgencyDto: UpdateAgencyDto): Promise<UpdateResult> {
    try {
      const updateResult = await this.agencyRepository.update(id, updateAgencyDto);

      if (updateResult.affected === 0) {
        throw new NotFoundException('This Agency is not found');
      }
      return updateResult;
    } catch {
      throw new InternalServerErrorException('Error updating the Agency');
    }
  }

  async deleteAgency(id: number): Promise<DeleteResult> {
    const deleteResult = await this.agencyRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('This Agency is not Found');
    }

    return deleteResult;
  }
}
