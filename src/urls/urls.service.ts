import { Inject, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';
import { URL_REPOSITORY } from './url.consts';

@Injectable()
export class UrlsService {
  constructor(
    @Inject(URL_REPOSITORY)
    private urlRepository: Repository<Url>,
  ) { }
  create(createUrlDto: CreateUrlDto) {
    const url = this.urlRepository.create(createUrlDto);
    this.urlRepository.save(url)
    return url
  }

  findAll() {
    return this.urlRepository.find();
  }

  findOne(id: number) {
    return this.urlRepository.findOne({ where: { id } });
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return this.urlRepository.delete({ id });
  }
}
