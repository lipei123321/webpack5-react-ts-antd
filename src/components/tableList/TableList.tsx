import React, { useState } from 'react';
import { Spin, Table, Pagination } from 'antd';
import { get } from 'lodash-es';
import styled from 'styled-components';

const TableDom = styled.div`
  .flex {
    display: flex;
    width: 100%;
    height: 100%;
    .ant-table-thead > tr > th {
      position: relative;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 12px;
      text-align: left;
      background: #fafafa;
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.3s ease;
    }
  }
`;
const TabPaginationDom = styled.div`
  text-align: right;
  right: 0;
  bottom: 30px;
  margin: 1.5%;
  margin-right: 0;
`;
interface TableBean {
  loadGetData?: (params: any) => void;
  params: any;
  dataSources: any;
  width?: number; // 默认100
  rowKey?: string; // 默认id
  columns: Array<any>;
  pagination?: any; // 不传默认true 前端分页 如果传就是后端分页
  limit?: number; // 每页多少条默认10条
}

interface PaginationBean {
  limit: number;
  offset: number;
  total: number;
}
const TableList = ({ ...props }: TableBean) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationBean>({
    offset: 1,
    limit: 10,
    total: 0,
  });

  const fetchData = async (params: any) => {
    try {
      setLoading(true);
      props.loadGetData(params);
    } finally {
      setLoading(false);
    }
  };

  const onChangePagination = (page: number) => {
    let { params } = props;
    params.offset = page;
    setPagination((state) => ({ ...state, offset: page }));
    fetchData(params);
  };
  return (
    <TableDom>
      <Spin style={{ width: '100%' }} tip="加载中..." spinning={loading}>
        <Table
          className="flex"
          loading={loading}
          dataSource={props.dataSources}
          rowKey={get(props, 'rowKey', 'id')}
          bordered
          pagination={get(props, 'pagination', false)}
          columns={get(props, 'columns', [])}
        />
      </Spin>
      {!props.pagination && (
        <TabPaginationDom>
          <Pagination
            showSizeChanger={false}
            current={pagination.offset}
            pageSize={pagination.limit}
            total={pagination.total}
            onChange={onChangePagination}
          />
        </TabPaginationDom>
      )}
    </TableDom>
  );
};

export default TableList;
