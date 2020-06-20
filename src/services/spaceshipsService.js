import {nanoid} from "nanoid";

export const spaceshipsColumns = [
    'name',
    'model',
    'cost_in_credits',
    'hyperdrive_rating',
]

export const getSpaceships = async () => {
    const spaceshipsResponse = await (await fetch('https://swapi.dev/api/starships')).json();

    return spaceshipsResponse.results.map(({name, model, cost_in_credits, hyperdrive_rating }) => ({
        name,
        model,
        cost_in_credits,
        hyperdrive_rating,
        beloved: false,
        id: nanoid()
    }))
}