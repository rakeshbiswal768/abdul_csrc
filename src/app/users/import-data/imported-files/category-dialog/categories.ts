import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'categories',
    templateUrl: './categories.html',
})
export class CategoriesDialog {
    categories: string[] = ['Financial', 'IT', 'Admin'];
    autocompleteTags = [];
    constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CategoriesDialog>) {
        this.autocompleteTags = data;
    }
}
