import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INst1Sector } from '../nst-1-sector.model';

@Component({
  selector: 'jhi-nst-1-sector-detail',
  templateUrl: './nst-1-sector-detail.component.html',
})
export class Nst1SectorDetailComponent implements OnInit {
  nst1Sector: INst1Sector | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nst1Sector }) => {
      this.nst1Sector = nst1Sector;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
