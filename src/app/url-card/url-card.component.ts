import { Component, PlatformRef } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

interface UpdateDetails {
  modelId?: number;
  title: string;
}

interface MediaPlaforms {
  name: string;
  icon: string;
  color: string;
  url: string;
}
@Component({
  selector: 'app-url-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './url-card.component.html',
  styleUrl: './url-card.component.css',
})
export class UrlCardComponent {
  constructor(
    public dashboardData: DashboardComponent,
    private platfrom: PlatformRef
  ) {}

  modelDialog: string = 'share';

  updateModel: UpdateDetails = {
    title: '',
  };

  setModelId(item: any) {
    this.modelDialog = 'edit';

    this.updateModel.modelId = item.id;
    this.updateModel.title = item.title;
  }

  handleShare() {
    this.modelDialog = 'share';
  }

  mediaPlatforms: MediaPlaforms[] = [
    {
      name: 'Facebook',
      icon: 'facebook',
      color: '#4267B2',
      url: 'https://web.facebook.com/?_rdc=1&_rdr',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      color: '#E1306C',
      url: 'https://www.instagram.com/',
    },
    {
      name: 'WhatsApp',
      icon: 'whatsapp',
      color: '#25D366',
      url: '',
    },
    {
      name: 'Pinterest',
      icon: 'pinterest',
      color: '#E60023',
      url: 'https://www.pinterest.com/',
    },
  ];
}
