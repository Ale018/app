import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoDialogComponent } from './departamento-dialog.component';

describe('DepartamentoDialogComponent', () => {
  let component: DepartamentoDialogComponent;
  let fixture: ComponentFixture<DepartamentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
