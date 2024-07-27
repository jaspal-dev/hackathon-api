import { MigrationInterface, QueryRunner } from "typeorm";

export class SessionId1722085155111 implements MigrationInterface {
    name = 'SessionId1722085155111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`session_id\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`session_id\``);
    }

}
