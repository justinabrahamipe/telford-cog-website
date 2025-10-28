const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const leaders = [
  // Main Leaders
  {
    name: 'Pr. Biju Cherian',
    designation: 'Senior pastor, Mahanaim Church of God. Midland region supervisor, COG-UKCCM',
    description: 'He was born in India and trained as a counsellor for Alcohol and Drug Addicts in Mumbai. He counselled in a number of chemically dependant people in India before responding to God\'s call to become a Pentecostal Minister in the UK. His wife is Suja Cherian and God gave them two boys Reuben and Ryan. He has been ministering to the Church of God UK, for more than a decade. For 11 years he pastored in Birkenhead Church of God and then pastoring Manchester Mahanaim Church of God since January 2017. God helped him to plant two churches in 2 different counties, Keighley and Telford.',
    imageUrl: '/src/assets/photos/Photos/pr_biju_cherian.jpg',
    type: 'main',
    orderIndex: 0,
    facebookUrl: 'https://www.facebook.com/bijujoseph.cherian',
    whatsappUrl: 'https://wa.me/447411539877',
  },
  {
    name: 'Pr. Rejoy Stephan',
    designation: 'Pastor',
    description: 'He was born as the son of Pr. Francis Stephan and Eliyamma Stephan at Thrissur, India. From his very young age itself his parents encouraged him to indulge in Sunday school, distributing tracts, outreach ministries and has taught him that toiling in his vineyard is the best thing in the world. They have prayed and supported him to grow in faith. As his parents were getting transferred to different places as part of the ministry, he studied in different schools. He learnt keyboard and did sound mixing at this time which helped his father in his ministry. He graduated from Peniel Bible Seminary, Perumbavoor in 2012. From his college times itself he had a good time leading the worship under Pr. Sabu Samuel (Malampuzha Church, Palakad), Pr. N. G. Samkutty (Church of God Gospel Centre, Palarivattom), Pr. Saji M George (Bethlehem Community Church, Thrissur), Pr. Daniel Ayiroor (Voice of Gospel Church, Thrissur) and in many conventions and camps. He moved to Wellington, Telford, UK with family and since then he is the part of Mahanaim Church of God. On July 03,2021, by Gods grace a branch of Mahanaim COG came into being in Telford. He is assisting Pr. Biju Cherian in Gods ministry. Wife : Neethu Mary Mathew. Son : Evan Rejoy',
    imageUrl: '/src/assets/photos/Photos/br_rejoy_stephan.jpg',
    type: 'main',
    orderIndex: 1,
    facebookUrl: 'https://www.facebook.com/profile.php?id=100095378197419',
    whatsappUrl: 'https://wa.me/447404535362',
  },
  {
    name: 'Sis. Suja Cherian',
    designation: 'Ladies Secretary',
    description: 'She is basically from Kottayam, India. She did her nursing at Bangalore and migrated to UK in 2000 and has been working in Wirral Teaching NHS Hospital since then. She has secured B.Sc.(Hons.) and Masters in Advanced Nurse Practice from University of Chester and is working as a Band-7 nurse. She is married to Pr. Biju Cherian and is blessed with 2 children, Reuben and Ryan. She has been the Ladies coordinater at Birkenhead Church of God and continue to do the same at Manchester Mahanaim Church of God. She is a prayer warrior and has been a great support to the church growth.',
    imageUrl: '/src/assets/photos/Photos/sr_suja_biju.jpg',
    type: 'main',
    orderIndex: 2,
    facebookUrl: 'https://www.facebook.com/bijujoseph.cherian',
    whatsappUrl: 'https://wa.me/447886897349',
  },
  {
    name: 'Sis. Neethu Mary Mathew',
    designation: 'Ladies Secretary',
    description: 'Born as a child of Mr. and Mrs. Mathew in Palakkad, India. Until her 15 years of age she was part of Syrian Orthodox Church and thereafter God blessed her to find out the true doctrine and hence followed path of Jesus Christ which changed her life. She was an active participant in all the church ministries and served as Sunday school teacher and youth coordinator in her own capacities. She has done her graduation in nursing at Simet College of Nursing, Palakkad. She migrated to UK in 2020 and was blessed to be one of the pioneer member of Mahanaim Church of God, Telford. She is married to Br. Rejoy Stephan and God has blessed them with a boy child, Evan.',
    imageUrl: '/src/assets/photos/Photos/sr_neethu_rejoy.jpg',
    type: 'main',
    orderIndex: 3,
    facebookUrl: 'https://www.facebook.com/neethumary.mathew.7',
    whatsappUrl: 'https://wa.me/447459495028',
  },
  // Officials
  {
    name: 'Br. Linu Thomas',
    designation: 'Administration',
    description: null,
    imageUrl: null,
    type: 'official',
    orderIndex: 0,
    facebookUrl: null,
    whatsappUrl: null,
  },
  {
    name: 'Br. Gijo George',
    designation: 'Treasurer',
    description: null,
    imageUrl: null,
    type: 'official',
    orderIndex: 1,
    facebookUrl: null,
    whatsappUrl: null,
  },
  {
    name: 'Br. Shyju Mathew',
    designation: 'Worship leader',
    description: null,
    imageUrl: null,
    type: 'official',
    orderIndex: 2,
    facebookUrl: null,
    whatsappUrl: null,
  },
  {
    name: 'Sis. Sini Shyju',
    designation: 'Sunday school coordinator',
    description: null,
    imageUrl: null,
    type: 'official',
    orderIndex: 3,
    facebookUrl: null,
    whatsappUrl: null,
  },
  {
    name: 'Br. Sam Mathai',
    designation: 'YPE Secretary',
    description: null,
    imageUrl: null,
    type: 'official',
    orderIndex: 4,
    facebookUrl: null,
    whatsappUrl: null,
  },
  {
    name: 'Sis. Raji Joby',
    designation: 'Ladies coordinator',
    description: null,
    imageUrl: null,
    type: 'official',
    orderIndex: 5,
    facebookUrl: null,
    whatsappUrl: null,
  },
  {
    name: 'Br. Linu Thomas & Sis. Tinku',
    designation: 'Prayer coordinator',
    description: null,
    imageUrl: null,
    type: 'official',
    orderIndex: 6,
    facebookUrl: null,
    whatsappUrl: null,
  },
  {
    name: 'Br. Prince Titus',
    designation: 'Media coordinator',
    description: null,
    imageUrl: null,
    type: 'official',
    orderIndex: 7,
    facebookUrl: null,
    whatsappUrl: null,
  },
  {
    name: 'Sis. Renu Chandy',
    designation: 'Safeguarding officer',
    description: null,
    imageUrl: null,
    type: 'official',
    orderIndex: 8,
    facebookUrl: null,
    whatsappUrl: null,
  },
];

async function main() {
  console.log('Starting leader migration...');

  // Check if leaders already exist
  const existingLeaders = await prisma.leader.count();
  if (existingLeaders > 0) {
    console.log(`Found ${existingLeaders} existing leaders. Skipping migration.`);
    return;
  }

  // Create all leaders
  for (const leader of leaders) {
    const created = await prisma.leader.create({
      data: leader,
    });
    console.log(`Created leader: ${created.name} (${created.type})`);
  }

  console.log(`\nMigration complete! Added ${leaders.length} leaders.`);
}

main()
  .catch((e) => {
    console.error('Error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
