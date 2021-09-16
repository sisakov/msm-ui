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
  EuiStat,
  EuiIcon,
  EuiButton,
  EuiSpacer,
  EuiHealth,
  EuiTextColor,
} from '@elastic/eui';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import MemberClusterCDTable from '../MemberClusterCDTable/MemberClusterCDTable';

export default () => {
  const controlClusterData = {
    name: 'kind-ctr-1',
    provider: 'aws-east',
    fqdn: 'kind.cisco.com',
    publicIp: '221.20.1.33',
    status: 'healthy',
    ssh: 'https://someurl.cisco.com',
    lastUpdate: 'Mar 8, 2021',
  };
  const memberClusterData = {
    name: 'kind-mbm-1',
    provider: 'aws-east',
    fqdn: 'mem-kind.cisco.com',
    publicIp: '221.20.1.43',
    status: 'healthy',
    ssh: 'https://someurl1.cisco.com',
    forwarder: 'VPP',
    lastUpdate: 'Mar 11, 2021',
    cdData: [
      {
        name: 'red',
        online: true,
        update: 'Mar 11, 2021',
        workloads: 'App1, App2-WellsFargo, App3-Apple',
      },
      {
        name: 'green',
        online: true,
        update: 'Mar 11, 2021',
        workloads: 'App1, App2-WellsFargo',
      },
      {
        name: 'blue',
        online: true,
        update: 'Mar 11, 2021',
        workloads: 'App1, App2-WellsFargo',
      },
    ],
  };
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
                <h1>Member Clusters Overview</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiButton
                iconType="refresh"
                onClick={() => {
                  setStat({ numberOfWorkloads: stat.numberOfWorkloads + 1 });
                }}
              >
                Refresh
              </EuiButton>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageBody>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiPanel>
                  <EuiStat title="3" description="Number of Member Clusters" textAlign="right" titleColor="secondary">
                    <EuiIcon type="check" color="secondary" />
                  </EuiStat>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel>
                  <EuiStat title="2" description="Connectivity Domains" titleColor="secondary" textAlign="right">
                    <EuiIcon type="check" color="secondary" />
                  </EuiStat>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel>
                  <EuiStat
                    title={stat.numberOfWorkloads}
                    description="Total Number of Worloads"
                    titleColor="secondary"
                    textAlign="right"
                  >
                    <EuiIcon type="check" color="secondary" />
                  </EuiStat>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiPanel betaBadgeLabel="Control Cluster Overview">
              <EuiTitle size="xs">
                <h4>
                  Control cluster name:&nbsp;
                  {controlClusterData.name}
                </h4>
              </EuiTitle>
              <EuiSpacer />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>Provider</dt>
                      <dd>{controlClusterData.provider}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>FQDN</dt>
                      <dd>{controlClusterData.fqdn}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>Public IP Address</dt>
                      <dd>{controlClusterData.publicIp}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>SSH</dt>
                      <dd>{controlClusterData.ssh}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>Status</dt>
                      <dd>
                        <EuiHealth color="green">Healthy</EuiHealth>
                      </dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>Last Update</dt>
                      <dd>{controlClusterData.lastUpdate}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
            <EuiSpacer />
            <EuiTitle size="s">
              <h2>
                <EuiTextColor color="subdued">Member Cluster List </EuiTextColor>
              </h2>
            </EuiTitle>
            <EuiPanel>
              <EuiTitle size="xs">
                <h4>
                  Member Cluster Name:&nbsp;
                  {memberClusterData.name}
                </h4>
              </EuiTitle>
              <EuiSpacer />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>Status</dt>
                      <dd>
                        <EuiHealth color="green">Healthy</EuiHealth>
                      </dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>Provider</dt>
                      <dd>{memberClusterData.provider}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>FQDN</dt>
                      <dd>{memberClusterData.fqdn}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>Public IP Address</dt>
                      <dd>{memberClusterData.publicIp}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>SSH</dt>
                      <dd>{memberClusterData.ssh}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>NSM Forwarder</dt>
                      <dd>{memberClusterData.forwarder}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>WCM NSE Discovery</dt>
                      <dd>
                        <EuiHealth color="green">Healthy</EuiHealth>
                      </dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText>
                    <dl>
                      <dt>Last Update</dt>
                      <dd>{memberClusterData.lastUpdate}</dd>
                    </dl>
                  </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer />
              <MemberClusterCDTable cdList={memberClusterData.cdData} />
            </EuiPanel>
          </EuiPageBody>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};
