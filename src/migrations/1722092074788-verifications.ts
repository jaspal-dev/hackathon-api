import { MigrationInterface, QueryRunner } from "typeorm";

export class Verifications1722092074788 implements MigrationInterface {
    name = 'Verifications1722092074788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`is_email_verified\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`is_phone_number_verified\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`is_phone_number_verified\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`is_email_verified\``);
    }

}
