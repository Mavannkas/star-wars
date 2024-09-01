import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import mongoose from 'mongoose';
import { Character } from './entities/character.entity';

const id = new mongoose.Types.ObjectId();

const characterResponse = {} as Character;
describe('CharacterController', () => {
  let controller: CharacterController;
  let service: CharacterService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        {
          provide: CharacterService,
          useValue: {
            create: jest.fn(),
            search: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
    controller = module.get<CharacterController>(CharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call characterService.create with dto', async () => {
    // Given
    const dto = { name: 'Test', age: 20 } as CreateCharacterDto;
    const createResponse = new mongoose.Types.ObjectId();
    jest.spyOn(service, 'create').mockResolvedValue(createResponse);
    // When
    const response = await controller.create(dto);

    // Then
    expect(response).toEqual(createResponse);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call characterService.search with query', async () => {
    // Given
    const query = { name: 'Test', age: 20 } as any;
    const searchResponse = [characterResponse];
    jest.spyOn(service, 'search').mockResolvedValue([characterResponse]);

    // When
    const response = await controller.search(query);

    // Then
    expect(response).toEqual(searchResponse);
    expect(service.search).toHaveBeenCalledTimes(1);
    expect(service.search).toHaveBeenCalledWith(query);
  });

  it('should call characterService.findOne with id', async () => {
    // Given
    jest.spyOn(service, 'findOne').mockResolvedValue(characterResponse);

    // When
    const response = await controller.findOne(id);

    // Then
    expect(response).toEqual(characterResponse);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call characterService.update with id and dto', async () => {
    // Given
    const dto = { name: 'Test', age: 20 } as CreateCharacterDto;
    jest.spyOn(service, 'update').mockResolvedValue(characterResponse);

    // When
    const response = await controller.update(id, dto);

    // Then
    expect(response).toEqual(characterResponse);
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should call characterService.remove with id', async () => {
    // Given
    jest.spyOn(service, 'remove').mockResolvedValue(characterResponse as any);

    // When
    const response = await controller.remove(id);

    // Then
    expect(response).toEqual(characterResponse);
    expect(service.remove).toHaveBeenCalledTimes(1);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
