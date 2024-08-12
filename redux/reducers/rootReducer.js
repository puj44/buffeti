import addressReducer from "./addressReducer";
import authReducer from "./authReducer"
import cartReducer from "./cartReducer";
import homeReducer from "./homeReducer";
import itemsReducer from "./itemsReducer";
import packageReducer from "./packageReducer";
import customerReducer from "./customerReducer";

const rootReducer = {
    auth:authReducer,
    home:homeReducer,
    packages:packageReducer,
    items:itemsReducer,
    address:addressReducer,
    cart:cartReducer,
    customer:customerReducer
}

export default  rootReducer;