import React, { useState, useEffect } from 'react';
import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
  EuiButton,
  EuiSpacer,
  EuiTextColor,
  EuiRange,
  htmlIdGenerator,
} from '@elastic/eui';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SidebarMenu from '../SidebarMenu/SidebarMenu';

import httpSevice from '../../httpService';

export default () => {
  const [toggleEffect, setToggleEfffect] = useState(true);
  const [lossValue, setLossValue] = useState('20');
  const onChange = (e) => {
    setLossValue(e.target.value);
  };

  useEffect(() => {
    async function fetchConnectivityDamainList() {
      try {
        const result = await httpSevice.get('/api/v1/cds');
        console.log('result.data.items) :>> ', result.data.items);
      } catch (error) {
        console.log('error :>> ', error);
      }
    }
    fetchConnectivityDamainList();
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
                <h1>Live Stream Demo</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiButton iconType="refresh" onClick={() => setToggleEfffect(!toggleEffect)}>
                Refresh
              </EuiButton>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiSpacer size="l" />
          <EuiPageBody>
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiTitle size="xxs">
                  <h3>Set packet loss</h3>
                </EuiTitle>

                <EuiSpacer />

                <EuiRange
                  id={htmlIdGenerator()()}
                  value={lossValue}
                  onChange={onChange}
                  showRange
                  showTicks
                  fullWidth
                  tickInterval={10}
                  aria-label="An example of EuiRange with custom tickInterval"
                />

                <EuiSpacer size="xl" />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButton iconType="play" onClick={() => setToggleEfffect(!toggleEffect)}>
                  Apply
                </EuiButton>
                <EuiSpacer />
                <EuiButton iconType="broom" onClick={() => setToggleEfffect(!toggleEffect)}>
                  Clear
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiTitle size="s">
              <h2>
                <EuiTextColor color="subdued">Demo Streams</EuiTextColor>
              </h2>
            </EuiTitle>

            <EuiFlexGroup>
              <EuiFlexItem>
                <div
                  width="480px"
                  height="360px"
                  className="vxgplayer"
                  id="vxg_media_player1"
                  url="rtsp://heronab3.miniserver.com:8554/camera"
                  autostart
                  controls
                  avsync
                  nmf-src="/assets/pnacl/Release/media_player.nmf"
                  nmf-path="media_player.nmf"
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <div
                  width="480px"
                  height="360px"
                  className="vxgplayer"
                  id="vxg_media_player2"
                  url="rtsp://heronab3.miniserver.com:30554/camera"
                  autostart
                  controls
                  avsync
                  nmf-src="/assets/pnacl/Release/media_player.nmf"
                  nmf-path="media_player.nmf"
                />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageBody>
        </EuiPageBody>
      </EuiPage>
    </>
  );
};
