import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LabResults {
    testResults: {
        testName: string;
        result: string;
        date: string;
    }[];
    medicalReports: {
        title: string;
        url: string; // Can store PDF links
    }[];
}

const initialState: LabResults = {
    testResults: [],
    medicalReports: [],
};

const labResults = createSlice({
    name: "labResults",
    initialState,
    reducers: {
        setLabResults: (state, action: PayloadAction<Partial<LabResults>>) => {
            return { ...state, ...action.payload };
        },
        resetLabResults: () => initialState,
    },
});

export const { setLabResults, resetLabResults } = labResults.actions;
export default labResults.reducer;
