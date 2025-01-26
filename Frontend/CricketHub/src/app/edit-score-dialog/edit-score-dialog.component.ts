import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; // Add MatDialogModule here

@Component({
  selector: 'app-edit-score-dialog',
  templateUrl: './edit-score-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,  // Ensure MatDialogModule is imported here
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class EditScoreDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; wickets: number; runs: number; fieldToEdit: 'runs' | 'wickets' }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    this.dialogRef.close(this.data);
  }
}