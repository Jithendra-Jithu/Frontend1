import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

interface DialogData {
uid: string;
teamId: string;
name: string;
runs: number;
wickets: number;
fieldToEdit: 'runs' | 'wickets';
}

@Component({
selector: 'app-edit-score-dialog',
templateUrl: './edit-score-dialog.component.html',
standalone: true,
imports: [ CommonModule,
MatDialogModule,
MatFormFieldModule,
MatInputModule,
MatButtonModule,
FormsModule,
],
})

export class EditScoreDialogComponent {
constructor(
public dialogRef: MatDialogRef<EditScoreDialogComponent>,
@Inject(MAT_DIALOG_DATA) public data: DialogData
) {}

onCancel(): void {
this.dialogRef.close();
}

onUpdate(): void {
this.dialogRef.close({
uid: this.data.uid,
teamId: this.data.teamId,
runs: this.data.runs,
wickets: this.data.wickets
});
}
}