import { Component, OnInit } from '@angular/core';
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
export class DashboardComponent implements OnInit {
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

  constructor(private _ngTinyUrlService: NgTinyUrlService, private _saveUrl: ShortenedUrlsService) {}

  ngOnInit(): void {
    this.getSavedUrls();
  }

  handleOnSubmit() {
    this.isLoading = true;
    if (this.model.inputUrl !== '') {
      this._ngTinyUrlService.shorten(this.model.inputUrl).subscribe({
        next: (shortUrl) => {
          this.model.shortenedUrl = shortUrl;
          this.isFormSubmitted = true;
          this.isLoading = false;

          this._saveUrl.saveUrlToDatebase(this.model).subscribe({
            next: () => {
              this.getSavedUrls();
            }, 
            error: (error) => {
              console.log(error.message);
            }
          })
        },
        error: (error) => {
          this.isLoading = false;
          alert('Something went wrong! Please, check your url and try again.');
          console.error('Error occurred while shortening URL:', error);
        },
      });
    } else {
      this.isLoading = false;
      alert('Please enter or paste a URL');
    }
  }

  getSavedUrls() {
    this._saveUrl.getSavedUrls().subscribe({
      next: (response: any) => {
        this.urlsData = response;
      }, 
      error: (error: any) => {
        console.log(error.message);
        
      }
    })
  }

  handleCopyUrl(shortenedUrlElementRef: any) {
    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('value', shortenedUrlElementRef.innerHTML);
    inputElement.select();
    inputElement.setSelectionRange(0, 999999); // This is for mobile selection.

    try {
      navigator.clipboard.writeText(inputElement.value);
      this.isTextCopied = true;

      setTimeout(() => {
        this.isTextCopied = false;
      }, 2000);
    } catch (error) {
      console.warn(error);
    }
  }
}
