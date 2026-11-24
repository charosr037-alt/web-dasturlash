# Zarafshon Kafe — 4-Amaliy Ish (`amaliy-04`)

## Loyiha mavzusi
«Zarafshon kafe» veb-sayti menyu katalogi, statistikasi va stol band qilish formasini JavaScript orqali jonlantirish[cite: 8, 12, 14].

## Qo'shilgan imkoniyatlar
- **A qism (`js/data.js`)**: 12 ta obyektli massiv va statistika (jami son, o'rtacha narx, eng qimmat element)[cite: 9].
- **B qism (`js/katalog.js`, `katalog.html`)**: `createElement` va `textContent` bilan kartalar chiqarish, qidiruv, filtr, saralash va «Hech narsa topilmadi» xabari[cite: 10].
- **C qism (`js/ui.js`, `js/katalog.js`, `aloqa.html`)**: modal oyna, event delegation, forma tekshiruvi, mobil menyu, tungi rejim va sevimlilar (`localStorage`)[cite: 10].

## Massiv metodlari qayerda ishlatilgan
- `map`: `js/data.js` (`barchaTaomNomlari`)[cite: 9]
- `filter`: `js/data.js` (`mavjudTaomlarRoyxati`), `js/katalog.js` (`yangila`), `js/ui.js` (`sevimliniAlmashtir`)[cite: 9, 10]
- `reduce`: `js/data.js` (`umumiyMenyuQiymati`, `statistikaHisobla`)[cite: 9]
- `sort`: `js/data.js` (`narxBoyichaSaralangan`, `statistikaHisobla`), `js/katalog.js` (`sarala`)[cite: 9, 10]
- `find`: `js/data.js` (`kunTavsiyasi`, `statistikaHisobla`), `js/katalog.js` (`modalOch`)[cite: 9, 10]