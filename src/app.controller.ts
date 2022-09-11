import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({
    status: 200,
    schema: {
      type: 'string',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/task')
  @ApiTags('Task')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
      },
      additionalProperties: true,
    },
  })
  async addTaskToQueue(@Body() content: any): Promise<any> {
    return this.appService.addToQueue(content);
  }
}
