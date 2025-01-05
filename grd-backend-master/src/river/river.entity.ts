import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EnvEntity, FinancialEntity, GeographicalEntity } from "./river-st.entity";


// River Entity
@Entity("river")
export class RiverEntity {
    
    @PrimaryGeneratedColumn()
    riverId: number;

    @Column()
    origin: string;

    @Column()
    total_length: number;

    @Column()
    location: string;

    @Column()
    name: string;

    // One-to-one relationship with GeographicalEntity
    @OneToOne(() => GeographicalEntity, (geographicalEntity) => geographicalEntity.river)
    @JoinColumn()
    geographicalEntity: GeographicalEntity;

    // One-to-one relationship with FinancialEntity
    @OneToOne(() => FinancialEntity, (financialEntity) => financialEntity.river)
    @JoinColumn()
    financialEntity: FinancialEntity;

    // One-to-one relationship with EnvEntity
    @OneToOne(() => EnvEntity, (envEntity) => envEntity.river)
    @JoinColumn()
    envEntity: EnvEntity;
}
