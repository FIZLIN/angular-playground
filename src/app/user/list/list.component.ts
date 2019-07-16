import { Component } from '@angular/core';
import { ListModel } from '../+store/models/list';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RouterModel } from 'src/app/+store/models/router';
import { map, partition, filter, distinctUntilChanged } from 'rxjs/operators';
import { EntityComponent } from '../entity/entity.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  userList$: Observable<IUser[]>;
  displayedColumns = [
    'name',
    'email',
    'actions'
  ];
  dialogRef: MatDialogRef<EntityComponent>;

  constructor(listModel: ListModel, routerModel: RouterModel, matDialog: MatDialog) {
    this.userList$ = listModel.userList$;

    const [open$, close$] = partition<boolean>(shouldOpen => shouldOpen)(
      routerModel.guardedHierarchyData$.pipe(
        map(allData => allData[allData.length - 2]),
        map(data => data && ['user-entity-add', 'user-entity-edit'].includes(data.dialogId)),
        distinctUntilChanged(),
        filter(shouldOpen => (shouldOpen && !this.dialogRef) || (!shouldOpen && !!this.dialogRef)),
      )
    );

    open$.subscribe(() => {
      matDialog.open(EntityComponent, {
        disableClose: true,
        width: '500px',
        height: '400px'
      });
    });

    close$.subscribe(() => {
      this.dialogRef.close();
    });
  }
}
