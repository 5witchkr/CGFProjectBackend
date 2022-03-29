import { Test, TestingModule } from '@nestjs/testing';
import { MailauthController } from './mailauth.controller';

describe('MailauthController', () => {
  let controller: MailauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailauthController],
    }).compile();

    controller = module.get<MailauthController>(MailauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
