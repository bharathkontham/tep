import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
@Processor(
  {
    name: 'taskqueue',
  },
  {
    concurrency: 10,
  },
)
export class TaskProcessor extends WorkerHost {
  constructor() {
    super();
  }
  private readonly logger = new Logger(TaskProcessor.name);

  async process(job: Job): Promise<void> {
    this.logger.log(`process task job #${job.id}`);
    await this.logger.log(job.data);
  }
}
