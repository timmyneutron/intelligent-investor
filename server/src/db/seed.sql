INSERT INTO users (name, email) VALUES ('Alex Johnson', 'alex@example.com');

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
