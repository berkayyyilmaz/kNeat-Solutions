# 🛍️ kNeat Solutions E-Commerce

_Bu projenin backend servisi eğitimini aldığım Workintech firması tarafından sağlanmaktadır. Projenin çalışması bu servisin çalışıyor olmasına bağlıdır._

Modern ve kullanıcı dostu bir e-ticaret platformu. React, Redux ve Tailwind CSS teknolojileri kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### ✨ Ana Özellikler

- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Kullanıcı Yönetimi**: Giriş yapma, kayıt olma ve kullanıcı profili
- **Ürün Katalogu**: Kategorilere ayrılmış ürün listeleme
- **Ürün Detayları**: Swiper ile galeri, renk/beden seçimi
- **Alışveriş Sepeti**: Ürün ekleme, çıkarma ve sepet yönetimi
- **Filtreleme ve Arama**: Ürünleri filtreleme ve arama işlevleri
- **Sayfalama**: Ürün listelerinde sayfalama desteği

### 🎨 Kullanıcı Arayüzü

- **Modern Tasarım**: Minimalist ve temiz arayüz
- **Özel Renkler**: Marka kimliğine uygun renk paleti
- **Tipografi**: Montserrat font ailesi
- **İkonlar**: Lucide React ikon seti
- **Animasyonlar**: Smooth geçişler ve hover efektleri

### 📱 Sayfalar

- **Ana Sayfa**: Yeni koleksiyon, editör seçimi ve en çok satanlar
- **Mağaza**: Kategorilere göre ürün listeleme
- **Ürün Detayı**: Detaylı ürün bilgileri ve görsel galeri
- **Giriş/Kayıt**: Kullanıcı kimlik doğrulama sayfaları

## 🛠️ Teknoloji Stack'i

### Frontend

- **React 18.3.1**: Modern React hooks ve functional components
- **Redux Toolkit**: Global state yönetimi
- **React Router 5.3.4**: SPA routing
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **Vite 6.0.5**: Hızlı build tool

### UI Kütüphaneleri

- **Lucide React**: Modern ikon seti
- **React Hook Form**: Form yönetimi ve validasyon
- **React Slick**: Carousel/slider bileşeni
- **Swiper**: Gelişmiş slider ve galeri
- **React Toastify**: Bildirim yönetimi
- **React Gravatar**: Profil resimi desteği

### Geliştirme Araçları

- **ESLint**: Kod kalitesi ve standartları
- **Prettier**: Kod formatlama
- **PostCSS**: CSS işleme
- **Autoprefixer**: CSS vendor prefix'leri

## 📁 Proje Yapısı

```
src/
├── assets/           # Resimler ve statik dosyalar
├── components/       # Yeniden kullanılabilir bileşenler
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── BestSeller.jsx
│   ├── EditorsPick.jsx
│   ├── NewCollection.jsx
│   ├── Pagination.jsx
│   └── ...
├── data/            # Mock veriler ve sabitler
├── layout/          # Layout bileşenleri
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── PageContent.jsx
├── pages/           # Sayfa bileşenleri
│   ├── HomePage.jsx
│   ├── ShopPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── LoginPage.jsx
│   └── SignUpPage.jsx
├── redux/           # Redux store yapısı
│   ├── store.js
│   ├── actions/
│   ├── reducers/
│   └── actionTypes/
├── services/        # API servis katmanı
│   └── api.js
└── App.jsx         # Ana uygulama bileşeni
```

## 🎨 Tasarım Sistemi

### Renkler

- **Primary**: `#FF7B47` (Turuncu)
- **Secondary**: `#0D5C63` (Koyu Teal)
- **Gray**: `#737373` (Orta Gri)
- **Light Gray**: `#FAFAFA` (Açık Gri)

### Tipografi

- **Font Family**: Montserrat
- **Heading Sizes**: H1 (3rem) - H6 (1.125rem)
- **Font Weights**: 400-700 arası

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 16+
- npm veya yarn

### Kurulum Adımları

1. **Proje'yi klonlayın:**

```bash
git clone https://github.com/berkayyyilmaz/e-commerce_project.git
cd kNeat-Solutions
```

2. **Bağımlılıkları yükleyin:**

```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**

```bash
npm run dev
```

4. **Tarayıcıda açın:**

```
http://localhost:5173
```

### Diğer Komutlar

```bash
# Production build
npm run build

# Linting
npm run lint

# Preview build
npm run preview
```

## 🔗 API Entegrasyonu

Proje, backend API'si için hazır axios yapılandırması içerir:

- **Base URL**: `https://workintech-fe-ecommerce.onrender.com`
- **Authentication**: JWT token desteği
- **Headers**: Otomatik token ekleme

## 🌟 Öne Çıkan Özellikler

### Redux State Yönetimi

- **Client State**: Kullanıcı bilgileri, roller, tema ve dil
- **Product State**: Ürün listesi, kategoriler, filtreleme
- **Shopping Cart**: Sepet yönetimi, ödeme ve adres bilgileri

### Responsive Tasarım

- Mobile-first yaklaşım
- Flexbox ve Grid layout
- Tailwind CSS breakpoint'leri

### Performance Optimizasyonu

- Vite build tool ile hızlı geliştirme
- Code splitting hazırlığı
- Optimized asset loading

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasını inceleyebilirsiniz.

## 👨‍💻 Geliştirici

**berkayyyilmaz** - [GitHub](https://github.com/berkayyyilmaz)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

Proje hakkında sorularınız için issue açabilir veya doğrudan iletişime geçebilirsiniz.

---

⭐ Bu proje beğendiyseniz, yıldız vermeyi unutmayın!
