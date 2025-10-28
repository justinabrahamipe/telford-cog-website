const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding footer settings...');

  const footerSettings = [
    // Social Media URLs
    { key: 'facebook_url', value: 'https://www.facebook.com/mahanaimtelford/' },
    { key: 'whatsapp_url', value: 'https://wa.me/447411539877' },
    { key: 'youtube_url', value: 'https://youtube.com/channel/UCKUpMHwj5LLw2wEB2qK3lpA' },
    { key: 'instagram_url', value: 'https://www.instagram.com/mahanaimchurchtelford/?igshid=YmMyMTA2M2Y=' },

    // Bible Verse
    { key: 'verse_text', value: 'Let us fix our eyes on Jesus, the pioneer and perfecter of faith' },
    { key: 'verse_reference', value: 'Hebrews 12:2' },

    // Address
    { key: 'address_line1', value: 'All Saints Parish Center,' },
    { key: 'address_line2', value: 'Lychgate Walk, Wellington,' },
    { key: 'address_line3', value: 'Telford - TF1 3HA' },
    { key: 'address_line4', value: 'United Kingdom' },
    { key: 'google_maps_url', value: 'https://goo.gl/maps/FEsb17CUKPp5KP1P7' },
    { key: 'google_maps_embed_url', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2417.6734771831666!2d-2.519048484185737!3d52.70198837984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf437dbe101dede3e!2sMahanaim%20Pentecostal%20Church%20of%20God%20Telford%20(Malayalam%20and%20English%20Service)!5e0!3m2!1sen!2suk!4v1652964867706!5m2!1sen!2suk' },
  ];

  for (const setting of footerSettings) {
    await prisma.footerSettings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
    console.log(`✓ ${setting.key}`);
  }

  console.log('✅ Footer settings seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding footer settings:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
