import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { SearchCharactersDto } from './dto/search-characters.dto';
import { Character } from './entities/character.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
  ) {}
  async create(createCharacterDto: CreateCharacterDto) {
    return 'This action adds a new character';
  }

  async search(query: SearchCharactersDto) {
    return `This action returns all character`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} character`;
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto) {
    return `This action updates a #${id} character`;
  }

  async remove(id: string) {
    return `This action removes a #${id} character`;
  }
}
