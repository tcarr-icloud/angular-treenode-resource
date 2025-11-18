import {Component, inject, signal} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('angular-treenode-resource');
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
}
