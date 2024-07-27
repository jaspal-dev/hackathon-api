import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1722084502818 implements MigrationInterface {
    name = 'Users1722084502818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`email\` varchar(50) NOT NULL, \`email_verified_at\` datetime NULL, \`country_code\` varchar(5) NOT NULL, \`phone_number\` varchar(20) NOT NULL, \`phone_number_verified_at\` datetime NULL, \`preferred_language\` enum ('HINDI', 'ENGLISH') NOT NULL DEFAULT 'ENGLISH', \`password\` varchar(50) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
