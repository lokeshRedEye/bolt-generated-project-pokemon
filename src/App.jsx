import React, { useState, useEffect } from 'react';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
    import { Input } from "./components/ui/input"
    import { Button } from "./components/ui/button"
    import {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "./components/ui/table"
    import { cn } from "./lib/utils"
    import { Loader2 } from "lucide-react"


    function App() {
      const [pokemonName, setPokemonName] = useState('');
      const [pokemonData, setPokemonData] = useState(null);
      const [error, setError] = useState(null);
      const [pokemonList, setPokemonList] = useState([]);
      const [nextPageUrl, setNextPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
      const [loading, setLoading] = useState(false);


      useEffect(() => {
        fetchPokemonList(nextPageUrl);
      }, []);

      const fetchPokemonList = async (url) => {
        setLoading(true);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              ...pokemon,
              image: details.sprites.front_default,
              types: details.types
            };
          }));
          setPokemonList((prevList) => [...prevList, ...pokemonDetails]);
          setNextPageUrl(data.next);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };

      const handleSearch = async () => {
        setError(null);
        setPokemonData(null);
        if (!pokemonName) {
          return;
        }
        setLoading(true);
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
          if (!response.ok) {
            throw new Error(`Could not find Pokemon: ${pokemonName}`);
          }
          const data = await response.json();
          setPokemonData(data);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };

      const handleLoadMore = () => {
        if (nextPageUrl) {
          fetchPokemonList(nextPageUrl);
        }
      };

      const getCardBackgroundColor = (types) => {
        if (!types || types.length === 0) return 'bg-gray-700';
        const type = types[0].type.name;
        switch (type) {
          case 'normal': return 'bg-normal/20';
          case 'fire': return 'bg-fire/20';
          case 'water': return 'bg-water/20';
          case 'electric': return 'bg-electric/20';
          case 'grass': return 'bg-grass/20';
          case 'ice': return 'bg-ice/20';
          case 'fighting': return 'bg-fighting/20';
          case 'poison': return 'bg-poison/20';
          case 'ground': return 'bg-ground/20';
          case 'flying': return 'bg-flying/20';
          case 'psychic': return 'bg-psychic/20';
          case 'bug': return 'bg-bug/20';
          case 'rock': return 'bg-rock/20';
          case 'ghost': return 'bg-ghost/20';
          case 'dragon': return 'bg-dragon/20';
          case 'steel': return 'bg-steel/20';
          case 'dark': return 'bg-dark/20';
          case 'fairy': return 'bg-fairy/20';
          default: return 'bg-gray-700';
        }
      };


      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Pokemon Website</h1>
          <div className="flex justify-center mb-4">
            <Input
              type="text"
              placeholder="Enter Pokemon name"
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              className="mr-2 input"
            />
            <Button onClick={handleSearch} disabled={loading} className="button">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Search
            </Button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {pokemonData && (
            <div className="flex justify-center">
              <Card className={cn("w-full max-w-2xl rounded-lg shadow-md overflow-hidden animate-slide-up card", getCardBackgroundColor(pokemonData.types))}>
                <CardHeader className="p-6 card-header">
                  <CardTitle className="text-2xl font-semibold capitalize card-title">{pokemonData.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-400 capitalize card-description">
                    {pokemonData.types.map((type) => type.type.name).join(', ')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center card-content">
                  <img
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                    className="w-48 h-48 rounded-full mb-4 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <Table className="w-full table">
                    <TableCaption className="text-gray-400 table-caption">Base Stats</TableCaption>
                    <TableHeader className="table-header">
                      <TableRow>
                        <TableHead className="text-gray-300">Stat</TableHead>
                        <TableHead className="text-gray-300">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="table-body">
                      {pokemonData.stats.map((stat) => (
                        <TableRow key={stat.stat.name}>
                          <TableCell className="capitalize text-gray-400">{stat.stat.name}</TableCell>
                          <TableCell className="text-gray-300">{stat.base_stat}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
          <h2 className="text-2xl font-bold mt-8 mb-4 text-center">Pokemon List</h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <p className="text-gray-400">Loading Pokemon...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pokemonList.map((pokemon) => (
                <Card key={pokemon.name} className={cn("flex flex-col items-center transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden animate-fade-in card", getCardBackgroundColor(pokemon.types))}>
                  <CardHeader className="p-4 card-header">
                    <CardTitle className="capitalize font-medium card-title">{pokemon.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 card-content">
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      className="w-32 h-32 rounded-full mb-2 object-cover"
                    />
                    <Button onClick={() => {
                      setPokemonName(pokemon.name);
                      handleSearch();
                    }} disabled={loading} className="button">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {nextPageUrl && (
            <div className="flex justify-center mt-4">
              <Button onClick={handleLoadMore} disabled={loading} className="button">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Load More
              </Button>
            </div>
          )}
        </div>
      );
    }

    export default App;
