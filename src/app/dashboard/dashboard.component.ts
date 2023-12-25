import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTinyUrlService } from 'ng-tiny-url';
import { ShortenedUrlsService } from '../services/shortened-urls.service';

interface URLData {
  title: string;
  shortenedUrl: string;
  inputUrl: string;
  date: string;
  urlLogo: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  title = 'Shortingo';
  brandImageUrl: string = 'assets/images/Shortingo.svg';
  linkIconUrl: string = 'assets/images/link.svg';

  date: string = new Date().toISOString();
  isFormSubmitted = false;
  isLoading = false;
  isTextCopied = false;
  shortenedUrl = '';

  model: URLData = {
    title: `Untitled ${this.date}`,
    shortenedUrl: '',
    inputUrl: '',
    date: new Date().toDateString(),
    urlLogo: '',
  };

  urlsData: Array<object> = [];

  constructor(
    private _ngTinyUrlService: NgTinyUrlService,
    private _saveUrl: ShortenedUrlsService
  ) {}

  handleOnSubmit() {}
}
