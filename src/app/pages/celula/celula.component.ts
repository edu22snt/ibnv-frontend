import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ICelula } from '../../entities/celula';
import { RelatorioService } from '../../services/relatorio/relatorio.service';
import { CelulaService } from '../../services/celula/celula.service';
import { HttpResponse } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-celula',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './celula.component.html',
  styleUrl: './celula.component.scss'
})
export class CelulaComponent implements OnInit {

  displayedColumns: string[] = [
    'nome',
    'lideres',
    'diaSemana',
    'horario',
    'anfitriao',
    'acoes'
  ];

  dataSource = new MatTableDataSource<ICelula>();

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  searchItem = '';
  totalComissaoGi3 = 0;
  totalComissaoLiquida = 0

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: CelulaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private relatorioService: RelatorioService

  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.findAll(this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<ICelula[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  searchByKeyword(): void {
    this.pageIndex = 0;
    this.service.searchByKeyword(this.searchItem, this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<ICelula[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  private clearList(): void {
    this.dataSource.data = [];
  }

  protected onSuccess(data: any): void {
    this.clearList();
    this.dataSource.data = [...(data?.content || [])];
    this.totalElements = data?.totalElements || 0;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe({
      next: (res) => {
        console.log('Resposta da exclusão:', res);
        this.loadData();
        this.snackBar.open('Excluído com sucesso', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error: (err) => {
        console.error('Erro ao excluir:', err);
        this.snackBar.open('Erro ao excluir', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  new(): void {
    this.router.navigate(['/celula-form']);
  }

  imprimir(): void {
    this.relatorioService.relatorioCelula(this.searchItem);
  }

}
