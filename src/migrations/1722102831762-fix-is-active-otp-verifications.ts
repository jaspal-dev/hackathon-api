import { MigrationInterface, QueryRunner } from "typeorm";

export class FixIsActiveOtpVerifications1722102831762 implements MigrationInterface {
    name = 'FixIsActiveOtpVerifications1722102831762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL`);
    }

}
