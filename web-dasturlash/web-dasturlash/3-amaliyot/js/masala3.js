function manfiylarniNolga(arr) {
  const natija = [];
  for (const son of arr) {
    if (son < 0) {
      natija.push(0);
    } else {
      natija.push(son);
    }
  }
  return natija;
}

console.log(manfiylarniNolga([-2, 5, -7, 3])); 
console.log(manfiylarniNolga([0, -1]));     