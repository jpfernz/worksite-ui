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
    on(ProjectsActions.loadProjects, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(ProjectsActions.loadProjectsSuccess, (state, { projects }) => ({
      ...state,
      projects: projects,
      isLoading: false,
    })),
    on(ProjectsActions.loadProjectsFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
    on(ProjectsActions.addProject, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(ProjectsActions.addProjectSuccess, (state, { project }) => ({
      ...state,
      projects: [...state.projects, project],
      isLoading: false,
    })),
    on(ProjectsActions.addProjectFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
    on(ProjectsActions.selectProject, (state, { project }) => ({
      ...state,
      currentProject: project,
    })),
    on(ProjectsActions.deleteProject, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(ProjectsActions.deleteProjectSuccess, (state, { successMessage }) => ({
      ...state,
      projects: state.projects.filter((p) => p.id !== state.currentProject?.id),
      successMessage,
      isLoading: false,
    })),
    on(ProjectsActions.deleteProjectFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    }))
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
