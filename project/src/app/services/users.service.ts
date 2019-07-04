import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../model/users.model';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()

export class UserService{

    _apiURL = environment.apiUrl;

    constructor( private _httpClient: HttpClient ){}

    authenticate( username: String, password: String): Observable<any> {
        console.log(username+' '+password);
        return this._httpClient.post<any>(this._apiURL+'/login', {
            username, password
        }, httpOptions);
    }
        
    getUsers(): Observable<UserModel[]> {
        return this._httpClient.get<UserModel[]>(this._apiURL+'/users');  
    }

    /**
     * Get single User detail...
     */
    getUser( userId: string ): Observable<UserModel> {
        return this._httpClient.get<UserModel>(this._apiURL+'/users'+'/'+userId);
    }

    /**
     * Add new User to database...
     * @param data 
     */
    createUser(data: UserModel): Observable<UserModel[]> {
        return this._httpClient.post<UserModel[]>(this._apiURL+'/users', data, httpOptions);  
    }

    /**
     * Update data...
     * @param data 
     */
    updateUser( data: UserModel, userId: String ): Observable<UserModel> {
        return this._httpClient.put<UserModel>(this._apiURL+'/users'+'/'+userId, data, httpOptions)
    }

    /**
     * delete User detail...
     */
    deleteUser( userId: string ): Observable<UserModel> {
        return this._httpClient.delete<UserModel>(this._apiURL+'/users'+'/'+userId);
    }

}