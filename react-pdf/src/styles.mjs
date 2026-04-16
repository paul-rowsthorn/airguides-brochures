import { StyleSheet } from '@react-pdf/renderer';

export const colors = {
  deep: '#0a1628',
  ocean: '#0d2847',
  teal: '#2dd4bf',
  sand: '#f5f0eb',
  white: '#ffffff',
  greyLight: '#94a3b8',
  greyMid: '#64748b',
};

export const styles = StyleSheet.create({
  // Page defaults
  page: {
    backgroundColor: colors.deep,
    fontFamily: 'Inter',
    color: colors.white,
  },
  pageOcean: {
    backgroundColor: colors.ocean,
    fontFamily: 'Inter',
    color: colors.white,
  },

  // Section label (teal uppercase)
  sectionLabel: {
    fontFamily: 'Inter',
    fontSize: 8,
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.teal,
    marginBottom: 8,
  },

  // Section title (Playfair)
  sectionTitle: {
    fontFamily: 'Playfair',
    fontSize: 28,
    fontWeight: 600,
    color: colors.white,
    lineHeight: 1.15,
    marginBottom: 16,
  },

  // Body text
  bodyText: {
    fontFamily: 'Inter',
    fontSize: 9,
    lineHeight: 1.7,
    color: colors.greyLight,
    marginBottom: 10,
  },

  bodyTextLead: {
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.6,
    color: colors.sand,
    marginBottom: 10,
  },

  // Container with padding
  container: {
    padding: '40 40 40 40',
    flex: 1,
  },
});
