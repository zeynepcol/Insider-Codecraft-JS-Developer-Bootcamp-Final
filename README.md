<h2 align="center"> Insider & Testinium Tech Hub JavaScript Developer Bootcamp – Final Projesi </h2>

<h3 align="left">Product Carousel Case</h3>

Bu projede, [LC Waikiki](https://www.lcwaikiki.com) ürün detay sayfasındaki "Bunları Da Beğenebilirsiniz" alanına benzer şekilde tasarlanmıştır. 


![Image](https://github.com/user-attachments/assets/3f62942b-bc46-4bc6-b1fb-bdb4914603b5)

## 🚀 Özellikler

-  Gelişmiş ürün kaydırma (carousel) yapısı
-  Dinamik olarak harici bir `JSON API` üzerinden ürün verisi çekme
-  `localStorage` kullanarak veri önbellekleme
-  Ürünleri favorilere ekleme ve çıkarma
-  Responsive (mobil uyumlu) yapı
-  jQuery ve Font Awesome dinamik olarak yüklenir
-  CSS stilleri JavaScript üzerinden otomatik olarak eklenir


## 🔧 Kullanılan Teknolojiler

- JavaScript (Vanilla)
- jQuery (CDN üzerinden otomatik yüklenir)
- Font Awesome (iconlar için)
- localStorage (veri önbellekleme ve favori takibi)
- CSS (carousel ve ürün kartlarının tasarımı)


## 📦 Proje Yapısı

- `products.json`: Gist üzerinden JSON formatında ürün bilgileri alınır.
- `product-carousel`: Tüm carousel bileşenini saran ana kapsayıcı.
- `product__favorite-icon`: Tıklanabilir kalp ikonuyla ürün favorileme işlemi yapılır.
- `product__add-to-cart-btn`: "Sepete Ekle" butonu sadece mobil görünümde gösterilir.
- `.next` ve `.prev` butonları ile yatay kaydırma yapılır.

## 📂 localStorage Anahtarları

- `product__suggested`: Ürün verilerinin önbellekte saklandığı anahtar.
- `product__favorite`: Kullanıcının favori olarak işaretlediği ürün ID'lerinin tutulduğu anahtar.


## 🖼️ Arayüz

Carousel bileşeni aşağıdaki öğelerden oluşur:

- Ürün görseli
- Ürün adı
- Fiyat (TL cinsinden)
- "Sepete Ekle" butonu
- Favori kalp ikonu
- Carousel yön butonları


## 📱 Mobil Duyarlılık

- Küçük ekranlarda yatay scroll etkinleştirilir.
- Navigasyon butonları gizlenir.
- "Sepete Ekle" butonu yalnızca mobilde görünür.


## 🙏 Teşekkürler

<p>
Bu repo, <strong>Insider & Testinium Tech Hub JavaScript Developer Bootcamp</strong>'in final projesi olarak hazırlanmıştır. Bu süreçte emeği geçen tüm Insider ekibine teşekkür ederim.
</p>
