import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts=[
  //   {title: 'Post', content: 'This is a post'},
  //   {title: 'Post', content: 'This is a post'},
  //   {title: 'Post', content: 'This is a post'},
  //   {title: 'Post', content: 'This is a post'}
  // ]
  

  posts:Post[] = []

  private postSub!: Subscription;
  constructor(public postsService: PostsService){
  }
  
  ngOnInit() {
    this.posts = this.postsService.getPosts(); //fetching all thh posts
    this.postSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts =  posts;
      });
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
