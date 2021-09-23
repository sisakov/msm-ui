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
  EuiToolTip,
} from '@elastic/eui';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SidebarMenu from '../SidebarMenu/SidebarMenu';
import PodsTable from '../PodsTable/PodsTable';
// import AreaChartTmp from '../AreaChartTmp/AreaChartTmp';

import MainImage from '../../assets/img/200.svg';
import NoFoundImage from '../../assets/img/404.svg';

export default () => {
  const defaultResurces = [
    {
      name: 'camera-558f4bc8d9-d5krs',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'camera',
      status: 'Running',
      type: 'Service',
    },
    {
      name: 'gateway-78d5d597b4-cvqnj',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'gateways-9w4fh',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'k8s-apiclient-deployment-84845fb868-7gbsg ',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'kubernetes',
      status: 'Running',
      type: 'Service',
    },
  ];
  const msmInstalledResurces = [
    {
      name: 'camera-558f4bc8d9-d5krs',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'camera',
      status: 'Running',
      type: 'Service',
    },
    {
      name: 'gateway-78d5d597b4-cvqnj',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'gateways-9w4fh',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'k8s-apiclient-deployment-84845fb868-7gbsg',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'kubernetes',
      status: 'Running',
      type: 'Service',
    },
    {
      name: 'msm-admission-webhook-69df5cbb77-hnbn9',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'msm-cni-brgsd',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'simple-server-6b9874c556-dl6w7',
      status: 'Running',
      type: 'Pod',
    },
    {
      name: 'gateway-service',
      status: 'Running',
      type: 'Service',
    },
    {
      name: 'k8s-apiclient-service',
      status: 'Running',
      type: 'Service',
    },
    {
      name: 'msm-admission-webhook-svc',
      status: 'Running',
      type: 'Service',
    },
  ];
  const [podListData, setPodListData] = useState(defaultResurces);
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
  const [installToggle, setInstallToggle] = useState(true);
  const onClusterChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    setSelectedCluster(selectedOptions);
  };
  const connectToSelectedCluster = () => {
    setConnectToCluster(!connectToCluster);
  };
  const addMSM = () => {
    setInstallToggle(false);
    setPodListData(msmInstalledResurces);
  };
  const removeMSM = () => {
    setInstallToggle(true);
    setPodListData(defaultResurces);
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
                <h1>MSM Overview</h1>
              </EuiTitle>
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
                      <EuiToolTip position="top" content={<p>Work in progress!</p>}>
                        <EuiButton fullWidth iconType="indexSettings" onClick={() => setToggleEfffect(!toggleEffect)}>
                          Add New Cluster
                        </EuiButton>
                      </EuiToolTip>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </>
            ) : (
              <>
                <EuiFlexGroup>
                  <EuiFlexItem className="img-center">
                    <EuiImage url={MainImage} size="xxs" alt="WCM" />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer />
                <EuiTitle>
                  <h3>MSM Resources</h3>
                </EuiTitle>
                <EuiSpacer />
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiButton fill disabled={!installToggle} iconType="indexSettings" onClick={() => addMSM()}>
                      Install MSM
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiButton disabled={installToggle} color="danger" iconType="cross" onClick={() => removeMSM()}>
                      Uninstall MSM
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
                <EuiSpacer />
                <EuiPanel>
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
