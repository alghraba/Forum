import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Comment } from '../../../models/comment.model';
import { PostService } from '../../../services/post.service';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  comments: Comment[] = [];
  newComment: Comment = { content: '', post: { id: 0 } };
  error: string | null = null;
  loading = true;
  currentUserId: number = 1;

  constructor(
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    if (this.post?.id !== undefined) {
      this.loadComments();
    }
  }

  loadComments(): void {
    if (this.post?.id === undefined) return;
    
    this.loading = true;
    this.error = null;
    this.commentService.getCommentsByPost(this.post.id).subscribe({
      next: (data) => {
        this.comments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des commentaires';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  addComment(): void {
    if (!this.newComment.content.trim()) {
      this.error = 'Le commentaire ne peut pas être vide';
      return;
    }

    if (this.post?.id === undefined) {
      this.error = 'Erreur: post non trouvé';
      return;
    }

    const comment: Comment = {
      content: this.newComment.content,
      post: { id: this.post.id }
    };

    this.commentService.addComment(comment).subscribe({
      next: (newComment) => {
        this.comments.push(newComment);
        this.newComment = { content: '', post: { id: 0 } };
        this.error = null;
      },
      error: (err) => {
        this.error = 'Erreur lors de l\'ajout du commentaire';
        console.error('Erreur:', err);
      }
    });
  }

  deleteComment(id: number): void {
    if (id === undefined) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      this.commentService.deleteComment(id).subscribe({
        next: () => {
          this.comments = this.comments.filter(comment => comment.id !== id);
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression du commentaire';
          console.error('Erreur:', err);
        }
      });
    }
  }
}
