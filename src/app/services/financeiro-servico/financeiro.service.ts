import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { IFinanceiro } from '../../entities/financeiro';

export type EntityResponseType = HttpResponse<IFinanceiro>;
export type EntityArrayResponseType = HttpResponse<IFinanceiro[]>;

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  protected resourceUrl: string;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/Financeiro');
  }

  create(finance: IFinanceiro): Observable<EntityResponseType> {
    return this.http.post<IFinanceiro>(this.resourceUrl + '/save', finance, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFinanceiro>(`${this.resourceUrl}/repasse/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IFinanceiro[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IFinanceiro[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(finance: IFinanceiro): Observable<EntityResponseType> {
    return this.http.put<IFinanceiro>(
      `${this.resourceUrl}/update`, finance, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
