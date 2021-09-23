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
  EuiComboBox,
  EuiFormRow,
} from '@elastic/eui';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import PodsTable from '../PodsTable/PodsTable';
import LineChartTmp from '../LineChartTmp/LineChartTmp';
// import AreaChartTmp from '../AreaChartTmp/AreaChartTmp';

import MainImage from '../../assets/img/200.svg';
import NoFoundImage from '../../assets/img/404.svg';

export default () => {
  const [podListData, setPodListData] = useState([
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
  ]);
  const options = [
    {
      label: 'cisco-east-2',
    },
    {
      label: 'cisco-west-1',
    },
    {
      label: 'aws-k8s-1',
    },
    {
      label: 'cisco-east-3',
    },
  ];
  const [selectedCluster, setSelectedCluster] = useState([options[0]]);
  const [toggleEffect, setToggleEfffect] = useState(true);
  const [connectToCluster, setConnectToCluster] = useState(false);

  const onClusterChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelectedCluster(selectedOptions);
  };
  const connectToSelectedCluster = () => {
    setConnectToCluster(!connectToCluster);
  };
  const addMSMPods = () => {
    setPodListData([
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
  };

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
            {!connectToCluster ? (
              <>
                <EuiFlexItem className="img-center">
                  <EuiImage url={NoFoundImage} size="m" alt="WCM" />
                </EuiFlexItem>
                <EuiSpacer />
                <EuiPanel>
                  <EuiTitle size="s">
                    <h4>No Cluster Connections Found</h4>
                  </EuiTitle>
                  <EuiText>
                    <p>Select cluster to connect from the dropdown below, or add new cluster.</p>
                  </EuiText>
                  <EuiSpacer />
                  <EuiFormRow
                    label="Your cluster"
                    helpText="Select a cluster from the list. If your cluster isn’t listed, create a custom one."
                  >
                    <EuiComboBox
                      placeholder="Select a single cluster"
                      singleSelection={{ asPlainText: true }}
                      options={options}
                      selectedOptions={selectedCluster}
                      onChange={onClusterChange}
                      customOptionText="Add {searchValue} as your occupation"
                    />
                  </EuiFormRow>
                  <EuiSpacer />
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <EuiButton fill iconType="push" onClick={() => connectToSelectedCluster()}>
                        Connect
                      </EuiButton>
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <EuiButton iconType="indexSettings" onClick={() => setToggleEfffect(!toggleEffect)}>
                        Add New Cluster
                      </EuiButton>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </>
            ) : (
              <>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiPanel>
                      <LineChartTmp />
                    </EuiPanel>
                  </EuiFlexItem>
                  <EuiFlexItem className="img-center">
                    <EuiImage url={MainImage} size="l" alt="WCM" />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer />
                <EuiTitle>
                  <h3>MSM Pods</h3>
                </EuiTitle>
                <EuiSpacer />
                <EuiPanel>
                  <EuiButton fill iconType="indexSettings" onClick={() => addMSMPods()}>
                    Install MSM Pods
                  </EuiButton>
                  <EuiSpacer />
                  <PodsTable components={podListData} />
                </EuiPanel>
              </>
            )}
          </EuiPageBody>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};
