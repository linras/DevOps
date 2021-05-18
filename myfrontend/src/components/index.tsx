import React, {useState} from "react";
import "antd/dist/antd.css";
import { Table, Input, Form } from "antd";
import { ColumnsType } from 'antd/lib/table';

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
    fixed: "left",
    render: (value: string) => value
  },
  {
    title: "Column 1"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    width: 200,
    fixed: "right"
  }
] as ColumnsType<Dog>;

interface IProps{
  bleble: string;
}

export interface Dog {
    name: string;
}

interface DogFormValues {
  name: string;
}

const data : Dog[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    //key: i,
    name: `Le doggo ${i}`
    //render: (value: string) => value
  });
}

const DogsImplementation = ({bleble}: IProps) => {
  const [dogs, setDogs] = useState<Dog>();
  const [form] = Form.useForm<DogFormValues>();
  return (
    <div>
      <Table
        // components={{
        //   body: {
        //     cell: EditableCell
        //   }
        // }}
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
        style={{ width: 800 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
}

export const Dogs = DogsImplementation;

