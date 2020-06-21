import {nanoid} from "nanoid";

export const planetsColumns = [
    'name',
    'diameter',
    'population',
]

export const getPlanets = async () => {
    const planetsResponse = await (await fetch('https://swapi.dev/api/planets')).json();

    return planetsResponse.results.map(({name, diameter, population }) => ({
        name,
        diameter,
        population,
        beloved: false,
        id: nanoid()
    }))
}