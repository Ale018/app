import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DepartmentResponse } from 'src/app/shared/models/departamento.interface';
import { DepartamentoService } from './services/departamento.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DepartamentoDialogComponent } from './components/departamento-dialog/departamento-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})
export class DepartamentosComponent implements OnInit, OnDestroy {
  departamentos: DepartmentResponse[] = []
  private destroy$ = new Subject<any>();

  constructor(
    private departamentosSvc: DepartamentoService,
    private dialogSvc: DialogService,
    private messageSvc: MessageService
    ) {}
  
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.listarDepas();
  }

  listarDepas(){
    this.departamentosSvc.getDepas()
    .pipe(takeUntil(this.destroy$))
    .subscribe((departamentos: DepartmentResponse[])=> {
      this.departamentos = departamentos;
    });
  }

  onOpenModal(depa: any = {}){
    const ref = this.dialogSvc.open(DepartamentoDialogComponent, {
      header: 'Agregar departamento',
      width: '70%',
      height: '90%',
      data: {
        depa: depa
      }
    });

    ref.onClose.pipe(takeUntil(this.destroy$))
    .subscribe((result) =>{
      if (result){
        this.listarDepas();
        this.messageSvc.add({
          severity: 'success',
          summary: result.message,
          detail: ''
        });
      }
    });

  }

  getTipoRenta(tipoRenta : number){
    let result= "";
    switch(tipoRenta){
      case 1:
        result= "Mensual";
        break;
      
      case 2:
        result= "Anual";
        break;

      case 3:
        result= "Sin Definir";
        break;
    }
    return result;
  }

  onDelete(cveDepartamento: number){
    Swal.fire({
      title: '',
      text: '¿Desea eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkBlue',
      cancelButtonColor: 'Si',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.isConfirmed){
        this.departamentosSvc.deleteDepa(cveDepartamento)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) =>{
          if (response){
            this.messageSvc.add({
            severity: 'success',
            summary: response.message,
            detail: ''
            });
            this.listarDepas();
          }
        });
      }
    });
  }
}
