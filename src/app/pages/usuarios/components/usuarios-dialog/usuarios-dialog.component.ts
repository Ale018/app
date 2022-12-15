import { UsuariosService } from './../../services/usuarios.service';
import { User } from './../../../../shared/models/user.interface';
import { Baseform } from './../../../../shared/utils/base-form';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Rol } from 'src/app/shared/models/rol.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
  styleUrls: ['./usuarios-dialog.component.scss']
})
export class UsuariosDialogComponen implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();
  actionTODO = Action.NEW;
  titleButton = "Guardar";
  roles: Rol[] = [];

  userForm =this.fb.group({
    cveUsuario: [''],
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(450)]],
    username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
    password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]],
    rol: ['admin', [Validators.required]]
  });

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              private fb: FormBuilder,
              public baseForm: Baseform,
              private userSvc: UsuariosService) {
                this.roles =[
                  { rol: '', nombre: 'Administrador'},
                  {rol: 'ventas', nombre: 'Ventas'}
                ]
               }

  ngOnInit(): void {
    if (this.config.data.user.cveUsuario) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Actualizar";

      this.patchFormData();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
   patchFormData() {
    var user = this.config.data.user;

     this.userForm.patchValue({
      cveUsuario: user.cveUsuario,
      nombre: user.nombre,
      apellidos:user.apellidos,
      username: "",
      password: "",
      rol:""
     })

     this.userForm.get("username")?.setValidators(null);
     this.userForm.get("password")?.setValidators(null);
     this.userForm.get("rol")?.setValidators(null);
     this.userForm.updateValueAndValidity();
   }

  onSave(){
    const data = this .userForm.getRawValue();

     if (this.actionTODO == Action.NEW){ //insert
      const { cveUsuario, ...newUser} =data;
      this.userSvc.newUser(newUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (result ) => {
        if (result.code == 0) this.ref.close(result);
      });
     }else{
      //update
      const { username, password, rol, ... editUser } = data;
      this.userSvc.editUser(editUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) =>{
        if (result.code == 0) this.ref.close(result);
      });
     }
  }

}
