// js/ui.js
(function () {
  const THEME_STORAGE_KEY = "zarafshon_kafe_theme";
  const FAVORITES_STORAGE_KEY = "zarafshon_kafe_sevimlilar";

  function sevimlilarniOlish() {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function sevimlilarniSaqlash(royxat) {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(royxat));
    sevimliHisoblagichniYangila();
  }

  function sevimlilardaBormi(id) {
    return sevimlilarniOlish().includes(Number(id));
  }

  function sevimliniAlmashtir(id) {
    const numId = Number(id);
    const joriy = sevimlilarniOlish();
    const yangi = joriy.includes(numId)
      ? joriy.filter((el) => el !== numId)
      : [...joriy, numId];
    sevimlilarniSaqlash(yangi);
    return yangi;
  }

  function sevimliHisoblagichniYangila() {
    const soni = sevimlilarniOlish().length;
    document.querySelectorAll(".sevimli-soni").forEach((el) => {
      el.textContent = String(soni);
    });
  }

  function tungiRejimniQollash(yoqilgan) {
    document.body.classList.toggle("tungi-rejim", Boolean(yoqilgan));
    document.querySelectorAll(".tungi-rejim-btn").forEach((btn) => {
      btn.textContent = yoqilgan ? "Kunduzgi" : "Tungi rejim";
      btn.setAttribute("aria-pressed", String(Boolean(yoqilgan)));
    });
  }

  function tungiRejimSozlash() {
    const saqlangan = localStorage.getItem(THEME_STORAGE_KEY) === "dark";
    tungiRejimniQollash(saqlangan);

    document.querySelectorAll(".tungi-rejim-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const keyingi = !document.body.classList.contains("tungi-rejim");
        localStorage.setItem(THEME_STORAGE_KEY, keyingi ? "dark" : "light");
        tungiRejimniQollash(keyingi);
      });
    });
  }

  function mobilMenyuSozlash() {
    const burgerBtn = document.getElementById("burger-btn");
    const nav = document.getElementById("asosiy-nav");

    if (!burgerBtn || !nav) return;

    burgerBtn.addEventListener("click", () => {
      const ochiq = nav.classList.toggle("ochiq");
      burgerBtn.setAttribute("aria-expanded", String(ochiq));
    });

    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("ochiq");
        burgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function xatoQoyish(inputEl, matn) {
    if (!inputEl) return;
    const maydon = inputEl.closest(".maydon");
    const xatoSpan = maydon ? maydon.querySelector(".xato-matn") : null;
    inputEl.classList.add("xato-input");
    if (xatoSpan) {
      xatoSpan.textContent = matn;
    }
  }

  function xatoOchirish(inputEl) {
    if (!inputEl) return;
    const maydon = inputEl.closest(".maydon");
    const xatoSpan = maydon ? maydon.querySelector(".xato-matn") : null;
    inputEl.classList.remove("xato-input");
    if (xatoSpan) {
      xatoSpan.textContent = "";
    }
  }

  function formaTekshiruviSozlash() {
    const forma = document.getElementById("band-qilish-formasi");
    if (!forma) return;

    const ismInput = document.getElementById("ism");
    const emailInput = document.getElementById("email");
    const telefonInput = document.getElementById("telefon");
    const sanaInput = document.getElementById("sana");
    const izohInput = document.getElementById("izoh");
    const muvaffaqiyatEl = document.getElementById("forma-muvaffaqiyat");

    const emailAndoza = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telAndoza = /^\+998\d{9}$/;

    function tekshir(inputEl) {
      if (!inputEl) return true;
      const qiymat = inputEl.value.trim();

      if (inputEl === ismInput) {
        if (qiymat.length < 3) {
          xatoQoyish(inputEl, "Ism-familiya kamida 3 ta belgidan iborat bo'lishi kerak.");
          return false;
        }
        xatoOchirish(inputEl);
        return true;
      }

      if (inputEl === emailInput) {
        if (!qiymat) {
          xatoQoyish(inputEl, "Elektron pochta manzilini kiriting.");
          return false;
        }
        if (!emailAndoza.test(qiymat)) {
          xatoQoyish(inputEl, "Email formati noto'g'ri (masalan: ali@zarafshon.uz).");
          return false;
        }
        xatoOchirish(inputEl);
        return true;
      }

      if (inputEl === telefonInput) {
        const tozaTel = qiymat.replace(/\s+/g, "");
        if (!telAndoza.test(tozaTel)) {
          xatoQoyish(inputEl, "Telefon raqam +998XXXXXXXXX formatida bo'lishi shart.");
          return false;
        }
        xatoOchirish(inputEl);
        return true;
      }

      if (inputEl === sanaInput) {
        if (!qiymat) {
          xatoQoyish(inputEl, "Kelish sanasini tanlang.");
          return false;
        }
        xatoOchirish(inputEl);
        return true;
      }

      if (inputEl === izohInput) {
        if (qiymat.length > 0 && qiymat.length < 10) {
          xatoQoyish(inputEl, "Izoh yozilsa, kamida 10 ta belgidan iborat bo'lsin.");
          return false;
        }
        if (qiymat.length > 250) {
          xatoQoyish(inputEl, "Izoh 250 ta belgidan oshmasligi kerak.");
          return false;
        }
        xatoOchirish(inputEl);
        return true;
      }

      return true;
    }

    [ismInput, emailInput, telefonInput, sanaInput, izohInput].forEach((input) => {
      if (!input) return;
      input.addEventListener("input", () => {
        tekshir(input);
        if (muvaffaqiyatEl) muvaffaqiyatEl.textContent = "";
      });
      input.addEventListener("blur", () => tekshir(input));
    });

    forma.addEventListener("submit", (e) => {
      e.preventDefault();

      const natijalar = [
        tekshir(ismInput),
        tekshir(emailInput),
        tekshir(telefonInput),
        tekshir(sanaInput),
        tekshir(izohInput)
      ];

      if (!natijalar.every(Boolean)) {
        if (muvaffaqiyatEl) muvaffaqiyatEl.textContent = "";
        return;
      }

      forma.reset();
      [ismInput, emailInput, telefonInput, sanaInput, izohInput].forEach(xatoOchirish);

      if (muvaffaqiyatEl) {
        muvaffaqiyatEl.textContent = "Stol band qilish so'rovingiz muvaffaqiyatli yuborildi!";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    tungiRejimSozlash();
    mobilMenyuSozlash();
    sevimliHisoblagichniYangila();
    formaTekshiruviSozlash();
  });

  window.ZarafshonUI = {
    sevimlilardaBormi,
    sevimliniAlmashtir,
    sevimliHisoblagichniYangila
  };
})();