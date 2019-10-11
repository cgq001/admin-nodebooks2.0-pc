const defaultState={
    texts: '',
    user:{},
    types: 0     //1为普通注册登陆   2 为GitHub 登陆
}

export default (state = defaultState,action)=>{
    if(action.type === 'txt'){
        let newState=JSON.parse(JSON.stringify(state))
        newState.texts =action.value
        return newState;
    }
    if(action.type === 'user'){
        let newState=JSON.parse(JSON.stringify(state))
        newState.user =action.value
        return newState;
    }
    if(action.type === 'types'){
        let newState=JSON.parse(JSON.stringify(state))
        newState.types =action.value
        return newState;
    }
}