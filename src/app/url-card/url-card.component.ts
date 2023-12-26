import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';


interface UpdateDetails {
  modelId?: number;
  title: string;
}
@Component({
  selector: 'app-url-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './url-card.component.html',
  styleUrl: './url-card.component.css',
})
export class UrlCardComponent {
  constructor(public dashboardData: DashboardComponent) {}

  updateModel: UpdateDetails = {
    title: '',
  }

  setModelId(item: any) {
    this.updateModel.modelId = item.id;
    this.updateModel.title = item.title;
  }

}
