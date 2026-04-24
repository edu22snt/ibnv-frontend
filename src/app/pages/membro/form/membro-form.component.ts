import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardTitle, MatCardContent, MatCardActions, MatCardModule } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";
import { NgxCurrencyDirective } from 'ngx-currency';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MembroService } from '../../../services/membro/membro.service';
import { IMembro } from '../../../entities/membro';

@Component({
  selector: 'app-membro-form',
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
    NgxCurrencyDirective,
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
  templateUrl: './membro-form.component.html',
  styleUrl: './membro-form.component.scss'
})
export class MembroFormComponent implements OnInit {

    form: FormGroup;
    isViewMode = false;
    isEditMode = false;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private service: MembroService
    ) {
    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      endereco: [''],
      ativo: [''],
      dataCadastro: ['']
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
  }

  salvar(): void {
    if (this.form.valid) {
      const membro: IMembro = this.form.value;
      this.service.create(membro).subscribe({
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
      const membro: IMembro = this.form.value;
      this.service.update(membro).subscribe({
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
    this.router.navigate(['/repasse-bancorbras']);
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

}
