import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';
import { ICidade } from '../../entities/cidade';

export type EntityResponseType = HttpResponse<ICidade>;
export type EntityArrayResponseType = HttpResponse<ICidade[]>;

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor(`${this.domain}/api/cidade`);
  }

  create(cidade: ICidade): Observable<EntityResponseType> {
    return this.http.post<ICidade>(this.resourceUrl + '/save', cidade, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICidade>(`${this.resourceUrl}/repasse/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<ICidade[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  findAllNotPage(): Observable<ICidade[]> {
    return this.http.get<ICidade[]>(`${this.resourceUrl}/findAllNotPage`);
  }

  findByEstadoId(id: number): Observable<ICidade[]> {
    return this.http.get<ICidade[]>(`${this.resourceUrl}/findByEstadoId/${id}`);
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<ICidade[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(cidade: ICidade): Observable<EntityResponseType> {
    return this.http.put<ICidade>(
      `${this.resourceUrl}/update`, cidade, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
