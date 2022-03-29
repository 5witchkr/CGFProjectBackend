import { Test, TestingModule } from '@nestjs/testing';
import { MailAuthController } from './mailauth.controller';

describe('MailAuthController', () => {
  let controller: MailAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailAuthController],
    }).compile();

    controller = module.get<MailAuthController>(MailAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
