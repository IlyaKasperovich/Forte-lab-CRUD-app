import React from 'react';
import {Link} from "react-router-dom";
import Table from '../common/Table'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStarships } from '../../store/selectors/starships';
import { changeBelovedStatus, deleteStarship } from '../../store/actions/starships';

const StarshipsPage = () => {
    const dispatch = useDispatch()
    const spaceships = useSelector(state => getAllStarships(state))

    const handleBelovedStatus = id => {
        dispatch(changeBelovedStatus(id))
    }

    const handleDelete = id => {
        dispatch(deleteStarship(id))
    }

    const getColumns = () => {
        if (!spaceships.length) return [];

        return Object.keys(spaceships[0]).map(colName => {
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
                        <Link style={{color: '#ffc107'}} to={`/starships/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
    }

    return (
        <div>
            <h3>Spaceships from Star Wars Universe</h3>
            <Link
                to={"/starships/new"}
                className="btn btn-warning"
                style={{marginBottom: 25}}
            >
                New Spaceship
            </Link>
            <Table
                columns={getColumns()}
                data={Object.values(spaceships)}
                tableDescriptor="Spaceships"
                onDelete={handleDelete}
            />
        </div>

    );
};

export default StarshipsPage;
