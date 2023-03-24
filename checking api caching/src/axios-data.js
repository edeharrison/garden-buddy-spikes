import axios from "axios"

export default function getPokemon() {
    return axios.get('https://pokeapi.co/api/v2/pokemon/ditto').then(({data}) => {
        return data.name
})
}