import React, { useState } from "react";
import { Table, Checkbox } from "antd";

function App() {
  const today = new Date();

  const initialState = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      width: "30%",
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date - b.date,
      render: (text, record) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Flag",
      dataIndex: "flag",
      sorter: (a, b) => a.flag - b.flag,
      render: (text, record) => <Checkbox checked={record.flag} />,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.Address - b.Address,
      width: "40%",
    },
    {
      title: "Date2",
      dataIndex: "date2",
      sorter: (a, b) => a.date2 - b.date2,
      render: (text, record) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Number",
      dataIndex: "number",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Flag2",
      dataIndex: "flag2",
      sorter: (a, b) => a.flag2 - b.flag2,
      render: (text, record) => <Checkbox checked={record.flag2} />,
    },
  ];

  const [columns, setColumns] = React.useState(initialState);

  const [data, setData] = useState([
    {
      key: "112515",
      name: "John Brown",
      age: 32,
      date: today.setDate(today.getDate() + 1),
      address: "New York No. 1 Lake Park",
      flag: true,
      date2: today.setDate(today.getDate() + 2),
      number: 4,
      flag2: false,
    },
    {
      key: "215251",
      name: "Jim Green",
      age: 42,
      date: today.setDate(today.getDate() + 1),
      address: "London No. 1 Lake Park",
      flag: false,
      date2: today.setDate(today.getDate() + 2),
      number: 3,
      flag2: true,
    },
    {
      key: "41243",
      name: "Joe Black",
      age: 32,
      date: today.setDate(today.getDate() + 1),
      address: "Sydney No. 1 Lake Park",
      flag: true,
      date2: today.setDate(today.getDate() + 2),
      number: 1,
      flag2: false,
    },
    {
      key: "4123",
      name: "Jim Red",
      age: 32,
      date: today.setDate(today.getDate() + 1),
      address: "London No. 2 Lake Park",
      flag: false,
      date2: today.setDate(today.getDate() + 2),
      number: 2,
      flag2: false,
    },
  ]);

  React.useEffect(() => {
    const storedColumns = localStorage.getItem("columns");
    if (storedColumns) {
      const parsedColumns = JSON.parse(storedColumns);

      const columnsWithFunctions = parsedColumns.map((col) => ({
        ...col,
        hidden: col.hidden || false,
      }));

      setColumns(columnsWithFunctions);
    }

    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  React.useEffect(() => {
    try {
      const columnsToSave = columns.map((col) => ({
        ...col,
        hidden: col.hidden,
      }));
      localStorage.setItem("columns", JSON.stringify(columnsToSave));
      localStorage.setItem("data", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [columns, data]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <Checkbox.Group
        options={columns.map((col) => col.title)}
        value={columns.filter((col) => !col.hidden).map((col) => col.title)}
        onChange={(checkedValues) => {
          setColumns(
            initialState.map((col) => ({
              ...col,
              hidden: !checkedValues.includes(col.title),
            }))
          );
        }}
      />
      <Table
        columns={columns.filter((col) => !col.hidden)}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
