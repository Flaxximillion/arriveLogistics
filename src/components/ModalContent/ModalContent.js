import React from 'react';
import './ModalContent.css';
import ReactTable from 'react-table';

import 'react-table/react-table.css';

/**
 * Detailed carrier information displayed in modal as React Table.
 *
 * TODO: Improve styling.
 * TODO: Custom render contact information cells to be interactable.
 *
 */

class ModalContent extends React.Component {
    render() {

        const subTableHeaders = [{
            Header: 'Carrier Information',
            columns: [{
                Header: 'Carrier ID',
                accessor: 'Id'
            }, {
                Header: 'Carrier Name',
                accessor: 'Name'
            }, {
                Header: 'Capabilities',
                accessor: 'Capabilities',
                Cell: row => {
                    return <div>{row.value.join(', ')}</div>
                }
            }]
        }, {
            Header: 'Contact Information',
            columns: [{
                Header: 'Name',
                accessor: 'ContactName'
            }, {
                Header: 'Email',
                accessor: 'ContactEmail'
            }, {
                Header: 'Phone',
                accessor: 'ContactPhone'
            }]
        }];

        return (
            <div className={`cell small-10`}>
                <ReactTable
                    data={[this.props.currentCarrier]}
                    columns={subTableHeaders}
                    showPagination={false}
                    minRows={1}
                />
            </div>
        )
    }
}

export default ModalContent;