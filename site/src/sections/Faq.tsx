import { VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Collapsible, CollapsibleGroup } from '@astryxdesign/core/Collapsible';
import { useT, type T } from '../data';

const ITEMS: { q: T; a: T }[] = [
  { q: { de: 'Wie lange dauert es?', en: 'How long does it take?' }, a: { de: 'Etwa 2 bis 3 Wochen ab dem Moment, in dem Ihre Unterlagen vollständig sind.', en: 'About 2 to 3 weeks from the moment your material is complete.' } },
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
