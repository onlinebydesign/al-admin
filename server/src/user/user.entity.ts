import { Entity, Column, ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn() id: ObjectID;

  @Column() email: string;

  @Column() password: string;

  @Column() firstName: string;
  @Column() lastName: string;

  @Column() role: string;

  // For use with the password
  @Column() salt: string;

  // For resetting password
  @Column() resetPasswordToken: string;
  @Column() resetPasswordExpires: string;

  // For email verification
  @Column() verificationToken: string;

  // Generic fields for all models
  @CreateDateColumn() created: Date;
  @UpdateDateColumn() updated: Date;
  @VersionColumn() ver: number;
}
