export default function updateAction(state, payload) {
    return {
      ...state,
      heuristicDetails: {
        ...state.heuristicDetails,
        ...payload
      }
    };
  }