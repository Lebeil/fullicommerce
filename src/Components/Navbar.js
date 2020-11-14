import React, {useState} from 'react';
import {Menu} from 'antd';
import {HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined} from '@ant-design/icons';

const {SubMenu, Item} = Menu;

const Navbar = () => {
    const [current, setCurrent] = useState('home');

    const handleClick = e => {
        /*console.log(e.key)*/
        setCurrent(e.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined/>}>
                Home
            </Item>
            <SubMenu key="SubMenu" icon={<SettingOutlined/>} title="Username">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
            </SubMenu>
            <Item key="register" icon={<UserAddOutlined/>} className="float-right">
                Register
            </Item>
            <Item key="login" icon={<UserOutlined/>} className="float-right">
                Log in
            </Item>
        </Menu>
    );
};

export default Navbar;
