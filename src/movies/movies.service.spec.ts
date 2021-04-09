import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    })
  })

  describe('getOne()', () => {

    it('should find a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2021,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })

    it('should throw 404 error', () => {
      let id = 999;
      try {
        service.getOne(id)
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie ${id} is not exist`)
      }
    })
  })

  describe('delete()', () => {

    it('deletes a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2021,
      });

      const beforeMovies = service.getAll().length;
      service.delete(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeMovies)
    })

    it('should return a 404', () => {
      let id = 999;
      try {
        service.delete(id);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('create()', () => {

    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2021,
      })
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe('update()', () => {
    
    it('should update a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2021,
      })
      service.update(1, {title : 'updated'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('updated')
    })

    it('should return a 404', () => {
      let id = 999;
      try {
        service.update(id, {});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })
});
