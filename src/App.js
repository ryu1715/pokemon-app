import { useEffect, useState } from "react";
import "./App.css";

import { getAllPokemon } from "./utils/pokemon";

function App() {
  const initial = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンを取得
      let res = await getAllPokemon(initial);
      console.log(res);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);
  return (
    <div className="App">
      {loading ? (
        <>
          <h1>ロード中</h1>
        </>
      ) : (
        <>
          <h1>ポケモンを取得しました</h1>
        </>
      )}
    </div>
  );
}

export default App;
