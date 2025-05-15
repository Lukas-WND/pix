import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      // console.log('values: ', value);
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      // console.log('errors: ', error);
      throw new BadRequestException(`Validação falhou: ${error}`);
    }
  }
}
