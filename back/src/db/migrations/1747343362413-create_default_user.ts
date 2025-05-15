import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDefaultUser1747343362413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const id = randomUUID();
    const hashedPassword = await hash('canvi', 10);

    await queryRunner.query(
      `INSERT INTO \`user\` (id, name, username, email, password, refresh_token, client_id, private_key) VALUES (?, ?, ?, ?, ?, NULL, ?, ?)`,
      [
        id,
        'Administrador',
        'admin',
        'admin@example.com',
        hashedPassword,
        '105F0B108954FF',
        'F7DD2108954105F0BF765DFFDB210C880101B4D107363F7DD2',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`user\` WHERE username = 'admin'`);
  }
}
