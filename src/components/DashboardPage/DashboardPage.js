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
import LineChartTmp from '../LineChartTmp/LineChartTmp';
// import AreaChartTmp from '../AreaChartTmp/AreaChartTmp';

import MainImage from '../../assets/img/200.svg';

export default () => {
  const [podListData] = useState([
    {
      name: 'camera-558f4bc8d9-d5krs',
      status: 'Running',
    },
    {
      name: 'gateway-78d5d597b4-cvqnj',
      status: 'Running',
    },
    {
      name: 'gateways-9w4fh',
      status: 'Running',
    },
    {
      name: 'k8s-apiclient-deployment-84845fb868-7gbsg ',
      status: 'Running',
    },
    {
      name: 'msm-admission-webhook-69df5cbb77-hnbn9 ',
      status: 'Running',
    },
    {
      name: 'msm-cni-brgsd',
      status: 'Running',
    },
    {
      name: 'simple-server-6b9874c556-dl6w7',
      status: 'Running',
    },
  ]);
  const [toggleEffect, setToggleEfffect] = useState(true);
  const [packetLoss, setPacketLoss] = useState('5%');

  useEffect(() => {
    const randomLoss = Math.floor(Math.random() * 10);
    setPacketLoss(`${randomLoss}%`);
  }, [toggleEffect]);

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
                <h1>MSM Cluster Overview</h1>
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
                  <LineChartTmp />
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel className="img-center">
                  <EuiImage url={MainImage} size="l" alt="WCM" />
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiPanel>
                  <EuiStat title="1" description="Number of UDP Streams" textAlign="right" titleColor="secondary">
                    <EuiIcon type="check" color="secondary" />
                  </EuiStat>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel>
                  <EuiStat title="1" description="Number of TCP Streams" titleColor="secondary" textAlign="right">
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
