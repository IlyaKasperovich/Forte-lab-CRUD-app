import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import PeoplePage from "./components/pages/PeoplePage";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import PeopleForm from "./components/PeopleForm";
import PlanetsForm from "./components/PlanetsForm";
import SpaceshipForm from "./components/SpaceshipsForm";
import Navbar from "./components/Navbar";
import NotFound from "./components/pages/NotFound";

import {getPeople} from "./services/peopleService";
import {getPlanets} from "./services/planetsService";
import {getSpaceships} from "./services/spaceshipsService";

import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch } from 'react-redux';
import { setPeople } from './store/actions/people';
import { setPlanets } from './store/actions/planets';
import { setStarships } from './store/actions/starships';

function App() {
    const dispatch = useDispatch()

    useEffect( () => {
        const getPeopleData = async () => {
            const peopleResponse = await getPeople()
            dispatch(setPeople(peopleResponse));
        }
        // localStorage.people ? dispatch(setPeople((JSON.parse(localStorage.people)))) : 
        getPeopleData()

        const getPlanetsData = async () => {
            const planetsResponse = await getPlanets()
            // setPlanets(planetsResponse)
            dispatch(setPlanets(planetsResponse))
        }
        // localStorage.planets ? setPlanets(JSON.parse(localStorage.planets)) : 
        getPlanetsData()

        const getSpaceshipsData = async () => {
            const spaceshipsResponse = await getSpaceships()
            dispatch(setStarships(spaceshipsResponse))
        }
        // localStorage.spaceships ? setSpaceships(JSON.parse(localStorage.spaceships)) : 
        getSpaceshipsData()
    }, [])

    // useEffect( () => {
    //     localStorage.people = JSON.stringify(people)
    // },[people])

    // useEffect( () => {
    //     localStorage.planets = JSON.stringify(planets)
    // },[planets])

    // useEffect( () => {
    //     localStorage.spaceships = JSON.stringify(spaceships)
    // },[spaceships])

    return (
        <>
            <Navbar/>
            <div className="container">
                <Switch>
                    <Route path="/people/:id" render={props => <PeopleForm {...props} />}/>
                    <Route path="/people" render={props => <PeoplePage {...props} />} />
                    <Route path="/planets/:id" render={props => <PlanetsForm {...props} />}/>
                    <Route path="/planets" render={props => <PlanetsPage {...props} />}/>
                    <Route path="/starships/:id" render={props => <SpaceshipForm {...props} />}/>
                    <Route path="/starships" render={props => <StarshipsPage {...props} />}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect exact from="/" to="/people" component={PeoplePage}/>
                    <Redirect to="/not-found"/>
                </Switch>
            </div>
        </>
    );
}

export default App;
