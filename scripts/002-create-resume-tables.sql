-- Create tables for interactive résumé data

-- Work Experience table
CREATE TABLE IF NOT EXISTS work_experience (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    tech_stack TEXT[], -- Array of technologies used
    industry VARCHAR(100),
    company_url VARCHAR(500),
    achievements TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255),
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    gpa DECIMAL(3,2),
    description TEXT,
    achievements TEXT[],
    relevant_coursework TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL, -- e.g., 'Programming Languages', 'Frameworks', 'Tools', 'Cloud Platforms'
    proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5), -- 1-5 scale
    years_experience INTEGER,
    description TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255) NOT NULL,
    issue_date DATE NOT NULL,
    expiration_date DATE,
    credential_id VARCHAR(255),
    credential_url VARCHAR(500),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Added volunteering table for volunteer experience
-- Volunteering table
CREATE TABLE IF NOT EXISTS volunteering (
    id SERIAL PRIMARY KEY,
    organization VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    achievements TEXT[],
    skills_used TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_work_experience_company ON work_experience(company);
CREATE INDEX IF NOT EXISTS idx_work_experience_tech_stack ON work_experience USING GIN(tech_stack);
CREATE INDEX IF NOT EXISTS idx_work_experience_industry ON work_experience(industry);
CREATE INDEX IF NOT EXISTS idx_education_institution ON education(institution);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_featured ON skills(is_featured);
CREATE INDEX IF NOT EXISTS idx_certifications_active ON certifications(is_active);
-- Added index for volunteering table
CREATE INDEX IF NOT EXISTS idx_volunteering_organization ON volunteering(organization);
