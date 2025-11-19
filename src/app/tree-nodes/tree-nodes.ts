import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {environment} from '../../environments/environment';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatContextMenuTrigger, MatMenu, MatMenuItem} from '@angular/material/menu';
import {FormsModule} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddFlatNodeDialog} from './add-flat-node-dialog/add-flat-node-dialog.component';
import {TreeNode} from './tree-node';

@Component({
  selector: 'app-tree-nodes',
  imports: [MatTreeModule, MatIconModule, MatIconButton, MatMenu, MatMenuItem, MatContextMenuTrigger, FormsModule],
  templateUrl: './tree-nodes.html',
  styleUrl: './tree-nodes.css',
})
export class TreeNodes {
  dataSource: TreeNode[] = [];
  selectedNode: TreeNode | null = null;
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor(public dialog: MatDialog) {
    this.refreshDataSource();
  }

  childrenAccessor = (node: TreeNode) => node.children ?? [];

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  protected new(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {selectedNode: this.selectedNode, edit: false}
    const dialogRef = this.dialog.open(AddFlatNodeDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.refreshDataSource();
      console.log('The dialog was closed');
    });
  }

  protected edit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {selectedNode: this.selectedNode, edit: true};

    const dialogRef = this.dialog.open(AddFlatNodeDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshDataSource();
      console.log('The dialog was closed');
    });
  }

  protected delete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.data = {selectedNode: this.selectedNode, edit: false};
    const dialogRef = this.dialog.open(AddFlatNodeDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshDataSource();
      console.log('The dialog was closed');
    });
  }

  protected onNodeContextMenu(node: TreeNode) {
    console.log("Selected node:" + JSON.stringify(node));
    this.selectedNode = node;
  }

  private refreshDataSource() {
    this.authenticatedService.getAccessToken().subscribe(accessToken => {
      fetch(environment.apiUrl + '/treenode', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(async response => {
        this.dataSource = await response.json();
      });
    });
  }
}
