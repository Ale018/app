import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PerfilResponse } from './../../shared/models/perfil.interface';
import { UsuariosService } from './services/usuarios.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsuariosDialogComponen } from './components/usuarios-dialog/usuarios-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  
  usuarios: PerfilResponse[] = []
  private destroy$ = new Subject<any>();
  
  constructor(private usuariosSvc: UsuariosService,
              private dialogSvc: DialogService,
              private messageSvc: MessageService) { }

  ngOnInit(): void {
    this.listar();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  listar(){
    this.usuariosSvc.getUsuarios()
    .pipe(takeUntil(this.destroy$))
    .subscribe((usuarios: PerfilResponse[])=> {
      this.usuarios = usuarios;
    });
  }

  onOpenModal (user: any = {} ) {
    var height = user.cveUsuario ? '80' : '';
    const ref = this.dialogSvc.open(UsuariosDialogComponen, {
      header: 'Agregar Usuario',
      width: '70%',
      height: height,
      data: {
        user: user
      }
    });

    ref.onClose.pipe(takeUntil(this.destroy$))
    .subscribe((result ) => {
    if (result){
      this.listar();
      this.messageSvc.add({
        severity: 'success',
        summary: result.message,
        detail: ''
      });
    }
    });

  }

  onDelete(cveUsuario: number) {
    Swal.fire({
      title:'',
      text: '¿Desea eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkBlue',
      cancelButtonColor: 'Si',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result)=> {
      if(result.isConfirmed){
        this.usuariosSvc.deleteUser(cveUsuario)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response)=>{
          if (response.code == 0) {
            this.messageSvc.add({
            severity: 'success',
            summary: response.message,
            detail: ''
        });
      this.listar();
      }
    });
  }
});
  }
}
