import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tennant } from './tennant.entity';

@Injectable()
export class TennantService {
  constructor(
    @InjectRepository(Tennant)
    private tennantRepo: Repository<Tennant>,
  ) {}

  async saveParentTennant(tennant: Tennant) {}

  async saveChildTennant(tennant: Tennant, parent: Tennant) {}

  async findParrentTennant(tennant: Tennant) {}

  async findChildrenTennant(tennant: Tennant) {}
}
