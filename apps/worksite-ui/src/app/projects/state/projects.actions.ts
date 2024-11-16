import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProject } from '../models/iproject.interface';

export const ProjectsActions = createActionGroup({
  source: 'Projects Actions',
  events: {
    'Load Projects': emptyProps(),
    'Load Projects Success': props<{ projects: IProject[] }>(),
    'Load Projects Failure': props<{ error: string }>(),
  },
});
