import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { EncryptService } from '../encrypt.service';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../../graphql.queries';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000/auth'
  registerEndpoint: string = '/register';
  loginEndpoint: string = '/login';

  currentUser: User | null = null;

  // Create observer object
  loginObserver = {
    next: (data: any) => {
      console.log(data.data.login.user);
      data.data.login.user.token = data.data.login.token;
      localStorage.setItem('isLoggedIn', 'true');
      this.setUserData(data.data.login.user);
    },
    error: (err: Error) => console.error('Observer got an error: ' + err),
    complete: () => {
      console.log('Observer got a complete notification');
      this.router.navigate(['/home']);  
    }
  };

  constructor(public httpClient: HttpClient, public encryptService: EncryptService, private apollo: Apollo, private router: Router) { }

  login(email: String, password: String) {
    this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        email: email,
        password: password
      }
    }).subscribe(this.loginObserver); 
  }

  /**
 * Se deconnect du sit en supprimant les données mis en cache
 * @returns {Observable<any>} Observable du retour de la deconnexion
 * @memberof UserService
 */
  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.postLogout();
  }

  /**
 * Requête pour que l'utilisateur se deconnecter
 * @returns {Observable<any>} Observable du retour de la deconnexion
 * @memberof AuthentificationService
 */
  postLogout(): void {
    this.router.navigate(['/']);
  }




  setUserData(data: User): void {
    this.currentUser = User.fromObject(data);
    console.log(this.currentUser, 'USER ACTIF');
    localStorage.setItem('UserDATA', JSON.stringify(data));
    //Chiffrement des informations du collaborateur
    this.encryptService.setData('UserDATA', JSON.stringify(data))
  }

  /**
 * Récupère les données mis en cache
 * @returns {User} Les données de l'utilisateur
 * @memberof UserService
 */
  getUserData(): User | null {
    // Récupére les infos de l'utilisateur
    //Déchiffrement des informations du collaborateur
    const user: User | null = JSON.parse(this.encryptService.getData('UserDATA'));
    if (!user) {
      return null;
    }
    this.currentUser = User.fromObject(user);
    console.log(this.currentUser, 'DECRUPT');


    // Sauvegarde les infos en cache
    localStorage.setItem('idUser', String(user._id));
    localStorage.setItem('token', user ? user.token : '');
    return this.currentUser;
  }

}
