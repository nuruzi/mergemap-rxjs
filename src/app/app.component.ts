import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share, switchMap, mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  getPosts = () =>
    this.httpClient.get('https://jsonplaceholder.typicode.com/posts');

  getComments = (post) =>
    this.httpClient.get(
      `https://jsonplaceholder.typicode.com/posts/${post[0].id}/comments`
    );

  getCommentsWithPost = (post) =>
    this.getComments(post).pipe(map((comments) => ({ post, comments })));

  // get the information of the second service by the result of the first service
  // اتصال سلسله مراتبی سرویس ها به وسیله mergmap
  // Hierarchical connection of services by mergmap
  c$: Observable<any> = this.getPosts().pipe(
    mergeMap(this.getCommentsWithPost)
  );

  constructor(private httpClient: HttpClient) {}
}
