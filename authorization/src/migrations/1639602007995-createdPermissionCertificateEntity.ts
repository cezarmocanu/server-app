import { MigrationInterface, QueryRunner } from 'typeorm';

export class createdPermissionCertificateEntity1639602007995
  implements MigrationInterface
{
  name = 'createdPermissionCertificateEntity1639602007995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permission_certificate" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "PK_4783a0f0ab558d60e193b514729" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission_certificate" ADD CONSTRAINT "FK_a4f63302748374b47f0bbaa0a31" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission_certificate" DROP CONSTRAINT "FK_a4f63302748374b47f0bbaa0a31"`,
    );
    await queryRunner.query(`DROP TABLE "permission_certificate"`);
  }
}
