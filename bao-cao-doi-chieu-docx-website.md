# Báo cáo đối chiếu: tài liệu khách "WEBSITE - Blooming Passage .docx" và website hiện tại

- **Ngày kiểm tra:** 11/10/2026
- **Nguồn so sánh:** `source-images-client/WEBSITE - Blooming Passage .docx` (toàn bộ chữ + 39 ảnh nhúng) và mã nguồn `html/` (Home, About Us, Tours, 3 trang tour chi tiết, FAQs, Contact, Gallery, Blog, 1 bài blog).
- **Cách so ảnh:** so bằng perceptual hash, sau đó kiểm tra lại bằng mắt. Ảnh bị crop quá mạnh có thể bị bỏ sót, nên những chỗ ghi "chưa dùng" vẫn nên mở ra xem lại một lần.

---

## 0. Tóm tắt nhanh

| Mức độ | Vấn đề |
|---|---|
| 🔴 Sai thông tin | **Lịch khởi hành sai hoàn toàn.** Docx có 7 ngày khởi hành từ **15/02/2027 đến 10/05/2027**, cả 3 gói đều đi được ở mỗi ngày. Website lại ghi mùa "October – December 2026" và chỉ có 4 ngày ở năm 2026, mỗi ngày gắn với 1 gói. |
| 🔴 Thiếu cả trang | Trang **SIGNATURE JOURNEYS** trong docx có khoảng 11 khối nội dung, website gần như chưa có khối nào (xem mục 3). |
| 🔴 Thiếu chức năng | Nhóm **CONTACT** chưa có: Refund & Cancellations, Terms & Conditions, Pre-Trip Checklist, Comfort Preferences Form, Booking Page, nút Payment/Deposit. Form liên hệ và form đặt chỗ hiện **không gửi đi đâu** (`action="#"`, JS chặn submit). |
| 🔴 Thiếu nội dung | Trang Home thiếu đoạn mở đầu, thiếu phần **WHY CENTRAL VIETNAM?** và phần mô tả chi tiết 3 điểm đến. Phần 3 điểm đến trên web đang dùng chữ tự viết, không phải chữ của khách. |
| 🔴 Thiếu nội dung | Trang Our Story/About thiếu khối **"Our Philosophy: Inner Vitality Meets Outer Confidence"** (3 ý) và 2 đoạn kết. **Four Pillars** trên web đã bị viết lại, không đúng câu chữ của khách. |
| 🟠 Chưa chính xác | Trang **FAQs** chỉ có 8 câu tự viết. Docx có 11 câu, web thiếu 7 câu, và có câu trả lời đi ngược ý khách. |
| 🟠 Chưa chính xác | Lịch trình "Day 01…14" của tour là tự dựng từ danh sách gạch đầu dòng nên vô lý: ngày 07 đã là "Farewell dinner", vậy mà gói 10 và 14 ngày vẫn còn ngày 08 đến 14 phía sau. |
| 🟠 Chưa chính xác | Menu khác docx: thiếu FAQ, tên mục bị đổi, có thêm Gallery và Blog. |
| 🟡 Ảnh | Trong 39 ảnh khách gửi, chỉ khoảng **14 ảnh** đang có trên web. Còn khoảng 25 ảnh chưa dùng, trong đó có cả 3 ảnh hero, toàn bộ ảnh Health, phần lớn ảnh Self-Care, Why Central Vietnam, Da Nang và Hoi An. |
| 🟡 Cần khách xác nhận | Giá tour ($3,490 / $4,690 / $6,290), địa chỉ (đã đổi thành Las Vegas, NV), email, handle mạng xã hội, toàn bộ Blog/Gallery: docx không nhắc tới những thông tin này. |

---

## 1. Menu điều hướng

Docx: "WEBSITE Headline Menu - Navigation Bar" gồm các mục **HOME · OUR STORY · SIGNATURE JOURNEYS · FAQ (Frequently Asked Questions) · CONTACT**.

| Docx | Website hiện tại | Nhận xét |
|---|---|---|
| HOME | Home | ✅ |
| OUR STORY | About Us | ⚠️ Tên khác. Nên đổi thành "Our Story", vì nút ở Home cũng ghi "Read Our Story". |
| SIGNATURE JOURNEYS | Journeys (trang `/tours/`, tiêu đề trang là "Tours") | ⚠️ Tên khác. Trang hiển thị chữ "Tours" và "View All Tours", "Explore Tour", trong khi khách dùng "Journeys/Passage". |
| FAQ | (không có trên menu chính, chỉ có ở footer) | ❌ Thiếu trên menu |
| CONTACT | Contact + nút "Contact Us" | ✅ |
| — | Gallery, Blog | ➕ Docx không có. Cần hỏi khách có giữ không. |

---

## 2. Trang HOME

### 2.1 Hero "IT'S YOUR TIME TO BLOOM. 💐"
| Nội dung docx | Website | Trạng thái |
|---|---|---|
| IT'S YOUR TIME TO BLOOM. | Có | ✅ |
| Intentional travel. Proactive longevity. A journey back to yourself. | Có | ✅ |
| Đoạn "You've spent years caring for work, family, relationships…" | Không có | ❌ Thiếu |
| Đoạn "Now imagine giving yourself permission to pause - to wake up by the sea…" | Không có | ❌ Thiếu |
| Đoạn "Blooming Passage invites you to experience Vietnam differently - slowly, meaningfully, and with intention." | Không có. Web dùng câu tự viết "A Different Way to Experience Vietnam / Slow down. Explore deeply. Reconnect with yourself." | ❌ Thiếu, đang thay bằng chữ tự viết |
| Đoạn "Our intimate small-group experiences bring together culture, wellness, beauty, culinary discovery, connection, and personal time…" | Web chỉ có câu ngắn "Blooming Passage brings together culture, wellness, beauty and meaningful connection in Central Vietnam." | ⚠️ Rút gọn, sai câu chữ |
| "Discover the heart behind Blooming Passage? **Read Our Story.**" | Nút ghi "DISCOVER OUR STORY →" | ⚠️ Nên dùng đúng câu của khách |
| 3 ảnh hero: image15 (phụ nữ đọc sách trên ghế biển), image27 (phụ nữ đi dạo biển lúc bình minh), image7 (phụ nữ đứng ban công nhìn biển) | Web dùng video Hội An và ảnh poster riêng | ❌ Chưa dùng cả 3 ảnh khách gửi |

### 2.2 Sáu tab "Experience Vietnam Differently"
Chữ của 6 tab (Culinary Discovery, Beyond the Tourist Trail, Vietnam After Dark, Your Own Passage of Self-Care, Proactive Health & Longevity, Your Beachfront Sanctuary) **khớp đúng với docx** ✅. Chỉ khác là dấu "-" đã đổi thành "–", không vấn đề gì.

Phần ảnh của từng tab:

| Tab | Ảnh trong docx | Trạng thái trên web |
|---|---|---|
| Culinary Discovery | image20 (tô Cao lầu), image3 (mâm món Việt), image26 (bánh mì trước Chùa Cầu) | image3 ✅ (`food-2`), image26 ✅ (`food-3`), **image20 ❌**. Web đang dùng `friends-garden-lunch` thay vào. |
| Beyond the Tourist Trail | image22 (đan rổ), image35 (nhà làm đèn lồng), image6 (dệt lụa) | image22 ✅, image35 ✅, **image6 ❌**. Web đang dùng ảnh AI `Anh-ChatGPT-…png`. |
| Vietnam After Dark | image10 (nhóm đi Vespa tour), image2 (chợ đêm), image21 (phố ẩm thực đèn lồng) | image2 ✅ (`night-1`), **image10 ❌, image21 ❌** |
| Your Own Passage of Self-Care | image13 (massage), image38 (tiệm nail), image16 (chăm sóc da mặt) | **Cả 3 ❌** (web dùng `spa-relax`, `massage-spa`, `img-6`). Ảnh nail có thể là `images/11.png`, đã có trong thư mục nhưng chưa được dùng. |
| Proactive Health & Longevity | image29 (bác sĩ đo huyết áp), image33 (tư vấn bác sĩ), image4 (nha khoa) | **Cả 3 ❌**. image33 và image4 chính là `images/14.png` và `images/15.png`, đã có sẵn trong thư mục nhưng **không trang nào dùng**. |
| Your Beachfront Sanctuary | image34 (hồ bơi rooftop), image18 (phòng ngủ view biển), image36 (resort từ trên cao) | image36 ✅ (`beachfront.webp`, nhưng ở tab này web lại dùng `woman-pool-relax-tall`, `breakfast-by-the-sea`, `banner-03`), **image34 ❌, image18 ❌** |

### 2.3 WHY CENTRAL VIETNAM? ❌ Thiếu toàn bộ
Web chưa có khối này. Nội dung cần thêm:
- Tiêu đề "WHY CENTRAL VIETNAM?"
- 4 đoạn: "We chose Central Vietnam because…", "From beaches of Da Nang to lantern-lit streets of Hoi An…", "It's a place where you can begin your morning by the sea…", "Central Vietnam allows us to create journeys that feel rich and meaningful without feeling rushed."
- 3 ảnh: image30 (Ngũ Hành Sơn), image11 (chùa Thiên Mụ), image32 (Đại Nội Huế nhìn từ trên cao). Hiện chỉ image32 đang được dùng, ở phần Huế.

### 2.4 "Three Destinations. One Beautiful Passage."
Web ghi tiêu đề là "Three places. One beautiful passage.", sai chữ. Phần nội dung từng điểm đến cũng đã bị viết lại:

| Điểm đến | Docx | Website |
|---|---|---|
| **DA NANG** | "Where your journey begins." + "Ocean air. Long beaches. Vietnamese cuisine. Beautiful resorts. Sunset walks. Time to simply be." + "Your beachfront home base gives you space to settle in…" + "Slow mornings. Ocean breezes. Restorative evenings." | Web ghi "THE COAST / Ocean · Space · Renewal / Ease into your journey beside the sea…". ❌ Toàn bộ là chữ tự viết. |
| Ảnh Da Nang | image14 (hoàng hôn biển), image31 (cầu Rồng về đêm), image8 (bóng phụ nữ trên biển lúc hoàng hôn) | ❌ Chưa dùng ảnh nào. Web có ảnh cầu Rồng nhưng là ảnh khác. |
| **HOI AN** | "Where history comes alive." + "Lantern-lit evenings. Ancient streets. River boats. Tailored clothing…" + "Hoi An invites you to wander…" + **danh sách 11 trải nghiệm** (cyclo, đèn lồng sông Thu Bồn, thuyền thúng, may đo, nấu ăn, làm mì/bánh tráng, làng nghề, dệt lụa, chợ & boutique, đạp xe đồng quê, đặc sản) + "And rather than racing from attraction to attraction…" | Web ghi "LIVING HERITAGE / Heritage · Craft · Discovery / Follow lantern-lit streets…". ❌ Chữ tự viết, **thiếu danh sách 11 ý**. |
| Ảnh Hội An (6 ảnh) | image37 (thả đèn hoa đăng), image17 (shop đèn lồng), image28 (áo dài bên sông), image9 (xích lô), image39 (phụ nữ trên biển lúc hoàng hôn), image12 (thuyền đèn lồng) | image9 ✅ (`img-1-2`), image28 có trong `experience-hoian.webp` nhưng **chỉ dùng ở trang tour 7 ngày**, image37 có thể là `night-3`. **image17, image39, image12 ❌** |
| **HUE** | "Where history meets tranquility." + "Discover Vietnam's former imperial capital through: The Imperial City * Thien Mu Pagoda * Perfume River * Traditional garden houses * Royal dining experience" + "Hue isn't simply another sightseeing stop…" | Web ghi "A QUIETER RHYTHM / History · Grace · Tranquility / Discover imperial architecture…". ❌ Chữ tự viết, **thiếu "Traditional garden houses" và "Royal dining experience"**. |
| Ảnh Huế | image5 (nhóm áo dài ở Đại Nội), image1 (2 phụ nữ ở hồ bơi vô cực), image25 (phụ nữ váy trắng ở Đại Nội) | image5 ✅ (`img-1-1`), image25 ✅ (`destination-hue`), **image1 ❌** |

### 2.5 Các khối trên Home mà docx không có
Những khối dưới đây do đội thiết kế tự thêm. Không sai, nhưng nên báo khách để khách duyệt:
- Hàng 6 biểu tượng (Food, Culture, Adventure, Wellness, Beauty, Personal Care).
- "Signature Journeys" có câu "Thoughtfully designed for rest, discovery and a brighter you, with a personal concierge…". Dòng **"Central Vietnam travel season October – December 2026" là SAI**, vì docx ghi lịch khởi hành từ tháng 2 đến tháng 5 năm 2027.
- "Care for your whole self" (7 vòng tròn dịch vụ). Phần này trùng ý với khối "Wellness & Longevity" trong docx, nên đổi sang dùng đúng chữ của khách.
- "Moments worth keeping" (gallery).
- CTA cuối trang "Come curious. Come open. Come as you are." Câu này lấy từ phần Our Story, dùng làm CTA là hợp lý.

---

## 3. Trang SIGNATURE JOURNEYS (website: `/tours/`)

Đây là trang thiếu nhiều nhất. Trang `/tours/` hiện chỉ có tiêu đề "Tours", 3 thẻ tour và 6 câu FAQ tự viết.

| # | Khối nội dung trong docx | Trạng thái |
|---|---|---|
| 1 | **SIGNATURE JOURNEYS** – "Travel with intention. Come home feeling renewed." + 4 đoạn ("Blooming Passage is for women who want more than a vacation…", "Imagine waking up by the sea…", "Our journeys are intentionally small… approximately 5–10 women per group…", "There is time to wander. Time to savor. Time to rest. Time to connect. And time to simply be.") | ❌ Thiếu. Web dùng câu tự viết "Thoughtfully paced journeys…" / "Three journeys. Your own pace." |
| 2 | **MORE THAN A VACATION** – "Travel + Culture + Culinary Discovery + Wellness + Beauty + Proactive Health + Connection" | ❌ Thiếu |
| 3 | **FOUR SIGNATURE EXPERIENCES** – HERITAGE / ARTISAN & ORCHARD / CULINARY PASSPORT ("Come Hungry. Leave Inspired." + "Learn. Taste. Share. Enjoy.") / SANCTUARY & BEAUTY ("Rest. Renew. Restore.") | ❌ Thiếu toàn bộ |
| 4 | **WELLNESS & LONGEVITY** – "Make Your Journey Your Own" + 2 đoạn + **"Optional Experiences May Include"** (6 ý: health check-ups, dental, dermatology, non-invasive beauty, hair & nail, spa) + "These experiences are here to complement your journey - not define it…" + câu miễn trừ trách nhiệm y tế | ⚠️ Chỉ có **1 đoạn rút gọn và câu miễn trừ** ở 3 trang tour chi tiết. **Thiếu danh sách 6 dịch vụ tùy chọn**, thiếu đoạn "Whether you'd like to add a health check-up…" và đoạn "These experiences are here to complement…". |
| 5 | **SMALL GROUP DIFFERENCE** – "We keep our groups intentionally small - typically 5-10 women." + 2 đoạn + "No giant tour buses. / No racing… / No feeling like just another face in the crowd." + "Thoughtful pacing. Personal attention. Genuine connection. Shared experiences." + "You Explore and Enjoy the Journey. We Take Care of the Details." + 3 ảnh (image24 selfie quán cà phê, image23 nhóm nắm tay ngắm hoàng hôn, image19 nhóm trước Chùa Cầu) | ❌ Thiếu khối này. Trang About có khối tự viết "Small by design…", ý gần giống nhưng không phải chữ của khách. Ảnh: image24 ✅ (`img-1`, dùng ở Home), **image23 ❌**, image19 có trong thư mục (`img-1-3.png`) nhưng **không trang nào dùng**. |
| 6 | **WHAT'S INCLUDED** (chung cho mọi hành trình) – đoạn mở đầu + **12 ý** (private airport transfers, welcome & orientation, private transportation, English guide & host, boutique accommodations, daily breakfast, curated cultural experiences, Hoi An and Hue experiences, culinary & artisan, planned meals, local cultural guidance, **assistance navigating appointments**) + "And, of course, the little things matter…" | ❌ Thiếu. Trang tour chi tiết chỉ có "What's Included" riêng của từng gói. |
| 7 | **HOW IT WORKS** – 4 bước (Select Your Passage → Find Your Dates → We Take Care of the Details → Make It Your Own) + "Arrive. Exhale. Bloom." + "You choose the journey. We take care of the rest." | ❌ Thiếu toàn bộ |
| 8 | **WHAT YOU CAN EXPECT** – đoạn mở đầu + nhắc lại 4 signature experiences | ❌ Thiếu |
| 9 | **CHOOSE YOUR EXPERIENCE** – 3 gói | ⚠️ Có mô tả ngắn, nhưng thiếu dòng địa điểm của mỗi gói ("Da Nang * Hoi An * Wellness * Culinary Experiences", "Da Nang • Hoi An • Hue • Culture • Culinary • Wellness", "Da Nang • Hoi An • Hue • Culture • Wellness • Beauty • Proactive Health") và **thiếu 3 câu chốt**: "Come for the reset. Leave with something more." / "More days. More discovery. More time to bloom." / "Come away restored, renewed, and refreshed in body, mind, and spirit." Gói 10 ngày còn thiếu đoạn "With a little more time, there's room to wander…". |
| 10 | **UPCOMING TRIPS & ITINERARIES** – "Choose your dates and reserve your place." + bảng 7 ngày khởi hành | ❌ **Thiếu, và dữ liệu trên web sai** (xem mục 3.1) |
| 11 | **DAY-BY-DAY EXPERIENCES** – "From cultural discoveries and culinary moments…" + 3 gói (🌼 7-Day, 🌺 10-Day, 🌸 14-Day) kèm mô tả và danh sách | ⚠️ Có ở trang chi tiết, nhưng trình bày sai (xem mục 3.2) |

### 3.1 Lịch khởi hành 🔴
**Docx** ghi 7 ngày khởi hành, và **cả 3 gói đều đi được ở mỗi ngày**:

| Ngày khởi hành | Gói |
|---|---|
| February 15, 2027 | 7-Day · 10-Day · 14-Day |
| March 1, 2027 | 7-Day · 10-Day · 14-Day |
| March 15, 2027 | 7-Day · 10-Day · 14-Day |
| March 29, 2027 | 7-Day · 10-Day · 14-Day |
| April 12, 2027 | 7-Day · 10-Day · 14-Day |
| April 26, 2027 | 7-Day · 10-Day · 14-Day |
| May 10, 2027 | 7-Day · 10-Day · 14-Day |

**Website hiện tại:**
- 7-Day: Oct 26 – Nov 01, 2026 và Dec 07 – Dec 13, 2026
- 10-Day: Nov 09 – Nov 18, 2026 ("3 spots left")
- 14-Day: Nov 23 – Dec 06, 2026
- Home và Tours ghi "Central Vietnam travel season October – December 2026".

Cần sửa cả 3 trang tour, trang Home, trang Tours, và câu FAQ "Browse the upcoming departures on our homepage" (vì trang Home hiện **không có** danh sách khởi hành). Cũng nên bỏ "3 spots left", vì đây là số liệu tự đặt.

### 3.2 Lịch trình "Day-by-day" trên trang tour chi tiết ⚠️
Docx **không có lịch theo từng ngày**. Mỗi gói trong docx chỉ là một danh sách điểm nổi bật. Website đã tự chia danh sách đó thành "01. … 14.", dẫn đến các lỗi sau:
- Gói **10 ngày** và **14 ngày** đều có "07. Beauty shopping, fittings & **farewell**", rồi sau đó vẫn còn các ngày 08, 09, 10 (và 11 đến 14 ở gói 14 ngày). Tiệc chia tay nằm giữa hành trình là vô lý.
- Gói 7 ngày có 7 mục, nhưng mục 01 lại là "6 nights at a beachfront resort…", tức đang lẫn giữa phần tóm tắt và ngày 1.
- 3 gói đều có tour Huế ở "ngày 05", trong khi docx không nói ngày nào.

**Đề xuất:** đổi tên khối thành "Journey Highlights" / "What's woven into your journey" và giữ dạng danh sách giống docx, **hoặc** xin khách lịch trình thật theo từng ngày.

Các câu mô tả từng gói (đúng theo docx) đã có trên web ✅:
- 7-Day: "A meaningful introduction to the Blooming Passage experience…" ✅
- 10-Day: "A richer balance of discovery and restoration…" ✅
- 14-Day: "A rare opportunity to truly step away from the everyday…" ✅

Danh sách "What's Included" của 3 gói khớp với docx ✅. Docx viết "Includes all 7-day Package experiences" và "Everything in the 10-day Package experiences", còn web đã gộp hết thành danh sách đầy đủ. Cách này chấp nhận được.

### 3.3 Điểm mâu thuẫn trong chính docx (cần hỏi khách)
1. Gói **7 ngày** có dòng địa điểm "Da Nang * Hoi An * Wellness * Culinary", **không có Huế**, nhưng trong danh sách lại có "Full-Day HUE imperial tour**\***". Dấu \* nghĩa là gì (tùy chọn, phụ thu, hay tùy theo đợt)? Web đang để nguyên dấu \* mà **không có chú thích**.
2. Docx ghi gói 10 ngày là "Beachfront **Ressort**". Đây là lỗi chính tả, web đã viết đúng "resort" ✅.
3. Ở mục CONTACT, các dấu \*, \*\*, \*\*\* (Inquiry form\*, Booking Page\*\*, Payment/deposit button\*\*\*) không được giải thích. Cần hỏi khách các ký hiệu này nghĩa là gì: trang cần làm sau, cần tích hợp bên thứ ba, hay việc khác.

### 3.4 Thông tin trên web không có trong docx (cần khách xác nhận)
- Giá: **From $3,490 / $4,690 / $6,290**, cùng ô tính "Guests × price". Docx không có giá.
- "Tour Type: Culture & Wellness", "Guide Language: English", "Transport: Private transportation". Các thông tin này hợp lý, nhưng vẫn nên báo khách.

---

## 4. Trang OUR STORY (website: About Us)

| Nội dung docx | Website | Trạng thái |
|---|---|---|
| "OUR STORY" (tiêu đề) | Trang tên "About Us" | ⚠️ Đổi tên |
| "Reclaiming Your Vitality." và toàn bộ câu chuyện của Amy (11 đoạn) | Có, đúng từng câu | ✅ |
| **Our Philosophy: Inner Vitality Meets Outer Confidence**, gồm câu "We believe that growing old gracefully isn't about avoiding age…" và 3 ý: **Uncompromised Medical Insight** / **Holistic Self-Care** / **A Supportive Sisterhood & Safety Focus** | Không có | ❌ Thiếu toàn bộ |
| "There's no perfect way to arrive at this season of life…" + "Just come ready to explore, to slow down…" + "Come curious. Come open. Come as you are." (đoạn kết thứ 2) | Không có | ❌ Thiếu |
| **THE FOUR PILLARS**: "These four guiding principles are woven into every Blooming Passage journey." | Không có câu dẫn | ❌ Thiếu |
| INTENTION – "Make space for yourself." + "Give yourself permission to step away from the demands of everyday life and pay attention to what you need." | "Make space for yourself. Travel with a little more purpose, and a little less hurry." | ⚠️ Câu thứ 2 bị viết lại |
| LONGEVITY – "Become more informed about your health." + "Explore proactive wellness and personal health awareness through thoughtfully selected experiences and optional health services." | "Take time to understand your wellbeing, with wellness experiences chosen around your own interests." | ⚠️ Viết lại toàn bộ, **thiếu câu tiêu đề "Become more informed about your health."** |
| DISCOVERY – "Go beyond sightseeing." + "Experience the people, food, craftsmanship, landscapes, and traditions that make Central Vietnam so special." | "Go beyond sightseeing through local flavors, living heritage and the people…" | ⚠️ Viết lại |
| CONNECTION – "Travel alongside women who understand this season of life." + "Small groups. Shared experiences. Meaningful conversations. New friendships. Connection that continues long after the journey ends." | "Share the journey with a small group of women, while keeping time and space to yourself." | ⚠️ Viết lại toàn bộ |
| — | Các khối tự viết: "A passage through Vietnam. A return to yourself.", "Small by design. Meaningful by nature.", "Room for your own rhythm.", "Care for yourself. In your own way.", "A little more room to rest.", "Personal. Optional. Entirely your choice.", "Rooted in place. Open to discovery.", "Your next chapter starts with a conversation." | ➕ Docx không có. Nên thay bằng nội dung thật: Philosophy, Small Group Difference… |

> Ghi chú: trong tin nhắn gửi khách (`gui-khach.txt`) có viết "Đoạn lời nhắn hiện em viết tạm". Thực tế khách **đã gửi bản chính thức** trong docx và web đã dùng đúng bản đó. Chỉ còn thiếu phần Philosophy và Four Pillars như liệt kê ở trên.

---

## 5. Trang FAQ

Docx có **11 câu hỏi**. Trang `/faqs/` có 8 câu, đều do đội tự viết. 3 trang tour chi tiết có 5 câu đầu của docx (đúng nguyên văn) ✅.

| # | Câu hỏi trong docx | Trang /faqs/ | Trang tour chi tiết |
|---|---|---|---|
| 1 | Who is Blooming Passage for? (women in their 40s, 50s, and beyond…) | ❌ | ✅ |
| 2 | How many women are in each group? | ⚠️ Có câu tương tự "How large are the groups?", nhưng câu trả lời bị viết lại | ✅ |
| 3 | Do I need to travel with someone? → "**Not at all.** You can come on your own…" | ⚠️ Web hỏi "Can I join if I am travelling on my own?" và trả lời "get in touch… room options…". Câu trả lời này **mơ hồ, ngược ý khách** (khách khẳng định là đi một mình hoàn toàn được). | ✅ |
| 4 | Where will we stay? | ⚠️ Câu "Where do the journeys take place?" khác ý, **thiếu thông tin beachfront hotel/resort ở Da Nang** | ✅ |
| 5 | What is included in my journey? | ⚠️ Có, nhưng câu trả lời bị viết lại, thiếu "accommodation, breakfast, airport transfer…" | ✅ |
| 6 | What wellness, self-care, and health experiences are available? | ⚠️ Câu "Are wellness experiences optional?" khác ý | ❌ |
| 7 | **Is Blooming Passage a medical tourism trip?** → "No…" | ❌ Thiếu. Câu này quan trọng về mặt pháp lý và định vị thương hiệu. | ❌ |
| 8 | What is the pace of the trip? | ❌ | ❌ |
| 9 | How do I get from the airport to the hotel? | ❌ | ❌ |
| 10 | How do I reserve my spot? → "…complete the booking form, and submit the required deposit…" | ⚠️ Câu "How do I choose a departure?" nói "Browse the upcoming departures on our homepage", **sai** vì Home không có danh sách khởi hành | ❌ |
| 11 | What if I have another question? | ⚠️ Câu "Can I ask a question before booking?" có ý gần giống | ❌ |

Đề xuất: thay toàn bộ FAQ trên `/faqs/` và `/tours/` bằng đúng 11 câu của docx. Trên menu dùng tên "FAQ".

---

## 6. CONTACT

Docx yêu cầu các mục sau:

| Mục | Trạng thái | Ghi chú |
|---|---|---|
| Inquiry form\* | ⚠️ Có form (Name, Email, How can we help) ở Contact và About, có tab "Inquiry" ở trang tour, **nhưng không gửi đi đâu**: `action="#"` và JS gọi `preventDefault()`. Cần nối vào email/CRM, hoặc dùng Formspree, Google Apps Script… Nên thêm các trường: hành trình quan tâm, ngày khởi hành, số người, điện thoại. |
| Refund and Cancellations\* | ❌ Chưa có trang |
| Terms and Conditions\* | ❌ Chưa có trang. Nên đặt luôn câu miễn trừ y tế ("Medical, dental, and aesthetic consultations are rendered by independent, licensed professionals.") vào đây. |
| Pre-Trip Checklist\* | ❌ Chưa có |
| Comfort Preferences Form\* | ❌ Chưa có. Đây là form khách điền sở thích (phòng, ăn uống, dị ứng, sức khỏe…). |
| Booking Page\*\* | ⚠️ Mới có ô "Reserve your place" trên trang tour (chọn ngày, số khách), **nút không làm gì cả** (submit bị chặn) |
| Payment/deposit button\*\*\* | ❌ Chưa có. Cần tích hợp Stripe, PayPal hoặc cổng thanh toán khác để thu tiền cọc. |
| Social links | ⚠️ Footer có Instagram và TikTok với handle `@bloomingpassage.com`. Docx không cho link cụ thể, **cần khách xác nhận handle thật** (handle có đuôi ".com" là bất thường). Thiếu Facebook nếu khách có. |

Thông tin trên web mà docx không có, cần khách xác nhận: địa chỉ **Las Vegas, NV** (đã ẩn địa chỉ thật) và email **travel@bloomingpassage.com**.

---

## 7. Gallery và Blog (docx không có)

- **Gallery:** đang lặp lại khối "Moments worth keeping" và 6 tab "Experience Vietnam Differently" của Home. Gần như trùng nội dung với Home.
- **Blog:**
  - 3 bài, nhưng **chỉ bài Hội An có trang thật**. Bài Huế và bài Đà Nẵng link tới `#`, bấm vào không đi đâu.
  - Ngày đăng hiển thị **"6 Th10, 2026"**. Đây là định dạng tiếng Việt trên site tiếng Anh, cần đổi thành "Oct 6, 2026".
  - Nội dung blog do đội tự viết, cần khách duyệt.

---

## 8. Ảnh khách gửi trong docx (39 ảnh)

| Khối | Ảnh | Trạng thái |
|---|---|---|
| Hero / Intro | image15, image27, image7 | ❌ ❌ ❌ |
| Culinary Discovery | image20 / image3 / image26 | ❌ / ✅ / ✅ |
| Beyond the Tourist Trail | image22 / image35 / image6 | ✅ / ✅ / ❌ |
| Vietnam After Dark | image10 / image2 / image21 | ❌ / ✅ / ❌ |
| Self-Care | image13 / image38 / image16 | ❌ / ❌ (có thể là `11.png`, chưa dùng) / ❌ |
| Proactive Health | image29 / image33 / image4 | ❌ / ❌ (`14.png`, chưa dùng) / ❌ (`15.png`, chưa dùng) |
| Beachfront Sanctuary | image34 / image18 / image36 | ❌ / ❌ / ✅ |
| Why Central Vietnam | image30 / image11 / image32 | ❌ / ❌ / ✅ (dùng ở phần Huế) |
| Da Nang | image14 / image31 / image8 | ❌ / ❌ / ❌ |
| Hoi An | image37 / image17 / image28 / image9 / image39 / image12 | ✅? (`night-3`) / ❌ / ⚠️ (chỉ ở tour 7 ngày) / ✅ / ❌ / ❌ |
| Hue | image5 / image1 / image25 | ✅ / ❌ / ✅ |
| Small Group Difference | image24 / image23 / image19 | ✅ / ❌ / ⚠️ (`img-1-3.png`, chưa dùng) |

**Tổng:** khoảng 14/39 ảnh đã dùng, khoảng 25 ảnh chưa dùng. Ảnh gốc có thể lấy từ file docx (`word/media/imageN.png`). Ảnh xuất ra từ docx là PNG, cần chuyển sang WebP trước khi đưa lên web.

---

## 9. Danh sách việc cần làm (theo thứ tự ưu tiên)

1. **Sửa lịch khởi hành** theo docx (7 ngày từ 15/02/2027 đến 10/05/2027, cả 3 gói). Bỏ "October – December 2026" và "3 spots left".
2. **Dựng lại trang Signature Journeys**: thêm intro, More Than a Vacation, Four Signature Experiences, Wellness & Longevity (đủ danh sách 6 dịch vụ), Small Group Difference, What's Included (12 ý), How It Works (4 bước), What You Can Expect, Choose Your Experience (đủ dòng địa điểm và câu chốt), bảng Upcoming Trips.
3. **Home:** thêm 3 đoạn intro của khách và câu "Read Our Story", thêm khối **Why Central Vietnam?**, thay chữ 3 điểm đến bằng chữ của khách (kèm danh sách 11 ý Hội An, danh sách Huế), đổi tiêu đề thành "Three Destinations. One Beautiful Passage."
4. **Our Story:** thêm khối Philosophy (3 ý) và đoạn kết, sửa Four Pillars đúng nguyên văn kèm câu dẫn.
5. **FAQ:** thay bằng 11 câu của docx, thêm "FAQ" vào menu.
6. **Menu:** đổi thành Home · Our Story · Signature Journeys · FAQ · Contact. Hỏi khách có giữ Gallery và Blog không.
7. **Lịch trình tour:** bỏ cách chia "Day 01–14" tự dựng, chuyển sang dạng Highlights, hoặc xin khách lịch theo ngày.
8. **Contact và đặt chỗ:** làm form gửi được thật, thêm các trang Refund & Cancellations, Terms & Conditions, Pre-Trip Checklist, Comfort Preferences Form, Booking Page, nút Payment/Deposit.
9. **Ảnh:** thay vào khoảng 25 ảnh khách gửi còn thiếu, đúng khối như docx (ưu tiên Hero, Health, Self-Care, Da Nang, Why Central Vietnam).
10. **Lỗi nhỏ:** ngày blog "6 Th10" → "Oct 6"; 2 bài blog đang link `#`; giải thích dấu \* ở "Full-Day HUE imperial tour\*".

## 10. Câu hỏi cần gửi khách
1. Gói 7 ngày có Huế hay không? Dấu \* sau "Full-Day HUE imperial tour" nghĩa là gì?
2. Các dấu \*, \*\*, \*\*\* ở mục CONTACT nghĩa là gì?
3. Giá từng gói ($3,490 / $4,690 / $6,290) đúng chưa? Tiền cọc bao nhiêu, thanh toán qua cổng nào?
4. Khách có sẵn nội dung Refund & Cancellations, Terms & Conditions, Pre-Trip Checklist và các câu hỏi cho Comfort Preferences Form chưa?
5. Handle Instagram, TikTok, Facebook thật là gì? Địa chỉ hiển thị Las Vegas, NV và email travel@bloomingpassage.com có đúng không?
6. Có giữ trang Gallery và Blog (docx không có) không?
7. Có lịch trình chi tiết theo từng ngày không, hay chỉ hiển thị dạng danh sách điểm nổi bật?
