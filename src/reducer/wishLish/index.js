
const initialState ={
    wishList :[]
}

const wishListReducer =(state =initialState,{type, payload})=>{
switch (type) {
    case "SET_WISHLISTS":
        return{
            ...state,
            wishList :payload
        }
        
       case "ADD_WISHLIST":
           return{
               ...state,
               wishList:[...state.wishList,payload]
           }
           case "DELETE_WISHLIST":
           return {
            ...state,
            wishList: state.wishList.filter((element) => {
              return element.id != payload;
            }),
          };

    default:
        return state;
}
}


export default wishListReducer

// Actions:
export const setWishList =(wishLists)=>{
    return {type:"SET_WISHLISTS",payload:wishLists}
}

export const addWishList =(wishList)=>{
    return {type:"ADD_WISHLIST",payload:wishList}
}

export const deleteWishList = (id) => {
    return { type: "DELETE_WISHLIST", payload: id };
  };

