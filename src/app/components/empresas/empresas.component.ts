import { Component, OnInit } from '@angular/core';
import { Empresas } from '../../models/empresas';
import { EmpresasService } from '../../services/Empresas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';



@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  Items: Empresas[] = [];
  accion: string = 'L';
  FormAlta: FormGroup = new FormGroup({
    IdEmpresa: new FormControl(0),
    RazonSocial: new FormControl('', [Validators.required]),
    CantidadEmpleados: new FormControl('', [
      Validators.pattern('[0-9]{1,6}'),
      Validators.required,
    ]),
    FechaFundacion: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)[0-9]{2}'
      ),
    ]),
  });



  constructor(
    private empresasService: EmpresasService,
    private modalDialogService: ModalDialogService
  ) { }

  ngOnInit() {
    this.GetEmpresas();
  }

  ocultarTabla(){
    this.accion = 'A';
  }

  grabar() {
    if (this.FormAlta.invalid) {
      return;
    }

      const itemCopy = { ...this.FormAlta.value };
      var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split('/');
      itemCopy.FechaFundacion = new Date(
        arrFecha[2],
        arrFecha[1] - 1,
        arrFecha[0]
      ).toISOString();
      console.log(itemCopy);
      this.empresasService.post(itemCopy).subscribe((res: any) => {
        this.mostrarTabla();
        this.modalDialogService.Alert('Empresa agregado correctamente.');
        this.GetEmpresas();
      });
  }

  mostrarTabla() {
    this.FormAlta.reset();
    this.accion = 'L';
  }

  Eliminar(item) {
    var resp = confirm(
      '¿Esta seguro de eliminar el registro de la empresa "' +
        item.RazonSocial +
        '"?'
    );
    if (resp) {
      this.empresasService.delete(item.IdEmpresa).subscribe((res: any) => {
        this.modalDialogService.Alert('Registro eliminado correctamente');
        this.GetEmpresas();
      });
    }
  }

  Modificar(Item) {
    this.accion = 'M';
    this.empresasService.getById(Item.IdEmpresa).subscribe((res: any) => {
      this.FormAlta.patchValue(res);
      var arrFecha = res.FechaFundacion.substr(0, 10).split('-');
      this.FormAlta.controls.FechaFundacion.patchValue(
        arrFecha[2] + '/' + arrFecha[1] + '/' + arrFecha[0]
      );
    });
  }

  modificarEmpresa() {
    const itemCopy = { ...this.FormAlta.value };
    console.log(itemCopy);
    var arrFecha = itemCopy.FechaFundacion.substr(0, 10).split('/');
    itemCopy.FechaFundacion = new Date(
      arrFecha[2],
      arrFecha[1] - 1,
      arrFecha[0]
    ).toISOString();
    console.log('ID');
    this.empresasService
      .put(itemCopy, itemCopy.IdEmpresa)
      .subscribe((res: any) => {
        this.mostrarTabla();
        this.modalDialogService.Alert('Empresa modificada correctamente.');
        this.GetEmpresas();
      });
  }


  GetEmpresas() {
    this.empresasService.get().subscribe((res: Empresas[]) => {
      this.Items = res;
    });
  }
}