import React from 'react';
import {Menu} from "antd";
import {EditOutlined, SearchOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['main']} style={{justifyContent: "center"}}>
            <Menu.Item key="main" icon={<SearchOutlined/>}>
                <Link to='/main'>Главная</Link>
            </Menu.Item>
            <Menu.Item key="form" icon={<EditOutlined/>}>
                <Link to='/form'>Изменить данные</Link>
            </Menu.Item>
        </Menu>
    );
};

export default Navigation;