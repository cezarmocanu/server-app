import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { PermissionCertificateService } from './permission-certificate/permission-certificate.service';
import { PermissionCertificateModule } from './permission-certificate/permission-certificate.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env' }),
    AuthenticationModule,
    DatabaseModule,
    UserModule,
    PermissionCertificateModule,
    AuthorizationModule,
  ],
  providers: [PermissionCertificateService],
})
export class AppModule {}
