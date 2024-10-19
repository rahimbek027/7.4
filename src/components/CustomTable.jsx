import React from 'react';
import { Table } from 'antd';

const CustomTable = ({isLoading,columns, data,tableParams, onChange}) => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            loading={isLoading}
            pagination={tableParams.pagination}
        />
    );

}
export default CustomTable;