import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.scss',
})
export class AddProjectComponent implements OnInit {
  projectForm!: FormGroup;

  private fb = inject(FormBuilder);
  private dataService = inject(ProjectsService);

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: [''],
      description: [''],
      projectManager: [''],
      status: [''],
    });
  }

  addProject() {
    if (!this.projectForm?.valid) {
      console.log(this.projectForm);
      return;
    }

    const newProject = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description,
      projectManager: this.projectForm.value.projectManager,
      status: this.projectForm.value.status,
    };

    // this.dataService.addProject(newProject);
  }
}
