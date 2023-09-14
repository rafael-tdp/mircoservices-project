import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { EncryptService } from '../encrypt.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000/auth'
  registerEndpoint: string = '/register';
  loginEndpoint: string = '/login';

  currentUser: User | null = null;

  constructor(public httpClient: HttpClient, public encryptService: EncryptService) { }

  login(body: Object): Observable<boolean | null> {
    return this.httpClient.post<User>(this.apiUrl + this.loginEndpoint, body).pipe(map((data: User) => {
      if (data) {
        console.log(data, 'DATAAA');
        localStorage.setItem('isLoggedIn', 'true');
        this.setUserData(data);
        return null;
      }
      return true;
    }))
  
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
