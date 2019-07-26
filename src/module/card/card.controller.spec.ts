import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from './card.controller';
import { CardProviders } from './card.service.spec';

describe('Card Controller', () => {
  let controller: CardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: CardProviders,
    }).compile();

    controller = module.get<CardController>(CardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
