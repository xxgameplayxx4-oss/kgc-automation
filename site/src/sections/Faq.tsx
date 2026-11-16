import { VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Collapsible, CollapsibleGroup } from '@astryxdesign/core/Collapsible';
import { AUTOMATION_MONTHLY, AUTOPILOT_MONTHLY, CARE, DOMAIN_FEE, CORE_PRICE, PRO_PRICE, UPGRADE_PRICE, chf, useT, type T } from '../data';

const ITEMS: { q: T; a: T }[] = [
  { q: { de: 'Was kostet der Anfragen-Autopilot?', en: 'What does the Enquiry Autopilot cost?' }, a: { de: `Ab ${chf(AUTOPILOT_MONTHLY)} pro Monat, ohne Einrichtungsgebühr. Der genaue Preis hängt davon ab, wie viele Kanäle angebunden werden.`, en: `From ${chf(AUTOPILOT_MONTHLY)} per month, with no setup fee. The exact price depends on how many channels are connected.` } },
  { q: { de: 'Muss ich ein neues Programm lernen?', en: 'Do I have to learn a new program?' }, a: { de: 'Nein. Ich richte alles mit dem ein, was Sie schon nutzen: Telefon, E-Mail, WhatsApp, Ihr Kontaktformular oder Ihr Buchungstool.', en: 'No. I set everything up with what you already use: phone, email, WhatsApp, your contact form or your booking tool.' } },
  { q: { de: 'Geht etwas ohne meine Freigabe an Kunden raus?', en: 'Does anything go to customers without my approval?' }, a: { de: 'Offerten und Rechnungen nie. Sie sehen jeden Entwurf und geben ihn mit einem Tipp frei. Nur einfache Bestätigungen wie «Danke, wir melden uns» gehen automatisch raus.', en: 'Quotes and invoices never. You see every draft and approve it with one tap. Only simple confirmations like “Thanks, we’ll be in touch” go out automatically.' } },
  { q: { de: 'Wo liegen meine Daten?', en: 'Where is my data stored?' }, a: { de: 'In der Schweiz oder der EU. Ich sage Ihnen für jedes Programm genau, wo.', en: 'In Switzerland or the EU. I tell you exactly where for each tool.' } },
  { q: { de: 'Brauche ich eine neue Website dafür?', en: 'Do I need a new website for this?' }, a: { de: 'Nein. Die Automationen funktionieren mit Ihrer bestehenden Website. Eine neue lohnt sich erst, wenn die alte auf dem Handy nicht funktioniert oder veraltet ist.', en: 'No. The automations work with your existing website. A new one only pays off if the old one breaks on phones or is outdated.' } },
  { q: { de: 'Wie lange dauert eine neue Website?', en: 'How long does a new website take?' }, a: { de: 'Etwa 2 bis 3 Wochen ab dem Moment, in dem Ihre Unterlagen vollständig sind.', en: 'About 2 to 3 weeks from the moment your material is complete.' } },
  { q: { de: 'Was muss ich liefern?', en: 'What do I need to provide?' }, a: { de: 'Texte, Logo und Fotos. Wenn etwas fehlt, helfe ich gerne beim Formulieren und bei der Bildauswahl.', en: 'Texts, logo and photos. If something is missing, I am happy to help with wording and picking images.' } },
  { q: { de: 'Was kosten Hosting und Domain?', en: 'What do hosting and domain cost?' }, a: { de: `Hosting ist in der monatlichen Wartung enthalten (Core ${chf(CARE.core)}, Pro ${chf(CARE.pro)}). Die Domain kaufen Sie selbst und geben mir Zugang, oder ich kaufe und verwalte sie für + ${chf(DOMAIN_FEE)} pro Monat. Die Einrichtung ist im Paket enthalten.`, en: `Hosting is included in the monthly maintenance (Core ${chf(CARE.core)}, Pro ${chf(CARE.pro)}). You buy the domain yourself and give me access, or I buy and manage it for + ${chf(DOMAIN_FEE)} per month. Setup is included in the package.` } },
  { q: { de: 'Kann ich Inhalte später ändern?', en: 'Can I change content later?' }, a: { de: 'Ja. Schreiben Sie mir, was angepasst werden soll. Kleine Änderungen erledige ich schnell, grössere bespreche ich vorab mit Ihnen. Preisliste und offene Stellen können Sie auf Wunsch auch selbst anpassen.', en: 'Yes. Tell me what to change. I handle small edits quickly and discuss larger ones with you first. If you like, you can also edit your price list and job openings yourself.' } },
  { q: { de: 'Was kostet eine Website?', en: 'What does a website cost?' }, a: { de: `Alles zum Fixpreis: Upgrade Ihrer bestehenden Website ab ${chf(UPGRADE_PRICE)}, Core ${chf(CORE_PRICE)}, Pro ${chf(PRO_PRICE)}.`, en: `All at a fixed price: upgrade of your existing website from ${chf(UPGRADE_PRICE)}, Core ${chf(CORE_PRICE)}, Pro ${chf(PRO_PRICE)}.` } },
  { q: { de: 'Was ist der Unterschied zwischen Core und Pro?', en: 'What is the difference between Core and Pro?' }, a: { de: 'Core enthält alles Wichtige für eine gute Geschäfts-Website. Pro bringt zusätzlich alle individuellen Funktionen: Startbereich mit Film, Buchung, Preisrechner, Wochenplan, Unterseiten, zweite Sprache, offene Stellen und Newsletter.', en: 'Core has everything a good business website needs. Pro adds every custom feature: hero with film, booking, price calculator, weekly schedule, subpages, second language, job openings and newsletter.' } },
  { q: { de: 'Kann ich nur Automationen buchen?', en: 'Can I book only automations?' }, a: { de: `Ja. Der Anfragen-Autopilot (Anfragen beantworten und nachfassen) startet ab ${chf(AUTOPILOT_MONTHLY)} pro Monat. Das Automation Add-on bündelt alle Automationen und gibt es ab ${chf(AUTOMATION_MONTHLY)} pro Monat. Beides ist mit oder ohne neue Website buchbar.`, en: `Yes. The Enquiry Autopilot (answering and following up enquiries) starts at ${chf(AUTOPILOT_MONTHLY)} per month. The Automation Add-on bundles all automations and starts at ${chf(AUTOMATION_MONTHLY)} per month. Both can be booked with or without a new website.` } },
  { q: { de: 'Gehört die Website mir?', en: 'Do I own the website?' }, a: { de: 'Ja. Nach der Schlusszahlung gehören Ihnen die Website und alle Inhalte. Sie erhalten die Dateien auf Wunsch.', en: 'Yes. After final payment the website and all content belong to you. You can have the files on request.' } },
];

export default function Faq() {
  const t = useT();
  return (
    <VStack id="faq" as="section" gap={5} paddingInline={4} paddingBlock={10} maxWidth={760} style={{ marginInline: 'auto', width: '100%' }}>
      <Heading level={1} type="display-3">{t({ de: 'Häufige Fragen', en: 'FAQ' })}</Heading>
      <CollapsibleGroup type="single" hasDividers>
        {ITEMS.map((it, i) => (
          <Collapsible key={i} value={String(i)} trigger={<Text weight="medium">{t(it.q)}</Text>}>
            <Text color="secondary">{t(it.a)}</Text>
          </Collapsible>
        ))}
      </CollapsibleGroup>
    </VStack>
  );
}
