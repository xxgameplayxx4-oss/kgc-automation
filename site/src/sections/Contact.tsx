import { useState } from 'react';
import { VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Banner } from '@astryxdesign/core/Banner';
import { TextInput } from '@astryxdesign/core/TextInput';
import { TextArea } from '@astryxdesign/core/TextArea';
import { CONTACT_EMAIL, PHONE, contactDraft, useT } from '../data';

// Netlify Forms: the hidden form named "kontakt" in index.html registers these fields at deploy time.
const encode = (d: Record<string, string>) => new URLSearchParams(d).toString();

export default function Contact() {
  const t = useT();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(() => contactDraft.body);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [touched, setTouched] = useState(false);
  const emailOk = /^\S+@\S+\.\S+$/.test(email);
  const valid = name.trim() !== '' && emailOk && message.trim() !== '';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setState('sending');
    try {
      const r = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'kontakt', name, email, phone, subject: contactDraft.subject || 'Anfrage Website', message }),
      });
      if (!r.ok) throw new Error(String(r.status));
      contactDraft.body = ''; contactDraft.subject = '';
      setState('sent');
    } catch {
      setState('failed');
    }
  };

  return (
    <VStack as="section" gap={6} paddingInline={4} paddingBlock={10} maxWidth={720} style={{ marginInline: 'auto', width: '100%' }}>
      <VStack gap={2}>
        <Heading level={1} type="display-2">{t({ de: 'Kontakt', en: 'Contact' })}</Heading>
        <Text color="secondary">
          {t({ de: 'Schreiben Sie mir kurz, worum es geht. Ich melde mich innert 24 Stunden bei Ihnen.', en: 'Tell me briefly what it is about. I will get back to you within 24 hours.' })}
        </Text>
      </VStack>
      {state === 'sent' ? (
        <Banner status="success" title={t({ de: 'Danke, Ihre Nachricht ist angekommen.', en: 'Thank you, your message has arrived.' })} description={t({ de: 'Ich melde mich innert 24 Stunden.', en: 'I will reply within 24 hours.' })} />
      ) : (
        <Card padding={5}>
          <VStack as="form" gap={4} onSubmit={submit}>
            <TextInput label={t({ de: 'Name', en: 'Name' })} value={name} onChange={setName} autoComplete="name"
              status={touched && !name.trim() ? { type: 'error', message: t({ de: 'Bitte Namen angeben.', en: 'Please enter your name.' }) } : undefined} />
            <TextInput type="email" label="E-Mail" value={email} onChange={setEmail} autoComplete="email"
              status={touched && !emailOk ? { type: 'error', message: t({ de: 'Bitte gültige E-Mail angeben.', en: 'Please enter a valid email.' }) } : undefined} />
            <TextInput type="tel" label={t({ de: "Telefon (optional)", en: "Phone (optional)" })} value={phone} onChange={setPhone} autoComplete="tel" />
            <TextArea label={t({ de: 'Nachricht', en: 'Message' })} value={message} onChange={setMessage} rows={contactDraft.body ? 10 : 5}
              placeholder={t({ de: 'Zum Beispiel: Ich brauche eine Website für mein Coiffeurgeschäft.', en: 'For example: I need a website for my hair salon.' })}
              status={touched && !message.trim() ? { type: 'error', message: t({ de: 'Bitte eine Nachricht schreiben.', en: 'Please write a message.' }) } : undefined} />
            {state === 'failed' && (
              <Banner status="error" title={t({ de: 'Senden hat nicht geklappt.', en: 'Sending did not work.' })}
                description={t({ de: `Bitte schreiben Sie mir direkt an ${CONTACT_EMAIL}.`, en: `Please write to me directly at ${CONTACT_EMAIL}.` })} />
            )}
            <Button type="submit" variant="primary" width="100%" isLoading={state === 'sending'} label={t({ de: 'Nachricht senden', en: 'Send message' })} />
          </VStack>
        </Card>
      )}
      <VStack gap={1}>
        <Text weight="medium">{t({ de: 'Lieber direkt?', en: 'Prefer direct contact?' })}</Text>
        <Text>{CONTACT_EMAIL}</Text>
        <Text>{PHONE}</Text>
      </VStack>
    </VStack>
  );
}
