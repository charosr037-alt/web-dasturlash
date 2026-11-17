function kattaKichikAlmashtir(s) {
  let natija = "";
  for (const harf of s) {
    if (harf === harf.toUpperCase() && harf !== harf.toLowerCase()) {
      natija += harf.toLowerCase(); 
    } else if (harf === harf.toLowerCase() && harf !== harf.toUpperCase()) {
      natija += harf.toUpperCase(); 
    } else {
      natija += harf; 
    }
  }
  return natija;
}

console.log(kattaKichikAlmashtir("Salom Dunyo")); 
console.log(kattaKichikAlmashtir("Web2026"));