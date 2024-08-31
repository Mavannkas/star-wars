import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { SearchCharactersDto } from './dto/search-characters.dto';
import { Character } from './entities/character.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<Character>,
  ) {}

  async create(
    createCharacterDto: CreateCharacterDto,
  ): Promise<Types.ObjectId> {
    const character = await this.characterModel.create(createCharacterDto);

    return character._id;
  }

  async search(query: SearchCharactersDto): Promise<Character[]> {
    const { limit = 10, page = 1, ...rest } = query;
    const skip = (page - 1) * limit;
    return this.characterModel.find(rest).limit(limit).skip(skip);
  }

  async findOne(id: Types.ObjectId): Promise<Character> {
    return this.characterModel.findById(id);
  }

  async update(
    id: string,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    return this.characterModel.findByIdAndUpdate(id, updateCharacterDto);
  }

  async remove(id: string) {
    return this.characterModel.findByIdAndDelete(id);
  }
}
