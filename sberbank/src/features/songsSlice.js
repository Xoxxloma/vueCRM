import { createSlice } from '@reduxjs/toolkit';


export const songsSlice = createSlice({
  name: 'songs',
  initialState: {
    songs: null,
    fav: [],
    loading: false,
    error: false
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    setError: (state) => {
      state.error = true
      state.loading = false
    },
    fetchData: (state, {payload}) => {
      state.songs = payload
      state.loading = false
    },
    toggleFav: (state, {payload}) => {
      const songIdx = state.fav.findIndex(item => item.id === payload.id)
      if (songIdx >= 0) {
        state.fav = state.fav.filter(item => item.id !== payload.id)
      } else {
        state.fav = [...state.fav, payload]
      } 
    }
  }
});

export const { setLoading, fetchData, toggleFav, setError } = songsSlice.actions;

export default songsSlice.reducer;
