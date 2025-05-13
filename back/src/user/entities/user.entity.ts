import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: false, unique: true })
  @Exclude()
  client_id: string;

  @Column({ nullable: false, unique: true })
  @Exclude()
  private_key: string;

  @CreateDateColumn()
  created_ar: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
