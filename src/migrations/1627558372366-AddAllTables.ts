import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAllTables1627558372366 implements MigrationInterface {
    name = 'AddAllTables1627558372366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "banners" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "uuid" character varying NOT NULL, "bannerLink" character varying NOT NULL, "bannerImg" character varying, CONSTRAINT "PK_dc9d39781c5259bf39f5b352e67" PRIMARY KEY ("id", "uuid"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "profession" character varying NOT NULL, "imageUrn" character varying, "uuid" character varying NOT NULL, "clinicId" integer, CONSTRAINT "UQ_2da4989a8f0476d231e4c4419aa" UNIQUE ("uuid"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('clinic', 'admin')`);
        await queryRunner.query(`CREATE TYPE "users_status_enum" AS ENUM('rejected', 'approved', 'in_process')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clinicName" character varying NOT NULL, "email" character varying NOT NULL, "mobile" character varying NOT NULL, "address" character varying NOT NULL, "password" character varying NOT NULL, "identifier" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'clinic', "status" "users_status_enum" NOT NULL DEFAULT 'in_process', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_2e7b7debda55e0e7280dc93663d" UNIQUE ("identifier"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "votes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "value" integer NOT NULL, "ip_address" character varying NOT NULL, "clinicId" integer, CONSTRAINT "PK_f3d9fd4a0af865152c3f59db8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinics" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" text DEFAULT '', "logoUrn" character varying, "imageUrn" character varying, "transparency" integer, "availability" integer, "safety" integer, "star" integer NOT NULL DEFAULT '0', "userId" integer, CONSTRAINT "REL_9eff70f9557eeb21cb42be5605" UNIQUE ("userId"), CONSTRAINT "PK_5513b659e4d12b01a8ab3956abc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "uuid" character varying NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_b4673fd6c26ec3fd32141e30eb5" PRIMARY KEY ("id", "uuid"))`);
        await queryRunner.query(`CREATE TABLE "emails" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, CONSTRAINT "UQ_3cbf51004f0706ac67ff8c22dbf" UNIQUE ("email"), CONSTRAINT "PK_a54dcebef8d05dca7e839749571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mails" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "subject" character varying NOT NULL, "body" character varying NOT NULL, CONSTRAINT "PK_218248d7dfe1b739f06e2309349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orglinks" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationLink" character varying NOT NULL, "organizationLinkName" character varying NOT NULL, "uuid" character varying NOT NULL, CONSTRAINT "PK_5148ef092ec0bbff3be4ffb0ce3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "body" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partners" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationLink" character varying, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "description" character varying NOT NULL, "imageUrn" character varying, "uuid" character varying NOT NULL, "partnerLink" character varying, CONSTRAINT "UQ_189b05b18cdd50ab216ba7138b0" UNIQUE ("uuid"), CONSTRAINT "PK_998645b20820e4ab99aeae03b41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "standarts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "standart" character varying NOT NULL, CONSTRAINT "UQ_5f5e26e5cb5a1906439d53e3d59" UNIQUE ("standart"), CONSTRAINT "PK_55570196acbd36dac9a93a7f2e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories_clinics_clinics" ("categoriesId" integer NOT NULL, "categoriesUuid" character varying NOT NULL, "clinicsId" integer NOT NULL, CONSTRAINT "PK_e843e25143dd3145b4d42032577" PRIMARY KEY ("categoriesId", "categoriesUuid", "clinicsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b90af62d0cbd32bf6b6660c985" ON "categories_clinics_clinics" ("categoriesId", "categoriesUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_70ad7bc09ebf5f1c44f924dab7" ON "categories_clinics_clinics" ("clinicsId") `);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_8f8d60806c34879c9d371cb425b" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "votes" ADD CONSTRAINT "FK_1461c0ab9b6081474ad1f18a93e" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinics" ADD CONSTRAINT "FK_9eff70f9557eeb21cb42be56051" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_clinics_clinics" ADD CONSTRAINT "FK_b90af62d0cbd32bf6b6660c985e" FOREIGN KEY ("categoriesId", "categoriesUuid") REFERENCES "categories"("id","uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_clinics_clinics" ADD CONSTRAINT "FK_70ad7bc09ebf5f1c44f924dab74" FOREIGN KEY ("clinicsId") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_clinics_clinics" DROP CONSTRAINT "FK_70ad7bc09ebf5f1c44f924dab74"`);
        await queryRunner.query(`ALTER TABLE "categories_clinics_clinics" DROP CONSTRAINT "FK_b90af62d0cbd32bf6b6660c985e"`);
        await queryRunner.query(`ALTER TABLE "clinics" DROP CONSTRAINT "FK_9eff70f9557eeb21cb42be56051"`);
        await queryRunner.query(`ALTER TABLE "votes" DROP CONSTRAINT "FK_1461c0ab9b6081474ad1f18a93e"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_8f8d60806c34879c9d371cb425b"`);
        await queryRunner.query(`DROP INDEX "IDX_70ad7bc09ebf5f1c44f924dab7"`);
        await queryRunner.query(`DROP INDEX "IDX_b90af62d0cbd32bf6b6660c985"`);
        await queryRunner.query(`DROP TABLE "categories_clinics_clinics"`);
        await queryRunner.query(`DROP TABLE "standarts"`);
        await queryRunner.query(`DROP TABLE "partners"`);
        await queryRunner.query(`DROP TABLE "pages"`);
        await queryRunner.query(`DROP TABLE "orglinks"`);
        await queryRunner.query(`DROP TABLE "mails"`);
        await queryRunner.query(`DROP TABLE "emails"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "clinics"`);
        await queryRunner.query(`DROP TABLE "votes"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_status_enum"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "banners"`);
    }

}
