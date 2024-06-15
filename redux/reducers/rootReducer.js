import authReducer from "./authReducer"
import homeReducer from "./homeReducer";
import packageReducer from "./packageReducer";

const rootReducer = {
    auth:authReducer,
    home:homeReducer,
    packages:packageReducer,
}

export default  rootReducer;