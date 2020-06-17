import { Component, OnInit } from '@angular/core';
import { UserPermissionService } from 'src/app/service/user-permission.service';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {

  users;
  constructor(private userPermission:UserPermissionService) { }

  ngOnInit() {
    
      this.userPermission.getall_viwers().
      subscribe((data=>{
        // console.log(data);
         this.users=data;
         console.log(this.users);
      })
      );
  }
 
  check_click(e,_id,rid,objectName, arrayPlace){        // asd=> template variable for Checkbox, objectName 
                                                     // objectName is used to choose what is the object type this data belongs to
      let a={                                            // arrayplace is what is the number these data belongs to
        _id:_id,
        objectName:objectName,
        arrayPlace:arrayPlace,
        value:e.target.checked
      }
      console.log(a);
       

      this.userPermission.update_userPermission(a)
      .subscribe(data=>{
          this.users[rid]=data;
      })
  }


}
