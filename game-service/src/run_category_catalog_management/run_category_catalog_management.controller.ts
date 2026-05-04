import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthToken, isAdmin } from './guard/auth.guard';
import { CatalogInsertion } from './dto/CatalogInsertion.dto';
import { CatalogUpdate } from './dto/CatalogUpdate.dto';
import { RunCategoryCatalogManagementService } from './run_category_catalog_management.service';

@ApiTags('Run Category Management')
@Controller('admin/categories')
export class RunCategoryCatalogManagementController {

    constructor(private catalogService: RunCategoryCatalogManagementService) {}

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    async insertCatalog(@Body() runCatalog: CatalogInsertion){ 
        return this.catalogService.insertCatalog(runCatalog);
    }

    @Patch(':id/update')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    async updateCatalog(@Param('id') id: string, runCatalog: CatalogUpdate){
        return this.catalogService.updateCatalog(id,runCatalog);
    }

    @Delete(':id/delete')
    @ApiBearerAuth()
    @UseGuards(AuthToken, isAdmin)
    async deleteCatalog(@Param('id') id: string){
        return this.catalogService.deleteCatalog(id);
    }

}
