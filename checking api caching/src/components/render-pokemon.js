import getPokemon from '../axios-data';
import { useEffect, useState } from 'react';

export default function Pokemon() {
    const [pokemon, setPokemon] = useState('');


    useEffect(() => {
        getPokemon().then(response => {
          setPokemon(response)
        })
      }, [])

    return (
        <p>pokemon: {pokemon}</p>
    )
} 