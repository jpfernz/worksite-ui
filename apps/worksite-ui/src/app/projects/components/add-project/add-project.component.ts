import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectStatus } from '../../models/iproject.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { Store } from '@ngrx/store';
import { ProjectsActions } from '../../state/projects.actions';

interface StatusOption {
  key: ProjectStatus;
  value: string;
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProjectComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<AddProjectComponent>);
  private store = inject(Store);
  projectForm!: FormGroup;

  projectStatuses: StatusOption[] = Object.entries(ProjectStatus).map(
    ([key, value]) => ({
      key: key as ProjectStatus,
      value: value,
    })
  );

  selectedStatus = '';

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  private fb = inject(FormBuilder);
  ngOnInit() {
    this.projectForm = this.fb.group({
      title: [''],
      description: [''],
      projectManager: [''],
      status: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    const newProject = {
      title: this.projectForm.value.title,
      description: this.projectForm.value.description,
      projectManager: this.projectForm.value.projectManager,
      status: this.projectForm.value.status,
      startDate: this.projectForm.value.startDate,
      endDate: this.projectForm.value.endDate,
    };

    this.store.dispatch(ProjectsActions.addProject({ project: newProject }));

    this.dialogRef.close();
    // this.dataService.addProject(newProject);
  }
}
