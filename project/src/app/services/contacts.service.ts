import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactModel } from '../model/contacts.model';
import { environment } from '../../environments/environment';

let isAuth = {id:''};
if (localStorage.length > 0) {
    isAuth = JSON.parse(localStorage.getItem('auth'));
}
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': (isAuth.id !== undefined) ? isAuth.id : ""
    })
};

@Injectable()

export class ContactService{

    _apiURL = environment.apiUrl+'/contacts';

    constructor( private _httpClient: HttpClient ){}
    
    /**
     * Fetch list of contacts...
     */
    getContacts(): Observable<ContactModel[]> {
        return this._httpClient.get<ContactModel[]>(this._apiURL, httpOptions);  
    }

    /**
     * Get single contact detail...
     */
    getContact( contactId: string ): Observable<ContactModel> {
        return this._httpClient.get<ContactModel>(this._apiURL+'/'+contactId);
    }

    /**
     * Add new contact to database...
     * @param data 
     */
    createContact(data: ContactModel): Observable<ContactModel[]> {
        return this._httpClient.post<ContactModel[]>(this._apiURL, data, httpOptions);  
    }

    /**
     * Update data...
     * @param data 
     */
    updateContact( data: ContactModel, contactId: String ): Observable<ContactModel> {
        return this._httpClient.put<ContactModel>(this._apiURL+'/'+contactId, data, httpOptions)
    }

    /**
     * delete contact detail...
     */
    deleteContact( contactId: string ): Observable<ContactModel> {
        return this._httpClient.delete<ContactModel>(this._apiURL+'/'+contactId);
    }
}