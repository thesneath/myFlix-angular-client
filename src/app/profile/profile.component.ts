import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  movies: any = [];
  user: any = [];
  favorites: any = [];
  favId: any = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.favId = response.FavoriteMovies;
      return this.user;
    });
  }

  /**
   * Creates the favorite movies list
   * @returns an a array of movie titles that match the _id stored in the database
   */
  getFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      this.movies.forEach((movie: any) => {
        if (this.favId.includes(movie._id)) {
          this.favorites.push(movie.Title);
        }
        return this.favorites;
      });
    });
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      this.snackBar.open('Your account has been deleted!', 'OK',
        { duration: 3000,}
      );
    },
      (result) => {
      this.snackBar.open(result, 'OK', {duration: 3000,});
      this.router.navigate(['welcome']).then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
      });
    }
    );
  }

  openUpdateDialog(): void {
    this.dialog.open(ProfileUpdateComponent, {
      width: '400px',
    });
  }
}
