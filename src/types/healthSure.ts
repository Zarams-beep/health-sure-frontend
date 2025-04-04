export interface HealthStatus {
  healthCondition: string;
  vitalSigns: {
    bloodPressure: number;
    heartRate: number;
    temperature: number;
    sugar: number;
    oxygen: number;
    cholesterol: number;
    BMI: number;
  };
  allergies: string[];
}
