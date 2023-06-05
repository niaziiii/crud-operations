import React, { createContext, Dispatch } from "react";

export type EntitiesDataType = {
  id: string;
  name: string;
  type: string;
  status: string;
  age: number;
  gender: string;
  phone: number;
  graduate: boolean | string;
  image: string;
  joining: string;
  coordinates: number[] | string;
  address: string | null;
};

export type InitialStateType = {
  show: null | EntitiesDataType;
  id: string;
  isModalShow: boolean;
  allData: EntitiesDataType[];
};

type ActionContextType = {
  type: string;
  payload?: any;
};

export type ContextType = {
  state: InitialStateType;
  dispatch: Dispatch<ActionContextType>;
};

const initialState: InitialStateType = {
  show: null,
  id: "",
  isModalShow: false,
  allData: [],
};

const MyContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

const userReducer = (
  state: InitialStateType,
  action: ActionContextType
): InitialStateType => {
  switch (action.type) {
    case "SHOW__MODAL":
      return { ...state, isModalShow: true };
    case "CLOSE__MODAL":
      return { ...state, isModalShow: false, show: null };
    case "UPDATE_SHOW":
      return { ...state, show: action.payload };
    case "UPDATE_ID":
      return { ...state, id: action.payload };
    case "RESET":
      return { ...state, show: null, id: "" };
    case "SET_DATA":
      const formatedData = formatedDataFn(action.payload) as EntitiesDataType[];
      return {
        ...state,
        allData: formatedData,
      };
    case "SORTFilterAGE":
      return {
        ...state,
        allData: state.allData.sort((a, b) => a.age - b.age),
      };
    case "UNFilterAGE":
      return {
        ...state,
        allData: state.allData.sort((a, b) => b.age - a.age),
      };
    default:
      return state;
  }
};

const formatedDataFn = (state: EntitiesDataType[]): EntitiesDataType[] => {
  const data: EntitiesDataType[] = [];

  state.forEach((element: any) => {
    const strr: string[] = element.coordinates.split(",");
    const coords: number[] = [+strr[0], +strr[1]];

    if (element.graduate === "true") {
      data.push({
        ...element,
        graduate: true,
        coordinates: coords,
      });
    } else {
      data.push({
        ...element,
        graduate: false,
        coordinates: coords,
      });
    }
  });

  return data as EntitiesDataType[];
};

export default MyContext;
export { initialState, userReducer };
