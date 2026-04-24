import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { ICelula } from '../../entities/celula';

export type EntityResponseType = HttpResponse<ICelula>;
export type EntityArrayResponseType = HttpResponse<ICelula[]>;

@Injectable({
  providedIn: 'root'
})
export class CelulaService {

  protected resourceUrl: string;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/celula');
  }

  create(membro: ICelula): Observable<EntityResponseType> {
    return this.http.post<ICelula>(this.resourceUrl + '/save', membro, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICelula>(`${this.resourceUrl}/celula/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<ICelula[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<ICelula[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(membro: ICelula): Observable<EntityResponseType> {
    return this.http.put<ICelula>(`${this.resourceUrl}/update`, membro, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
