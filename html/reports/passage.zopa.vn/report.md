# Báo cáo clone — https://passage.zopa.vn/ (trang chủ)

Ngày: 2026-10-06 · Mục tiêu người dùng: giống **tối thiểu 97%** · Công nghệ: HTML/CSS/JS thuần, không framework, không build step.

## 1. File đã tạo

| Loại | File |
|---|---|
| HTML | `index.html` (semantic: header/nav, main > section, footer) |
| CSS | `css/main.css` (font-face, tokens, reset, header, menu mobile, footer, back-to-top, thanh điều hướng đáy mobile) · `css/home.css` (các section trang chủ + responsive) |
| JS | `js/main.js` (mở/đóng menu mobile, back-to-top, ẩn thanh đáy khi cuộn) · `js/home.js` (slideshow hero, tab/accordion trải nghiệm, lightbox gallery) |
| Ảnh | `images/`: 53 file ảnh gốc (giữ nguyên định dạng, không nén) + 7 icon SVG (lấy từ SVG gốc; riêng icon bản đồ vẽ lại vì gốc dùng icon-font) |
| Font | `fonts/`: Cormorant Garamond (thường + nghiêng), Manrope, Onest — tự host bản woff2 của Google Fonts (subset latin/latin-ext, thêm subset math của Onest để hiển thị đúng glyph "→") |

- Không còn URL nào trỏ về `passage.zopa.vn`; không có tracking script, `fetch` hay XHR. Gốc không có iframe video.
- Link nội bộ: *(cập nhật 2026-10-07)* menu, footer, các nút "Explore the journey / View All Tours / Explore journeys / Begin your passage" đã trỏ sang các trang con mới clone (xem Phần 2). Chi tiết tour, Reserve, giỏ hàng, tìm kiếm vẫn để `href="#"`.
- Ảnh dưới màn hình đầu dùng `loading="lazy"`; 2 slide hero sau chỉ tải sau sự kiện `load`.

## 2. URL bị bỏ qua
Không có.

## 3. Kết quả pixel-diff theo section × breakpoint

Đo bằng `pixel-diff.mjs` (pixelmatch, threshold 0.1). Ảnh gốc và ảnh clone chụp cùng viewport, cùng vùng cắt theo từng section.
Chuẩn hoá trước khi chụp ở cả hai bên: tắt animation/transition, hero cố định ở frame đầu (banner-03, không Ken Burns), min-height hero = 810px, ẩn các phần tử fixed (back-to-top, thanh đáy mobile). Breakpoint 1024/900/480 lấy từ media query của CSS gốc.

| Section | 1920px | 1440px | 1366px | 1024px | 900px | 768px | 480px | 375px |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| header | 99.79% | 99.72% | 99.7% | 100% | 100% | 100% | 100% | 100% |
| hero | 99.67% | 99.55% | 99.53% | 99.5% | 99.43% | 99.34% | 99.08% | 98.56% |
| ticker | 98.13% | 97.32% | 97.48% | 98.23% | 97.35% | 98.44% | 97.16% | 97.51% |
| about | 99.92% | 99.89% | 99.88% | 99.84% | 99.84% | 99.66% | 99.8% | 99.67% |
| pillars | 99.92% | 99.89% | 99.88% | 99.91% | 99.9% | 99.81% | 99.83% | 99.74% |
| experience | 99.91% | 99.89% | 99.88% | 99.85% | 99.68% | 99.36% | 99.61% | 99.52% |
| tours | 99.84% | 99.78% | 99.77% | 99.69% | 99.8% | 99.75% | 99.73% | 99.67% |
| upcoming | 99.82% | 99.76% | 99.75% | 99.67% | 99.85% | 99.82% | 99.73% | 99.67% |
| places | 99.93% | 99.9% | 99.9% | 99.86% | 99.85% | 99.77% | 99.55% | 99.35% |
| gallery | 99.84% | 99.78% | 99.77% | 99.66% | 99.57% | 99.93% | **93.22%** | **93.39%** |
| cta | 99.86% | 99.81% | 99.81% | 99.57% | 99.6% | 99.75% | 99.69% | 99.71% |
| footer | 99.56% | 99.42% | 99.38% | 99.04% | 99.36% | 99.28% | 99.12% | 98.59% |

**Trung bình: 99.39% · 94/96 ô ≥ 97%.**

### Section dưới 97%
- **gallery @480/375 (~93.3%)**: cố ý. Ở mobile, lưới ảnh gốc bị một **ô trống** cạnh ảnh thứ 6 (auto-placement của grid). Bản clone cho ảnh 6 trải 2 cột để lấp lỗ, không làm xê dịch ảnh nào khác. Theo rule "không vỡ giao diện", em ưu tiên bố cục sạch hơn con số. Nếu muốn giống tuyệt đối thì chỉ cần xoá 1 dòng `.lens__grid .lens__item:nth-child(6) { grid-column: span 2; }` trong `css/home.css`, khi đó section này sẽ lên khoảng 99.9%.
- **ticker (97.2–98.4%)**: đạt ngưỡng. Phần chênh còn lại là anti-alias của glyph "✦" (font hệ thống).

Chiều cao trang khớp gốc tới từng pixel ở 1920/1440/1366/1024/900. Ở ≤768 bản clone dài hơn 62px vì có `padding-bottom` dành cho thanh điều hướng đáy (đã loại khi so sánh). Bản gốc để thanh này che mất dòng copyright.

## 4. Soát "không vỡ giao diện"
Kiểm tra tự động bằng Playwright ở 1920, 1440, 1366, 1024, 900, 768, 480, 375 và 320:
- scrollWidth = clientWidth ở mọi độ rộng, tức không có scroll ngang và không phần tử nào tràn khỏi màn hình.
- 0 ảnh lỗi, 0 lỗi JS, 0 request lỗi.
- Đã soát bằng mắt ảnh clone từng section: không chồng đè, không cắt chữ, không mất khoảng cách.
- Component: menu mobile mở/đóng (nút ☰, nút ×, click overlay, phím Esc) · tab trải nghiệm desktop luôn giữ 1 tab mở · accordion mobile mở/đóng · lightbox (click, ←/→, Esc) · slideshow hero tự chuyển · back-to-top. Hover có ở nav, các nút, card tour, ảnh gallery (nền mờ + nút "+"), dòng bảng lịch khởi hành, icon mạng xã hội.

## 5. Ghi chú UX đã dự đoán/giả định
- Hero: fade 0.5s, mỗi slide 5s, Ken Burns scale 1 → 1.3 bằng CSS animation. Gốc dùng Swiper + Elementor; timing chỉ ước lượng.
- Ticker chạy 38s/vòng; nút "Plan your passage" nảy chu kỳ 4.8s; panel tab hiện dần 0.25s. Ba thông số này lấy đúng từ CSS gốc.
- Tabs/accordion dùng `<details name>` gốc của trình duyệt (exclusive), có JS fallback.
- Header dùng `position: sticky`. Gốc dùng script "sticky" của theme, hiệu ứng tương đương.
- Lightbox tự viết, đơn giản (ảnh + prev/next), thay cho lightbox của Elementor.
- Thanh điều hướng đáy (≤768px) ẩn khi cuộn xuống, hiện khi cuộn lên. Các mục Tours/Cart/Search trỏ `#`.
- Bỏ qua: giỏ hàng/đăng nhập WooCommerce (bị ẩn trên gốc), Instagram feed, SEO/meta.

## 6. Dọn `.work/` cũ (Pre-flight)
Không có thư mục `.work` nào ≥3 ngày trong `bloomingpassage/`, nên không dọn gì.

## 7. Ảnh so sánh
`original-<section>-<w>.png`, `clone-<section>-<w>.png`, `diff-<section>-<w>.png` cho w = 1920, 1440, 1366, 768, 375 (cùng thư mục này). Ảnh của các breakpoint phụ (1024/900/480) đã xoá cùng `.work/` (2026-10-07).


---

# Phần 2 — Các trang con (2026-10-07)

Yêu cầu: thêm các trang `about-us/`, `tours/` (Journeys), `contact-us/`, `faqs/`, `blog/`, `hoi-an-lanterns-craft-and-a-little-wonder/` (1 bài blog) vào dự án có sẵn. Mục tiêu: giống **>97%**.

## 2.1 File đã tạo / sửa

| Loại | File |
|---|---|
| HTML (mới) | `about-us/index.html`, `tours/index.html`, `contact-us/index.html`, `faqs/index.html`, `blog/index.html`, `hoi-an-lanterns-craft-and-a-little-wonder/index.html` |
| CSS (mới, riêng từng trang) | `css/about-us.css`, `css/tours.css`, `css/contact-us.css`, `css/faqs.css`, `css/blog.css`, `css/post.css` |
| JS (mới) | `js/post.js` (nút Share mở/đóng + copy link, mũi tên slider "Related Stories", chặn submit form bình luận tĩnh) |
| CSS/JS dùng chung (sửa) | `css/main.css`: `.svg-sprite`, `.ic` (icon SVG nội tuyến dùng ở Tours/FAQs) và rule bù vị trí nội dung cho trang con (`.is-inner`, xem 2.8) · `js/main.js`: đo chiều cao header cho rule đó |
| HTML trang chủ (sửa) | `index.html`: link menu/footer/nút CTA trỏ sang trang con local |
| Ảnh mới | 13 file: `n-place6.jpg`, `banner-04.webp`, `small-group.webp`, `beachfront.webp`, `experience-hoian.webp`, `img-7-768x576.webp`, `Sunlit-Tropical-Resort-Relaxation-768x512.png`, `img-1-3-768x576.png`, `destination-hoian.webp`, `destination-hue.webp`, `destination-hue-768x512.webp`, `destination-hue-600x400.webp`, `avatar-admin.jpg` (gravatar tải về local) |

- Header / footer / menu mobile / thanh điều hướng đáy / back-to-top: **đồng bộ 100% theo trang chủ** (xem 2.8). HTML lặp lại ở mỗi trang (site tĩnh), chỉ khác mục active; CSS + JS dùng chung 1 file (`css/main.css`, `js/main.js`).
- Banner tiêu đề từng trang (breadcrumb + H1 + mô tả) khác nhau về ảnh nền/padding/cỡ chữ → để trong CSS riêng của trang.
- Không còn tài nguyên nào tải từ `passage.zopa.vn`, không tracking, không fetch/XHR. Chuỗi `passage.zopa.vn` chỉ còn trong URL của các link chia sẻ Facebook/X/LinkedIn/Pinterest ở bài blog (link, không phải tài nguyên tải về).

## 2.2 URL bị bỏ qua
Không có. Cả 6 URL truy cập được.

## 2.3 Pixel-diff theo section × breakpoint (%) — trước khi đồng bộ header (header kiểu trang con của gốc)

Cùng phương pháp Phần 1 (`pixel-diff.mjs`, cùng viewport, cùng vùng crop theo section; tắt animation, ẩn back-to-top/thanh đáy mobile). 1024/900/480 là breakpoint lấy từ media query của CSS gốc.

| Trang | Section | 1920 | 1440 | 1366 | 1024 | 900 | 768 | 480 | 375 |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| about-us | header | 99.8 | 99.73 | 99.71 | 100 | 100 | 100 | 100 | 100 |
| about-us | banner | 99.74 | 99.66 | 99.64 | 99.56 | 99.48 | 99.4 | 98.99 | 98.56 |
| about-us | story | 99.86 | 99.81 | 99.8 | 99.69 | 99.66 | 99.62 | 99.71 | 99.68 |
| about-us | approach | 99.86 | 99.82 | 99.81 | 99.76 | 99.74 | 99.73 | 99.7 | 99.65 |
| about-us | care | 99.88 | 99.84 | 99.83 | 99.77 | 99.73 | 99.69 | 99.73 | 99.69 |
| about-us | place | 99.87 | 99.83 | 99.82 | 99.76 | 99.72 | 99.68 | 99.7 | 99.63 |
| about-us | talk | 99.94 | 99.92 | 99.91 | 99.9 | 99.89 | 99.87 | 99.87 | 99.84 |
| about-us | footer | 99.58 | 99.44 | 99.41 | 99.19 | 99.38 | 99.28 | 99.13 | 98.63 |
| tours | header | 99.76 | 99.68 | 99.66 | 100 | 100 | 100 | 100 | 100 |
| tours | banner | 99.56 | 99.41 | 99.38 | 99.14 | 99 | 98.84 | 98.15 | 97.55 |
| tours | journeys | 99.63 | 99.51 | 99.49 | 99.35 | 99.69 | 99.65 | 99.45 | 99.32 |
| tours | faq | 99.87 | 99.83 | 99.82 | 99.76 | 99.73 | 99.68 | 99.69 | 99.33 |
| tours | footer | 99.46 | 99.28 | 99.25 | 99.03 | 99.24 | 99.11 | 98.94 | 97.22 |
| contact-us | header | 99.73 | 99.64 | 99.62 | 100 | 100 | 100 | 100 | 100 |
| contact-us | banner | 99.6 | 99.47 | 99.44 | 99.4 | 99.27 | 99.15 | 98.48 | 97.85 |
| contact-us | form | 99.91 | 99.88 | 99.87 | 99.83 | 99.81 | 99.78 | 99.72 | 99.66 |
| contact-us | info | 99.9 | 99.86 | 99.86 | 99.81 | 99.78 | 99.75 | 99.75 | 99.69 |
| contact-us | footer | 99.58 | 99.44 | 99.39 | 99.19 | 99.38 | 99.28 | 99.12 | 98.63 |
| faqs | header | 99.79 | 99.72 | 99.71 | 100 | 100 | 100 | 100 | 100 |
| faqs | banner | 99.86 | 99.81 | 99.8 | 99.96 | 99.96 | 99.95 | 99.88 | 99.86 |
| faqs | faq | 99.85 | 99.81 | 99.79 | 99.73 | 99.7 | 99.66 | 99.68 | 99.62 |
| faqs | cta | 99.91 | 99.88 | 99.88 | 99.83 | 99.81 | 99.78 | 99.78 | 99.76 |
| faqs | footer | 99.57 | 99.43 | 99.4 | 99.19 | 99.38 | 99.28 | 99.12 | 98.59 |
| blog | header | 99.8 | 99.73 | 99.72 | 100 | 100 | 100 | 100 | 100 |
| blog | intro | 99.85 | 99.8 | 99.79 | 99.71 | 99.67 | 99.62 | 99.47 | 99.34 |
| blog | posts | 99.88 | 99.84 | 99.83 | 99.77 | 99.86 | 99.84 | 99.58 | 99.58 |
| blog | footer | 99.57 | 99.42 | 99.39 | 99.22 | 99.37 | 99.27 | 99.08 | 98.55 |
| blog detail | header | 99.8 | 99.73 | 99.72 | 100 | 100 | 100 | 100 | 100 |
| blog detail | title | 99.9 | 99.86 | 99.86 | 99.8 | 99.78 | 99.74 | 99.58 | 99.65 |
| blog detail | article | 99.6 | 99.46 | 99.43 | 99.24 | 99.14 | 99.06 | 98.83 | 98.85 |
| blog detail | comment | 99.57 | 99.43 | 99.4 | 99.2 | 99.09 | 98.94 | 98.71 | 98.64 |
| blog detail | related | 99.93 | 99.91 | 99.9 | 99.85 | 99.84 | 99.84 | 99.82 | 99.83 |
| blog detail | footer | 99.47 | 99.29 | 99.25 | 99 | 99.24 | 99.12 | 98.94 | 98.37 |

**Tổng: 264/264 ô ≥ 97% · thấp nhất 97.22% (footer Tours @375) · trung bình 99.58%.**

- Chiều cao trang khớp gốc từng pixel ở ≥900px. Ở ≤768 bản clone dài hơn 62px do `padding-bottom` chừa chỗ cho thanh điều hướng đáy (giống trang chủ, gốc để thanh này che mất dòng copyright).
- Bài blog: em đã tinh chỉnh sub-pixel (line-height 22px → 22.4px như gốc ở breadcrumb, meta, nút Share, form bình luận, thẻ "Travel"; lề ảnh đại diện 44.91px; header mobile cố định 76px). Lý do: ảnh chụp lệch dù chỉ 0.3–0.9px làm ảnh bị lấy mẫu lại khác, kéo % các khối ảnh xuống 94–96% ở 900/480/375. Sau khi sửa, mọi ô đều ≥98.37%.

## 2.4 Soát "không vỡ giao diện" (tự động bằng Playwright + xem ảnh clone)
- Ở cả 8 độ rộng: scrollWidth = clientWidth (không scroll ngang), 0 ảnh lỗi, 0 lỗi JS / console, 0 request ra ngoài localhost, 0 response lỗi.
- Đã kiểm tra mọi link nội bộ của 7 trang đều trả về 200. Phát hiện và sửa 1 lỗi: một số trang con copy menu/footer thiếu tiền tố `../`.
- Menu mobile mở/đóng được trên cả 7 trang. Accordion FAQ (Tours, FAQs) đóng/mở được, mỗi cột chỉ mở 1 mục. Trạng thái active trên menu đúng theo gốc (bài blog không active mục nào, giống gốc).

## 2.5 Ghi chú UX / giả định
- **Header trang con không sticky.** Đã kiểm tra trên gốc: chỉ trang chủ có header sticky, trang con cuộn theo trang.
- **Accordion:** dùng `<details name>` (CSS-first, không cần JS), icon mũi tên lên/xuống vẽ lại bằng SVG từ glyph của icon-font gốc.
- **Bản đồ Google ở Contact:** không nhúng iframe Google Maps vì rule "không phụ thuộc site ngoài" chỉ cho phép YouTube/Vimeo. Thay bằng khung cùng kích thước, cùng viền, có icon ghim + "Da Nang, Vietnam". Nếu muốn bản đồ thật, chỉ cần đặt lại iframe vào khung `.ct-map__frame`.
- **Form:** Contact, About (form "Your next chapter") và form bình luận của bài blog đều là form tĩnh, không gửi đi đâu.
- **Share / Related Stories (bài blog):** Share mở panel (mobile: panel giữa màn hình + nền tối), đóng bằng click ngoài hoặc Esc. Related dùng CSS scroll-snap + JS cho 2 mũi tên (3 thẻ/khung desktop, 2 ở ≤1024, 1 ở ≤767).
- **Hover:** theo CSS gốc (zoom nhẹ ảnh card, nhấc nút 2px, đổi màu link/nút).
- Chữ tiếng Việt trong bài blog ("Tháng 10 6, 2026", form bình luận) rơi về Helvetica vì font Onest không có subset tiếng Việt, giống bản gốc.

## 2.6 Ảnh so sánh
`original|clone|diff-<trang>-<section>-<w>.png` (trang: `about-us`, `tours`, `contact-us`, `faqs`, `blog`, `post` = bài blog) cho w = 1920, 1366, 768, 375 trong thư mục này. Ảnh 1440/1024/900/480 đã xoá cùng `.work/` (2026-10-07). Lưu ý: `*-tours-<w>.png` (không có tên section) là section "tours" của trang chủ ở Phần 1.

## 2.7 Dọn `.work/` cũ (Pre-flight)
Không có thư mục `.work` nào ≥3 ngày, nên không dọn gì.

## 2.8 Đồng bộ menu/footer theo trang chủ (2026-10-07, theo yêu cầu)

Site gốc dùng 2 kiểu header: trang chủ và bài blog có logo to và header dính khi cuộn; About/Journeys/Contact/FAQs/Blog có logo nhỏ, header không dính, riêng Journeys còn có biến thể inner 1200px, không đổ bóng. Theo yêu cầu, em đã đồng bộ toàn bộ theo **trang chủ**:

- Chép nguyên khối header (menu desktop + menu mobile), footer, back-to-top, thanh điều hướng đáy từ `index.html` sang 6 trang con. Chỉ đổi đường dẫn `../` và mục active: menu active theo trang, thanh đáy active "Tours" ở trang Journeys, bài blog không active mục nào. So sánh lại markup: giống trang chủ 100%, ngoài các dòng active.
- Xoá các biến thể `.site-header--sub`, `.site-header--wide`, `.site-header--static` khỏi CSS. Giờ mọi trang có cùng header: logo 206px, dính khi cuộn, cao 97.5px (desktop) / 87px (768–1024) / 77px (mobile).
- **Giữ vị trí nội dung như gốc:** ở ≤1024px, header trang chủ cao hơn header trang con của gốc (87px so với 77px). Để nội dung không bị đẩy xuống, `js/main.js` đo chiều cao header thật (ResizeObserver) và `css/main.css` kéo nội dung trang con lên đúng phần chênh (`.is-inner .site-header { margin-bottom: calc(1px - var(--header-h)) }`). Không có JS thì nội dung chỉ lùi xuống tối đa 10px, không vỡ.
- Footer vốn đã giống hệt nhau ở mọi trang (cả markup lẫn CSS), không phải sửa.

Pixel-diff sau khi đồng bộ (%):

| Trang | Section | 1920 | 1440 | 1366 | 1024 | 900 | 768 | 480 | 375 |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| about-us | header | 98.86 | 98.48 | 98.4 | 94.95 | 94.43 | 93.7 | 95.12 | 95.43 |
| about-us | banner | 99.57 | 99.43 | 99.4 | 96.72 | 96.5 | 96.28 | 98.06 | 97.74 |
| about-us | story | 99.86 | 99.81 | 99.8 | 99.69 | 99.66 | 99.62 | 99.71 | 99.68 |
| about-us | approach | 99.86 | 99.82 | 99.81 | 99.76 | 99.74 | 99.73 | 99.7 | 99.65 |
| about-us | care | 99.88 | 99.84 | 99.83 | 99.77 | 99.73 | 99.69 | 99.73 | 99.69 |
| about-us | place | 99.87 | 99.83 | 99.82 | 99.76 | 99.72 | 99.68 | 99.7 | 99.63 |
| about-us | talk | 99.94 | 99.92 | 99.91 | 99.9 | 99.89 | 99.87 | 99.87 | 99.84 |
| about-us | footer | 99.58 | 99.44 | 99.41 | 99.19 | 99.38 | 99.28 | 99.13 | 98.63 |
| tours | header | 95.95 | 94.6 | 94.3 | 96.9 | 96.48 | 95.87 | 95.12 | 95.43 |
| tours | banner | 98.95 | 98.6 | 98.52 | 96.77 | 96.5 | 96.21 | 97.36 | 96.84 |
| tours | journeys | 99.63 | 99.51 | 99.49 | 99.35 | 99.69 | 99.65 | 99.45 | 99.32 |
| tours | faq | 99.87 | 99.83 | 99.82 | 99.76 | 99.73 | 99.68 | 99.69 | 99.33 |
| tours | footer | 99.46 | 99.28 | 99.25 | 99.03 | 99.24 | 99.11 | 98.94 | 97.22 |
| contact-us | header | 98.8 | 98.39 | 98.31 | 94.95 | 94.43 | 93.7 | 95.12 | 95.43 |
| contact-us | banner | 99.36 | 99.15 | 99.09 | 95.74 | 95.47 | 95.18 | 97.26 | 96.71 |
| contact-us | form | 99.91 | 99.88 | 99.87 | 99.83 | 99.81 | 99.78 | 99.72 | 99.66 |
| contact-us | info | 99.9 | 99.86 | 99.86 | 99.81 | 99.78 | 99.75 | 99.75 | 99.69 |
| contact-us | footer | 99.58 | 99.44 | 99.39 | 99.19 | 99.38 | 99.28 | 99.12 | 98.63 |
| faqs | header | 98.86 | 98.48 | 98.4 | 94.95 | 94.43 | 93.7 | 95.12 | 95.43 |
| faqs | banner | 99.31 | 99.08 | 99.03 | 97.63 | 97.38 | 97.04 | 96.99 | 97.16 |
| faqs | faq | 99.85 | 99.81 | 99.79 | 99.73 | 99.7 | 99.66 | 99.68 | 99.62 |
| faqs | cta | 99.91 | 99.88 | 99.88 | 99.83 | 99.81 | 99.78 | 99.78 | 99.76 |
| faqs | footer | 99.57 | 99.43 | 99.4 | 99.19 | 99.38 | 99.28 | 99.12 | 98.59 |
| blog | header | 98.86 | 98.49 | 98.4 | 94.95 | 94.43 | 93.7 | 95.12 | 95.43 |
| blog | intro | 99.85 | 99.8 | 99.79 | 99.71 | 99.66 | 99.61 | 99.47 | 99.34 |
| blog | posts | 99.88 | 99.84 | 99.83 | 99.77 | 99.86 | 99.84 | 99.58 | 99.58 |
| blog | footer | 99.57 | 99.42 | 99.39 | 99.22 | 99.37 | 99.27 | 99.08 | 98.55 |
| blog detail | header | 99.8 | 99.73 | 99.72 | 100 | 100 | 100 | 100 | 100 |
| blog detail | title | 99.9 | 99.86 | 99.86 | 99.8 | 99.78 | 99.74 | 99.58 | 99.65 |
| blog detail | article | 99.6 | 99.46 | 99.43 | 99.24 | 99.14 | 99.06 | 98.83 | 98.85 |
| blog detail | comment | 99.57 | 99.43 | 99.4 | 99.2 | 99.09 | 98.94 | 98.71 | 98.64 |
| blog detail | related | 99.93 | 99.91 | 99.9 | 99.85 | 99.84 | 99.84 | 99.82 | 99.83 |
| blog detail | footer | 99.47 | 99.29 | 99.25 | 99 | 99.24 | 99.12 | 98.94 | 98.37 |

- **Các ô < 97% đều do header**, vì giờ header khác header trang con của gốc (logo 206/250px so với 132/150px; Journeys gốc còn có inner 1200px, không đổ bóng). Gồm ô "header" của 5 trang About/Journeys/Contact/FAQs/Blog (93.7–96.9%), và ô "banner" ở 768–1024 (và 375 với Journeys/Contact), vì vùng banner nằm ngay dưới header nên phần logo to hơn đè lên. Mọi section nội dung còn lại (trừ header/banner) đều ≥97.22%. Bài blog ≥98.37% ở mọi ô, vì gốc vốn dùng header cỡ trang chủ.
- Nếu muốn quay lại header trang con giống gốc (đạt lại 264/264 ô ≥97% như bảng 2.3) thì cần làm lại (bản sao lưu trong `.work/` đã được dọn ngày 2026-10-07).
- Đã kiểm tra lại cả 7 trang: không scroll ngang, 0 ảnh lỗi, 0 lỗi JS, 0 link nội bộ hỏng, menu mobile đóng/mở được, header dính khi cuộn ở mọi trang.

## 2.9 Đổi logo (2026-10-07, theo yêu cầu)
- Logo mới `images/logo-blooming.png` (1006×288, PNG nền trong suốt) lấy từ mẫu đầu tiên (ô trên-trái) trong `images/logos.png`. Tách nền kem bằng color-to-alpha (chỉ giữ phần mực tối hơn nền, nên khi đặt trên nền kem màu giống hệt ảnh gốc). Xếp lại thành **logo ngang**: biểu tượng bên trái, "BLOOMING PASSAGE — ASIA TRAVEL —" bên phải. Bỏ dòng tagline nhỏ vì không đọc được ở cỡ header.
- Kích thước hiển thị: header 196px (desktop) / 210px (≤1024, co dần trên mobile) · footer 250px / 230px (≤767), vẫn dùng filter trắng như trước.
- Logo cũ `logo-pass.png` đã gỡ khỏi dự án (bản sao lưu đã xoá cùng `.work/`). Vì đổi logo, ô "header" (và "banner" ngay dưới) không còn so được với site gốc nữa; các section nội dung khác không đổi.

## 2.10 Dọn `.work/` (2026-10-07)
Đã xoá `.work/` (khoảng 161MB: DOM/CSS dump, ảnh chụp thô, ảnh so sánh breakpoint phụ, bản sao lưu) theo xác nhận của người dùng.
