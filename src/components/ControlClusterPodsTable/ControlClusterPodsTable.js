import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';
import moment from 'moment';
import {
  EuiBasicTable,
  EuiHealth,
  EuiIcon,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiTitle,
  EuiText,
} from '@elastic/eui';

const ControlClusterPodsTable = ({ components }) => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [flyoutTitle, setFlyOutTitle] = useState('wcm-system');
  const [flyOutContent, setFlyOutContent] = useState();
  let flyout;
  if (isFlyoutVisible) {
    flyout = (
      <EuiFlyout ownFocus onClose={() => setIsFlyoutVisible(false)} aria-labelledby="flyoutTitle">
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="m">
            <h2 id="flyoutTitle">Pod Details</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText>
            <ReactJson name={flyoutTitle} src={flyOutContent} indentWidth={2} enableClipboard={false} collapsed={2} />
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    );
  }

  const columns = [
    {
      field: 'status.phase',
      width: '100px',
      name: 'Status',
      dataType: 'boolean',
      render: (online) => {
        const color = online === 'Running' ? 'success' : 'danger';
        return <EuiHealth color={color}>{online}</EuiHealth>;
      },
    },
    {
      field: 'provider',
      width: '80px',
      name: 'Provider',
      render: () => {
        const logo = 'logoKubernetes';
        return (
          <span>
            <EuiIcon type={logo} size="l" />
          </span>
        );
      },
    },
    {
      width: '100px',
      field: 'metadata.namespace',
      name: 'Namespace',
    },
    {
      field: 'metadata.name',
      name: 'Pod Name',
    },
    {
      field: 'status.podIP',
      name: 'Pod IP',
      width: '100px',
    },
    {
      field: 'status.hostIP',
      name: 'Host IP',
      width: '100px',
    },
    {
      field: 'status.startTime',
      name: 'Start Time',
      width: '200px',
      render: (time) => {
        const displayTime = moment(time).format('MMMM Do YYYY, h:mm a');
        return <span>{displayTime}</span>;
      },
    },
  ];

  const getRowProps = (item) => {
    const { id } = item;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => {
        setFlyOutContent(item);
        setFlyOutTitle(item.metadata.name);
        setIsFlyoutVisible(true);
      },
    };
  };

  const getCellProps = (item, column) => {
    const { id } = item;
    const { field } = column;
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${id}-${field}`,
      textOnly: true,
    };
  };

  return (
    <>
      <EuiBasicTable
        items={components}
        rowHeader="firstName"
        columns={columns}
        rowProps={getRowProps}
        cellProps={getCellProps}
      />
      {flyout}
    </>
  );
};

ControlClusterPodsTable.propTypes = { components: PropTypes.arrayOf(PropTypes.object).isRequired };

export default ControlClusterPodsTable;
