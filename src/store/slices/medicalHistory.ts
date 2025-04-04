import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MedicalHistory {
    pastDiagnoses: string[];
    surgeries: string[];
    medications: {
        name: string;
        dosage: string;
        frequency: string;
    }[];
    familyHistory: string[];
}

const initialState: MedicalHistory = {
    pastDiagnoses: [],
    surgeries: [],
    medications: [],
    familyHistory: [],
};

const medicalHistory = createSlice({
    name: "medicalHistory",
    initialState,
    reducers: {
        setMedicalHistory: (state, action: PayloadAction<Partial<MedicalHistory>>) => {
            return { ...state, ...action.payload };
        },
        resetMedicalHistory: () => initialState,
    },
});

export const { setMedicalHistory, resetMedicalHistory } = medicalHistory.actions;
export default medicalHistory.reducer;
