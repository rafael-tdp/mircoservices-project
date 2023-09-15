import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  allUsers: any;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      this.allUsers = res;
      console.log(this.allUsers);
      
    })
  }

}
