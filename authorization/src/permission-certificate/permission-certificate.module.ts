import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/permission/permission.entity';
import { PermissionCertificate } from './permission-certificate.entity';
import { PermissionCertificateService } from './permission-certificate.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionCertificate, Permission])],
  providers: [PermissionCertificateService],
  exports: [PermissionCertificateService],
})
export class PermissionCertificateModule {}
