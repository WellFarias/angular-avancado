import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiPath: string = "api/categories";

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Array<Category>> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToCategories)
    )
  }

  getById(id: number): Observable<Category> {
    const URL = `${this.apiPath}/${id}`;
    return this.http.get<Category>(URL).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToCategory)
    )
  }

  created(category: Category): Observable<Category> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToCategory)
    )
  }

  update(category: Category): Observable<Category> {
    const URL = `${this.apiPath}/${category.id}`;
    return this.http.put<Category>(URL, category).pipe(
      catchError(this.handlerError),
      map(() => category)
    )
  }

  delete(id: number): Observable<void> {
    const URL = `${this.apiPath}/${id}`;
    return this.http.delete(URL).pipe(
      catchError(this.handlerError),
      map(() => null)
    )
  }

  private jsonDataToCategories(jsonData: any[]): Array<Category> {
    const categories: Array<Category> = [];
    jsonData.forEach(element => categories.push(element as Category));
    return categories;
  } 

  private jsonDataToCategory(jsonData: any): Category {
    return jsonData as Category
  } 

  private handlerError(error: any): Observable<any> {
    console.log("ERRO NA REQUISIÇÃO =>", error);
    return throwError(error);
  }

}
