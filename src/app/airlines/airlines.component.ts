import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
  airlines: any[] = [];
  pageSize = 25;
  page = 1;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 1;
      this.fetchAirlines();
    });
  }

  fetchAirlines() {
    axios.get(`https://api.instantwebtools.net/v1/airlines?page=${this.page}&size=${this.pageSize}`)
      .then(response => {
        this.airlines = response.data.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: this.page },
          queryParamsHandling: 'merge'
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  nextPage() {
    this.page++;
    this.fetchAirlines();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchAirlines();
    }
  }

  onAirlineClick(id: string) {
    this.router.navigate(['/airline-detail', id]);
  }
}
