import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LabResults } from "@/types/labResult";

const initialState: LabResults = {
  testResults: [], 
  medicalReports: []
};

const labResults = createSlice({
  name: "labResults",
  initialState,
  reducers: {
    setLabResults: (state, action: PayloadAction<LabResults>) => {
      return action.payload;
    },
    resetLabResults: () => initialState,
  },
});

export const { setLabResults, resetLabResults } = labResults.actions;
export default labResults.reducer;