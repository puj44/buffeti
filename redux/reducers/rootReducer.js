import addressReducer from "./addressReducer";
import authReducer from "./authReducer"
import cartReducer from "./cartReducer";
import homeReducer from "./homeReducer";
import itemsReducer from "./itemsReducer";
import packageReducer from "./packageReducer";

const rootReducer = {
    auth:authReducer,
    home:homeReducer,
    packages:packageReducer,
    items:itemsReducer,
    address:addressReducer,
    cart:cartReducer
}

export default  rootReducer;