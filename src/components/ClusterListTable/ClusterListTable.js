import React from 'react';
import PropTypes from 'prop-types';
import { EuiBasicTable, EuiLink, EuiHealth, EuiIcon, EuiToolTip } from '@elastic/eui';

const ClusterListTable = ({ clusters }) => {
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
      name: 'Name',
    },
    {
      field: 'version',
      name: 'Version',
      truncateText: true,
      render: (version) => (
        <EuiLink href="#" target="_blank">
          {version}
        </EuiLink>
      ),
    },
    {
      field: 'role',
      name: (
        <EuiToolTip content="WCM roles - can be Control or Member">
          <span>
            Role
            <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
          </span>
        </EuiToolTip>
      ),
      truncateText: true,
      render: (version) => (
        <EuiLink href="#" target="_blank">
          {version}
        </EuiLink>
      ),
    },
    {
      field: 'cd',
      name: (
        <EuiToolTip content="List of connectivity domains assigned">
          <span>
            CD
            <EuiIcon size="s" color="subdued" type="questionInCircle" className="eui-alignTop" />
          </span>
        </EuiToolTip>
      ),
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
          name: 'Clone',
          description: 'Edit this cluster',
          type: 'icon',
          icon: 'wrench',
          onClick: () => '',
        },
        {
          name: 'Clone',
          description: 'Delete this cluster',
          type: 'icon',
          icon: 'cross',
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
      items={clusters}
      rowHeader="firstName"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />
  );
};

ClusterListTable.propTypes = { clusters: PropTypes.arrayOf(PropTypes.object).isRequired };

export default ClusterListTable;
