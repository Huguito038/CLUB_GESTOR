const initialState = {
    isAuthenticated: false,
    user: [],
    error: [],
    jugadores:[],
    selectSport:"",
    selectCat:"",
    loading:true,
    succesfullmsg:false,
    unsucces:false,
    perfil:{}
};
const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: [],
            };
        case "LOGIN_DENIED":
            return {
                ...state,
                isAuthenticated:false,
                user:[],
                error:[action.payload]
            };
        case 'REGISTER_SUCCESS':
                return {
                    ...state,
                    isAuthenticated: true,
                    user: action.payload,
                    error: [],
                };
        case "REGISTER_DENIED":
                return {
                    ...state,
                    isAuthenticated:false,
                    user:[],
                    error:[action.payload],
                };
        case "GETALLPLAYERS":
            
            return{
                ...state,
                jugadores:action.payload
            }
        case "AUTH_SUCCES":
            return{
                ...state,
                user:action.payload,
                isAuthenticated:true,
                loading:false
            }
        case "AUTH_DENIED":
            return{
                ...state,
                user:[],
                isAuthenticated:false,
                loading:false,
            }
        case "TOKEN_NOT_EXIST":
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:[]
            }
        case "CREATE_SUCCESFULL":
            return{
                ...state,
                succesfullmsg:true,
                unsucces:false

            }
        case "CREATE_UNSUCCESFULL":
            return{
                ...state,
                succesfullmsg:false,
                unsucces:true
            }
        case "SETDEFAULT":
            return{
                ...state,
                succesfullmsg:false,
                unsucces:false
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated:false,
                user:[],
                jugadores:[],
                loading:false,
            }
        case "PLAYER_INFO":
            return{
                ...state,
                perfil:action.payload
            }
        case "CLEAN_PERFIL":
            return{
                ...state,
                perfil:[]
            }
        case "SELECT_SPORT":
            return{
                ...state,
                selectSport:action.payload

            }
        case "SELECT_CAT":
            console.log(action.payload)
            return{
                ...state,
                selectCat:action.payload
            }
        case "CLEAN_CAT":
            return{
                ...state,
                selectCat:""
            }
        default:
            return state;
    }
};

export default Reducer;