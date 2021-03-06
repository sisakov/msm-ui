import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { EuiBasicTable, EuiHealth, EuiIcon } from '@elastic/eui';

const PodsTable = ({ components }) => {
  const columns = [
    {
      field: 'status',
      width: '120px',
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
      field: 'type',
      name: 'Type',
      width: '80px',
    },
    {
      field: 'name',
      name: 'Pod Name',
    },
    {
      field: 'status.startTime',
      name: 'Start Time',
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
    </>
  );
};

PodsTable.propTypes = { components: PropTypes.arrayOf(PropTypes.object).isRequired };

export default PodsTable;
