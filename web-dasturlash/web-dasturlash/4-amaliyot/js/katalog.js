// js/katalog.js
document.addEventListener("DOMContentLoaded", () => {
  const konteyner = document.getElementById("katalog-konteyner");
  const qidiruvInput = document.getElementById("qidiruv-input");
  const kategoriyaSelect = document.getElementById("kategoriya-select");
  const saralashSelect = document.getElementById("saralash-select");
  const mavjudCheckbox = document.getElementById("faqat-mavjud");
  const natijaSoniEl = document.getElementById("natija-soni");
  const boshXabarEl = document.getElementById("bosh-xabar");

  // Statistika elementlari
  const statJamiEl = document.getElementById("stat-jami");
  const statOrtachaEl = document.getElementById("stat-ortacha");
  const statEngQimmatEl = document.getElementById("stat-eng-qimmat");

  // Modal elementlari
  const modalFon = document.getElementById("taom-modal");
  const modalYopishBtn = document.getElementById("modal-yopish");
  const modalRasm = document.getElementById("modal-rasm");
  const modalNom = document.getElementById("modal-nom");
  const modalKategoriya = document.getElementById("modal-kategoriya");
  const modalTavsif = document.getElementById("modal-tavsif");
  const modalTeglar = document.getElementById("modal-teglar");
  const modalNarx = document.getElementById("modal-narx");
  const modalHolat = document.getElementById("modal-holat");
  const modalSevimliBtn = document.getElementById("modal-sevimli-btn");

  if (!konteyner || typeof kafeMenyusi === "undefined") {
    return;
  }

  let tanlanganModalId = null;

  function kategoriyaNomi(kod) {
    const nomlar = {
      milliy: "Milliy taomlar",
      salat: "Salatlar",
      ichimlik: "Ichimliklar",
      shirinlik: "Shirinliklar"
    };
    return nomlar[kod] || kod;
  }

  function statistikaniYangila() {
    const stat = statistikaHisobla(kafeMenyusi);
    if (statJamiEl) statJamiEl.textContent = String(stat.jamiSoni);
    if (statOrtachaEl) statOrtachaEl.textContent = pulFormatla(stat.ortachaNarx);
    if (statEngQimmatEl) {
      statEngQimmatEl.textContent = `${stat.engQimmatNom} (${pulFormatla(stat.engQimmatNarx)})`;
    }
  }

  function kartaYarat(item) {
    const karta = document.createElement("article");
    karta.className = "karta";
    karta.dataset.id = String(item.id);

    const holatBelgi = document.createElement("span");
    holatBelgi.className = item.mavjud ? "belgi-yangi" : "belgi-yangi chegirma";
    holatBelgi.textContent = item.mavjud ? "Mavjud" : "Tugagan";

    const rasm = document.createElement("img");
    rasm.src = item.rasm;
    rasm.alt = item.nom;
    rasm.className = "karta-rasm";
    rasm.addEventListener("error", () => {
      rasm.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='240'%3E%3Crect width='100%25' height='100%25' fill='%231f3a5f'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fbbf24' font-family='Arial' font-size='20'%3EZarafshon Kafe%3C/text%3E%3C/svg%3E";
    });

    const sarlavha = document.createElement("h3");
    sarlavha.textContent = item.nom;

    const katMatn = document.createElement("p");
    katMatn.className = "karta-kategoriya";
    katMatn.textContent = kategoriyaNomi(item.kategoriya);

    const tavsif = document.createElement("p");
    tavsif.className = "karta-tavsif";
    tavsif.textContent = item.tavsif;

    const teglarQuti = document.createElement("div");
    teglarQuti.className = "teglar";
    item.teglar.forEach((teg) => {
      const span = document.createElement("span");
      span.className = "teg";
      span.textContent = `#${teg}`;
      teglarQuti.append(span);
    });

    const narx = document.createElement("p");
    narx.className = "karta-narx";
    narx.textContent = pulFormatla(item.narx);

    const tugmalarQuti = document.createElement("div");
    tugmalarQuti.className = "karta-tugmalar";

    const batafsilBtn = document.createElement("button");
    batafsilBtn.type = "button";
    batafsilBtn.className = "btn-asosiy";
    batafsilBtn.dataset.action = "batafsil";
    batafsilBtn.dataset.id = String(item.id);
    batafsilBtn.textContent = "Batafsil";

    const sevimliBtn = document.createElement("button");
    sevimliBtn.type = "button";
    sevimliBtn.className = "btn-ikkinchi";
    sevimliBtn.dataset.action = "sevimli";
    sevimliBtn.dataset.id = String(item.id);

    const sevimliBormi = window.ZarafshonUI
      ? window.ZarafshonUI.sevimlilardaBormi(item.id)
      : false;
    sevimliBtn.textContent = sevimliBormi ? "Sevimlida ★" : "Sevimlilarga ☆";

    tugmalarQuti.append(batafsilBtn, sevimliBtn);
    karta.append(holatBelgi, rasm, sarlavha, katMatn, tavsif, teglarQuti, narx, tugmalarQuti);

    return karta;
  }

  function chiqar(royxat) {
    konteyner.innerHTML = "";

    if (natijaSoniEl) {
      natijaSoniEl.textContent = String(royxat.length);
    }

    if (royxat.length === 0) {
      if (boshXabarEl) {
        boshXabarEl.textContent = "Hech narsa topilmadi";
        boshXabarEl.hidden = false;
      }
      return;
    }

    if (boshXabarEl) {
      boshXabarEl.textContent = "";
      boshXabarEl.hidden = true;
    }

    royxat.forEach((item) => {
      konteyner.append(kartaYarat(item));
    });
  }

  function sarala(royxat, usul) {
    const nusxa = [...royxat];
    if (usul === "narx-osish") {
      return nusxa.sort((a, b) => a.narx - b.narx);
    }
    if (usul === "narx-kamayish") {
      return nusxa.sort((a, b) => b.narx - a.narx);
    }
    if (usul === "nom-az") {
      return nusxa.sort((a, b) => a.nom.localeCompare(b.nom, "uz"));
    }
    if (usul === "nom-za") {
      return nusxa.sort((a, b) => b.nom.localeCompare(a.nom, "uz"));
    }
    return nusxa;
  }

  function yangila() {
    const qidiruvMatn = (qidiruvInput ? qidiruvInput.value : "").trim().toLowerCase();
    const tanlanganKat = kategoriyaSelect ? kategoriyaSelect.value : "barchasi";
    const saralashUsuli = saralashSelect ? saralashSelect.value : "standart";
    const faqatMavjud = mavjudCheckbox ? mavjudCheckbox.checked : false;

    const filtrlangan = kafeMenyusi.filter((item) => {
      const nomMos = item.nom.toLowerCase().includes(qidiruvMatn);
      const tegMos = item.teglar.some((teg) => teg.toLowerCase().includes(qidiruvMatn));
      const qidiruvMos = qidiruvMatn === "" || nomMos || tegMos;

      const katMos = tanlanganKat === "barchasi" || item.kategoriya === tanlanganKat;
      const mavjudMos = !faqatMavjud || item.mavjud;

      return qidiruvMos && katMos && mavjudMos;
    });

    const natija = sarala(filtrlangan, saralashUsuli);
    chiqar(natija);
  }

  function modalOch(id) {
    const item = kafeMenyusi.find((el) => el.id === Number(id));
    if (!item || !modalFon) return;

    tanlanganModalId = item.id;
    modalRasm.src = item.rasm;
    modalRasm.alt = item.nom;
    modalRasm.onerror = () => {
      modalRasm.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='260'%3E%3Crect width='100%25' height='100%25' fill='%231f3a5f'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fbbf24' font-family='Arial' font-size='22'%3EZarafshon Kafe%3C/text%3E%3C/svg%3E";
    };

    modalNom.textContent = item.nom;
    modalKategoriya.textContent = kategoriyaNomi(item.kategoriya);
    modalTavsif.textContent = item.tavsif;
    modalNarx.textContent = pulFormatla(item.narx);
    modalHolat.textContent = item.mavjud ? "Buyurtma uchun mavjud" : "Vaqtincha tugagan";

    modalTeglar.innerHTML = "";
    item.teglar.forEach((teg) => {
      const span = document.createElement("span");
      span.className = "teg";
      span.textContent = `#${teg}`;
      modalTeglar.append(span);
    });

    if (modalSevimliBtn && window.ZarafshonUI) {
      const bor = window.ZarafshonUI.sevimlilardaBormi(item.id);
      modalSevimliBtn.textContent = bor ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish";
    }

    modalFon.classList.add("ochiq");
    modalFon.setAttribute("aria-hidden", "false");
  }

  function modalYop() {
    if (!modalFon) return;
    modalFon.classList.remove("ochiq");
    modalFon.setAttribute("aria-hidden", "true");
    tanlanganModalId = null;
  }

  // Event delegation: barcha karta tugmalari uchun bitta ota konteyner tinglovchisi
  konteyner.addEventListener("click", (e) => {
    const tugma = e.target.closest("button[data-action]");
    if (!tugma) return;

    const action = tugma.dataset.action;
    const id = Number(tugma.dataset.id);

    if (action === "batafsil") {
      modalOch(id);
    } else if (action === "sevimli" && window.ZarafshonUI) {
      window.ZarafshonUI.sevimliniAlmashtir(id);
      yangila();
    }
  });

  if (modalYopishBtn) {
    modalYopishBtn.addEventListener("click", modalYop);
  }

  if (modalFon) {
    modalFon.addEventListener("click", (e) => {
      if (e.target === modalFon) {
        modalYop();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalFon && modalFon.classList.contains("ochiq")) {
      modalYop();
    }
  });

  if (modalSevimliBtn) {
    modalSevimliBtn.addEventListener("click", () => {
      if (tanlanganModalId !== null && window.ZarafshonUI) {
        window.ZarafshonUI.sevimliniAlmashtir(tanlanganModalId);
        modalOch(tanlanganModalId);
        yangila();
      }
    });
  }

  if (qidiruvInput) qidiruvInput.addEventListener("input", yangila);
  if (kategoriyaSelect) kategoriyaSelect.addEventListener("change", yangila);
  if (saralashSelect) saralashSelect.addEventListener("change", yangila);
  if (mavjudCheckbox) mavjudCheckbox.addEventListener("change", yangila);

  statistikaniYangila();
  yangila();
});