import { Module } from '@nestjs/common';

import { EmailService } from './email.service';


@Module({
  imports: [],
  components: [EmailService],
  controllers: [],
  exports: [EmailService],
})
export class EmailModule {}
