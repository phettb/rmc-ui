import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RawMaterial } from './raw-material';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialServiceService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8080/RM/';

  getRawMaterialList() {
    return this.http.get<RawMaterial[]>(this.url);
  }

  getRawMatByID(id:string) {
    return this.http.get<RawMaterial>(this.url + `Get/${id}`);
  }

  createRawMat(data: RawMaterial) {
    return this.http.post<any>(this.url,data);
  }

  deleteRawMat(id: string) {
    return this.http.delete<any>(this.url + `${id}`);
  }

  updateRawMat(data: RawMaterial) {
    return this.http.put<any>(this.url,data);
  }

  getImage(id: string): Observable<Blob> {
    return this.http.get(`http://localhost:8080/api/image/id/${id}`, { responseType: 'blob' })
  }

  delImage(id: string) {
    return this.http.delete<any>(`http://localhost:8080/api/image/id/${id}`);
  }
}
