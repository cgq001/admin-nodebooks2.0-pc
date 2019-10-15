import React from 'react';
import './App.css';
import './cssResert.css'
import { HashRouter as Router, Route} from "react-router-dom";
//BrowserRouter
import About from './views/About/About'
import Booktxt from './views/Book/Booktxt/Booktxt'
import Book from './views/Book/Book'
import Manual from './views/Manual/Manual'

import Experience from './views/Experience/Experience'
import Project from './views/Project/Project'
import Text from './views/Home/Text/Text'
import Tag from './views/Home/Tag/Tag'
import Headerlist from './views/Header/Headerlist'
import Summary from './views/Summary/Summary'
import Home from './views/Home/Home'
import Leftaside from './views/Layout/Leftaside/Leftaside'
import Message from './views/Message/Message'
import { Layout , Row, Col, Divider  } from 'antd';
const { Header, Content } = Layout;
function App() {
  return (
    <div className="App">
      <Router>
          <Layout className="App">
                <Header className='App-header'>
                    <Headerlist />
                </Header>
                <Layout>
                    <Content className='App-content'>
                      <Row>
                          <Col xs={0} sm={0} md={0} lg={6} xl={4}>
                                <Leftaside />
                          </Col>
                          <Col xs={24} sm={24} md={24} lg={18} xl={20} className='App-content-con'>
                            <div className="App-content-con-tx">
                                <Route path="/" exact component={Home} />
                                <Route path="/text/:id" exact  component={Text} />
                                <Route path="/tag/:id" exact  component={Tag} />
                                <Route path='/summary' component={Summary} />
                                <Route path='/project' component={Project} />
                                <Route path='/manual' component={Manual} />
                                <Route path='/book/:id' component={Book} />
                                <Route path='/booktxt/:id' component={Booktxt} />
                                <Route path='/about' component={About} />
                                <Route path='/experience' component={Experience} />
                                <Route path='/message' component={Message} />
                            </div>
                            <div className='App-content-foot'>
                                <Divider>亲，到底了哈</Divider>
                            </div>  
                          </Col>
                      </Row>
                        
                    </Content>
                </Layout>
          </Layout>
      </Router>
    </div>
  );
}

export default App;
