import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  constructor(@InjectQueue('taskqueue') private taskQueue: Queue) {}
  getHello(): string {
    return 'Hello World!';
  }

  async addToQueue(content: any) {
    const job = await this.taskQueue.add('task', content);
    return job;
  }
}
