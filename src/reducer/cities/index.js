const initialState = {
    cities: [],
  };
  
  const citiesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_CITIES":
        return {
          ...state,
          cities: payload,
        };
      case "ADD_CITY":
        return {
          ...state,
          cities: [...state.cities, payload],
        };
      case "UPDATE_CITY":
        return {
          ...state,
          cities: state.cities.map((element) => {
            if (payload.id === element.id) return payload;
            return element;
          }),
        };
      case "DELETE_CITY":
        return {
          ...state,
          cities: state.cities.filter((element) => {
            return element.id != payload;
          }),
        };
  
      default:
        return state;
    }
  };
  
  export default citiesReducer;
  
  // Actions:
  
  export const setCities = (cities) => {
    return { type: "SET_CITIES", payload: cities };
  };
  
  export const addCity = (hotel) => {
    return { type: "ADD_CITY", payload: hotel };
  };
  
  export const updateCityById = (updatedCity) => {
    return { type: "UPDATE_CITY", payload: updatedCity };
  };
  
  export const deleteCityById = (id) => {
    return { type: "DELETE_CITY", payload: id };
  };
  