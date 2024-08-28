import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const MONGOOSE_URL = process.env.MONGOOSE_URL;
    console.log('MONGOOSE_URL', MONGOOSE_URL);
    return MONGOOSE_URL;
  }
}
