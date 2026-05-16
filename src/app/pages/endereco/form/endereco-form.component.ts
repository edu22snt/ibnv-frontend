import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardTitle, MatCardContent, MatCardActions, MatCardModule } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { IEndereco } from '../../../entities/endereco';
import { EnderecoService } from '../../../services/endereco/endereco.service';
import { IPais } from '../../../entities/pais';
import { ICidade } from '../../../entities/cidade';
import { IEstado } from '../../../entities/estado';
import { PaisService } from '../../../services/pais/pais.service';
import { EstadoService } from '../../../services/estado/estado.service';
import { CidadeService } from '../../../services/cidade/cidade.service';

@Component({
  selector: 'app-endereco-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatCardActions,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './endereco-form.component.html',
  styleUrl: './endereco-form.component.scss'
})
export class EnderecoFormComponent implements OnInit {

    form: FormGroup;
    isViewMode = false;
    isEditMode = false;
    paises: IPais[] = [];
    estados: IEstado[] = [];
    cidades: ICidade[] = [];

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private service: EnderecoService,
      private servicePais: PaisService,
      private serviceEstado: EstadoService,
      private serviceCidade: CidadeService
    ) {
    this.form = this.fb.group({
      id: [''],
      descricao: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      pais: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.routeConfig?.path;
    this.isViewMode = url?.includes('view') || false;
    this.isEditMode = url?.includes('edit') || false;

    if (id) {
      this.loadById(+id);
    }
    if (this.isViewMode) {
      this.form.disable();
    }
    this.loadPais();  
  }

  salvar(): void {
    if (this.form.valid) {
      const objeto: IEndereco = this.form.value;
      objeto.pais = this.form.get('pais')?.value.nome;
      objeto.estado = this.form.get('estado')?.value.nome;
      objeto.cidade = this.form.get('cidade')?.value.nome;

      this.service.create(objeto).subscribe({
        next: () => {
        this.voltar();
        this.snackBar.open('Salvo com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        },
        error: () => {
        this.snackBar.open('Erro ao salvar', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        }
      });
    }
  }

  update(): void {
    if (this.form.valid) {
      const objeto: IEndereco = this.form.value;
      this.service.update(objeto).subscribe({
        next: () => {
        this.voltar();
        this.snackBar.open('Alterado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        },
        error: () => {
        this.snackBar.open('Erro ao alterar', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        }
      });
    }
  }

  voltar(): void {
    this.form.reset();
    this.router.navigate(['/endereco']);
  }  

  loadById(id: number): void {
    this.service.find(id).subscribe(res => {
      console.log('Dados carregados:', res);
      if (res.body) {
        const data = res.body;

        this.form.patchValue({
          ...data,
        });
      }
    });
  }

  loadPais(): void {
    this.servicePais.findAllNotPage().subscribe({
      next: (data) => {
        this.paises = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de paises', error);
      }
    });
  }

  loadEstados(id: number): void {
    this.serviceEstado.findByPaisId(id).subscribe({
      next: (data) => {
        this.estados = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de estados', error);
      }
    });
  }

  loadCidades(id: number): void {
    this.serviceCidade.findByEstadoId(id).subscribe({
      next: (data) => {
        this.cidades = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de cidades', error);
      }
    });
  }

  formatarTelefone(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');

    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');

    valor = valor.substring(0, 15);

    this.form.get('telefone')?.setValue(valor, {
      emitEvent: false
    });
  }

}
