import React, { useEffect, useState } from "react";
import "./pokemon.css";
import { ViewDetail } from "../interface";

interface Props {
  id: number;
  name: string;
  image: string;
  abilities:
    | {
        name: string;
        ability: string;
      }[]
    | undefined;
  viewDetail: ViewDetail;
  setViewDetail: React.Dispatch<React.SetStateAction<ViewDetail>>;
}

const PokemonList: React.FC<Props> = (props) => {
  const { id, name, image, abilities, viewDetail, setViewDetail } = props;
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(id === viewDetail?.id);
  }, [viewDetail]);

  const closeViewDetail = () => {
    setViewDetail({ id: 0, isOpened: false });
  };

  return (
    <div>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeViewDetail}>
              X
            </p>
            <div className="detail-info">
              <img src={image} alt="pokemon" className="detail-img" />
              <p className="detail-name">{name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability">Abilities: </p>
              {abilities?.map((ab: any) => {
                return <div>{ab.ability.name}</div>;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{id}</p>
          <p className="pokemon-name">{name}</p>
          <img src={image} alt="pokemon" />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
