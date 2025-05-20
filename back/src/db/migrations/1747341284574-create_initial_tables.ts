import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateInitialTables1747341284574 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // User Table
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
          },
          { name: 'name', type: 'varchar', isNullable: false },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          { name: 'email', type: 'varchar', isNullable: false, isUnique: true },
          { name: 'password', type: 'varchar' },
          { name: 'refresh_token', type: 'varchar', isNullable: true },
          {
            name: 'client_id',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'private_key',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Charge Table
    await queryRunner.createTable(
      new Table({
        name: 'charge',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'id_invoice',
            type: 'integer',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'type',
            type: 'integer',
            isNullable: false,
            comment: '0 = STATIC, 1 = DINAMIC',
          },
          { name: 'amount', type: 'integer' },
          { name: 'description', type: 'varchar', isNullable: false },
          { name: 'instruction', type: 'varchar', isNullable: false },
          { name: 'id_external', type: 'char', length: '36', isUnique: true },
          {
            name: 'id_transaction',
            type: 'char',
            length: '36',
            isUnique: true,
          },
          { name: 'due_date', type: 'timestamp', isNullable: true },
          {
            name: 'status',
            type: 'integer',
            default: '0',
            comment: '0 = CREATED, 1 = EXPIRED, 2 = PAID, 3 = CREDITED',
          },
          { name: 'customer_name', type: 'varchar', isNullable: true },
          { name: 'customer_email', type: 'varchar', isNullable: true },
          { name: 'customer_doc_type', type: 'varchar', isNullable: true },
          { name: 'customer_doc_value', type: 'varchar', isNullable: true },
          { name: 'id_user', type: 'char', length: '36' },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // ForeignKey Charge.user -> User.id
    await queryRunner.createForeignKey(
      'charge',
      new TableForeignKey({
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    // ChargeHistory Table
    await queryRunner.createTable(
      new Table({
        name: 'charge_history',
        columns: [
          {
            name: 'id',
            type: 'char',
            length: '36',
            isPrimary: true,
          },
          { name: 'id_charge', type: 'char', length: '36', isNullable: true },
          { name: 'id_invoice', type: 'integer', isNullable: true },
          {
            name: 'type',
            type: 'integer',
            isNullable: true,
            comment: '0 = STATIC, 1 = DINAMIC',
          },
          { name: 'amount', type: 'integer', isNullable: true },
          { name: 'description', type: 'varchar', isNullable: true },
          { name: 'instruction', type: 'varchar', isNullable: true },
          { name: 'id_external', type: 'char', length: '36', isNullable: true },
          {
            name: 'id_transaction',
            type: 'char',
            length: '36',
            isNullable: true,
          },
          { name: 'due_date', type: 'timestamp', isNullable: true },
          {
            name: 'status',
            type: 'integer',
            isNullable: true,
            comment: '0 = CREATED, 1 = EXPIRED, 2 = PAID, 3 = CREDITED',
          },
          { name: 'customer_name', type: 'varchar', isNullable: true },
          { name: 'customer_email', type: 'varchar', isNullable: true },
          { name: 'customer_doc_type', type: 'varchar', isNullable: true },
          { name: 'customer_doc_value', type: 'varchar', isNullable: true },
          { name: 'id_user', type: 'char', length: '36' },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('charge_history');

    const table = await queryRunner.getTable('charge');
    const foreignKey = table!.foreignKeys.find((fk) =>
      fk.columnNames.includes('id_user'),
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('charge', foreignKey);
    }

    await queryRunner.dropTable('charge');
    await queryRunner.dropTable('user');
  }
}
