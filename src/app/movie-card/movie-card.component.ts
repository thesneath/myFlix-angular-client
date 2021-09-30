import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = []; 
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    }) 
  }

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favorites = response.FavoriteMovies;
      return this.favorites;
    });
  }

  isFavorite(id: string): any {
    if(this.favorites.includes(id)) {
      console.log('favorited')
      return true;
    } 
      return false;
    
  }

  addFavorite(id: string): void {
    this.fetchApiData.addFavorite(id).subscribe((response: any) => {
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 2000
      })
    })
  }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((response: any) => {
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000
      })
    })
  }

}