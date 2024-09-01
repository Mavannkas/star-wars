import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { limit = 10, page = 1, episode, ...rest } = query;
    console.log(rest);
    const filter: any = { ...rest };

    if (episode) {
      filter.episodes = { $in: [episode] };
    }

    const skip = (+page - 1) * +limit;
    return this.characterModel.find(filter).limit(+limit).skip(skip);
  }

  async findOne(id: Types.ObjectId): Promise<Character> {
    const character = await this.characterModel.findById(id);
    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return character;
  }

  async update(
    id: Types.ObjectId,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    const character = await this.characterModel.findByIdAndUpdate(
      id,
      updateCharacterDto,
    );
    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return character;
  }

  async remove(id: Types.ObjectId) {
    const character = await this.characterModel.findByIdAndDelete(id);
    if (!character) {
      throw new NotFoundException('Character not found');
    }

    return character;
  }
}
