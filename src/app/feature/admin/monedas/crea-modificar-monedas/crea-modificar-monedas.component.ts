import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Monedas } from 'src/app/shared/models/monedas';
import Swal from 'sweetalert2';
import { MonedasService } from '../../../../shared/services/monedas/monedas.service';
import {Storage, ref, uploadBytes, list, getDownloadURL} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { uploadBytesResumable } from 'firebase/storage';

@Component({
  selector: 'app-crea-modificar-monedas',
  templateUrl: './crea-modificar-monedas.component.html',
  styleUrls: ['./crea-modificar-monedas.component.css']
})
export class CreaModificarMonedasComponent implements OnInit {


  form!: FormGroup;
  archivos!: any[];
  previsualizacion!: string;
  moneda!: Monedas;
  hayErrores = false;
  mensajeError: string="";
  imagenUrl: string = "";

  constructor(private storage: Storage, private fb: FormBuilder,private router:Router, private sanitizer: DomSanitizer,  private activatedRoute: ActivatedRoute, private monedaService: MonedasService) {
    this.crearMoneda();
  }
  crearMoneda(){
    this.form = this.fb.group({
      idMoneda: ['', Validators.required],
      cantidad: ['', Validators.required],
      imgMonedas: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.crearMoneda();
    this.cargarMoneda();
    //this.getImagenStorage();
  }


  guardarMoneda(){
    this.hayErrores = false;
    const cantidad = this.form.value.cantidad;
    const imagenMoneda = this.imagenUrl;
    const usuarioCreador = this.form.value.usuarioCreador;
    let moneda: Monedas = {
      cantidad: cantidad, imgMonedas: this.imagenUrl, usuarioCreador: usuarioCreador,
      fechaCreacion: new Date()}
    this.monedaService.crearMoneda(moneda).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'La moneda se ha creado exitosamente.',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/monedas/listar-monedas'])
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  setMoneda(moneda: Monedas) {
    this.form.patchValue({
      idMoneda: moneda.idMoneda,
      cantidad: moneda.cantidad,
      imgMonedas: moneda.imgMonedas,
      usuarioCreador: moneda.usuarioCreador,
      fechaCreacion: moneda.fechaCreacion,
      usuarioModificador: moneda.usuarioModificador,
      fechaModificacion: moneda.fechaModificacion
    });
  }

  cargarMoneda(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.monedaService.consultarPorId(id).subscribe((data) => {
            this.moneda = data;
            this.setMoneda(this.moneda);
          });
        }
      }
    );
  }

  actualizar():void{
    const cantidad = this.form.value.cantidad;
    const imgMonedas = this.form.value.imgMonedas;
    const usuarioModificador = this.form.value.usuarioModificador;
    let moneda: Monedas = {
      idMoneda: this.form.value.idMoneda,cantidad: cantidad, imgMonedas: imgMonedas, usuarioModificador: usuarioModificador,
      fechaModificacion: new Date()}
    this.monedaService.actualizarMoneda(moneda).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'La moneda se ha actualizado exitosamente.',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/monedas/listar-monedas']);
    },  (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      });
    });
  }


  atras(){
    this.router.navigateByUrl('/admin/monedas/listar-monedas');
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    const imagenReferencia = ref(this.storage, `monedas/${file.name}`);
    const uploadTask = uploadBytesResumable(imagenReferencia, file.name);
    var urlImagen = "";
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       // console.log('El porcentaje de subida es de ' + progress + '%');
       switch (snapshot.state) {
        case 'paused':
          // console.log('La carga se ha pausado');
          break;
        case 'running':
          // console.log('La carga esta activa');
          break;
      }
    },
    (error) => {
      Swal.fire('Error', 'No se pudo cargar la foto', 'error');
    },() => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        this.imagenUrl = downloadURL;
      });
    }
   );

  }

  getImagenStorage(){
    const imagenReferencia = ref(this.storage, 'monedas');
    list(imagenReferencia)
      .then(async response => {
        //console.log(response);
          const urlImagen = await getDownloadURL(response.items[0]);
          console.log(urlImagen);
          //this.imagenUrl = urlImagen;

      })
      .catch(error => console.log(error));

  }


}
