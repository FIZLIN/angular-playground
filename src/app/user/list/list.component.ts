import { Component } from '@angular/core';
import { ListModel } from '../+store/models/list';
import { Observable, Subject } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RouterModel } from 'src/app/+store/models/router';
import { takeUntil, map, partition, filter, distinctUntilChanged } from 'rxjs/operators';
import { EntityComponent } from '../entity/entity.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  isAlive$: Subject<void> = new Subject<void>();
  userList$: Observable<IUser[]>;
  displayedColumns = [
    'name',
    'email',
    'actions'
  ];
  dialogRef: MatDialogRef<EntityComponent>;

  constructor(private listModel: ListModel, private routerModel: RouterModel, private matDialog: MatDialog) {
    this.userList$ = listModel.userList$;

    const [open$, close$] = partition<boolean>(shouldOpen => shouldOpen)(
      routerModel.currentRouteData$.pipe(
        takeUntil(this.isAlive$),
        map(data => data && ['user-entity-add', 'user-entity-edit'].includes(data.dialogId)),
        distinctUntilChanged(),
        filter(shouldOpen => (shouldOpen && !this.dialogRef) || (!shouldOpen && !!this.dialogRef)),
      )
    );

    open$.subscribe(() => {
      this.matDialog.open(EntityComponent, {
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
