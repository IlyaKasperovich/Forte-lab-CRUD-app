import React from 'react';
import {Link} from "react-router-dom";
import Table from '../common/Table'

const PlanetPage = ({planets, setPlanets }) => {
    const handleBelovedStatus = id => {
        const mappedPlanets = planets.map(planet => {
            return planet.id === id ? {...planet, beloved: !planet.belowed} : planet
        })
        setPlanets(mappedPlanets)
    }

    const handleDelete = id => {
        const filteredPlanets = planets.filter(planet => planet.id !== id)
        setPlanets(filteredPlanets)
    }

    const getColumns = () => {
        if (!planets.length) return [];

        return Object.keys(planets[0]).map(colName => {
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
                        <Link style={{color: '#ffc107'}} to={`/planets/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
    }

    return (
        <div>
            <h3>Planets from Star Wars Universe</h3>
            <Link
                to={"/planets/new"}
                className="btn btn-warning"
                style={{marginBottom: 25}}
            >
                New Planet
            </Link>
            <Table
                columns={getColumns()}
                data={Object.values(planets)}
                tableDescriptor="Planets"
                onDelete={handleDelete}
            />
        </div>

    );
};

export default PlanetPage;
