import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RiverEntity } from './river.entity';
import { EnvEntity, FinancialEntity, GeographicalEntity } from './river-st.entity';

@Injectable()
export class RiverService {
    constructor(
        @InjectRepository(RiverEntity)
        private readonly riverRespository: Repository<RiverEntity>,
        @InjectRepository(GeographicalEntity)
        private readonly geographicalRespository: Repository<GeographicalEntity>,
        @InjectRepository(FinancialEntity)
        private readonly financialRespository: Repository<FinancialEntity>,
        @InjectRepository(EnvEntity)
        private readonly envRespository: Repository<EnvEntity>,
    ) {}

    getHello(): string {
        return 'Hello World';
    }

    // Add River
    async addRiver(data: any): Promise<any> {
        const river = await this.riverRespository.save(data);
        return river;
    }

    // Add Geographical Data and Link to River
    async addGeographical(data: any): Promise<any> {
        const river = await this.riverRespository.findOne({
            where: { riverId: data.riverId },
        });
        if (!river) {
            throw new NotFoundException('River not found');
        }
        const geographical = this.geographicalRespository.create({
            ...data,
            river,
        });
        return await this.geographicalRespository.save(geographical);
    }

    // Add Financial Data and Link to River
    async addFinancial(data: any): Promise<any> {
        const river = await this.riverRespository.findOne({
            where: { riverId: data.riverId },
        });
        if (!river) {
            throw new NotFoundException('River not found');
        }
        const financial = this.financialRespository.create({
            ...data,
            river,
        });
        return await this.financialRespository.save(financial);
    }

    // Add Environmental Data and Link to River
    async addEnv(data: any): Promise<any> {
        const river = await this.riverRespository.findOne({
            where: { riverId: data.riverId },
        });
        if (!river) {
            throw new NotFoundException('River not found');
        }
        const env = this.envRespository.create({
            ...data,
            river,
        });
        return await this.envRespository.save(env);
    }

    // Update River
    async updateRiver(id: number, data: any): Promise<any> {
        const river = await this.riverRespository.preload({
            riverId: id,
            ...data,
        });
        if (!river) {
            throw new NotFoundException('River not found');
        }
        return await this.riverRespository.save(river);
    }

    // Update Geographical Data
    async updateGeographical(id: number, data: any): Promise<any> {
        const geographical = await this.geographicalRespository.preload({
            geographicalId: id,
            ...data,
        });
        if (!geographical) {
            throw new NotFoundException('Geographical data not found');
        }
        return await this.geographicalRespository.save(geographical);
    }

    // Update Financial Data
    async updateFinancial(id: number, data: any): Promise<any> {
        const financial = await this.financialRespository.preload({
            financialId: id,
            ...data,
        });
        if (!financial) {
            throw new NotFoundException('Financial data not found');
        }
        return await this.financialRespository.save(financial);
    }

    // Update Environmental Data
    async updateEnv(id: number, data: any): Promise<any> {
        const env = await this.envRespository.preload({
            envId: id,
            ...data,
        });
        if (!env) {
            throw new NotFoundException('Environmental data not found');
        }
        return await this.envRespository.save(env);
    }

    // Delete River
    async deleteRiver(id: number): Promise<any> {
        const river = await this.riverRespository.findOne({ where: { riverId: id } });
        if (!river) {
            throw new NotFoundException('River not found');
        }
        return await this.riverRespository.remove(river);
    }

    // Delete Geographical Data
    async deleteGeographical(id: number): Promise<any> {
        const geographical = await this.geographicalRespository.findOne({
            where: { geographicalId: id },
        });
        if (!geographical) {
            throw new NotFoundException('Geographical data not found');
        }
        return await this.geographicalRespository.remove(geographical);
    }

    // Delete Financial Data
    async deleteFinancial(id: number): Promise<any> {
        const financial = await this.financialRespository.findOne({
            where: { financialId: id },
        });
        if (!financial) {
            throw new NotFoundException('Financial data not found');
        }
        return await this.financialRespository.remove(financial);
    }

    // Delete Environmental Data
    async deleteEnv(id: number): Promise<any> {
        const env = await this.envRespository.findOne({
            where: { envId: id },
        });
        if (!env) {
            throw new NotFoundException('Environmental data not found');
        }
        return await this.envRespository.remove(env);
    }

    //Searching stugfs
    async getRiver(river:number): Promise<any> {
        const riverData = await this.riverRespository.findOne({
            where: { riverId: river },
            relations: ['geographicalEntity', 'financialEntity', 'envEntity'],
        });
        if (!riverData) {
            throw new NotFoundException('River not found');
        }
        return riverData;

    }

    async getEnv(river:string): Promise<any> {
        const env= await this.envRespository.find({ where: { river: { name: river } } });
        if (!env) {
            throw new NotFoundException('Environmental data not found');
        }
        return env;
    }

    async getFinancial(river:string): Promise<any> {
        const financial= await this.financialRespository.find({ where: { river: { name: river } } });
        if (!financial) {
            throw new NotFoundException('Financial data not found');
        }
        return financial;
    }

    async getGeographical(river:string): Promise<any> {
        const geographical= await this.geographicalRespository.find({ where: { river: { name: river } } });
        if (!geographical) {
            throw new NotFoundException('Geographical data not found');
        }
        return geographical;
    }

    async getAllRivers(): Promise<any> {
        return await this.riverRespository.find();
    }
}
