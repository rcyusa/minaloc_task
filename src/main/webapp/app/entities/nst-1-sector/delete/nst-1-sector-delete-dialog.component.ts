import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INst1Sector } from '../nst-1-sector.model';
import { Nst1SectorService } from '../service/nst-1-sector.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './nst-1-sector-delete-dialog.component.html',
})
export class Nst1SectorDeleteDialogComponent {
  nst1Sector?: INst1Sector;

  constructor(protected nst1SectorService: Nst1SectorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.nst1SectorService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
