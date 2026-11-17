function bolaklargaAjrat(arr, n) {
  const natija = [];
  for (let i = 0; i < arr.length; i += n) {
    natija.push(arr.slice(i, i + n));
  }
  return natija;
}

console.log(bolaklargaAjrat([1, 2, 3, 4, 5], 2));
console.log(bolaklargaAjrat(["a", "b", "c"], 3)); 