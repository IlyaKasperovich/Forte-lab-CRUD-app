import {nanoid} from "nanoid";

export const planetsColumns = [
    'name',
    'created',
    'diameter',
    'population',
]

export const getPlanets = async () => {
    const planetsResponse = await (await fetch('https://swapi.dev/api/planets')).json();

    return planetsResponse.results.map(({name, created, diameter, population }) => ({
        name,
        created,
        diameter,
        population,
        beloved: false,
        id: nanoid()
    }))
}