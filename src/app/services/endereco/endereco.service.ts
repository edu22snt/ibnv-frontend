import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';
import { IEndereco } from '../../entities/endereco';

export type EntityResponseType = HttpResponse<IEndereco>;
export type EntityArrayResponseType = HttpResponse<IEndereco[]>;

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor(`${this.domain}/api/endereco`);
  }

  create(endereco: IEndereco): Observable<EntityResponseType> {
    return this.http.post<IEndereco>(this.resourceUrl + '/save', endereco, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEndereco>(`${this.resourceUrl}/repasse/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IEndereco[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IEndereco[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(endereco: IEndereco): Observable<EntityResponseType> {
    return this.http.put<IEndereco>(
      `${this.resourceUrl}/update`, endereco, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
