import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { environment } from '../../core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  protected resourceUrl: string;
  protected domain: string | undefined;
  
  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor(`${this.domain}/api/relatorio`);
  }

  relatorioFinanceiro(param: string): void {
    this.http.get(`${this.resourceUrl}/financeiro?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);

    });
  }

  relatorioMembros(param: string): void {
    this.http.get(`${this.resourceUrl}/membros?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);

    });
  }

  relatorioCelula(param: string): void {
    this.http.get(`${this.resourceUrl}/celula?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);

    });
  }

  relatorioEventos(param: string): void {
    this.http.get(`${this.resourceUrl}/eventos?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);

    });
  }

  relatorioMinisterios(param: string): void {
    this.http.get(`${this.resourceUrl}/ministerios?param=${param}`, {
      responseType: 'blob'
    }).subscribe((blob: Blob) => {

      const url = window.URL.createObjectURL(blob);
      window.open(url);

    });
  }

}
