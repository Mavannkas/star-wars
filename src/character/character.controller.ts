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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Character } from './entities/character.entity';

@ApiTags('character')
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
@ApiExtraModels(Character)
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a character' })
  @ApiCreatedResponse()
  create(
    @Body() createCharacterDto: CreateCharacterDto,
  ): Promise<Types.ObjectId> {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search characters with pagination' })
  @ApiOkResponse({
    type: [Character],
    description: 'List of characters',
  })
  search(@Query() query: SearchCharactersDto): Promise<Character[]> {
    
    return this.characterService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a character by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the character' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  findOne(
    @Param('id', ValidateObjectIdPipe) id: Types.ObjectId,
  ): Promise<Character> {
    return this.characterService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a character' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the character' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character> {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a character' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the character' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  remove(@Param('id', ValidateObjectIdPipe) id: string): Promise<Character> {
    return this.characterService.remove(id);
  }
}
