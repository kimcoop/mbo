import React from 'react'

import PhillyList from 'constants/lists/philly'
import { Table } from 'reactstrap'

import { Nav, DataTable } from 'components/Core'

import styles from './App.module.scss'

const keys = [
    'Company Name',
    'DBA Name',
    'Owner First',
    'Owner Last',
    'Physical Address',
    'City',
    'State',
    'Zip',
    'Mailing Address',
    'City__1',
    'State__1',
    'Zip__1',
    'Phone',
    'Fax',
    'Email',
    'Website',
    'Agency',
    'Certification Type',
    'Capability',
]

const App = () => {
    return (
        <div className={styles.app}>
            <Nav />
            <DataTable
                list={PhillyList}
                listColumns={keys.map((key) => ({ accessor: key, Header: key }))}
            />
            {false && (
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            {keys.map((key) => (
                                <th>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {PhillyList.map((entry, i) => {
                            return (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    {keys.map((key) => (
                                        <td>{entry[key]}</td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default App
