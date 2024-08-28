import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';

describe('CharacterController', () => {
  let controller: CharacterController;
  let service: CharacterService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [CharacterService],
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
    const createResponse = 'This action adds a new character';
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
    const searchResponse = 'This action returns all character';
    jest.spyOn(service, 'search').mockResolvedValue(searchResponse);

    // When
    const response = await controller.search(query);

    // Then
    expect(response).toEqual(searchResponse);
    expect(service.search).toHaveBeenCalledTimes(1);
    expect(service.search).toHaveBeenCalledWith(query);
  });

  it('should call characterService.findOne with id', async () => {
    // Given
    const id = '1';
    const findOneResponse = 'This action returns a #1 character';
    jest.spyOn(service, 'findOne').mockResolvedValue(findOneResponse);

    // When
    const response = await controller.findOne(id);

    // Then
    expect(response).toEqual(findOneResponse);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call characterService.update with id and dto', async () => {
    // Given
    const id = '1';
    const dto = { name: 'Test', age: 20 } as CreateCharacterDto;
    const updateResponse = 'This action updates a #1 character';
    jest.spyOn(service, 'update').mockResolvedValue(updateResponse);

    // When
    const response = await controller.update(id, dto);

    // Then
    expect(response).toEqual(updateResponse);
    expect(service.update).toHaveBeenCalledTimes(1);
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('should call characterService.remove with id', async () => {
    // Given
    const id = '1';
    const removeResponse = 'This action removes a #1 character';
    jest.spyOn(service, 'remove').mockResolvedValue(removeResponse);

    // When
    const response = await controller.remove(id);

    // Then
    expect(response).toEqual(removeResponse);
    expect(service.remove).toHaveBeenCalledTimes(1);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
