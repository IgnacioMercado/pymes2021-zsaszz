import { Component, OnInit } from '@angular/core';
import { Empresas } from '../../models/Empresas';
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
  Accion: string = 'L';
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
    private contactoService: ContactoService,
    private modalDialogService: ModalDialogService
  ) { }

  ngOnInit() {}

  

}