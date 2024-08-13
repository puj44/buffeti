import addressReducer from "./addressReducer";
import authReducer from "./authReducer"
import cartReducer from "./cartReducer";
import homeReducer from "./homeReducer";
import itemsReducer from "./itemsReducer";
import packageReducer from "./packageReducer";
import customerReducer from "./customerReducer";
import orderReducer from "./orderReducer";

const rootReducer = {
    auth:authReducer,
    home:homeReducer,
    packages:packageReducer,
    items:itemsReducer,
    address:addressReducer,
    cart:cartReducer,
    customer:customerReducer,
    order:orderReducer
}

export default  rootReducer;