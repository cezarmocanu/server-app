import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedServiceUUIDToPermissionCertificate1639602792752
  implements MigrationInterface
{
  name = 'addedServiceUUIDToPermissionCertificate1639602792752';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_certificate" ADD "serviceUUID" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_certificate" DROP COLUMN "serviceUUID"`,
    );
  }
}
