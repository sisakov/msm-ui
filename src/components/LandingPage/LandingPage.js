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
                  The only way to deploy real-time applications in Kubernetes today is to use the kube-proxy NAT.
                  This approach adds extra hops and constrains UDP port selection for externally-sourced traffic (using “NodePorts”),
                  provides limited visibility and load-balancing granularity, and is unable to support protocols such as SIP and RTSP which negotiate UDP ports dynamically.
                </p>
                <p>
                  In contrast non-real time applications can make use of load balancers and service meshes to optimize traffic routing
                  and to enable network observability and data encryption.
                  Media Streaming Mesh extends these benefits to real-time applications and incorporates capabilities such as stream fan-out and error correction.
                </p>
                <p>
                  Media Streaming Mesh core value propositions are:
                  Extend the benefits of service meshes to real-time applications
                  Support both interactive applications and streaming media
                  Enable single cluster, multi-cluster and Internet-scale applications
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
