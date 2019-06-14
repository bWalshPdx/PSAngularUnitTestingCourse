import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Injectable } from "@angular/core";

describe('HeroService', () => {
    let mockMessageService = jasmine.createSpyObj(['add']);
    let httpTestingController: HttpTestingController;
    let service = HeroService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule],
            providers:  [
                HeroService,
                {provide: MessageService, useValue: mockMessageService}
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);

    });

    describe('getHero', () => {

        it('should call get with the correct URL', () => {

            mockMessageService.getHero(4).subscribe(() => {
                console.log('fufilled');
            });

            const req = httpTestingController.expectOne('api/heroes/4');
            req.flush({id: 4, name: '', strength: 100});
        });
    });
});



