import React from 'react'
import PropTypes from 'prop-types'
import { Table as RSTable, Input, Row, Col } from 'reactstrap'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import { Filters } from 'components/Core'

const {
    GlobalFilter,
    DefaultColumnFilter,
    SelectColumnFilter,
    SliderColumnFilter,
    NumberRangeColumnFilter,
    fuzzyTextFilterFn,
} = Filters

// Our table component
function Table({ columns, data }) {
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                              .toLowerCase()
                              .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        [],
    )

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        [],
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
    )

    return (
        <RSTable {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                                {/* Render the columns filter UI */}
                                <div>
                                    {column.canFilter ? column.render('Filter') : null}
                                </div>
                            </th>
                        ))}
                    </tr>
                ))}

                <tr>
                    <th colSpan={visibleColumns.length}>
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    </th>
                </tr>
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </RSTable>
    )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter((row) => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== 'number'

function DataTable({ listColumns, list }) {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'Company Name',
                        accessor: 'Company Name',
                        disableFilters: true,
                    },
                    {
                        Header: 'DBA Name',
                        accessor: 'DBA Name',
                        disableFilters: true,
                    },
                    {
                        Header: 'Owner First',
                        accessor: 'Owner First',
                        disableFilters: true,
                    },
                    {
                        Header: 'Owner Last',
                        accessor: 'Owner Last',
                        disableFilters: true,
                    },
                ],
            },
            {
                Header: 'Location',
                columns: [
                    {
                        Header: 'Physical Address',
                        accessor: 'Physical Address',
                        disableFilters: true,
                    },
                    {
                        Header: 'City',
                        accessor: 'City',
                        Filter: SelectColumnFilter,
                        filter: 'includes',
                    },
                    {
                        Header: 'State',
                        accessor: 'State',
                        Filter: SelectColumnFilter,
                        filter: 'includes',
                    },
                    {
                        Header: 'Zip',
                        accessor: 'Zip',
                        Filter: SelectColumnFilter,
                        filter: 'includes',
                    },
                    {
                        Header: 'Phone',
                        accessor: 'Phone',
                        disableFilters: true,
                    },
                ],
            },
            {
                Header: 'Contact Info',
                columns: [
                    {
                        Header: 'Email',
                        accessor: 'Email',
                        disableFilters: true,
                    },
                    {
                        Header: 'Website',
                        accessor: 'Website',
                        disableFilters: true,
                    },
                    {
                        Header: 'Agency',
                        accessor: 'Agency',
                        disableFilters: true,
                    },
                    {
                        Header: 'Certification Type',
                        accessor: 'Certification Type',
                        Filter: SelectColumnFilter,
                        filter: 'includes',
                    },
                ],
            },
        ],
        [],
    )

    const data = React.useMemo(() => list)

    return <Table columns={columns} data={data} />
}

export default DataTable

DataTable.propTypes = {
    list: PropTypes.array,
    // listColumns: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         Header: PropTypes.string.isRequired,
    //         accessor: PropTypes.string.isRequired,
    //     }),
    // ),
}
