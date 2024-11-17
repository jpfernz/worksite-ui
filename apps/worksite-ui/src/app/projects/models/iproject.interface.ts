export enum ProjectStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  ON_HOLD = 'On Hold',
  DELAYED = 'Delayed',
}

export interface IProject {
  id?: string;
  title: string;
  description: string;
  projectManager: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
}
