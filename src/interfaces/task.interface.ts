interface TaskSchedule {
  repeatable: boolean;
  delay?: number;
  cron?: string;
}

export interface Task {
  name: string;
  webHookURL: string;
  payload: any;
  schedule?: TaskSchedule;
}
