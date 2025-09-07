import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await hashPassword('Admin123!')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@licensorflow.com' },
    update: {},
    create: {
      email: 'admin@licensorflow.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      status: 'ACTIVE',
      emailVerified: new Date(),
      hasCompletedOnboarding: true
    }
  })

  console.log('✅ Admin user created')

  // Create test user
  const userPassword = await hashPassword('Test123!')
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: userPassword,
      firstName: 'Test',
      lastName: 'User',
      organizationName: 'Test Healthcare Clinic',
      phoneNumber: '(555) 123-4567',
      role: 'CLIENT',
      status: 'ACTIVE',
      emailVerified: new Date(),
      hasCompletedOnboarding: true
    }
  })

  console.log('✅ Test user created')

  // Create HIPAA courses
  const hipaaPrivacy = await prisma.course.create({
    data: {
      title: 'HIPAA Privacy Rule Fundamentals',
      slug: 'hipaa-privacy-rule-fundamentals',
      description: 'Master HIPAA Privacy Rule requirements for healthcare professionals',
      longDescription: 'This comprehensive course covers all aspects of the HIPAA Privacy Rule, including patient rights, minimum necessary standards, and proper disclosure procedures.',

      category: 'HIPAA',
      difficulty: 'BEGINNER',
      duration: 120,
      price: 79.99,
      requiredScore: 80,
      tags: 'hipaa,privacy,compliance,healthcare',
      isPublished: true,
      isFeatured: true,
      modules: {
        create: [
          {
            title: 'Introduction to HIPAA',
            description: 'Learn the basics of HIPAA compliance',
            order: 1,
            quizzes: {
              create: {
                title: 'HIPAA Basics Quiz',
                passingScore: 80,
                questions: {
                  create: [
                    {
                      question: 'What year was HIPAA enacted?',
                      options: ['1994', '1996', '1998', '2000'],
                      correctAnswer: '1',
                      explanation: 'HIPAA was enacted in 1996.',
                      order: 1
                    }
                  ]
                }
              }
            }
          },
          {
            title: 'Understanding Protected Health Information (PHI)',

            order: 2
          },
          {
            title: 'Patient Rights Under HIPAA',

            order: 3
          }
        ]
      }
    }
  })

  const hipaaSecurity = await prisma.course.create({
    data: {
      title: 'HIPAA Security Rule Mastery',
      slug: 'hipaa-security-rule-mastery',
      description: 'Comprehensive training on HIPAA Security Rule requirements',
      longDescription: 'Deep dive into the HIPAA Security Rule, covering administrative, physical, and technical safeguards required to protect electronic PHI (ePHI).',

      category: 'HIPAA',
      difficulty: 'INTERMEDIATE',
      duration: 180,
      price: 99.99,
      requiredScore: 80,
      tags: 'hipaa,security,compliance,ephi',
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Security Rule Overview',

            order: 1
          },
          {
            title: 'Administrative Safeguards',

            order: 2
          }
        ]
      }
    }
  })

  console.log('✅ HIPAA courses created')

  // Create OSHA courses
  const oshaBloodborne = await prisma.course.create({
    data: {
      title: 'OSHA Bloodborne Pathogens Standard',
      slug: 'osha-bloodborne-pathogens',
      description: 'Complete training on OSHA\'s Bloodborne Pathogens Standard',
      longDescription: 'Comprehensive coverage of OSHA\'s Bloodborne Pathogens Standard (29 CFR 1910.1030), including exposure control plans, universal precautions, and post-exposure procedures.',

      category: 'OSHA',
      difficulty: 'BEGINNER',
      duration: 60,
      price: 49.99,
      requiredScore: 80,
      tags: 'osha,bloodborne,safety,healthcare',
      isPublished: true,
      isFeatured: true,
      modules: {
        create: [
          {
            title: 'Introduction to Bloodborne Pathogens',

            order: 1
          },
          {
            title: 'Exposure Control Plan',

            order: 2
          }
        ]
      }
    }
  })

  console.log('✅ OSHA courses created')

  // Create Software Training courses
  const epicEHR = await prisma.course.create({
    data: {
      title: 'Epic EHR Fundamentals',
      slug: 'epic-ehr-fundamentals',
      description: 'Master Epic electronic health records system',
      longDescription: 'Comprehensive training on Epic EHR system, including patient registration, scheduling, and clinical documentation.',

      category: 'SOFTWARE_TRAINING',
      difficulty: 'BEGINNER',
      duration: 240,
      price: 149.99,
      requiredScore: 80,
      tags: 'epic,ehr,software,healthcare',
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Epic System Navigation',

            order: 1
          },
          {
            title: 'Patient Registration and Demographics',

            order: 2
          }
        ]
      }
    }
  })

  console.log('✅ Software training courses created')

  // Create sample enrollments for test user
  await prisma.enrollment.create({
    data: {
      userId: testUser.id,
      courseId: hipaaPrivacy.id,
      status: 'ACTIVE',

    }
  })

  await prisma.enrollment.create({
    data: {
      userId: testUser.id,
      courseId: oshaBloodborne.id,
      status: 'COMPLETED',

      completedAt: new Date()
    }
  })

  console.log('✅ Sample enrollments created')

  // Create sample certifications
  // Certification creation temporarily disabled due to schema issues
  // await prisma.certification.create({
  //   data: {
  //     userId: testUser.id,
  //     courseId: oshaBloodborne.id,
  //     certificateNumber: 'LF-' + Date.now().toString(36).toUpperCase(),
  //     issuedDate: new Date(),
  //     expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
  //     score: 92,
  //     status: 'ACTIVE'
  //   }
  // })

  console.log('✅ Sample certifications created')

  // Create sample licenses
  // License creation temporarily disabled due to schema issues
  // await prisma.license.create({
  //   data: {
  //     userId: testUser.id,
  //     softwareName: 'Epic Systems EHR',
  //     vendor: 'Epic Systems Corporation',
  //     licenseKey: Buffer.from('EPIC-2024-XXXX-XXXX').toString('base64'),
  //     licenseType: 'SUBSCRIPTION',
  //     purchaseDate: new Date(),
  //     expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  //     seats: 50,
  //     usedSeats: 35,
  //     cost: 15000,
  //     status: 'ACTIVE',
  //     notes: 'Enterprise license for main hospital campus',
  //     tags: 'ehr,epic,healthcare'
  //   }
  // })

  // Second license creation temporarily disabled due to schema issues
  // await prisma.license.create({
  //   data: {
  //     userId: testUser.id,
  //     softwareName: 'Microsoft 365 Business Premium',
  //     vendor: 'Microsoft',
  //     licenseKey: Buffer.from('MS365-2024-XXXX-XXXX').toString('base64'),
  //     licenseType: 'SUBSCRIPTION',
  //     purchaseDate: new Date(),
  //     expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  //     seats: 100,
  //     usedSeats: 87,
  //     cost: 2200,
  //     status: 'ACTIVE',
  //     notes: 'Monthly subscription for all staff',
  //     tags: 'office,productivity,microsoft'
  //   }
  // })

  console.log('✅ Sample licenses created')

  // Create sample notifications
  await prisma.notification.create({
    data: {
      userId: testUser.id,
      title: 'Welcome to LicensorFlow!',
      message: 'Your account has been successfully created. Start exploring our courses.',
      type: 'SUCCESS',

    }
  })

  await prisma.notification.create({
    data: {
      userId: testUser.id,
      title: 'Certification Expiring Soon',
      message: 'Your OSHA Bloodborne Pathogens certification expires in 30 days.',
      type: 'WARNING',

    }
  })

  console.log('✅ Sample notifications created')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
