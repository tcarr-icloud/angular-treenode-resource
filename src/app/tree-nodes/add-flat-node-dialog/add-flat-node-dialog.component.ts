import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {environment} from '../../../environments/environment';
import {AuthenticatedService} from '../../authenticated-service';
import {TreeNode} from '../tree-node';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-add-flat-node-dialog',
  imports: [ReactiveFormsModule, JsonPipe, MatButton, MatCard, MatCardContent],
  templateUrl: './add-flat-node-dialog.component.html',
  styleUrl: './add-flat-node-dialog.component.css',
})
export class AddFlatNodeDialog {
  selectedTreeNode: TreeNode | null = null;
  isEditMode = false;
  flatNodeFormGroup = new FormGroup({
    id: new FormControl(0), name: new FormControl(''), description: new FormControl(''), parentId: new FormControl(0)
  });
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor(public dialogRef: MatDialogRef<AddFlatNodeDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isEditMode = data.edit;
    this.selectedTreeNode = data.selectedNode;
    if (data.edit) {
      this.getFlatNodeById(this.selectedTreeNode?.id);
    } else {
      this.flatNodeFormGroup.patchValue({parentId: this.selectedTreeNode?.id});
    }
  }

  protected getFlatNodeById(id: number | undefined) {
    this.authenticatedService.getAccessToken().subscribe(accessToken => {
      fetch(environment.apiUrl + '/flatnode/' + id, {
        method: 'GET', headers: {
          'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'
        }
      }).then(async response => response.json().then(data => this.flatNodeFormGroup.patchValue(data)));
    })
  }

  protected onDelete() {
    this.authenticatedService.getAccessToken().subscribe(accessToken => {
      fetch(environment.apiUrl + '/flatnode/' + this.flatNodeFormGroup.value.id, {
        method: 'DELETE', headers: {
          'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'
        }
      }).then(async response => {
        if (response.status === 200) {
          this.dialogRef.close();
        }
      });
    });
  }

  protected onSubmit() {
    if (this.isEditMode) {
      this.authenticatedService.getAccessToken().subscribe(accessToken => {
        fetch(environment.apiUrl + '/flatnode/' + this.flatNodeFormGroup.value.id, {
          method: 'PUT', headers: {
            'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'
          }, body: JSON.stringify(this.flatNodeFormGroup.value)
        }).then(async response => {
          if (response.status === 200) {
            this.dialogRef.close();
          }
        });
      });
    } else {
      this.authenticatedService.getAccessToken().subscribe(accessToken => {
        fetch(environment.apiUrl + '/flatnode', {
          method: 'POST', headers: {
            'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json'
          }, body: JSON.stringify(this.flatNodeFormGroup.value)
        }).then(async response => {
          if (response.status === 200) {
            this.dialogRef.close();
          }
        });
      });
    }
  }

  protected onCancel() {
    this.dialogRef.close();
  }
}
