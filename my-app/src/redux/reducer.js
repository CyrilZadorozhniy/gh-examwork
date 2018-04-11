const initState = {};
const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'COMPANY_SELECT':
            return {company: action.payload.company};
        case 'DND_BOARD':
            return {changeTask: action.payload.changeTask};
        case 'AVATAR_SIZE':
            return {avatarSize: action.payload};
        case 'DRAGGABLE_TASK':
            return {draggableTask: action.payload};
        case 'LEFTBAR_STATUS':
            return {leftBarStatus: action.payload};
        default:
            return state;
    }
};
export default rootReducer;