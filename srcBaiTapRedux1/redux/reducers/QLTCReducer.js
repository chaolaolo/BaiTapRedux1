import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  listThuChi: [],
  filteredThuChi: [],
  statistics: { totalThu: 0, totalChi: 0 }
}

const thuChiSlice = createSlice({
  name: 'ThuChi',
  initialState,
  reducers: {
    addThuChi(state, action) {
      state.listThuChi.push(action.payload);
      state.filteredThuChi = state.listThuChi;
    },
    deleteThuChi(state, action) {
      state.listThuChi = state.listThuChi.filter(item => item.id !== action.payload);
      state.filteredThuChi = state.listThuChi;
    },
    updateThuChi(state, action) {
      const { id, title, description, dateThuChi, catThuChi, amountMoney } = action.payload;
      const thuChi = state.listThuChi.find(item => item.id === id);
      if (thuChi) {
        thuChi.title = title;
        thuChi.description = description;
        thuChi.dateThuChi = dateThuChi;
        thuChi.catThuChi = catThuChi;
        thuChi.amountMoney = amountMoney;
      }
      state.filteredThuChi = state.listThuChi;
    },
    searchThuChi(state, action) {
      const keySearch = action.payload.toLowerCase();
      state.filteredThuChi = state.listThuChi.filter(item => item.title.toLowerCase().includes(keySearch));
    },
    statisticsThuChi(state) {
      const statistics = state.listThuChi.reduce((acc, item) => {
        if (item.catThuChi === 'Thu') {
          acc.totalThu += parseFloat(item.amountMoney);
        } else if (item.catThuChi === 'Chi') {
          acc.totalChi += parseFloat(item.amountMoney);
        }
        return acc;
      }, { totalThu: 0, totalChi: 0 });
      state.statistics = statistics;
    },
  }
});

export const { addThuChi, deleteThuChi, updateThuChi, searchThuChi, statisticsThuChi } = thuChiSlice.actions;
export default thuChiSlice.reducer;