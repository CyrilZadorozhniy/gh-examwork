const initState = {};
const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'COMPANY_SELECT':
            return {company: action.payload.company};
            break;
        case 'DND_BOARD':
            return {changeTask: action.payload.changeTask};
            break;
        default:
            return state;
    }
};
export default rootReducer;