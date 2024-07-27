import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEmailOtpVerifications1722100520195 implements MigrationInterface {
    name = 'FixEmailOtpVerifications1722100520195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP COLUMN \`is_phone_number\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD \`phone_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` CHANGE \`is_email_verification\` \`is_email_verification\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` CHANGE \`is_phone_number_verification\` \`is_phone_number_verification\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` CHANGE \`is_phone_number_verification\` \`is_phone_number_verification\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` CHANGE \`is_email_verification\` \`is_email_verification\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD \`is_phone_number\` varchar(255) NOT NULL`);
    }

}
