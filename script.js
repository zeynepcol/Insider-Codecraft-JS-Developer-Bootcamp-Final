(() => {
  const loadScript = (src, callback) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  };

  const loadFontAwesomeIcons = () => {
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
      document.head.appendChild(link);
    }
  };

  loadFontAwesomeIcons();

  if (typeof window.jQuery === "undefined") {
    loadScript("https://code.jquery.com/jquery-3.7.1.min.js", main);
  } else {
    main();
  }

  function main() {
    const API_URL =
      "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";
    const PRODUCTS_LOCALSTORAGE_KEY = "product__suggested";
    const FAVORITES_LOCALSTORAGE_KEY = "product__favorite";
    const OVERFLOW_STEP = 230;
    let currentPosition = 0;
    let carouselWrapper;

    const emptyHeartIcon = `<i class="fa-regular fa-heart" style="font-size:21px; color: #000;"></i>`;
    const filledHeartIcon = `<i class="fa-solid fa-heart" style="font-size:21px; color: #193DB0;"></i>`;
    const carouselArrowIcon = `<i class="fa-solid fa-chevron-right" style="font-size:24px; color: #000;"></i>`;

    const init = () => {
      loadProducts();
    };

    const loadProducts = async () => {
      let products = [];
      const stored = localStorage.getItem(PRODUCTS_LOCALSTORAGE_KEY);
      if (stored) {
        products = JSON.parse(stored);
      } else {
        try {
          const res = await fetch(API_URL);
          products = await res.json();
          localStorage.setItem(
            PRODUCTS_LOCALSTORAGE_KEY,
            JSON.stringify(products)
          );
        } catch (err) {
          console.error("Veri alınamadı", err);
          return;
        }
      }

      buildHTML(products);
      buildCSS();
      setEvents();
    };

    const buildHTML = (products) => {
      const favorites =
        JSON.parse(localStorage.getItem(FAVORITES_LOCALSTORAGE_KEY)) || [];

      const itemsHTML = products
        .map((product) => {
          const isFaved = favorites.includes(product.id);
          return `
            <div class="carousel__product-card">
              <a href="${product.url}" target="_blank" class="product__anchor">
                <img class="product__thumbnail" src="${product.img}" alt="${product.name}" />
              </a>
              <div class="product__details">
                <a href="${product.url}" target="_blank" class="product__anchor">
                  <p class="product__title">${product.name}</p>
                </a>
                <div class="product__price-text">
                  ${product.price.toFixed(2).replace(".", ",")} TL
                </div>
                <button class="product__add-to-cart-btn">Sepete Ekle</button>
              </div>
              <div class="product__favorite-icon" data-id="${product.id}">
                ${isFaved ? filledHeartIcon : emptyHeartIcon}
              </div>
            </div>
          `;
        })
        .join("");

      const wrapper = `
        <div class="product-carousel">
          <div class="product-carousel__container">
            <h2 class="product-carousel__heading">Bunları Da Beğenebilirsiniz</h2>
            <div class="product-carousel__inner">
              <div class="product-carousel__viewport">
                <div class="product-carousel__track">${itemsHTML}</div>
              </div>
              <button class="product-carousel__nav-button prev">${carouselArrowIcon}</button>
              <button class="product-carousel__nav-button next">${carouselArrowIcon}</button>
            </div>
          </div>
        </div>
      `;

      $(".product-detail").after(wrapper);
      carouselWrapper = document.querySelector(".product-carousel__track");
    };

    const buildCSS = () => {
      const css = `
.product-carousel {
  background: #f4f5f7;
  display: flex;
  justify-content: center;
  padding-bottom: 32px;
}
.product-carousel__container {
  width: 80%;
  display: block;
  margin: 0 auto;
}
.product-carousel__heading {
  font-size: 32px;
  color: #29323b;
  line-height: 43px;
  font-weight: lighter;
  padding: 15px 0;
  margin: 0 !important;
}
.product-carousel__inner {
  position: relative;
}
.product-carousel__viewport {
  overflow: hidden;
}
.product-carousel__track {
  display: flex;
  gap: 10px;
  transition: transform 0.4s ease-in-out;
}
.carousel__product-card {
  position: relative;
  background: #fff;
  width: 220px;
  flex: 0 0 auto;
}
.product__anchor {
  text-decoration: none;
  display: block;
}
.product__anchor:hover {
  text-decoration: none;
}
.product__thumbnail {
  width: 100%;
  height: 100%;
}
.product__details {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 5px 10px 0;
}
.product__title {
  font-size: 14px;
  color: #302e2b;
  min-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: initial;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.product__anchor:hover .product__title {
  color: #302e2b;
}
.product__price-text {
  display: flex;
  align-items: flex-end;
  color: #193db0;
  font-size: 18px;
  height: 50px;
  line-height: 22px;
  font-weight: bold;
  margin-bottom: 6px;
}
.product__add-to-cart-btn {
  width: 100%;
  min-height: 36px;
  font-size: 14px;
  font-weight: bold;
  display: none;
  align-items: center;
  justify-content: center;
  background-color: #193DB0;
  color: #fff;
  border-radius: 3px;
  border: none;
  padding: 8px 28.1px 9px 28.5px;
  margin-top: 4px;
  text-transform: uppercase;
  cursor: pointer;
}
.product__favorite-icon {
  position: absolute;
  top: 18px;
  right: 14px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.product-carousel__nav-button {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  user-select: none;
}
.product-carousel__nav-button.prev {
  left: -35px;
  transform: rotate(180deg);
}
.product-carousel__nav-button.next {
  right: -35px;
  transform: rotate(0deg);
}
@media (max-width: 992px) {
  .product-carousel__container {
    width: 100%;
    padding: 0 15px;
  }
  .product-carousel__nav-button {
    display: none;
  }
  .product-carousel__viewport {
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
  .product-carousel__viewport::-webkit-scrollbar {
    display: none;
  }
  .product-carousel__track {
    transform: none;
    gap: 30px;
  }
  .product-carousel__heading {
    font-size: 24px;
    line-height: 33px;
  }
  .carousel__product-card {
    scroll-snap-align: start;
    width: 280px;
  }
  .product__favorite-icon {
    top: 20px;
    right: 26px;
  }
  .product__add-to-cart-btn {
    display: flex;
  }
}
@media (max-width: 768px) {
  .product-carousel__track {
    gap: 27.5px;
  }
}
`;
      $("<style>").html(css).appendTo("head");
    };

    const setEvents = () => {
      $(document).on("click", ".product__favorite-icon", function () {
        const id = $(this).data("id");
        let favs =
          JSON.parse(localStorage.getItem(FAVORITES_LOCALSTORAGE_KEY)) || [];
        const isFaved = favs.includes(id);

        if (isFaved) {
          favs = favs.filter((f) => f !== id);
          $(this).html(emptyHeartIcon);
        } else {
          favs.push(id);
          $(this).html(filledHeartIcon);
        }

        localStorage.setItem(FAVORITES_LOCALSTORAGE_KEY, JSON.stringify(favs));
      });

      $(document).on("click", ".product-carousel__nav-button.next", () => {
        const wrapperWidth = carouselWrapper.clientWidth;
        const scrollWidth = carouselWrapper.scrollWidth;
        const remainingScroll = scrollWidth + currentPosition - wrapperWidth;

        const moveX =
          remainingScroll <= OVERFLOW_STEP ? remainingScroll : OVERFLOW_STEP;

        if (moveX > 0) {
          currentPosition -= moveX;
          carouselWrapper.style.transform = `translateX(${currentPosition}px)`;
        }
      });

      $(document).on("click", ".product-carousel__nav-button.prev", () => {
        const moveX = Math.min(OVERFLOW_STEP, Math.abs(currentPosition));
        if (moveX > 0) {
          currentPosition += moveX;
          carouselWrapper.style.transform = `translateX(${currentPosition}px)`;
        }
      });
    };

    init();
  }
})();
