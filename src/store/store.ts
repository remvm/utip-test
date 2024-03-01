import { makeAutoObservable, runInAction } from "mobx";
import axios, { AxiosResponse } from "axios";

export interface IDataItem {
  name: string;
  gender: string;
  birth_year: string;
  homeworld: string;
  starships: string[];
}

class DataStore {
  data: IDataItem[] = [];
  loading = false;
  error = "";
  totalItems = 1;
  currentPage = 1;

  constructor() {
    makeAutoObservable(this);
    const storedData = localStorage.getItem("data");
    const storedTotalItems = localStorage.getItem("totalItems");
    const storedCurrentPage = localStorage.getItem("currentPage");
    if (storedData) {
      runInAction(() => {
        this.data = JSON.parse(storedData);
        this.totalItems = storedTotalItems ? JSON.parse(storedTotalItems) : 1;
        this.currentPage = storedCurrentPage ? JSON.parse(storedCurrentPage) : 1;
      });
    }
  }

  async fetchData(page: number) {
    this.loading = true;
    try {
      const response = await axios.get<{ results: IDataItem[], count: number }>(`https://swapi.dev/api/people/?page=${page}`);
      const promises = response.data.results.map(async (item: IDataItem) => {
        const homeworldResponse = await axios.get(item.homeworld);
        try {
          const shipsResponse = await axios.all(item.starships.map((url: string) => axios.get<AxiosResponse<{ name: string }>>(url)));
          const shipsData = shipsResponse.map((response: AxiosResponse) => response.data.name);
          item.homeworld = homeworldResponse.data.name;
          item.starships = shipsData;
          return { ...item };
        } catch (error) {
          runInAction(() => {
            this.error = (error as Error).message;
            this.loading = false;
          });
          throw error;
        }
      });

      const data = await Promise.all(promises);
      const filteredData = data.map((item: IDataItem) => {
        return {
          name: item.name,
          gender: item.gender,
          birth_year: item.birth_year,
          homeworld: item.homeworld,
          starships: item.starships
        };
      });
      runInAction(() => {
        this.data = filteredData;
        this.totalItems = response.data.count;
        this.currentPage = page;
        this.loading = false;
      });
      localStorage.setItem("data", JSON.stringify(this.data));
      localStorage.setItem("currentPage", JSON.stringify(this.currentPage));
      localStorage.setItem("totalItems", JSON.stringify(this.totalItems));
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
        this.loading = false;
      });
    }
  }

  clearData() {
    this.data = [];
    this.currentPage = 1;
    localStorage.removeItem("data");
    localStorage.removeItem("currentPage");
    localStorage.removeItem("totalItems");
  }

  deleteItem(index: number) {
    this.data.splice(index, 1);
    this.totalItems--;
    localStorage.setItem("data", JSON.stringify(this.data));
    localStorage.setItem("totalItems", JSON.stringify(this.totalItems));
  }

  sortData(column: keyof IDataItem) {
    this.data.sort((a: IDataItem, b: IDataItem) => {
      if (a[column] < b[column]) {
        return -1;
      }
      if (a[column] > b[column]) {
        return 1;
      }
      return 0;
    });
    localStorage.setItem("data", JSON.stringify(this.data as IDataItem[]));
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  addRow(newRow: IDataItem) {
    axios.post("https://swapi.dev/api/people/", newRow)
      .then((response) => {
        runInAction(() => {
          this.data.push(response.data);
          this.totalItems++;
        });
        localStorage.setItem("data", JSON.stringify(this.data));
        localStorage.setItem("totalItems", JSON.stringify(this.totalItems));
      })
      .catch((error) => {
        console.error(error);
      })
      // Прописал добавление в стейт и обноление сторэджа в finally, потому что сервер запрещает отправлять данные и возвращает ошибку
      .finally(() => {
        runInAction(() => {
          this.data.push(newRow);
          this.totalItems++;
        });
        localStorage.setItem("data", JSON.stringify(this.data));
        localStorage.setItem("totalItems", JSON.stringify(this.totalItems));
      });
  }
}

export default new DataStore();
