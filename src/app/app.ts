import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthenticatedService} from './authenticated-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-treenode-resource');
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
}
