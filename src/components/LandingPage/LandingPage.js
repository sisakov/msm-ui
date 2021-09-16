import React from 'react';
import {
  EuiTextColor,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPage,
  EuiPageBody,
  EuiText,
  EuiButton,
  EuiSpacer,
  EuiPanel,
} from '@elastic/eui';
import { useHistory } from 'react-router-dom';
import MainImage from '../../assets/img/msm-main.svg';

import HeaderMenu from '../HeaderMenu/HeaderMenu';

export default () => {
  const history = useHistory();
  return (
    <>
      <HeaderMenu />
      <EuiPage style={{ padding: '80px' }}>
        <EuiPageBody component="div">
          <EuiSpacer size="xxl" />
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem>
              <EuiText>
                <EuiTitle>
                  <h1>
                    <EuiTextColor color="subdued">Media Servce Mesh </EuiTextColor>
                  </h1>
                </EuiTitle>
                <EuiSpacer />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda cupiditate recusandae in dicta iste
                  aspernatur dolor nam corporis voluptatibus eligendi cum beatae totam ducimus, deleniti ipsam rerum rem
                  minima placeat?
                </p>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum obcaecati, ullam ut dolorum delectus
                  incidunt voluptate at ratione sequi harum iste quas illo quis doloribus temporibus a accusamus dolorem
                  amet.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat aliquid reiciendis perferendis est
                  excepturi beatae ipsam facere molestiae. Deleniti mollitia corrupti repudiandae consequatur architecto
                  labore doloremque cum harum ipsa eveniet!
                </p>
                <EuiButton
                  fill
                  onClick={() => {
                    history.push('/dashboard');
                  }}
                >
                  LOGIN
                </EuiButton>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem className="img-center">
              <EuiImage url={MainImage} size="xl" alt="WCM" />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="xxl" />
        </EuiPageBody>
      </EuiPage>
      <EuiPanel hasShadow={false}>
        <p>Cisco Systems, 2021</p>
        <EuiSpacer size="s" />
        <p>All rights reserved</p>
      </EuiPanel>
    </>
  );
};
