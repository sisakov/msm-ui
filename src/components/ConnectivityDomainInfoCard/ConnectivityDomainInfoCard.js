import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import moment from 'moment';
import _ from 'lodash';

import {
  EuiButtonEmpty,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiTitle,
  EuiText,
  EuiSpacer,
  EuiTextColor,
  EuiLoadingContent,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiImage,
  EuiTabbedContent,
} from '@elastic/eui';

import ConnectivityDomainPodsTable from '../ConnectivityDomainPodsTable/ConnectivityDomainPodsTable';
import topologyImg from '../../assets/img/cd-topology.svg';
import cdInfoData from './cdInfoData-placeholder.json';

function ConnectivityDomainInfoCard({ cdData }) {
  const creationTimestamp = moment(cdData.metadata.creationTimestamp).format('MMMM Do YYYY, h:mm a');

  const [isCDIfoFlyoutVisible, setIsCDInofFlyoutVisible] = useState(false);
  const [flyoutTitle, setFlyOutTitle] = useState('wcm-cd-info');
  let cdInfoflyout;
  if (isCDIfoFlyoutVisible) {
    cdInfoflyout = (
      <EuiFlyout ownFocus onClose={() => setIsCDInofFlyoutVisible(false)} aria-labelledby="flyoutTitle">
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyoutTitle">{flyoutTitle}</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <ReactJson src={cdInfoData} name={flyoutTitle} indentWidth={2} enableClipboard={false} collapsed={2} />
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }

  let cdPodList;
  if (!_.isNil(cdData) && !_.isNil(cdData.status.pods)) {
    cdPodList = cdData.status.pods.map((pod) => ({
      name: pod,
      href: `#/pod/${pod}`,
      iconType: 'node',
      status: 'Running',
      namespace: 'wcm-system',
    }));
  }

  const tabs = [
    {
      id: 'cd-details',
      name: 'CD Details',
      content: (
        <>
          <EuiSpacer />
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiText size="s">
                <dt>IP Family</dt>
                <dd>{cdData.spec.ipam.ipFamily}</dd>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexItem>
                <EuiText size="s">
                  <dt>Prefix pool</dt>
                  <dd>{cdData.spec.ipam.prefixPool}</dd>
                </EuiText>
              </EuiFlexItem>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexItem>
                <EuiText size="s">
                  <dt>Istio</dt>
                  <dd>{cdData.spec.istio}</dd>
                </EuiText>
              </EuiFlexItem>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiFlexItem>
                <EuiText size="s">
                  <dt>{cdData.status.cdInfo.deployment || 'NA'}</dt>
                  <dd className="euiButtonEmptyNoPadding">
                    <EuiButtonEmpty
                      color="primary"
                      size="xs"
                      onClick={() => {
                        setFlyOutTitle(`cd-info name: ${cdData.status.cdInfo.deployment}`);
                        setIsCDInofFlyoutVisible(true);
                      }}
                    >
                      Show CD Info details
                    </EuiButtonEmpty>
                    {cdInfoflyout}
                  </dd>
                </EuiText>
              </EuiFlexItem>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText size="s">
                <dt>App DNS</dt>
                <dd>{cdData.status.appDns.deployment || 'NA'}</dd>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiFlexItem>
                <EuiText size="s">
                  <dt>NSR</dt>
                  <dd>{cdData.status.nsr.deployment || 'NA'}</dd>
                </EuiText>
              </EuiFlexItem>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiTitle size="xs">
            <h4>
              <EuiTextColor color="secondary">List of Pods</EuiTextColor>
            </h4>
          </EuiTitle>
          {cdPodList ? (
            <ConnectivityDomainPodsTable components={cdPodList} />
          ) : (
            <>
              <EuiText color="warning">
                <dt>Warning</dt>
                <dd>Can&apos;t get pod list. Tip: check your connectivity domain operator resourse</dd>
              </EuiText>
              <EuiLoadingContent lines={2} />
            </>
          )}
        </>
      ),
    },
    {
      id: 'topology-view',
      name: 'Topology view',
      content: (
        <EuiFlexItem>
          <EuiSpacer />
          <EuiTitle size="s">
            <h4>
              <EuiTextColor color="warning">
                Note: topology view currently is a work in progress. Our team is working hard to provide you the best
                user experience possible. Stay tuned. Thank you.
              </EuiTextColor>
            </h4>
          </EuiTitle>
          <EuiImage url={topologyImg} size="xl" alt="WCM" />
          <EuiSpacer />
          <EuiSpacer />
        </EuiFlexItem>
      ),
    },
  ];

  return (
    <EuiPanel>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>
              <EuiTextColor color="secondary">{cdData.metadata.name}</EuiTextColor>
            </h4>
          </EuiTitle>
          <EuiText size="s">{`Created: ${creationTimestamp}`}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="s" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText size="s" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiTabbedContent tabs={tabs} initialSelectedTab={tabs[0]} autoFocus="selected" />
    </EuiPanel>
  );
}

export default ConnectivityDomainInfoCard;

ConnectivityDomainInfoCard.propTypes = {
  cdData: PropTypes.shape({
    apiVersion: PropTypes.string,
    metadata: PropTypes.shape({
      creationTimestamp: PropTypes.string,
      name: PropTypes.string,
    }),
    status: PropTypes.shape({
      pods: PropTypes.arrayOf(PropTypes.string),
      cdInfo: PropTypes.shape({
        configMap: PropTypes.string,
        deployment: PropTypes.string,
        serviceAccount: PropTypes.string,
      }),
      appDns: PropTypes.shape({
        deployment: PropTypes.string,
      }),
      nsr: PropTypes.shape({
        deployment: PropTypes.string,
      }),
    }),
    spec: PropTypes.shape({
      istio: PropTypes.string,
      ipam: PropTypes.shape({
        ipFamily: PropTypes.string,
        prefixPool: PropTypes.string,
      }),
    }),
  }),
};

ConnectivityDomainInfoCard.defaultProps = {
  cdData: {
    apiVersion: 'NA-default',
    metadata: {
      creationTimestamp: 'NA-default',
      name: 'NA-default',
    },
    status: {
      pods: [],
      cdInfo: {
        configMap: 'NA-default',
        deployment: 'NA-default',
        serviceAccount: 'NA-default',
      },
      appDns: {
        deployment: 'NA-default',
      },
      nsr: {
        deployment: 'NA-default',
      },
    },
    spec: {
      istio: 'NA-default',
      ipam: {
        ipFamily: 'NA-default',
        prefixPool: 'NA-default',
      },
    },
  },
};
