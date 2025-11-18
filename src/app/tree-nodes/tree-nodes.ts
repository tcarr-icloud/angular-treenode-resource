import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {environment} from '../../environments/environment';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-tree-nodes',
  imports: [MatTreeModule, MatIconModule, MatIconButton],
  templateUrl: './tree-nodes.html',
  styleUrl: './tree-nodes.css',
})
export class TreeNodes {
  dataSource: TreeNode[] = [];
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  childrenAccessor = (node: TreeNode) => node.children ?? [];

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  ngOnInit() {
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
