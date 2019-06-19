import { HeroesComponent } from "../heroes/heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs/internal/observable/of"
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ];

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                {provide: HeroService, useValue: mockHeroService}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        fixture = TestBed.createComponent(HeroesComponent);
        
        
       
        
    });

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
       //run ngOnInit
       fixture.detectChanges();

       const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

       expect(heroComponentsDEs.length).toBe(3);

        for (let index = 0; index < heroComponentsDEs.length; index++) {
            expect(heroComponentsDEs[index].componentInstance.hero).toEqual(HEROES[index]);
        }
       
    });

    it(`should call heroService.deleteHero when the Hero Component's
        delete button is clicked`, () => {
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));
        
            //run ngOnInit
            fixture.detectChanges();

            //Get all the components:
            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

            // heroComponents[0].query(By.css('button'))
            // .triggerEventHandler('click', {stopPropagation: () => {}});

            //(heroComponents[0].componentInstance).delete.emit(undefined);
            
            //expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

            heroComponents[0].triggerEventHandler('delete', null);

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        });

    
});
