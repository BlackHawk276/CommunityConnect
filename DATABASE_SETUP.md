# CommunityConnect Database Setup Guide

This guide will help you set up the database and create sample users for testing the CommunityConnect platform.

## Database Schema

The database has been automatically created with the following tables:

### Tables Created

1. **ngo_profiles** - NGO organization profiles
2. **volunteer_profiles** - Volunteer profiles
3. **tasks** - Volunteer opportunities posted by NGOs
4. **applications** - Applications from volunteers to tasks

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Creating Test Users

Since Supabase Auth requires email verification by default (or manual confirmation), you'll need to create users through the Supabase Dashboard.

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Users**
4. Click **Add user** → **Create new user**

#### Create an NGO User:

**Step 1: Create Auth User**
- Email: `ngo@example.com`
- Password: `password123`
- Auto Confirm User: ✓ (Check this box)
- Click **Create user**

**Step 2: Add NGO Profile**
- Go to **Table Editor** → **ngo_profiles**
- Click **Insert** → **Insert row**
- Fill in:
  - `id`: Copy the UUID from the auth.users table for ngo@example.com
  - `organization_name`: Hope Foundation
  - `contact_person`: Rajesh Kumar
  - `phone`: +91 98765 43210
  - `city`: Mumbai
  - `description`: Empowering communities through education and healthcare initiatives
  - `cause_areas`: ["Education & Literacy", "Healthcare & Medical"]
  - `website`: https://hopefoundation.org
  - Leave `logo`, `created_at`, `updated_at` as default
- Click **Save**

#### Create a Volunteer User:

**Step 1: Create Auth User**
- Email: `volunteer@example.com`
- Password: `password123`
- Auto Confirm User: ✓ (Check this box)
- Click **Create user**

**Step 2: Add Volunteer Profile**
- Go to **Table Editor** → **volunteer_profiles**
- Click **Insert** → **Insert row**
- Fill in:
  - `id`: Copy the UUID from the auth.users table for volunteer@example.com
  - `first_name`: Priya
  - `last_name`: Sharma
  - `phone`: +91 98765 43211
  - `city`: Bangalore
  - `bio`: Passionate about making a difference in my community through education and environmental causes
  - `skills`: ["Teaching & Tutoring", "Content Writing", "Social Media Management"]
  - `availability`: Weekends, 10 hours/week
  - Leave `created_at`, `updated_at` as default
- Click **Save**

### Method 2: Using SQL (Alternative)

You can also create users using SQL in the Supabase SQL Editor:

```sql
-- Note: You'll need to get the actual UUIDs from auth.users after creating the auth users
-- This is just to show the structure

-- Insert NGO Profile (replace 'YOUR_NGO_USER_ID' with actual UUID)
INSERT INTO ngo_profiles (
  id,
  organization_name,
  contact_person,
  phone,
  city,
  description,
  cause_areas,
  website
) VALUES (
  'YOUR_NGO_USER_ID',
  'Hope Foundation',
  'Rajesh Kumar',
  '+91 98765 43210',
  'Mumbai',
  'Empowering communities through education and healthcare initiatives',
  ARRAY['Education & Literacy', 'Healthcare & Medical'],
  'https://hopefoundation.org'
);

-- Insert Volunteer Profile (replace 'YOUR_VOLUNTEER_USER_ID' with actual UUID)
INSERT INTO volunteer_profiles (
  id,
  first_name,
  last_name,
  phone,
  city,
  bio,
  skills,
  availability
) VALUES (
  'YOUR_VOLUNTEER_USER_ID',
  'Priya',
  'Sharma',
  '+91 98765 43211',
  'Bangalore',
  'Passionate about making a difference in my community',
  ARRAY['Teaching & Tutoring', 'Content Writing', 'Social Media Management'],
  'Weekends, 10 hours/week'
);
```

## Creating Sample Tasks

Once you have an NGO user, log in as the NGO and create tasks through the UI, or insert directly:

```sql
-- Insert sample task (replace 'NGO_USER_ID' with actual UUID)
INSERT INTO tasks (
  ngo_id,
  title,
  description,
  cause_area,
  required_skills,
  location,
  hours_per_week,
  duration_months,
  status
) VALUES (
  'NGO_USER_ID',
  'Teaching Assistant for English Classes',
  'We are looking for volunteers to help teach English to underprivileged children in our community center. You will assist our primary teachers in conducting classes, preparing materials, and providing one-on-one attention to students who need extra help.',
  'Education & Literacy',
  ARRAY['Teaching & Tutoring', 'English Language'],
  'Mumbai',
  8,
  6,
  'active'
);
```

## Test Login Credentials

After setup, you can log in with:

### NGO Account
- Email: `ngo@example.com`
- Password: `password123`
- Role: NGO

### Volunteer Account
- Email: `volunteer@example.com`
- Password: `password123`
- Role: Volunteer

## Verification

After creating users:

1. Go to **Authentication** → **Users** in Supabase Dashboard
2. Verify both users appear with "Confirmed" status
3. Go to **Table Editor** → **ngo_profiles** and verify the NGO profile exists
4. Go to **Table Editor** → **volunteer_profiles** and verify the volunteer profile exists

## Troubleshooting

### User Registration Not Working
- Make sure email confirmation is disabled in Supabase Dashboard
- Go to **Authentication** → **Settings** → **Email Auth**
- Uncheck "Enable email confirmations"

### Profile Not Created After Signup
- Check browser console for errors
- Verify RLS policies are correctly set
- Make sure the user is authenticated before creating profile

### Cannot See Tasks/Applications
- Verify the user is logged in
- Check that RLS policies are enabled
- Verify the task status is 'active'

## Additional Users

Feel free to create more test users following the same pattern. Make sure:
- Each auth user has a corresponding profile (either NGO or volunteer)
- The profile `id` matches the auth.users `id`
- All required fields are filled in
