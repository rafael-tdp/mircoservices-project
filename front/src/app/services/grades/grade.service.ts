import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class GradeService {

    apiUrl = 'http://localhost:3001/grades'

    constructor(public httpClient: HttpClient) { }

    getUserGrades(id: String): Observable<Object[]> {
        return this.httpClient.get<Object[]>(this.apiUrl + '/' + id);
    }

}
