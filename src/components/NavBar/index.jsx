import React, { useState } from 'react';
import { TabBar } from 'zarm';
import { useHistory } from 'react-router-dom';
import CustomIcon from '../CustomIcon';

const NavBar = ({ showNav, pathname }) => {
  const [activeKey, setActiveKey] = useState('/');

  /**
   * 通过 useHistory 钩子拿到路由实例 history
   * 进行 history.push 进行路由跳转
   * @type {History<LocationState>}
   */
  const history = useHistory();

  const changeTab = (path) => {
    setActiveKey(path);
    history.push(path);
  };

  return (
    <TabBar visible={showNav} activeKey={pathname} onChange={changeTab}>
      <TabBar.Item
        itemKey="/"
        title="账单"
        icon={<CustomIcon type="zhangdan" />}
      />
      <TabBar.Item
        itemKey="/data"
        title="统计"
        icon={<CustomIcon type="tongji" />}
      />
      <TabBar.Item
        itemKey="/user"
        title="我的"
        icon={<CustomIcon type="wode" />}
      />
    </TabBar>
  );
};

export default NavBar;
