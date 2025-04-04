import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HealthStatus } from "@/types/healthSure";

const initialState: HealthStatus = {
    healthCondition: null,
    vitalSigns: {
        bloodPressure: null,
        heartRate: null,
        temperature: null,
        sugar: null,
        oxygen: null,
        cholesterol: null,
        BMI: null,
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
