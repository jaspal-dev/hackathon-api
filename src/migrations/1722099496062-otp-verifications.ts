import { MigrationInterface, QueryRunner } from "typeorm";

export class OtpVerifications1722099496062 implements MigrationInterface {
    name = 'OtpVerifications1722099496062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`otp_verifications\` (\`id\` varchar(36) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`is_email_verification\` tinyint NOT NULL, \`email\` varchar(255) NOT NULL, \`is_phone_number_verification\` tinyint NOT NULL, \`is_phone_number\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`otp_verifications\``);
    }

}
