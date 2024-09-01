import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class AlignWithClassInterceptor<T> implements NestInterceptor {
  constructor(private readonly classType: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(this.toPlainClass.bind(this));
        }

        return this.toPlainClass(data);
      }),
    );
  }

  private toPlainClass(data: any): T {
    if (typeof data?.toObject === 'function') {
      data = data.toObject();
    }
    return plainToClass(this.classType, data);
  }
}
