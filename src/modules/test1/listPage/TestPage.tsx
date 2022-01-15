import React, { useState, useEffect } from 'react';
import { ListButton, TableList } from '@/components';
import { ParamsBase } from '@/interfaceBase/config';
import { getUserList } from '@/services/userService';
import { UserInfo } from '@/models/test';
const TestPage = () => {
  interface Params extends ParamsBase {
    userName: string;
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'userName',
      ellipsis: true,
    },
    {
      title: '年龄',
      dataIndex: 'userAge',
      ellipsis: true,
    },

    {
      title: '操作',
      width: '15%',
      render: (text: string, record: UserInfo) => {
        let buttons = [] as Array<any>;
        buttons.push(
          {
            handleName: '修改',
            handleAction: () => {
              alert('修改成功！' + text);
            },
          },
          {
            handleName: '删除',
            handleAction: () => {
              alert('删除成功！' + record);
            },
          }
        );
        return <ListButton buttons={buttons} maxShowNum={2} />;
      },
    },
  ];
  const [dataSources, setDataSources] = useState([]);
  const params: Params = {
    userName: '',
    offset: 1,
    limit: 10,
  };
  // 每次当props.params参数变更的时候去查询新数据
  useEffect(() => {
    fetchData(params);
  });

  const fetchData = async (params: any) => {
    const response = await getUserList(params);
    if (response.data) {
      setDataSources(response.data);
    }
  };
  return (
    <div className="page__wrapper">
      <div className="page__content">
        <TableList
          loadGetData={fetchData}
          dataSources={dataSources}
          columns={columns}
          params={params}
          rowKey="userId"
        />
      </div>
    </div>
  );
};

export default TestPage;
