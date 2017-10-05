import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import Modal from 'react-modal';

import 'react-table/react-table.css';
import './Table.css';

import ModalContent from '../ModalContent/ModalContent';

/**
 * Data display using React Tables. Contains Table component and instantiates
 * React Modal to display detailed information on user selected carrier.
 *
 * TODO: Improve styling.
 * TODO: Implement caching of previous results to reduce server queries.
 * TODO: Remove CORS proxy.
 *
 */

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCarrier: {},
            openModal: false
        };

        this.fetchCarrier = this.fetchCarrier.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    fetchCarrier(event) {
        axios.get(`http://cors-proxy.htmldriven.com/?url=http://arrive-interview-api.azurewebsites.net/api/carrierDetails/${event.target.id}`)
            .then(res => {
                this.setState({
                    currentCarrier: JSON.parse(res.data.body),
                    openModal: true
                });
            })
            .catch(err => {
                console.log(`Query error thrown: ${err}`);
            })
    }

    closeModal() {
        this.setState({
            openModal: false
        })
    }

    render() {
        const tableColumns = [{
            Header: () => <div className={`carrierIDHeader`}>ID</div>,
            id: 'ID',
            className: 'carrierID',
            minWidth: 30,
            accessor: d => d.Id
        }, {
            Header: 'Name',
            id: 'Name',
            accessor: d => d.Name
        }, {
            Header: 'Locations',
            id: 'Locations',
            accessor: d => d.Locations,
            Cell: row => (
                row.value.map(location => {
                    return <div
                        key={location.City}>{location.City.replace(/\b\w/g, l => l.toUpperCase())}, {location.State.toUpperCase()}</div>
                })
            )
        }, {
            Header: 'Additional Information',
            Cell: row => {
                return <div className={`flexHelper`}>
                    <button onClick={this.fetchCarrier} id={row.row.ID}
                            className={`button hollow secondary`}>View More
                    </button>
                </div>
            }
        }];

        return (
            <section>

                <ReactTable
                    data={this.props.carriers === "No carriers found with provided city" ? [] : this.props.carriers}
                    noDataText={this.props.carriers === "No carriers found with provided city" ? "Either no carriers have been found in the current city or " +
                        "there is an error in your input." : "Awaiting Input"}
                    columns={tableColumns}
                    className={`-striped -highlight`}
                />

                <Modal isOpen={this.state.openModal}
                       onRequestClose={this.closeModal}>
                    <div className={`grid-x align-center`}>
                        {this.state.currentCarrier !== {} &&
                        <ModalContent currentCarrier={this.state.currentCarrier}
                        />}
                        <button onClick={this.closeModal}
                                className={`button cell small-3`}
                                id={`modalClose`}
                        >
                            Close
                        </button>
                    </div>
                </Modal>

            </section>
        )
    }
}

export default Table;
