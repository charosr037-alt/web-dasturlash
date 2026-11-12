function emailTekshir(email) {
  if (email.includes(" ")) return false;

  const qismlar = email.split("@");
  if (qismlar.length !== 2) return false;

  const oldi = qismlar[0];
  const keyin = qismlar[1];

  if (oldi.length < 1) return false; 
  if (!keyin.includes(".")) return false; 
  if (keyin[keyin.length - 1] === ".") return false; 
  return true;
}

console.log(emailTekshir("talaba@urdu.uz"));  
console.log(emailTekshir("talaba@urdu"));    
console.log(emailTekshir("ta laba@urdu.uz")); 