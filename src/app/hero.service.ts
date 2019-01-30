import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {Hero} from "./hero";
// import {HEROES} from "./mock-heroes";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  constructor(private httpClient: HttpClient ,private messageService: MessageService) { }

  //Get objects as array of Hero
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  //get objects as Observable
  // getHeroes(): Observable<Hero[]> {
  //   this.messageService.add("HeroService: fetched HEROES");
  //   return of(HEROES);

  // getHero(id: number): Observable<Hero> {
  //   this.log("fetched hero id:"+id);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  private heroesUrl: string = "api/heroes";

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log("fetched heroes")),
        catchError(this.handleError('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url: string = this.heroesUrl+"/"+id.toString();

    return this.httpClient.get<Hero>(url)
      .pipe(
        tap(_ => this.log("fetched hero id:"+id.toString())),
        catchError(this.handleError<Hero>("getHero id:"+id.toString()))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl,hero,httpOptions)
      .pipe(
        tap(_ => this.log("updated hero id:"+hero.id)),
        catchError(this.handleError<any>("updateHero hero_id:"+hero.id))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post(this.heroesUrl,hero,httpOptions)
      .pipe(
        tap((hero: Hero) => this.log("added new hero with id:"+hero.id)),
        catchError(this.handleError<Hero>("addHero"))
      )
  }

  delHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = this.heroesUrl+"/"+id;

    return this.httpClient.delete<Hero>(url,httpOptions)
      .pipe(
        tap(_ => this.log("deleted hero id:"+id)),
        catchError(this.handleError<Hero>("delHero"))
      )
  }

  private log(message: String) {
    this.messageService.add("HeroService: "+message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(operation+" failed: "+error.message);
      return of(result as T);
    }
  }
}
