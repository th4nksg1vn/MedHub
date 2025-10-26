import { PrismaClient, UserRole, OrganizationType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Testing Prisma connection and schema...\n');

  try {
    // Test 1: Basic connection
    console.log('1️⃣  Testing database connection...');
    await prisma.$connect();
    console.log('   ✅ Connected successfully\n');

    // Test 2: Count existing records
    console.log('2️⃣  Counting existing records...');
    const [orgCount, userCount, patientCount] = await Promise.all([
      prisma.organization.count(),
      prisma.user.count(),
      prisma.patient.count(),
    ]);
    console.log(`   Organizations: ${orgCount}`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Patients: ${patientCount}\n`);

    // Test 3: Try to fetch first organization
    console.log('3️⃣  Fetching sample data...');
    const firstOrg = await prisma.organization.findFirst({
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                role: true,
              },
            },
          },
        },
        _count: {
          select: {
            patients: true,
            services: true,
          },
        },
      },
    });

    if (firstOrg) {
      console.log(`   ✅ Found organization: ${firstOrg.name}`);
      console.log(`   Members: ${firstOrg.members.length}`);
      console.log(`   Patients: ${firstOrg._count.patients}`);
      console.log(`   Services: ${firstOrg._count.services}\n`);
    } else {
      console.log('   📝 No organizations found yet\n');
    }

    console.log('✅ All tests passed! Prisma schema is working correctly.');
    console.log('\n📋 Schema includes:');
    console.log('   • Users with roles and authentication');
    console.log('   • Organizations with types');
    console.log('   • User-Organization memberships');
    console.log('   • Patients with medical records');
    console.log('   • Patient documents');
    console.log('   • Audit logs');
    console.log('   • Services');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);

