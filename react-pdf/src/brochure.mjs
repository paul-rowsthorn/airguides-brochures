import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import './fonts.mjs';
import { colors, styles } from './styles.mjs';
import { tongaData } from './data.mjs';

const e = React.createElement;

const pageStyles = StyleSheet.create({
  // Cover page
  coverPage: {
    backgroundColor: colors.deep,
    position: 'relative',
    padding: 0,
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(10, 22, 40, 0.6)',
  },
  heroContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 20,
  },
  heroText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  heroTag: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.teal,
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: 'Playfair',
    fontSize: 48,
    fontWeight: 700,
    color: colors.white,
    lineHeight: 1.1,
    marginBottom: 24,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 1.6,
    color: colors.sand,
    textAlign: 'center',
    maxWidth: 400,
  },
  heroMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(13, 40, 71, 0.9)',
    padding: 16,
    borderRadius: 8,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontFamily: 'Inter',
    fontSize: 7,
    color: colors.greyLight,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metaValue: {
    fontFamily: 'Inter',
    fontSize: 9,
    fontWeight: 600,
    color: colors.white,
  },

  // Highlights grid
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 20,
  },
  highlightCard: {
    width: '30%',
    backgroundColor: colors.ocean,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  highlightIcon: {
    fontSize: 20,
    marginBottom: 12,
  },
  highlightTitle: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: 600,
    color: colors.white,
    marginBottom: 8,
  },
  highlightDesc: {
    fontFamily: 'Inter',
    fontSize: 8,
    lineHeight: 1.6,
    color: colors.greyLight,
  },

  // Two column layout
  twoCol: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 20,
  },
  leftCol: {
    flex: 1,
  },
  rightCol: {
    flex: 1,
  },
  sectionImage: {
    width: '100%',
    borderRadius: 8,
  },

  // Testimonial
  testimonialBox: {
    backgroundColor: colors.ocean,
    padding: 30,
    borderRadius: 8,
    marginBottom: 30,
    alignItems: 'center',
  },
  testimonialQuote: {
    fontFamily: 'Playfair',
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.white,
    textAlign: 'center',
    lineHeight: 1.5,
    marginBottom: 16,
  },
  testimonialName: {
    fontFamily: 'Inter',
    fontSize: 9,
    fontWeight: 600,
    color: colors.teal,
  },
  testimonialDetail: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.greyLight,
  },

  // Gallery
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
  },
  galleryImage: {
    width: '48%',
    height: 180,
    borderRadius: 8,
  },

  // Itinerary
  itinDay: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 20,
  },
  dayNumber: {
    width: 60,
    alignItems: 'center',
  },
  dayNum: {
    fontFamily: 'Playfair',
    fontSize: 32,
    fontWeight: 700,
    color: colors.teal,
    lineHeight: 1,
  },
  dayLabel: {
    fontFamily: 'Inter',
    fontSize: 7,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.greyMid,
  },
  dayContent: {
    flex: 1,
  },
  dayTitle: {
    fontFamily: 'Playfair',
    fontSize: 16,
    fontWeight: 600,
    color: colors.white,
    marginBottom: 4,
  },
  daySubtitle: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: colors.teal,
    marginBottom: 8,
  },
  dayDesc: {
    fontFamily: 'Inter',
    fontSize: 8,
    lineHeight: 1.6,
    color: colors.greyLight,
  },

  // Full page image
  fullPageImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  // Crew
  crewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 20,
  },
  crewMember: {
    width: '45%',
    marginBottom: 20,
  },
  crewPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  crewName: {
    fontFamily: 'Inter',
    fontSize: 9,
    fontWeight: 600,
    color: colors.white,
    marginBottom: 2,
  },
  crewRole: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.teal,
    marginBottom: 4,
  },
  crewBio: {
    fontFamily: 'Inter',
    fontSize: 7,
    lineHeight: 1.5,
    color: colors.greyLight,
  },

  // Lists
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  listDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 4,
  },
  listDotTeal: {
    backgroundColor: colors.teal,
  },
  listDotGrey: {
    backgroundColor: colors.greyMid,
  },
  listText: {
    fontFamily: 'Inter',
    fontSize: 8,
    lineHeight: 1.5,
    color: colors.greyLight,
    flex: 1,
  },

  // FAQ
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontFamily: 'Inter',
    fontSize: 9,
    fontWeight: 600,
    color: colors.white,
    marginBottom: 4,
  },
  faqAnswer: {
    fontFamily: 'Inter',
    fontSize: 8,
    lineHeight: 1.5,
    color: colors.greyLight,
  },

  // Pricing
  priceSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  priceMain: {
    fontFamily: 'Playfair',
    fontSize: 48,
    fontWeight: 700,
    color: colors.teal,
    marginBottom: 8,
  },
  priceNote: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: colors.greyLight,
    marginBottom: 20,
  },
  dateCards: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  dateCard: {
    backgroundColor: colors.ocean,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 120,
  },
  dateLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    color: colors.greyLight,
    marginBottom: 4,
  },
  dateValue: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: 600,
    color: colors.white,
  },

  // CTA
  ctaButton: {
    backgroundColor: colors.teal,
    padding: '16 32',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: 600,
    color: colors.deep,
  },
  contactInfo: {
    alignItems: 'center',
    gap: 8,
  },
  contactText: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: colors.greyLight,
  },
});

export const TongaBrochure = () => {
  const data = tongaData;

  return e(Document, null,
    // COVER PAGE
    e(Page, { size: "A4", style: pageStyles.coverPage },
      e(Image, { src: data.heroImage, style: pageStyles.heroImage }),
      e(View, { style: pageStyles.heroOverlay }),
      e(View, { style: pageStyles.heroContent },
        e(Image, { src: data.logo, style: pageStyles.logo }),
        
        e(View, { style: pageStyles.heroText },
          e(Text, { style: pageStyles.heroTag }, data.tag),
          e(Text, { style: pageStyles.heroTitle }, data.title),
          e(Text, { style: pageStyles.heroSubtitle }, data.subtitle)
        ),

        e(View, { style: pageStyles.heroMeta },
          ...data.meta.map((item, i) =>
            e(View, { key: i, style: pageStyles.metaItem },
              e(Text, { style: pageStyles.metaLabel }, item.label),
              e(Text, { style: pageStyles.metaValue }, item.value)
            )
          )
        )
      )
    ),

    // HIGHLIGHTS
    e(Page, { size: "A4", style: styles.page },
      e(View, { style: styles.container },
        e(Text, { style: styles.sectionLabel }, "Experience Highlights"),
        e(Text, { style: styles.sectionTitle }, "What Makes This Trip Special"),
        
        e(View, { style: pageStyles.highlightsGrid },
          ...data.highlights.map((highlight, i) =>
            e(View, { key: i, style: pageStyles.highlightCard },
              e(Text, { style: pageStyles.highlightIcon }, highlight.icon),
              e(Text, { style: pageStyles.highlightTitle }, highlight.title),
              e(Text, { style: pageStyles.highlightDesc }, highlight.desc)
            )
          )
        )
      )
    ),

    // ABOUT THE EXPERIENCE
    e(Page, { size: "A4", style: styles.pageOcean },
      e(View, { style: styles.container },
        e(Text, { style: styles.sectionLabel }, "About the Experience"),
        e(Text, { style: styles.sectionTitle }, "Swimming with Gentle Giants"),
        
        e(View, { style: pageStyles.twoCol },
          e(View, { style: pageStyles.leftCol },
            ...data.aboutTexts.map((text, i) =>
              e(Text, { key: i, style: styles.bodyText }, text)
            )
          ),
          e(View, { style: pageStyles.rightCol },
            e(Image, { src: data.aboutImage, style: pageStyles.sectionImage })
          )
        )
      )
    ),

    // TESTIMONIAL 1 + YOUR GUIDE
    e(Page, { size: "A4", style: styles.page },
      e(View, { style: styles.container },
        e(View, { style: pageStyles.testimonialBox },
          e(Text, { style: pageStyles.testimonialQuote }, `"${data.testimonial1.quote}"`),
          e(Text, { style: pageStyles.testimonialName }, data.testimonial1.name),
          e(Text, { style: pageStyles.testimonialDetail }, data.testimonial1.detail)
        ),

        e(Text, { style: styles.sectionLabel }, "Your Guide"),
        e(Text, { style: styles.sectionTitle }, data.guideName),
        
        e(View, { style: pageStyles.twoCol },
          e(View, { style: pageStyles.leftCol },
            ...data.guideBio.map((text, i) =>
              e(Text, { key: i, style: styles.bodyText }, text)
            )
          ),
          e(View, { style: pageStyles.rightCol },
            e(Image, { src: data.guideImage, style: pageStyles.sectionImage })
          )
        )
      )
    ),

    // WHY BOOK
    e(Page, { size: "A4", style: styles.pageOcean },
      e(View, { style: styles.container },
        e(Text, { style: styles.sectionLabel }, "Why Book"),
        e(Text, { style: styles.sectionTitle }, "Beyond Tourist Whale-Watching"),
        
        ...data.whyBookTexts.map((text, i) =>
          e(Text, { key: i, style: styles.bodyText }, text)
        )
      )
    ),

    // PHOTO GALLERY
    e(Page, { size: "A4", style: styles.page },
      e(View, { style: styles.container },
        e(Text, { style: styles.sectionLabel }, "Photo Gallery"),
        e(Text, { style: styles.sectionTitle }, "Moments from Previous Trips"),
        
        e(View, { style: pageStyles.galleryGrid },
          ...data.galleryImages.map((image, i) =>
            e(Image, { key: i, src: image, style: pageStyles.galleryImage })
          )
        )
      )
    ),

    // ITINERARY
    e(Page, { size: "A4", style: styles.pageOcean },
      e(View, { style: styles.container },
        e(Text, { style: styles.sectionLabel }, "Itinerary"),
        e(Text, { style: styles.sectionTitle }, "Your 8-Day Journey"),
        
        ...data.itinerary.map((day, i) =>
          e(View, { key: i, style: pageStyles.itinDay },
            e(View, { style: pageStyles.dayNumber },
              e(Text, { style: pageStyles.dayNum }, day.day),
              e(Text, { style: pageStyles.dayLabel }, day.label)
            ),
            e(View, { style: pageStyles.dayContent },
              e(Text, { style: pageStyles.dayTitle }, day.title),
              e(Text, { style: pageStyles.daySubtitle }, day.subtitle),
              e(Text, { style: pageStyles.dayDesc }, day.desc)
            )
          )
        )
      )
    ),

    // FULL PAGE IMAGE
    e(Page, { size: "A4", style: [styles.page, { padding: 0 }] },
      e(Image, { src: data.fullImage, style: pageStyles.fullPageImage })
    ),

    // ACCOMMODATION
    e(Page, { size: "A4", style: styles.page },
      e(View, { style: styles.container },
        e(Text, { style: styles.sectionLabel }, "Accommodation"),
        e(Text, { style: styles.sectionTitle }, "Your Island Base"),
        
        e(View, { style: pageStyles.twoCol },
          e(View, { style: pageStyles.leftCol },
            ...data.accomTexts.map((text, i) =>
              e(Text, { key: i, style: styles.bodyText }, text)
            )
          ),
          e(View, { style: pageStyles.rightCol },
            e(Image, { src: data.accomImage, style: pageStyles.sectionImage })
          )
        ),

        e(View, { style: pageStyles.galleryGrid },
          ...data.accomGallery.map((image, i) =>
            e(Image, { key: i, src: image, style: pageStyles.galleryImage })
          )
        )
      )
    ),

    // THE BOAT
    e(Page, { size: "A4", style: styles.pageOcean },
      e(View, { style: styles.container },
        e(Text, { style: styles.sectionLabel }, "The Boat"),
        e(Text, { style: styles.sectionTitle }, "Zuzu & Skipper Al"),
        
        e(View, { style: pageStyles.twoCol },
          e(View, { style: pageStyles.leftCol },
            ...data.boatTexts.map((text, i) =>
              e(Text, { key: i, style: styles.bodyText }, text)
            )
          ),
          e(View, { style: pageStyles.rightCol },
            e(Image, { src: data.boatImage, style: pageStyles.sectionImage })
          )
        )
      )
    ),

    // TESTIMONIAL 2 + CREW
    e(Page, { size: "A4", style: styles.page },
      e(View, { style: styles.container },
        e(View, { style: pageStyles.testimonialBox },
          e(Text, { style: pageStyles.testimonialQuote }, `"${data.testimonial2.quote}"`),
          e(Text, { style: pageStyles.testimonialName }, data.testimonial2.name),
          e(Text, { style: pageStyles.testimonialDetail }, data.testimonial2.detail)
        ),

        e(Text, { style: styles.sectionLabel }, "Your Crew"),
        e(Text, { style: styles.sectionTitle }, "Meet the Team"),
        
        e(View, { style: pageStyles.crewGrid },
          ...data.crew.map((member, i) =>
            e(View, { key: i, style: pageStyles.crewMember },
              e(Image, { src: member.photo, style: pageStyles.crewPhoto }),
              e(Text, { style: pageStyles.crewName }, member.name),
              e(Text, { style: pageStyles.crewRole }, member.role),
              e(Text, { style: pageStyles.crewBio }, member.bio)
            )
          )
        )
      )
    ),

    // WHAT'S INCLUDED
    e(Page, { size: "A4", style: styles.pageOcean },
      e(View, { style: styles.container },
        e(Text, { style: styles.sectionLabel }, "What's Included"),
        e(Text, { style: styles.sectionTitle }, "All-Inclusive Experience"),
        
        e(View, { style: pageStyles.twoCol },
          e(View, { style: pageStyles.leftCol },
            e(Text, { style: [styles.bodyTextLead, { marginBottom: 16, fontWeight: 600 }] }, "Included"),
            e(View, { style: pageStyles.listContainer },
              ...data.included.map((item, i) =>
                e(View, { key: i, style: pageStyles.listItem },
                  e(View, { style: [pageStyles.listDot, pageStyles.listDotTeal] }),
                  e(Text, { style: pageStyles.listText }, item)
                )
              )
            )
          ),
          
          e(View, { style: pageStyles.rightCol },
            e(Text, { style: [styles.bodyTextLead, { marginBottom: 16, fontWeight: 600 }] }, "Not Included"),
            e(View, { style: pageStyles.listContainer },
              ...data.notIncluded.map((item, i) =>
                e(View, { key: i, style: pageStyles.listItem },
                  e(View, { style: [pageStyles.listDot, pageStyles.listDotGrey] }),
                  e(Text, { style: pageStyles.listText }, item)
                )
              )
            )
          )
        )
      )
    ),

    // FAQ
    e(Page, { size: "A4", style: styles.page },
      e(View, { style: styles.container },
        e(Text, { style: styles.sectionLabel }, "FAQ"),
        e(Text, { style: styles.sectionTitle }, "Everything You Need to Know"),
        
        ...data.faq.map((item, i) =>
          e(View, { key: i, style: pageStyles.faqItem },
            e(Text, { style: pageStyles.faqQuestion }, item.q),
            e(Text, { style: pageStyles.faqAnswer }, item.a)
          )
        )
      )
    ),

    // PRICING & DATES
    e(Page, { size: "A4", style: styles.pageOcean },
      e(View, { style: styles.container },
        e(Text, { style: styles.sectionLabel }, "Pricing & Dates"),
        e(Text, { style: styles.sectionTitle }, "Secure Your Spot"),
        
        e(View, { style: pageStyles.priceSection },
          e(Text, { style: pageStyles.priceMain }, data.price),
          e(Text, { style: pageStyles.priceNote }, data.priceNote),
          
          e(Text, { style: styles.bodyText }, `Deposit: ${data.deposit}. ${data.depositNote}`)
        ),

        e(View, { style: pageStyles.dateCards },
          ...data.dates.map((date, i) =>
            e(View, { key: i, style: pageStyles.dateCard },
              e(Text, { style: pageStyles.dateLabel }, date.label),
              e(Text, { style: pageStyles.dateValue }, date.value)
            )
          )
        ),

        e(Text, { style: styles.bodyText }, data.maxGuests),
        e(Text, { style: styles.bodyText }, data.spotsNote)
      )
    ),

    // CTA + FOOTER
    e(Page, { size: "A4", style: styles.page },
      e(View, { style: styles.container },
        e(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
          e(Text, { style: styles.sectionTitle }, "Ready to Join Us?"),
          e(Text, { style: styles.bodyTextLead }, "This is your invitation to one of the world's most extraordinary wildlife encounters."),
          
          e(View, { style: pageStyles.ctaButton },
            e(Text, { style: pageStyles.ctaText }, "Secure Your Spot")
          ),

          e(View, { style: pageStyles.contactInfo },
            e(Text, { style: pageStyles.contactText }, `Email: ${data.email}`),
            e(Text, { style: pageStyles.contactText }, `Phone: ${data.phone}`),
            e(Text, { style: pageStyles.contactText }, data.website)
          )
        )
      )
    )
  );
};