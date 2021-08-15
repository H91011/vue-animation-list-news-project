import { createStore } from "vuex";
import sampleData from "./sampleData.json";

const unfilterData = sampleData.rss.channel.item;
const filteredData = [];
for (const i in unfilterData) {
  const ii = unfilterData[i];
  filteredData.push({
    url: ii.link,
    title: ii.title,
    description: ii.description,
    index: parseInt(i),
    count: parseInt(i),
    animationUp: false,
    animationDown: false,
    swaped: false
  });
}

export default createStore({
  state: {
    filteredData,
    lastClickIndex: null
  },
  mutations: {
    add(state, newData) {
      state.filteredData.push(newData);
    },

    delete(state, index) {
      state.filteredData.splice(index, 1);
    },

    update(state, { index, selectedData }) {
      state.filteredData[index] = {
        ...state.filteredData[index],
        ...selectedData
      };
    },

    swap(state, { indexA, indexB }) {
      const { filteredData } = state;
      const temp = filteredData[indexA];
      filteredData[indexA] = filteredData[indexB];
      filteredData[indexB] = temp;

      const tempI = filteredData[indexA].index;
      filteredData[indexA].index = filteredData[indexB].index;
      filteredData[indexB].index = tempI;

      state.filteredData = [...filteredData];
    },

    lastClick(state, index) {
      state.lastClickIndex = index;
    }
  },
  getters: {
    getData: state => index => state.filteredData[index],
    getFilteredData: state => () => state.filteredData,
    getLastClick: state => () => state.lastClickIndex
  }
});
