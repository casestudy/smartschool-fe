import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';
import { createAcademicYearAsync, modifyAcademicYearAsync, fetchAcademicYearAsync, fetchAcademicTermAsync, fetchAcademicTermTypesAsync, createAcademicTerm } from '../Thunks/CalendarThunk'

interface CalendarMap {
    [key: string]: any;
}

export interface Calendar {
    calendar: CalendarMap;
}

const initialState: Calendar = {
    calendar: {
        connid: '',
    },
};

export const fetchCalendarSlice = createSlice({
    name: 'fetchyears',
    initialState,
    
    reducers: {
        performFetchAcademicYears: (state, action: PayloadAction<Array<any>>) => {
            state.calendar = action.payload;
        },
        performCreateClassroom: (state, action: PayloadAction<Array<any>>) => {
            state.calendar = action.payload;
        },
        performFetchAcademicTerms: (state, action: PayloadAction<Array<any>>) => {
            state.calendar = action.payload;
        },
        performFetchAcademicTermTypes: (state, action: PayloadAction<Array<any>>) => {
            state.calendar = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchAcademicYearAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
        builder.addCase(createAcademicYearAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
        builder.addCase(modifyAcademicYearAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
        builder.addCase(fetchAcademicTermAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
        builder.addCase(fetchAcademicTermTypesAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
        builder.addCase(createAcademicTerm.fulfilled, (state, action) => {
            // console.log(action.payload);
            // console.log(state);
        });
    },
});

export const { performFetchAcademicYears  } = fetchCalendarSlice.actions;

export const fetchAcademicYears = (state: RootState) => state.fetchAcademicYears.calendar;

export default fetchCalendarSlice.reducer;