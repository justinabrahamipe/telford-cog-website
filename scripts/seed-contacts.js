const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedContacts() {
  try {
    console.log('Seeding initial contact methods...');

    // Check if contacts already exist
    const existingContacts = await prisma.contact.findMany();
    if (existingContacts.length > 0) {
      console.log('Contacts already exist. Skipping seed.');
      return;
    }

    // Create initial contacts based on the existing hardcoded data
    const contacts = [
      {
        title: 'Email',
        description: null,
        details: 'mahanaimcogtelford@gmail.com',
        iconType: 'email',
        actionUrl: 'mailto:mahanaimcogtelford@gmail.com?subject=Regd some query&body=Hi Team,\n',
        colorTheme: 'primary',
        orderIndex: 0,
      },
      {
        title: 'Call',
        description: 'Pr. Biju Cherian',
        details: '+44 7411 539877',
        iconType: 'phone',
        actionUrl: 'tel:+447411539877',
        colorTheme: 'secondary',
        orderIndex: 1,
      },
      {
        title: 'WhatsApp',
        description: 'Pr. Biju Cherian',
        details: '+44 7411 539877',
        iconType: 'whatsapp',
        actionUrl: 'https://api.whatsapp.com/send/?phone=447411539877&text&app_absent=0',
        colorTheme: 'success',
        orderIndex: 2,
      },
    ];

    for (const contact of contacts) {
      await prisma.contact.create({
        data: contact,
      });
      console.log(`Created contact: ${contact.title}`);
    }

    console.log('Successfully seeded contacts!');
  } catch (error) {
    console.error('Error seeding contacts:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedContacts();
