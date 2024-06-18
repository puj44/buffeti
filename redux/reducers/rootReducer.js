import authReducer from "./authReducer"
import homeReducer from "./homeReducer";
import itemsReducer from "./itemsReducer";
import packageReducer from "./packageReducer";

const rootReducer = {
    auth:authReducer,
    home:homeReducer,
    packages:packageReducer,
    items:itemsReducer,
}

export default  rootReducer;