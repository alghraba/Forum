import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm: FormGroup;
  projects: Project[] = [];
  error: string | null = null;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      projectId: ['', Validators.required]
    });
  }

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
      error: (err) => {
        this.error = 'Erreur lors du chargement des projets';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  selectProject(project: Project): void {
    if (project.id !== undefined) {
      this.postForm.patchValue({ projectId: project.id });
    }
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const post = {
        ...this.postForm.value,
        project: {
          id: this.postForm.value.projectId
        }
      };
      delete post.projectId;

      this.postService.addPost(post).subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: (err: Error) => {
          this.error = 'Erreur lors de la création du post';
          console.error('Erreur:', err);
        }
      });
    }
  }
} 