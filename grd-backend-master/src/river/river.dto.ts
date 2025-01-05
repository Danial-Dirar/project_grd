export class RiverDto {
        origin: string;
        total_length: number;
        location: string;
        name: string;
}

export class GeographicalDto {

    tributaryCount: number;
    averageLength: number;
    averageWidth: number;
    stLocation: string;
    endLocation: string;
    foodPlain: string;
    basinArea: string;
}

export class FinancialDto {

    irrigation_value: number;
    tour_Rev: number;
    fishing_Rev: number;
    annul_Rev: number;
    ecoDepIndex: number;
    maintance_cost: number;
    hydroGen: number;
}

export class EnvDto {
    
    dissOxy: string;
    nitrateConcentration: number;
    phosphateConcentration: number;
    heavyMetallvl: number;
    pollutionLevel: number;
    bioDiversityScore: number;
    stressIndex: number;
    sedimentLoad: number;
    waterQualityIndex: number;
    hydarulicFlow: number;
}