import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import Results from "./Results";
import useDropDown from "./useDropDown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropown] = useDropDown("Animal", "dog", ANIMALS);
  const [breed, BreedDropDown, setBreed] = useDropDown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);
  }

  useEffect(() => {
    // pet.breeds("dog").then(console.log, console.error);
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds: fromAPi }) => {
      const breedStrings = fromAPi.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Location"
          />
        </label>

        <AnimalDropown />
        <BreedDropDown />
        <button>submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
