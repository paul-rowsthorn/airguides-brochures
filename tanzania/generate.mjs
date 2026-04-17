import React from 'react';
import { renderToFile, Document, Page, Text, View, Image, Link, StyleSheet } from '@react-pdf/renderer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG = join(__dirname);
const e = React.createElement;
const img = (name) => join(IMG, name);

// Safari warm palette (vs Tonga's ocean palette)
const colors = {
  deep: '#1a1208',       // deep safari brown-black
  earth: '#2c1e0f',      // warm dark earth
  gold: '#d4a853',       // safari gold accent
  sand: '#f5eed9',       // warm sand
  white: '#ffffff',
  greyLight: '#b8a992',  // warm grey
  greyMid: '#8a7a6a',    // warm mid grey
};

const s = StyleSheet.create({
  page: { backgroundColor: colors.deep, color: colors.white, padding: 40 },
  pageEarth: { backgroundColor: colors.earth, color: colors.white, padding: 40 },
  coverPage: { backgroundColor: colors.deep, position: 'relative', padding: 0 },
  bgPage: { position: 'relative', padding: 0 },

  // Backgrounds (840pt to avoid overflow)
  bgImg: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, objectFit: 'cover' },
  bgOverlay: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, backgroundColor: 'rgba(26, 18, 8, 0.75)' },
  bgContent: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, padding: 40 },

  // Cover
  heroBg: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, objectFit: 'cover' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, backgroundColor: 'rgba(26, 18, 8, 0.5)' },
  heroContent: { position: 'absolute', top: 0, left: 0, width: 595, height: 840, padding: 40, flexDirection: 'column', justifyContent: 'space-between' },
  logo: { width: 160, height: 42, marginBottom: 20 },
  heroCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heroTag: { fontSize: 9, fontWeight: 'bold', color: colors.gold, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, textAlign: 'center' },
  heroTitle: { fontSize: 40, fontWeight: 'bold', color: colors.white, marginBottom: 24, textAlign: 'center', lineHeight: 1.1 },
  heroSub: { fontSize: 11, color: colors.sand, lineHeight: 1.6, textAlign: 'center', maxWidth: 400 },
  metaBar: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(44, 30, 15, 0.9)', padding: 16, borderRadius: 8 },
  metaItem: { alignItems: 'center', flex: 1 },
  metaLabel: { fontSize: 7, color: colors.greyMid, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
  metaValue: { fontSize: 9, fontWeight: 'bold', color: colors.white },

  // Typography
  sectionLabel: { fontSize: 9, fontWeight: 'bold', color: colors.gold, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  sectionTitle: { fontSize: 28, fontWeight: 'bold', color: colors.white, marginBottom: 18, lineHeight: 1.2 },
  body: { fontSize: 11, lineHeight: 1.65, color: colors.greyLight, marginBottom: 10 },
  bodyLead: { fontSize: 12, lineHeight: 1.6, color: colors.sand, marginBottom: 10 },

  // Highlights (2x3)
  hlGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 16 },
  hlCard: { width: '47%', backgroundColor: colors.earth, padding: 16, borderRadius: 8 },
  hlTitle: { fontSize: 11, fontWeight: 'bold', color: colors.white, marginBottom: 6 },
  hlDesc: { fontSize: 9, lineHeight: 1.5, color: colors.greyLight },

  // Two column
  twoCol: { flexDirection: 'row', gap: 24, marginTop: 16 },
  col: { flex: 1 },
  sectionImg: { width: '100%', borderRadius: 8, objectFit: 'cover' },

  // Testimonial
  tBox: { backgroundColor: colors.earth, padding: 24, borderRadius: 8, marginBottom: 0, alignItems: 'center' },
  tBoxBottom: { backgroundColor: colors.earth, padding: 24, borderRadius: 8, marginTop: 'auto', alignItems: 'center' },
  tQuote: { fontSize: 13, fontStyle: 'italic', color: colors.white, textAlign: 'center', lineHeight: 1.5, marginBottom: 12 },
  tName: { fontSize: 10, fontWeight: 'bold', color: colors.gold },
  tDetail: { fontSize: 8, color: colors.greyLight },

  // Gallery
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 16 },
  galleryImg: { width: '48.5%', height: 170, borderRadius: 6, objectFit: 'cover' },
  galleryImgSmall: { width: '48.5%', height: 120, borderRadius: 6, objectFit: 'cover' },

  // Itinerary
  itinDay: { flexDirection: 'row', marginBottom: 18, gap: 16 },
  dayNum: { width: 50, alignItems: 'center' },
  dayNumText: { fontSize: 28, fontWeight: 'bold', color: colors.gold, lineHeight: 1 },
  dayLabel: { fontSize: 8, textTransform: 'uppercase', letterSpacing: 1, color: colors.greyMid },
  dayContent: { flex: 1 },
  dayTitle: { fontSize: 13, fontWeight: 'bold', color: colors.white, marginBottom: 3 },
  daySub: { fontSize: 9, color: colors.gold, marginBottom: 5 },
  dayDesc: { fontSize: 9, lineHeight: 1.5, color: colors.greyLight },

  // Full image
  fullImg: { width: 595, height: 840, objectFit: 'cover' },

  // Crew
  crewRow: { flexDirection: 'row', gap: 16, marginBottom: 20, alignItems: 'flex-start' },
  crewPhoto: { width: 110, height: 110, borderRadius: 55, objectFit: 'cover' },
  crewInfo: { flex: 1 },
  crewName: { fontSize: 13, fontWeight: 'bold', color: colors.white, marginBottom: 3 },
  crewRole: { fontSize: 10, color: colors.gold, marginBottom: 5 },
  crewBio: { fontSize: 10, lineHeight: 1.6, color: colors.greyLight },

  // Lists
  listItem: { flexDirection: 'row', marginBottom: 6, alignItems: 'flex-start' },
  dot: { width: 5, height: 5, borderRadius: 2.5, marginRight: 8, marginTop: 5 },
  dotGold: { backgroundColor: colors.gold },
  dotGrey: { backgroundColor: colors.greyMid },
  listText: { fontSize: 10, lineHeight: 1.5, color: colors.greyLight, flex: 1 },

  // FAQ
  faqItem: { marginBottom: 16 },
  faqQ: { fontSize: 11, fontWeight: 'bold', color: colors.white, marginBottom: 4 },
  faqA: { fontSize: 10, lineHeight: 1.5, color: colors.greyLight },

  // Pricing
  priceCenter: { alignItems: 'center', marginTop: 20, marginBottom: 24 },
  priceMain: { fontSize: 48, fontWeight: 'bold', color: colors.gold, marginBottom: 8 },
  priceNote: { fontSize: 10, color: colors.greyLight, marginBottom: 16 },
  dateCards: { flexDirection: 'row', gap: 14, marginBottom: 16 },
  dateCard: { backgroundColor: 'rgba(44, 30, 15, 0.8)', padding: 14, borderRadius: 8, alignItems: 'center', minWidth: 110 },
  dateLabel: { fontSize: 7, color: colors.greyLight, marginBottom: 3 },
  dateValue: { fontSize: 9, fontWeight: 'bold', color: colors.white },

  // CTA
  ctaBtn: { backgroundColor: colors.gold, padding: '14 28', borderRadius: 8, alignItems: 'center', marginBottom: 24 },
  ctaBtnText: { fontSize: 10, fontWeight: 'bold', color: colors.deep },
  contactInfo: { alignItems: 'center', gap: 6 },
  contactText: { fontSize: 9, color: colors.greyLight },
  link: { color: colors.gold, textDecoration: 'none' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

// ==================== DATA ====================
const data = {
  meta: [
    { label: 'Duration', value: '13 Days / 12 Nights' },
    { label: 'Location', value: 'Serengeti, Tanzania' },
    { label: 'Group Size', value: 'Max 8 Guests' },
    { label: 'From', value: 'US$23,750' },
  ],

  highlights: [
    { title: '5 Days in the Central Serengeti', desc: 'Prime big cat territory with lions, cheetahs, and leopards. Daily private guided game drives with Chris Fallows.' },
    { title: 'Photography Masterclasses', desc: 'Hands-on wildlife photography guidance from one of the world\'s most published nature photographers. Plus editing sessions.' },
    { title: 'The Great Migration', desc: 'Witness over two million wildebeest, zebra, and gazelles streaming across the plains. A spectacle like no other.' },
    { title: 'Luxury Asilia Lodges', desc: 'Three hand-picked camps: Usangu, Namiri, and Dunia. Africa\'s finest, including the first female-run luxury camp.' },
    { title: 'All-Inclusive Experience', desc: 'Every meal, all internal flights, airport transfers, daily guided safaris, and a personal gallery of trip highlights by Chris.' },
    { title: 'Expert Conservation Stories', desc: 'Chris has spent 30+ years in the wild. His stories of sharks, lions, and conservation efforts make every evening unforgettable.' },
  ],

  aboutTexts: [
    "Step into the wild heart of the Serengeti on an extraordinary 13-day journey led by world-renowned wildlife photographer Chris Fallows. Limited to just 8 guests, this intimate safari offers unrivalled photographic opportunities, immersive wildlife encounters, and expert guidance in one of nature's greatest theatres.",
    "Stay in exquisite luxury at Asilia's renowned lodges, Usangu, Namiri, and Dunia. Each location offers a unique window into Tanzania's breathtaking landscapes, from vast plains to hidden wildlife-rich havens. Dunia, Africa's first female-run luxury camp, provides not only world-class comfort but also an inspiring story of empowerment and resilience.",
    "Throughout the journey, Chris Fallows leads hands-on photography masterclasses, helping you hone your skills and capture the magic of the Serengeti through your lens. Focus your camera on majestic big cats, towering elephants, and herds of wildebeest as they traverse the savanna.",
    "Whether you're an aspiring photographer or a seasoned enthusiast, this journey deepens your connection with Tanzania's untamed beauty while elevating your craft. With expert guides, intimate campfire evenings, and the chance to witness Africa's raw splendour, this is more than a safari. It's a story waiting to be captured.",
  ],

  testimonial1: {
    quote: "Chris is a once in a lifetime guide. His knowledge of wildlife behaviour meant we were always in the right place. I've done safaris before but nothing comes close to this level of access and intimacy.",
    name: 'Guest Review',
    detail: 'Tanzania expedition',
  },
  testimonial2: {
    quote: "The photography masterclasses alone were worth the trip. Chris teaches you to see the wild differently. Add the luxury camps and the migration, and it's the greatest experience I've ever had.",
    name: 'Guest Review',
    detail: 'Tanzania expedition',
  },

  guideBio: [
    "Chris Fallows is a renowned South African wildlife photographer and conservationist who has spent over 30 years capturing breathtaking images of the natural world. His groundbreaking work began in 1996 when he became the first to photograph a great white shark breaching near Seal Island, South Africa, a moment that has since become iconic.",
    "Known as a pioneer in wildlife storytelling, Chris's work has been featured in over 60 international documentaries, including Planet Earth and Shark Week, as well as in more than 500 publications worldwide.",
    "His philosophy underscores the responsibility of photographers to use their art to raise awareness and drive conservation, ensuring future generations can experience the wonders of the natural world.",
  ],

  bigCatsText: [
    "In Tanzania's legendary Serengeti, the Great Migration is one of nature's greatest spectacles. As seasonal rains refresh the plains, more than two million wildebeest stream forward, joined by huge numbers of zebras and gazelles.",
    "Lions rest on rocky kopjes, watching for the perfect moment, while leopards wait patiently in the branches of acacia trees. Cheetahs glide across the grasslands, exploding into breathtaking sprints when the chance appears.",
    "The arrival of the herds transforms the plains into a vivid, moving picture. Great clouds of dust rise as thousands flow forward, river crossings become dramatic scenes of courage and chaos. Big cats move through the throng, their golden coats standing out sharply against the swirling dust and golden grass.",
  ],

  itinerary: [
    { day: '1', label: 'Day', title: 'Welcome to Tanzania', sub: 'Arrive in Kilimanjaro', desc: 'Airport transfers to your pre-trip accommodation near Kilimanjaro. Meet Chris and your fellow travellers over a welcome dinner. Rest up for the adventure ahead.' },
    { day: '2', label: 'Day', title: 'Into the Serengeti', sub: 'Fly to Usangu', desc: 'Internal flight to Usangu Wetlands in Ruaha National Park. Settle into camp and head out for your first afternoon game drive. Dinner at camp under the stars.' },
    { day: '3-5', label: 'Days', title: 'Usangu Wetlands', sub: 'Big Cats, Elephants & Antelopes', desc: 'Daily private guided safaris searching for big cats, elephants, giraffes, and rare sable and roan antelopes. Chris leads photography masterclasses on reading light, composition, and animal behaviour. Evenings around the campfire with stories from 30 years in the wild.' },
    { day: '6', label: 'Day', title: 'Transfer to Namiri Plains', sub: 'Heart of Cheetah Country', desc: 'Travel as a group to Namiri Plains, famous for its high concentration of big cats. This remote corner of the Serengeti is prime cheetah and leopard territory. Optional spa treatments at camp.' },
    { day: '7-9', label: 'Days', title: 'Namiri Plains', sub: 'Lions, Cheetahs & Leopards', desc: 'Expect to encounter majestic lions, sleek cheetahs, and elusive leopards. Chris guides your photography as predators hunt across the plains. Editing masterclass with Chris on perfecting your best images.' },
    { day: '10', label: 'Day', title: 'Transfer to Dunia Camp', sub: "Africa's First Female-Run Luxury Camp", desc: "Move to Dunia in the central Serengeti, where the Great Migration may be in full swing. Africa's first female-run luxury camp provides world-class comfort and an inspiring story." },
    { day: '11-12', label: 'Days', title: 'The Great Migration', sub: 'Wildebeest Herds & River Crossings', desc: 'Search for the massive herds of wildebeest journeying through the central Serengeti. Dramatic river crossings, dust clouds, and big cats following the herds. Final photography session and editing masterclass with Chris.' },
    { day: '13', label: 'Day', title: 'Farewell, Tanzania', sub: 'Departure', desc: 'Final morning at camp. Transfers to the airstrip for your flight home. Depart with a personal gallery of trip highlights curated by Chris Fallows.' },
  ],

  accomTexts: [
    "Your homes for the expedition are three luxury lodges hand-picked by Chris himself, all provided by Asilia, one of Africa's finest accommodation providers.",
    "Usangu Expedition Camp sits in the remote Usangu Wetlands of Ruaha National Park. Namiri Plains is a secluded gem in the eastern Serengeti, famous for big cat sightings. Dunia Camp, Africa's first female-run luxury camp, offers world-class comfort in the heart of the central Serengeti.",
    "Shared and private rooms available on request.",
  ],

  crew: [
    { name: 'Chris Fallows', role: 'Storyteller Guide', bio: 'World-renowned wildlife photographer and conservationist. Over 30 years in the field, 60+ documentaries, 500+ publications. Your expert for every wildlife encounter.', photo: 'chris-fallows-profile.jpg' },
    { name: 'Paul Rowsthorn', role: 'Expedition Director', bio: 'Founder of Airguides. Handles all logistics, travel planning, and coordination so all you have to do is show up and enjoy.', photo: img('') },
    { name: 'Asilia Guides', role: 'Local Safari Guides', bio: "Expert local guides provided by Asilia at each camp. Born and raised in Tanzania, they know the Serengeti's wildlife intimately.", photo: img('') },
  ],

  included: [
    '1 night pre-trip accommodation near Kilimanjaro',
    '10 nights luxury safari camp (Usangu, Namiri, Dunia)',
    'Welcome dinner',
    'All meals: daily breakfast, lunch, and dinner',
    'All internal flights and transfers',
    'Daily private guided photography safari tours',
    'Storyteller guide Chris Fallows throughout',
    'Dedicated Airguides Expedition Leader',
    'Interactive safari photography masterclasses',
    'Editing masterclasses with Chris',
    'Personal gallery of trip highlights by Chris Fallows',
    'Small group of only 8 guests',
  ],

  notIncluded: [
    'International flights to/from Kilimanjaro (JRO)',
    'Travel insurance (required)',
    'Tanzania visa (available on arrival, ~US$50)',
    'Spa treatments at Namiri Camp',
    'Personal expenses and gratuities',
    'Alcoholic beverages (beyond camp inclusions)',
  ],

  faq: [
    { q: 'Do I need photography experience?', a: "Not at all. Chris caters to all levels, from smartphone shooters to professional photographers. You'll learn techniques that transform your images regardless of your starting point." },
    { q: 'What camera gear should I bring?', a: 'Chris will provide a recommended gear list after booking. A camera with a telephoto lens (200-400mm range) is ideal, but not essential. Many guests shoot on smaller mirrorless cameras or even phones.' },
    { q: 'How do I get to Kilimanjaro?', a: 'Fly into Kilimanjaro International Airport (JRO). Common routes via Doha, Dubai, Nairobi, or Addis Ababa. Our team will help coordinate your travel once booked.' },
    { q: 'Do I need vaccinations?', a: 'Yellow fever vaccination is recommended and may be required depending on your country of origin. Consult your travel doctor for malaria prophylaxis and other recommendations.' },
    { q: 'How physically demanding is the trip?', a: 'Not demanding at all. Most game drives are from comfortable vehicles. Walking is minimal and on flat terrain around the camps.' },
    { q: 'Are private or custom departures available?', a: 'Yes. We offer both scheduled group departures and fully private expeditions. Contact us at paul@airguides.com for options.' },
  ],

  dates: [
    { label: 'Trip 1', value: 'Jun - Jul 2026' },
    { label: 'Trip 2', value: 'Jun - Jul 2027' },
  ],
};

// Only use crew members with real photos
const crewWithPhotos = [data.crew[0]]; // Chris only for now

const TanzaniaBrochure = e(Document, null,

  // ==================== PAGE 1: COVER ====================
  e(Page, { size: 'A4', style: s.coverPage },
    e(Image, { src: img('hero-serengeti.jpg'), style: s.heroBg }),
    e(View, { style: s.heroOverlay }),
    e(View, { style: s.heroContent },
      e(Image, { src: img('airguides-logo-white.png'), style: s.logo }),
      e(View, { style: s.heroCenter },
        e(Text, { style: s.heroTag }, 'Safari Expedition'),
        e(Text, { style: s.heroTitle }, 'Big Cats & The\nGreat Migration'),
        e(Text, { style: s.heroSub }, '13 days in the Serengeti with world-renowned wildlife photographer Chris Fallows. Luxury camps. Max 8 guests. The greatest wildlife show on Earth.')
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
    e(Text, { style: s.sectionTitle }, 'What Makes This Trip Extraordinary'),
    e(View, { style: s.hlGrid },
      ...data.highlights.map((h, i) => e(View, { key: i, style: s.hlCard },
        e(Text, { style: s.hlTitle }, h.title),
        e(Text, { style: s.hlDesc }, h.desc)
      ))
    )
  ),

  // ==================== PAGE 3: ABOUT + testimonial ====================
  e(Page, { size: 'A4', style: s.pageEarth },
    e(Text, { style: s.sectionLabel }, 'About the Experience'),
    e(Text, { style: s.sectionTitle }, 'Into the Wild Heart of the Serengeti'),
    e(View, { style: s.twoCol },
      e(View, { style: s.col },
        e(Text, { style: s.body }, data.aboutTexts[0]),
        e(Text, { style: s.body }, data.aboutTexts[1])
      ),
      e(View, { style: s.col },
        e(Image, { src: img('gallery-web-1.jpg'), style: [s.sectionImg, { height: 240 }] })
      )
    ),
    e(Text, { style: [s.body, { marginTop: 12 }] }, data.aboutTexts[2]),
    e(Text, { style: s.body }, data.aboutTexts[3]),
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
    e(Text, { style: s.sectionTitle }, 'Chris Fallows'),
    e(View, { style: s.twoCol },
      e(View, { style: s.col },
        ...data.guideBio.map((t, i) => e(Text, { key: i, style: s.body }, t))
      ),
      e(View, { style: s.col },
        e(Image, { src: img('chris-fallows-profile.jpg'), style: [s.sectionImg, { height: 340 }] })
      )
    )
  ),

  // ==================== PAGE 5: BIG CATS (bg image) ====================
  e(Page, { size: 'A4', style: s.bgPage },
    e(Image, { src: img('bg-whybook.jpg'), style: s.bgImg }),
    e(View, { style: [s.bgOverlay, { backgroundColor: 'rgba(26, 18, 8, 0.82)' }] }),
    e(View, { style: s.bgContent },
      e(Text, { style: s.sectionLabel }, 'The Serengeti'),
      e(Text, { style: s.sectionTitle }, 'Big Cats & The Great Migration'),
      ...data.bigCatsText.map((t, i) => e(Text, { key: i, style: s.body }, t))
    )
  ),

  // ==================== PAGE 6: GALLERY ====================
  e(Page, { size: 'A4', style: s.page },
    e(Text, { style: s.sectionLabel }, 'Photo Gallery'),
    e(Text, { style: s.sectionTitle }, 'Through the Lens of Chris Fallows'),
    e(View, { style: s.galleryGrid },
      e(Image, { src: img('lions-14.jpg'), style: s.galleryImg }),
      e(Image, { src: img('cheetah-7.jpg'), style: s.galleryImg }),
      e(Image, { src: img('elephant.jpg'), style: s.galleryImg }),
      e(Image, { src: img('migration.jpg'), style: s.galleryImg })
    )
  ),

  // ==================== PAGE 7: ITINERARY (part 1) ====================
  e(Page, { size: 'A4', style: s.pageEarth },
    e(Text, { style: s.sectionLabel }, 'Itinerary'),
    e(Text, { style: s.sectionTitle }, 'Your 13-Day Journey'),
    ...data.itinerary.slice(0, 5).map((d, i) => e(View, { key: i, style: s.itinDay },
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

  // ==================== PAGE 8: ITINERARY (part 2) ====================
  e(Page, { size: 'A4', style: s.pageEarth },
    ...data.itinerary.slice(5).map((d, i) => e(View, { key: i, style: s.itinDay },
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

  // ==================== PAGE 9: FULL PAGE IMAGE ====================
  e(Page, { size: 'A4', style: s.coverPage },
    e(Image, { src: img('gallery-web-3.jpg'), style: s.fullImg })
  ),

  // ==================== PAGE 10: ACCOMMODATION ====================
  e(Page, { size: 'A4', style: s.page },
    e(Text, { style: s.sectionLabel }, 'Accommodation'),
    e(Text, { style: s.sectionTitle }, 'Luxury Safari Camps'),
    e(View, { style: s.twoCol },
      e(View, { style: s.col },
        ...data.accomTexts.map((t, i) => e(Text, { key: i, style: s.body }, t))
      ),
      e(View, { style: s.col },
        e(Image, { src: img('camp-1.jpg'), style: [s.sectionImg, { height: 240 }] })
      )
    ),
    e(View, { style: s.galleryGrid },
      e(Image, { src: img('camp-2.jpg'), style: s.galleryImgSmall }),
      e(Image, { src: img('camp-3.jpg'), style: s.galleryImgSmall }),
      e(Image, { src: img('camp-5.jpg'), style: s.galleryImgSmall }),
      e(Image, { src: img('camp-6.jpg'), style: s.galleryImgSmall })
    )
  ),

  // ==================== PAGE 11: GUIDE BIO + testimonial 2 ====================
  e(Page, { size: 'A4', style: s.pageEarth },
    e(Text, { style: s.sectionLabel }, 'Photography Masterclasses'),
    e(Text, { style: s.sectionTitle }, 'Learn from a Master'),
    e(Text, { style: s.body }, "Chris has lived his life in the most remote places of Africa. Listen as he shares stories of the big cats and important conservation efforts."),
    e(Text, { style: s.body }, "Learn from a true master of his craft. Chris is one of the world's best known photographers. Learn how he sets up his camera and frames the perfect shots."),
    e(Text, { style: s.body }, "Dive into the fundamentals of photography with Chris as he teaches techniques he uses. Chris will run masterclasses in editing showing the techniques used to perfect an image, as well as different tricks he's picked up over the years."),
    e(View, { style: { marginTop: 'auto' } },
      e(View, { style: s.tBoxBottom },
        e(Text, { style: s.tQuote }, `\u201C${data.testimonial2.quote}\u201D`),
        e(Text, { style: s.tName }, data.testimonial2.name),
        e(Text, { style: s.tDetail }, data.testimonial2.detail)
      )
    )
  ),

  // ==================== PAGE 12: WHAT'S INCLUDED ====================
  e(Page, { size: 'A4', style: s.page },
    e(Text, { style: s.sectionLabel }, "What's Included"),
    e(Text, { style: s.sectionTitle }, 'All-Inclusive Safari Experience'),
    e(Text, { style: [s.bodyLead, { marginBottom: 12, fontWeight: 'bold' }] }, 'Included'),
    ...data.included.map((item, i) => e(View, { key: i, style: s.listItem },
      e(View, { style: [s.dot, s.dotGold] }),
      e(Text, { style: s.listText }, item)
    )),
    e(Text, { style: [s.bodyLead, { marginBottom: 12, marginTop: 20, fontWeight: 'bold' }] }, 'Not Included'),
    ...data.notIncluded.map((item, i) => e(View, { key: i, style: s.listItem },
      e(View, { style: [s.dot, s.dotGrey] }),
      e(Text, { style: s.listText }, item)
    ))
  ),

  // ==================== PAGE 13: FAQ (blurred bg) ====================
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

  // ==================== PAGE 14: PRICING (blurred bg, centred) ====================
  e(Page, { size: 'A4', style: s.bgPage },
    e(Image, { src: img('bg-pricing.jpg'), style: s.bgImg }),
    e(View, { style: s.bgOverlay }),
    e(View, { style: [s.bgContent, { justifyContent: 'center', alignItems: 'center' }] },
      e(Text, { style: [s.sectionLabel, { textAlign: 'center' }] }, 'Pricing & Dates'),
      e(Text, { style: [s.sectionTitle, { textAlign: 'center' }] }, 'Secure Your Spot'),
      e(View, { style: s.priceCenter },
        e(Text, { style: s.priceMain }, 'US$23,750'),
        e(Text, { style: s.priceNote }, 'per person, all-inclusive'),
        e(Text, { style: [s.body, { textAlign: 'center' }] }, 'Deposit: US$5,000. Balance due 90 days prior to departure.')
      ),
      e(View, { style: s.dateCards },
        ...data.dates.map((d, i) => e(View, { key: i, style: s.dateCard },
          e(Text, { style: s.dateLabel }, d.label),
          e(Text, { style: s.dateValue }, d.value)
        ))
      ),
      e(Text, { style: [s.body, { textAlign: 'center' }] }, 'Maximum 8 guests per departure.'),
      e(Text, { style: [s.body, { textAlign: 'center' }] }, 'Private expeditions available on request.')
    )
  ),

  // ==================== PAGE 15: CTA (blurred bg) ====================
  e(Page, { size: 'A4', style: s.bgPage },
    e(Image, { src: img('bg-cta.jpg'), style: s.bgImg }),
    e(View, { style: s.bgOverlay }),
    e(View, { style: [s.bgContent, { justifyContent: 'center', alignItems: 'center' }] },
      e(Text, { style: [s.sectionTitle, { textAlign: 'center' }] }, 'Ready to Join Us?'),
      e(Text, { style: [s.bodyLead, { textAlign: 'center', marginBottom: 24 }] }, "This is your invitation to witness the greatest wildlife show on Earth alongside one of the world's finest nature photographers."),
      e(Link, { src: 'https://www.airguides.com/product/tanzania-big-cats-and-the-great-migration', style: { textDecoration: 'none' } },
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

console.log('Generating Tanzania brochure...');
console.time('PDF generated');
await renderToFile(TanzaniaBrochure, process.argv[2] || 'tanzania-big-cats.pdf');
console.timeEnd('PDF generated');
console.log(`Saved to: ${process.argv[2] || 'tanzania-big-cats.pdf'}`);
