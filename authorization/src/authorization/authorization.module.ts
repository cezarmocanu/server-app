import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionCertificate } from 'src/permission-certificate/permission-certificate.entity';
import { Permission } from 'src/permission/permission.entity';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

@Module({
  //TODO move permission and cert related to permissions service/module
  imports:[TypeOrmModule.forFeature([PermissionCertificate, Permission])],
  controllers: [AuthorizationController],
  providers: [AuthorizationService]
})
export class AuthorizationModule {}
