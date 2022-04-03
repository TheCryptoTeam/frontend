const initialState = {
    hotels: [],
  };
  
  const hotelsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_HOTELS":
        return {
          ...state,
          hotels: payload,
        };
      case "ADD_HOTEL":
        return {
          ...state,
          hotels: [...state.hotels, payload],
        };
      case "UPDATE_HOTEL":
        return {
          ...state,
          hotels: state.hotels.map((element) => {
            if (payload.id === element.id) return payload;
            return element;
          }),
        };
      case "DELETE_HOTEL":
        return {
          ...state,
          hotels: state.hotels.filter((element) => {
            return element.id != payload;
          }),
        };
  
      default:
        return state;
    }
  };
  
  export default hotelsReducer;
  
  // Actions:
  
  export const setHotels = (hotels) => {
    return { type: "SET_HOTELS", payload: hotels };
  };
  
  export const addHotel = (hotel) => {
    return { type: "ADD_HOTEL", payload: hotel };
  };
  
  export const updateHotelById = (updatedHotel) => {
    return { type: "UPDATE_HOTEL", payload: updatedHotel };
  };
  
  export const deleteHotelById = (id) => {
    return { type: "DELETE_HOTEL", payload: id };
  };
  