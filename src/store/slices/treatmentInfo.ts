import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TreatmentInfo {
    assignedDoctor: {
        name: string | null;
        specialization: string | null;
        contact: string | null;
    };
    treatmentPlans: string[];
    upcomingAppointments: {
        date: string;
        time: string;
        location: string;
    }[];
}

const initialState: TreatmentInfo = {
    assignedDoctor: {
        name: null,
        specialization: null,
        contact: null,
    },
    treatmentPlans: [],
    upcomingAppointments: [],
};

const treatmentInfo = createSlice({
    name: "treatmentInfo",
    initialState,
    reducers: {
        setTreatmentInfo: (state, action: PayloadAction<Partial<TreatmentInfo>>) => {
            return { ...state, ...action.payload };
        },
        resetTreatmentInfo: () => initialState,
    },
});

export const { setTreatmentInfo, resetTreatmentInfo } = treatmentInfo.actions;
export default treatmentInfo.reducer;
