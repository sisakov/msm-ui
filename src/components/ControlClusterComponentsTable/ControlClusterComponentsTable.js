import React from 'react';
import PropTypes from 'prop-types';
import { EuiBasicTable, EuiHealth, EuiIcon, EuiToolTip } from '@elastic/eui';

const ControlClusterComponentsTable = ({ components }) => {
  const columns = [
    {
      width: '100px',
      field: 'provider',
      name: (
        <EuiToolTip content="Can be K8s, EKS, etc">
          <span>
            Provider
            <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
          </span>
        </EuiToolTip>
      ),
      render: (provider) => {
        const logo = provider === 'Kubernetes' ? 'logoKubernetes' : 'logoAWS';
        return (
          <span>
            <EuiIcon type={logo} size="l" />
          </span>
        );
      },
    },
    {
      field: 'name',
      name: 'Component Name',
    },
    {
      field: 'update',
      name: 'Last Update',
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
      items={components}
      rowHeader="firstName"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />
  );
};

ControlClusterComponentsTable.propTypes = { components: PropTypes.arrayOf(PropTypes.object).isRequired };

export default ControlClusterComponentsTable;
