import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import MainPage from "./components/MainPage/MainPage";
import FormPage from "./components/FormPage/FormPage";
import Navigation from "./components/Navigation/Navigation";
import 'antd/dist/antd.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {Layout} from 'antd';

const { Header, Content, Footer } = Layout;

const App = (): JSX.Element => {
  return (
      <Layout className="layout">
        <Header>
          <Navigation/>
        </Header>
        <Content style={{ padding: '25px 50px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path='/main' element={<MainPage/>}/>
              <Route path='/form' element={<FormPage/>}/>
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2022 Created by grekova-web</Footer>
      </Layout>
  );
};

export default App;
