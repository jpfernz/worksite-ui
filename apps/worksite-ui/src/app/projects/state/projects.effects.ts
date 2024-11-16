import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '../services/projects.service';
import { inject } from '@angular/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { ProjectsActions } from './projects.actions';

export const loadProjects = createEffect(
  (action$ = inject(Actions), projectsService = inject(ProjectsService)) => {
    return action$.pipe(
      ofType(ProjectsActions.loadProjects),
      switchMap(() => {
        return projectsService.getProjects().pipe(
          map((projects) => {
            return ProjectsActions.loadProjectsSuccess({ projects });
          }),
          catchError((error) => {
            return of(ProjectsActions.loadProjectsFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
