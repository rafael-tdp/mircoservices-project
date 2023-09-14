import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Formulaire de connexion
  formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    const body = {
      email: this.formLogin.controls['email'].value,
      password: this.formLogin.controls['password'].value
    }

    this.userService.login(body).subscribe(res => {
      console.log(res);
      this.router.navigate(['/', 'home']).then(nav => {
        console.log(nav); // true if navigation is successful
      }, err => {
        console.log(err) // when there's an error
      });
    }, (err) => {
      console.log(err), 'ERROR';

    })
  }
}
