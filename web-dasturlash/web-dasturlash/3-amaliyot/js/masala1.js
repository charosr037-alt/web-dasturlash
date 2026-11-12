function faktorial(n) {
  let natija = 1;
  for (let i = 2; i <= n; i++) {
    natija *= i;
  }
  return natija;
}

console.log(faktorial(5)); 
console.log(faktorial(0)); 