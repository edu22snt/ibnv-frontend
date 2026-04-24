import { FormsModule } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FinanceiroService } from '../../services/financeiro-servico/financeiro.service';
import { HttpResponse } from '@angular/common/http';
import { IFinanceiro } from '../../entities/financeiro';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { RelatorioService } from '../../services/relatorio/relatorio.service';

@Component({
  selector: 'app-financeiro',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterLink,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
],
  templateUrl: './financeiro.component.html',
  styleUrl: './financeiro.component.scss'
})
export class FinanceiroComponent implements OnInit {

  displayedColumns: string[] = [
    'tipo',
    'categoria',
    'valor',
    'data',
    'descricao',
    'membro',
    'acoes'
  ];

  dataSource = new MatTableDataSource<IFinanceiro>();

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  searchItem = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: FinanceiroService,
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
      next: (res: HttpResponse<IFinanceiro[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  searchByKeyword(): void {
    this.pageIndex = 0;
    console.log('Parâmetro de busca:', this.searchItem);
    this.service.searchByKeyword(this.searchItem, this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<IFinanceiro[]>) => {
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
      next: () => {
        this.loadData();
        this.snackBar.open('Excluído com sucesso', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error: () => {
        this.snackBar.open('Erro ao excluir', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  new(): void {
    this.router.navigate(['/financeiro-form']);
  }
  
  imprimir(): void {
    this.relatorioService.relatorioFinanceiro(this.searchItem);
  }

}
