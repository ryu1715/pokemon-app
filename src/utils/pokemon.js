/**
 * ポケモンデータの全権取得
 * @param {*} url
 * @returns
 */
export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};

/**
 * ポケモンデータ詳細情報取得
 * @param {*} url
 * @returns
 */
export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};
