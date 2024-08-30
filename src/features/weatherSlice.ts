import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WeatherData {
  date: string;
  city: string;
  temperature: number;
  precipitation: number;
  windSpeed: number;
  humidity: number;
}

interface WeatherState {
  data: WeatherData[];
}

const initialState: WeatherState = {
  data: [],
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
