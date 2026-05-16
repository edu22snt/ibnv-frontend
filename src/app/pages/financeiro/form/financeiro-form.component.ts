import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardActions, MatCardContent, MatCardTitle, MatCard, MatCardModule } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelect, MatOption } from "@angular/material/select";
import { NgxCurrencyDirective } from 'ngx-currency';
import { FinanceiroService } from '../../../services/financeiro/financeiro.service';
import { IFinanceiro } from '../../../entities/financeiro';
import { UploadService } from '../../../services/upload/upload.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IMembro } from '../../../entities/membro';
import { MembroService } from '../../../services/membro/membro.service';

@Component({
  selector: 'app-financeiro-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    NgxCurrencyDirective,

],
  templateUrl: './financeiro-form.component.html',
  styleUrl: './financeiro-form.component.scss'
})
export class FinanceiroFormComponent implements OnInit {

  form: FormGroup;
  isViewMode = false;
  isEditMode = false;
  selectedFile!: File;
  fileName: string = '';
  errorMessage: string = '';
  membros: IMembro[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private service: FinanceiroService,
    private uploadService: UploadService,
    private membroService: MembroService
  ) {
    this.form = this.fb.group({
      id: [''],
      tipo: ['', Validators.required],
      categoria: ['', Validators.required],
      valor: ['', Validators.required],
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      membro: [''],
      notaFiscal: ['']
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
    this.loadMembros();
  }

  salvar(): void {
    if (this.form.valid) {
      const financeiro: IFinanceiro = this.form.value;
      this.service.create(financeiro).subscribe({
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
      const financeiro: IFinanceiro = this.form.value;
      this.service.update(financeiro).subscribe({
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
    this.router.navigate(['/prestacao-servico']);
  }

  loadById(id: number): void {
    this.service.find(id).subscribe(res => {
      console.log('Dados carregados:', res);
      if (res.body) {
        this.form.patchValue(res.body);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    if (!this.selectedFile) return;

    if (!this.selectedFile.name.endsWith('.xlsx')) {
      this.errorMessage = 'Apenas arquivos .xlsx são permitidos';
      this.selectedFile = undefined!;
      this.fileName = '';
      return;
    }

    this.errorMessage = '';
    this.selectedFile = this.selectedFile;
    this.fileName = this.selectedFile.name;
  }

  upload(): void {
    this.uploadService.uploadImagemNotaFiscal(1, this.selectedFile).subscribe({
      next: response => {
        console.log('Upload realizado', response);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  loadMembros(): void {
    this.membroService.findAllNotPage().subscribe({
      next: (data) => {
        this.membros = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de membros', error);
      }
    });
  }

  reset() {
    this.selectedFile = undefined!;
    this.fileName = '';
  }

}
