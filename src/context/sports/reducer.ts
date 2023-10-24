interface Match {
  id: number;
  name: string;
  sportName: string;
  isRunning: boolean;
  summary: string;
  endsAt: string;
  teams: [];
}

export interface SportsState {
  Sports: Sport[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialState: SportsState = {
  Sports: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export type SportsActions =
  | { type: "FETCH_SPORTS_REQUEST" }
  | { type: "FETCH_SPORTS_SUCCESS"; payload: Sport[] }
  | { type: "FETCH_SPORTS_FAILURE"; payload: string };

export const reducer = (
  state: SportsState = initialState,
  action: SportsActions
): SportsState => {
  switch (action.type) {
    case "FETCH_SPORTS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_SPORTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        Sports: action.payload,
      };
    case "FETCH_SPORTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};