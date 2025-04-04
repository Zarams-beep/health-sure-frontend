import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notes {
    doctorNotes: string[];
    caregiverComments: string[];
}

const initialState: Notes = {
    doctorNotes: [],
    caregiverComments: [],
};

const notes = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNotes: (state, action: PayloadAction<Partial<Notes>>) => {
            return { ...state, ...action.payload };
        },
        resetNotes: () => initialState,
    },
});

export const { setNotes, resetNotes } = notes.actions;
export default notes.reducer;
