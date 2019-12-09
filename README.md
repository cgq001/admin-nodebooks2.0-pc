##  新博客2.0 PC端展示代码


PC展示端预览地址: http://www.nodebook.cn/#/

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

### 关于本站
本站为真实数据项目
后端代码：https://github.com/cgq001/admin-node2.0

管理后台：https://github.com/cgq001/admin-nodebooks2.0


本站 未实现 github第三方登陆，主要因为其为展示性，不做真实部署使用，有需要github第三方登陆的，可在博客留言

###  redux的基础使用
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

export default (state = defaultState,action)=>{   //获取提交的action
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
