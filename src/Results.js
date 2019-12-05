import React from "react";
import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {pets.length === 0 ? (
        <h1>Non Pets Found</h1>
      ) : (
        pets.map(pet => (
          <Pet
            key={pet.id}
            animal={pet.type}
            id={pet.id}
            breed={pet.breeds.primary}
            name={pet.name}
            media={pet.photos}
            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
          />
        ))
      )}
    </div>
  );
};

export default Results;
