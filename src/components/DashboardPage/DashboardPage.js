import React, { useState, useEffect } from 'react';
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
  EuiStat,
  EuiIcon,
  EuiButton,
  EuiSpacer,
  EuiImage,
  EuiLoadingContent,
} from '@elastic/eui';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import ControlClusterPodsTable from '../ControlClusterPodsTable/ControlClusterPodsTable';
// import LineChartTmp from '../LineChartTmp/LineChartTmp';
// import AreaChartTmp from '../AreaChartTmp/AreaChartTmp';

import httpSevice from '../../httpService';

import MainImage from '../../assets/img/404.svg';

export default () => {
  const [podListData, setPodListData] = useState([]);
  const [connectivityDomainList] = useState([]);
  const [toggleEffect, setToggleEfffect] = useState(true);
  const [currentNamespace] = useState('wcm-system');
  const [packetLoss, setPacketLoss] = useState('5%');

  useEffect(() => {
    async function fetchPodsList() {
      try {
        const result = await httpSevice.get('api/v1/pods', {
          params: {
            ns: currentNamespace,
          },
        });
        setPodListData(result.data.items);
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
    fetchPodsList();
    const randomLoss = Math.floor(Math.random() * 10);
    setPacketLoss(`${randomLoss}%`);
  }, [toggleEffect, currentNamespace]);

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
                <h1>Control Cluster Overview</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiButton iconType="refresh" onClick={() => setToggleEfffect(!toggleEffect)}>
                Refresh
              </EuiButton>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageBody>
            <EuiSpacer />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiPanel>
                  <EuiStat
                    title={connectivityDomainList.length || '1'}
                    description="Number of UDP Streams"
                    textAlign="right"
                    titleColor="secondary"
                  >
                    <EuiIcon type="check" color="secondary" />
                  </EuiStat>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel>
                  <EuiStat
                    title={podListData.length || '1'}
                    description="Number of TCP Streams"
                    titleColor="secondary"
                    textAlign="right"
                  >
                    <EuiIcon type="check" color="secondary" />
                  </EuiStat>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel>
                  <EuiStat title={packetLoss} description="Packet loss" titleColor="secondary" textAlign="right">
                    <EuiIcon type="check" color="secondary" />
                  </EuiStat>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiTitle>
              <h3>MSM Pods</h3>
            </EuiTitle>
            <EuiPanel>
              {!podListData.length ? (
                <>
                  <EuiFlexItem className="img-center">
                    <EuiImage url={MainImage} size="m" alt="WCM" />
                  </EuiFlexItem>
                  <EuiSpacer />
                  <EuiTitle>
                    <h4>No Pods found</h4>
                  </EuiTitle>
                  <EuiText>
                    <p>
                      Something went wrong or we couldn&apos;t find Pods on your cluster. You can check our
                      documentation for additional help.
                      <br />
                      Our team is working hard to provide you the best user experience. If you have ideas on how to
                      improve our Dashboard, don&apos;t hesitate to contact our team.
                    </p>
                  </EuiText>
                  <EuiSpacer />
                  <EuiLoadingContent lines={2} />
                </>
              ) : (
                <ControlClusterPodsTable components={podListData} />
              )}
            </EuiPanel>
            <EuiSpacer />
          </EuiPageBody>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};
