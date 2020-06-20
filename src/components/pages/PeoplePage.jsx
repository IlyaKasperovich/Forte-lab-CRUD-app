import React from 'react';
import {Link} from "react-router-dom";
import Table from '../common/Table'

const PeoplePage = ({people, setPeople }) => {
    const handleBelovedStatus = id => {
        const mappedPeople = people.map(person => {
            return person.id === id ? {...person, beloved: !person.belowed} : person
        })
        setPeople(mappedPeople)
    }

    const handleDelete = id => {
        const filteredPeople = people.filter(person => person.id !== id)
        setPeople(filteredPeople)
    }

    const getColumns = () => {
        if (!people.length) return [];

        return Object.keys(people[0]).map(colName => {
            if (colName === 'beloved') {
                return {
                    colName,
                    content: ({beloved, id}) => (
                        <input
                            type="checkbox"
                            checked={beloved}
                            onChange={() => handleBelovedStatus(id)}
                        />
                    )
                }
            }
            if (colName === 'name') {
                return {
                    colName,
                    content: ({name, id}) => (
                        <Link style={{color: '#ffc107'}} to={`/people/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
    }

    return (
        <div>
            <h3>People from Star Wars Universe</h3>
            <Link
                to={"/people/new"}
                className="btn btn-warning"
                style={{marginBottom: 25}}
            >
                New Person
            </Link>
            <Table
                columns={getColumns()}
                data={Object.values(people)}
                tableDescriptor="People"
                onDelete={handleDelete}
            />
        </div>

    );
};

export default PeoplePage;
