import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit{
  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading: boolean =false; 
  form: FormGroup;

  constructor(public postsService: PostsService, public route: ActivatedRoute ) {}

  ngOnInit(): void {
    // form initialisation
    this.form = new FormGroup({ //adding validators
      'title' : new FormControl(null, {validators: [Validators.required,  Validators.minLength(3)]}),
      'content' : new FormControl(null, {validators: [Validators.required]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        //start spinner
        this.isLoading = true;
        this.postsService.getPost(this.postId)
          .subscribe(postData =>{
            //end spinner
            this.isLoading = false;
            this.post = {id: postData._id, title: postData.title, content: postData.content};

            this.form.setValue({'title': this.post.title, 'content': this.post.content});
          })
      } else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    const post: Post = { id: 'a', title: this.form.value.title, content: this.form.value.content };

    this.isLoading = true;
    if(this.mode === 'create'){
      this.postsService.addPost(post);
    } else{ 
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content)
    }
    
    this.form.reset(); //resets the fields
  }
}
