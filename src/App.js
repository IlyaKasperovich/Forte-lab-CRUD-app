
import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.css";
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

function App() {
    const [people, setPeople] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [spaceships, setSpaceships] = useState([]);

    useEffect( () => {
        const getPeopleData = async () => {
            const peopleResponse = await getPeople()
            setPeople(peopleResponse)
        }
        getPeopleData()

        const getPlanetsData = async () => {
            const planetsResponse = await getPlanets()
            setPlanets(planetsResponse)
        }
        getPlanetsData()

        const getSpaceshipsData = async () => {
            const spaceshipsResponse = await getSpaceships()
            setSpaceships(spaceshipsResponse)
        }
        getSpaceshipsData()
    }, [])

    return (
        <>
            <Navbar/>
            <div className="container">
                <Switch>
                    <Route path="/people/:id" render={props => <PeopleForm {...props} setPeople={setPeople} people={people} />}/>
                    <Route path="/people" render={props => <PeoplePage {...props} setPeople={setPeople} people={people} />} />
                    <Route path="/planets/:id" render={props => <PlanetsForm {...props} setPlanets={setPlanets} planets={planets} />}/>
                    <Route path="/planets" render={props => <PlanetsPage {...props} setPlanets={setPlanets} planets={planets} />}/>
                    <Route path="/starships/:id" render={props => <SpaceshipForm {...props} setSpaceships={setSpaceships} spaceships={spaceships} />}/>
                    <Route path="/starships" render={props => <StarshipsPage {...props} setSpaceships={setSpaceships} spaceships={spaceships} />}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect exact from="/" to="/people" component={PeoplePage}/>
                    <Redirect to="/not-found"/>
                </Switch>
            </div>
        </>
    );
}

export default App;
