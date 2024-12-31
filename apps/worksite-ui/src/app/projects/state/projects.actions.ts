import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProject } from '../models/iproject.interface';

export const ProjectsActions = createActionGroup({
  source: 'Projects Actions',
  events: {
    'Load Projects': emptyProps(),
    'Load Projects Success': props<{ projects: IProject[] }>(),
    'Load Projects Failure': props<{ error: string }>(),
    'Add Project': props<{ project: IProject }>(),
    'Add Project Success': props<{ project: IProject }>(),
    'Add Project Failure': props<{ error: string }>(),
    'Select Project': props<{ project: IProject }>(),
    'Delete Project': props<{ projectId: number }>(),
    'Delete Project Success': props<{
      projectId: number;
      successMessage: string;
    }>(),
    'Delete Project Failure': props<{ error: string }>(),
  },
});
