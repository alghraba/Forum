import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Project } from '../../../models/project.model';
import { PostService } from '../../../services/post.service';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  newPost: Post = {
    id: 0,
    title: '',
    content: '',
    project: { id: 0 }
  };
  projects: Project[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private postService: PostService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
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

  onSubmit(): void {
    if (!this.newPost.title.trim() || !this.newPost.content.trim()) {
      this.error = 'Le titre et le contenu sont requis';
      return;
    }

    if (!this.newPost.project.id) {
      this.error = 'Veuillez sélectionner un projet';
      return;
    }

    this.loading = true;
    this.error = null;

    this.postService.addPost(this.newPost).subscribe({
      next: (post: Post) => {
        this.newPost = {
          id: 0,
          title: '',
          content: '',
          project: { id: 0 }
        };
        this.loading = false;
      },
      error: (err: Error) => {
        this.error = 'Erreur lors de la création du post';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }
} 