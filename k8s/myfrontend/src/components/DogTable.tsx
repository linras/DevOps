import {useEffect, useState} from "react";
import "antd/dist/antd.css";
import { Table, Button } from "antd";
import { ColumnsType } from 'antd/lib/table';
import { DogForm } from "./DogForm";
import Api from "../services/Api";

export interface Dog {
  id?: number;
  name: string;
  yearsold: number;
  race: string;
  favouritefood: string;
}

export interface DogRow extends Dog {
  key: number;
}

const DogsImplementation = () => {
  const [dogs, setDogs] = useState<Dog[]>();
  const [editedDog, setEditedDog] = useState<Dog | null>();

  useEffect(() => {
    let didCancel = false;
    (async () => {
      try {
        const result = await Api.getDogs();
        if(didCancel) return;
        setDogs(result);
      } catch (ex) {
        if(didCancel) return;
        console.log(ex);
      }
    })();
    return () => {
      didCancel = true;
    };
  }, []);

  const mapDogs = (dogs: Dog[]) : DogRow[] => dogs.map(d => { return {...d, key: d.id!}});

  const handleDogCreate = async (dog : Dog) => {
    try {
      const newDog = await Api.createDog(dog);
      setDogs(dogs ? dogs.concat(newDog) : [newDog]);
    } catch (ex){
      console.log(ex);
    }
  }

  const handleDogEdit = async (dog : Dog) => {
    try {
      const editedDog = await Api.editDog(dog);
      setDogs(dogs ? dogs.filter(d => d.id !== dog.id).concat(editedDog) : [editedDog]);
    } catch (ex){
      console.log(ex);
    }
  }

  const handleDogDelete = async (dogId : number) => {
    try {
      await Api.deleteDog(dogId);
      setDogs(dogs?.filter(d => d.id !== dogId));
    } catch (ex){
      console.log(ex);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      fixed: "left",
      render: (value: string) => value,
      sorter: (a: Dog, b: Dog) => a.name.localeCompare(b.name, 'en', {sensitivity: 'base'}),
      defaultSortOrder: "ascend"
    },
    {
      title: "Race",
      dataIndex: "race"
    },
    {
      title: "Years old",
      dataIndex: "yearsold"
    },
    {
      title: "Favourite food",
      dataIndex: "favouritefood"
    },
    {
      dataIndex: "actions",
      key: "actions",
      width: 300,
      fixed: "right",
      title: <Button type="primary" onClick={() => setEditedDog(null)} block>Add a dog</Button>,
      render: (_value, row, _index) => <div>
          {row.id !== undefined && <Button danger block 
            onClick={() => handleDogDelete(row.id!)}>Delete {row.name}
          </Button>}
          <Button block style={{color: 'YellowGreen', borderColor:'YellowGreen', marginTop: 2}}
            onClick={() => setEditedDog(row)}>Edit {row.name}
          </Button>
        </div>

    }
  ] as ColumnsType<Dog>;

  return (
    <div>
      <Table
        sticky
        columns={columns}
        dataSource={dogs ? mapDogs(dogs) : undefined}
        bordered
        size="middle"
        scroll={{ x: 1200 }}
      />
      {editedDog !== undefined && <DogForm initialDog={editedDog} onCancel={() => setEditedDog(undefined)} handleDogCreate={handleDogCreate} handleDogEdit={handleDogEdit}/>}
    </div>
  );
}

export const DogTable = DogsImplementation;

