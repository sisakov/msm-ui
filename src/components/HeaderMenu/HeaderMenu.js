import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  EuiAvatar,
  EuiBadge,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiHeader,
  EuiHeaderAlert,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiLink,
  EuiPopover,
  EuiPopoverFooter,
  EuiPopoverTitle,
  EuiPortal,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiHeaderLink,
} from '@elastic/eui';
import { htmlIdGenerator } from '@elastic/eui/lib/services';

import CiscoLogo from '../../assets/img/CiscoLogoBlack.png';

const HeaderUpdates = () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const alerts = [
    {
      title: 'Pod Failure',
      text: 'connectivity-domain-operator pod failure.',
      action: <EuiLink href="">Details</EuiLink>,
      date: '30 Aug 2021',
    },
    {
      title: 'EKS warning',
      text: 'AWS east network issue.',
      action: (
        <EuiLink target="_blank" external href="https://status.aws.amazon.com/">
          External Link
        </EuiLink>
      ),
      date: '29 Aug 2021',
    },
  ];
  const logs = [
    {
      title: 'MSM info',
      text: 'Show more deails about the stream.',
      action: <EuiLink href="">Learn about feature controls</EuiLink>,
      date: '15 Sep 2021',
      badge: <EuiBadge>1.2</EuiBadge>,
    },
    {
      title: 'Add filtering',
      text: 'Simplified navigation, responsive dashboards.',
      action: (
        <EuiLink target="_blank" external href="https://wwwin-github.cisco.com/">
          Link to GitHub
        </EuiLink>
      ),
      date: '10 Sep 2021',
      badge: <EuiBadge color="hollow">1.1</EuiBadge>,
    },
    {
      title: 'Service Account enhancement',
      text: 'Improve security access for k8s API.',
      action: <EuiLink href="">Go to Advanced Settings</EuiLink>,
      date: '1 Sep 2021',
      badge: <EuiBadge color="hollow">1.0</EuiBadge>,
    },
  ];

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const closePopover = () => {
    setIsPopoverVisible(false);
  };

  const showFlyout = () => {
    setIsFlyoutVisible(!isFlyoutVisible);
  };

  const showPopover = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  const bellButton = (
    <EuiHeaderLink
      iconType="documents"
      aria-controls="headerFlyoutNewsFeed"
      aria-expanded={isFlyoutVisible}
      aria-haspopup
      aria-label="Alerts feed: Updates available"
      onClick={() => showFlyout()}
    >
      Change Log
    </EuiHeaderLink>
  );

  const cheerButton = (
    <EuiHeaderLink
      iconType="bell"
      aria-controls="headerPopoverNewsFeed"
      aria-expanded={isPopoverVisible}
      aria-haspopup="true"
      aria-label="News feed: Updates available"
      onClick={showPopover}
    >
      Alerts
    </EuiHeaderLink>
  );

  const flyout = (
    <EuiPortal>
      <EuiFlyout onClose={closeFlyout} size="s" id="headerFlyoutNewsFeed" aria-labelledby="flyoutSmallTitle">
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="flyoutSmallTitle">What&apos;s new - Warning: WIP</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          {logs.map((log) => (
            <EuiHeaderAlert
              key={`log-${htmlIdGenerator()()}`}
              title={log.title}
              action={log.action}
              text={log.text}
              date={log.date}
              badge={log.badge}
            />
          ))}
        </EuiFlyoutBody>
        <EuiFlyoutFooter>
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty iconType="cross" onClick={closeFlyout} flush="left">
                Close
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText color="subdued" size="s">
                <p>Version 1.0</p>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlyoutFooter>
      </EuiFlyout>
    </EuiPortal>
  );

  const popover = (
    <EuiPopover
      id="headerPopoverNewsFeed"
      ownFocus
      repositionOnScroll
      button={cheerButton}
      isOpen={isPopoverVisible}
      closePopover={closePopover}
      panelPaddingSize="none"
    >
      <EuiPopoverTitle paddingSize="s">Alerts - Warning: WIP</EuiPopoverTitle>
      <div style={{ maxHeight: '40vh', overflowY: 'auto', padding: 4 }}>
        <EuiSpacer size="s" />
        {alerts.map((alert) => (
          <EuiHeaderAlert
            key={`alert-${htmlIdGenerator()()}`}
            title={alert.title}
            action={alert.action}
            text={alert.text}
            date={alert.date}
            badge={alert.badge}
          />
        ))}
      </div>
      <EuiPopoverFooter paddingSize="s">
        <EuiText color="subdued" size="s">
          <p>Version 1.0</p>
        </EuiText>
      </EuiPopoverFooter>
    </EuiPopover>
  );

  return (
    <>
      {popover}
      {bellButton}
      {isFlyoutVisible && flyout}
    </>
  );
};

const HeaderUserMenu = () => {
  const id = htmlIdGenerator()();
  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const userProfileButton = (
    <EuiHeaderLink
      iconType="user"
      aria-controls={id}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      MSM Admin
    </EuiHeaderLink>
  );

  return (
    <EuiPopover
      id={id}
      repositionOnScroll
      button={userProfileButton}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup gutterSize="m" className="euiHeaderProfile" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiAvatar name="Admin" size="xl" />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>MSM Admin</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiLink>Edit profile</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};

export default () => {
  const [position] = useState('static');
  const [theme] = useState('default');
  const history = useHistory();

  return (
    <>
      <EuiHeader position={position} theme={theme}>
        <EuiHeaderLogo
          iconType={CiscoLogo}
          href="/landing"
          onClick={(e) => {
            e.preventDefault();
            history.push('/landing');
          }}
          aria-label="Go to home page"
        >
          Media Service Mesh
        </EuiHeaderLogo>
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <HeaderUserMenu />
            <HeaderUpdates />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </>
  );
};
