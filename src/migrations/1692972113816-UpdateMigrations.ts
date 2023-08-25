import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMigrations1692972113816 implements MigrationInterface {
    name = 'UpdateMigrations1692972113816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`CREATE TABLE "like" ("id" SERIAL NOT NULL, "userId" integer, "postId" integer, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL, "authorId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment_like" ("id" SERIAL NOT NULL, "userId" integer, "commentId" integer, CONSTRAINT "PK_04f93e6f1ace5dbc1d8c562ccbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "authorId" integer`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "postId" integer`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD CONSTRAINT "FK_b5a2fc7a9a2b6bcc8c74f6fbb8b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_like" ADD CONSTRAINT "FK_a253dba95eab8659c027bbace44" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_like" DROP CONSTRAINT "FK_a253dba95eab8659c027bbace44"`);
        await queryRunner.query(`ALTER TABLE "comment_like" DROP CONSTRAINT "FK_b5a2fc7a9a2b6bcc8c74f6fbb8b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_3acf7c55c319c4000e8056c1279"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_e8fb739f08d47955a39850fac23"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "postId"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "authorId"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "userId" integer`);
        await queryRunner.query(`DROP TABLE "comment_like"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
