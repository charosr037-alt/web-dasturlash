17-variant
Talaba: Rustamova Charos Sirojiddin qizi     Guruh: 941-24
1-masala. Sonlar  ·  oson
Funksiya: faktorial(n)
Manfiy bo‘lmagan butun son n berilgan. n! (1·2·3·…·n) ni sikl yordamida hisoblang. 0! = 1.
faktorial(5)                      
faktorial(0)                      
// → 120
// → 1
2-masala. Satrlar  ·  oson
Funksiya: kattaKichikAlmashtir(s)
Satr berilgan. Katta harflarni kichikka, kichiklarini kattaga aylantiring. Harf bo‘lmagan belgilar 
o‘zgarmaydi.
kattaKichikAlmashtir("Salom Dunyo")  // → "sALOM dUNYO"
kattaKichikAlmashtir("Web2026")   
// → "wEB2026"
3-masala. Massivlar  ·  oson
Funksiya: manfiylarniNolga(arr)
Sonlar massivi berilgan. Manfiy sonlar 0 ga almashtirilgan yangi massiv qaytaring.
manfiylarniNolga([-2, 5, -7, 3])  // → [0, 5, 0, 3]
manfiylarniNolga([0, -1])         
// → [0, 0]
4-masala. Satrlar va sonlar  ·  o‘rtacha
Funksiya: emailTekshir(email)
Satr berilgan. To‘g‘ri email bo‘lsa true qaytaring. Shartlar: bo‘sh joy yo‘q; aynan bitta @ bor; @ dan 
oldin kamida bitta belgi; @ dan keyin nuqta bor va nuqta oxirgi belgi emas.
emailTekshir("talaba@urdu.uz")    
emailTekshir("talaba@urdu")       
emailTekshir("ta laba@urdu.uz")   
// → true
// → false
// → false
5-masala. Massivlar va obyektlar  ·  o‘rtacha
Funksiya: bolaklargaAjrat(arr, n)
Massiv va musbat son n berilgan. Massivni n tadan elementli bo‘laklarga ajrating. Oxirgi bo‘lak 
kichikroq bo‘lishi mumkin.
bolaklargaAjrat([1, 2, 3, 4, 5], 2)  // → [[1, 2], [3, 4], [5]]
bolaklargaAjrat(["a", "b", "c"], 3)  // → [["a", "b", "c"]]