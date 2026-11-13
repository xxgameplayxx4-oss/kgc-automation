import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Badge } from '@astryxdesign/core/Badge';
import Eyebrow from './Eyebrow';
import { ADDONS, CARE, CARE_HOURS, DISCOUNTS, DOMAIN_FEE, chf, mailto, pct, presetOf, quote, TIERS, useT } from '../data';

export default function Packages() {
  const t = useT();
  const steps = [...DISCOUNTS].reverse().map(([min, r]) => `${min}+ ${pct(r)}`).join(' · ');
  return (
    <VStack id="pakete" as="section" gap={6} paddingInline={4} paddingBlock={10} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
      <VStack gap={2}>
        <Eyebrow>{t({ de: 'Fixpreise', en: 'Fixed prices' })}</Eyebrow>
        <Heading level={2} type="display-3">{t({ de: 'Pakete', en: 'Packages' })}</Heading>
        <Text color="secondary">
          {t({
            de: `Die Basis enthält das Nötige, alles Weitere sind Zusätze. Je mehr Zusätze, desto mehr Rabatt: ${steps}, alle Zusätze 30 %.`,
            en: `Basic has the essentials, everything else is an add-on. The more add-ons, the bigger the discount: ${steps}, all add-ons 30 %.`,
          })}
        </Text>
      </VStack>
      <Grid columns={{ minWidth: 250 }} gap={4} align="stretch">
        {TIERS.map(tier => {
          const top = tier.id === 'business';
          const q = quote(new Set(presetOf(tier)));
          return (
            <Card key={tier.id} variant={top ? 'yellow' : 'default'} elevation={top ? 'low' : 'none'} padding={5}>
              <VStack gap={3}>
                <HStack gap={2} vAlign="center" wrap="wrap">
                  <Heading level={3}>{t(tier.name)}</Heading>
                  {top && <Badge variant="yellow" label={t({ de: 'Beliebt', en: 'Popular' })} />}
                </HStack>
                <VStack gap={1}>
                  <Heading level={2} type="display-3" color="accent">{chf(q.total)}</Heading>
                  {q.discount > 0 && (
                    <HStack gap={1.5} vAlign="center">
                      <Text size="sm" color="secondary" hasTabularNumbers style={{ textDecoration: 'line-through' }}>{chf(q.total + q.discount)}</Text>
                      <Text size="sm" color="secondary">{`−${pct(q.rate)} ${t({ de: 'Rabatt', en: 'off' })}`}</Text>
                    </HStack>
                  )}
                  <Text size="sm" weight="medium" hasTabularNumbers>
                    {`+ ${chf(CARE[tier.id].price)} / ${t({ de: 'Monat Wartung', en: 'month maintenance' })}`}
                    {CARE[tier.id].list !== CARE[tier.id].price ? ` (${t({ de: 'statt', en: 'instead of' })} ${chf(CARE[tier.id].list)})` : ''}
                  </Text>
                </VStack>
                <Text color="secondary">{t(tier.tagline)}</Text>
                <VStack gap={1.5} as="ul" style={{ margin: 0, paddingInlineStart: 'var(--spacing-4)' }}>
                  {tier.id === 'basis'
                    ? tier.features.map((f, i) => <li key={i}><Text size="sm">{t(f)}</Text></li>)
                    : tier.id === 'komplett'
                      ? [<li key="all"><Text size="sm">{t({ de: `Alles aus Basis plus alle ${ADDONS.length} Zusätze`, en: `Everything in Basic plus all ${ADDONS.length} add-ons` })}</Text></li>]
                      : [
                          <li key="base"><Text size="sm" weight="medium">{t({ de: 'Alles aus Basis, plus:', en: 'Everything in Basic, plus:' })}</Text></li>,
                          ...q.chosen.map(a => <li key={a.id}><Text size="sm">{t(a.name)}</Text></li>),
                        ]}
                </VStack>
                <Button variant={top ? 'primary' : 'secondary'} href="#konfigurator" label={t({ de: 'Im Konfigurator anpassen', en: 'Adjust in configurator' })} />
              </VStack>
            </Card>
          );
        })}
      </Grid>
      <Card variant="muted" padding={5}>
        <VStack gap={2}>
          <Heading level={3}>{t({ de: 'Monatliche Wartung', en: 'Monthly maintenance' })}</Heading>
          <Text color="secondary">
            {t({
              de: `Hosting, Updates, Sicherheit und ${CARE_HOURS} Stunden Änderungen pro Monat. Basis ${chf(CARE.basis.price)}, Plus ${chf(CARE.plus.price)}, Business ${chf(CARE.business.price)}, Komplett ${chf(CARE.komplett.price)} statt ${chf(CARE.komplett.list)} (−30 %).`,
              en: `Hosting, updates, security and ${CARE_HOURS} hours of changes per month. Basic ${chf(CARE.basis.price)}, Plus ${chf(CARE.plus.price)}, Business ${chf(CARE.business.price)}, Complete ${chf(CARE.komplett.price)} instead of ${chf(CARE.komplett.list)} (−30 %).`,
            })}
          </Text>
          <Text color="secondary">
            {t({
              de: `Domain: Ich kaufe und verwalte sie für + ${chf(DOMAIN_FEE)} pro Monat. Oder Sie kaufen sie selbst und geben mir Zugang, dann verbinde ich sie.`,
              en: `Domain: I buy and manage it for + ${chf(DOMAIN_FEE)} per month. Or you buy it yourself and give me access, then I connect it.`,
            })}
          </Text>
        </VStack>
      </Card>
      <Card variant="muted" padding={5}>
        <HStack gap={4} vAlign="center" hAlign="between" wrap="wrap">
          <VStack gap={1}>
            <Heading level={3}>{t({ de: 'Individuell', en: 'Custom' })}</Heading>
            <Text color="secondary">{t({ de: 'Sie brauchen mehr? Schreiben Sie mir.', en: 'Need more? Write to me.' })}</Text>
          </VStack>
          <Button href={mailto('Individuelle Anfrage')} label={t({ de: 'Anfrage senden', en: 'Send enquiry' })} />
        </HStack>
      </Card>
      <Text type="supporting">
        {t({
          de: 'Preise einmalig in CHF. Rabatt gilt auf die Zusätze. Domain und Drittkosten zum Selbstkostenpreis. Die Hälfte bei Auftrag, der Rest bei Fertigstellung.',
          en: 'Prices are one-time in CHF. Discount applies to add-ons. Domain and third-party costs at cost. Half on order, the rest on completion.',
        })}
      </Text>
    </VStack>
  );
}
