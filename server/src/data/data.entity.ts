import { Entity, Column, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity()
export class Data {
  @ObjectIdColumn() id: ObjectID;

  @Column() formId: string;
  @Column() formVersion: number;

  @Column() position: number;

  @Column('json') data: any;

  // Generic fields for all models
  @CreateDateColumn() created: Date;
  @UpdateDateColumn() updated: Date;
  @VersionColumn() ver: number;
}
