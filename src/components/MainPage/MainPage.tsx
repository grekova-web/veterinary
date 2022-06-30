import React, {useEffect, useState} from 'react';
import {
    useQuery,
    gql
} from "@apollo/client";
import {Space, Spin} from 'antd';
import {
    FilteringState,
    IntegratedFiltering,
    IntegratedSorting,
    SortingState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableBandHeader,
    TableHeaderRow,
    TableFilterRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {GetTableData_animals} from "./__generated__/GetTableData";

export const TABLE_DATA = gql`
    query GetTableData {
        animals {
            id
            name
            kind
            age
            gender
            caseRecord
            owner {
                id
                name
                phone
                email
                address
            }
        }
    }
`;

const tableColumnExtensions: Table.ColumnExtension[] = [
    {columnName: 'id', width: 60, align: 'center'},
    {columnName: 'name', width: 100, align: 'center'},
    {columnName: 'kind', width: 100, align: 'center'},
    {columnName: 'age', width: 100, align: 'center'},
    {columnName: 'gender', width: 90, align: 'center'},
    {columnName: 'caseRecord', width: 500, align: 'center'},
    {columnName: 'ownerId', width: 60, align: 'center'},
    {columnName: 'gender', width: 60, align: 'center'},
];

const columns = [
    {name: "id", title: "ID"},
    {name: "name", title: "Имя"},
    {name: "kind", title: "Вид"},
    {name: "age", title: "Возраст"},
    {name: "gender", title: "Пол"},
    {name: "caseRecord", title: "Описание"},
    {name: "ownerId", title: "ID"},
    {name: "ownerName", title: "Имя"},
    {name: "ownerPhone", title: "Телефон"},
    {name: "ownerEmail", title: "Почта"},
    {name: "ownerAddress", title: "Адрес"}
];

const getRowId = (row: any) => row.id;

const MainPage = () => {
    const [rows, setRows] = useState([]);
    const {loading, data} = useQuery(TABLE_DATA, {pollInterval: 500});

    const [columnBands] = useState([
        {
            title: 'Владелец',
            children: [
                {columnName: 'ownerId'},
                {columnName: 'ownerName'},
                {columnName: 'ownerPhone'},
                {columnName: 'ownerEmail'},
                {columnName: 'ownerAddress'}
            ],
        }
    ]);

    useEffect(() => {
        if (data) {
            setRows(data.animals.map((animal: GetTableData_animals) => {
                return {
                    ...animal,
                    id: Number(animal.id),
                    ownerId: Number(animal.owner.id),
                    ownerName: animal.owner.name,
                    ownerPhone: animal.owner.phone,
                    ownerEmail: animal.owner.email,
                    ownerAddress: animal.owner.address
                }
            }))
        }
    }, [data]);

    return (
        <div>
            <h1>Наши пациенты</h1>

            {loading && <Space> <Spin size="large"/> </Space>}

            <Grid rows={rows} columns={columns} getRowId={getRowId}>
                <FilteringState defaultFilters={[]}/>
                <IntegratedFiltering/>
                <SortingState
                    defaultSorting={[{columnName: 'id', direction: 'asc'}]}
                />
                <IntegratedSorting/>
                <Table columnExtensions={tableColumnExtensions}/>
                <TableHeaderRow showSortingControls/>
                <TableBandHeader
                    columnBands={columnBands}
                />
                <TableFilterRow/>
            </Grid>
        </div>
    );
};

export default MainPage;