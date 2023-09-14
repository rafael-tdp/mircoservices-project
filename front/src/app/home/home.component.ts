import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { GradeService } from '../services/grades/grade.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userGrades: any = null


    
  constructor(public gradeService: GradeService, public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserData();
    this.gradeService.getUserGrades(this.userService.currentUser!._id).subscribe(res => {
      console.log(res);
      this.userGrades = res;
    })

  }

  getAverageGrade(grades: number[]): number {
    if (grades.length === 0) {
      return 0; // Retourne 0 si le tableau des notes est vide
    }

    const sum = grades.reduce((total, grade) => total + grade, 0);
    return sum / grades.length;
  }

}
