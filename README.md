##  新博客2.0 PC端展示代码
### 初始化
```javascript
yarn 

// 或者

 npm install 
```
###  启动
```javascript
yarn start
```
### HTML入口文件
App.js


###  redux 
```javascript
npm install redux -S

// store/index.js
import { createStore } from 'redux'

import reducer from  './reducer'

const store = createStore(
           reducer,
           window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            )

export default store;

// store/reducer.js
const defaultState={   //初始化数据
    texts: '',
    user:{},
    types: 0     //1为普通注册登陆   2 为GitHub 登陆
}

export default (state = defaultState,action)=>{   //提交的action
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


//提交 action
const actions={     //1为普通注册登陆   2 为GitHub 登陆
                type: 'types',
                value: 1
            }
                          
    store.dispatch(actions)

```