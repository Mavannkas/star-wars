import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { getModelToken } from '@nestjs/mongoose';
import { Character } from './entities/character.entity';
import mongoose, { Model, Types } from 'mongoose';

const dummyCharacter: Character & { _id: Types.ObjectId } = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Test',
  episodes: ['1', '2'],
  planet: 'Earth',
};

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
    const query = { name: 'Test' } as any;
    const findSpy = jest.spyOn(model, 'find');
    const expectedQuery = { ...query, page: 1, limit: 10 };

    // When
    const response = await service.search(query);

    // Then
    expect(response).toEqual([dummyCharacter]);
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(expectedQuery);
  });
  it('should find character by id', async () => {
    // Given
    const id = '1';
    const findByIdSpy = jest.spyOn(model, 'findById');

    // When
    const response = await service.findOne(id);

    // Then
    expect(response).toEqual(dummyCharacter);
    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(id);
  });
  it('should update character by id', async () => {
    // Given
    const id = '1';
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
    const id = '1';
    const findByIdAndDeleteSpy = jest.spyOn(model, 'findByIdAndDelete');

    // When
    const response = await service.remove(id);

    // Then
    expect(response).toEqual(dummyCharacter);
    expect(findByIdAndDeleteSpy).toHaveBeenCalledTimes(1);
    expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(id);
  });
});
