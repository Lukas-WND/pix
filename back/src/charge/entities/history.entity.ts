import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  CREATED = 0,
  EXPIRED = 1,
  PAID = 2,
  CREDITED = 3,
}

export enum Type {
  STATIC = 0,
  DINAMIC = 1,
}

@Entity()
export class ChargeHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  id_charge: string;

  @Column({ nullable: true })
  id_invoice: number;

  @Column({ nullable: true })
  type: Type;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  instruction: string;

  @Column({ type: 'char', length: 36, nullable: true })
  id_external: string;

  @Column({ type: 'char', length: 36, nullable: true })
  id_transaction: string;

  @Column({ nullable: true })
  due_date: Date;

  @Column({ nullable: true })
  status: Status;

  @Column({ nullable: true })
  customer_name?: string;

  @Column({ nullable: true })
  customer_email?: string;

  @Column({ nullable: true })
  customer_doc_type?: string;

  @Column({ nullable: true })
  customer_doc_value?: string;

  @Column()
  user: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
