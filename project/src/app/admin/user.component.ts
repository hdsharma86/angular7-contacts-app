import { Component } from '@angular/core';
import { UserService } from '../services/users.service';
import { UserModel } from '../model/users.model';
import { User } from './user.form';
import { Router } from '@angular/router';

import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';

declare var $: any;

@Component({
    selector: 'manage-users',
    templateUrl: './user.component.html'
})

export class UserComponent{

    constructor( private _userService: UserService,  private fb: FormBuilder, private _router: Router ){}

    title: String = 'User(s) Manager';
    users: UserModel[];
    loading: boolean = true;
    userForm: FormGroup;
    user: User = new User();
    isUserDetailEnabled: boolean = false;
    userDetail: UserModel;
    formMode: String = 'INSERT';
    keyword: String;
    modalTitle: string;
    isAdmin:boolean = false;
    openModal( modelFor ){
        this.modalTitle = (modelFor == 'update' ) ? "Update User" : "Add New User";
        this.formMode = (modelFor == 'update' ) ? "UPDATE" : "INSERT";
        if(this.formMode == 'INSERT'){
            this.loadFormWithValues({});
        }
        $('#myModal').modal('show'); 
        return false;
    }

    closeModal(){
        $('#myModal').modal('hide'); 
        return false;
    }

    loadUserDeatil( userId ): void{
        console.log(userId);
        this.loading = true;
        this._userService.getUser(userId).subscribe((data)=>{
            this.userDetail = data;
            this.isUserDetailEnabled = true;
            this.loading = false;
        });
        
    }

    updateUser(userId){
        console.log(userId);
        this.loading = true;
        this._userService.getUser(userId).subscribe((data)=>{
            this.loadFormWithValues(data);
            this.openModal('update');
            this.loading = false;
        });
        return false;
    }

    deleteUser( userId ){
        if(confirm("Are you sure to delete user?")) {
            this._userService.deleteUser(userId).subscribe((data)=>{
                this.getUsers();
                this.isUserDetailEnabled = false;
            });
        }        
        return false;
    }

    update(){
        this.loading = true;
        this._userService.updateUser({
            '_id': this.userForm.value.userId,
            'firstname': this.userForm.value.firstName,
            'lastname': this.userForm.value.lastName,
            'username': this.userForm.value.username,
            'email': this.userForm.value.email,
            'phone' : this.userForm.value.phone,
            'password': this.userForm.value.password,
            'user_role': this.userForm.value.user_role,
            'created_on': new Date(),
            'last_modified': new Date()
        }, this.userForm.value.userId).subscribe((data)=>{ 
            this.closeModal();
            this.userDetail = data;
            this.getUsers();
        });
        return false;
    }

    save( mode ){
        if(mode == 'UPDATE'){
            this.update();
        } else {
            this.loading = true;
            this._userService.createUser({
                '_id': this.userForm.value.userId,
                'firstname': this.userForm.value.firstName,
                'lastname': this.userForm.value.lastName,
                'username': this.userForm.value.username,
                'email': this.userForm.value.email,
                'phone' : this.userForm.value.phone,
                'password': this.userForm.value.password,
                'user_role': this.userForm.value.user_role,
                'created_on': new Date(),
                'last_modified': new Date()
            }).subscribe((data)=>{ 
                console.log(data); 
                this.closeModal();
                this.getUsers();
                this.loading = false;
            });
        }
        return false;
    }

    getUsers(){
        this.loading = true;
        this._userService.getUsers().subscribe((data)=>{
            console.log(data);
            this.users = data; 
            this.loading = false;
        });
    }

    loadFormWithValues(data: any){
        this.userForm.patchValue({
            userId: data._id,
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            phone: data.phone,
            about: data.about,
            imageUrl: data.image_url
        });
        return false;
    }

    ngOnInit(): void{

        if (localStorage.length > 0) {
            let isAuth = JSON.parse(localStorage.getItem('auth'));
            if(isAuth){
                if(isAuth.type == 'user'){ this._router.navigate(['/contacts']); }
            }
        }

        this.getUsers();
        
        this.userForm = this.fb.group({
            userId: [''],
            firstName : ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(10)]],
            username: [''],
            email: [''],
            phone: [''],
            user_role: [''],
            password: ['']
            
        });
    }

}