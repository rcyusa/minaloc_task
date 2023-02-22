import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { Nst1SectorComponent } from './list/nst-1-sector.component';
import { Nst1SectorDetailComponent } from './detail/nst-1-sector-detail.component';
import { Nst1SectorUpdateComponent } from './update/nst-1-sector-update.component';
import { Nst1SectorDeleteDialogComponent } from './delete/nst-1-sector-delete-dialog.component';
import { Nst1SectorRoutingModule } from './route/nst-1-sector-routing.module';

@NgModule({
  imports: [SharedModule, Nst1SectorRoutingModule],
  declarations: [Nst1SectorComponent, Nst1SectorDetailComponent, Nst1SectorUpdateComponent, Nst1SectorDeleteDialogComponent],
})
export class Nst1SectorModule {}
