import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { EuiSideNav } from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui/lib/services';

export default () => {
  const location = useLocation();
  const history = useHistory();
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const [selectedItemName, setSelectedItem] = useState(location.pathname);

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name) => {
    setSelectedItem(name);
  };

  // NOTE: Duplicate `name` values will cause `id` collisions.
  const createItem = (name, path, data = {}) => ({
    ...data,
    id: htmlIdGenerator()(name),
    name,
    isSelected: selectedItemName === path,
    onClick: () => {
      selectItem(path);
      history.push(path);
    },
  });

  const sideNav = [
    createItem('Dashboard', '/', {
      items: [
        createItem('Overview', '/dashboard'),
        createItem('Live stream', '/live-stream'),
        createItem('MSM Workloads', '/workloads'),
      ],
    }),
  ];

  return (
    <EuiSideNav
      mobileTitle="Navigation Menu"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
    />
  );
};
