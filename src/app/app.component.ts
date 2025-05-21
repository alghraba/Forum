import { Component } from '@angular/core';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projet_Forum';
  selectedProject: Project | null = null;

  onProjectSelected(project: Project) {
    this.selectedProject = project;
  }
}
