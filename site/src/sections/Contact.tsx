import { useEffect, useState } from 'react';
import { Link } from '@astryxdesign/core/Link';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { Block, Chips, Flow, SectionHead, VIZ } from './viz';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Banner } from '@astryxdesign/core/Banner';
import { TextInput } from '@astryxdesign/core/TextInput';
import { TextArea } from '@astryxdesign/core/TextArea';
import { CONTACT_EMAIL, CONTACT_EVENT, PHONE, contactDraft, mailto, useT } from '../data';
import { UI, ic } from './uiIcons';

// Netlify Forms: the hidden form named "kontakt" in index.html registers these fields at deploy time.
const encode = (d: Record<string, string>) => new URLSearchParams(d).toString();

export default function Contact() {
  const t = useT();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(() => contactDraft.body);
  const [subject, setSubject] = useState(() => contactDraft.subject || 'Anfrage');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [touched, setTouched] = useState(false);
  const emailOk = /^\S+@\S+\.\S+$/.test(email);
  const valid = name.trim() !== '' && emailOk && message.trim() !== '';

  // A button on the open contact page loads a fresh draft; leaving the page drops it so nothing leaks into the next enquiry.
  useEffect(() => {
    const load = () => { setSubject(contactDraft.subject || 'Anfrage'); setMessage(contactDraft.body); setState('idle'); };
    const clear = () => { contactDraft.subject = ''; contactDraft.body = ''; };
    window.addEventListener(CONTACT_EVENT, load);
    return () => { window.removeEventListener(CONTACT_EVENT, load); clear(); };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setState('sending');
    try {
      const r = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'kontakt', name, email, phone, subject: subject.trim() || 'Anfrage', message }),
      });
      if (!r.ok) throw new Error(String(r.status));
      contactDraft.body = ''; contactDraft.subject = '';
      setState('sent');
    } catch {
      setState('failed');
    }
  };

  return (
    <Block gap={6}>
      <SectionHead level={1} title={{ de: 'Kontakt', en: 'Contact' }} sub={{ de: 'Schreiben Sie kurz, worum es geht.', en: 'Tell me briefly what it is about.' }} />
      <VStack gap={6} maxWidth={720}>
      {state === 'sent' ? (
        <Banner status="success" title={t({ de: 'Danke, Ihre Nachricht ist angekommen.', en: 'Thank you, your message has arrived.' })} description={t({ de: 'Ich melde mich innert 24 Stunden.', en: 'I will reply within 24 hours.' })} />
      ) : (
        <Card padding={5}>
          <VStack as="form" gap={4} onSubmit={submit}>
            <TextInput label={t({ de: 'Betreff', en: 'Subject' })} value={subject} onChange={setSubject} />
            <TextInput label={t({ de: 'Name', en: 'Name' })} value={name} onChange={setName} autoComplete="name"
              status={touched && !name.trim() ? { type: 'error', message: t({ de: 'Bitte Namen angeben.', en: 'Please enter your name.' }) } : undefined} />
            <TextInput type="email" label="E-Mail" value={email} onChange={setEmail} autoComplete="email"
              status={touched && !emailOk ? { type: 'error', message: t({ de: 'Bitte gültige E-Mail angeben.', en: 'Please enter a valid email.' }) } : undefined} />
            <TextInput type="tel" label={t({ de: "Telefon (optional)", en: "Phone (optional)" })} value={phone} onChange={setPhone} autoComplete="tel" />
            <TextArea label={t({ de: 'Nachricht', en: 'Message' })} value={message} onChange={setMessage} rows={message.length > 200 ? 10 : 5}
              placeholder={t({ de: 'Zum Beispiel: Ich möchte, dass Anfragen automatisch per WhatsApp beantwortet werden.', en: 'For example: I want enquiries to be answered automatically on WhatsApp.' })}
              status={touched && !message.trim() ? { type: 'error', message: t({ de: 'Bitte eine Nachricht schreiben.', en: 'Please write a message.' }) } : undefined} />
            {state === 'failed' && (
              <Banner status="error" title={t({ de: 'Senden hat nicht geklappt.', en: 'Sending did not work.' })}
                description={t({ de: `Bitte schreiben Sie mir direkt an ${CONTACT_EMAIL}.`, en: `Please write to me directly at ${CONTACT_EMAIL}.` })} />
            )}
            <Text type="supporting" size="sm">{t({ de: 'Ich verwende Ihre Angaben nur, um Ihre Anfrage zu beantworten. Die Nachricht läuft über Netlify.', en: 'I use your details only to answer your enquiry. The message is processed via Netlify.' })}</Text>
            <Button icon={ic(UI.send)} type="submit" variant="primary" width="100%" isLoading={state === 'sending'} label={t({ de: 'Nachricht senden', en: 'Send message' })} />
          </VStack>
        </Card>
      )}
      </VStack>
      <Flow steps={[
        { icon: UI.send, title: { de: 'Nachricht', en: 'Message' } },
        { icon: VIZ.clock, title: { de: 'Antwort innert 24 h', en: 'Reply within 24 h' } },
        { icon: UI.chat, title: { de: 'Kostenloses Gespräch', en: 'Free call' }, text: { de: '20 Minuten', en: '20 minutes' }, accent: true },
      ]} />
      <Chips items={[
        { icon: VIZ.pin, label: { de: 'Brugg AG', en: 'Brugg AG' } },
        { icon: VIZ.clock, label: { de: 'Antwort innert 24 h', en: 'Reply within 24 h' } },
        { icon: VIZ.lock, label: { de: 'Daten in der Schweiz oder EU', en: 'Data in Switzerland or the EU' } },
      ]} />
      <HStack gap={5} wrap="wrap">
        <Text><Link href={mailto('Anfrage')}>{CONTACT_EMAIL}</Link></Text>
        <Text><Link href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</Link></Text>
      </HStack>
    </Block>
  );
}
