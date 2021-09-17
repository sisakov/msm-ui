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
  EuiStat,
  htmlIdGenerator,
} from '@elastic/eui';

import HeaderMenu from '../HeaderMenu/HeaderMenu';
import SidebarMenu from '../SidebarMenu/SidebarMenu';

import httpSevice from '../../httpService';

export default () => {
  const [toggleEffect, setToggleEfffect] = useState(true);
  const [lossValue, setLossValue] = useState('0');
  const onChange = (e) => {
    setLossValue(e.target.value);
  };

  useEffect(() => {
    async function fetchConnectivityDamainList() {
      try {
        const clear = await httpSevice.delete('http://heronab3.miniserver.com:8080/delete');
        console.log('clear.data :>> ', clear.data);
        console.log('lossValue :>> ', lossValue);
        const result = await httpSevice.post('http://heronab3.miniserver.com:8080/add', {
          percentage: lossValue,
        });
        console.log('result.data) :>> ', result.data);
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
                <EuiTitle size="xs">
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
                <EuiButton iconType="play" onClick={() => setToggleEfffect(!toggleEffect)}>
                  Apply
                </EuiButton>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiTitle size="xs">
                  <h3>Metrics</h3>
                </EuiTitle>
                <EuiSpacer />
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiStat title={lossValue} description="Packets Loss" titleColor="subdued" />
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiStat title="24" description="IPG Jitter" titleColor="subdued" />
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiStat title="5" description="Out of Sequence (OoS)" titleColor="subdued" />
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            <EuiTitle size="s">
              <h2>
                <EuiTextColor color="subdued">Demo Streams</EuiTextColor>
              </h2>
            </EuiTitle>
            <EuiSpacer />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiTitle size="xs">
                  <EuiTextColor>UDP Stream</EuiTextColor>
                </EuiTitle>
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
                <EuiTitle size="xs">
                  <EuiTextColor>TCP Stream</EuiTextColor>
                </EuiTitle>
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
