import React from 'react';
import PropTypes from 'prop-types';
import { EuiBasicTable, EuiHealth } from '@elastic/eui';

const MemberClusterCDTable = ({ cdList }) => {
  const columns = [
    {
      field: 'name',
      name: 'Connectivity Domain Name',
    },
    {
      field: 'update',
      name: 'Last Update',
    },
    {
      field: 'workloads',
      name: 'Workloads',
    },
    {
      field: 'online',
      name: 'Online',
      dataType: 'boolean',
      render: (online) => {
        const color = online ? 'success' : 'danger';
        const label = online ? 'Online' : 'Offline';
        return <EuiHealth color={color}>{label}</EuiHealth>;
      },
    },
    {
      width: '70px',
      name: 'Actions',
      actions: [
        {
          name: 'Logs',
          description: 'Check logs',
          type: 'icon',
          icon: 'apmTrace',
          onClick: () => '',
        },
        {
          name: 'Refresh',
          description: 'Refresh component',
          type: 'icon',
          icon: 'refresh',
          onClick: () => '',
        },
      ],
    },
  ];

  const getRowProps = (item) => {
    const { id } = item;
    return {
      'data-test-subj': `row-${id}`,
      className: 'customRowClass',
      onClick: () => {},
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
    <EuiBasicTable
      items={cdList}
      rowHeader="firstName"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />
  );
};

MemberClusterCDTable.propTypes = { cdList: PropTypes.arrayOf(PropTypes.object).isRequired };

export default MemberClusterCDTable;
