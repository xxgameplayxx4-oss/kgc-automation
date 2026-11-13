import { useContext } from 'react';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { BASE_PRICE, chf, LangContext, useT } from '../data';

export default function Hero() {
  const t = useT();
  const { lang } = useContext(LangContext);
  const from = chf(BASE_PRICE);
  return (
    <VStack id="top" as="section" hAlign="center" gap={8} paddingInline={4} paddingBlock={10}>
      <VStack gap={4} hAlign="center" maxWidth={760}>
        <Heading level={1} type="display-2" justify="center" textWrap="balance">
          {t({ de: `Ihre Website. Fixpreis ab ${from}.`, en: `Your website. Fixed price from ${from}.` })}
        </Heading>
        <Text type="large" color="secondary" justify="center" textWrap="balance">
          {t({
            de: 'Cung Solutions baut Websites für Schweizer Kleinunternehmen, dazu passende Flyer und Visitenkarten.',
            en: 'Cung Solutions builds websites for Swiss small businesses, plus matching flyers and business cards.',
          })}
        </Text>
        <HStack gap={3} wrap="wrap" hAlign="center">
          <Button size="lg" variant="primary" href="#konfigurator" label={t({ de: 'Website zusammenstellen', en: 'Build your website' })} />
          <Button size="lg" href="#pakete" label={t({ de: 'Pakete ansehen', en: 'See packages' })} />
        </HStack>
        <Text type="supporting" justify="center">
          {t({ de: 'Fixpreise · Made in Brugg · Antwort innert 24 h', en: 'Fixed prices · Made in Brugg · Reply within 24 h' })}
        </Text>
      </VStack>
      <VStack width="100%" maxWidth={880}>
        <video
          key={lang}
          controls
          preload="none"
          poster="/media/promo-poster.webp"
          style={{ width: '100%', borderRadius: 'var(--radius-page)', aspectRatio: '16 / 9' }}
        >
          <source src={`/media/promo-${lang}.mp4`} type="video/mp4" />
          <track kind="subtitles" src={`/media/promo-${lang}.vtt`} srcLang={lang} label={lang === 'de' ? 'Deutsch' : 'English'} default />
        </video>
      </VStack>
    </VStack>
  );
}
