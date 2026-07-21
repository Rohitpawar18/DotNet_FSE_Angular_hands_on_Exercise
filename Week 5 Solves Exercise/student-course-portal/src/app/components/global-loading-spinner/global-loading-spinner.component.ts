import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-global-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-loading-spinner.component.html',
  styleUrl: './global-loading-spinner.component.css',
})
export class GlobalLoadingSpinnerComponent {
  isLoading$: Observable<boolean>;

  constructor(private loadingService: LoadingService) {
    this.isLoading$ = this.loadingService.getLoading$();
  }
}
