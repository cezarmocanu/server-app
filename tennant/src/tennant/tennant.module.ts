import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tennant } from './tennant.entity';
import { TennantService } from './tennant.service';
import { TennantController } from './tennant.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Tennant]), HttpModule],
  providers: [TennantService],
  exports: [TennantService],
  controllers: [TennantController],
})
export class TennantModule {}
