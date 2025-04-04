import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasicInfo } from "@/types/basicInfo";

const initialState: BasicInfo = {
    // id: null,
    fullName:null,
    DOB: null,
    Age: null,
    Gender: null,
    phoneNumber: null,
    email: null,
    HouseAddress: null,
    EmergencyNumber: null,
    NextOfKinName: null,
    NextOfKinGender: null,
    NextOfKinPhoneNumber: null,
    NextOfKinEmailAddress: null,
};

const basicInfo = createSlice({
    name: "basicInfo",
    initialState,
    reducers: {
        setBasicInfo: (state, action: PayloadAction<Partial<BasicInfo>>) => {
            return { ...state, ...action.payload };
        },
        resetBasicInfo: () => initialState,
    },
});

export const { setBasicInfo, resetBasicInfo } = basicInfo.actions;
export default basicInfo.reducer;
