import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Output() projectSelected = new EventEmitter<Project>();
  projects: Project[] = [];
  newProject: Project = { name: '', description: '' };
  error: string | null = null;
  loading = true;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = null;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = 'Erreur lors du chargement des projets';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  selectProject(project: Project): void {
    if (project.id !== undefined) {
      this.projectSelected.emit(project);
    }
  }

  addProject(): void {
    if (!this.newProject.name.trim()) {
      this.error = 'Le nom du projet est requis';
      return;
    }

    this.projectService.addProject(this.newProject).subscribe({
      next: (project: Project) => {
        this.projects.push(project);
        this.newProject = { name: '', description: '' };
        this.error = null;
      },
      error: (err: Error) => {
        this.error = 'Erreur lors de l\'ajout du projet';
        console.error('Erreur:', err);
      }
    });
  }
}
