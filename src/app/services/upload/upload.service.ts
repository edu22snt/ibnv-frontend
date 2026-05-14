import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { EntityResponseType } from '../financeiro/financeiro.service';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  protected resourceUrl: string;
  protected domain: string | undefined;
    
  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor(`${this.domain}/api/upload`);
  }

  uploadImagemNotaFiscal(id: number, arquivo: File): Observable<EntityResponseType> {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    return this.http.post<any>(`${this.resourceUrl}/notaFiscal/${id}/imagem`,formData,{observe: 'response'});
  }
}
