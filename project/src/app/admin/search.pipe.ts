import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../model/users.model';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform{
    transform( value: UserModel[], keyword: string ){
        keyword = keyword ? keyword.toLowerCase() : null;
        return keyword ? value.filter((user: UserModel)=>(
            ((user.firstname.toLowerCase().indexOf(keyword) !== -1) || 
            (user.lastname.toLowerCase().indexOf(keyword) !== -1) ||
            (user.user_role.toLowerCase().indexOf(keyword) !== -1)
            )
        )) : value;
    }
}