import { createFeature, createReducer, on, State } from '@ngrx/store';
import { IProject } from '../models/iproject.interface';
import { ProjectsActions } from './projects.actions';

interface ProjectsState {
  projects: IProject[];
  currentProject: IProject | null;
  isLoading: boolean;
  error: string | undefined;
}

const initialProjectsState: ProjectsState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: undefined,
};

const projectsFeature = createFeature({
  name: 'projects',
  reducer: createReducer(
    initialProjectsState,
    on(
      ProjectsActions.loadProjects,
      (state): ProjectsState => ({
        ...state,
        isLoading: true,
        error: undefined,
      })
    ),
    on(
      ProjectsActions.loadProjectsSuccess,
      (state, { projects }): ProjectsState => ({
        ...state,
        projects,
        isLoading: false,
        error: undefined,
      })
    ),
    on(
      ProjectsActions.loadProjectsFailure,
      (state, { error }): ProjectsState => ({
        ...state,
        isLoading: false,
        error,
      })
    )
  ),
});

export const {
  name: projectsFeatureKey,
  reducer: projectsReducer,
  selectProjects,
  selectError,
  selectIsLoading,
  selectCurrentProject,
} = projectsFeature;
