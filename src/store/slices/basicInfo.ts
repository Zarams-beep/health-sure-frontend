import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasicInfo } from "@/types/basicInfo";

const initialState: BasicInfo = {
    fullName: '',
    DOB: '',
    Age: '0', 
    Gender: 'Male', 
    phoneNumber: '',
    email: '',
    HouseAddress: '',
    EmergencyNumber: '',
    NextOfKinName: '',
    NextOfKinGender: 'Male',
    NextOfKinPhoneNumber: '',
    NextOfKinEmailAddress: ''
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
