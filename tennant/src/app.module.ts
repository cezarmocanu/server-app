import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TennantModule } from './tennant/tennant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env' }),
    DatabaseModule,
    TennantModule,
  ],
})
export class AppModule {}
