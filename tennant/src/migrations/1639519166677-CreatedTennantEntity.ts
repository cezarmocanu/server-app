import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedTennantEntity1639519166677 implements MigrationInterface {
  name = 'CreatedTennantEntity1639519166677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tennant" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "parentId" integer, CONSTRAINT "PK_8197fcdb505200cdd913451c305" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tennant" ADD CONSTRAINT "FK_4c74cab043072125dba9ef66559" FOREIGN KEY ("parentId") REFERENCES "tennant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tennant" DROP CONSTRAINT "FK_4c74cab043072125dba9ef66559"`,
    );
    await queryRunner.query(`DROP TABLE "tennant"`);
  }
}
