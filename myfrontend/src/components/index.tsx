import {useState} from "react";
import "antd/dist/antd.css";
import { Table, Button } from "antd";
import { ColumnsType } from 'antd/lib/table';
import { DogForm } from "./DogForm";

export interface Dog {
  id?: number;
  name: string;
}

const testData : Dog[] = [];
for (let i = 0; i < 10; i++) {
  testData.push({
    id: i,
    name: `Le doggo ${i}`
  });
}

const DogsImplementation = () => {
  const [dogs, setDogs] = useState<Dog[]>(testData);
  const [editedDog, setEditedDog] = useState<Dog | null>();

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
      dataIndex: "actions",
      key: "actions",
      width: 300,
      fixed: "right",
      title: <Button type="primary" onClick={() => setEditedDog(null)} block>Add a dog</Button>,
      render: (_value, row, _index) => <div>
          {row.id !== undefined && <Button danger block 
            onClick={() => deleteDog(row.id!)}>Delete {row.name}
          </Button>}
          <Button block style={{color: 'YellowGreen', borderColor:'YellowGreen', marginTop: 2}}
            onClick={() => setEditedDog(row)}>Edit {row.name}
          </Button>
        </div>

    }
  ] as ColumnsType<Dog>;

  const deleteDog = (id: number) => {
    setDogs(dogs?.filter(x => x.id !== id));
  }

  //useEffect()

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dogs}
        bordered
        size="middle"
        scroll={{ x: 1200 }}
      />
      {editedDog !== undefined && <DogForm dog={editedDog} onCancel={() => setEditedDog(undefined)}/>}
    </div>
  );
}

export const Dogs = DogsImplementation;

