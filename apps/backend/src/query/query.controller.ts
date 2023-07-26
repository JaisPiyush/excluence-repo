import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { QueryService } from './query.service';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';
import { ParcelQLQuery } from 'parcelQL';
import { ParcelQLExceptionFilter } from './pacelQL-exception.filter';

@UseFilters(ParcelQLExceptionFilter)
@UseGuards(ThrottlerGuard)
@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @SkipThrottle(true)
  @Post('preview')
  async previewQuery(@Body() query: ParcelQLQuery) {
    const sql = this.queryService.getRawQuery(query);
    return { data: sql };
  }
}
