import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    // තාවකාලිකව මේ විදිහට ඩමී රෙඩියුසර් එකක් දාන්න (පස්සේ ඔයාගේ අදාළ රෙඩියුසර්ස් මෙතැනට දාගන්න පුළුවන්)
    auth:(state = {})=>state,
    /*products: productReducer,
    cart: cartReducer*/
});

export type RootReducerState = ReturnType<typeof rootReducer>
