import { createSlice } from '@reduxjs/toolkit';
import data from "../tree.json";

const catalog = data.data;

let catlist = catalog.map(function (item) {
  return {
    id: item.id,
    name: item.title_ru,
    categories: item.categories,
  };
});

const initialState = {
  catlist: catlist,
  selected: catlist[0],
};




export const catSlice = createSlice({
  name: "catlist",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    changeActiveCat: (state, action) => {
      for (let somecat of state.catlist) {
        if (action.payload === somecat.id){
          state.selected = somecat;
        }
      }
    },

  },
});

export const { changeActiveCat } = catSlice.actions;
export const selectCatMassive = (state) => state.catlist.catlist;
export const selectSubCats = (state) => state.catlist.selected;


export default catSlice.reducer;
