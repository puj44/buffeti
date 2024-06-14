import authReducer from "./authReducer"
import homeReducer from "./homeReducer";

const rootReducer = {
    auth:authReducer,
    home:homeReducer,
}

export default  rootReducer;