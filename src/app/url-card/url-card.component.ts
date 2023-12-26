import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-url-card',
  standalone: true,
  imports: [],
  templateUrl: './url-card.component.html',
  styleUrl: './url-card.component.css',
})
export class UrlCardComponent {
  constructor(public dashboardData: DashboardComponent) {}
}
