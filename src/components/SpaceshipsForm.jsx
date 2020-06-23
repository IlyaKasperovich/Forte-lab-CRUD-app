import React, {useEffect, useState} from 'react';
import Input from "./common/Input";
import Button from './common/Button';
import {nanoid} from "nanoid";

import {spaceshipsColumns} from "../services/spaceshipsService";

import { useDispatch, useSelector } from 'react-redux';
import { getAllStarships } from '../store/selectors/starships';
import { setStarships } from '../store/actions/starships';

const initialSpaceshipData = spaceshipsColumns.reduce((columns, columnName) => {
    columns[columnName] = '';
    return columns;
}, {})

const SpaceshipForm = ({history, match}) => {
    const dispatch = useDispatch()
    const spaceships = useSelector(state => getAllStarships(state))

    const [formErrors, setFormErrors] = useState({});
    const [spaceshipData, setSpaceshipData] = useState({...initialSpaceshipData});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const spaceshipId = match.params.id;
        if (spaceshipId === "new") return;
        const existingSpaceshipData = spaceships.find(spaceship => spaceship.id === spaceshipId)
        setSpaceshipData(existingSpaceshipData)
        setEditMode(true);
    }, [])

    const validate = (data) => {
        let errors = {};
        Object.entries(data).map(([propKey, propVal]) => {
            if (!propVal && !propKey.includes('beloved')) {
                errors = {...errors, [propKey]: 'Field should not be empty'};
            }
            if ((propKey.includes('cost_in_credits') && !isFinite(propVal)) 
            || (propKey.includes('hyperdrive_rating') && !isFinite(propVal))){
                    errors = {...errors, [propKey]: 'Field should be a number'};
            }
        })
        setFormErrors(errors);
        return errors
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const errors = validate(spaceshipData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            const newSpaceshipList = spaceships.map(spaceship => spaceship.id === spaceshipData.id ? spaceshipData : spaceship);
            dispatch(setStarships(newSpaceshipList))
        } else {
            dispatch(setStarships(spaceships.concat([{...spaceshipData, beloved: false, id: nanoid()}])))
        }
        history.push('/starships')
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...spaceshipData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setSpaceshipData(data);
        setFormErrors(errors)
    }

    return (
        <form>
            {spaceshipsColumns.map(spaceshipsColName => (
                <Input
                    key={spaceshipsColName}
                    name={spaceshipsColName}
                    label={spaceshipsColName[0].toUpperCase() + spaceshipsColName.slice(1)}
                    value={spaceshipData[spaceshipsColName]}
                    type={spaceshipsColName === 'beloved' ? 'checkbox' : 'input'}
                    error={formErrors[spaceshipsColName]}
                    onChange={event => handleChange(event)}
                />
            ))}
            <Button
                onClick={event => onSubmit(event)}
                label="Save"
                disabled={Object.keys(formErrors).length}
                classes="btn btn-dark"
            />
        </form>
    );
};

export default SpaceshipForm;