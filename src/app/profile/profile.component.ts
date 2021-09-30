import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  movies: any = []
  user: any = [];
  favorites: any = [];
  favId: any = [];
  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.favId = response.FavoriteMovies
      return this.user
    });
  }

  getFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      this.movies.forEach((movie: any) => {
        if(this.favId.includes(movie._id)) {
          this.favorites.push(movie.Title);
        } 
          return this.favorites;
      });

    })
  }

}
