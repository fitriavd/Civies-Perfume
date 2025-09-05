// Keranjang sederhana
let cart = [];
const cartCount = document.querySelector(".cart-count");
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", function () {
    const product = btn.getAttribute("data-product");
    cart.push(product);
    cartCount.textContent = cart.length;
    showToast(product + " berhasil dimasukkan ke keranjang!");
  });
});
const cartPopup = document.getElementById("cart-popup");
const cartList = document.querySelector(".cart-list");
const closeCartBtn = document.getElementById("close-cart");

function updateCartList() {
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = "<li>Keranjang kosong</li>";
  } else {
    // Hitung jumlah tiap produk
    const productMap = {};
    cart.forEach((item) => {
      productMap[item] = (productMap[item] || 0) + 1;
    });
    Object.keys(productMap).forEach((item, idx) => {
      cartList.innerHTML += `<li>
        ${item} <span style='font-weight:bold;'>x${productMap[item]}</span>
        <button class='cart-btn' data-action='add' data-product="${item}">+</button>
        <button class='cart-btn' data-action='subtract' data-product="${item}">-</button>
        <button class='cart-btn' data-action='remove' data-product="${item}">Hapus</button>
      </li>`;
    });
  }
  // Re-attach event listener setiap update
  document.querySelectorAll(".cart-btn").forEach((btn) => {
    btn.onclick = function () {
      const action = btn.getAttribute("data-action");
      const product = btn.getAttribute("data-product");
      if (action === "add") {
        cart.push(product);
      } else if (action === "subtract") {
        const idx = cart.indexOf(product);
        if (idx !== -1) cart.splice(idx, 1);
      } else if (action === "remove") {
        cart = cart.filter((item) => item !== product);
      }
      cartCount.textContent = cart.length;
      updateCartList();
    };
  });
}

document.querySelector(".cart-icon").addEventListener("click", function (e) {
  e.preventDefault();
  cartPopup.style.display = "block";
  updateCartList();
});

closeCartBtn.addEventListener("click", function () {
  cartPopup.style.display = "none";
});
let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
};
// Animasi scroll reveal untuk section
const sections = document.querySelectorAll("section");
function revealSections() {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add("visible");
    } else {
      section.classList.remove("visible");
    }
  });
}
window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

// Smooth scroll untuk navigasi
const navLinks = document.querySelectorAll(".navbar a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Efek bounce pada tombol saat diklik
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    btn.classList.add("bounce");
    setTimeout(() => btn.classList.remove("bounce"), 400);
  });
});

// Efek zoom+rotate pada gambar produk saat hover
document.querySelectorAll(".products .box .image img").forEach((img) => {
  img.addEventListener("mouseenter", function () {
    img.style.transform = "scale(1.15) rotate(-3deg)";
    img.style.transition = "transform 0.4s cubic-bezier(.77,0,.18,1)";
  });
  img.addEventListener("mouseleave", function () {
    img.style.transform = "";
  });
});

// Toast interaktif saat tombol 'get yours now' diklik
const getBtn = document.querySelector(".home .btn");
if (getBtn) {
  getBtn.addEventListener("click", function (e) {
    showToast("Terima kasih! Silakan hubungi kami di kontak untuk pemesanan.");
  });
}

function showToast(message) {
  let toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "40px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#856f53";
  toast.style.color = "#fff";
  toast.style.padding = "1rem 2rem";
  toast.style.borderRadius = "2rem";
  toast.style.boxShadow = "0 4px 24px rgba(0,0,0,0.18)";
  toast.style.fontSize = "1.6rem";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.4s";
  document.body.appendChild(toast);
  setTimeout(() => (toast.style.opacity = "1"), 50);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// Preloader hide after page loaded
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
    setTimeout(() => preloader.remove(), 500);
  }
  // Animasi typing pada hero
  const typing = document.getElementById("hero-typing");
  if (typing) {
    const text = "LAWAN BAU BADAN BERSAMA CIVIES";
    let i = 0;
    function type() {
      typing.textContent = text.slice(0, i);
      if (i < text.length) {
        i++;
        setTimeout(type, 60);
      } else {
        typing.textContent = text;
      }
    }
    type();
  }
});

// Efek parallax pada background home
const homeSection = document.querySelector(".home");
window.addEventListener("scroll", function () {
  if (homeSection) {
    let offset = window.scrollY * 0.3;
    homeSection.style.backgroundPosition = `center ${offset}px`;
  }
});
