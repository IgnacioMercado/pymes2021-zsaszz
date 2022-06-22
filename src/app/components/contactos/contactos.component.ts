import { Component, OnInit } from '@angular/core';
import { Contactos } from '../../models/contactos';
import { ContactosService } from '../../services/contactos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDialogService } from '../../services/modal-dialog.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  Items: Contactos[] = [];
  Mostrar: string = 'L';
  FormAlta: FormGroup = new FormGroup({
    Nombre: new FormControl('', [Validators.required]),
    FechaNacimiento: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)[0-9]{2}'
      ),
    ]),
    Telefono: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{9}'),
    ]),
  });

  constructor(
    private contactoService: ContactosService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {}

  getContactos() {
    this.contactoService.get().subscribe((res: Contactos[]) => {
      this.Items = res;
    });
    console.log(this.Items);
  }

  grabarContacto() {
    const itemCopy = { ...this.FormAlta.value };
    var arrFecha = itemCopy.FechaNacimiento.substr(0 - 10).split('/');
    itemCopy.FechaNacimiento = new Date(
      arrFecha[2],
      arrFecha[1] - 1,
      arrFecha[0]
    ).toISOString();
    this.contactoService.post(itemCopy).subscribe((res: any) => {
      this.modalDialogService.Alert('Contacto agregado correctamente');
      this.mostrarListado();
    });
  }

  mostrarAlta() {
    this.Mostrar = 'A';
  }
  mostrarListado() {
    this.Mostrar = 'L';
    this.getContactos();
    this.FormAlta.reset();
  }
}