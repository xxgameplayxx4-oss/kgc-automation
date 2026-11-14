import { useState, type ReactNode } from 'react';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { SelectableCard } from '@astryxdesign/core/SelectableCard';
import { Stack } from '@astryxdesign/core/Stack';
import { Step, Stepper } from '@astryxdesign/core/Stepper';
import { Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Token } from '@astryxdesign/core/Token';
import { useT, type T } from '../data';

// A working booking-funnel demo in the site's own theme. Nothing is sent anywhere.

type Choice = { id: string; name: T; meta: T; desc?: T };

function Shell({ steps, step, picked, onBack, children }: { steps: T[]; step: number; picked: string[]; onBack?: () => void; children: ReactNode }) {
  const t = useT();
  return (
    <Card padding={5} elevation="high">
      <Stack gap={5}>
        <Stepper activeStep={step} label={t({ de: 'Fortschritt', en: 'Progress' })} density="compact" horizontalOptions={{ minimumStepWidth: 72, collapsedVariant: 'withLabel' }}>
          {steps.map((s, i) => <Step key={s.en} step={i} label={t(s)} />)}
        </Stepper>
        {picked.length > 0 && (
          <Stack direction="horizontal" gap={1.5} wrap="wrap">
            {picked.map(p => <Token key={p} size="sm" label={p} />)}
          </Stack>
        )}
        {children}
        {onBack && (
          <Stack direction="horizontal">
            <Button variant="ghost" size="sm" label={`← ${t({ de: 'Zurück', en: 'Back' })}`} onClick={onBack} />
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

function Choices({ items, value, onPick, columns = 3 }: { items: Choice[]; value?: string; onPick: (id: string) => void; columns?: number }) {
  const t = useT();
  return (
    <Grid columns={{ minWidth: 150, max: columns }} gap={3}>
      {items.map(c => (
        <SelectableCard key={c.id} label={t(c.name)} isSelected={value === c.id} onChange={() => onPick(c.id)} padding={3} elevation="low">
          <Stack gap={0.5}>
            <Text weight="semibold">{t(c.name)}</Text>
            <Text size="sm" color="accent" weight="medium">{t(c.meta)}</Text>
            {c.desc && <Text size="sm" color="secondary">{t(c.desc)}</Text>}
          </Stack>
        </SelectableCard>
      ))}
    </Grid>
  );
}

function Done({ lines, onReset }: { lines: string[]; onReset: () => void }) {
  const t = useT();
  return (
    <Stack gap={3} data-pop="">
      <Heading level={3}>{t({ de: '✓ Anfrage erhalten', en: '✓ Request received' })}</Heading>
      <Text color="secondary">{t({ de: 'So sieht es Ihr Kunde. Gleichzeitig gehen die Bestätigung per E-Mail und der Kalendereintrag raus.', en: 'This is what your customer sees. At the same time the email confirmation and the calendar entry go out.' })}</Text>
      <Card variant="muted" padding={3}>
        <Stack gap={1}>{lines.map(l => <Text key={l} size="sm">{l}</Text>)}</Stack>
      </Card>
      <Text type="supporting" size="sm">{t({ de: 'Demo: Es wurde nichts gesendet.', en: 'Demo: nothing was sent.' })}</Text>
      <Stack direction="horizontal"><Button variant="secondary" size="sm" label={t({ de: 'Nochmals ausprobieren', en: 'Try again' })} onClick={onReset} /></Stack>
    </Stack>
  );
}

function Contact({ phone, onSubmit, cta }: { phone?: boolean; onSubmit: (name: string) => void; cta: T }) {
  const t = useT();
  const [name, setName] = useState('');
  const [reach, setReach] = useState('');
  const ok = name.trim().length > 1 && (phone ? reach.replace(/\D/g, '').length >= 9 : /\S+@\S+\.\S+/.test(reach));
  return (
    <Stack gap={3} style={{ maxWidth: '28rem' }}>
      <TextInput label={t({ de: 'Name', en: 'Name' })} value={name} onChange={setName} placeholder="Maria Muster" />
      {phone
        ? <TextInput type="tel" label={t({ de: 'Telefon', en: 'Phone' })} value={reach} onChange={setReach} placeholder="079 123 45 67" />
        : <TextInput type="email" label="E-Mail" value={reach} onChange={setReach} placeholder="maria@beispiel.ch" />}
      <Stack direction="horizontal">
        <Button variant="primary" label={t(cta)} isDisabled={!ok} onClick={() => onSubmit(name.trim())} />
      </Stack>
    </Stack>
  );
}

/* ---------- Funnel 1: book a consultation (type, date & time, contact) ---------- */

const MEETINGS: Choice[] = [
  { id: 'intro', name: { de: 'Erstgespräch', en: 'Intro call' }, meta: { de: '30 Min · kostenlos', en: '30 min · free' },
    desc: { de: 'Kennenlernen per Telefon oder Video. Sie schildern Ihr Anliegen, wir klären, ob und wie ich helfen kann.', en: 'Get to know each other by phone or video. You describe your need, we check if and how I can help.' } },
  { id: 'consult', name: { de: 'Beratung', en: 'Consultation' }, meta: { de: '60 Min · CHF 60', en: '60 min · CHF 60' },
    desc: { de: 'Wir arbeiten konkret an Ihrem Fall: Analyse, Empfehlungen und klare nächste Schritte.', en: 'We work on your case: analysis, recommendations and clear next steps.' } },
  { id: 'onsite', name: { de: 'Termin vor Ort', en: 'On-site visit' }, meta: { de: '90 Min · CHF 150', en: '90 min · CHF 150' },
    desc: { de: 'Ich komme zu Ihnen ins Geschäft und schaue mir alles direkt an.', en: 'I come to your business and look at everything in person.' } },
];
const SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '13:30', '14:00', '15:30', '16:00'];
const WEEKDAYS: T[] = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((de, i) => ({ de, en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] }));

function Calendar({ value, onPick }: { value?: Date; onPick: (d: Date) => void }) {
  const t = useT();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [offset, setOffset] = useState(0);
  const first = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const lead = (first.getDay() + 6) % 7; // Monday-first grid
  const locale = t({ de: 'de-CH', en: 'en-GB' });
  const cells: ReactNode[] = Array.from({ length: lead }, (_, i) => <Stack key={`x${i}`} />);
  for (let d = 1; d <= days; d++) {
    const date = new Date(first.getFullYear(), first.getMonth(), d);
    const wk = date.getDay();
    const off = date <= today || wk === 0 || wk === 6;
    const on = value?.getTime() === date.getTime();
    cells.push(<Button key={d} size="sm" width="100%" variant={on ? 'primary' : 'ghost'} isDisabled={off} label={String(d)} style={{ paddingInline: 0, minWidth: 0 }} onClick={() => onPick(date)} />);
  }
  return (
    <Stack gap={2}>
      <Stack direction="horizontal" justify="between" align="center">
        <Button size="sm" variant="ghost" label="‹" isDisabled={offset === 0} onClick={() => setOffset(0)} />
        <Text weight="semibold">{first.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</Text>
        <Button size="sm" variant="ghost" label="›" isDisabled={offset === 1} onClick={() => setOffset(1)} />
      </Stack>
      <Grid columns={7} gap={1}>
        {WEEKDAYS.map(w => <Text key={w.en} size="xsm" color="secondary" justify="center">{t(w)}</Text>)}
        {cells}
      </Grid>
    </Stack>
  );
}

function ConsultFunnel() {
  const t = useT();
  const [step, setStep] = useState(0);
  const [type, setType] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [doneName, setDoneName] = useState<string>();
  const meeting = MEETINGS.find(m => m.id === type);
  const day = date?.toLocaleDateString(t({ de: 'de-CH', en: 'en-GB' }), { weekday: 'long', day: 'numeric', month: 'long' });
  const picked = [meeting && t(meeting.name), day, time].filter(Boolean) as string[];
  const reset = () => { setStep(0); setType(undefined); setDate(undefined); setTime(undefined); setDoneName(undefined); };
  const steps: T[] = [{ de: 'Art', en: 'Type' }, { de: 'Datum & Zeit', en: 'Date & time' }, { de: 'Kontakt', en: 'Contact' }];

  if (doneName) return (
    <Shell steps={steps} step={3} picked={[]}>
      <Done onReset={reset} lines={[`${doneName}`, ...picked]} />
    </Shell>
  );
  return (
    <Shell steps={steps} step={step} picked={step > 0 ? picked : []} onBack={step > 0 ? () => setStep(step - 1) : undefined}>
      {step === 0 && (
        <Stack gap={3}>
          <Heading level={3}>{t({ de: 'Welche Art von Termin?', en: 'What kind of appointment?' })}</Heading>
          <Choices items={MEETINGS} value={type} onPick={id => { setType(id); setStep(1); }} />
        </Stack>
      )}
      {step === 1 && (
        <Stack gap={4}>
          <Heading level={3}>{t({ de: 'Datum und Zeit wählen', en: 'Choose date and time' })}</Heading>
          <Grid columns={{ minWidth: 240, max: 2 }} gap={6} align="start">
            <Calendar value={date} onPick={d => { setDate(d); setTime(undefined); }} />
            <Stack gap={2}>
              <Text size="sm" weight="semibold">{day ?? t({ de: 'Zuerst ein Datum wählen', en: 'Pick a date first' })}</Text>
              {date && (
                <Grid columns={3} gap={1.5} data-pop="">
                  {SLOTS.map(s => <Button key={s} size="sm" width="100%" variant={time === s ? 'primary' : 'secondary'} label={s} onClick={() => setTime(s)} />)}
                </Grid>
              )}
              <Text type="supporting" size="sm">{t({ de: 'Zeitzone: Europe/Zurich', en: 'Time zone: Europe/Zurich' })}</Text>
            </Stack>
          </Grid>
          <Stack direction="horizontal">
            <Button variant="primary" label={t({ de: 'Weiter', en: 'Continue' })} isDisabled={!date || !time} onClick={() => setStep(2)} />
          </Stack>
        </Stack>
      )}
      {step === 2 && (
        <Stack gap={3}>
          <Heading level={3}>{t({ de: 'Wie erreichen wir Sie?', en: 'How can we reach you?' })}</Heading>
          <Contact cta={{ de: 'Termin anfragen', en: 'Request appointment' }} onSubmit={setDoneName} />
        </Stack>
      )}
    </Shell>
  );
}


export default function Funnels() {
  const t = useT();
  return (
    <Stack gap={4}>
      <ConsultFunnel />
      <Text type="supporting" size="sm">
        {t({ de: '3 Schritte: Art, Datum und Zeit, Kontakt. Passt für Beratung, Coiffeur, Praxis.', en: '3 steps: type, date and time, contact. Fits advisors, salons, practices.' })}
      </Text>
    </Stack>
  );
}
