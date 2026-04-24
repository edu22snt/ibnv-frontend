import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { IMembro } from '../../entities/membro';

export type EntityResponseType = HttpResponse<IMembro>;
export type EntityArrayResponseType = HttpResponse<IMembro[]>;

@Injectable({
  providedIn: 'root'
})
export class MembroService {

  protected resourceUrl: string;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('http://localhost:8080/api/membro');
  }

  create(membro: IMembro): Observable<EntityResponseType> {
    return this.http.post<IMembro>(this.resourceUrl + '/save', membro, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMembro>(`${this.resourceUrl}/membro/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IMembro[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IMembro[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(membro: IMembro): Observable<EntityResponseType> {
    return this.http.put<IMembro>(`${this.resourceUrl}/update`, membro, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
