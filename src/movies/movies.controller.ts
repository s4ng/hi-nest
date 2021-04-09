import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll():Movie[] {
    return this.moviesService.getAll()
  }

  @Get('/:id')
  getOne(@Param('id') id:number):Movie {
    return this.moviesService.getOne(id)
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData)
  }

  @Delete('/:id')
  remove(@Param('id') id:number) {
    return this.moviesService.delete(id)
  }

  @Patch('/:id')
  update(@Param('id') movieId:number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.update(movieId, updateData);
  }
}
