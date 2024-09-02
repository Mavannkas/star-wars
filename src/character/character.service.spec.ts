import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { getModelToken } from '@nestjs/mongoose';
import { Character } from './entities/character.entity';
import mongoose, { Model, Types } from 'mongoose';
import { SearchCharactersDto } from './dto/search-characters.dto';

const dummyCharacter: Character & { _id: Types.ObjectId } = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Test',
  episodes: ['1', '2'],
  planet: 'Earth',
};

const id = new mongoose.Types.ObjectId();

describe('CharacterService', () => {
  let service: CharacterService;
  let model: Model<Character>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: getModelToken('Character'),
          useValue: {
            new: jest.fn().mockResolvedValue(dummyCharacter),
            constructor: jest.fn().mockResolvedValue(dummyCharacter),
            create: jest.fn().mockResolvedValue(dummyCharacter),
            findByIdAndUpdate: jest.fn().mockResolvedValue(dummyCharacter),
            findByIdAndDelete: jest.fn().mockResolvedValue(dummyCharacter),
            find: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
    model = module.get(getModelToken('Character'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new character based on dto and return id', async () => {
    // Given
    const dto = { name: 'Test' } as Character;
    const createSpy = jest.spyOn(model, 'create');

    // When
    const response = await service.create(dto);

    // Then
    expect(response).toEqual(dummyCharacter._id);
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(dto);
  });

  it('should search character based on query', async () => {
    // Given
    const skipMock = jest.fn().mockResolvedValue([dummyCharacter]);
    const limitMock = jest.fn().mockReturnValue({
      skip: skipMock,
    });
    model.find = jest.fn().mockReturnValue({
      limit: limitMock,
    });
    const query = {
      limit: '10',
      page: '4',
      episode: 'episode1',
      name: 'Luke',
    } as SearchCharactersDto;

    const expectedFilter = {
      name: 'Luke',
      episodes: { $in: ['episode1'] },
    };

    // When
    const response = await service.search(query);

    // Then
    expect(response).toEqual([dummyCharacter]);
    expect(model.find).toHaveBeenCalledTimes(1);
    expect(model.find).toHaveBeenCalledWith(expectedFilter);
    expect(limitMock).toHaveBeenCalledWith(10);
    expect(skipMock).toHaveBeenCalledWith(30);
  });
  it('should find character by id', async () => {
    // Given
    const findByIdSpy = jest
      .spyOn(model, 'findById')
      .mockResolvedValue(dummyCharacter);

    // When
    const response = await service.findOne(id);

    // Then
    expect(response).toEqual(dummyCharacter);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(id);
  });
  it('should update character by id', async () => {
    // Given
    const dto = { name: 'Test' } as Character;
    const findByIdAndUpdateSpy = jest.spyOn(model, 'findByIdAndUpdate');

    // When
    const response = await service.update(id, dto);

    // Then
    expect(response).toEqual(dummyCharacter);
    expect(findByIdAndUpdateSpy).toHaveBeenCalledTimes(1);
    expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(id, dto);
  });
  it('should remove character by id', async () => {
    // Given
    const findByIdAndDeleteSpy = jest.spyOn(model, 'findByIdAndDelete');

    // When
    const response = await service.remove(id);

    // Then
    expect(response).toEqual(dummyCharacter);
    expect(findByIdAndDeleteSpy).toHaveBeenCalledTimes(1);
    expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(id);
  });

  it('should throw not found exception when character not found for findById', async () => {
    // Given
    jest.spyOn(model, 'findById').mockResolvedValue(null);

    // When & Then
    expect(service.findOne(id)).rejects.toThrow('Character not found');
  });

  it('should throw not found exception when character not found for Update', async () => {
    // Given
    jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(null);

    // When & Then
    expect(service.update(id, {} as Character)).rejects.toThrow(
      'Character not found',
    );
  });

  it('should throw not found exception when character not found for Delete', async () => {
    // Given
    jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(null);

    // When & Then
    expect(service.remove(id)).rejects.toThrow('Character not found');
  });
});
