import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedSeparateRightsToPermission1639603422813
  implements MigrationInterface
{
  name = 'addedSeparateRightsToPermission1639603422813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "rights"`);
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "canCreate" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "canRead" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "canUpdate" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "canDelete" boolean NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "canDelete"`);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "canUpdate"`);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "canRead"`);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "canCreate"`);
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "rights" character varying NOT NULL`,
    );
  }
}
