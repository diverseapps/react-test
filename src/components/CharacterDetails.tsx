import React from "react";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getCharacterById } from "../api/rickMortyApi";
import "../CharacterDetail.css"; 

const CharacterDetails: React.FC = () => {
  const { id } = useParams({ from: "/character/$id" });

  const { data, isLoading, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id),
  });

  if (isLoading)
    return (
      <div className="details-container">
        <div className="details-card">
          <p className="loading-text">Loading character details...</p>
        </div>
      </div>
    );

  if (error || !data)
    return (
      <div className="details-container">
        <div className="details-card">
          <p className="error-text">Character not found.</p>
        </div>
      </div>
    );

  return (
    <div className="details-container">
      <div className="details-card">
        <h1 className="details-title">{data.name}</h1>
        <img
          src={data.image}
          alt={data.name}
          className="details-image"
        />
        <div className="details-info">
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Species:</strong> {data.species}
          </p>
          <p>
            <strong>Gender:</strong> {data.gender}
          </p>
          <p>
            <strong>Origin:</strong> {data.origin.name}
          </p>
        </div>

      
        <button
          onClick={() => window.history.back()}
          className="back-button"
        >
          ← Back to List
        </button>
      </div>
    </div>
  );
};

export default CharacterDetails;
