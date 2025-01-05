import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RiverService } from './river.service';


@Controller('river')
export class RiverController {
    constructor(private readonly riverService: RiverService) {}

    @Get()
    getHello(): string {
        return this.riverService.getHello();
    }

    @Post('/addGeographicalStatus')
    @UsePipes(ValidationPipe)
    async addGeographical(@Body() data: any): Promise<any> {
        return await this.riverService.addGeographical(data);
    }

    @Post('/addFinancialStatus')
    @UsePipes(ValidationPipe)
    async addFinancial(@Body() data: any): Promise<any> {
        return await this.riverService.addFinancial(data);
    }

    @Post('/addEnvStatus')
    @UsePipes(ValidationPipe)
    async addEnv(@Body() data: any): Promise<any> {
        return await this.riverService.addEnv(data);
    }

    @Post('/addRiverStatus')
    @UsePipes(ValidationPipe)
    async addRiver(@Body() data: any): Promise<any> {
        return await this.riverService.addRiver(data);
    }

    @Delete('/deleteGeographicalStatus/:id')
    @UsePipes(ValidationPipe)
    async deleteGeographical(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.riverService.deleteGeographical(id);
    }

    @Delete('/deleteEnvStatus/:id')
    @UsePipes(ValidationPipe)
    async deleteEnv(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.riverService.deleteEnv(id);
    }

    @Delete('/deleteFinancialStatus/:id')
    @UsePipes(ValidationPipe)
    async deleteFinancial(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.riverService.deleteFinancial(id);
    }

    @Delete('/deleteRiverStatus/:id')
    @UsePipes(ValidationPipe)
    async deleteRiver(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return await this.riverService.deleteRiver(id);
    }

    @Post('/updateGeographicalStatus/:id')
    @UsePipes(ValidationPipe)
    async updateGeographical(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<any> {
        return await this.riverService.updateGeographical(id, data);
    }

    @Post('/updateFinancialStatus/:id')
    @UsePipes(ValidationPipe)
    async updateFinancial(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<any> {
        return await this.riverService.updateFinancial(id, data);
    }

    @Post('/updateEnvStatus/:id')
    @UsePipes(ValidationPipe)
    async updateEnv(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<any> {
        return await this.riverService.updateEnv(id, data);
    }

    @Post('/updateRiverStatus/:id')
    @UsePipes(ValidationPipe)
    async updateRiver(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<any> {
        return await this.riverService.updateRiver(id, data);
    }

    @Get('/getRiver/:riverId')
    async getRiver(@Param('riverId') river:number): Promise<any> {
        return await this.riverService.getRiver(river);
    }

    @Get('/getAllRivers')
    async getAllRivers(): Promise<any> {
        return await this.riverService.getAllRivers();
    }

    @Get('/getGeographical/:river')
    async getGeographical(@Param('river') river:string): Promise<any> {
        return await this.riverService.getGeographical(river);
    }

    @Get('/getFinancial/:river')
    async getFinancial(@Param('river') river:string): Promise<any> {
        return await this.riverService.getFinancial(river);
    }

    @Get('/getEnv/:river')
    async getEnv(@Param('river') river:string): Promise<any> {
        return await this.riverService.getEnv(river);
    }

    
}
