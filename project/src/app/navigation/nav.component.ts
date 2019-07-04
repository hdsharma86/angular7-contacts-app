import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'navigation',
    templateUrl: './nav.component.html'
})

export class NavComponent{

    constructor(private _router: Router){}

    isUser: Boolean = false;
    isAdmin: Boolean = false;

    logout(){
        localStorage.clear();
        this._router.navigate(['/login']);
    }

    ngOnInit(): void{

        if (localStorage.length > 0) {
            let isAuth = JSON.parse(localStorage.getItem('auth'));
            if(isAuth){
                if(isAuth.type == 'admin'){ this.isAdmin = true; }
                if(isAuth.type == 'user'){ this.isUser = true; }
            }
        }

    }
}