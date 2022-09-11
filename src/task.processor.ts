import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { HttpService } from '@nestjs/axios';

@Processor(
  {
    name: 'taskqueue',
  },
  {
    concurrency: 10,
  },
)
export class TaskProcessor extends WorkerHost {
  constructor(private readonly httpService: HttpService) {
    super();
  }
  private readonly logger = new Logger(TaskProcessor.name);

  async process(job: Job): Promise<void> {
    try {
      this.logger.log(`process task job #${job.id}`);
      this.logger.log(job.data);
      const res = await this.httpService.axiosRef.post(
        job.data.webHookURL,
        job.data.payload,
      );
      console.log(res);
    } catch (error) {
      this.logger.error(error);
      // Retry for 5xx errors
      if (error?.response?.status >= 500) {
        throw error;
      }
    }
  }
}
