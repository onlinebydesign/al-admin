import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Data } from './data.entity';
import { DataRepository } from './data.repository';

@Injectable()
export class DataService {
  private dataRepository: DataRepository;

  constructor(@InjectEntityManager() private entityManager: EntityManager) {
    this.dataRepository = entityManager.getCustomRepository(DataRepository);
  }

  public async findAll(where): Promise<Data[]> {
    let query;
    if (where) {
      query = {where};
    }
    
    return await this.dataRepository.find(query);
  }

  public async find(id): Promise<Data> {
    return await this.dataRepository.findById(id);
  }

  public async create(data): Promise<Data | Data[]> {
    return await this.dataRepository.save(data);
  }

  /**
   * Updates a user from the user JSON object passed in. Returns the full user with the private data removed.
   * 
   * @param dataId The ID of the user
   * @param dataInfo A JSON object for the user which may or may not have the User ID
   */
  public async update(dataId: string, dataInfo: Data): Promise<Data> {
    if (!dataInfo || !dataId) {
      throw new BadRequestException('Invalid data');
    }

    return await this.dataRepository.updateOneById(dataId, dataInfo);
  }

  public async delete(dataId: string): Promise<void> {
    if (!dataId) {
      throw new BadRequestException('Invalid data ID');
    }
    const data = await this.dataRepository.findById(dataId);

    if (!data) {
      throw new BadRequestException('Invalid data ID');
    }

    await this.dataRepository.deleteOne({_id: new ObjectID(dataId)});

    return;
  }
}
