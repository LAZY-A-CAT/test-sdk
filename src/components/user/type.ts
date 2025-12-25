import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
export interface DataType {
  key: string;
  nickname: string;
  phone: string;
  label: any;
  group: any;
  organization: string;
  date: string;
  info?: any;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  group_id?: any;
  nickname?: string;
  phone?: string;
  label_id?: any;
  organization_id?: any;
}

export interface TbListProps {
  loading: boolean;
  data: DataType[];
  tableParams: TableParams;
  handleTableChange: any;
}
