import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'task',
        data: { pageTitle: 'Tasks' },
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
      },
      {
        path: 'task-histories',
        data: { pageTitle: 'TaskHistories' },
        loadChildren: () => import('./task-histories/task-histories.module').then(m => m.TaskHistoriesModule),
      },
      {
        path: 'task-type',
        data: { pageTitle: 'TaskTypes' },
        loadChildren: () => import('./task-type/task-type.module').then(m => m.TaskTypeModule),
      },
      {
        path: 'position',
        data: { pageTitle: 'Positions' },
        loadChildren: () => import('./position/position.module').then(m => m.PositionModule),
      },
      {
        path: 'department',
        data: { pageTitle: 'Departments' },
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
      },
      {
        path: 'institution',
        data: { pageTitle: 'Institutions' },
        loadChildren: () => import('./institution/institution.module').then(m => m.InstitutionModule),
      },
      {
        path: 'nst-1-sector',
        data: { pageTitle: 'Nst1Sectors' },
        loadChildren: () => import('./nst-1-sector/nst-1-sector.module').then(m => m.Nst1SectorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
