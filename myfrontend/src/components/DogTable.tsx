import React, {useState} from "react";
import './App.css';
import "antd/dist/antd.css";
import { Table, Input, Form } from "antd";
import { ColumnsType } from 'antd/lib/table';
import { Dog } from ".";

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
];

interface IProps{
  data: Dog[];
}

const data : ColumnsType<Dog> = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    //render: (value: string) => value
  });
}

const DogTableImplementation = ({data}: IProps) => {
  const [dogs, setDogs] = useState<Dog>();
  return (
    "dupa"
  );
}

export const DogTable = DogTableImplementation;

