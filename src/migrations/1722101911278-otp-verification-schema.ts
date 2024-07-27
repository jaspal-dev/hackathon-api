import { MigrationInterface, QueryRunner } from "typeorm";

export class OtpVerificationSchema1722101911278 implements MigrationInterface {
    name = 'OtpVerificationSchema1722101911278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD \`otp\` char(6) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD \`email\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD \`phone_number\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD CONSTRAINT \`FK_fec02639ae24944c2122230ae4c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP FOREIGN KEY \`FK_fec02639ae24944c2122230ae4c\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD \`phone_number\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP COLUMN \`otp\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD \`user_id\` varchar(255) NOT NULL`);
    }

}
