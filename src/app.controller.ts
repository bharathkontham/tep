import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Task } from './interfaces/task.interface';

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
        name: {
          type: 'string',
        },
        webHookURL: {
          type: 'string',
        },
        payload: {
          type: 'object',
          properties: {},
          additionalProperties: true,
        },
        schedule: {
          type: 'object',
          properties: {
            repeatable: {
              type: 'boolean',
            },
            delay: {
              type: 'number',
            },
            cron: {
              type: 'string',
            },
          },
        },
      },
      additionalProperties: false,
    },
  })
  async addTaskToQueue(@Body() taskContent: Task): Promise<any> {
    return this.appService.addToQueue(taskContent);
  }
}
