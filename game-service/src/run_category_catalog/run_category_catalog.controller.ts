import { Controller, Get, Param } from '@nestjs/common';
import { RunCategoryCatalogService } from './run_category_catalog.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Run Category Catalog')
@Controller('categories')
export class RunCategoryCatalogController {

    constructor(private runService : RunCategoryCatalogService) {}

    @Get(':id')
    async findOne(@Param('id') id: string){
        return this.runService.findOne(id);
    }
}
