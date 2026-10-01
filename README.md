# Business Lens Pro

BUILD A PROFESSIONAL BUSINESS DATA ANALYSIS PLATFORM CALLED:

BUSINESSLENS

THIS IS A REAL PRODUCT FRONTEND.

It will eventually connect to a real backend and live business data.

Do NOT treat this as a toy dashboard.

Do NOT build fake AI-looking filler.

Do NOT make a generic SaaS template.

Do NOT stop after creating a few charts.

BUILD THE COMPLETE FRONTEND EXPERIENCE SCREEN BY SCREEN.

==================================================

1. FIRST: INSPECT THE PROVIDED PROJECT

==================================================

I am providing the current Experiment Pulse / analytics project as a starting point.

READ AND INSPECT THE EXISTING PROJECT BEFORE MODIFYING IT.

Understand:

- current application shell

- existing routing

- existing navigation

- current dashboard components

- analytics utilities

- data-processing functions

- filters

- charts

- statistics

- insights

- data explorer

- quality analysis

- typography

- styling

- responsive behavior

- existing UI components

There is already useful analytical architecture in the project.

DO NOT throw it away unnecessarily.

Reuse the good analytics architecture.

However, the product must evolve from an experiment/A-B dashboard into a broader:

BUSINESS DATA INTELLIGENCE PLATFORM.

==================================================

2. PRODUCT PURPOSE

==================================================

BUSINESSLENS allows a business to upload or connect its operational data and receive a complete business analysis.

The core promise:

"Bring your business data.

BusinessLens turns it into a clear picture of how your business is performing."

The platform should help businesses understand:

Revenue

Sales

Expenses

Profit

Margins

Products

Customers

Transactions

Cash flow

Growth

Trends

Recurring activity

Business performance

Anomalies

Opportunities

Forecasts

and actionable insights.

==================================================

3. DATA INPUT IS THE DIFFERENTIATOR

==================================================

Build a strong:

DATA INPUT CENTER

This is one of the most important screens in the product.

Users must have multiple ways to bring data into the platform.

--------------------------------------------------

INPUT METHOD 1 — M-PESA STATEMENT

--------------------------------------------------

Create an M-Pesa Statement Import screen.

Users can upload:

PDF

CSV

Excel

The interface should show:

Upload

Processing

Parsing

Cleaning

Categorizing

Completed

The backend will later perform actual Python parsing.

For the frontend, create the complete workflow and states.

Show what the system will extract:

Date

Time

Transaction type

Reference

Amount

Sender/Recipient

Phone

Description

Category

Business/personal classification

--------------------------------------------------

INPUT METHOD 2 — RECEIPT / LEDGER OCR

--------------------------------------------------

Create:

SCAN RECEIPT / LEDGER

The user can upload or photograph:

Receipt

Handwritten notebook

Ledger page

Invoice

Expense slip

Show a polished OCR processing experience:

Image received

Reading text

Extracting fields

Cleaning

Recognizing line items

Categorizing

Review

Confirm

Do NOT pretend the frontend OCR is a real backend OCR engine.

Create the complete UI so a future Python OCR service can plug into it.

--------------------------------------------------

INPUT METHOD 3 — WHATSAPP ENTRY

--------------------------------------------------

Create:

WHATSAPP DATA ENTRY

Explain:

"Send transactions in plain language."

Example:

"sold 3 bags cement 4500"

"spent 1200 on fuel"

"paid rent 25000"

"received 18000 from customer"

Show the message being interpreted into:

Type

Amount

Quantity

Product

Category

Date

Customer

Then:

CONFIRM TRANSACTION

This should be a complete frontend workflow.

The NLP parser will later live on the backend.

--------------------------------------------------

INPUT METHOD 4 — CSV / EXCEL

--------------------------------------------------

Create an import wizard.

Step 1:

Upload file.

Step 2:

Detect columns.

Step 3:

Map columns.

Example:

Date → Transaction Date

Amount → Amount

Description → Description

Category → Category

Step 4:

Preview.

Step 5:

Validate.

Step 6:

Import.

Show:

Rows detected

Rows valid

Rows requiring review

Duplicates

Missing values

==================================================

INPUT METHOD 5 — MANUAL ENTRY

==================================================

Create a clean manual transaction form.

Fields adapt based on transaction type.

Income

Expense

Transfer

Sale

Refund

Other

Include:

Date

Amount

Description

Category

Product

Customer

Payment method

Reference

Notes

==================================================

4. DATA CLEANING WORKSPACE

==================================================

After importing data, create:

DATA CLEANING

Do not silently throw bad rows away.

Show:

Total rows

Valid rows

Missing values

Duplicates

Invalid values

Outliers

Uncategorized transactions

Possible duplicate transactions

Columns detected

Data types

Create a review queue.

Example:

"23 transactions need your attention."

User can:

Confirm

Edit

Ignore

Merge

Categorize

==================================================

5. AUTO-CATEGORIZATION

==================================================

Create an:

AUTO-CATEGORIZATION

section.

The backend will later classify transactions using a trained model.

The frontend should display:

Category

Confidence

Reason / source

Examples:

Sale

98%

Transport

91%

Stock purchase

94%

Rent

99%

Salary

97%

Unknown

42%

Allow the user to correct the classification.

Button:

CORRECT CATEGORY

The UI should communicate:

"BusinessLens learns from your corrections."

Do not fake machine learning results as real production AI.

Use demo/example confidence values only where needed.

==================================================

6. RECURRING TRANSACTION DETECTION

==================================================

Create:

RECURRING ACTIVITY

Detect patterns such as:

Rent

Salary

Subscriptions

Regular supplier payments

Recurring bills

Show:

Frequency

Typical amount

Last occurrence

Next expected occurrence

Confidence

==================================================

7. MAIN BUSINESS DASHBOARD

==================================================

Create a powerful:

BUSINESS OVERVIEW

dashboard.

This is the main destination after login.

At the top:

Business name

Reporting period

Last data update

Data health

Profile/settings access

Then:

REVENUE

EXPENSES

PROFIT

PROFIT MARGIN

CASH FLOW

TRANSACTIONS

CUSTOMERS

PRODUCTS

Use real calculations from connected data later.

For current frontend behavior, use the existing dataset/mock provider.

==================================================

8. FINANCIAL KPI SYSTEM

==================================================

Create strong KPI visualizations.

Include:

Revenue

Gross profit

Net profit

Gross margin

Operating expenses

Cash flow

Average transaction value

Number of transactions

Growth rate

Month-over-month change

Year-over-year change

Each KPI needs:

current value

change

comparison period

trend

status

Clicking should open detailed analysis.

==================================================

9. REVENUE ANALYSIS

==================================================

Create a dedicated:

REVENUE

screen.

Visualizations should include:

Revenue over time

Daily

Weekly

Monthly

Quarterly

Yearly

Allow switching periods.

Use:

line chart

area chart

bar comparison

growth visualization

calendar view where useful

Do not make all charts basic bars.

==================================================

10. EXPENSE ANALYSIS

==================================================

Create:

EXPENSES

Show:

Total expenses

Expense categories

Expense growth

Largest expenses

Recurring expenses

Unexpected expenses

Use:

treemap

bar chart

category distribution

trend

waterfall

comparison visualization

==================================================

11. PROFIT ANALYSIS

==================================================

Create:

PROFITABILITY

Show:

Revenue

COGS

Gross profit

Operating expenses

Net profit

Profit margin

Use a waterfall-style visualization.

Also show:

Profit margin trend

Revenue vs profit

Profit by month

Profit contribution by product/category where possible.

==================================================

12. CASH FLOW

==================================================

Create a strong:

CASH FLOW

screen.

Show:

Cash in

Cash out

Net cash flow

Opening balance

Closing balance

Daily/weekly/monthly trend

Use:

area chart

waterfall

flow visualization

comparison periods

==================================================

13. PRODUCT PERFORMANCE

==================================================

Create:

PRODUCTS

Show:

Top 5 products

Worst performing products

Units sold

Revenue

Profit

Margin

Growth

Repeat purchases

Slow movers

Dead stock where appropriate

Do not create generic "top products" cards only.

Allow users to click a product and open detailed product analytics.

==================================================

14. INCOME SOURCES

==================================================

Businesses may not always sell products.

Support:

Products

Services

Rent

Subscriptions

Consulting

Bookings

Other income

Create:

Top income sources

Worst-performing sources

Contribution to revenue

Growth

Profitability where possible.

==================================================

15. CUSTOMER ANALYSIS

==================================================

Create:

CUSTOMERS

Show:

Total customers

New customers

Returning customers

Average customer value

Top customers

Customer concentration

Repeat purchase rate

Customer revenue contribution

Use:

segmentation

ranking

cohort-style visualization where the available data supports it.

==================================================

16. MONTH-OVER-MONTH COMPARISON

==================================================

Create an obvious:

THIS MONTH vs LAST MONTH

analysis.

Compare:

Revenue

Expenses

Profit

Transactions

Customers

Average transaction

Margins

Use:

dumbbell charts

slope charts

comparison cards

delta indicators

Do not use only numbers.

==================================================

17. BUSINESS TRENDS

==================================================

Create a:

TRENDS

section.

Allow the user to discover:

Revenue trending up/down

Expenses trending up/down

Profit improving/declining

Customer growth

Product growth

Category growth

Transaction frequency

==================================================

18. AI-GENERATED INSIGHTS

==================================================

Create a major:

INSIGHTS

page.

The future backend will generate these.

The frontend should display:

Weekly summary

Biggest change

Strongest growth

Biggest concern

Opportunity

Unusual activity

Next-month outlook

Use plain business language.

Example:

"Revenue increased 14% compared with last month, but transport expenses grew 23%."

Then:

"Explore why"

Clicking opens the underlying analysis.

Do NOT make up unsupported statements.

==================================================

19. WEEKLY BUSINESS SUMMARY

==================================================

Create a polished weekly report.

Example:

YOUR WEEK IN BUSINESS

Revenue:

KSh ...

Expenses:

KSh ...

Profit:

KSh ...

Customers:

...

Biggest change:

...

Watch:

...

Opportunity:

...

Future backend can generate the narrative.

==================================================

20. FORECAST

==================================================

Create:

FORECAST

The frontend should support:

Revenue forecast

Expense forecast

Profit forecast

Cash-flow forecast

Use trend-based demo data.

Show:

Historical

Projected

Confidence/uncertainty

Clearly label forecast values as:

PROJECTED

not actual.

The backend can later replace the calculation with real ML forecasting.

==================================================

21. ANOMALY DETECTION

==================================================

Create:

ANOMALIES

Show:

Unusual expense

Unusual revenue spike

Unusual transaction

Duplicate transaction

Sudden product drop

Unexpected customer activity

Use:

severity

date

value

reason

Explore button.

==================================================

22. BUSINESS HEALTH SCORE

==================================================

Create a visual:

BUSINESS HEALTH

score.

Base it on factors such as:

Revenue trend

Profitability

Expense control

Cash flow

Customer growth

Data completeness

Keep the scoring architecture transparent.

Show:

Overall score

Strong areas

Weak areas

Recommended attention

==================================================

23. DATA EXPLORER

==================================================

Create a full:

DATA EXPLORER

Users should be able to inspect their underlying records.

Features:

Search

Sort

Filter

Pagination

Columns

Row detail

Export

Saved filters

Show all source fields.

Clicking a row opens detailed transaction/activity information.

==================================================

24. DATASET / SOURCE MANAGEMENT

==================================================

Create:

DATA SOURCES

Show:

M-Pesa Statement

Excel File

CSV

OCR Import

WhatsApp

Manual Entry

For each:

Records

Last sync/import

Status

Errors

Manage

==================================================

25. IMPORT HISTORY

==================================================

Create:

IMPORT HISTORY

Show:

File/source

Imported date

Rows

Valid

Errors

Duplicates

Status

Reprocess

View details

==================================================

26. BUSINESS DASHBOARD BUILDER

==================================================

Create a section that allows the business owner to customize their dashboard.

They can choose which widgets appear:

Revenue

Profit

Cash flow

Expenses

Customers

Products

Forecast

Insights

Inventory

etc.

Allow:

Add widget

Remove widget

Reorder widgets

This creates the "my business dashboard" experience.

==================================================

27. DASHBOARD WIDGET SYSTEM

==================================================

Build reusable analytical widgets.

Examples:

Revenue Trend

Profit Margin

Cash Flow

Expense Breakdown

Top Products

Customer Growth

Sales Heatmap

Monthly Comparison

Forecast

AI Insight

Data Quality

Recurring Payments

Anomaly Alert

Every widget should be capable of receiving data from the backend later.

==================================================

28. BUSINESS SETTINGS

==================================================

Create a REAL settings system.

Not a fake settings page with three switches.

Sections:

Business Profile

Business Details

Currency

Reporting Period

Tax Settings

Data Sources

Categories

Transaction Rules

Notifications

AI / Insights

Dashboard

Appearance

Security

Data & Privacy

Exports

Account

Billing

Team

==================================================

29. COLOR CUSTOMIZATION

==================================================

The user specifically needs an actual color option.

Add an:

ACCENT COLOR

selector.

Provide many choices:

Emerald

Teal

Blue

Sky

Indigo

Violet

Purple

Rose

Coral

Red

Orange

Amber

Gold

Lime

Cyan

Also support:

Custom color

The selected accent must propagate throughout:

Navigation

Buttons

Charts

Highlights

KPI indicators

Active filters

Progress

Badges

Tables

Interactive states

Do not just change one button.

==================================================

30. APPEARANCE

==================================================

Add:

Light

Dark

System

Do this properly.

Dark mode must be intentionally designed.

Do not simply invert the page.

==================================================

31. FONT / TYPOGRAPHY

==================================================

Do NOT use generic AI-dashboard typography.

Use a professional type system.

Primary recommendation:

Plus Jakarta Sans

or another distinctive modern professional font such as:

Manrope

DM Sans

or a strong editorial/display pairing if appropriate.

Use:

Regular

Medium

Semibold

Bold

Extra Bold

properly.

Headings should feel intentional.

Large financial numbers should have strong visual hierarchy.

Do NOT use Inter everywhere by default just because it is convenient.

==================================================

32. HOMEPAGE / LANDING PAGE

==================================================

Create a professional landing/home experience before the dashboard.

At the top:

A LARGE IMAGE PLACEHOLDER.

This image should subtly fade/change as the page loads.

Use a temporary business-data / analytics / business environment image from Pexels/Unsplash if needed.

Do not use random AI-generated imagery.

Keep the image subtle enough that the product remains professional.

Overlay:

BUSINESSLENS

"Understand your business through your own data."

CTA:

UPLOAD DATA

and

EXPLORE DASHBOARD

==================================================

33. IMAGE BEHAVIOR

==================================================

The homepage image should have:

fade-in

subtle movement

very slight opacity shift

not a massive marketing animation.

For dashboard screens, images should only be used where they improve the experience.

This is primarily a DATA PRODUCT.

The visualizations are more important than decorative photography.

==================================================

34. BUSINESS SETUP

==================================================

Create onboarding.

Step 1:

Business name

Step 2:

Business category

Step 3:

Currency

Step 4:

Data source

Step 5:

Import data

Step 6:

Review data

Step 7:

Generate dashboard

Step 8:

Complete

==================================================

35. REAL-TIME BACKEND READY

==================================================

IMPORTANT:

This is NOT a pretend "future product".

I will connect a real backend.

Therefore:

DO NOT bake analytical values into UI components.

DO NOT hardcode:

Revenue = 50,000

Profit = 20,000

etc.

Instead create proper data models and service boundaries.

Components should receive structured data.

For example:

Business

Transaction

Expense

RevenueRecord

Product

Customer

Category

Forecast

Insight

DataSource

ImportRun

Anomaly

DashboardWidget

==================================================

36. API-READY ARCHITECTURE

==================================================

Prepare the frontend so it can later consume endpoints such as:

/api/business

/api/transactions

/api/revenue

/api/expenses

/api/profit

/api/products

/api/customers

/api/insights

/api/forecast

/api/anomalies

/api/data-sources

/api/imports

/api/dashboard

/api/settings

Do NOT build the backend now.

But do NOT design the frontend in a way that makes backend integration painful.

==================================================

37. REAL DATA STATES

==================================================

Build proper:

Loading

Empty

Error

Partial data

No data yet

Importing

Processing

Completed

Failed

states.

Example:

"No transactions yet"

"Upload your first statement to begin your analysis."

This is important because this is a real product that will receive live data.

==================================================

38. DATA REFRESH

==================================================

Create a visible:

LAST UPDATED

indicator.

Also:

Refresh data

Syncing

Updated X minutes ago

Future live backend can connect to this.

==================================================

39. NOTIFICATIONS

==================================================

Create notifications for:

Import completed

Import failed

New insight

Unusual transaction

Forecast update

Data quality issue

Weekly summary ready

==================================================

40. EXPORT

==================================================

Allow UI actions for:

Export CSV

Export Excel

Export PDF Report

Download Business Summary

The backend/export service can be connected later.

==================================================

41. BUSINESS REPORTS

==================================================

Create:

Reports

with:

Revenue report

Expense report

Profit report

Cash flow report

Product report

Customer report

Tax report

Monthly business report

Weekly summary

Allow date range selection.

==================================================

42. MULTI-BUSINESS READINESS

==================================================

The primary user should have:

ONE BUSINESS DASHBOARD

But structure the architecture so a user can later belong to multiple businesses.

Include:

Business selector

Business settings

Business-specific data

Do not mix data between businesses.

==================================================

43. RESPONSIVENESS

==================================================

This MUST be highly responsive.

Desktop

Tablet

Mobile

On mobile:

sidebar becomes bottom navigation / drawer

charts resize

tables become responsive

filters become drawers

KPI cards stack intelligently

data-upload workflows are touch-friendly

do NOT just shrink the desktop design.

==================================================

44. INTERACTION

==================================================

Make the dashboard genuinely interactive.

Examples:

Click KPI → detailed analysis

Click chart point → underlying records

Click product → product analysis

Click category → category breakdown

Click insight → supporting evidence

Change filters → all connected visuals update

Change date range → charts update

Upload data → processing state

Finish import → dashboard updates

Change accent → entire application changes

Change theme → entire application updates

==================================================

45. VISUALIZATION QUALITY

==================================================

THIS IS CRITICAL.

Do not make:

"five cards + bar chart + pie chart."

Use the appropriate visualization for each analytical question.

Include combinations of:

line charts

area charts

stacked bars

grouped bars

heatmaps

treemaps

scatter plots

distribution plots

box plots

waterfall charts

slope/dumbbell charts

calendar heatmaps

cohort-style views

radial visualizations where appropriate

sparklines

KPI trend indicators

comparison tables

flow-style visualizations where useful

Every visualization must answer a real question.

Do NOT add a chart just because a library has it.

==================================================

46. ANALYTICAL LANGUAGE

==================================================

Use professional terminology but keep explanations understandable.

Examples:

Revenue Growth

Gross Margin

Net Margin

Operating Expense

Cash Flow

Average Transaction Value

Customer Retention

Recurring Expense

Anomaly

Forecast

Variance

Month-over-Month

Contribution

Trend

Do not make the application sound like an academic research tool.

==================================================

47. PRIVACY / SECURITY UI

==================================================

Create a Data & Privacy section.

Explain:

Uploaded business data

Financial information

Customer information

Transaction information

Who can access it

Data retention settings

Export/delete data

Permission settings

This is UI only for now.

==================================================

48. MOBILE NAVIGATION

==================================================

Primary mobile navigation:

Home

Analyze

Data

Insights

More

Inside More:

Reports

Sources

Dashboard

Settings

Team

Account

==================================================

49. DESKTOP NAVIGATION

==================================================

Desktop:

Overview

Analyze

Data

Insights

Reports

Sources

Dashboard

Settings

Use a polished sidebar.

==================================================

50. NO AUTOSCROLL

==================================================

Absolutely no automatic scrolling.

Do not use scroll hijacking.

Do not automatically move the user between dashboard sections.

Normal user-controlled scrolling only.

Animations can respond to scrolling, but never take over scrolling.

==================================================

51. DO NOT DESTROY EXISTING ANALYTICS

==================================================

The uploaded project already contains analytical concepts such as:

Overview

Experiment

Behavior

Explorer

Insights

Statistics

Quality

If parts of these are useful, REUSE THEM.

Do not throw away working chart/data-processing logic simply because the product is expanding.

Transform useful existing concepts into their BusinessLens equivalents.

For example:

Experiment analysis

→ Business performance analysis

Behavior analysis

→ Customer/product/transaction behavior

Quality

→ Business data quality

Explorer

→ Business Data Explorer

Insights

→ Business Insights

Statistics

→ Business statistical analysis

==================================================

52. BUILD THE COMPLETE PRODUCT

==================================================

DO NOT STOP AFTER THE HOME PAGE.

DO NOT STOP AFTER THE DASHBOARD.

DO NOT STOP AFTER MAKING THE CHARTS.

DO NOT STOP AFTER MAKING DATA UPLOAD.

Continue building:

Landing

Onboarding

Business Setup

Dashboard

Revenue

Expenses

Profit

Cash Flow

Products

Customers

Insights

Forecast

Anomalies

Data Quality

Data Input Center

M-Pesa import

OCR flow

WhatsApp entry

CSV/Excel import

Manual entry

Data Explorer

Reports

Dashboard Builder

Settings

Appearance

Accent Colors

Data Sources

Notifications

Privacy

Exports

Account

Billing

Team

Real-time data states

and all navigation between them.

==================================================

53. FINAL QUALITY BAR

==================================================

This should look like a REAL BUSINESS INTELLIGENCE PRODUCT.

The first screen should feel professional.

The dashboard should feel powerful.

The Data Input Center should feel like a core product feature.

The analysis should feel intelligent.

The charts should feel intentional.

The UI should feel polished.

The typography should feel premium.

The colors should feel controlled but customizable.

The mobile experience should be excellent.

The backend should be able to replace the frontend data provider later without rebuilding the UI.

MOST IMPORTANT:

DO NOT BUILD A GENERIC AI DASHBOARD.

DO NOT MAKE IT LOOK LIKE A TEMPLATE.

DO NOT MAKE IT DARK-NEON.

DO NOT USE GENERIC INTER EVERYWHERE.

DO NOT FILL THE SCREEN WITH RANDOM CARDS.

DO NOT STOP EARLY.

DO NOT ASK ME WHAT TO BUILD NEXT.

INSPECT THE EXISTING PROJECT, PRESERVE THE GOOD ANALYTICS ARCHITECTURE, THEN BUILD THIS COMPLETE BUSINESS DATA INTELLIGENCE FRONTEND SCREEN BY SCREEN UNTIL IT IS FINISHED.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/74ade882-1a43-4513-8c5b-bcbe13a241ac).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
