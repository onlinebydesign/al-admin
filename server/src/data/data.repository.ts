import { ObjectID } from 'mongodb';
import { EntityRepository, MongoRepository } from 'typeorm';
import { Data } from './data.entity';

@EntityRepository(Data)
export class DataRepository extends MongoRepository<Data> {

  public findById(id: string | ObjectID): Promise<Data> {
    return super.findOne(id);
  }

  public async updateOneById(id: string | ObjectID, data: Data): Promise<Data> {

    // Not sure if this is needed.
    delete data.id;
    const databaseData = await this.findById(id);
    const combinedData = Object.assign(databaseData, data);

    return await super.save(combinedData);
  }

}