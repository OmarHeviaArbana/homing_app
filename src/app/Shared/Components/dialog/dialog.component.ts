  import { Component, Inject } from '@angular/core';
  import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

  @Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']

  })
  export class DialogComponent {
      constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string, onConfirm?: () => void; }
    ) {}

    onAccept(): void {
      if (this.data.onConfirm) {
        this.data.onConfirm();
      }
      this.dialogRef.close();
    }


}
