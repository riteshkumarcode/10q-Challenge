# 28 - UI Design System & Component Guidelines

## 1. Brand Identity & Visual Aesthetic
The new design transforms 10Q Challenge into a **Premium EdTech SaaS Platform**. It avoids generic templates, cartoonish visuals, and cluttered coaching aesthetics in favor of a clean, high-conversion, student-centric design with modern typography and subtle micro-animations.

---

## 2. Color Palette & Design Tokens

```text
Deep Purple (Primary Brand):    #3F328A   /* Main brand accents, primary buttons, hero highlights */
Dark Purple (Dark Base/Hero):   #2D246B   /* Deep headers, dark mode surfaces, rich accents */
Coral / Pink (Action / Hot):    #FF3F68   /* Badges, discount tags, urgent CTAs, live indicators */
Yellow (Accent / Warm):         #FFD800   /* Rating stars, highlights, attention grabbers */
Green (Success / Growth):       #20D66B   /* Enrolled status, correct answers, success toasts */
Light Lavender (Surface BG):    #F6F4FF   /* Clean section backgrounds, soft card surfaces */
Dark Text (Primary Typography): #17152A   /* High readability body and title copy */
Muted Text (Secondary Copy):    #6E6990   /* Captions, dates, meta info, descriptions */
Border & Divider:               #E7E3F5   /* Clean structural borders and cards */
White (Clean Surface):          #FFFFFF   /* Card backgrounds, dropdowns, modal windows */
```

---

## 3. Typography & Layout System
- **Heading Font**: `Outfit` or `Plus Jakarta Sans` (Google Fonts) - Modern, confident, and premium.
- **Body Font**: `Inter` (Google Fonts) - High legibility for long-form blog articles, questions, and lecture descriptions.
- **Responsive Breakpoints**:
  - `Mobile Small`: `360px` - `390px`
  - `Mobile Large`: `430px`
  - `Tablet`: `768px`
  - `Laptop`: `1024px` - `1280px`
  - `Desktop / Wide`: `1440px` - `1920px`

---

## 4. Reusable Component Library
- **Buttons**: Primary (Deep Purple with subtle hover lift), Secondary (Lavender outlined), Danger (Coral), Success (Green).
- **Cards**: CourseCard (with hover image scale, badge, pricing, and enroll CTA), BlogCard (with category tag, reading time, author), TestimonialCard (with student college, photo, score).
- **Interactive Elements**: Drawer navigation, Sticky Checkout Bar, Contextual Doubt Modal, Math Formula Viewer (KaTeX).
