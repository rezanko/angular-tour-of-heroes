import { Component, OnInit } from '@angular/core';
import { Hero} from "../hero";
import {HeroService} from "../hero.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  getHeroes(): void{
    //Synchronous
    // this.heroes = this.heroService.getHeroes();

    //Asynchronous (with Observable)
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  addHero(name: string) : void {
    name = name.trim();
    if (!name){ return; }
    else {
      this.heroService.addHero({name} as Hero)
        .subscribe(hero => this.heroes.push(hero));
    }
  }

  deleteHero(hero: Hero){
    const heroname: string = hero.name;
    this.heroService.delHero(hero).subscribe(hero =>
      this.heroes = this.heroes.filter(h => h.name !== heroname)
    );
  }

  ngOnInit() {
    this.getHeroes();
  }

}
