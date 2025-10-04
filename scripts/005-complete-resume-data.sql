-- Complete Resume Data with Volunteering Section
-- Clear existing resume data
DELETE FROM volunteering;
DELETE FROM certifications;
DELETE FROM skills;
DELETE FROM education;
DELETE FROM work_experience;

-- Reset sequences to start from 1
ALTER SEQUENCE work_experience_id_seq RESTART WITH 1;
ALTER SEQUENCE education_id_seq RESTART WITH 1;
ALTER SEQUENCE skills_id_seq RESTART WITH 1;
ALTER SEQUENCE certifications_id_seq RESTART WITH 1;
ALTER SEQUENCE volunteering_id_seq RESTART WITH 1;

-- Insert work experience (professional development programs only)
INSERT INTO work_experience (company, position, location, start_date, end_date, is_current, description, tech_stack, industry, company_url, achievements) VALUES
('Ghaymah', 'Professional Development Program — DevOps Engineering Track', 'Remote', '2025-09-01', '2025-12-31', FALSE, 'First EMEA Cloud Provider in the region. Comprehensive DevOps training program focusing on modern cloud-native technologies and practices', ARRAY['CI/CD', 'GitHub Actions', 'Docker', 'Kubernetes', 'Ansible', 'Terraform', 'Linux'], 'Cloud Services', 'https://ghaymah.com', ARRAY['Completed Infrastructure as Code (IaC) training', 'Mastered CI/CD pipeline development', 'Advanced Linux administration skills']);

-- Insert volunteering experience
INSERT INTO volunteering (organization, position, location, start_date, end_date, is_current, description, achievements, skills_used) VALUES
('Digital Egypt Pioneers Initiative', 'Group Leader Volunteer', 'Cairo, Egypt', '2025-06-01', NULL, TRUE, 'Volunteer leadership role guiding and supporting peer groups in cloud and DevOps learning', ARRAY['Guided 20 DEPI participants in collaborative learning', 'Established Google Drive repository for resource sharing', 'Coordinated online and in-person study sessions', 'Mentored junior participants through technical challenges'], ARRAY['Leadership', 'Mentoring', 'Google Drive', 'Collaboration', 'Training']);

-- Insert education
INSERT INTO education (institution, degree, field_of_study, location, start_date, end_date, is_current, gpa, description, achievements, relevant_coursework) VALUES
('Helwan University', 'Bachelor''s Degree', 'Information Systems', 'Cairo, Egypt', '2018-09-01', '2023-01-31', FALSE, 3.0, 'Comprehensive Information Systems program with focus on software development and data management', ARRAY['Graduation Project Grade: A+', 'Strong foundation in software development'], ARRAY['Data Structures', 'Algorithms', 'Software Development', 'Databases', 'Data Analysis']);

-- Insert skills (all set to intermediate level with years hidden)
INSERT INTO skills (name, category, proficiency_level, years_experience, description, is_featured) VALUES
-- Programming Languages
('Python', 'Programming Languages', 3, 3, 'Backend development and automation scripts', TRUE),
('Java', 'Programming Languages', 3, 2, 'Object-oriented programming and enterprise applications', FALSE),
('C', 'Programming Languages', 3, 2, 'Systems programming and low-level development', FALSE),
('Go', 'Programming Languages', 3, 1, 'Modern systems programming and microservices', TRUE),

-- DevOps Tools
('Docker', 'DevOps Tools', 3, 2, 'Containerization and container orchestration', TRUE),
('Kubernetes', 'DevOps Tools', 3, 2, 'Container orchestration and cluster management', TRUE),
('Ansible', 'DevOps Tools', 3, 1, 'Configuration management and automation', TRUE),
('Terraform', 'DevOps Tools', 3, 1, 'Infrastructure as Code and provisioning', TRUE),
('Git', 'DevOps Tools', 3, 3, 'Version control and collaboration', TRUE),
('GitHub Actions', 'DevOps Tools', 3, 1, 'CI/CD pipeline automation', TRUE),
('Azure DevOps', 'DevOps Tools', 3, 1, 'Microsoft DevOps platform and CI/CD', FALSE),
('GitLab CI/CD', 'DevOps Tools', 3, 1, 'GitLab continuous integration and deployment', FALSE),

-- Cloud Platforms
('AWS', 'Cloud Platforms', 3, 2, 'Amazon Web Services - EC2, S3, EBS, and more', TRUE),
('GCP', 'Cloud Platforms', 3, 1, 'Google Cloud Platform services and infrastructure', TRUE),
('Azure', 'Cloud Platforms', 3, 1, 'Microsoft Azure cloud services', FALSE),
('Huawei Cloud', 'Cloud Platforms', 3, 1, 'Huawei cloud infrastructure services', FALSE),

-- Databases
('SQL Server', 'Databases', 3, 2, 'Microsoft SQL Server database management', FALSE),
('MySQL', 'Databases', 3, 2, 'Open-source relational database', TRUE),
('MariaDB', 'Databases', 3, 2, 'MySQL-compatible database system', TRUE),
('SQLite', 'Databases', 3, 2, 'Lightweight embedded database', FALSE),

-- Data Tools
('Power BI', 'Data Tools', 3, 1, 'Business intelligence and data visualization', FALSE),
('Excel', 'Data Tools', 3, 3, 'Advanced spreadsheet analysis and automation', FALSE),

-- Networking
('CCNA 200-301', 'Networking', 3, 1, 'Cisco networking fundamentals and routing', FALSE),

-- Web Technologies
('Flask', 'Web Frameworks', 3, 2, 'Python web framework for backend development', TRUE),
('Nginx', 'Web Technologies', 3, 1, 'Web server and reverse proxy configuration', FALSE),
('TailwindCSS', 'Frontend Technologies', 3, 1, 'Utility-first CSS framework', FALSE),
('AJAX', 'Frontend Technologies', 3, 1, 'Asynchronous web development', FALSE),

-- System Administration
('Linux Administration', 'System Administration', 3, 2, 'Linux server management and automation', TRUE),
('Alembic', 'Database Tools', 3, 1, 'Database migration tool for SQLAlchemy', FALSE);

-- Insert certifications with specific Credly badge links
INSERT INTO certifications (name, issuing_organization, issue_date, expiration_date, credential_id, credential_url, description, is_active) VALUES
('LFS158: Introduction to Kubernetes', 'Linux Foundation', '2025-05-31', NULL, 'LF-K8S-2025', 'https://www.credly.com/badges/51c611b7-918e-4bac-b38e-9ed117b47577', 'Comprehensive Kubernetes fundamentals', TRUE),
('LFS101: Introduction to Linux', 'Linux Foundation', '2025-05-30', NULL, 'LF-LINUX-2025', 'https://www.credly.com/badges/d350bb5e-9bdc-40f1-bf68-bac8b2ccca65', 'Linux operating system fundamentals', TRUE),
('LFS151: Introduction to Cloud Infrastructure Technologies', 'Linux Foundation', '2025-05-30', NULL, 'LF-CLOUD-2025', 'https://www.credly.com/badges/82f07f22-baec-4c8d-9b70-a78f0fad9c29', 'Cloud infrastructure technologies overview', TRUE),
('Deploy Kubernetes Applications on Google Cloud Skill Badge', 'Google Cloud Skills Boost', '2025-08-27', NULL, 'GSB-K8S-2025', 'https://www.credly.com/badges/8df0e75e-e630-4d4d-bd25-a4087ea7d93c', 'Kubernetes deployment and management on GCP', TRUE),
('Build Infrastructure with Terraform on Google Cloud Skill Badge', 'Google Cloud Skills Boost', '2025-08-30', NULL, 'GSB-TF-2025', 'https://www.credly.com/badges/300cd331-899d-46e3-8fd1-96b216f6a05d', 'Infrastructure as Code with Terraform on GCP', TRUE),
('Manage Kubernetes in Google Cloud Skill Badge', 'Google Cloud Skills Boost', '2025-08-10', NULL, 'GSB-MK8S-2025', 'https://www.credly.com/badges/8937b54b-2bf7-47f4-9693-af491447843f', 'Advanced Kubernetes management on GCP', TRUE);
