import { Component } from '@angular/core';
import { ListModel } from '../+store/models/list';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  userList$: Observable<IUser[]>;
  constructor(private listModel: ListModel) {
    this.userList$ = this.listModel.userList$;
  }

}
