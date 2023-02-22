import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Nst1SectorFormService, Nst1SectorFormGroup } from './nst-1-sector-form.service';
import { INst1Sector } from '../nst-1-sector.model';
import { Nst1SectorService } from '../service/nst-1-sector.service';

@Component({
  selector: 'jhi-nst-1-sector-update',
  templateUrl: './nst-1-sector-update.component.html',
})
export class Nst1SectorUpdateComponent implements OnInit {
  isSaving = false;
  nst1Sector: INst1Sector | null = null;

  editForm: Nst1SectorFormGroup = this.nst1SectorFormService.createNst1SectorFormGroup();

  constructor(
    protected nst1SectorService: Nst1SectorService,
    protected nst1SectorFormService: Nst1SectorFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ nst1Sector }) => {
      this.nst1Sector = nst1Sector;
      if (nst1Sector) {
        this.updateForm(nst1Sector);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const nst1Sector = this.nst1SectorFormService.getNst1Sector(this.editForm);
    if (nst1Sector.id !== null) {
      this.subscribeToSaveResponse(this.nst1SectorService.update(nst1Sector));
    } else {
      this.subscribeToSaveResponse(this.nst1SectorService.create(nst1Sector));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INst1Sector>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(nst1Sector: INst1Sector): void {
    this.nst1Sector = nst1Sector;
    this.nst1SectorFormService.resetForm(this.editForm, nst1Sector);
  }
}
