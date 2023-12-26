import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgTinyUrlService } from 'ng-tiny-url';
import { ShortenedUrlsService } from '../services/shortened-urls.service';
import { UrlCardComponent } from '../url-card/url-card.component';

export interface URLData {
  id?: number;
  title: string;
  shortenedUrl: string;
  inputUrl: string;
  postDate: string;
  urlLogo: string;
  stared: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, UrlCardComponent],
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
  searchTerm: string = '';
  filterStaredUrls: boolean = false;

  model: URLData = {
    title: `Untitled ${this.date}`,
    shortenedUrl: '',
    inputUrl: '',
    postDate: new Date().toDateString(),
    urlLogo: 'assets/images/urlIcon.svg',
    stared: false,
  };

  urlsData: Array<URLData> = [];

  constructor(
    private _ngTinyUrlService: NgTinyUrlService,
    private _saveUrl: ShortenedUrlsService
  ) {}

  ngOnInit(): void {
    this.getSavedUrls(this.searchTerm);
    this.urlsData?.reverse();
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
              this.getSavedUrls(this.searchTerm);
              this.model.inputUrl = '';
            },
            error: (error) => {
              console.log(error.message);
            },
          });
        },
        error: () => {
          this.isLoading = false;
          alert('Something went wrong! Please, check your url and try again.');
        },
      });
    } else {
      this.isLoading = false;
      alert('Please enter or paste a URL');
    }
  }

  getSavedUrls(searchTerm: string) {
    this._saveUrl.getSavedUrls(searchTerm).subscribe({
      next: (response: Array<URLData>) => {
        this.urlsData = response;
        this.urlsData.reverse();
      },
      error: (error: any) => {
        console.log(error.message);
      },
    });
  }

  handleFilterUrls(event: any) {
    this.searchTerm = event.target.value;
    this.getSavedUrls(this.searchTerm);
  }

  deleteUrl(id: number) {
    this._saveUrl.deleteUrl(id).subscribe({
      next: () => {
        this.getSavedUrls(this.searchTerm);
        alert('Successfully deleted!');
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  updateUrl(id: number) {
    console.log('Item Id: ', id);
    console.log(this.model);

    // this._saveUrl.updateUrl(id, this.model).subscribe({
    //   next: () => {
    //     this.getSavedUrls();
    //     alert('Successfully Updated!');
    //   },
    //   error: (error) => {
    //     console.log(error.message);
    //   },
    // });
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
      alert('An error occured while copying. Please, try again!');
    }
  }

  handleStarUrl(id: number) {
    this.model.stared = !this.model.stared;

    const updateObject = { stared: this.model.stared };

    this._saveUrl.updateUrl(id, updateObject).subscribe({
      next: () => {
        this.getSavedUrls(this.searchTerm);
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  handleFilterUrlsByStared() {
    this.filterStaredUrls = !this.filterStaredUrls;
    let urlsDataCopied = [...this.urlsData];

    const staredUrls = urlsDataCopied?.filter((url) => url.stared);

    if (this.filterStaredUrls) {
      [...this.urlsData] = staredUrls;
    } else {
      this.getSavedUrls(this.searchTerm);
    }
  }
}
