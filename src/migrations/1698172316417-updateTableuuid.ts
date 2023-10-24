import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableuuid1698172316417 implements MigrationInterface {
    name = 'UpdateTableuuid1698172316417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_3acf7c55c319c4000e8056c1279"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159"`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "like" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "like" ADD "postId" uuid`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comment_like" DROP CONSTRAINT "FK_a253dba95eab8659c027bbace44"`);
        await queryRunner.query(`ALTER TABLE "comment_like" DROP CONSTRAINT "PK_04f93e6f1ace5dbc1d8c562ccbf"`);
        await queryRunner.query(`ALTER TABLE "comment_like" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD CONSTRAINT "PK_04f93e6f1ace5dbc1d8c562ccbf" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comment_like" DROP COLUMN "commentId"`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD "commentId" uuid`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "postId" uuid`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD CONSTRAINT "FK_a253dba95eab8659c027bbace44" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment_like" DROP CONSTRAINT "FK_a253dba95eab8659c027bbace44"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_3acf7c55c319c4000e8056c1279"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "postId" integer`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comment_like" DROP COLUMN "commentId"`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD "commentId" integer`);
        await queryRunner.query(`ALTER TABLE "comment_like" DROP CONSTRAINT "PK_04f93e6f1ace5dbc1d8c562ccbf"`);
        await queryRunner.query(`ALTER TABLE "comment_like" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD CONSTRAINT "PK_04f93e6f1ace5dbc1d8c562ccbf" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD CONSTRAINT "FK_a253dba95eab8659c027bbace44" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "like" ADD "postId" integer`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159"`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "like" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
