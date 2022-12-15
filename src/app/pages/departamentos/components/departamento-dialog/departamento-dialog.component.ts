import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { Baseform } from 'src/app/shared/utils/base-form';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Tipo } from 'src/app/shared/models/tipo.interface';

enum Action {
  NEW = 'newDepartamento',
  EDIT = 'editDepartamento'
}

@Component({
  selector: 'app-departamento-dialog',
  templateUrl: './departamento-dialog.component.html',
  styleUrls: ['./departamento-dialog.component.scss']
})
export class DepartamentoDialogComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<any>();
  actionTODO = Action.NEW;
  titleButton = "Guardar";
  tipos: Tipo[] = [];

  depaForm = this.fb.group({
    cveDepartamento: [''],
    condominio: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]],
    direccion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
    tipoRenta: [1, [Validators.required]]
  });

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private fb: FormBuilder,
              public baseForm: Baseform,
              private departamentoSvc: DepartamentoService){
                this.tipos =[
                  {tipoRenta: 1, nombre: 'Mensual' },
                  {tipoRenta: 2, nombre: 'Anual' },
                  {tipoRenta: 3, nombre: 'Sin definir'}
                ]
              }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    if (this.config.data.depa.cveDepartamento) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Actualizar";
      this.patchFormData();
    }
  }

  patchFormData() {
    var depa = this.config.data.depa;

    this.depaForm.patchValue({
      cveDepartamento: depa.cveDepartamento,
      condominio: depa.condominio,
      direccion: depa.direccion,
      tipoRenta: depa.tipoRenta
    })
    this.depaForm.get("condominio")?.setValidators(null);
    this.depaForm.get("direccion")?.setValidators(null);
    this.depaForm.get("tipoRenta")?.setValidators(null);
    this.depaForm.updateValueAndValidity();
  }

  onSave(){
    const data = this.depaForm.getRawValue();
    if(this.actionTODO == Action.NEW){
      const { cveDepartamento, ...newDepa } = data;
    this.departamentoSvc.newDepa(newDepa)
    .pipe(takeUntil(this.destroy$))
    .subscribe( (result) =>{
      if (result.code == 0) this.ref.close(result);
    });
    }else{
    //update
    this.departamentoSvc.editDepa(data)
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) =>{
      if (result.code == 0) this.ref.close(result);
    });
   }
  }
}
