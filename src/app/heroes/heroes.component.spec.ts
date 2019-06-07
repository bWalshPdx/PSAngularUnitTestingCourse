import { HeroesComponent } from "./heroes.component";
import { isRegExp } from "util";
import { of } from "rxjs";

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroesService;

    beforeEach(() => {
        HEROES = [
            {id:1, name: 'SpiderDude', strength: 8},
            {id:2, name: 'Wonderful Woman', strength: 24},
            {id:3, name: 'SuperDude', strength: 55}
        ];

        mockHeroesService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        component = new HeroesComponent(mockHeroesService);
    });

    describe('delete', () => {
        it('should remove the indicated hero from the heroes list', () => {
            component.heroes = HEROES;
            mockHeroesService.deleteHero.and.returnValue(of(true));

            component.delete(HEROES[2]);

            expect(component.heroes.length).toBe(2);
        });
    });


    describe('should call deleteHero', () => {
        it('should call deleteHero', () => {
            component.heroes = HEROES;
            mockHeroesService.deleteHero.and.returnValue(of(true));

            component.delete(HEROES[2]);

            expect(mockHeroesService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });
});
