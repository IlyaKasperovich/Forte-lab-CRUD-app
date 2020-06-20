
import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import PeoplePage from "./components/pages/PeoplePage";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import PeopleForm from "./components/PeopleForm";
import Navbar from "./components/Navbar";
import NotFound from "./components/pages/NotFound";
import {getPeople} from "./services/peopleService";

function App() {
    const [people, setPeople] = useState([]);

    useEffect( () => {
        const getData = async () => {
            const peopleResponse = await getPeople()
            setPeople(peopleResponse)
        }

        getData()
    }, [])

    // const getInitialPeopleData = () => {
    //     return columns.reduce((cols, columnName) => {
    //         cols[columnName] = "";
    //         return cols;
    //     }, {})
    // }

    // const handleAppPerson = (personData) => {
    //     const data = [...people, personData];
    //     setPeople(data)
    // }

    // const handleDelete = (id) => {
    //     const filteredPeople = people.filter(person => person.id !== id);
    //     setPeople(filteredPeople)
    // }

    return (
        <>
            <Navbar/>
            <div className="container">
                <Switch>
                    <Route path="/people/:id" render={props => <PeopleForm {...props} setPeople={setPeople} people={people} />}/>
                    <Route path="/people" render={props => <PeoplePage {...props} setPeople={setPeople} people={people} />} />
                    {/*<Route path="/planets/:id" component={Form}/>*/}
                    <Route path="/planets" component={PlanetsPage}/>
                    {/*<Route path="/starships/:id" component={Form}/>*/}
                    <Route path="/starships" component={StarshipsPage}/>
                    <Route path="/not-found" component={NotFound}/>
                    <Redirect exact from="/" to="/people" component={PeoplePage}/>
                    <Redirect to="/not-found"/>
                </Switch>
            </div>
        </>
    );
}

export default App;
