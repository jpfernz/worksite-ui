import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from '../services/projects.service';
import { inject } from '@angular/core';
import { map, catchError, of, exhaustMap, concatMap } from 'rxjs';
import { ProjectsActions } from './projects.actions';

export const loadProjects = createEffect(
  (action$ = inject(Actions), projectsService = inject(ProjectsService)) => {
    return action$.pipe(
      ofType(ProjectsActions.loadProjects),
      exhaustMap(() =>
        projectsService.getProjects().pipe(
          map((projects) => ProjectsActions.loadProjectsSuccess({ projects })),
          catchError((error) =>
            of(ProjectsActions.loadProjectsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const addProject = createEffect(
  (action$ = inject(Actions), projectsService = inject(ProjectsService)) => {
    return action$.pipe(
      ofType(ProjectsActions.addProject),
      exhaustMap(({ project }) =>
        projectsService.addProject(project).pipe(
          map((project) => ProjectsActions.addProjectSuccess({ project })),
          catchError((error) =>
            of(ProjectsActions.addProjectFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const deleteProject = createEffect(
  (action$ = inject(Actions), projectsService = inject(ProjectsService)) => {
    return action$.pipe(
      ofType(ProjectsActions.deleteProject),
      concatMap(({ projectId }) =>
        projectsService.deleteProject(projectId).pipe(
          map(() =>
            ProjectsActions.deleteProjectSuccess({
              projectId,
              successMessage: 'Project deleted successfully',
            })
          ),
          catchError((error) =>
            of(ProjectsActions.deleteProjectFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
