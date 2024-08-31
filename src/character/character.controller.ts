import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { SearchCharactersDto } from './dto/search-characters.dto';
import { Types } from 'mongoose';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id/validate-object-id.pipe';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  search(@Query() query: SearchCharactersDto) {
    return this.characterService.search(query);
  }

  @Get(':id')
  findOne(@Param('id', ValidateObjectIdPipe) id: Types.ObjectId) {
    return this.characterService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.characterService.remove(id);
  }
}
