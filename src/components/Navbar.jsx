import React, { useState } from 'react';
import {  BankOutlined, LineOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const items = [
  {
    key: '1',
    icon: <BankOutlined className='scale-[2]' />,
    label: <strong className='text-[22px] leading-[27px] font-bold pl-4'>Tashkilotlar</strong>,
    children: [
      {
        key: '11',
        label: <Link to={'/'}>Tashkilotlar bo'limi</Link>,
        icon: <LineOutlined />
      },

    ],
  },
  {
    key: '2',
    icon: <UsergroupAddOutlined className='scale-[2]' />,
    label: <strong className='text-[22px] leading-[27px] font-bold pl-4'>Foydalanuvchilar</strong>,
    children: [
      {
        key: '21',
        label:<Link to={'/capital-users'}>Poytaxt foydanaluvchilari</Link> ,
        icon: <LineOutlined />
      },
      {
        key: '22',
        label: <Link to={'/region-users'}>Viloyat foydanaluvchilari</Link>,
        icon: <LineOutlined />
      },
    ],
  },

];
const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);
const App = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['1', '11']);
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };
  return (
    <Menu
      className='pt-5'
      theme='dark'
      mode="inline"
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{
        width: '20%',
      }}
      items={items}
    />
  );
};
export default App;