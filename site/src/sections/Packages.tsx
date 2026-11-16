import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Badge } from '@astryxdesign/core/Badge';
import Eyebrow from './Eyebrow';
import HeroFilmDemo from './HeroFilmDemo';
import PhoneMore from './PhoneMore';
import { usePhone } from './usePhone';
import { AUTOMATIONS, AUTOMATION_MONTHLY, AUTOPILOT_MONTHLY, BASE_FEATURES, CARE, CARE_HOURS, DOMAIN_FEE, FEATURES, TIERS, UPGRADE_PRICE, chf, contactDraft, useT, type T } from '../data';
import { UI, ic } from './uiIcons';

const HERO_FILM: T = { de: 'Auf Wunsch komme ich vorbei und filme, wie man Ihr Geschäft betritt, geschnitten als kinoreifer Film für den Startbereich.', en: 'On request I come by and film walking into your business, cut as a cinematic film for the hero.' };
const [CORE, PRO] = TIERS;
const ul = { margin: 0, paddingInlineStart: 'var(--spacing-4)' };

export default function Packages() {
  const t = useT();
  const phone = usePhone();
  const cta = (subject: string, body = '') => () => { contactDraft.subject = subject; contactDraft.body = body; };
  const li = (k: string | number, x: T, bold = false) => <li key={k}><Text size="sm" weight={bold ? 'medium' : undefined}>{t(x)}</Text></li>;
  const coreItems: T[] = [...BASE_FEATURES, ...FEATURES.filter(f => CORE.includes.includes(f.id)).map(f => f.name)];
  const proOnly = FEATURES.filter(f => !CORE.includes.includes(f.id) && f.id !== 'hero');
  return (
    <VStack id="pakete" as="section" gap={6} paddingInline={4} paddingBlock={10} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
      <VStack gap={2}>
        <Eyebrow>{t({ de: 'Fixpreise', en: 'Fixed prices' })}</Eyebrow>
        <Heading level={1} type="display-3">{t({ de: 'Pakete', en: 'Packages' })}</Heading>
        <Text color="secondary">{t({ de: 'Websites zum Fixpreis. Wählen Sie Ihr Paket, den Rest erledige ich.', en: 'Websites at a fixed price. Pick your package, I take care of the rest.' })}</Text>
      </VStack>
      <Grid columns={{ minWidth: 240, max: 4 }} gap={4} align="stretch">
        <Card variant="muted" padding={phone ? 4 : 5}>
          <VStack gap={3}>
            <Heading level={3}>{t({ de: 'Website-Upgrade', en: 'Website upgrade' })}</Heading>
            <Text type="large" weight="semibold" color="accent">{t({ de: `ab ${chf(UPGRADE_PRICE)}`, en: `from ${chf(UPGRADE_PRICE)}` })}</Text>
            <Text color="secondary">{t({ de: 'Ihre Website wirkt veraltet? Ich baue aus Ihren Texten und Bildern eine neue, schnelle, mobile Website.', en: 'Website looking dated? I turn your texts and images into a new, fast, mobile website.' })}</Text>
            <Button icon={ic(UI.chat)} variant="secondary" href="#kontakt" label={t({ de: 'Upgrade anfragen', en: 'Request upgrade' })}
              onClick={cta('Website-Upgrade', t({ de: 'Meine aktuelle Website: ', en: 'My current website: ' }))} />
          </VStack>
        </Card>
        <Card padding={phone ? 4 : 5}>
          <VStack gap={3}>
            <Heading level={3}>{t(CORE.name)}</Heading>
            <Text type="large" weight="semibold" color="accent">{chf(CORE.price)}</Text>
            <Text color="secondary">{t(CORE.tagline)}</Text>
            <PhoneMore items={coreItems} limit={4}>{shown => (
              <VStack gap={1.5} as="ul" style={ul}>
                {shown.map((x, i) => li('c' + i, x))}
              </VStack>
            )}</PhoneMore>
            <Button icon={ic(UI.chat)} variant="secondary" href="#kontakt" label={t({ de: 'Core anfragen', en: 'Request Core' })} onClick={cta('Website Core')} />
          </VStack>
        </Card>
        <Card variant="yellow" elevation="low" padding={phone ? 4 : 5}>
          <VStack gap={3}>
            <HStack gap={2} vAlign="center" wrap="wrap">
              <Heading level={3}>{t(PRO.name)}</Heading>
              <Badge variant="yellow" label={t({ de: 'Empfohlen', en: 'Recommended' })} />
            </HStack>
            <Text type="large" weight="semibold" color="accent">{chf(PRO.price)}</Text>
            <Text color="secondary">{t(PRO.tagline)}</Text>
            <PhoneMore items={proOnly} limit={2}>{shown => (
            <VStack gap={1.5} as="ul" style={ul}>
              {li('all', { de: 'Alles aus Core, plus:', en: 'Everything in Core, plus:' }, true)}
              {li('hero', { de: 'Individueller Startbereich mit Film', en: 'Custom hero with film' }, true)}
              {shown.map(f => li(f.id, f.name))}
            </VStack>
            )}</PhoneMore>
            <Card variant="muted" padding={3}>
              <VStack gap={2} hAlign="start">
                {!phone && <Text size="sm">{t(HERO_FILM)}</Text>}
                <Button icon={ic(UI.play)} size="sm" variant="secondary" href="#film-demo" label={t({ de: 'Demo ansehen', en: 'View demo' })} />
              </VStack>
            </Card>
            <Button icon={ic(UI.chat)} variant="primary" href="#kontakt" label={t({ de: 'Pro anfragen', en: 'Request Pro' })} onClick={cta('Website Pro')} />
          </VStack>
        </Card>
        <Card padding={phone ? 4 : 5}>
          <VStack gap={3}>
            <Heading level={3}>{t({ de: 'Automation Add-on', en: 'Automation add-on' })}</Heading>
            <Text type="large" weight="semibold" color="accent">{t({ de: `ab ${chf(AUTOMATION_MONTHLY)} / Monat`, en: `from ${chf(AUTOMATION_MONTHLY)} / month` })}</Text>
            <Text color="secondary">{t({ de: `Alle Automationen im Bündel, mit oder ohne neue Website. Keine Einrichtungsgebühr. Nur Anfragen? Anfragen-Autopilot ab ${chf(AUTOPILOT_MONTHLY)} / Monat.`, en: `All automations bundled, with or without a new website. No setup fee. Enquiries only? Enquiry Autopilot from ${chf(AUTOPILOT_MONTHLY)} / month.` })}</Text>
            <PhoneMore items={AUTOMATIONS} limit={4}>{shown => (
              <VStack gap={1.5} as="ul" style={ul}>
                {shown.map(a => li(a.id, a.name))}
              </VStack>
            )}</PhoneMore>
            <Button icon={ic(UI.chat)} variant="secondary" href="#kontakt" label={t({ de: 'Automationen anfragen', en: 'Request automations' })} onClick={cta('Automation Add-on')} />
          </VStack>
        </Card>
      </Grid>
      <HeroFilmDemo />
      <VStack gap={3}>
        <Heading level={3}>{t({ de: 'Monatliche Wartung', en: 'Monthly maintenance' })}</Heading>
        <Grid columns={{ minWidth: 240, max: 3 }} gap={4} align="stretch">
          <Card variant="muted" padding={phone ? 4 : 5}>
            <VStack gap={2}>
              <Text weight="semibold">{t({ de: 'Das ist dabei', en: 'What is included' })}</Text>
              <VStack gap={1} as="ul" style={ul}>
                {[{ de: 'Hosting', en: 'Hosting' }, { de: 'Updates und Sicherheit', en: 'Updates and security' }, { de: `${CARE_HOURS} Stunden Änderungen pro Monat`, en: `${CARE_HOURS} hours of changes per month` }].map((x, i) => li(i, x))}
              </VStack>
            </VStack>
          </Card>
          <Card variant="muted" padding={phone ? 4 : 5}>
            <VStack gap={2}>
              <Text weight="semibold">{t({ de: 'Preis pro Monat', en: 'Price per month' })}</Text>
              {([['upgrade', { de: 'Website-Upgrade', en: 'Website upgrade' }], ['core', CORE.name], ['pro', PRO.name]] as [keyof typeof CARE, T][]).map(([k, n]) => (
                <HStack key={k} hAlign="between" gap={3}>
                  <Text size="sm">{t(n)}</Text>
                  <Text size="sm" hasTabularNumbers>{chf(CARE[k])}</Text>
                </HStack>
              ))}
            </VStack>
          </Card>
          <Card variant="muted" padding={phone ? 4 : 5}>
            <VStack gap={2}>
              <Text weight="semibold">Domain</Text>
              <Text size="sm" color="secondary">{t({ de: `Ich verwalte sie für + ${chf(DOMAIN_FEE)} pro Monat, oder Sie kaufen sie selbst und geben mir Zugang.`, en: `I manage it for + ${chf(DOMAIN_FEE)} per month, or you buy it yourself and give me access.` })}</Text>
            </VStack>
          </Card>
        </Grid>
      </VStack>
      <Card variant="muted" padding={phone ? 4 : 5}>
        <HStack gap={4} vAlign="center" hAlign="between" wrap="wrap">
          <VStack gap={1}>
            <Heading level={3}>{t({ de: 'Individuell', en: 'Custom' })}</Heading>
            <Text color="secondary">{t({ de: 'Sie brauchen mehr? Schreiben Sie mir.', en: 'Need more? Write to me.' })}</Text>
          </VStack>
          <Button icon={ic(UI.send)} href="#kontakt" label={t({ de: 'Anfrage senden', en: 'Send enquiry' })} />
        </HStack>
      </Card>
      <Text type="supporting">
        {t({
          de: 'Website-Preise einmalig in CHF, Automationen monatlich. Drittkosten zum Selbstkostenpreis. Die Hälfte bei Auftrag, der Rest bei Fertigstellung.',
          en: 'Website prices are one-time in CHF, automations monthly. Third-party costs at cost. Half on order, the rest on completion.',
        })}
      </Text>
    </VStack>
  );
}
