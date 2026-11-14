import { VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Collapsible, CollapsibleGroup } from '@astryxdesign/core/Collapsible';
import { AUTOPILOT_MONTHLY, chf, useT, type T } from '../data';

const ITEMS: { q: T; a: T }[] = [
  { q: { de: 'Was kostet der Anfragen-Autopilot?', en: 'What does the Enquiry Autopilot cost?' }, a: { de: `Ab ${chf(AUTOPILOT_MONTHLY)} pro Monat, ohne Einrichtungsgebühr. Der genaue Preis hängt davon ab, wie viele Kanäle angebunden werden.`, en: `From ${chf(AUTOPILOT_MONTHLY)} per month, with no setup fee. The exact price depends on how many channels are connected.` } },
  { q: { de: 'Muss ich ein neues Programm lernen?', en: 'Do I have to learn a new program?' }, a: { de: 'Nein. Ich richte alles mit dem ein, was Sie schon nutzen: Telefon, E-Mail, WhatsApp, Ihr Kontaktformular oder Ihr Buchungstool.', en: 'No. I set everything up with what you already use: phone, email, WhatsApp, your contact form or your booking tool.' } },
  { q: { de: 'Geht etwas ohne meine Freigabe an Kunden raus?', en: 'Does anything go to customers without my approval?' }, a: { de: 'Offerten und Rechnungen nie. Sie sehen jeden Entwurf und geben ihn mit einem Tipp frei. Nur einfache Bestätigungen wie «Danke, wir melden uns» gehen automatisch raus.', en: 'Quotes and invoices never. You see every draft and approve it with one tap. Only simple confirmations like “Thanks, we’ll be in touch” go out automatically.' } },
  { q: { de: 'Wo liegen meine Daten?', en: 'Where is my data stored?' }, a: { de: 'In der Schweiz oder der EU. Ich sage Ihnen für jedes Programm genau, wo.', en: 'In Switzerland or the EU. I tell you exactly where for each tool.' } },
  { q: { de: 'Brauche ich eine neue Website dafür?', en: 'Do I need a new website for this?' }, a: { de: 'Nein. Die Automationen funktionieren mit Ihrer bestehenden Website. Eine neue lohnt sich erst, wenn die alte auf dem Handy nicht funktioniert oder veraltet ist.', en: 'No. The automations work with your existing website. A new one only pays off if the old one breaks on phones or is outdated.' } },
  { q: { de: 'Wie lange dauert eine neue Website?', en: 'How long does a new website take?' }, a: { de: 'Etwa 2 bis 3 Wochen ab dem Moment, in dem Ihre Unterlagen vollständig sind.', en: 'About 2 to 3 weeks from the moment your material is complete.' } },
  { q: { de: 'Was muss ich liefern?', en: 'What do I need to provide?' }, a: { de: 'Texte, Logo und Fotos. Wenn etwas fehlt, helfe ich gerne beim Formulieren und bei der Bildauswahl.', en: 'Texts, logo and photos. If something is missing, I am happy to help with wording and picking images.' } },
  { q: { de: 'Was kosten Hosting und Domain?', en: 'What do hosting and domain cost?' }, a: { de: 'Domain und Hosting verrechne ich zum Selbstkostenpreis, ohne Aufschlag. Die Einrichtung ist im Paket enthalten.', en: 'Domain and hosting are charged at cost, with no markup. Setup is included in the package.' } },
  { q: { de: 'Kann ich Inhalte später ändern?', en: 'Can I change content later?' }, a: { de: 'Ja. Schreiben Sie mir, was angepasst werden soll. Kleine Änderungen erledige ich schnell, grössere bespreche ich vorab mit Ihnen.', en: 'Yes. Tell me what to change. I handle small edits quickly and discuss larger ones with you first.' } },
  { q: { de: 'Was ist der Unterschied zwischen Basis und Pro?', en: 'What is the difference between Basic and Pro?' }, a: { de: 'Pro enthält zusätzlich einen individuell gestalteten Startbereich (der grosse Bereich ganz oben, mit Video, Animation oder Bildern) und eine E-Mail-Adresse mit Ihrer Domain.', en: 'Pro adds a custom-engineered hero section (video, animation or imagery) and an email address on your domain.' } },
  { q: { de: 'Gehört die Website mir?', en: 'Do I own the website?' }, a: { de: 'Ja. Nach der Schlusszahlung gehören Ihnen die Website und alle Inhalte. Sie erhalten die Dateien auf Wunsch.', en: 'Yes. After final payment the website and all content belong to you. You can have the files on request.' } },
];

export default function Faq() {
  const t = useT();
  return (
    <VStack id="faq" as="section" gap={5} paddingInline={4} paddingBlock={10} maxWidth={760} style={{ marginInline: 'auto', width: '100%' }}>
      <Heading level={2} type="display-3">{t({ de: 'Häufige Fragen', en: 'FAQ' })}</Heading>
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
