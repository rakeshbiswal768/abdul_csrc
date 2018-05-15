import { Component, Inject, forwardRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
    selector: 'dialog',
    templateUrl: './dialog.html',
})
export class Dialog {
    // header = '';
    constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<Dialog>) {
        // this.header = data.header;
    }
    YesDel() {
        this.dialogRef.close('yes');
    }

    NoDel() {
        this.dialogRef.close('no');

    }
}
