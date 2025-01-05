import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RiverEntity } from "./river.entity";


// Geographical Entity
@Entity('geographical_st')
export class GeographicalEntity {
    @PrimaryGeneratedColumn()
    geographicalId: number;

    @Column()
    tributaryCount: number;

    @Column()
    averageLength: number;

    @Column()
    averageWidth: number;

    @Column()
    stLocation: string;

    @Column()
    endLocation: string;

    @Column()
    foodPlain: string;

    @Column()
    basinArea: string;

    // Inverse side of the relationship with RiverEntity
    @OneToOne(() => RiverEntity, (river) => river.geographicalEntity)
    river: RiverEntity;
}

// Financial Entity
@Entity('financial_st')
export class FinancialEntity {
    @PrimaryGeneratedColumn()
    financialId: number;

    @Column()
    irrigation_value: number;

    @Column()
    tour_Rev: number;

    @Column()
    fishing_Rev: number;

    @Column()
    annul_Rev: number;

    @Column()
    ecoDepIndex: number;

    @Column()
    maintance_cost: number;

    @Column()
    hydroGen: number;

    // Inverse side of the relationship with RiverEntity
    @OneToOne(() => RiverEntity, (river) => river.financialEntity)
    river: RiverEntity;
}

// Environmental Entity
@Entity('env_st')
export class EnvEntity {
    @PrimaryGeneratedColumn()
    envId: number;

    @Column()
    dissOxy: string;

    @Column()
    nitrateConcentration: number;

    @Column()
    phosphateConcentration: number;

    @Column()
    heavyMetallvl: number;

    @Column()
    pollutionLevel: number;

    @Column()
    bioDiversityScore: number;

    @Column()
    stressIndex: number;

    @Column()
    sedimentLoad: number;

    @Column()
    waterQualityIndex: number;

    @Column()
    hydarulicFlow: number;

    // Inverse side of the relationship with RiverEntity
    @OneToOne(() => RiverEntity, (river) => river.envEntity)
    river: RiverEntity;
}