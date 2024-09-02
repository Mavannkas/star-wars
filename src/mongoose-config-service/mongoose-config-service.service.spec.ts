import { Test, TestingModule } from '@nestjs/testing';
import { MongooseConfigServiceService } from './mongoose-config-service.service';

describe('MongooseConfigServiceService', () => {
  let service: MongooseConfigServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseConfigServiceService],
    }).compile();

    service = module.get<MongooseConfigServiceService>(
      MongooseConfigServiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
