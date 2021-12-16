import { MigrationInterface, QueryRunner } from 'typeorm';

export class createdPermissionEntity1639602049002
  implements MigrationInterface
{
  name = 'createdPermissionEntity1639602049002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" SERIAL NOT NULL, "permissionCertificateId" integer, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_da31d069fd9a0b156e62c2fe0a3" FOREIGN KEY ("permissionCertificateId") REFERENCES "permission_certificate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "FK_da31d069fd9a0b156e62c2fe0a3"`,
    );
    await queryRunner.query(`DROP TABLE "permission"`);
  }
}
