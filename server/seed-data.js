const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const bcrypt = require('bcryptjs');

const buyers = [
  {
    email: 'john.smith@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Smith',
    userType: 'buyer',
    profile: {
      investmentRange: '1m-5m',
      experienceLevel: 'intermediate',
      preferredIndustries: ['technology', 'healthcare'],
      timeline: '6-12 months',
      businessSize: '10-50 employees',
      locationPreference: 'United States',
      liquidCapital: '2m-5m',
      riskTolerance: 'moderate',
      bio: 'Experienced entrepreneur looking to acquire a technology or healthcare business with strong growth potential.'
    }
  },
  {
    email: 'sarah.johnson@example.com',
    password: 'password123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    userType: 'buyer',
    profile: {
      investmentRange: '500k-1m',
      experienceLevel: 'beginner',
      preferredIndustries: ['retail', 'food'],
      timeline: '3-6 months',
      businessSize: '5-20 employees',
      locationPreference: 'California',
      liquidCapital: '500k-1m',
      riskTolerance: 'conservative',
      bio: 'First-time buyer seeking a stable retail or food business with established customer base.'
    }
  },
  {
    email: 'michael.chen@example.com',
    password: 'password123',
    firstName: 'Michael',
    lastName: 'Chen',
    userType: 'buyer',
    profile: {
      investmentRange: '5m-10m',
      experienceLevel: 'advanced',
      preferredIndustries: ['manufacturing', 'logistics'],
      timeline: '12-18 months',
      businessSize: '50-200 employees',
      locationPreference: 'Texas',
      liquidCapital: '5m-10m',
      riskTolerance: 'aggressive',
      bio: 'Serial entrepreneur with 15+ years experience in manufacturing. Looking for scalable operations.'
    }
  },
  {
    email: 'emily.davis@example.com',
    password: 'password123',
    firstName: 'Emily',
    lastName: 'Davis',
    userType: 'buyer',
    profile: {
      investmentRange: '100k-500k',
      experienceLevel: 'beginner',
      preferredIndustries: ['services', 'consulting'],
      timeline: '3-6 months',
      businessSize: '1-10 employees',
      locationPreference: 'New York',
      liquidCapital: '200k-500k',
      riskTolerance: 'moderate',
      bio: 'Marketing professional looking to acquire a service-based business to leverage my expertise.'
    }
  },
  {
    email: 'david.wilson@example.com',
    password: 'password123',
    firstName: 'David',
    lastName: 'Wilson',
    userType: 'buyer',
    profile: {
      investmentRange: '10m+',
      experienceLevel: 'advanced',
      preferredIndustries: ['finance', 'real-estate'],
      timeline: '6-12 months',
      businessSize: '200+ employees',
      locationPreference: 'Florida',
      liquidCapital: '10m+',
      riskTolerance: 'aggressive',
      bio: 'Private equity investor seeking large-scale opportunities in finance or real estate sectors.'
    }
  }
];

const sellers = [
  {
    email: 'robert.brown@techstartup.com',
    password: 'password123',
    firstName: 'Robert',
    lastName: 'Brown',
    userType: 'seller',
    profile: {
      investmentRange: '2m-3m',
      experienceLevel: '5 years',
      preferredIndustries: ['technology'],
      timeline: '3-6 months',
      businessSize: '15 employees',
      locationPreference: 'Silicon Valley',
      liquidCapital: '500k-1m',
      riskTolerance: 'moderate',
      bio: 'SaaS startup with $2M ARR, 40% YoY growth. Looking for strategic buyer to scale operations.'
    }
  },
  {
    email: 'lisa.garcia@restaurant.com',
    password: 'password123',
    firstName: 'Lisa',
    lastName: 'Garcia',
    userType: 'seller',
    profile: {
      investmentRange: '800k-1.2m',
      experienceLevel: '8 years',
      preferredIndustries: ['food'],
      timeline: '6-12 months',
      businessSize: '25 employees',
      locationPreference: 'Los Angeles',
      liquidCapital: '200k-500k',
      riskTolerance: 'conservative',
      bio: 'Popular restaurant chain with 3 locations, $1.5M annual revenue. Family-owned for 8 years.'
    }
  },
  {
    email: 'james.miller@manufacturing.com',
    password: 'password123',
    firstName: 'James',
    lastName: 'Miller',
    userType: 'seller',
    profile: {
      investmentRange: '8m-12m',
      experienceLevel: '20 years',
      preferredIndustries: ['manufacturing'],
      timeline: '12-18 months',
      businessSize: '150 employees',
      locationPreference: 'Michigan',
      liquidCapital: '2m-5m',
      riskTolerance: 'moderate',
      bio: 'Automotive parts manufacturer with $15M revenue, established contracts with major OEMs.'
    }
  },
  {
    email: 'anna.rodriguez@consulting.com',
    password: 'password123',
    firstName: 'Anna',
    lastName: 'Rodriguez',
    userType: 'seller',
    profile: {
      investmentRange: '300k-500k',
      experienceLevel: '6 years',
      preferredIndustries: ['consulting'],
      timeline: '3-6 months',
      businessSize: '8 employees',
      locationPreference: 'Chicago',
      liquidCapital: '100k-300k',
      riskTolerance: 'conservative',
      bio: 'Management consulting firm specializing in healthcare. $800K annual revenue, 95% client retention.'
    }
  },
  {
    email: 'thomas.lee@retail.com',
    password: 'password123',
    firstName: 'Thomas',
    lastName: 'Lee',
    userType: 'seller',
    profile: {
      investmentRange: '1.5m-2.5m',
      experienceLevel: '12 years',
      preferredIndustries: ['retail'],
      timeline: '6-12 months',
      businessSize: '45 employees',
      locationPreference: 'Seattle',
      liquidCapital: '500k-1m',
      riskTolerance: 'moderate',
      bio: 'Specialty retail chain with 5 locations, $4M annual revenue. Strong e-commerce presence.'
    }
  }
];

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await pool.query('DELETE FROM profiles');
    await pool.query('DELETE FROM users');

    // Insert buyers
    for (const buyer of buyers) {
      const hashedPassword = await bcrypt.hash(buyer.password, 10);
      
      const userResult = await pool.query(
        'INSERT INTO users (email, password, user_type, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [buyer.email, hashedPassword, buyer.userType, buyer.firstName, buyer.lastName]
      );

      const userId = userResult.rows[0].id;

      await pool.query(
        `INSERT INTO profiles (
          user_id, investment_range, experience_level, preferred_industries, 
          timeline, business_size, location_preference, liquid_capital, 
          risk_tolerance, bio
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          userId,
          buyer.profile.investmentRange,
          buyer.profile.experienceLevel,
          buyer.profile.preferredIndustries,
          buyer.profile.timeline,
          buyer.profile.businessSize,
          buyer.profile.locationPreference,
          buyer.profile.liquidCapital,
          buyer.profile.riskTolerance,
          buyer.profile.bio
        ]
      );

      console.log(`Created buyer: ${buyer.firstName} ${buyer.lastName}`);
    }

    // Insert sellers
    for (const seller of sellers) {
      const hashedPassword = await bcrypt.hash(seller.password, 10);
      
      const userResult = await pool.query(
        'INSERT INTO users (email, password, user_type, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [seller.email, hashedPassword, seller.userType, seller.firstName, seller.lastName]
      );

      const userId = userResult.rows[0].id;

      await pool.query(
        `INSERT INTO profiles (
          user_id, investment_range, experience_level, preferred_industries, 
          timeline, business_size, location_preference, liquid_capital, 
          risk_tolerance, bio
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          userId,
          seller.profile.investmentRange,
          seller.profile.experienceLevel,
          seller.profile.preferredIndustries,
          seller.profile.timeline,
          seller.profile.businessSize,
          seller.profile.locationPreference,
          seller.profile.liquidCapital,
          seller.profile.riskTolerance,
          seller.profile.bio
        ]
      );

      console.log(`Created seller: ${seller.firstName} ${seller.lastName}`);
    }

    console.log('Database seeding completed successfully!');
    console.log(`Created ${buyers.length} buyers and ${sellers.length} sellers`);
    
    // Display login credentials
    console.log('\n=== Login Credentials ===');
    console.log('Buyers:');
    buyers.forEach(buyer => {
      console.log(`${buyer.firstName} ${buyer.lastName}: ${buyer.email} / password123`);
    });
    
    console.log('\nSellers:');
    sellers.forEach(seller => {
      console.log(`${seller.firstName} ${seller.lastName}: ${seller.email} / password123`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedDatabase();
