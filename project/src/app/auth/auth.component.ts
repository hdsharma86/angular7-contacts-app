import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';
import { FormGroup, FormControl, FormBuilder, Validator, AbstractControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthModel } from './auth.model';

@Component({
    selector: 'app-login',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit {
    loginForm: FormGroup;
    login: AuthModel = new AuthModel();

    constructor(private _userService: UserService, private fb: FormBuilder, private _router: Router){}

    ngOnInit(): void{

        if (localStorage.length > 0) {
            let isAuth = JSON.parse(localStorage.getItem('auth'));
            if(isAuth){
                if(isAuth.type == 'admin'){ this._router.navigate(['/manage-user']); }
                if(isAuth.type == 'user'){ this._router.navigate(['/contacts']); }
            }
        }

        this.loginForm = this.fb.group({
            username: ['',[Validators.required, Validators.minLength(3)]],
            password:['',[Validators.required, Validators.minLength(6)]]
        })
    }

    save(form: NgForm){
        let username = this.loginForm.value.username;
        let password = this.loginForm.value.password;
        if(username !== '' && password !== ''){
            this._userService.authenticate(username, password).subscribe((data)=>{
                if(data.token){
                    let myObj = { token: data.token, type: data.user.user_role, id : data.user._id };
                    localStorage.setItem('auth', JSON.stringify(myObj));
                    window.location.reload();
                    if(data.user.user_role == 'admin'){ this._router.navigate(['/manage-user']); }
                    if(data.user.user_role == 'user'){ this._router.navigate(['/contacts']); }
                } else {
                    alert('Invalid username or password! try again...');
                }
            });
        }
        return false;
    }
}