import React, { useState } from 'react';
import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiPanel,
  EuiTitle,
  EuiText,
  EuiButton,
  EuiSpacer,
  EuiImage,
  EuiTextColor,
} from '@elastic/eui';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import fillerImage from '../../assets/img/Online_information.svg';

export default () => {
  const [stat, setStat] = useState({
    numberOfWorkloads: 7,
  });

  return (
    <>
      <HeaderMenu />
      <EuiPage>
        <EuiPageSideBar>
          <SidebarMenu />
        </EuiPageSideBar>
        <EuiPageBody component="div">
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle>
                <h1>Manage WCM</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiButton iconType="refresh" onClick={() => setStat({ numberOfWorkloads: stat.numberOfWorkloads + 1 })}>
                Refresh
              </EuiButton>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageBody>
            <EuiSpacer size="xxl" />
            <EuiPanel style={{ padding: '80px 40px' }}>
              <EuiFlexGroup alignItems="center">
                <EuiFlexItem>
                  <EuiText>
                    <EuiTitle>
                      <h1>
                        <EuiTextColor color="subdued">Work In Progress </EuiTextColor>
                      </h1>
                    </EuiTitle>
                    <p>
                      Our team is working hard to provide you best user experience. If you have ideas of how to improve
                      our Dashboard, please don&apos;t hesitate to contact our team.
                    </p>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem className="img-center">
                  <EuiImage url={fillerImage} size="m" alt="WCM" />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiPageBody>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};
