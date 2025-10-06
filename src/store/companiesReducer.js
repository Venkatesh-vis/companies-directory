export const COMPANY_ACTION_TYPES = {
    SET_COMPANIES : "SET_COMPANIES",
    SET_LOADING : "SET_LOADING",
    SET_ERROR : "SET_ERROR",
    SET_FILTERS : "SET_FILTERS",
    SET_PAGE_COUNT : "SET_PAGE_COUNT",
    SET_TOAST: "SET_TOAST"
}


const initialState = {
    companies: [],
    loading: false,
    error: null,
    filters: {
        name: "",
        location: "",
        industry: ""
    },
    pageCount: 0,
    toast: null
};

export default function companiesReducer(state = initialState, action) {
    switch (action.type) {
        case COMPANY_ACTION_TYPES.SET_COMPANIES:
            return {
                ...state,
                companies: action.payload
            };


        case COMPANY_ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case COMPANY_ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };

        case COMPANY_ACTION_TYPES.SET_FILTERS:
            return {
                ...state,
                filters: action.payload
            };

        case COMPANY_ACTION_TYPES.SET_PAGE_COUNT:
            return {
                ...state,
                pageCount: action.payload
            };

        case COMPANY_ACTION_TYPES.SET_TOAST:
            return {
                ...state,
                toast: action.payload
            };

        default:
            return state;
    }
}
