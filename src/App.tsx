import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight, Menu, X, Clock, Phone, MapPin, Star, Quote,
  Flame, Leaf, Award, Heart, ChevronDown,
} from 'lucide-react';
import Logo from '@/components/Logo';
import ReservationForm from '@/components/ReservationForm';

const heroImg = 'https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop';
const storyImg = 'https://images.pexels.com/photos/14037104/pexels-photo-14037104.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop';
const interiorImg = 'https://images.pexels.com/photos/4997854/pexels-photo-4997854.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop';
const himalayaImg = 'https://images.pexels.com/photos/35408915/pexels-photo-35408915.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop';
const chefImg = 'https://images.pexels.com/photos/4253298/pexels-photo-4253298.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop';
const spiceImg = 'https://images.pexels.com/photos/7208238/pexels-photo-7208238.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop';
const momoSteamed = 'https://images.pexels.com/photos/32083372/pexels-photo-32083372.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop';
const curryDark = 'https://images.pexels.com/photos/28674557/pexels-photo-28674557.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop';
const thaliImg = 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop';
const momoChilli = 'https://images.pexels.com/photos/18803177/pexels-photo-18803177.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop';
const dalBhat = 'https://images.pexels.com/photos/35008222/pexels-photo-35008222.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop';
const butterTea = 'https://images.pexels.com/photos/35079286/pexels-photo-35079286.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop';
const tandoori = 'https://images.pexels.com/photos/37223237/pexels-photo-37223237.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop';
const curryBowl = 'https://images.pexels.com/photos/28674690/pexels-photo-28674690.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&fit=crop';

type Dish = {
  name: string; nepali: string; desc: string; price: string;
  tags: string[]; image: string; popular?: boolean; veg?: boolean; spicy?: boolean;
};

const menu: Record<string, Dish[]> = {
  Starters: [
    { name: 'Steamed Veg Momos', nepali: 'भाप मम', desc: 'Hand-folded dumplings filled with spiced cabbage, carrot & paneer, served with tomato achar.', price: 'Rs 280', tags: ['Steamed'], image: momoSteamed, popular: true, veg: true },
    { name: 'Chicken Chilli Momo', nepali: 'चिकन चिली मम', desc: 'Pan-tossed momos with bell peppers, onions & a fiery chilli-garlic sauce.', price: 'Rs 380', tags: ['Pan-fried'], image: momoChilli, spicy: true },
    { name: 'Choila', nepali: 'चौला', desc: 'Newari grilled buffalo, marinated with mustard oil, garlic & roasted spices.', price: 'Rs 420', tags: ['Newari'], image: curryBowl },
    { name: 'Aloo Tama Bodi', nepali: 'आलु तामा बोडी', desc: 'Potato, bamboo shoots & black-eyed peas in a tangy Newari broth.', price: 'Rs 320', tags: ['Newari'], image: dalBhat, veg: true },
  ],
  Mains: [
    { name: 'Dal Bhat Tarkari', nepali: 'दाल भात तरकारी', desc: 'The heart of Nepal — lentil soup, steamed rice, seasonal curry, saag & achar. Unlimited refills.', price: 'Rs 350', tags: ['Signature'], image: thaliImg, popular: true, veg: true },
    { name: 'Chicken Choila Thali', nepali: 'चिकन चौला थाली', desc: 'Newari chicken choila, beaten rice (chiura), aloo, soybeans & traditional achar.', price: 'Rs 480', tags: ['Newari'], image: curryBowl },
    { name: 'Gundruk Dhindo', nepali: 'गुन्द्रुक ढिँडो', desc: 'Fermented leaf greens with millet porridge — a rustic Himalayan staple, served with ghee.', price: 'Rs 360', tags: ['Traditional'], image: dalBhat, veg: true },
    { name: 'Dal Makhani', nepali: 'दाल मखानी', desc: 'Creamy black lentils slow-cooked overnight with butter & cream — rich, velvety & deeply flavored.', price: 'Rs 340', tags: ['Creamy'], image: curryDark, veg: true },
  ],
  Breads: [
    { name: 'Chatamari', nepali: 'चतामारी', desc: 'Newari rice-flour crepe topped with minced meat, egg & herbs — the "Nepali pizza".', price: 'Rs 240', tags: ['Newari'], image: momoChilli, popular: true },
    { name: 'Tandoori Roti', nepali: 'तन्दुरी रोटी', desc: 'Whole-wheat flatbread baked in the clay tandoor, served warm with butter.', price: 'Rs 60', tags: ['Tandoor'], image: tandoori, veg: true },
    { name: 'Sel Roti', nepali: 'सेल रोटी', desc: 'Sweet ring-shaped rice bread, deep-fried golden — a Dashain & Tihar festival favorite.', price: 'Rs 120', tags: ['Sweet', 'Festive'], image: dalBhat, veg: true },
    { name: 'Yomari', nepali: 'योमरी', desc: 'Steamed rice dough filled with sweet molasses & sesame — a Newari delicacy.', price: 'Rs 180', tags: ['Sweet', 'Newari'], image: thaliImg, veg: true },
  ],
  Drinks: [
    { name: 'Tongba', nepali: 'तोङ्बा', desc: 'Warm millet beer fermented in a wooden vessel, sipped through a bamboo straw.', price: 'Rs 350', tags: ['Traditional'], image: butterTea, popular: true },
    { name: 'Butter Tea', nepali: 'नेपाली चिया', desc: 'Himalayan butter tea with salt — rich, warming & perfect for mountain evenings.', price: 'Rs 90', tags: ['Hot'], image: butterTea, veg: true },
    { name: 'Lassi', nepali: 'लस्सी', desc: 'Creamy yogurt drink blended with mango or rose — cool, sweet & refreshing.', price: 'Rs 140', tags: ['Cold'], image: curryDark, veg: true },
    { name: 'Raksi', nepali: 'रक्सी', desc: 'Traditional distilled millet spirit — strong, smooth & ceremonial.', price: 'Rs 220', tags: ['Spirit'], image: momoSteamed },
  ],
};

const testimonials = [
  { name: 'Sushma Adhikari', text: 'The momos taste exactly like my grandmother\'s in Kathmandu. The dal bhat thali is the real deal — unlimited refills, just like home.', role: 'Regular guest' },
  { name: 'James Thompson', text: 'I came curious about Nepali food and left a convert. The choila and tongba pairing was a revelation. Beautiful space, warm service.', role: 'Food critic, The Kathmandu Post' },
  { name: 'Pemba Sherpa', text: 'As a Nepali living abroad, Giri feels like home. The gundruk dhindo transported me straight back to my village in Solukhumbu.', role: 'Local guide' },
];

const galleryImages = [
  { url: 'https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop', label: 'Jhol Momo' },
  { url: 'https://images.pexels.com/photos/29148133/pexels-photo-29148133.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop', label: 'Dal Bhat Thali' },
  { url: 'https://images.pexels.com/photos/14037104/pexels-photo-14037104.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop', label: 'Boudhanath Stupa' },
  { url: 'https://images.pexels.com/photos/4997854/pexels-photo-4997854.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop', label: 'Our Dining Room' },
  { url: 'https://images.pexels.com/photos/7208238/pexels-photo-7208238.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop', label: 'Stone-Ground Spices' },
  { url: 'https://images.pexels.com/photos/28674557/pexels-photo-28674557.jpeg?auto=compress&cs=tinysrgb&w=700&h=700&fit=crop', label: 'Dal Makhani' },
];

const values = [
  { icon: Heart, title: 'Family Recipes', desc: 'Every dish traces back to a Giri family kitchen — nothing invented, nothing shortcut.' },
  { icon: Leaf, title: 'Local & Seasonal', desc: 'Produce from Kalimati market, spices ground fresh each morning in our kitchen.' },
  { icon: Flame, title: 'Cooked to Order', desc: 'No pre-made trays, no heat lamps. Your momos are folded when you order them.' },
  { icon: Award, title: 'Authentic Only', desc: 'No fusion, no compromises. Just the food we grew up eating in Nepal.' },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof typeof menu>('Starters');
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site-shell">
      <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
        <button className="brand" onClick={() => scrollTo('top')} aria-label="Giri home">
          <Logo variant={scrolled ? 'dark' : 'light'} size={42} />
          <span className="brand-type">
            <span className="brand-name">GIRI</span>
            <span className="brand-sub">NEPALI KITCHEN</span>
          </span>
        </button>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          <button onClick={() => scrollTo('story')}>Our Story</button>
          <button onClick={() => scrollTo('menu')}>Menu</button>
          <button onClick={() => scrollTo('gallery')}>Gallery</button>
          <button onClick={() => scrollTo('reviews')}>Reviews</button>
          <button onClick={() => scrollTo('visit')}>Visit</button>
        </nav>
        <div className="header-actions">
          <button className="btn btn-primary btn-sm" onClick={() => scrollTo('reserve')}>Reserve a table <ArrowUpRight size={13} /></button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </header>

      <main>
        {/* ===== HERO ===== */}
        <section className="hero" id="top" ref={heroRef}>
          <div className="hero-bg" style={{ backgroundImage: `url(${heroImg})` }} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">Authentic Nepali cuisine · Kathmandu since 2019</p>
            <h1>From the<br /><span className="hero-accent">Himalayas</span><br />to your table</h1>
            <p className="hero-subtitle">Family recipes from the Giri kitchen — hand-folded momos, slow-simmered dal, Newari feasts & mountain warmth. Served the way we eat at home.</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => scrollTo('reserve')}>Reserve a table <ArrowUpRight size={15} /></button>
              <button className="btn btn-ghost" onClick={() => scrollTo('menu')}>Explore the menu</button>
            </div>
            <div className="hero-rating">
              <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
              <span>4.9 · 1,200+ reviews on Google & TripAdvisor</span>
            </div>
          </div>
          <button className="scroll-hint" onClick={() => scrollTo('story')} aria-label="Scroll down">
            <ChevronDown size={20} />
          </button>
        </section>

        {/* ===== INFO STRIP ===== */}
        <section className="info-strip">
          <div className="info-item"><Clock size={18} /><div><strong>Open daily</strong><span>11:30 AM – 10:00 PM</span></div></div>
          <div className="info-divider" />
          <div className="info-item"><Phone size={18} /><div><strong>Reservations</strong><span>+977 1 4567 890</span></div></div>
          <div className="info-divider" />
          <div className="info-item"><MapPin size={18} /><div><strong>Find us</strong><span>Thamel, Kathmandu</span></div></div>
        </section>

        {/* ===== STORY ===== */}
        <section className="story-section" id="story">
          <div className="story-image-wrap reveal">
            <img src={storyImg} alt="Prayer flags at Boudhanath Stupa, Kathmandu" className="story-image-main" />
            <div className="story-badge">
              <span>est.</span>
              <strong>2019</strong>
            </div>
          </div>
          <div className="story-copy reveal">
            <p className="section-kicker">Our Story</p>
            <h2>A taste of home,<br />cooked with love</h2>
            <p>Giri is our family name — and the heart of our kitchen. When we left our village in the foothills of the Himalayas, we brought our grandmother's recipes with us. Every momo is hand-folded, every dal is slow-simmered, and every achar is ground fresh.</p>
            <p>We serve the food we grew up eating: <strong>Newari feasts</strong> from the Kathmandu Valley, <strong>dal bhat</strong> that fuels mountain life, and the <strong>festival sweets</strong> we only tasted on Dashain and Tihar. No shortcuts, no fusion — just honest Nepali cooking.</p>
            <div className="story-signature">— Suman Giri, Founder & Head Chef</div>
          </div>
        </section>

        {/* ===== VALUES ===== */}
        <section className="values-section">
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card reveal" key={v.title} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="value-icon"><v.icon size={26} strokeWidth={1.5} /></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== MENU ===== */}
        <section className="menu-section" id="menu">
          <div className="section-heading reveal">
            <p className="section-kicker">Our Menu</p>
            <h2>What we cook</h2>
            <p className="section-lead">Every dish is made to order with spices ground in-house and produce from the local market. Prices in Nepali Rupees.</p>
          </div>
          <div className="menu-tabs reveal">
            {(Object.keys(menu) as (keyof typeof menu)[]).map((cat) => (
              <button key={cat} className={activeCategory === cat ? 'menu-tab active' : 'menu-tab'} onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>
          <div className="menu-grid">
            {menu[activeCategory].map((dish, i) => (
              <article key={dish.name} className={dish.popular ? 'dish-card popular reveal' : 'dish-card reveal'} style={{ transitionDelay: `${i * 60}ms` }}>
                {dish.popular && <span className="popular-badge">Popular</span>}
                <div className="dish-tags-top">
                  {dish.veg && <span className="dish-icon-tag veg" title="Vegetarian"><Leaf size={11} /></span>}
                  {dish.spicy && <span className="dish-icon-tag spicy" title="Spicy"><Flame size={11} /></span>}
                </div>
                <div className="dish-image"><img src={dish.image} alt={dish.name} /></div>
                <div className="dish-body">
                  <div className="dish-head"><h3>{dish.name}</h3><span className="dish-price">{dish.price}</span></div>
                  <p className="dish-nepali">{dish.nepali}</p>
                  <p className="dish-desc">{dish.desc}</p>
                  <div className="dish-tags">{dish.tags.map((t) => <span key={t} className="dish-tag">{t}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===== CHEF ===== */}
        <section className="chef-section">
          <div className="chef-photo reveal">
            <img src={chefImg} alt="Suman Giri, Head Chef" />
          </div>
          <div className="chef-copy reveal">
            <p className="section-kicker">Meet the Chef</p>
            <h2>Suman Giri</h2>
            <p className="chef-title">Founder & Head Chef</p>
            <blockquote>
              "I learned to cook by watching my mother fold momos on the floor of our kitchen in Pokhara. She never wrote anything down — it was all in her hands. At Giri, I cook the same way: by feel, by memory, by season."
            </blockquote>
            <blockquote>
              "When a guest tells me the food tastes like their grandmother's, I know we've done our job. That's the highest compliment a Nepali cook can receive."
            </blockquote>
          </div>
        </section>

        {/* ===== GALLERY ===== */}
        <section className="gallery-section" id="gallery">
          <div className="section-heading reveal">
            <p className="section-kicker">Gallery</p>
            <h2>A glimpse of Giri</h2>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((img, i) => (
              <div className="gallery-item reveal" key={img.label} style={{ transitionDelay: `${i * 60}ms` }}>
                <img src={img.url} alt={img.label} />
                <div className="gallery-label">{img.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== REVIEWS ===== */}
        <section className="reviews-section" id="reviews">
          <div className="reviews-bg" style={{ backgroundImage: `url(${interiorImg})` }} />
          <div className="reviews-overlay" />
          <div className="reviews-content">
            <div className="section-heading light reveal">
              <p className="section-kicker">Guests Say</p>
              <h2>From our guests</h2>
            </div>
            <div className="reviews-grid">
              {testimonials.map((t, i) => (
                <div className="review-card reveal" key={t.name} style={{ transitionDelay: `${i * 100}ms` }}>
                  <Quote size={30} className="quote-icon" />
                  <p>{t.text}</p>
                  <div className="review-author"><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== RESERVE ===== */}
        <section className="reserve-section" id="reserve">
          <div className="reserve-info reveal">
            <p className="section-kicker">Reservations</p>
            <h2>Book your table</h2>
            <p>Whether it's a quiet dinner for two or a Newari feast for twenty, we'd love to host you. Fill out the form and we'll confirm by email within a few hours.</p>
            <div className="reserve-details">
              <div className="reserve-detail"><Clock size={18} /><div><strong>Lunch</strong><span>11:30 AM – 2:30 PM</span></div></div>
              <div className="reserve-detail"><Clock size={18} /><div><strong>Dinner</strong><span>5:00 PM – 10:00 PM</span></div></div>
              <div className="reserve-detail"><Phone size={18} /><div><strong>Call us</strong><span>+977 1 4567 890</span></div></div>
              <div className="reserve-detail"><MapPin size={18} /><div><strong>Address</strong><span>Thamel Marg, Kathmandu 44600</span></div></div>
            </div>
            <p className="reserve-note">For parties larger than 12, please call us directly.</p>
          </div>
          <div className="reserve-form-wrap reveal">
            <ReservationForm />
          </div>
        </section>

        {/* ===== VISIT CTA ===== */}
        <section className="visit-cta" id="visit" style={{ backgroundImage: `linear-gradient(rgba(26,20,14,.75), rgba(26,20,14,.75)), url(${himalayaImg})` }}>
          <div className="visit-content">
            <p className="section-kicker light">Find Us</p>
            <h2>Visit Giri in Thamel</h2>
            <p>We're tucked on a quiet lane off Thamel Marg, a five-minute walk from Kathmandu Durbar Square. Look for the prayer flags at our door.</p>
            <div className="visit-buttons">
              <a className="btn btn-primary" href="https://maps.google.com/?q=Thamel+Kathmandu+Nepal" target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={15} /></a>
              <button className="btn btn-ghost-light" onClick={() => scrollTo('reserve')}>Reserve a table</button>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        <div className="footer-col footer-brand">
          <div className="brand">
            <Logo variant="light" size={40} />
            <span className="brand-type">
              <span className="brand-name">GIRI</span>
              <span className="brand-sub">NEPALI KITCHEN</span>
            </span>
          </div>
          <p>Authentic Nepali cuisine, cooked with family recipes from the Himalayas. Namaste.</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <button onClick={() => scrollTo('story')}>Our Story</button>
          <button onClick={() => scrollTo('menu')}>Menu</button>
          <button onClick={() => scrollTo('gallery')}>Gallery</button>
          <button onClick={() => scrollTo('reviews')}>Reviews</button>
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <span>Thamel Marg, Kathmandu 44600</span>
          <span>Nepal</span>
          <span>+977 1 4567 890</span>
          <span>hello@girikitchen.com</span>
        </div>
        <div className="footer-col">
          <h4>Hours</h4>
          <span>Mon – Thu: 11:30 – 22:00</span>
          <span>Fri – Sun: 11:30 – 23:00</span>
          <span className="footer-note">Closed on major Nepali holidays</span>
        </div>
      </footer>
      <div className="footer-bottom">
        <span>© 2026 Giri Nepali Kitchen · Made with love in Kathmandu</span>
        <span className="footer-namaste">नमस्ते · Namaste</span>
      </div>
    </div>
  );
}

export default App;
