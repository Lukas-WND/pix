import { Exclude } from 'class-transformer';
import { Charge } from 'src/charge/entities/charge.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: false, unique: true })
  @Exclude()
  client_id: string;

  @Column({ nullable: false, unique: true })
  @Exclude()
  private_key: string;

  @OneToMany(() => Charge, (charge) => charge.user)
  charges: Charge[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
