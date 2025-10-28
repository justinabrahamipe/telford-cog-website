const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const imageUpdates = [
  { name: 'Pr. Biju Cherian', imageUrl: '/leaders/pr_biju_cherian.jpg' },
  { name: 'Pr. Rejoy Stephan', imageUrl: '/leaders/br_rejoy_stephan.jpg' },
  { name: 'Sis. Suja Cherian', imageUrl: '/leaders/sr_suja_biju.jpg' },
  { name: 'Sis. Neethu Mary Mathew', imageUrl: '/leaders/sr_neethu_rejoy.jpg' },
];

async function main() {
  console.log('Updating leader image URLs...');

  for (const update of imageUpdates) {
    const leader = await prisma.leader.findFirst({
      where: { name: update.name },
    });

    if (leader) {
      await prisma.leader.update({
        where: { id: leader.id },
        data: { imageUrl: update.imageUrl },
      });
      console.log(`Updated ${update.name} with image: ${update.imageUrl}`);
    }
  }

  console.log('Image URLs updated successfully!');
}

main()
  .catch((e) => {
    console.error('Error updating images:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
