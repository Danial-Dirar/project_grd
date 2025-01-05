import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiverEntity } from './river.entity';
import { RiverController } from './river.controller';
import { RiverService } from './river.service';
import { EnvEntity, FinancialEntity, GeographicalEntity } from './river-st.entity';


@Module({
    imports: [TypeOrmModule.forFeature([RiverEntity, GeographicalEntity, FinancialEntity, EnvEntity])],
    controllers: [RiverController],
    providers: [RiverService],
})
export class RiverModule {}
