import { createSlice } from '@reduxjs/toolkit';
import data from "../tree.json";

const catalog = data.data;


  fetch("https://merchant.dev.telcell.sale/api/v1/catalog/group/category/subcategory/tree?full=true")
    .then(res => res.json())
    .then(
      (result) => {
        const catalog = result.data;
      },
      // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
      // чтобы не перехватывать исключения из ошибок в самих компонентах.
      (error) => {
        const catalog = [];
      }
    );



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
