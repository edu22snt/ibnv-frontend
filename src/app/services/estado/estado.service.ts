import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';
import { IEstado } from '../../entities/estado';

export type EntityResponseType = HttpResponse<IEstado>;
export type EntityArrayResponseType = HttpResponse<IEstado[]>;

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  protected resourceUrl: string;
  protected domain: string | undefined;

  constructor(
    private http: HttpClient,
    protected applicationConfigService: ApplicationConfigService
  ) {
    this.domain = environment.domain;
    this.resourceUrl = this.applicationConfigService.getEndpointFor(`${this.domain}/api/estado`);
  }

  create(estado: IEstado): Observable<EntityResponseType> {
    return this.http.post<IEstado>(this.resourceUrl + '/save', estado, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEstado>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  findAll(page: number = 0, size: number = 10) {
    return this.http.get<IEstado[]>(`${this.resourceUrl}/findAll?page=${page}&size=${size}`, { observe: 'response' }
    );
  }
  
  findByPaisId(id: number): Observable<IEstado[]> {
    return this.http.get<IEstado[]>(`${this.resourceUrl}/findByPaisId/${id}`);
  } 

  searchByKeyword(param: string, page: number = 0, size: number = 10): Observable<EntityArrayResponseType> {
    return this.http.get<IEstado[]>(`${this.resourceUrl}/searchByKeyword?param=${encodeURIComponent(param)}&page=${page}&size=${size}`, { observe: 'response' });
  }

  update(estado: IEstado): Observable<EntityResponseType> {
    return this.http.put<IEstado>(
      `${this.resourceUrl}/update`, estado, {observe: 'response'}
    );
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, {observe: 'response'});
  }
}
