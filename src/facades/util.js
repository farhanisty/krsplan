export const splitArray = (arr) => {
  const n = arr.length;
  const mid = Math.ceil(n / 2); // Jika n ganjil, bagian pertama memiliki lebih banyak elemen

  const firstHalf = arr.slice(0, mid); // Dari awal hingga indeks tengah
  const secondHalf = arr.slice(mid); // Dari indeks tengah hingga akhir

  return [firstHalf, secondHalf];
};
