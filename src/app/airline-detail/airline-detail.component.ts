import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-airline-detail',
  templateUrl: './airline-detail.component.html',
  styleUrls: ['./airline-detail.component.css']
})
export class AirlineDetailComponent implements OnInit {
  airlineId: string = '';
  airline: any;
  passengers: any[] = [];
  pageSize = 25;
  page = 1;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.airlineId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getAirline();
    this.getPassengers();
  }

  getAirline() {
    axios.get(`https://api.instantwebtools.net/v1/airlines/${this.airlineId}`).then(response => {
      this.airline = response.data;
    });
  }

  getPassengers() {
    axios.get(`https://api.instantwebtools.net/v1/passenger`).then(response => {
        this.passengers = response.data;
      });
  }

  nextPage() {
    this.page++;
    this.getPassengers();
  }

  prevPage() {
    this.page--;
    this.getPassengers();
  }
}
