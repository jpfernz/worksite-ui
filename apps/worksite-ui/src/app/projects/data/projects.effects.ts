import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectsService } from './projects.service';
import { inject } from '@angular/core';
import { map, catchError, of, exhaustMap, concatMap, tap } from 'rxjs';
import { ProjectsActions } from './projects.actions';
import { NotificationService } from '../../shared/services/notification.service';

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
  (
    action$ = inject(Actions),
    projectsService = inject(ProjectsService),
    notificationService = inject(NotificationService)
  ) => {
    return action$.pipe(
      ofType(ProjectsActions.addProject),
      exhaustMap(({ project }) =>
        projectsService.addProject(project).pipe(
          map((project) => {
            notificationService.showSuccess('Project added successfully');
            return ProjectsActions.addProjectSuccess({ project });
          }),
          catchError((error) => {
            notificationService.showError('Failed to add project');
            return of(ProjectsActions.addProjectFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteProject = createEffect(
  (
    action$ = inject(Actions),
    projectsService = inject(ProjectsService),
    notificationService = inject(NotificationService)
  ) => {
    return action$.pipe(
      ofType(ProjectsActions.deleteProject),
      concatMap(({ projectId }) =>
        projectsService.deleteProject(projectId).pipe(
          map(() => {
            notificationService.showSuccess('Project deleted successfully');
            return ProjectsActions.deleteProjectSuccess({
              projectId,
              successMessage: 'Project deleted successfully',
            });
          }),
          catchError((error) => {
            notificationService.showError('Failed to delete project');
            return of(ProjectsActions.deleteProjectFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);
