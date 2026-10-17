import { Document, Link, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";

import { formatPence } from "~/lib/numbers";
import { formatUkDate } from "~/lib/quote/dates";
import { VAT_RATE_PERCENT, type QuoteDocument } from "~/lib/quote/quote";

// The A4 quote PDF (design-system.md §9.12): ink on white, decorator's name biggest after the
// total, selectable text, "Made with PriceBrush" mark (Free). Loaded only when someone presses
// "Download PDF", so react-pdf never weighs down the page.
//
// Fonts: the built-in Helvetica for now (Archivo isn't self-hosted yet). Its encoding covers
// £, —, ·, ², × and Western European letters; other scripts would need an embedded font.

const INK = "#14201A";
const INK_SECONDARY = "#46524B";
const RULE = "#DCD5C6";

const styles = StyleSheet.create({
  page: { paddingTop: 48, paddingBottom: 64, paddingHorizontal: 48, fontFamily: "Helvetica", fontSize: 10.5, color: INK, lineHeight: 1.4 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  businessName: { fontFamily: "Helvetica-Bold", fontSize: 20, lineHeight: 1.2 },
  secondary: { color: INK_SECONDARY },
  documentType: { fontFamily: "Helvetica-Bold", fontSize: 16, lineHeight: 1.2, textAlign: "right" },
  documentNumber: { marginTop: 2, textAlign: "right", color: INK_SECONDARY },
  metaGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 28, borderTopWidth: 1, borderTopColor: RULE, paddingTop: 12 },
  metaItem: { width: "50%", marginBottom: 8, paddingRight: 12 },
  metaLabel: { fontSize: 9, color: INK_SECONDARY },
  tableHeader: { flexDirection: "row", marginTop: 20, paddingBottom: 6, borderBottomWidth: 1.5, borderBottomColor: INK },
  tableHeaderText: { fontFamily: "Helvetica-Bold", fontSize: 9 },
  lineRow: { flexDirection: "row", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: RULE },
  lineDescription: { flex: 1, paddingRight: 16 },
  lineTitle: { fontFamily: "Helvetica-Bold" },
  lineDetail: { fontSize: 9.5, color: INK_SECONDARY },
  lineAmount: { width: 90, textAlign: "right" },
  totals: { marginTop: 12, marginLeft: "auto", width: 220 },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  grandTotalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 4, paddingTop: 8, borderTopWidth: 1.5, borderTopColor: INK },
  grandTotalText: { fontFamily: "Helvetica-Bold", fontSize: 14 },
  notesBlock: { marginTop: 28 },
  notesHeading: { fontFamily: "Helvetica-Bold", marginBottom: 4 },
  footer: { position: "absolute", bottom: 28, left: 48, right: 48, flexDirection: "row", justifyContent: "space-between", fontSize: 8.5, color: INK_SECONDARY },
  watermarkLink: { color: INK_SECONDARY, textDecoration: "none" },
});

export function QuotePdf({ quote }: { quote: QuoteDocument }) {
  const contactParts = [quote.business.phone, quote.business.email].filter((part) => part !== "");
  const title = `Quote ${quote.quoteNumber}${quote.client.name ? ` for ${quote.client.name}` : ""}`;

  return (
    <Document title={title} author={quote.business.name || undefined} creator="PriceBrush" producer="PriceBrush" language="en-GB">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={{ maxWidth: "65%" }}>
            {quote.business.name !== "" && <Text style={styles.businessName}>{quote.business.name}</Text>}
            {contactParts.length > 0 && <Text style={styles.secondary}>{contactParts.join("  ·  ")}</Text>}
            {quote.business.address !== "" && <Text style={styles.secondary}>{quote.business.address}</Text>}
          </View>
          <View>
            <Text style={styles.documentType}>Quote</Text>
            {quote.quoteNumber !== "" && <Text style={styles.documentNumber}>{quote.quoteNumber}</Text>}
          </View>
        </View>

        <View style={styles.metaGrid}>
          {quote.client.name !== "" && <MetaItem label="For" value={quote.client.name} />}
          {quote.client.jobAddress !== "" && <MetaItem label="Job address" value={quote.client.jobAddress} />}
          <MetaItem label="Date" value={formatUkDate(quote.quoteDate)} />
          <MetaItem label="Valid until" value={formatUkDate(quote.validUntil)} />
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.lineDescription]}>Description</Text>
          <Text style={[styles.tableHeaderText, styles.lineAmount]}>Amount</Text>
        </View>
        {quote.lines.map((line) => (
          <View key={line.id} style={styles.lineRow} wrap={false}>
            <View style={styles.lineDescription}>
              <Text style={styles.lineTitle}>{line.description}</Text>
              {line.detail !== "" && <Text style={styles.lineDetail}>{line.detail}</Text>}
            </View>
            <Text style={styles.lineAmount}>{formatPence(line.amountPence)}</Text>
          </View>
        ))}

        <View style={styles.totals} wrap={false}>
          {quote.vatRegistered && (
            <>
              <View style={styles.totalsRow}>
                <Text>Subtotal</Text>
                <Text>{formatPence(quote.subtotalPence)}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text>VAT {VAT_RATE_PERCENT}%</Text>
                <Text>{formatPence(quote.vatPence)}</Text>
              </View>
            </>
          )}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalText}>Total</Text>
            <Text style={styles.grandTotalText}>{formatPence(quote.totalPence)}</Text>
          </View>
          {quote.vatRegistered && quote.vatNumber !== "" && (
            <Text style={[styles.secondary, { marginTop: 4, fontSize: 9 }]}>VAT number {quote.vatNumber}</Text>
          )}
        </View>

        <View style={styles.notesBlock} wrap={false}>
          <Text style={styles.notesHeading}>Notes</Text>
          <Text>{quote.materialsSentence}</Text>
          {quote.notes !== "" && <Text style={{ marginTop: 6 }}>{quote.notes}</Text>}
          <Text style={[styles.secondary, { marginTop: 6 }]}>
            This quote is valid until {formatUkDate(quote.validUntil)}.
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Link src="https://pricebrush.pages.dev/?ref=wm" style={styles.watermarkLink}>
            Made with PriceBrush: free quote tools for decorators
          </Link>
          <Text render={({ pageNumber, totalPages }) => (totalPages > 1 ? `Page ${pageNumber} of ${totalPages}` : "")} />
        </View>
      </Page>
    </Document>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaItem}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text>{value}</Text>
    </View>
  );
}

export function renderQuotePdf(quote: QuoteDocument): Promise<Blob> {
  return pdf(<QuotePdf quote={quote} />).toBlob();
}
