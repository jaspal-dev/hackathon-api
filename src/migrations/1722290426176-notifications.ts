import { MigrationInterface, QueryRunner } from "typeorm";

export class Notifications1722290426176 implements MigrationInterface {
    name = 'Notifications1722290426176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`otp_verifications\` (\`id\` varchar(36) NOT NULL, \`is_email_verification\` tinyint NOT NULL DEFAULT 0, \`email\` varchar(50) NULL, \`is_phone_number_verification\` tinyint NOT NULL DEFAULT 0, \`phone_number\` varchar(20) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`otp\` char(6) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`email\` varchar(50) NOT NULL, \`is_email_verified\` tinyint NOT NULL DEFAULT 0, \`email_verified_at\` datetime NULL, \`country_code\` varchar(5) NOT NULL, \`phone_number\` varchar(20) NOT NULL, \`is_phone_number_verified\` tinyint NOT NULL DEFAULT 0, \`phone_number_verified_at\` datetime NULL, \`preferred_language\` enum ('HINDI', 'ENGLISH') NOT NULL DEFAULT 'ENGLISH', \`password\` varchar(50) NOT NULL, \`session_id\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`flights\` (\`id\` int NOT NULL AUTO_INCREMENT, \`airline\` varchar(25) NOT NULL, \`departure_gate\` varchar(4) NOT NULL, \`arrival_gate\` varchar(4) NOT NULL, \`scheduled_departure\` datetime NOT NULL, \`scheduled_arrival\` datetime NOT NULL, \`actual_departure\` datetime NULL, \`actual_arrival\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`passengers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`flight_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`flightId\` int NULL, \`message\` text NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`method\` varchar(255) NOT NULL, \`recipient\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` ADD CONSTRAINT \`FK_c7f1d281e1acc51e2a37889f5a9\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`passengers\` ADD CONSTRAINT \`FK_9313cc51b9f96cb58bc20463993\` FOREIGN KEY (\`flight_id\`) REFERENCES \`flights\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`passengers\` DROP FOREIGN KEY \`FK_9313cc51b9f96cb58bc20463993\``);
        await queryRunner.query(`ALTER TABLE \`otp_verifications\` DROP FOREIGN KEY \`FK_c7f1d281e1acc51e2a37889f5a9\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
        await queryRunner.query(`DROP TABLE \`passengers\``);
        await queryRunner.query(`DROP TABLE \`flights\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`otp_verifications\``);
    }

}
