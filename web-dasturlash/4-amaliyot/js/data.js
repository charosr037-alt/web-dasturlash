// js/data.js
const kafeMenyusi = [
  {
    id: 1,
    nom: "Xorazm palovi",
    kategoriya: "milliy",
    narx: 46000,
    mavjud: true,
    rasm: "rasmlar/palov.jpg",
    teglar: ["palov", "go'shtli", "issiq"],
    tavsif: "Mayda to'g'ralgan sabzi, mol go'shti va maxsus ziravorlar bilan qozonda dimlab pishiriladigan milliy palov."
  },
  {
    id: 2,
    nom: "Manti (1 porsiya)",
    kategoriya: "milliy",
    narx: 34000,
    mavjud: true,
    rasm: "rasmlar/manti.jpg",
    teglar: ["xamirli", "bug'da", "to'yimli"],
    tavsif: "Yupqa xamirga mayda to'g'ralgan go'sht va piyoz solib bug'da pishiriladigan, smetana bilan tortiladigan taom."
  },
  {
    id: 3,
    nom: "Go'shtli somsa",
    kategoriya: "milliy",
    narx: 12000,
    mavjud: true,
    rasm: "rasmlar/somsa.jpg",
    teglar: ["tandir", "issiq", "tavsiya"],
    tavsif: "Tandirda qizartirib yopilgan qarsildoq xamirli va sersuv go'shtli somsa."
  },
  {
    id: 4,
    nom: "Sezar salati",
    kategoriya: "salat",
    narx: 32000,
    mavjud: true,
    rasm: "rasmlar/sezar.jpg",
    teglar: ["tovuqli", "yengil", "klassik"],
    tavsif: "Aysberg salati, qovurilgan tovuq filesi, parmezan pishlog'i, quritilgan non va maxsus Sezar sousi."
  },
  {
    id: 5,
    nom: "Olivia salati",
    kategoriya: "salat",
    narx: 24000,
    mavjud: true,
    rasm: "rasmlar/olivia.jpg",
    teglar: ["an'anaviy", "sabzavotli", "sovuq"],
    tavsif: "Qaynatilgan sabzavotlar, tuxum, yashil no'xat va go'sht bo'laklari bilan tayyorlangan salat."
  },
  {
    id: 6,
    nom: "Bahor salati",
    kategoriya: "salat",
    narx: 19000,
    mavjud: false,
    rasm: "rasmlar/bahor.jpg",
    teglar: ["yangi", "ko'katli", "parhez"],
    tavsif: "Yangi bodring, pomidor, rediska va ko'katlardan tayyorlangan tetiklantiruvchi salat."
  },
  {
    id: 7,
    nom: "Qora choy (choynak)",
    kategoriya: "ichimlik",
    narx: 10000,
    mavjud: true,
    rasm: "rasmlar/qora-choy.jpg",
    teglar: ["choy", "issiq", "klassik"],
    tavsif: "Xushbo'y navli qora choy, istakka ko'ra limon bilan tortiladi."
  },
  {
    id: 8,
    nom: "Ko'k choy (choynak)",
    kategoriya: "ichimlik",
    narx: 10000,
    mavjud: true,
    rasm: "rasmlar/kok-choy.jpg",
    teglar: ["choy", "tetik", "issiq"],
    tavsif: "Damlangan ko'k choy — taomdan keyin yengillik beruvchi ichimlik."
  },
  {
    id: 9,
    nom: "Salqin limonad",
    kategoriya: "ichimlik",
    narx: 18000,
    mavjud: true,
    rasm: "rasmlar/limonad.jpg",
    teglar: ["salqin", "sitrus", "yozgi"],
    tavsif: "Yangi siqilgan limon sharbati, yalpiz barglari va muz bo'laklari bilan tayyorlangan ichimlik."
  },
  {
    id: 10,
    nom: "Medovik torti",
    kategoriya: "shirinlik",
    narx: 22000,
    mavjud: true,
    rasm: "rasmlar/medovik.jpg",
    teglar: ["asal", "shirinlik", "tort"],
    tavsif: "Tabiiy asal qo'shib pishirilgan yumshoq qatlamlar va qaymoqli kremdan iborat shirinlik."
  },
  {
    id: 11,
    nom: "Napoleon torti",
    kategoriya: "shirinlik",
    narx: 24000,
    mavjud: true,
    rasm: "rasmlar/napoleon.jpg",
    teglar: ["krem", "qarsildoq", "shirinlik"],
    tavsif: "Yupqa qatlamali xamir va vanilli krem uyg'unligidagi klassik shirinlik."
  },
  {
    id: 12,
    nom: "Xolva (yong'oqli)",
    kategoriya: "shirinlik",
    narx: 16000,
    mavjud: false,
    rasm: "rasmlar/xolva.jpg",
    teglar: ["milliy", "yong'oqli", "choyga"],
    tavsif: "Qovurilgan yong'oq va sutli qiyomdan tayyorlangan sharqona shirinlik."
  }
];

// Massiv metodlari: map, filter, reduce, sort, find
const barchaTaomNomlari = kafeMenyusi.map((item) => item.nom);
const mavjudTaomlarRoyxati = kafeMenyusi.filter((item) => item.mavjud);
const umumiyMenyuQiymati = kafeMenyusi.reduce((yigindi, item) => yigindi + item.narx, 0);
const ortachaMenyuNarxi = Math.round(umumiyMenyuQiymati / kafeMenyusi.length);
const narxBoyichaSaralangan = [...kafeMenyusi].sort((a, b) => b.narx - a.narx);
const kunTavsiyasi = kafeMenyusi.find((item) => item.id === 3);

function statistikaHisobla(royxat = kafeMenyusi) {
  const jamiSoni = royxat.reduce((son) => son + 1, 0);
  const jamiSumma = royxat.reduce((sum, item) => sum + item.narx, 0);
  const ortachaNarx = jamiSoni > 0 ? Math.round(jamiSumma / jamiSoni) : 0;

  const engQimmat = royxat.length > 0
    ? [...royxat].sort((a, b) => b.narx - a.narx).find((item) => Boolean(item.nom))
    : null;

  return {
    jamiSoni,
    ortachaNarx,
    engQimmatNom: engQimmat ? engQimmat.nom : "Ma'lumot yo'q",
    engQimmatNarx: engQimmat ? engQimmat.narx : 0
  };
}

function pulFormatla(qiymat) {
  return `${Number(qiymat).toLocaleString("uz-UZ")} so'm`;
}