// Medical History Type
export interface MedicalHistory {
    pastDiagnoses: string[];
    surgeries: string[];
    medications: {
        name: string;
        dosage: string;
        frequency: string;
    }[];
    familyHistory: string[];
}


