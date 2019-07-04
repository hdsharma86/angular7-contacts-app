import { Component } from '@angular/core';
import { ContactService } from '../services/contacts.service';
import { ContactModel } from '../model/contacts.model';
import { Contact } from './contact.form';
import { Router } from '@angular/router';

import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { StaticInjector } from '@angular/core/src/di/injector';

declare var $: any;
@Component({
    selector: 'manage-contacts',
    templateUrl: './contact.component.html'
})

export class ContactComponent{

    constructor( private _contactService: ContactService, private fb: FormBuilder, private _router: Router ){}

    contactForm: FormGroup;
    contact: Contact = new Contact();

    title: String = 'Contact(s) Manager';
    contacts: ContactModel[];

    loading: boolean = false;

    isContactDetailEnabled: boolean = false;
    contactDetail: ContactModel;

    formMode: String = 'INSERT';
    logedInId: String;
    
    modalTitle: string;
    openModal( modelFor ){
        this.modalTitle = (modelFor == 'update' ) ? "Update Contact" : "Add New Contact";
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

    loadContactDeatil( contactId ): void{
        this.loading = true;
        this._contactService.getContact(contactId).subscribe((data)=>{
            this.contactDetail = data;
            this.isContactDetailEnabled = true;
            this.loading = false;
        });
        
    }

    updateContact(contactId){
        console.log(contactId);
        this.loading = true;
        this._contactService.getContact(contactId).subscribe((data)=>{
            this.loadFormWithValues(data);
            this.openModal('update');
            this.loading = false;
        });
        return false;
    }

    deleteContact( contactId ){
        if(confirm("Are you sure to delete contact?")) {
            this._contactService.deleteContact(contactId).subscribe((data)=>{
                this.getContacts();
                this.isContactDetailEnabled = false;
            });
        }
        return false;
    }

    update(){
        this.loading = true;
        this._contactService.updateContact({
            '_id': this.contactForm.value.contactId,
            'firstname': this.contactForm.value.firstName,
            'lastname': this.contactForm.value.lastName,
            'about': this.contactForm.value.about,
            'email': this.contactForm.value.email,
            'phone' : this.contactForm.value.phone,
            'image_url': this.contactForm.value.imageUrl,
            'user_id': this.logedInId,
            'created_on': new Date(),
            'last_modified': new Date()
        }, this.contactForm.value.contactId).subscribe((data)=>{ 
            this.closeModal();
            this.contactDetail = data;
            this.getContacts();
        });
        return false;
    }

    save( mode ){
        if(mode == 'UPDATE'){
            this.update();
        } else {
            this.loading = true;
            this._contactService.createContact({
                '_id': 'test',
                'firstname': this.contactForm.value.firstName,
                'lastname': this.contactForm.value.lastName,
                'about': this.contactForm.value.about,
                'email': this.contactForm.value.email,
                'phone' : this.contactForm.value.phone,
                'image_url': this.contactForm.value.imageUrl,
                'user_id': this.logedInId,
                'created_on': new Date(),
                'last_modified': new Date()
            }).subscribe((data)=>{ 
                console.log(data); 
                this.closeModal();
                this.getContacts();
                this.loading = false;
            });
        }
        return false;
    }

    getContacts(){
        this.loading = true;
        this._contactService.getContacts().subscribe((data)=>{ 
            this.contacts = data; 
            this.loading = false;
        });
    }

    loadFormWithValues(data: any){
        this.contactForm.patchValue({
            contactId: data._id,
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
                this.logedInId = isAuth.id;
                if(isAuth.type == 'admin'){ this._router.navigate(['/manage-user']); }
            }
        }

        this.getContacts();
        
        this.contactForm = this.fb.group({
            contactId: [''],
            firstName : ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.maxLength(10)]],
            email: [''],
            phone: [''],
            about: [''],
            imageUrl: ['']
        });
    }
}