import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedResourceAndRightsToPermission1639602670678
  implements MigrationInterface
{
  name = 'addedResourceAndRightsToPermission1639602670678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "resource" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "rights" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "rights"`);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "resource"`);
  }
}
