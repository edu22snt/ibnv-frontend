import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { IMinisterio } from '../../entities/ministerio';
import { environment } from '../../core/environments/environment';

export type EntityResponseType = HttpResponse<IMinisterio>;
export type EntityArrayResponseType = HttpResponse<IMinisterio[]>;

@Injectable({
  providedIn: 'root'
})
export class MinisterioService {
  protected resourceUrl: string;
  protected domain: string | undefined;
  
  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor(`${this.domain}/api/ministerio`);
  }

  create(membro: IMinisterio): Observable<EntityResponseType> {
    return this.http.post<IMinisterio>(this.resourceUrl + '/save', membro, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMinisterio>(`${this.resourceUrl}/ministerio/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IMinisterio[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IMinisterio[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(membro: IMinisterio): Observable<EntityResponseType> {
    return this.http.put<IMinisterio>(`${this.resourceUrl}/update`, membro, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
