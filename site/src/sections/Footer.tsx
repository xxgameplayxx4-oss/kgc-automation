import { useState } from 'react';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
import { Section } from '@astryxdesign/core/Section';
import Logo from './Logo';
import { CONTACT_EMAIL, useT } from '../data';

const PHONE = '+41 76 330 79 11';

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
      <Text>{CONTACT_EMAIL}</Text>
      <Text>{PHONE}</Text>
    </VStack>
  );
  return (
    <Section id="kontakt" variant="muted" padding={0}>
      <VStack as="footer" gap={8} paddingInline={4} paddingBlock={10} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
        <VStack gap={3} hAlign="center">
          <Heading level={2} type="display-3" justify="center">{t({ de: 'Bereit für Ihre neue Website?', en: 'Ready for your new website?' })}</Heading>
          <Button size="lg" variant="primary" href="#konfigurator" label={t({ de: 'Jetzt konfigurieren', en: 'Configure now' })} />
        </VStack>
        <HStack gap={6} hAlign="between" wrap="wrap" vAlign="end">
          {address}
          <HStack gap={2}>
            <Button variant="ghost" label="Impressum" onClick={() => setDoc('imp')} />
            <Button variant="ghost" label={t({ de: 'Datenschutz', en: 'Privacy' })} onClick={() => setDoc('dat')} />
          </HStack>
        </HStack>
        <Text type="supporting">© 2026 Cung Solutions · Brugg AG</Text>
      </VStack>
      <Dialog isOpen={doc === 'imp'} onOpenChange={close} width={480}>
        <DialogHeader title="Impressum" onOpenChange={close} />
        <VStack gap={4} padding={5}>
          {address}
          <Text color="secondary">
            {t({
              de: 'Alle Preise sind Richtwerte. Verbindlich ist allein die schriftliche Offerte.',
              en: 'All prices are guidelines. Only the written quote is binding.',
            })}
          </Text>
        </VStack>
      </Dialog>
      <Dialog isOpen={doc === 'dat'} onOpenChange={close} width={480}>
        <DialogHeader title={t({ de: 'Datenschutz', en: 'Privacy' })} onOpenChange={close} />
        <VStack gap={3} padding={5}>
          <Text>{t({ de: 'Wir erhalten nur die Daten, die Sie uns per E-Mail senden.', en: 'We only receive the data you send us by email.' })}</Text>
          <Text>{t({ de: 'Diese verwenden wir ausschliesslich, um Ihre Anfrage zu beantworten.', en: 'We use it only to answer your enquiry.' })}</Text>
          <Text>{t({ de: 'Ihre Daten werden nicht verkauft oder weitergegeben.', en: 'Your data is never sold or passed on.' })}</Text>
          <Text>{t({ de: `Gemäss nDSG haben Sie ein Recht auf Auskunft und Löschung: ${CONTACT_EMAIL}.`, en: `Under the Swiss nDSG you have the right to access and deletion: ${CONTACT_EMAIL}.` })}</Text>
        </VStack>
      </Dialog>
    </Section>
  );
}
