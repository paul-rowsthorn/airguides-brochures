import React from 'react';
import { renderToFile, Document, Page, Text, View, Image, Link, StyleSheet } from '@react-pdf/renderer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG = join(__dirname, 'images');
const e = React.createElement;
const img = (name) => join(IMG, name);

const colors = {
  deep: '#0a1628',
  ocean: '#0d2847',
  teal: '#2dd4bf',
  sand: '#f5f0eb',
  white: '#ffffff',
  greyLight: '#94a3b8',
  greyMid: '#64748b',
};

const s = StyleSheet.create({
  // --- Pages ---
  page: { backgroundColor: colors.deep, color: colors.white, padding: 40 },
  pageOcean: { backgroundColor: colors.ocean, color: colors.white, padding: 40 },
  coverPage: { backgroundColor: colors.deep, position: 'relative', padding: 0 },
  // Page with background image
  bgPage: { position: 'relative', padding: 0 },

  // --- Backgrounds (840pt height to avoid react-pdf overflow bug at 841.89) ---
  bgImg: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, objectFit: 'cover' },
  bgOverlay: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, backgroundColor: 'rgba(10, 22, 40, 0.75)' },
  bgContent: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, padding: 40 },

  // --- Cover ---
  heroBg: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, objectFit: 'cover' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, backgroundColor: 'rgba(10, 22, 40, 0.55)' },
  heroContent: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, padding: 40, flexDirection: 'column', justifyContent: 'space-between' },
  logo: { width: 160, height: 42, marginBottom: 20 },
  heroCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heroTag: { fontSize: 8, fontWeight: 'bold', color: colors.teal, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, textAlign: 'center' },
  heroTitle: { fontSize: 42, fontWeight: 'bold', color: colors.white, marginBottom: 24, textAlign: 'center', lineHeight: 1.1 },
  heroSub: { fontSize: 11, color: colors.sand, lineHeight: 1.6, textAlign: 'center', maxWidth: 380 },
  metaBar: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(13, 40, 71, 0.9)', padding: 16, borderRadius: 8 },
  metaItem: { alignItems: 'center', flex: 1 },
  metaLabel: { fontSize: 7, color: colors.greyMid, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
  metaValue: { fontSize: 9, fontWeight: 'bold', color: colors.white },

  // --- Typography ---
  sectionLabel: { fontSize: 9, fontWeight: 'bold', color: colors.teal, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  sectionTitle: { fontSize: 28, fontWeight: 'bold', color: colors.white, marginBottom: 18, lineHeight: 1.2 },
  body: { fontSize: 11, lineHeight: 1.65, color: colors.greyLight, marginBottom: 10 },
  bodyLead: { fontSize: 12, lineHeight: 1.6, color: colors.sand, marginBottom: 10 },

  // --- Highlights (2 cols x 3 rows) ---
  hlGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 16 },
  hlCard: { width: '47%', backgroundColor: colors.ocean, padding: 16, borderRadius: 8 },
  hlTitle: { fontSize: 11, fontWeight: 'bold', color: colors.white, marginBottom: 6 },
  hlDesc: { fontSize: 9, lineHeight: 1.5, color: colors.greyLight },

  // --- Two column ---
  twoCol: { flexDirection: 'row', gap: 24, marginTop: 16 },
  col: { flex: 1 },
  sectionImg: { width: '100%', borderRadius: 8, objectFit: 'cover' },

  // --- Testimonial ---
  tBox: { backgroundColor: colors.ocean, padding: 24, borderRadius: 8, marginBottom: 0, alignItems: 'center' },
  tBoxBottom: { backgroundColor: colors.ocean, padding: 24, borderRadius: 8, marginTop: 'auto', alignItems: 'center' },
  tQuote: { fontSize: 13, fontStyle: 'italic', color: colors.white, textAlign: 'center', lineHeight: 1.5, marginBottom: 12 },
  tName: { fontSize: 10, fontWeight: 'bold', color: colors.teal },
  tDetail: { fontSize: 8, color: colors.greyLight },

  // --- Gallery ---
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 16 },
  galleryImg: { width: '48.5%', height: 170, borderRadius: 6, objectFit: 'cover' },
  galleryImgSmall: { width: '48.5%', height: 120, borderRadius: 6, objectFit: 'cover' },

  // --- Itinerary ---
  itinDay: { flexDirection: 'row', marginBottom: 18, gap: 16 },
  dayNum: { width: 50, alignItems: 'center' },
  dayNumText: { fontSize: 28, fontWeight: 'bold', color: colors.teal, lineHeight: 1 },
  dayLabel: { fontSize: 8, textTransform: 'uppercase', letterSpacing: 1, color: colors.greyMid },
  dayContent: { flex: 1 },
  dayTitle: { fontSize: 13, fontWeight: 'bold', color: colors.white, marginBottom: 3 },
  daySub: { fontSize: 9, color: colors.teal, marginBottom: 5 },
  dayDesc: { fontSize: 9, lineHeight: 1.5, color: colors.greyLight },

  // --- Full image ---
  fullImg: { width: 595, height: 840, objectFit: 'cover' },

  // --- Crew (1 col, 2 rows per page — photo left, text right) ---
  crewRow: { flexDirection: 'row', gap: 16, marginBottom: 20, alignItems: 'flex-start' },
  crewPhoto: { width: 110, height: 110, borderRadius: 55, objectFit: 'cover' },
  crewInfo: { flex: 1 },
  crewName: { fontSize: 13, fontWeight: 'bold', color: colors.white, marginBottom: 3 },
  crewRole: { fontSize: 10, color: colors.teal, marginBottom: 5 },
  crewBio: { fontSize: 10, lineHeight: 1.6, color: colors.greyLight },

  // --- Lists ---
  listItem: { flexDirection: 'row', marginBottom: 6, alignItems: 'flex-start' },
  dot: { width: 5, height: 5, borderRadius: 2.5, marginRight: 8, marginTop: 5 },
  dotTeal: { backgroundColor: colors.teal },
  dotGrey: { backgroundColor: colors.greyMid },
  listText: { fontSize: 10, lineHeight: 1.5, color: colors.greyLight, flex: 1 },

  // --- FAQ ---
  faqItem: { marginBottom: 16 },
  faqQ: { fontSize: 11, fontWeight: 'bold', color: colors.white, marginBottom: 4 },
  faqA: { fontSize: 10, lineHeight: 1.5, color: colors.greyLight },

  // --- Pricing ---
  priceCenter: { alignItems: 'center', marginTop: 20, marginBottom: 24 },
  priceMain: { fontSize: 48, fontWeight: 'bold', color: colors.teal, marginBottom: 8 },
  priceNote: { fontSize: 10, color: colors.greyLight, marginBottom: 16 },
  dateCards: { flexDirection: 'row', gap: 14, marginBottom: 16 },
  dateCard: { backgroundColor: 'rgba(13, 40, 71, 0.8)', padding: 14, borderRadius: 8, alignItems: 'center', minWidth: 110 },
  dateLabel: { fontSize: 7, color: colors.greyLight, marginBottom: 3 },
  dateValue: { fontSize: 9, fontWeight: 'bold', color: colors.white },

  // --- CTA ---
  ctaBtn: { backgroundColor: colors.teal, padding: '14 28', borderRadius: 8, alignItems: 'center', marginBottom: 24 },
  ctaBtnText: { fontSize: 10, fontWeight: 'bold', color: colors.deep },
  contactInfo: { alignItems: 'center', gap: 6 },
  contactText: { fontSize: 9, color: colors.greyLight },
  link: { color: colors.teal, textDecoration: 'none' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

// --- DATA ---
const data = {
  meta: [
    { label: 'Duration', value: '8 Days / 7 Nights' },
    { label: 'Location', value: "Vava'u, Tonga" },
    { label: 'Group Size', value: 'Max 7 Guests' },
    { label: 'From', value: 'US$4,900' },
  ],
  highlights: [
    { title: '5 Days with Humpback Whales', desc: 'Full days on a private vessel with expert guides, swimming alongside humpbacks in their breeding grounds.' },
    { title: 'Photography Masterclasses', desc: 'Hands-on underwater photography guidance from Jono, plus a dedicated editing session on your final day.' },
    { title: 'Marine Science Expertise', desc: "Jono's background as an environmental scientist means you'll understand whale behaviour, not just observe it." },
    { title: 'All-Inclusive Dining', desc: 'Every meal covered. Traditional Tongan welcome feast, daily breakfasts, lunches on the boat, and group dinners.' },
    { title: 'Cultural Immersion', desc: "Paluki's island tour with stories of Tongan heritage, secret beaches, hidden lookouts, and the rich local culture." },
    { title: 'Beyond the Whales', desc: "Coral reefs, blue caves, isolated white beaches, and the incredible underwater world of Vava'u." },
  ],
  aboutTexts: [
    "Join Jono and a small group of ocean-loving travellers in the remote island group of Vava'u, Kingdom of Tonga, where humpback whales return each year to mate, calve, and raise their young in warm, crystal-clear waters.",
    "Each day you'll board a private vessel with expert guides and experienced skippers to find and swim alongside these extraordinary animals. This isn't a crowded whale-watching trip. You'll be in the water, face-to-face, watching a mother and calf pass beneath you.",
    "Between whale encounters, you'll drop anchor over vibrant coral reefs, explore blue caves and deserted beaches, and get to know the landscape both above and below the surface.",
    "This trip is for anyone who feels at home in the water. Whether you're a photographer, freediver, or simply someone who's always dreamed of swimming with whales, the only prerequisite is that you're a confident snorkeller.",
  ],
  testimonial1: { quote: "The whales were mind blowing. What a gift to be in Tonga staring into the eye of a baby whale. This trip was a lifelong dream come true. We've already signed up again for next year.", name: 'Laura Cottril', detail: 'Tonga 2023 guest, United States' },
  testimonial2: { quote: "The Airguides trip to Tonga to swim with humpback whales was the experience of a lifetime. I have traveled all over the world, and nothing compares. A wonderful and caring team made our adventures stress free.", name: 'Mary', detail: 'Tonga guest, returning for 2026' },
  guideBio: [
    "Environmental scientist, marine megafauna guide, and ocean cinematographer. Jono's knowledge and years in the water get you as close as possible to these creatures, creating encounters most people only dream about.",
    'This isn\'t a tourist whale-watching tour. Jono rejects the "smile-for-the-camera" approach. He guides you on a journey of exploration and understanding. You\'ll learn about humpback physiology, behaviour, and individual personalities.',
    "Jono is also committed to the local Tongan community of Vava'u. By working with local services, staff, cuisine, and accommodations, your experience maintains authenticity while directly supporting the people and place that make it all possible.",
  ],
  whyBookTexts: [
    'Most whale tours in Tonga give guests a single brief swim, share the water with large groups, and rush through the day.',
    'This trip is built differently. Five full days on the water with the same small group, learning to read whale behaviour, moving calmly and respectfully in the water, and letting genuine encounters unfold naturally.',
    "With private charters and a maximum of seven guests, you get time and space in the water that a public tour simply can't offer. For photographers, Jono provides hands-on guidance throughout the trip.",
    "By slowing the pace and keeping the experience personal, this week-long expedition removes the rush of a one-day tour and lets you truly immerse yourself in Tonga's incredible marine world.",
  ],
  itinerary: [
    { day: '1', label: 'Day', title: "Welcome to Vava'u", sub: 'Dive into Humpback Heaven', desc: "A private driver meets you at Vava'u airport. Meet Jono and your fellow travellers over lunch. Settle into Vava'u's slower pace with a free afternoon, then gather for a traditional Tongan welcome feast at sunset. The evening wraps with Jono's masterclass on humpback behaviour." },
    { day: '2', label: 'Day', title: 'Sunday, Day of Rest', sub: 'Embrace Tongan Tranquility', desc: "Sunday is sacred in Tonga. A relaxed breakfast, then time to dial in your snorkel gear. In the afternoon, Paluki's island tour takes you to lookouts, secret beaches, and the best of Vava'u. Recharge for the adrenaline-filled days ahead." },
    { day: '3-7', label: 'Days', title: 'Whale Odyssey', sub: 'Daily Encounters with the Gentle Giants', desc: "Five full days on the water. Each morning you board your private vessel for ~7 hours of whale spotting. When the moment comes, you slip into the water for safe, guided swimming with humpbacks. Lunch anchored over coral reefs. Evenings back at the resort with group dinners." },
    { day: '8', label: 'Day', title: "Farewell, Vava'u", sub: 'Turning Experiences into Lasting Captures', desc: "A morning masterclass with Jono on editing your whale photography. Exchange farewells with your travel companions, then a private transfer back to Vava'u airport." },
  ],
  accomTexts: [
    "Your base for the week is a water-front property on the island of Vava'u, with a private jetty and direct ocean access. Wake up to water views each morning.",
    "Spacious rooms with ensuite, open-plan living areas that flow onto covered verandahs, and communal lounges where your group gathers each evening. Private rooms available on request.",
    "All meals prepared on-site by award-winning chef Andrea, using fresh seasonal produce.",
  ],
  boatTexts: [
    "Your private vessel is Zulu, a custom-built boat less than two years old, purpose-designed for whale encounters in Tonga's waters.",
    'At the helm is skipper Alastair "Al" Coldrick, with over 20 years of experience on these waters.',
    "With a maximum of seven guests, you have plenty of space on board and in the water.",
  ],
  crew: [
    { name: 'Jono Allen', role: 'Storyteller Guide', bio: 'Underwater photographer, environmental scientist, and marine megafauna guide. Your expert for every whale encounter.', photo: 'crew-jono.jpg' },
    { name: 'Eva', role: 'Expedition Guide', bio: 'Skilled freediver and hospitality expert. Eva ensures every detail is taken care of so you can fully immerse yourself in the experience.', photo: 'crew-eva.jpg' },
    { name: 'Andrea', role: 'Professional Chef', bio: "Award-winning chef. Winner of Tonga's Best Chef Competition 2021. Prepares vibrant, fresh meals using seasonal local produce.", photo: 'crew-andrea.jpg' },
    { name: 'Paluki', role: 'Cultural Guide', bio: "Born and raised in Tonga. Shares the stories, customs, and hidden gems of Vava'u. Your connection to authentic Tongan culture.", photo: 'crew-paluki.jpg' },
    { name: 'Paul Rowsthorn', role: 'Expedition Director', bio: 'Founder of Airguides. Handles all logistics, travel planning, and coordination so all you have to do is show up.', photo: 'crew-paul.jpg' },
  ],
  included: [
    '8 days / 7 nights ocean-view accommodation',
    '5 full days of private vessel whale encounters (~7 hours/day)',
    'All meals: welcome feast, daily breakfasts, lunches, group dinners',
    'Private airport transfers',
    'Storyteller guide Jono Allen throughout',
    'Dedicated Airguides Expedition Leader on-ground',
    'Marine biologist and in-water guides on charters',
    'Snorkelling equipment',
    'Photography masterclass and editing session',
    "Paluki's island cultural tour",
    'Personalised gallery of your best trip photos',
  ],
  notIncluded: [
    'International flights to Vava\'u (VAV)',
    'Travel insurance (required)',
    'Personal expenses and gratuities',
    'Alcoholic beverages',
  ],
  faq: [
    { q: 'Do I need to be a photographer?', a: 'Not at all. Jono and the team will photograph your week. We find even people who call themselves "not a photographer" get a lot out of the sessions.' },
    { q: "How do I get to Vava'u?", a: 'Most flights go via Nadi, Fiji from Australia, USA, and Singapore. Fiji Airways is the best airline. Once booked, we help coordinate your travel.' },
    { q: 'Is everything included?', a: 'Yes. Accommodation, all meals, private boat charters, airport transfers, guides, equipment, masterclasses, and cultural tours. The only extras are flights, travel insurance, and alcohol.' },
    { q: 'Can I get a private room?', a: 'Absolutely. You can select a private room at the time of booking.' },
    { q: 'Are private or group weeks available?', a: 'Yes. We offer both scheduled group departures and fully private weeks. Contact us at paul@airguides.com.' },
  ],
  dates: [
    { label: 'Trip 1', value: 'Jul - Oct 2026' },
    { label: 'Trip 2', value: 'Jul - Oct 2027' },
  ],
};

const TongaBrochure = e(Document, null,

  // ==================== PAGE 1: COVER (hero bg + title + meta) ====================
  e(Page, { size: 'A4', style: s.coverPage },
    e(Image, { src: img('hero.jpg'), style: s.heroBg }),
    e(View, { style: s.heroOverlay }),
    e(View, { style: s.heroContent },
      e(Image, { src: img('airguides-logo-white.png'), style: s.logo }),
      e(View, { style: s.heroCenter },
        e(Text, { style: s.heroTag }, 'Ocean Expedition'),
        e(Text, { style: s.heroTitle }, 'Swim with Humpback\nWhales in Tonga'),
        e(Text, { style: s.heroSub }, '8 days in the Kingdom of Tonga with marine scientist and ocean cinematographer Jono Allen. Small group. Private vessel. Face-to-face with the gentle giants.')
      ),
      e(View, { style: s.metaBar },
        ...data.meta.map((m, i) => e(View, { key: i, style: s.metaItem },
          e(Text, { style: s.metaLabel }, m.label),
          e(Text, { style: s.metaValue }, m.value)
        ))
      )
    )
  ),

  // ==================== PAGE 2: HIGHLIGHTS ====================
  e(Page, { size: 'A4', style: s.page },
    e(Text, { style: s.sectionLabel }, 'Experience Highlights'),
    e(Text, { style: s.sectionTitle }, 'What Makes This Trip Special'),
    e(View, { style: s.hlGrid },
      ...data.highlights.map((h, i) => e(View, { key: i, style: s.hlCard },
        e(Text, { style: s.hlTitle }, h.title),
        e(Text, { style: s.hlDesc }, h.desc)
      ))
    )
  ),

  // ==================== PAGE 3: ABOUT + testimonial 1 at bottom ====================
  e(Page, { size: 'A4', style: s.pageOcean },
    e(Text, { style: s.sectionLabel }, 'About the Experience'),
    e(Text, { style: s.sectionTitle }, 'Swimming with Gentle Giants'),
    e(View, { style: s.twoCol },
      e(View, { style: s.col },
        e(Text, { style: s.body }, data.aboutTexts[0]),
        e(Text, { style: s.body }, data.aboutTexts[1])
      ),
      e(View, { style: s.col },
        e(Image, { src: img('about.jpg'), style: [s.sectionImg, { height: 240 }] })
      )
    ),
    // Bottom two paragraphs below image
    e(Text, { style: [s.body, { marginTop: 12 }] }, data.aboutTexts[2]),
    e(Text, { style: s.body }, data.aboutTexts[3]),
    // Testimonial 1 at bottom
    e(View, { style: { marginTop: 'auto' } },
      e(View, { style: s.tBoxBottom },
        e(Text, { style: s.tQuote }, `\u201C${data.testimonial1.quote}\u201D`),
        e(Text, { style: s.tName }, data.testimonial1.name),
        e(Text, { style: s.tDetail }, data.testimonial1.detail)
      )
    )
  ),

  // ==================== PAGE 4: YOUR GUIDE ====================
  e(Page, { size: 'A4', style: s.page },
    e(Text, { style: s.sectionLabel }, 'Your Guide'),
    e(Text, { style: s.sectionTitle }, 'Jono Allen'),
    e(View, { style: s.twoCol },
      e(View, { style: s.col },
        ...data.guideBio.map((t, i) => e(Text, { key: i, style: s.body }, t))
      ),
      e(View, { style: s.col },
        e(Image, { src: img('guide.jpg'), style: [s.sectionImg, { height: 340 }] })
      )
    )
  ),

  // ==================== PAGE 5: WHY BOOK (whale-full bg) ====================
  e(Page, { size: 'A4', style: s.bgPage },
    e(Image, { src: img('whale-full.jpg'), style: s.bgImg }),
    e(View, { style: [s.bgOverlay, { backgroundColor: 'rgba(10, 22, 40, 0.82)' }] }),
    e(View, { style: s.bgContent },
      e(Text, { style: s.sectionLabel }, 'Why Book'),
      e(Text, { style: s.sectionTitle }, 'Beyond Tourist Whale-Watching'),
      ...data.whyBookTexts.map((t, i) => e(Text, { key: i, style: s.body }, t))
    )
  ),

  // ==================== PAGE 6: GALLERY ====================
  e(Page, { size: 'A4', style: s.page },
    e(Text, { style: s.sectionLabel }, 'Photo Gallery'),
    e(Text, { style: s.sectionTitle }, 'Moments from Previous Trips'),
    e(View, { style: s.galleryGrid },
      e(Image, { src: img('gallery1.jpg'), style: s.galleryImg }),
      e(Image, { src: img('gallery2.jpg'), style: s.galleryImg }),
      e(Image, { src: img('gallery3.jpg'), style: s.galleryImg }),
      e(Image, { src: img('gallery4.jpg'), style: s.galleryImg })
    )
  ),

  // ==================== PAGE 7: ITINERARY ====================
  e(Page, { size: 'A4', style: s.pageOcean },
    e(Text, { style: s.sectionLabel }, 'Itinerary'),
    e(Text, { style: s.sectionTitle }, 'Your 8-Day Journey'),
    ...data.itinerary.map((d, i) => e(View, { key: i, style: s.itinDay },
      e(View, { style: s.dayNum },
        e(Text, { style: s.dayNumText }, d.day),
        e(Text, { style: s.dayLabel }, d.label)
      ),
      e(View, { style: s.dayContent },
        e(Text, { style: s.dayTitle }, d.title),
        e(Text, { style: s.daySub }, d.sub),
        e(Text, { style: s.dayDesc }, d.desc)
      )
    ))
  ),

  // ==================== PAGE 8: ACCOMMODATION with images ====================
  e(Page, { size: 'A4', style: s.page },
    e(Text, { style: s.sectionLabel }, 'Accommodation'),
    e(Text, { style: s.sectionTitle }, 'Your Island Base'),
    e(View, { style: s.twoCol },
      e(View, { style: s.col },
        ...data.accomTexts.map((t, i) => e(Text, { key: i, style: s.body }, t))
      ),
      e(View, { style: s.col },
        e(Image, { src: img('accom-living.jpg'), style: [s.sectionImg, { height: 180 }] })
      )
    ),
    e(View, { style: s.galleryGrid },
      e(Image, { src: img('accom-bedroom.jpg'), style: s.galleryImgSmall }),
      e(Image, { src: img('accom-verandah.jpg'), style: s.galleryImgSmall }),
      e(Image, { src: img('accom-lounge.jpg'), style: s.galleryImgSmall }),
      e(Image, { src: img('accom-jetty.jpg'), style: s.galleryImgSmall })
    )
  ),

  // ==================== PAGE 9: THE BOAT + testimonial 2 at bottom ====================
  e(Page, { size: 'A4', style: s.pageOcean },
    e(Text, { style: s.sectionLabel }, 'The Boat'),
    e(Text, { style: s.sectionTitle }, 'Zulu & Skipper Al'),
    e(View, { style: s.twoCol },
      e(View, { style: s.col },
        ...data.boatTexts.map((t, i) => e(Text, { key: i, style: s.body }, t))
      ),
      e(View, { style: s.col },
        e(Image, { src: img('boat-al.jpg'), style: [s.sectionImg, { height: 200 }] })
      )
    ),
    // Testimonial 2 at bottom of this page
    e(View, { style: { marginTop: 'auto' } },
      e(View, { style: s.tBoxBottom },
        e(Text, { style: s.tQuote }, `\u201C${data.testimonial2.quote}\u201D`),
        e(Text, { style: s.tName }, data.testimonial2.name),
        e(Text, { style: s.tDetail }, data.testimonial2.detail)
      )
    )
  ),

  // ==================== PAGE 10: CREW part 1 (3 members) ====================
  e(Page, { size: 'A4', style: s.page },
    e(Text, { style: s.sectionLabel }, 'Your Crew'),
    e(Text, { style: s.sectionTitle }, 'Meet the Team'),
    ...data.crew.slice(0, 3).map((c, i) => e(View, { key: i, style: s.crewRow },
      e(Image, { src: img(c.photo), style: s.crewPhoto }),
      e(View, { style: s.crewInfo },
        e(Text, { style: s.crewName }, c.name),
        e(Text, { style: s.crewRole }, c.role),
        e(Text, { style: s.crewBio }, c.bio)
      )
    ))
  ),

  // ==================== PAGE 11: CREW part 2 (2 members) ====================
  e(Page, { size: 'A4', style: s.page },
    ...data.crew.slice(3).map((c, i) => e(View, { key: i, style: s.crewRow },
      e(Image, { src: img(c.photo), style: s.crewPhoto }),
      e(View, { style: s.crewInfo },
        e(Text, { style: s.crewName }, c.name),
        e(Text, { style: s.crewRole }, c.role),
        e(Text, { style: s.crewBio }, c.bio)
      )
    ))
  ),

  // ==================== PAGE 11: WHAT'S INCLUDED (1 col, 2 rows) ====================
  e(Page, { size: 'A4', style: s.pageOcean },
    e(Text, { style: s.sectionLabel }, "What's Included"),
    e(Text, { style: s.sectionTitle }, 'All-Inclusive Experience'),
    e(Text, { style: [s.bodyLead, { marginBottom: 12, fontWeight: 'bold' }] }, 'Included'),
    ...data.included.map((item, i) => e(View, { key: i, style: s.listItem },
      e(View, { style: [s.dot, s.dotTeal] }),
      e(Text, { style: s.listText }, item)
    )),
    e(Text, { style: [s.bodyLead, { marginBottom: 12, marginTop: 20, fontWeight: 'bold' }] }, 'Not Included'),
    ...data.notIncluded.map((item, i) => e(View, { key: i, style: s.listItem },
      e(View, { style: [s.dot, s.dotGrey] }),
      e(Text, { style: s.listText }, item)
    ))
  ),

  // ==================== PAGE 12: FAQ (blurred bg) ====================
  e(Page, { size: 'A4', style: s.bgPage },
    e(Image, { src: img('bg-faq.jpg'), style: s.bgImg }),
    e(View, { style: s.bgOverlay }),
    e(View, { style: s.bgContent },
      e(Text, { style: s.sectionLabel }, 'FAQ'),
      e(Text, { style: s.sectionTitle }, 'Everything You Need to Know'),
      ...data.faq.map((f, i) => e(View, { key: i, style: s.faqItem },
        e(Text, { style: s.faqQ }, f.q),
        e(Text, { style: s.faqA }, f.a)
      ))
    )
  ),

  // ==================== PAGE 13: PRICING (blurred bg, centred) ====================
  e(Page, { size: 'A4', style: s.bgPage },
    e(Image, { src: img('bg-pricing.jpg'), style: s.bgImg }),
    e(View, { style: s.bgOverlay }),
    e(View, { style: [s.bgContent, { justifyContent: 'center', alignItems: 'center' }] },
      e(Text, { style: [s.sectionLabel, { textAlign: 'center' }] }, 'Pricing & Dates'),
      e(Text, { style: [s.sectionTitle, { textAlign: 'center' }] }, 'Secure Your Spot'),
      e(View, { style: s.priceCenter },
        e(Text, { style: s.priceMain }, 'US$4,900'),
        e(Text, { style: s.priceNote }, 'per person, all-inclusive'),
        e(Text, { style: [s.body, { textAlign: 'center' }] }, 'Deposit: US$1,000. Balance due 90 days prior to arrival.')
      ),
      e(View, { style: s.dateCards },
        ...data.dates.map((d, i) => e(View, { key: i, style: s.dateCard },
          e(Text, { style: s.dateLabel }, d.label),
          e(Text, { style: s.dateValue }, d.value)
        ))
      ),
      e(Text, { style: [s.body, { textAlign: 'center' }] }, 'Maximum 7 guests per departure.'),
      e(Text, { style: [s.body, { textAlign: 'center' }] }, 'Smaller private weeks available on request.')
    )
  ),

  // ==================== PAGE 14: CTA (blurred bg) ====================
  e(Page, { size: 'A4', style: s.bgPage },
    e(Image, { src: img('bg-cta.jpg'), style: s.bgImg }),
    e(View, { style: s.bgOverlay }),
    e(View, { style: [s.bgContent, { justifyContent: 'center', alignItems: 'center' }] },
      e(Text, { style: [s.sectionTitle, { textAlign: 'center' }] }, 'Ready to Join Us?'),
      e(Text, { style: [s.bodyLead, { textAlign: 'center', marginBottom: 24 }] }, "This is your invitation to one of the world's most extraordinary wildlife encounters."),
      e(Link, { src: 'https://www.airguides.com/product/tonga-jono-allen', style: { textDecoration: 'none' } },
        e(View, { style: s.ctaBtn },
          e(Text, { style: s.ctaBtnText }, 'Secure Your Spot')
        )
      ),
      e(View, { style: s.contactInfo },
        e(Link, { src: 'mailto:paul@airguides.com', style: { textDecoration: 'none' } },
          e(Text, { style: s.contactText }, 'Email: paul@airguides.com')
        ),
        e(Text, { style: s.contactText }, 'Phone: (+61) 402 552 918'),
        e(Link, { src: 'https://www.airguides.com', style: { textDecoration: 'none' } },
          e(Text, { style: [s.contactText, s.link] }, 'airguides.com')
        )
      )
    )
  )
);

console.log('Generating React-PDF brochure...');
console.time('PDF generated');
await renderToFile(TongaBrochure, process.argv[2] || 'tonga-brochure.pdf');
console.timeEnd('PDF generated');
console.log(`Saved to: ${process.argv[2] || 'tonga-brochure.pdf'}`);
