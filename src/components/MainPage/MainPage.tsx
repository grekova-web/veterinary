import React, {useEffect, useState} from 'react';
import {
    useQuery,
    gql
} from "@apollo/client";
import {Space, Spin} from 'antd';
import {
    ColumnBands,
    FilteringState,
    IntegratedFiltering,
    TableColumn,
    TableRow,
    RowDetailState, TableRowDetail as TableRowDetailBase, TableTreeColumn
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableBandHeader,
    TableHeaderRow,
    TableFilterRow,
    TableRowDetail
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {IntegratedSorting, SortingState} from "@devexpress/dx-react-grid";

const TABLE_DATA = gql`
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

interface AnimalData {
    animals: Animal[]
}

interface Animal {
    id: number,
    name: string,
    kind: string,
    age: number,
    gender: string,
    caseRecord: string,
    owner: {
        id: string,
        name: string,
        phone: string,
        email: string,
        address: string
    }
}

/*
interface BandCellProps {
   children: React.ReactNode,
   tableRow: TableRow,
   tableColumn: TableColumn,
   column: ColumnBands
}

const BandCell = ({children, tableRow, tableColumn, column}: BandCellProps) => {
   let icon = '';
   if (column.title === 'Владелец') icon = 'person';
   return (
       <TableBandHeader.Cell
           tableRow={tableRow}
           tableColumn={tableColumn}
           column={column}
           className="text-secondary"
       >
           {children}
           <span
               className={`ml-2 oi oi-${icon}`}
           />
       </TableBandHeader.Cell>
   );
};

const HeaderCell = (className: string, ...restProps: any ) => (
   <TableHeaderRow.Cell
       {...restProps}
       className={`text-info ${className}`}
   />
);

const RowDetail: React.ComponentType<TableRowDetail.ContentProps> = (row: any) => (
   <>
       {row.caseRecord}
   </>
);
*/

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


const MainPage = () => {
    const [rows, setRows] = useState<Animal[]>([]);
    const {loading, data} = useQuery<AnimalData>(TABLE_DATA);
    console.log(data);

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
            setRows(data.animals.map(animal => {
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
            {loading &&
            <Space>
                <Spin size="large"/>
            </Space>}
            <Grid rows={rows} columns={columns}>
                <FilteringState defaultFilters={[]}/>
                <IntegratedFiltering/>
                <SortingState
                    defaultSorting={[{columnName: 'id', direction: 'asc'}]}
                />
                {/*<RowDetailState/>*/}
                <IntegratedSorting/>
                <Table columnExtensions={tableColumnExtensions}/>
                <TableHeaderRow showSortingControls/>
                <TableBandHeader
                    columnBands={columnBands}
                />
                {/*<TableRowDetail*/}
                {/*    contentComponent={RowDetail}*/}
                {/*/>*/}
                <TableFilterRow/>
            </Grid>
        </div>
    );
};

export default MainPage;