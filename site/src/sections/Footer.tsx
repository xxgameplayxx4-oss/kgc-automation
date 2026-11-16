import { useState } from 'react';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
import { Section } from '@astryxdesign/core/Section';
import Logo from './Logo';
import { Link } from '@astryxdesign/core/Link';
import { CONTACT_EMAIL, PHONE, mailto, openContact, useT } from '../data';
import { UI, ic } from './uiIcons';


export default function Footer() {
  const t = useT();
  const [doc, setDoc] = useState<'imp' | 'dat' | null>(null);
  const close = (o: boolean) => { if (!o) setDoc(null); };
  const address = (
    <VStack gap={0.5}>
      <Logo height={26} />
      <Text>{t({ de: 'Einzelfirma, Inhaber Khang Cung', en: 'Sole proprietorship, owner Khang Cung' })}</Text>
      <Text>Stahlrain 7</Text>
      <Text>5200 Brugg AG, {t({ de: 'Schweiz', en: 'Switzerland' })}</Text>
      <Text><Link href={mailto('Anfrage')}>{CONTACT_EMAIL}</Link></Text>
      <Text><Link href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</Link></Text>
    </VStack>
  );
  return (
    <Section id="footer" variant="muted" padding={0}>
      <VStack as="footer" gap={8} paddingInline={4} paddingBlock={10} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
        <VStack gap={3} hAlign="center">
          <Heading level={2} type="display-3" justify="center">{t({ de: 'Wo verlieren Sie Zeit?', en: 'Where are you losing time?' })}</Heading>
          <Button icon={ic(UI.calendar)} size="lg" variant="primary" href="#kontakt" onClick={() => openContact('Kostenloses Gespräch')} label={t({ de: 'Kostenloses Gespräch, 20 Minuten', en: 'Free 20-minute call' })} />
        </VStack>
        <HStack gap={6} hAlign="between" wrap="wrap" vAlign="end">
          {address}
          <HStack gap={2}>
            <Button icon={ic(UI.doc)} variant="ghost" label="Impressum" onClick={() => setDoc('imp')} />
            <Button icon={ic(UI.shield)} variant="ghost" label={t({ de: 'Datenschutz', en: 'Privacy' })} onClick={() => setDoc('dat')} />
          </HStack>
        </HStack>
        <Text type="supporting">© {new Date().getFullYear()} Cung Solutions · Brugg AG</Text>
      </VStack>
      <Dialog isOpen={doc === 'imp'} onOpenChange={close} width={480}>
        <DialogHeader title="Impressum" onOpenChange={close} />
        <VStack gap={4} padding={5}>
          {address}
          <Text color="secondary">
            {t({
              de: 'Fixpreise gemäss Website; verbindlich ist die schriftliche Offerte.',
              en: 'Fixed prices as shown on the website; the written quote is binding.',
            })}
          </Text>
        </VStack>
      </Dialog>
      <Dialog isOpen={doc === 'dat'} onOpenChange={close} width={480}>
        <DialogHeader title={t({ de: 'Datenschutz', en: 'Privacy' })} onOpenChange={close} />
        <VStack gap={3} padding={5}>
          <Text>{t({ de: 'Ich erhalte nur die Daten, die Sie mir über das Kontaktformular, per E-Mail oder per WhatsApp senden. Die Website wird bei Netlify gehostet, das Kontaktformular wird über Netlify übermittelt. Die Schriften werden von der Website selbst geladen, es gibt keine Verbindung zu Google.', en: 'I only receive the data you send me through the contact form, by email or on WhatsApp. The website is hosted by Netlify and the contact form is transmitted via Netlify. Fonts are served by the website itself, with no connection to Google.' })}</Text>
          <Text>{t({ de: 'Ich verwende Ihre Angaben ausschliesslich, um Ihre Anfrage zu beantworten.', en: 'I use your details only to answer your enquiry.' })}</Text>
          <Text>{t({ de: 'Nutzen Sie die Buchungs-Demo mit einem angebundenen Anfragen-Autopilot, werden Ihre Angaben an dessen Webhook übermittelt und für die Bestätigung per WhatsApp und E-Mail verwendet.', en: 'If you use the booking demo while connected to an Enquiry Autopilot, your details are sent to its webhook and used for the WhatsApp and email confirmation.' })}</Text>
          <Text>{t({ de: 'Ihre Daten werden nicht verkauft und nicht an Dritte weitergegeben, ausser an die genannten Dienstleister, soweit für den Versand nötig.', en: 'Your data is never sold or passed on to third parties, except to the service providers named above where needed for delivery.' })}</Text>
          <Text>{t({ de: `Gemäss nDSG haben Sie ein Recht auf Auskunft und Löschung: ${CONTACT_EMAIL}.`, en: `Under the Swiss nDSG you have the right to access and deletion: ${CONTACT_EMAIL}.` })}</Text>
        </VStack>
      </Dialog>
    </Section>
  );
}
