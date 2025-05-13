import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Status {
  CREATED = 0,
  EXPIRED = 1,
  PAID = 2,
}

enum Type {
  STATIC = 0,
  DINAMIC = 1,
}

@Entity()
export class Charge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  id_invoice: number;

  @Column({
    type: 'enum',
    enum: Type,
    nullable: false,
  })
  type: Type;

  @Column({ type: 'int' })
  amount: number;

  @Column()
  description: string;

  @Column({ nullable: false })
  instruction: string;

  @Column({ type: 'char', length: 36, unique: true })
  id_external: string;

  @Column({ type: 'char', length: 36, unique: true })
  id_transaction: string;

  @Column()
  due_date: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.CREATED,
  })
  status: Status;

  @Column({ nullable: true })
  customer_name?: string;

  @Column({ nullable: true })
  customer_email?: string;

  @Column({ nullable: true })
  customer_doc_type?: string;

  @Column({ nullable: true })
  customer_doc_value?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
