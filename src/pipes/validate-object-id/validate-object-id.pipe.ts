import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe
  implements PipeTransform<unknown, Types.ObjectId>
{
  transform(value: unknown) {
    if (typeof value !== 'string' || !Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return Types.ObjectId.createFromHexString(value);
  }
}
