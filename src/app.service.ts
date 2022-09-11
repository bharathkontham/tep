import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { Task } from './interfaces/task.interface';

@Injectable()
export class AppService {
  constructor(@InjectQueue('taskqueue') private taskQueue: Queue) {}
  getHello(): string {
    return 'Hello World!';
  }

  async addToQueue(taskContent: Task) {
    const taskOpts: any = {};
    if (taskContent.schedule) {
      if (taskContent?.schedule?.delay) {
        taskOpts.delay = taskContent.schedule.delay;
      } else if (
        taskContent?.schedule?.repeatable &&
        taskContent?.schedule?.cron
      ) {
        taskOpts.repeat = {
          cron: taskContent.schedule.cron,
        };
      }
    }
    const job = await this.taskQueue.add('task', taskContent, taskOpts);
    return job;
  }
}
