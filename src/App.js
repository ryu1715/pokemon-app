import { useEffect, useState } from "react";
import "./App.css";

import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initial = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンを取得
      const res = await getAllPokemon(initial);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // ページャーのURLを設定
      setNextURL(res.next);
      setPrevURL(res.previous);

      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handlePrevPage = async () => {
    // ロード中にする
    setLoading(true);

    // 全てのポケモンを取得
    const res = await getAllPokemon(prevURL);
    // 各ポケモンの詳細なデータを取得
    loadPokemon(res.results);
    // ページャーのURLを設定
    setNextURL(res.next);
    setPrevURL(res.previous);

    // ロード完了状態にする
    setLoading(false);
  };

  const handleNextPage = async () => {
    // ロード中にする
    setLoading(true);

    // 全てのポケモンを取得
    const res = await getAllPokemon(nextURL);
    // 各ポケモンの詳細なデータを取得
    loadPokemon(res.results);
    // ページャーのURLを設定
    setNextURL(res.next);
    setPrevURL(res.previous);

    // ロード完了状態にする
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <>
            <h1>ロード中</h1>
          </>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={prevURL && handlePrevPage}>前へ</button>
              <button onClick={nextURL && handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
