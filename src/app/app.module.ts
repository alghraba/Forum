import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { ProjectComponent } from './components/project/project.component';
import { PostCreateComponent } from './components/post-create/post-create.component';

import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { ProjectService } from '../services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    PostFormComponent,
    ProjectComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: PostListComponent },
      { path: 'posts/new', component: PostCreateComponent },
      { path: 'posts/:id', component: PostComponent },
      { path: 'projects', component: ProjectComponent }
    ])
  ],
  providers: [
    PostService,
    CommentService,
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
