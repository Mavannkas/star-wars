import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Injectable()
export class CharacterService {
  async create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  async search() {
    return `This action returns all character`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  async remove(id: number) {
    return `This action removes a #${id} character`;
  }
}
