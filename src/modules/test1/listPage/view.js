import { ServicePath } from '@/utils/constants';

const viewJson = [
  {
    title: '基础信息',
    rowKey: 'storageId',
    columns: [
      {
        zhName: 'FTP名称',
        field: 'storageName',
        valueType: 'string',
        isUpdate: true,
        updateUrl: '/storages',
        basePath: ServicePath.BASE_DATA,
      },
      {
        zhName: '主机IP',
        field: 'storageHost',
        valueType: 'string',
      },
      {
        zhName: '端口',
        field: 'storageHost',
        valueType: 'string',
      },
      {
        zhName: '用户名',
        field: 'storageUsername',
        valueType: 'string',
      },
      {
        zhName: 'FTP分类',
        field: 'storageProtocol',
        valueType: 'enum',
        enum: 'FTP_TYPE',
      },
      // {
      //   zhName: 'FTP状态',
      //   field: 'type',
      //   stateLabel: 'ftpInvocation',
      // },
      {
        zhName: '配置路径',
        field: 'storagePath',
        valueType: 'string',
        width: 100,
      },
    ],
  },
];
export { viewJson };
