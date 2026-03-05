INSERT INTO users (name, email) VALUES ('Alex Johnson', 'alex@example.com');
INSERT INTO users (name, email) VALUES ('Demo User', 'demo@example.com');
INSERT INTO users (name, email) VALUES ('Admin User', 'admin@example.com');
INSERT INTO users (name, email) VALUES ('Jordan Lee', 'jordan@example.com');

INSERT INTO accounts (user_id, name, type) VALUES
    (1, 'Main Checking', 'checking'),
    (1, 'Savings Account', 'savings'),
    (1, 'Visa Credit Card', 'credit_card');

-- Income transactions (positive amounts) - biweekly paychecks
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (1, '2025-07-01', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-07-15', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-08-01', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-08-15', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-09-01', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-09-15', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-10-01', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-10-15', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-11-01', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-11-15', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-12-01', 'Paycheck - Acme Corp', 4500.00, 'salary'),
    (1, '2025-12-15', 'Paycheck - Acme Corp', 4500.00, 'salary');

-- Savings interest
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (2, '2025-07-31', 'Interest Payment', 45.00, 'interest'),
    (2, '2025-08-31', 'Interest Payment', 46.20, 'interest'),
    (2, '2025-09-30', 'Interest Payment', 47.10, 'interest'),
    (2, '2025-10-31', 'Interest Payment', 48.00, 'interest'),
    (2, '2025-11-30', 'Interest Payment', 48.50, 'interest'),
    (2, '2025-12-31', 'Interest Payment', 49.30, 'interest');

-- Freelance income
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (1, '2025-08-10', 'Freelance Web Design - Smith Co', 1200.00, 'freelance'),
    (1, '2025-10-20', 'Freelance Logo Design', 800.00, 'freelance'),
    (1, '2025-12-05', 'Freelance Consulting', 1500.00, 'freelance');

-- Rent (monthly)
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (1, '2025-07-01', 'Apartment Rent', -1800.00, 'rent'),
    (1, '2025-08-01', 'Apartment Rent', -1800.00, 'rent'),
    (1, '2025-09-01', 'Apartment Rent', -1800.00, 'rent'),
    (1, '2025-10-01', 'Apartment Rent', -1800.00, 'rent'),
    (1, '2025-11-01', 'Apartment Rent', -1800.00, 'rent'),
    (1, '2025-12-01', 'Apartment Rent', -1800.00, 'rent');

-- Utilities
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (1, '2025-07-10', 'Electric Bill - ConEd', -95.40, 'utilities'),
    (1, '2025-07-12', 'Internet - Spectrum', -69.99, 'utilities'),
    (1, '2025-08-10', 'Electric Bill - ConEd', -102.30, 'utilities'),
    (1, '2025-08-12', 'Internet - Spectrum', -69.99, 'utilities'),
    (1, '2025-09-10', 'Electric Bill - ConEd', -88.75, 'utilities'),
    (1, '2025-09-12', 'Internet - Spectrum', -69.99, 'utilities'),
    (1, '2025-10-10', 'Electric Bill - ConEd', -78.20, 'utilities'),
    (1, '2025-10-12', 'Internet - Spectrum', -69.99, 'utilities'),
    (1, '2025-11-10', 'Electric Bill - ConEd', -110.50, 'utilities'),
    (1, '2025-11-12', 'Internet - Spectrum', -69.99, 'utilities'),
    (1, '2025-12-10', 'Electric Bill - ConEd', -125.80, 'utilities'),
    (1, '2025-12-12', 'Internet - Spectrum', -69.99, 'utilities');

-- Groceries
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (1, '2025-07-03', 'Whole Foods Market', -87.34, 'groceries'),
    (1, '2025-07-10', 'Trader Joes', -62.15, 'groceries'),
    (1, '2025-07-18', 'Whole Foods Market', -94.20, 'groceries'),
    (1, '2025-07-25', 'Costco Wholesale', -156.78, 'groceries'),
    (1, '2025-08-02', 'Trader Joes', -71.30, 'groceries'),
    (1, '2025-08-09', 'Whole Foods Market', -88.45, 'groceries'),
    (1, '2025-08-16', 'Safeway', -55.90, 'groceries'),
    (1, '2025-08-24', 'Costco Wholesale', -142.60, 'groceries'),
    (1, '2025-09-01', 'Whole Foods Market', -79.25, 'groceries'),
    (1, '2025-09-08', 'Trader Joes', -68.40, 'groceries'),
    (1, '2025-09-15', 'Whole Foods Market', -91.10, 'groceries'),
    (1, '2025-09-22', 'Safeway', -48.75, 'groceries'),
    (1, '2025-10-05', 'Trader Joes', -73.20, 'groceries'),
    (1, '2025-10-12', 'Whole Foods Market', -85.60, 'groceries'),
    (1, '2025-10-19', 'Costco Wholesale', -168.90, 'groceries'),
    (1, '2025-10-28', 'Safeway', -52.30, 'groceries'),
    (1, '2025-11-03', 'Whole Foods Market', -92.45, 'groceries'),
    (1, '2025-11-10', 'Trader Joes', -78.60, 'groceries'),
    (1, '2025-11-17', 'Whole Foods Market', -105.30, 'groceries'),
    (1, '2025-11-24', 'Costco Wholesale', -198.40, 'groceries'),
    (1, '2025-12-02', 'Trader Joes', -82.15, 'groceries'),
    (1, '2025-12-09', 'Whole Foods Market', -96.70, 'groceries'),
    (1, '2025-12-16', 'Safeway', -61.25, 'groceries'),
    (1, '2025-12-23', 'Whole Foods Market', -145.80, 'groceries');

-- Dining
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (3, '2025-07-05', 'Chipotle Mexican Grill', -14.50, 'dining'),
    (3, '2025-07-12', 'Olive Garden', -42.80, 'dining'),
    (3, '2025-07-20', 'Starbucks', -6.75, 'dining'),
    (3, '2025-08-03', 'Panera Bread', -18.20, 'dining'),
    (3, '2025-08-11', 'Thai Palace Restaurant', -38.90, 'dining'),
    (3, '2025-08-22', 'Starbucks', -7.25, 'dining'),
    (3, '2025-09-06', 'Chipotle Mexican Grill', -15.80, 'dining'),
    (3, '2025-09-14', 'Sushi Zen', -52.40, 'dining'),
    (3, '2025-09-28', 'McDonalds', -12.30, 'dining'),
    (3, '2025-10-04', 'Starbucks', -8.10, 'dining'),
    (3, '2025-10-15', 'Italian Bistro', -65.20, 'dining'),
    (3, '2025-10-25', 'Panera Bread', -16.40, 'dining'),
    (3, '2025-11-02', 'Chipotle Mexican Grill', -15.20, 'dining'),
    (3, '2025-11-14', 'Steakhouse Grill', -78.50, 'dining'),
    (3, '2025-11-22', 'Starbucks', -9.40, 'dining'),
    (3, '2025-12-06', 'Thai Palace Restaurant', -41.60, 'dining'),
    (3, '2025-12-13', 'Pizza Hut', -28.90, 'dining'),
    (3, '2025-12-20', 'Starbucks', -7.80, 'dining'),
    (3, '2025-12-25', 'Christmas Dinner - The Grand', -125.00, 'dining');

-- Transportation
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (1, '2025-07-03', 'Shell Gas Station', -45.00, 'transportation'),
    (1, '2025-07-17', 'Shell Gas Station', -48.50, 'transportation'),
    (3, '2025-07-22', 'Uber Ride', -18.40, 'transportation'),
    (1, '2025-08-05', 'Chevron Gas', -52.30, 'transportation'),
    (1, '2025-08-19', 'Shell Gas Station', -44.80, 'transportation'),
    (3, '2025-08-25', 'Lyft Ride', -22.10, 'transportation'),
    (1, '2025-09-03', 'Shell Gas Station', -46.70, 'transportation'),
    (1, '2025-09-18', 'Chevron Gas', -50.20, 'transportation'),
    (1, '2025-10-02', 'Shell Gas Station', -43.90, 'transportation'),
    (3, '2025-10-10', 'Uber Ride', -24.50, 'transportation'),
    (1, '2025-10-22', 'Shell Gas Station', -47.60, 'transportation'),
    (1, '2025-11-04', 'Chevron Gas', -51.40, 'transportation'),
    (3, '2025-11-15', 'Uber Ride', -19.80, 'transportation'),
    (1, '2025-11-25', 'Shell Gas Station', -49.30, 'transportation'),
    (1, '2025-12-08', 'Shell Gas Station', -46.20, 'transportation'),
    (3, '2025-12-18', 'Uber Ride', -28.70, 'transportation');

-- Subscriptions
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (3, '2025-07-05', 'Netflix Subscription', -15.99, 'subscriptions'),
    (3, '2025-07-05', 'Spotify Premium', -10.99, 'subscriptions'),
    (3, '2025-07-05', 'Gym Membership - Planet Fitness', -24.99, 'subscriptions'),
    (3, '2025-08-05', 'Netflix Subscription', -15.99, 'subscriptions'),
    (3, '2025-08-05', 'Spotify Premium', -10.99, 'subscriptions'),
    (3, '2025-08-05', 'Gym Membership - Planet Fitness', -24.99, 'subscriptions'),
    (3, '2025-09-05', 'Netflix Subscription', -15.99, 'subscriptions'),
    (3, '2025-09-05', 'Spotify Premium', -10.99, 'subscriptions'),
    (3, '2025-09-05', 'Gym Membership - Planet Fitness', -24.99, 'subscriptions'),
    (3, '2025-10-05', 'Netflix Subscription', -15.99, 'subscriptions'),
    (3, '2025-10-05', 'Spotify Premium', -10.99, 'subscriptions'),
    (3, '2025-10-05', 'Gym Membership - Planet Fitness', -24.99, 'subscriptions'),
    (3, '2025-11-05', 'Netflix Subscription', -15.99, 'subscriptions'),
    (3, '2025-11-05', 'Spotify Premium', -10.99, 'subscriptions'),
    (3, '2025-11-05', 'Gym Membership - Planet Fitness', -24.99, 'subscriptions'),
    (3, '2025-12-05', 'Netflix Subscription', -15.99, 'subscriptions'),
    (3, '2025-12-05', 'Spotify Premium', -10.99, 'subscriptions'),
    (3, '2025-12-05', 'Gym Membership - Planet Fitness', -24.99, 'subscriptions');

-- Shopping
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (3, '2025-07-08', 'Amazon - Wireless Mouse', -29.99, 'shopping'),
    (3, '2025-07-20', 'Target - Home Supplies', -67.45, 'shopping'),
    (3, '2025-08-14', 'Amazon - Books', -42.97, 'shopping'),
    (3, '2025-09-02', 'Best Buy - Headphones', -89.99, 'shopping'),
    (3, '2025-09-18', 'Amazon - Phone Case', -15.99, 'shopping'),
    (3, '2025-10-08', 'Target - Clothing', -78.50, 'shopping'),
    (3, '2025-10-31', 'Amazon - Halloween Decorations', -34.99, 'shopping'),
    (3, '2025-11-28', 'Amazon - Black Friday Deals', -189.97, 'shopping'),
    (3, '2025-12-10', 'Target - Christmas Gifts', -156.80, 'shopping'),
    (3, '2025-12-15', 'Amazon - Gift Cards', -100.00, 'shopping');

-- Healthcare
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (1, '2025-07-15', 'CVS Pharmacy', -32.50, 'healthcare'),
    (1, '2025-08-20', 'Dr. Smith - Copay', -40.00, 'healthcare'),
    (1, '2025-09-10', 'CVS Pharmacy', -28.75, 'healthcare'),
    (1, '2025-10-25', 'Dental Cleaning - Dr. Lee', -75.00, 'healthcare'),
    (1, '2025-11-15', 'CVS Pharmacy', -45.30, 'healthcare'),
    (1, '2025-12-20', 'Eye Exam - VisionWorks', -60.00, 'healthcare');

-- Entertainment
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (3, '2025-07-14', 'AMC Movie Theater', -24.00, 'entertainment'),
    (3, '2025-08-08', 'Concert Tickets - Live Nation', -85.00, 'entertainment'),
    (3, '2025-09-20', 'AMC Movie Theater', -28.00, 'entertainment'),
    (3, '2025-10-15', 'Bowling Alley', -35.00, 'entertainment'),
    (3, '2025-11-10', 'AMC Movie Theater', -24.00, 'entertainment'),
    (3, '2025-12-28', 'New Years Eve Party Supplies', -55.00, 'entertainment');

-- Travel
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (3, '2025-08-15', 'Delta Airlines - Flight to Chicago', -320.00, 'travel'),
    (3, '2025-08-16', 'Hilton Hotel - Chicago', -189.00, 'travel'),
    (3, '2025-11-20', 'Southwest Airlines - Thanksgiving Trip', -245.00, 'travel'),
    (3, '2025-11-21', 'Airbnb - Family Stay', -210.00, 'travel');

-- Uncategorized transactions (for AI auto-categorization demo)
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (1, '2025-11-05', 'COSTCO WHSE #1234', -234.56, 'uncategorized'),
    (3, '2025-11-08', 'UBER *TRIP HELP.UBER.COM', -22.40, 'uncategorized'),
    (1, '2025-11-12', 'SQ *BLUE BOTTLE COFFEE', -8.50, 'uncategorized'),
    (3, '2025-11-18', 'AMZN MKTP US*2K4F5G6H', -67.89, 'uncategorized'),
    (1, '2025-11-22', 'SHELL OIL 57442365700', -52.30, 'uncategorized'),
    (3, '2025-11-25', 'HULU 877-824-4858', -17.99, 'uncategorized'),
    (1, '2025-12-01', 'SPOTIFY USA', -10.99, 'uncategorized'),
    (3, '2025-12-03', 'TST* THAI BASIL', -34.50, 'uncategorized'),
    (1, '2025-12-07', 'WALGREENS #12345', -23.45, 'uncategorized'),
    (3, '2025-12-10', 'LYFT *RIDE SUN', -16.80, 'uncategorized'),
    (1, '2025-12-14', 'TGT 0012345678', -89.99, 'uncategorized'),
    (3, '2025-12-17', 'DOORDASH*CHIPOTLE', -19.50, 'uncategorized'),
    (1, '2025-12-20', 'WM SUPERCENTER #4567', -78.34, 'uncategorized'),
    (3, '2025-12-22', 'FANDANGO.COM', -28.00, 'uncategorized'),
    (1, '2025-12-26', 'CVS/PHARMACY #08765', -31.20, 'uncategorized');

-- ====================================================================
-- Jordan Lee (user_id=4) - Software engineer, different financial profile
-- ====================================================================

INSERT INTO accounts (user_id, name, type) VALUES
    (4, 'Primary Checking', 'checking'),
    (4, 'High-Yield Savings', 'savings'),
    (4, 'Amex Gold Card', 'credit_card');

-- Income - biweekly paychecks from TechStart Inc
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (4, '2025-07-01', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-07-15', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-08-01', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-08-15', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-09-01', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-09-15', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-10-01', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-10-15', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-11-01', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-11-15', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-12-01', 'Paycheck - TechStart Inc', 5200.00, 'salary'),
    (4, '2025-12-15', 'Paycheck - TechStart Inc', 5200.00, 'salary');

-- Savings interest
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (5, '2025-07-31', 'Interest Payment', 62.50, 'interest'),
    (5, '2025-08-31', 'Interest Payment', 63.80, 'interest'),
    (5, '2025-09-30', 'Interest Payment', 64.40, 'interest'),
    (5, '2025-10-31', 'Interest Payment', 65.10, 'interest'),
    (5, '2025-11-30', 'Interest Payment', 66.00, 'interest'),
    (5, '2025-12-31', 'Interest Payment', 66.75, 'interest');

-- Side project income
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (4, '2025-07-20', 'Indie App Sales - App Store', 340.00, 'freelance'),
    (4, '2025-09-15', 'Indie App Sales - App Store', 410.00, 'freelance'),
    (4, '2025-11-10', 'Indie App Sales - App Store', 525.00, 'freelance'),
    (4, '2025-12-12', 'Consulting - DataFlow Corp', 2000.00, 'freelance');

-- Rent (monthly)
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (4, '2025-07-01', 'Apartment Rent - Oakwood Apts', -2200.00, 'rent'),
    (4, '2025-08-01', 'Apartment Rent - Oakwood Apts', -2200.00, 'rent'),
    (4, '2025-09-01', 'Apartment Rent - Oakwood Apts', -2200.00, 'rent'),
    (4, '2025-10-01', 'Apartment Rent - Oakwood Apts', -2200.00, 'rent'),
    (4, '2025-11-01', 'Apartment Rent - Oakwood Apts', -2200.00, 'rent'),
    (4, '2025-12-01', 'Apartment Rent - Oakwood Apts', -2200.00, 'rent');

-- Utilities
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (4, '2025-07-08', 'Electric Bill - PG&E', -82.30, 'utilities'),
    (4, '2025-07-10', 'Internet - AT&T Fiber', -59.99, 'utilities'),
    (4, '2025-08-08', 'Electric Bill - PG&E', -91.50, 'utilities'),
    (4, '2025-08-10', 'Internet - AT&T Fiber', -59.99, 'utilities'),
    (4, '2025-09-08', 'Electric Bill - PG&E', -76.40, 'utilities'),
    (4, '2025-09-10', 'Internet - AT&T Fiber', -59.99, 'utilities'),
    (4, '2025-10-08', 'Electric Bill - PG&E', -68.90, 'utilities'),
    (4, '2025-10-10', 'Internet - AT&T Fiber', -59.99, 'utilities'),
    (4, '2025-11-08', 'Electric Bill - PG&E', -98.20, 'utilities'),
    (4, '2025-11-10', 'Internet - AT&T Fiber', -59.99, 'utilities'),
    (4, '2025-12-08', 'Electric Bill - PG&E', -115.60, 'utilities'),
    (4, '2025-12-10', 'Internet - AT&T Fiber', -59.99, 'utilities');

-- Groceries
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (4, '2025-07-05', 'Aldi', -58.20, 'groceries'),
    (4, '2025-07-13', 'H-E-B', -92.45, 'groceries'),
    (4, '2025-07-22', 'Aldi', -64.30, 'groceries'),
    (4, '2025-08-03', 'H-E-B', -78.90, 'groceries'),
    (4, '2025-08-11', 'Sprouts Farmers Market', -105.60, 'groceries'),
    (4, '2025-08-20', 'Aldi', -52.15, 'groceries'),
    (4, '2025-09-02', 'H-E-B', -88.30, 'groceries'),
    (4, '2025-09-14', 'Aldi', -61.75, 'groceries'),
    (4, '2025-09-25', 'Sprouts Farmers Market', -97.40, 'groceries'),
    (4, '2025-10-06', 'H-E-B', -83.20, 'groceries'),
    (4, '2025-10-15', 'Aldi', -55.90, 'groceries'),
    (4, '2025-10-27', 'H-E-B', -110.45, 'groceries'),
    (4, '2025-11-04', 'Sprouts Farmers Market', -72.80, 'groceries'),
    (4, '2025-11-13', 'H-E-B', -94.35, 'groceries'),
    (4, '2025-11-22', 'Aldi', -68.50, 'groceries'),
    (4, '2025-11-26', 'H-E-B - Thanksgiving', -185.20, 'groceries'),
    (4, '2025-12-05', 'Aldi', -59.90, 'groceries'),
    (4, '2025-12-14', 'H-E-B', -102.75, 'groceries'),
    (4, '2025-12-22', 'Sprouts Farmers Market', -132.40, 'groceries');

-- Dining
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (6, '2025-07-06', 'Pho King Vietnamese', -22.50, 'dining'),
    (6, '2025-07-15', 'In-N-Out Burger', -11.80, 'dining'),
    (6, '2025-07-28', 'Ramen Tatsu-Ya', -36.00, 'dining'),
    (6, '2025-08-04', 'Torchys Tacos', -18.90, 'dining'),
    (6, '2025-08-17', 'Capital Grille', -95.40, 'dining'),
    (6, '2025-08-25', 'Starbucks', -8.45, 'dining'),
    (6, '2025-09-07', 'In-N-Out Burger', -13.20, 'dining'),
    (6, '2025-09-19', 'Uchi Restaurant', -82.00, 'dining'),
    (6, '2025-09-30', 'Pho King Vietnamese', -24.30, 'dining'),
    (6, '2025-10-08', 'Starbucks', -9.10, 'dining'),
    (6, '2025-10-18', 'Torchys Tacos', -21.50, 'dining'),
    (6, '2025-10-29', 'Ramen Tatsu-Ya', -38.00, 'dining'),
    (6, '2025-11-06', 'In-N-Out Burger', -12.40, 'dining'),
    (6, '2025-11-16', 'Franklin Barbecue', -48.00, 'dining'),
    (6, '2025-11-28', 'Starbucks', -7.90, 'dining'),
    (6, '2025-12-07', 'Torchys Tacos', -19.80, 'dining'),
    (6, '2025-12-14', 'Pho King Vietnamese', -25.60, 'dining'),
    (6, '2025-12-24', 'Holiday Dinner - Flemings', -140.00, 'dining');

-- Transportation
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (4, '2025-07-07', 'BP Gas Station', -42.30, 'transportation'),
    (4, '2025-07-21', 'BP Gas Station', -39.80, 'transportation'),
    (6, '2025-07-26', 'Uber Ride', -15.60, 'transportation'),
    (4, '2025-08-04', 'Exxon Gas', -44.50, 'transportation'),
    (4, '2025-08-18', 'BP Gas Station', -41.20, 'transportation'),
    (4, '2025-09-01', 'Exxon Gas', -43.70, 'transportation'),
    (6, '2025-09-12', 'Lyft Ride', -19.40, 'transportation'),
    (4, '2025-09-22', 'BP Gas Station', -40.60, 'transportation'),
    (4, '2025-10-06', 'BP Gas Station', -45.10, 'transportation'),
    (4, '2025-10-20', 'Exxon Gas', -42.80, 'transportation'),
    (6, '2025-11-01', 'Uber Ride', -21.30, 'transportation'),
    (4, '2025-11-10', 'BP Gas Station', -46.50, 'transportation'),
    (4, '2025-11-24', 'Exxon Gas', -44.00, 'transportation'),
    (4, '2025-12-05', 'BP Gas Station', -48.20, 'transportation'),
    (6, '2025-12-15', 'Lyft Ride', -17.90, 'transportation'),
    (4, '2025-12-22', 'BP Gas Station', -43.60, 'transportation');

-- Subscriptions
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (6, '2025-07-01', 'YouTube Premium', -13.99, 'subscriptions'),
    (6, '2025-07-01', 'Apple Music', -10.99, 'subscriptions'),
    (6, '2025-07-01', 'CrossFit Gym Membership', -49.99, 'subscriptions'),
    (6, '2025-08-01', 'YouTube Premium', -13.99, 'subscriptions'),
    (6, '2025-08-01', 'Apple Music', -10.99, 'subscriptions'),
    (6, '2025-08-01', 'CrossFit Gym Membership', -49.99, 'subscriptions'),
    (6, '2025-09-01', 'YouTube Premium', -13.99, 'subscriptions'),
    (6, '2025-09-01', 'Apple Music', -10.99, 'subscriptions'),
    (6, '2025-09-01', 'CrossFit Gym Membership', -49.99, 'subscriptions'),
    (6, '2025-10-01', 'YouTube Premium', -13.99, 'subscriptions'),
    (6, '2025-10-01', 'Apple Music', -10.99, 'subscriptions'),
    (6, '2025-10-01', 'CrossFit Gym Membership', -49.99, 'subscriptions'),
    (6, '2025-11-01', 'YouTube Premium', -13.99, 'subscriptions'),
    (6, '2025-11-01', 'Apple Music', -10.99, 'subscriptions'),
    (6, '2025-11-01', 'CrossFit Gym Membership', -49.99, 'subscriptions'),
    (6, '2025-12-01', 'YouTube Premium', -13.99, 'subscriptions'),
    (6, '2025-12-01', 'Apple Music', -10.99, 'subscriptions'),
    (6, '2025-12-01', 'CrossFit Gym Membership', -49.99, 'subscriptions');

-- Shopping
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (6, '2025-07-10', 'Amazon - Mechanical Keyboard', -149.99, 'shopping'),
    (6, '2025-08-05', 'REI - Hiking Boots', -175.00, 'shopping'),
    (6, '2025-08-22', 'Amazon - USB-C Hub', -39.99, 'shopping'),
    (6, '2025-09-12', 'Nordstrom - Fall Jacket', -220.00, 'shopping'),
    (6, '2025-10-05', 'Amazon - Standing Desk Mat', -45.99, 'shopping'),
    (6, '2025-10-30', 'REI - Camping Gear', -312.50, 'shopping'),
    (6, '2025-11-28', 'Amazon - Black Friday Electronics', -275.00, 'shopping'),
    (6, '2025-12-08', 'Nordstrom - Winter Coat', -195.00, 'shopping'),
    (6, '2025-12-18', 'Amazon - Christmas Gifts', -220.00, 'shopping');

-- Healthcare
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (4, '2025-07-20', 'Walgreens Pharmacy', -18.50, 'healthcare'),
    (4, '2025-08-15', 'Dr. Patel - Annual Checkup', -50.00, 'healthcare'),
    (4, '2025-09-25', 'Walgreens Pharmacy', -24.30, 'healthcare'),
    (4, '2025-10-18', 'Dental Cleaning - Bright Smiles', -85.00, 'healthcare'),
    (4, '2025-11-22', 'Walgreens Pharmacy', -35.60, 'healthcare'),
    (4, '2025-12-10', 'Optometrist - ClearVision', -55.00, 'healthcare');

-- Entertainment
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (6, '2025-07-19', 'Alamo Drafthouse Cinema', -32.00, 'entertainment'),
    (6, '2025-08-10', 'Austin City Limits Tickets', -150.00, 'entertainment'),
    (6, '2025-09-14', 'Topgolf', -55.00, 'entertainment'),
    (6, '2025-10-12', 'Alamo Drafthouse Cinema', -28.00, 'entertainment'),
    (6, '2025-11-08', 'Escape Room - Puzzle Effect', -40.00, 'entertainment'),
    (6, '2025-12-30', 'New Years Eve Bar Tab', -85.00, 'entertainment');

-- Travel
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (6, '2025-07-25', 'United Airlines - Flight to Denver', -280.00, 'travel'),
    (6, '2025-07-26', 'Marriott Hotel - Denver', -165.00, 'travel'),
    (6, '2025-10-10', 'JetBlue - Flight to NYC', -350.00, 'travel'),
    (6, '2025-10-11', 'Airbnb - Brooklyn Apt', -195.00, 'travel'),
    (6, '2025-10-12', 'Airbnb - Brooklyn Apt', -195.00, 'travel');

-- Uncategorized transactions (for AI auto-categorization demo)
INSERT INTO transactions (account_id, date, description, amount, category) VALUES
    (4, '2025-11-03', 'HEB #0421 AUSTIN TX', -98.45, 'uncategorized'),
    (6, '2025-11-07', 'UBER *TRIP HELP.UBER.COM', -18.60, 'uncategorized'),
    (4, '2025-11-11', 'SQ *JO''S COFFEE', -6.75, 'uncategorized'),
    (6, '2025-11-16', 'AMZN MKTP US*3R7K9P2M', -54.99, 'uncategorized'),
    (4, '2025-11-20', 'EXXON MOBIL 84729301', -47.80, 'uncategorized'),
    (6, '2025-11-24', 'YOUTUBE PREMIUM', -13.99, 'uncategorized'),
    (4, '2025-12-02', 'APPLE.COM/MUSIC', -10.99, 'uncategorized'),
    (6, '2025-12-05', 'TST* RAMEN TATSUYA', -38.50, 'uncategorized'),
    (4, '2025-12-09', 'WALGREENS #09876', -19.75, 'uncategorized'),
    (6, '2025-12-12', 'LYFT *RIDE THU', -14.20, 'uncategorized'),
    (4, '2025-12-16', 'REI #45 AUSTIN TX', -65.00, 'uncategorized'),
    (6, '2025-12-19', 'DOORDASH*TORCHYS', -24.30, 'uncategorized'),
    (4, '2025-12-21', 'HEB #0421 AUSTIN TX', -112.60, 'uncategorized'),
    (6, '2025-12-24', 'ALAMO DRAFTHOUSE', -36.00, 'uncategorized');
