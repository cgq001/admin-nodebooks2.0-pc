import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn'
moment.locale('zh-cn');



ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
