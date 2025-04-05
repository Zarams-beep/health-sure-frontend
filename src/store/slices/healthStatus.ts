import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HealthStatus } from "@/types/healthSure";

const initialState: HealthStatus = {
    healthCondition: '', 
    vitalSigns: {
        bloodPressure: 0, 
        heartRate: 0,
        temperature: 0,
        sugar: 0,
        oxygen: 0,
        cholesterol: 0,
        BMI: 0,
    },
    allergies: [],
};

const healthStatus = createSlice({
    name: "healthStatus",
    initialState,
    reducers: {
        setHealthStatus: (state, action: PayloadAction<Partial<HealthStatus>>) => {
            return { ...state, ...action.payload };
        },
        resetHealthStatus: () => initialState,
    },
});

export const { setHealthStatus, resetHealthStatus } = healthStatus.actions;
export default healthStatus.reducer;
