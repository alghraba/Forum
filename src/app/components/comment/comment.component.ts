import { Component, Input, OnInit } from '@angular/core';
// Update the import path below to the correct location of forum.service.ts
import { ForumService } from '../../services/forum.service';
import { Comment } from 'src/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
  @Input() projectId!: number;
  comments: Comment[] = [];
  newComment: Comment = { content: '', project: { id: 0 } };

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    if (this.projectId) this.loadComments();
  }

  loadComments(): void {
    this.forumService.getCommentsByProject(this.projectId).subscribe(data => this.comments = data);
  }

  addComment(): void {
    this.newComment.project.id = this.projectId;
    this.forumService.addComment(this.newComment).subscribe(() => {
      this.newComment = { content: '', project: { id: this.projectId } };
      this.loadComments();
    });
  }
}
