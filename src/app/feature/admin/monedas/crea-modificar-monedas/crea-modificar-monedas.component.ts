import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Monedas } from 'src/app/shared/models/monedas';
import Swal from 'sweetalert2';
import { MonedasService } from '../../../../shared/services/monedas/monedas.service';

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
  constructor(private fb: UntypedFormBuilder,private router:Router, private sanitizer: DomSanitizer,  private activatedRoute: ActivatedRoute, private monedaService: MonedasService) {
    this.crearMoneda();
  }
  crearMoneda(){
    this.form = this.fb.group({
      cantidad: ['', Validators.required],
      imagenMoneda: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.crearMoneda();
    this.cargarMoneda();
  }

  guardarMoneda(){
    this.hayErrores = false;
    const cantidad = this.form.value.cantidad;
    const imagenMoneda = this.form.value.imagenMoneda;
    const usuarioCreador = this.form.value.usuarioCreador;
    let moneda: Monedas = {
      cantidad: cantidad, imgMoneda: imagenMoneda, usuarioCreador: usuarioCreador,
      fechaCreacion: new Date(),
    }
    this.monedaService.crearMoneda(moneda).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'La moneda se ha creado Exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/monedas/listar-monedas'])
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;

      Swal.fire({
        icon: 'error',
        title: e.error,
        showConfirmButton: false,
        timer: 1500
      });
    });



  }

  capturarFile(event: any): any {
    //console.log(event.target.files[0]);
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado);
    this.archivos = archivoCapturado;
    console.log(this.archivos)
    //this.archivos.push(archivoCapturado);
    /**
     * var pdrs = document.getElementById('file-upload').files[0].name;
    document.getElementById('info').innerHTML = pdrs;
     */

  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror =error =>{
        resolve({
          base: null

        });
      };

    }catch(e){
      return null;
    }
  })


  setMoneda(moneda: Monedas) {
    this.form.setValue({
      cantidad: moneda.cantidad,
      imagen: moneda.imgMoneda,
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
    const imagenMoneda = this.form.value.imagenMoneda;
    const usuarioModificador = this.form.value.usuarioModificador;
    let moneda: Monedas = {
      cantidad: cantidad, imgMoneda: imagenMoneda, usuarioModificador: usuarioModificador,
      fechaModificacion: new Date(),
    }
    this.moneda.idMonedas = this.form.value.idMoneda;
    this.monedaService.actualizarMoneda(moneda).subscribe(()=>{
      this.router.navigateByUrl('/admin/moneda/listar-monedas');
    })
  }


  atras(){
    this.router.navigateByUrl('/admin/monedas/listar-monedas');
  }


}
