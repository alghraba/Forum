import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/models/project.model';
import { Post } from 'src/models/post.model';
import { Comment } from 'src/models/comment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private baseUrl = 'http://localhost:8085/api';

  constructor(private http: HttpClient) {}

  // PROJECT
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/projects`, project);
  }

  // POST
  getPostsByProject(projectId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts?projectId=${projectId}`);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, post);
  }

  // COMMENT
  getCommentsByProject(projectId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments?projectId=${projectId}`);
  }

  getCommentsByPost(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments?postId=${postId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/comments`, comment);
  }
}
