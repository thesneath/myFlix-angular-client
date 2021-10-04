import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
  }

  /**
   * @returns an array of movie ID for the logged in user
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.favorites = response.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * Checks if movies are currently favorited.
   * Used to determine which icon is displayed by the card
   * @param id movie _id
   */
  isFavorite(id: string): any {
    if (this.favorites.includes(id)) {
      return true;
    }
    return false;
  }

  /**
   * @param id movie _id
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavorite(id).subscribe((response: any) => {
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 2000,
      });
    });
  }
  /**
   * @param id movie _id
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((response: any) => {
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * 
   * @param name Genre name
   * @param description Genre Description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { name, description },
      width: '400px',
    });
  }
  /**
   * 
   * @param name Director Name
   * @param bio Director Bio
   * @param birthyear Director Birthyear
   */
  openDirectorDialog(name: string, bio: string, birthyear: string): void {
    this.dialog.open(DirectorComponent, {
      data: { name, bio, birthyear },
      width: '400px',
    });
  }

  /**
   * 
   * @param description movie Description
   */
  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { description },
      width: '400px',
    });
  }
}
