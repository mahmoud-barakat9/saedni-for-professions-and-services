const initialState = {
  interestedItems: ["item1"],
};

export const interestedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_INTERESTED": {
      return {
        ...state,
        interestedItems: [...state.interestedItems, action.payload],
      };
    }
    case "DELETE_FROM_INTERESTED": {
      return {
        ...state,
        interestedItems: state.interestedItems.filter(
          (obj) => obj.id !== action.payload.id
        ),
      };
    }
    default:
      return state;
  }
};
