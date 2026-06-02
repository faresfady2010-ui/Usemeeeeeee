/**
 * Enhanced Chatbot Features with Local Knowledge Base
 * - Name and Logo Generation
 * - Situational Advice
 * - Role-Specific Task Completion
 * - Local Knowledge Base Learning (No API Required)
 * - Fallback Intent Matching
 */

/**
 * Enhanced Chatbot Features with Local Knowledge Base
 * - Name and Logo Generation
 * - Situational Advice
 * - Role-Specific Task Completion
 * - Local Knowledge Base Learning (No API Required)
 * - Fallback Intent Matching
 */

class ChatbotEnhancements {
  constructor() {
    this.knowledgeBase   = this._initKB();
    this.userDocuments   = this._loadUserDocs();
    this.situationBank   = this._initSituations();
    this.pendingTask     = null; // conversational multi-step state
  }

  // ─── MAIN ENTRY ──────────────────────────────────────────────────
  generateResponse(input) {
    const raw = input.trim();
    const msg = raw.toLowerCase();

    // STEP: if we're mid-conversation task, handle next step
    if (this.pendingTask) {
      return this._handleStep(raw, msg);
    }

    // Knowledge learning
    if (/\b(teach you|add knowledge|learn this|remember this)\b/i.test(msg)) {
      return this._handleLearn(raw);
    }

    // ── Business name generator ────────────────────────────────────
    if (this._isNameRequest(msg)) {
      const industry = this._extractIndustry(msg);
      return this._generateNames(industry);
    }

    // ── Logo suggestions ──────────────────────────────────────────
    if (/\b(logo|logo design|brand logo|visual identity)\b/i.test(msg)) {
      const name = this._extractQuoted(raw) || 'Your Business';
      const industry = this._extractIndustry(msg);
      return this._logoSuggestions(name, industry);
    }

    // ── Document / task generators ────────────────────────────────
    const docTask = this._detectDocTask(msg);
    if (docTask) {
      return this._startDocFlow(docTask);
    }

    // ── Situational advice ────────────────────────────────────────
    const sit = this._detectSituation(msg);
    if (sit) return this._formatSituation(sit);

    // ── Role advice ───────────────────────────────────────────────
    const role = this._detectRole(msg);
    if (role) return this._roleHelp(role, msg);

    // ── Knowledge base search ──────────────────────────────────────
    const kbHit = this._searchKB(msg);
    if (kbHit) return this._formatKB(kbHit);

    return null; // hand back to main chatbot
  }

  // ─── NAME REQUEST DETECTION ────────────────────────────────────
  _isNameRequest(msg) {
    return /\b(business name|brand name|company name|name generator|name ideas|name my business|name my company|name suggestion|name for my)\b/i.test(msg) ||
           /\b(generate|create|suggest|give|come up with|think of).{0,30}(name|names)\b/i.test(msg) ||
           /\bnames? for (a |my )?(business|company|brand|startup)\b/i.test(msg);
  }

  // ─── DOCUMENT TASK DETECTION ─────────────────────────────────────
  _detectDocTask(msg) {
    const map = [
      [/\b(write|create|make|build|draft|generate|help (me )?(with|write|create|make))\b.{0,30}\b(business plan)\b/i, 'business_plan'],
      [/\b(business plan)\b.{0,20}\b(for me|please|help|write|create|make|need)\b/i, 'business_plan'],
      [/\b(pitch deck|investor deck|investor presentation)\b/i, 'pitch_deck'],
      [/\b(marketing plan|marketing strategy|go.to.market)\b/i, 'marketing_plan'],
      [/\b(financial (plan|model|projection|forecast))\b/i, 'financial_plan'],
      [/\b(sales (plan|strategy|script|pitch))\b/i, 'sales_plan'],
      [/\b(brand (strategy|guidelines|identity|guide))\b/i, 'brand_strategy'],
      [/\b(content (plan|strategy|calendar))\b/i, 'content_plan'],
      [/\b(startup (roadmap|plan|strategy))\b/i, 'startup_roadmap'],
      [/\b(swot analysis)\b/i, 'swot'],
      [/\b(executive summary)\b/i, 'executive_summary'],
      [/\b(mission (statement|vision))\b/i, 'mission_statement'],
    ];
    for (const [re, task] of map) {
      if (re.test(msg)) return task;
    }
    return null;
  }

  // ─── CONVERSATIONAL FLOW ─────────────────────────────────────────
  _startDocFlow(taskKey) {
    const flows = {
      business_plan: {
        label: 'Business Plan',
        questions: [
          "Let's build your business plan! 📋\n\nFirst — what is your business name, and in one sentence, what does it do?",
          "Who is your target customer? Be specific — describe them like a real person (e.g., 'small restaurant owners in the US who struggle with online ordering').",
          "What problem do you solve, and what makes your solution better than what's already out there?",
          "How do you make money? (e.g., monthly subscription, one-time sale, service fee, commission) — and what's your price?",
          "What stage are you at right now? (idea, early testing, have some customers, growing) — and do you need funding?"
        ],
        keys: ['business_name_and_description','target_customer','problem_and_usp','revenue_model_and_price','stage_and_funding'],
        generate: (d) => this._genBusinessPlan(d)
      },
      pitch_deck: {
        label: 'Pitch Deck',
        questions: [
          "Let's build your pitch deck! 🎯\n\nWhat is your company name and what does it do in one sentence?",
          "What is the core problem your customers face? Give a specific, vivid example.",
          "What is your solution and what makes it unique? How is it different from competitors?",
          "What is your traction so far? (revenue, users, pilots, letters of intent, growth rate — anything that shows demand)",
          "How much are you raising, and what will you use the money for?"
        ],
        keys: ['company','problem','solution_and_differentiation','traction','ask_and_use_of_funds'],
        generate: (d) => this._genPitchDeck(d)
      },
      marketing_plan: {
        label: 'Marketing Plan',
        questions: [
          "Let's create your marketing plan! 📣\n\nWhat is your business and product/service?",
          "Who is your ideal customer? (age, role, where they spend time online, biggest pain point)",
          "What marketing channels have you tried or want to try? (social media, email, Google ads, content, partnerships, etc.)",
          "What is your monthly marketing budget (approximately)?",
          "What is your #1 goal for the next 90 days? (e.g., 100 new leads, $10k revenue, 500 newsletter subscribers)"
        ],
        keys: ['business_and_product','ideal_customer','channels','budget','goal'],
        generate: (d) => this._genMarketingPlan(d)
      },
      financial_plan: {
        label: 'Financial Plan',
        questions: [
          "Let's build your financial plan! 💰\n\nWhat does your business sell (product/service) and at what price?",
          "What are your main costs? (staff, rent, software, materials, marketing — give rough monthly numbers)",
          "How many customers/sales do you expect in Month 1, Month 6, and Month 12?",
          "Do you have any existing revenue or funding? If so, how much?",
          "What is your funding goal or financial target for the next 12 months?"
        ],
        keys: ['product_and_price','main_costs','sales_forecast','existing_revenue','target'],
        generate: (d) => this._genFinancialPlan(d)
      },
      sales_plan: {
        label: 'Sales Plan',
        questions: [
          "Let's build your sales plan! 🤝\n\nWhat are you selling and at what price point?",
          "Who is your ideal buyer? What is their title/role, company size, and biggest pain point?",
          "How do you currently find leads? (cold outreach, referrals, inbound, events, etc.)",
          "What are the top 2-3 objections you hear from prospects?",
          "What is your sales target for the next 3 months?"
        ],
        keys: ['product_and_price','ideal_buyer','lead_sources','objections','sales_target'],
        generate: (d) => this._genSalesPlan(d)
      },
      brand_strategy: {
        label: 'Brand Strategy',
        questions: [
          "Let's build your brand strategy! 🎨\n\nWhat is your business name and what does it do?",
          "Who is your target audience? Describe them in detail.",
          "What 3 words should people use to describe your brand? (e.g., bold, trustworthy, innovative)",
          "Who are your top 2-3 competitors, and how are you different from them?",
          "What feeling do you want customers to have when they interact with your brand?"
        ],
        keys: ['business_name_and_desc','target_audience','brand_words','competitors_and_difference','brand_feeling'],
        generate: (d) => this._genBrandStrategy(d)
      },
      content_plan: {
        label: 'Content Plan',
        questions: [
          "Let's build your content plan! ✍️\n\nWhat is your business and who do you serve?",
          "Which platforms do you want to create content for?",
          "What topics does your audience care most about?",
          "How much time can you dedicate to content per week?",
          "What is your goal — brand awareness, leads, sales, community, or something else?"
        ],
        keys: ['business_and_audience','platforms','topics','time_commitment','content_goal'],
        generate: (d) => this._genContentPlan(d)
      },
      startup_roadmap: {
        label: 'Startup Roadmap',
        questions: [
          "Let's build your startup roadmap! 🚀\n\nWhat is your startup name and what does it do?",
          "What stage are you at right now? (idea, building MVP, launched, growing)",
          "What are your top 3 goals for the next 6 months?",
          "What are your biggest challenges or risks right now?",
          "Do you have a team, and if so, who?"
        ],
        keys: ['startup_name_and_desc','current_stage','goals','challenges','team'],
        generate: (d) => this._genStartupRoadmap(d)
      },
      swot: {
        label: 'SWOT Analysis',
        questions: [
          "Let's do your SWOT analysis! 🔲\n\nWhat is your business and what does it do?",
          "What do you do better than anyone else? What unique resources or advantages do you have?",
          "What are your biggest internal weaknesses or gaps right now?",
          "What market opportunities could you take advantage of?",
          "What external threats or risks does your business face?"
        ],
        keys: ['business','strengths','weaknesses','opportunities','threats'],
        generate: (d) => this._genSWOT(d)
      },
      executive_summary: {
        label: 'Executive Summary',
        questions: [
          "Let's write your executive summary! 📄\n\nWhat is your business name and what do you do?",
          "What problem do you solve and who do you solve it for?",
          "What makes you unique — why will you win?",
          "What is your business model and revenue traction so far?",
          "What do you need (funding, partners, customers) and what will you achieve with it?"
        ],
        keys: ['business','problem_and_customer','unique_advantage','model_and_traction','ask_and_outcome'],
        generate: (d) => this._genExecSummary(d)
      },
      mission_statement: {
        label: 'Mission & Vision Statement',
        questions: [
          "Let's craft your mission and vision! ✨\n\nWhat does your business do — what product or service?",
          "Who do you help? Be specific about your target customer.",
          "What impact do you want to have on your customers' lives or the world?",
          "What values are most important to how you operate?"
        ],
        keys: ['what_you_do','who_you_help','desired_impact','values'],
        generate: (d) => this._genMissionStatement(d)
      },
    };

    const flow = flows[taskKey];
    if (!flow) return null;

    this.pendingTask = { key: taskKey, flow, step: 0, data: {} };
    return flow.questions[0];
  }

  _handleStep(raw, msg) {
    const { flow, step, data, key } = this.pendingTask;

    // Allow user to cancel
    if (/\b(cancel|stop|quit|nevermind|never mind|forget it|start over)\b/i.test(msg)) {
      this.pendingTask = null;
      return "No problem! Let me know what else you'd like help with.";
    }

    // Save the answer
    data[flow.keys[step]] = raw;
    const nextStep = step + 1;

    if (nextStep < flow.questions.length) {
      this.pendingTask.step = nextStep;
      return flow.questions[nextStep];
    }

    // All answers collected — generate the document
    this.pendingTask = null;
    return flow.generate(data);
  }

  // ─── DOCUMENT GENERATORS ─────────────────────────────────────────

  _genBusinessPlan(d) {
    const name = d.business_name_and_description.split(',')[0].trim();
    const desc = d.business_name_and_description;
    return `📋 BUSINESS PLAN — ${name.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. EXECUTIVE SUMMARY
──────────────────
${desc}

Target Customer: ${d.target_customer}

Our solution addresses ${d.problem_and_usp}

Business Model: ${d.revenue_model_and_price}

Current Status: ${d.stage_and_funding}

2. COMPANY DESCRIPTION
──────────────────────
Company: ${name}
Mission: To provide ${desc.toLowerCase()} with a focus on customer results and innovation.
Legal Structure: [LLC / Corporation — choose based on your jurisdiction]
Location: [Insert location]
Founded: ${new Date().getFullYear()}

3. MARKET ANALYSIS
──────────────────
Target Market: ${d.target_customer}

Market Opportunity:
• Primary customers are ${d.target_customer}
• Problem being solved: ${d.problem_and_usp.split(',')[0]}
• Market size: Research your TAM (total addressable market) using industry reports and census data

Competitive Advantage: ${d.problem_and_usp}

Competition: Identify 3-5 direct competitors. For each, note their price, strengths, weaknesses, and why your customers will choose you instead.

4. PRODUCTS & SERVICES
───────────────────────
Offering: ${desc}
Pricing Model: ${d.revenue_model_and_price}

Value Proposition:
• Solves: ${d.problem_and_usp.split(',')[0]}
• Better because: ${d.problem_and_usp}
• Customers will choose us because we uniquely deliver results for ${d.target_customer}

5. MARKETING & SALES STRATEGY
──────────────────────────────
Target Customer: ${d.target_customer}

Customer Acquisition Channels:
• Digital: SEO, content marketing, social media, paid ads
• Direct: outbound sales, partnerships, referral program
• Community: events, networking, thought leadership

Sales Process:
1. Awareness → reach target customers where they are
2. Lead capture → free trial, lead magnet, demo request
3. Nurture → email sequence, social proof, case studies
4. Convert → discovery call, proposal, close
5. Retain → onboarding, check-ins, upsell

6. OPERATIONS PLAN
──────────────────
Team: [List founders and key roles]
Key Processes: Delivery of ${desc}
Technology: [CRM, project management, communication tools]
Key Partners: [Suppliers, agencies, platforms you rely on]

7. FINANCIAL PROJECTIONS
────────────────────────
Revenue Model: ${d.revenue_model_and_price}

Year 1 Projections (Example — adjust to your numbers):
• Q1: Validate and acquire first 10-20 customers
• Q2: Optimize acquisition, target $[X] MRR
• Q3: Scale what works, expand channels
• Q4: Hit Year 1 revenue goal, plan Year 2

Funding: ${d.stage_and_funding}
Use of Funds: Product development, marketing, team, operations

Key Financial Metrics to Track:
• Monthly Recurring Revenue (MRR)
• Customer Acquisition Cost (CAC)
• Customer Lifetime Value (LTV)
• Burn Rate & Runway
• Gross Margin

8. RISK & MITIGATION
─────────────────────
• Market risk: Validate demand continuously with real customers
• Competitive risk: ${d.problem_and_usp} differentiates us
• Financial risk: Manage cash flow weekly, extend runway through revenue
• Execution risk: Focus on the critical few priorities, not many

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Next steps:
1. Fill in the bracketed placeholders with your real numbers
2. Add a 3-year P&L and cash flow forecast
3. Research and cite your market size data
4. Have a lawyer review your legal structure choice

Want me to generate a pitch deck, financial model, or marketing plan next?`;
  }

  _genPitchDeck(d) {
    return `🎯 PITCH DECK — ${d.company.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SLIDE 1 — TITLE
──────────────
Company: ${d.company}
Tagline: [One line that captures what you do and why it matters]
Presenter: [Your name], ${new Date().getFullYear()}
Contact: [email] | [website]

SLIDE 2 — THE PROBLEM
──────────────────────
"${d.problem}"

• This affects [target customer] every [day/week/month]
• The current solutions are inadequate because [specific failure]
• The cost of this problem is estimated at $[X] per year for each affected business
• [Optional: add a story or stat that makes this real and urgent]

SLIDE 3 — OUR SOLUTION
───────────────────────
${d.solution_and_differentiation}

How it works:
1. [Step 1 — how the customer gets started]
2. [Step 2 — the core experience/value delivery]
3. [Step 3 — the result/outcome]

[Insert demo screenshot or product visual here]

SLIDE 4 — WHY NOW
──────────────────
• Market timing: [regulatory change, technology shift, behavioral trend enabling this now]
• Technology: [what infrastructure or platform makes this possible today that didn't exist before]
• Traction signal: ${d.traction}

SLIDE 5 — MARKET SIZE
──────────────────────
• TAM (Total Addressable Market): $[X]B — all potential customers globally
• SAM (Serviceable Addressable Market): $[X]M — customers we can reach
• SOM (Serviceable Obtainable Market): $[X]M — realistic 3-year capture

Source: [Cite a credible industry report]

SLIDE 6 — BUSINESS MODEL
─────────────────────────
Revenue: [How you charge — subscription, per-seat, transaction fee, etc.]
Price: [Price per unit/month]
Gross Margin: [Expected %]
CAC: $[X] | LTV: $[X] | Payback: [X months]
Path to profitability: [When and how you reach breakeven]

SLIDE 7 — TRACTION
───────────────────
${d.traction}

Key Milestones Achieved:
• [Milestone 1 — with date and number]
• [Milestone 2 — growth rate, user count, revenue]
• [Milestone 3 — notable customer or partnership]

Growth: [X]% month-over-month

SLIDE 8 — TEAM
───────────────
[Founder 1]: [Role] — [1 line on relevant experience/credential]
[Founder 2]: [Role] — [1 line on relevant experience/credential]
Advisors: [Name] — [relevant background]

"Why us": [What unique insight, experience, or unfair advantage does this team have?]

SLIDE 9 — COMPETITION
──────────────────────
[Create a 2×2 or table comparing you vs competitors on the 2 most important axes]

Why we win:
• ${d.solution_and_differentiation}
• Competitors are limited by [their constraint]
• We are uniquely positioned because [your edge]

SLIDE 10 — FINANCIALS
──────────────────────
Year 1: $[X] revenue, [X] customers, $[X] ARR
Year 2: $[X] revenue, [X]% growth
Year 3: $[X] revenue, path to profitability

[Include a simple chart: Monthly Revenue Forecast, Month 1-24]

SLIDE 11 — THE ASK
───────────────────
Raising: ${d.ask_and_use_of_funds}

Use of Funds:
• [X]% Product & Engineering
• [X]% Sales & Marketing
• [X]% Operations & Team
• [X]% Reserve

Milestones this round funds:
• [Milestone 1 — 6 months]
• [Milestone 2 — 12 months]
• [Milestone 3 — sets up next round]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Pitch deck tips:
• Keep slides visual — each slide = 1 idea
• Practice until you can do it in 10 minutes
• Have a 1-page teaser to send BEFORE the meeting
• Always follow up within 24 hours

Want me to write the financial model or marketing plan next?`;
  }

  _genMarketingPlan(d) {
    return `📣 MARKETING PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUSINESS: ${d.business_and_product}

1. MARKETING GOAL (90 DAYS)
────────────────────────────
Primary Goal: ${d.goal}

Supporting Metrics to Track Weekly:
• Website visitors / impressions
• Leads generated (name + email captured)
• Conversion rate (leads → customers)
• Cost per acquisition
• Revenue attributed to marketing

2. TARGET CUSTOMER (ICP)
──────────────────────────
${d.ideal_customer}

Buying Triggers (what makes them search for a solution):
• [Trigger 1 — event or frustration that creates urgency]
• [Trigger 2 — change in their situation or environment]

Where They Spend Time Online:
• Social: [based on your audience]
• Search: Google for [key search terms]
• Communities: [forums, groups, newsletters they read]

3. MESSAGING STRATEGY
──────────────────────
Core Message: "We help [${d.ideal_customer.split(' ').slice(0,4).join(' ')}] to [desired outcome] without [frustration they want to avoid]."

Message Hierarchy:
• Headline: Lead with the outcome they want
• Sub-headline: How you deliver it differently
• Body: Proof (stats, stories, logos)
• CTA: One clear next step

4. CHANNEL STRATEGY
────────────────────
Selected Channels: ${d.channels}

Channel Playbooks:

${d.channels.toLowerCase().includes('social') || d.channels.toLowerCase().includes('instagram') || d.channels.toLowerCase().includes('tiktok') ? `SOCIAL MEDIA
• Post 4-5x/week with a mix of: education (40%), social proof (30%), entertainment (20%), offers (10%)
• Use Reels/TikTok for reach, carousels for saves, stories for engagement
• Engage for 30 min after posting to boost algorithm
` : ''}
${d.channels.toLowerCase().includes('email') ? `EMAIL MARKETING
• Build list with a lead magnet (checklist, template, guide)
• Welcome sequence: 5 emails over 10 days
• Weekly value email + bi-weekly offer
• Segment list by behavior (opened, clicked, purchased)
` : ''}
${d.channels.toLowerCase().includes('google') || d.channels.toLowerCase().includes('seo') || d.channels.toLowerCase().includes('content') ? `CONTENT / SEO
• Identify 10 high-intent search terms your ICP uses
• Publish 2-4 long-form articles/month targeting those terms
• Repurpose each article into social posts, email, and video
` : ''}
${d.channels.toLowerCase().includes('ads') || d.channels.toLowerCase().includes('paid') ? `PAID ADS
• Start with retargeting (website visitors) before cold audiences
• Test 3 ad angles: pain-focused, outcome-focused, social proof
• Budget: Start small ($10-20/day), scale what works
• Track: Cost per click → cost per lead → cost per customer
` : ''}

5. CONTENT CALENDAR (SAMPLE WEEK)
───────────────────────────────────
Monday:    Educational post — teach something valuable
Tuesday:   Behind the scenes / story
Wednesday: Customer testimonial or case study
Thursday:  Product/service highlight (benefits, not features)
Friday:    Engagement question or poll
Weekend:   Repurpose top-performing content

6. BUDGET ALLOCATION
─────────────────────
Monthly Budget: ${d.budget}

Suggested Split:
• Content creation: 30%
• Paid amplification: 40%
• Tools & software: 15%
• Partnerships/influencers: 15%

7. 90-DAY ACTION PLAN
──────────────────────
Month 1 — Foundation
• Set up analytics (Google Analytics + UTM links)
• Create/optimize profiles on chosen platforms
• Produce first 10 pieces of content
• Launch lead magnet and capture first 50 emails

Month 2 — Test & Learn
• Run first paid campaign ($[X]/day)
• Identify top-performing content and double down
• Reach out to 5 potential partners or micro-influencers
• Hit [X] leads/week consistently

Month 3 — Scale
• Scale winning ads and channels
• Launch referral or affiliate program
• Add one new content format
• Hit: ${d.goal}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Want me to create a detailed content calendar, email sequence, or brand strategy next?`;
  }

  _genFinancialPlan(d) {
    return `💰 FINANCIAL PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRODUCT/SERVICE: ${d.product_and_price}

1. REVENUE MODEL
─────────────────
Offering: ${d.product_and_price}
Revenue Type: [Recurring / One-time / Project-based]
Revenue Drivers: Price × Volume × Frequency

Sales Forecast:
• Month 1:  ${d.sales_forecast.split(',')[0] || '[X] customers'} → Revenue: $[calculate: price × customers]
• Month 6:  ${d.sales_forecast.split(',')[1] || '[X] customers'} → Revenue: $[calculate]
• Month 12: ${d.sales_forecast.split(',')[2] || '[X] customers'} → Revenue: $[calculate]
• Year 1 Total: $[sum of monthly revenues]
• Year 2 Target: [2-3× Year 1, based on growth rate]

2. COST STRUCTURE
──────────────────
Monthly Operating Costs:
${d.main_costs}

Cost Categories:
• COGS (cost to deliver product/service): $[X]/month
• Salaries & Contractors: $[X]/month
• Marketing & Advertising: $[X]/month
• Software & Tools: $[X]/month
• Rent & Utilities: $[X]/month
• Miscellaneous: $[X]/month
─────────────────────────────
TOTAL MONTHLY EXPENSES: $[sum]

3. PROFIT & LOSS (P&L) OVERVIEW
─────────────────────────────────
                  Month 1    Month 6    Month 12
Revenue:          $[X]       $[X]       $[X]
COGS:             $[X]       $[X]       $[X]
─────────────────────────────────────────────
Gross Profit:     $[X]       $[X]       $[X]
Gross Margin:     [%]        [%]        [%]
─────────────────────────────────────────────
Operating Exp:    $[X]       $[X]       $[X]
─────────────────────────────────────────────
Net Income:       ($[X])     ($[X])     $[X]

4. CASH FLOW PROJECTION
─────────────────────────
Starting Capital: ${d.existing_revenue}

Critical Question: When do you run out of cash?
• Monthly cash burn: $[total expenses − revenue]
• Runway: $[starting capital] ÷ $[monthly burn] = [X months]

Break-Even Point:
• Monthly Fixed Costs: $[X]
• Gross Margin: [X]%
• Break-even revenue: Fixed Costs ÷ Gross Margin = $[X]/month
• Break-even customers: $[break-even revenue] ÷ $[price per customer] = [X]

5. UNIT ECONOMICS
──────────────────
Price per Customer: [from ${d.product_and_price}]
Cost to Acquire (CAC): $[X] — measure this monthly
Customer Lifetime Value (LTV): $[price] × [avg months retained]
LTV:CAC Ratio Target: 3:1 or higher
Payback Period: CAC ÷ Monthly Revenue per Customer = [X months]

6. FUNDING & TARGETS
──────────────────────
Current Position: ${d.existing_revenue}
12-Month Target: ${d.target}

If Raising Funds:
• Amount needed: $[X]
• Runway it buys: [X months]
• Use of funds: [breakdown]
• Expected return to investor: [X]× in [Y years]

Key Financial Milestones:
• Month 3: Break even on marketing spend
• Month 6: Cover variable costs with revenue
• Month 12: Hit ${d.target}
• Month 18: Full profitability

7. KEY METRICS TO TRACK WEEKLY
────────────────────────────────
• MRR / ARR (monthly/annual recurring revenue)
• Churn rate (% of customers leaving monthly)
• Gross margin %
• Cash balance and runway
• CAC vs LTV trend

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Fill in the [$X] placeholders with your real numbers to complete this model.
Want me to write a full business plan or pitch deck next?`;
  }

  _genSalesPlan(d) {
    return `🤝 SALES PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRODUCT: ${d.product_and_price}
TARGET: ${d.sales_target}

1. IDEAL CUSTOMER PROFILE (ICP)
────────────────────────────────
${d.ideal_buyer}

Qualification Criteria (BANT):
• Budget: Do they have budget for ${d.product_and_price}?
• Authority: Is this the decision-maker or influencer?
• Need: Do they have the specific problem you solve?
• Timeline: Are they looking to solve it now?

2. LEAD GENERATION STRATEGY
─────────────────────────────
Current Sources: ${d.lead_sources}

To Add:
• Inbound: SEO content, social media, referral program
• Outbound: LinkedIn outreach, cold email, direct mail
• Partnerships: Integrations, co-marketing, referral agreements
• Community: Industry events, forums, podcasts

Lead Target: [X leads/week] to hit ${d.sales_target}
(Work backwards: sales target ÷ close rate ÷ meeting rate ÷ outreach response rate)

3. SALES PROCESS
─────────────────
Stage 1 — PROSPECT (Day 1)
• Research the company and buyer before reaching out
• Personalize first message with something specific to them
• Goal: start a conversation, not sell

Stage 2 — CONNECT (Day 1-3)
• LinkedIn message, cold email, or warm intro
• Subject/opener: lead with their pain, not your product
• Follow up 3× over 7 days before moving on

Stage 3 — DISCOVER (30-min call)
• Ask before presenting: "What's the biggest challenge you have with [problem area]?"
• Qualify BANT in the conversation naturally
• Don't pitch until you understand their situation fully

Stage 4 — PRESENT
• Tailor demo/proposal to what you learned in discovery
• Show the outcome for THEIR situation
• Use specific case studies from similar customers

Stage 5 — HANDLE OBJECTIONS
${d.objections.split(',').map((obj, i) => `Objection ${i+1}: "${obj.trim()}"\nResponse: [Address specifically — validate, reframe, provide proof]`).join('\n\n')}

Stage 6 — CLOSE
• Assumptive: "Based on what you've told me, here's what I recommend we do next..."
• Timeline: "What would need to be true for you to start by [date]?"
• Next step: Always end every meeting with a specific next action + date

Stage 7 — FOLLOW-UP SEQUENCE
• Same day: Thank you + meeting summary + next step confirmed
• Day 3: Value-add resource relevant to their situation
• Day 7: Check-in with new insight or social proof
• Day 14: Gentle nudge or adjusted offer
• Day 30: Long-term touch if still not closed

4. SALES METRICS
──────────────────
Weekly Targets:
• Outreach sent: [X]
• Responses: [X] (target: [X]% response rate)
• Discovery calls: [X]
• Proposals sent: [X]
• Deals closed: [X] → ${d.sales_target}

Pipeline Health:
• Average deal size: $[X]
• Average sales cycle: [X days]
• Close rate: [X]%
• Required pipeline to hit target: $[target] ÷ [close rate] = $[X]

5. CRM & TOOLS
───────────────
• CRM: HubSpot (free), Pipedrive, or Notion/Airtable
• Outreach: Apollo, Lemlist, or LinkedIn Sales Navigator
• Proposals: PandaDoc or DocuSign
• Meeting booking: Calendly

6. 90-DAY SALES ACTION PLAN
─────────────────────────────
Month 1: Build pipeline
• Set up CRM with deal stages
• Define and document your ICP precisely
• Reach out to first [X] leads
• Book [X] discovery calls

Month 2: Optimize the process
• Review what's working — which message gets most responses?
• Shorten sales cycle — identify bottlenecks
• Start measuring conversion rate at each stage

Month 3: Scale and hit target
• Double down on best-performing channels
• Add referral ask to every closed customer
• Hit: ${d.sales_target}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Want me to write a pitch script, email sequence, or marketing plan next?`;
  }

  _genBrandStrategy(d) {
    return `🎨 BRAND STRATEGY — ${d.business_name_and_desc.split(',')[0].toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUSINESS: ${d.business_name_and_desc}

1. BRAND FOUNDATION
────────────────────
Mission: To help ${d.target_audience} achieve [their core goal] through ${d.business_name_and_desc}.
Vision: A world where ${d.target_audience} can [aspirational outcome].
Values: ${d.brand_words} — these aren't just words, they're how you make decisions.

2. TARGET AUDIENCE
───────────────────
${d.target_audience}

Psychographics:
• What do they aspire to be?
• What frustrates them daily?
• What do they brag about to their peers?
• Where do they look for information and recommendations?

3. BRAND PERSONALITY
─────────────────────
Brand Words: ${d.brand_words}

Voice & Tone:
• Written voice: [direct/warm/bold/authoritative — pick 1-2]
• Tone in marketing: [confident but not arrogant]
• Tone in support: [empathetic and efficient]
• What you never sound like: [the opposite of your competitors]

The Brand is like a person who: [describe your brand as a human character]

4. POSITIONING
───────────────
Competitors: ${d.competitors_and_difference}

Positioning Statement:
"For [${d.target_audience}] who [have specific problem], [${d.business_name_and_desc.split(',')[0]}] is the [category] that [unique benefit] because [reason to believe]."

Competitive Map:
• Where you play: [axis 1 — e.g., price, quality, convenience]
• Where you win: ${d.competitors_and_difference}
• What you don't try to win at: [the trade-off you consciously make]

5. BRAND EXPERIENCE
────────────────────
Customer Feeling Goal: "${d.brand_feeling}"

Every touchpoint should reinforce this:
• First impression (website/social): ${d.brand_words.split(',')[0].trim()} energy
• Sales experience: ${d.brand_words.split(',')[1] ? d.brand_words.split(',')[1].trim() : 'professional'} and helpful
• Product/service delivery: Delivers on the ${d.brand_feeling} promise
• Customer support: Warm, fast, human
• Post-purchase: Makes them feel proud of choosing you

6. VISUAL IDENTITY DIRECTION
──────────────────────────────
Brand Energy: ${d.brand_words}

Color Direction:
• Primary: [Choose based on your brand words — see color psychology guide]
• Secondary: [Complement or contrast]
• Accent: [For CTAs and highlights]

Typography Direction:
• Headlines: [Serif for authority/tradition, Sans-serif for modern/clean]
• Body: Clean, readable, minimum 16px on web
• Display: Optional for headers — use sparingly

Logo Direction: [Wordmark / Icon + Text / Monogram — pick what fits your scale]

7. MESSAGING FRAMEWORK
────────────────────────
Tagline: "[One line capturing what you do + your brand feeling]"

Hero Statement (website headline):
"[Outcome-focused] for [${d.target_audience}] — [proof or differentiator]"

Elevator Pitch (30 seconds):
"${d.business_name_and_desc.split(',')[0]} helps ${d.target_audience} to [specific result]. Unlike ${d.competitors_and_difference.split(',')[0]}, we [key differentiator] so that [customer outcome]. We're the only [category] that [unique claim]."

8. BRAND LAUNCH CHECKLIST
───────────────────────────
□ Logo (primary + variations + favicon)
□ Color palette (HEX codes)
□ Font selections (web-safe + brand fonts)
□ Brand guidelines document (1-page minimum)
□ Website with clear positioning
□ Social media profiles consistent across platforms
□ Email signature with branding
□ Business card / pitch deck template
□ Photography/visual style guide

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Want me to generate logo concepts, a marketing plan, or business name ideas next?`;
  }

  _genContentPlan(d) {
    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    return `✍️ CONTENT PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUSINESS: ${d.business_and_audience}
GOAL: ${d.content_goal}

1. CONTENT STRATEGY
────────────────────
Platforms: ${d.platforms}
Topics: ${d.topics}
Weekly Time Budget: ${d.time_commitment}

Content Mission: "We publish content to help ${d.business_and_audience.split(' ').slice(-3).join(' ')} [achieve specific outcome] through [your unique angle]."

2. CONTENT PILLARS
───────────────────
(The 4-5 recurring themes you always come back to)

Pillar 1 — EDUCATE (40%)
Topics like: ${d.topics.split(',')[0] || 'how-to guides, tips, frameworks'}
Goal: Build authority and trust

Pillar 2 — INSPIRE / STORY (20%)
Topics like: behind-the-scenes, founder journey, customer success stories
Goal: Build connection and relatability

Pillar 3 — PROVE (20%)
Topics like: testimonials, results, before/after, case studies
Goal: Build credibility and reduce buying risk

Pillar 4 — PROMOTE (10%)
Topics like: product features, offers, announcements
Goal: Drive conversions

Pillar 5 — ENTERTAIN / ENGAGE (10%)
Topics like: polls, questions, trending topics, humor
Goal: Boost reach and community

3. PLATFORM STRATEGIES
───────────────────────
${d.platforms.split(',').map(p => p.trim()).map(platform => {
  const guide = {
    instagram: 'Instagram: Reels for reach → Carousels for saves → Stories for daily engagement → Lives for community',
    tiktok: 'TikTok: Short-form video 1-3/day. Hook in first 2 seconds. Trending sounds + original value.',
    linkedin: 'LinkedIn: 3-5x/week. Text posts perform well. Carousels get saves. Polls boost engagement.',
    youtube: 'YouTube: 1-2x/week long-form. SEO-optimized titles. Shorts 3-5x/week for growth.',
    twitter: 'Twitter/X: 2-3 posts/day. Threads for value. Reply to conversations in your niche.',
    facebook: 'Facebook: Groups > Pages. 3-5 posts/week. Video gets most reach.',
    email: 'Email: Weekly newsletter. 40-60% open rate target. 1 clear CTA per email.',
  };
  const key = platform.toLowerCase();
  for (const [k, v] of Object.entries(guide)) { if (key.includes(k)) return `• ${v}`; }
  return `• ${platform}: Post consistently, mix education + proof + promotion`;
}).join('\n')}

4. CONTENT CALENDAR (4-WEEK SAMPLE)
─────────────────────────────────────
Week 1 — Foundation
${days.slice(0,5).map((day, i) => `${day}: ${['Educational post — [topic from pillar 1]','Customer story/testimonial','How-to guide: [specific tip]','Behind the scenes / story','Product/service benefit'][i]}`).join('\n')}

Week 2 — Depth
${days.slice(0,5).map((day, i) => `${day}: ${['Common mistake your audience makes + solution','Poll or question to your community','Step-by-step tutorial (carousel or video)','Your brand story or founder insight','FAQ — answer the top question you get'][i]}`).join('\n')}

Week 3 — Proof
${days.slice(0,5).map((day, i) => `${day}: ${['Case study: before/after customer result','Tip or insight (short, punchy)','Data or stat that supports your positioning','Partnership or collaboration feature','Limited offer or strong CTA'][i]}`).join('\n')}

Week 4 — Community
${days.slice(0,5).map((day, i) => `${day}: ${['Engagement post — get your audience talking','Repurpose your best post from past month','Expert opinion or quote on a trending topic','Your process or methodology explained','Month review + preview of next month'][i]}`).join('\n')}

5. CONTENT PRODUCTION WORKFLOW
────────────────────────────────
Given ${d.time_commitment} per week:
• Batch create: dedicate 1-2 hours to create the week's content in one session
• Template library: build 5-10 reusable content templates (less design time)
• Repurpose: 1 long piece → 5+ short pieces (1 blog → 5 social posts → 1 email)
• Schedule: Use Buffer, Later, or Hootsuite to pre-schedule

Tool Stack (free options):
• Design: Canva (free tier)
• Video: CapCut or InShot
• Scheduling: Buffer free (3 channels)
• Analytics: Native platform analytics

6. SUCCESS METRICS
───────────────────
Goal: ${d.content_goal}

Track Weekly:
• Follower growth rate
• Reach per post
• Engagement rate (aim for 3-5%+)
• Link clicks / website traffic from social
• Leads/conversions from content

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Want me to write specific post copy, email sequences, or a full marketing plan?`;
  }

  _genStartupRoadmap(d) {
    return `🚀 STARTUP ROADMAP — ${d.startup_name_and_desc.split(',')[0].toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STARTUP: ${d.startup_name_and_desc}
CURRENT STAGE: ${d.current_stage}
TEAM: ${d.team}

1. WHERE YOU ARE NOW
─────────────────────
Stage: ${d.current_stage}
Top Goals: ${d.goals}
Key Challenges: ${d.challenges}
Team: ${d.team}

Immediate Priority: Solve your #1 challenge (${d.challenges.split(',')[0].trim()}) because it's the constraint blocking everything else.

2. PHASE 1 — VALIDATE (Months 1-2)
────────────────────────────────────
Goal: Prove the problem is real and people will pay for a solution

Key Actions:
□ Talk to 20+ potential customers (discovery interviews)
□ Define your ICP (ideal customer profile) precisely
□ Build a landing page and measure sign-up/waitlist conversion
□ Create a simple prototype or MVP — minimum viable, not perfect
□ Secure 3-5 paying beta customers or LOIs (letters of intent)

Success Metric: 5 people pay or strongly commit before you build

3. PHASE 2 — BUILD (Months 2-4)
──────────────────────────────────
Goal: Build the minimum product that solves the core problem

Key Actions:
□ Build only what beta customers need to get value
□ Weekly check-ins with beta users — what works, what's missing
□ Iterate 2-week sprints
□ Document everything — processes, learnings, bugs
□ Achieve first "wow" moment with a user

Success Metric: ${d.goals.split(',')[0].trim()}

4. PHASE 3 — LAUNCH (Months 4-5)
───────────────────────────────────
Goal: Public launch and first wave of customers

Key Actions:
□ Launch on ProductHunt, LinkedIn, relevant communities
□ Get 3 customer testimonials and case studies
□ Set up analytics and conversion tracking
□ Activate all marketing channels
□ Hit first revenue milestone

Success Metric: Paying customers + positive unit economics

5. PHASE 4 — GROW (Months 5-6)
──────────────────────────────────
Goal: ${d.goals}

Key Actions:
□ Double down on 1-2 acquisition channels that work
□ Reduce churn — fix onboarding and activation
□ Hire first key team member (if needed)
□ Address: ${d.challenges}
□ Prepare for next funding round or revenue reinvestment

Success Metric: Consistent month-over-month growth (target: 15-20%/month)

6. RISK MITIGATION
───────────────────
Key Risks: ${d.challenges}

For each challenge:
• What's the worst case if this risk materializes?
• What's your plan B?
• How do you detect this risk early?

7. KEY METRICS DASHBOARD
──────────────────────────
Track these weekly:
• New customers / week
• Churn rate
• MRR / revenue
• Product engagement (DAU/WAU)
• NPS / customer satisfaction
• Runway (months of cash left)

8. NORTH STAR METRIC
─────────────────────
Pick ONE metric that captures real value delivered to customers.
Suggested: [depends on your model — DAU, GMV, activated users, MRR]
Everything the team does should move this number.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Want me to write a full business plan, pitch deck, or marketing plan next?`;
  }

  _genSWOT(d) {
    return `🔲 SWOT ANALYSIS — ${d.business.split(',')[0].toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUSINESS: ${d.business}

┌─────────────────────────────┬─────────────────────────────┐
│  STRENGTHS (Internal +)     │  WEAKNESSES (Internal −)    │
├─────────────────────────────┼─────────────────────────────┤
│ ${d.strengths}              │ ${d.weaknesses}             │
│                             │                             │
│ Key Strengths to Leverage:  │ Key Weaknesses to Address:  │
│ • [Specific capability 1]   │ • [Gap in resources]        │
│ • [Unique asset or IP]      │ • [Skill not on team]       │
│ • [Team or experience edge] │ • [Process inefficiency]    │
│ • [Customer loyalty/base]   │ • [Market awareness gap]    │
│ • [Technology advantage]    │ • [Cash flow constraint]    │
├─────────────────────────────┼─────────────────────────────┤
│  OPPORTUNITIES (External +) │  THREATS (External −)       │
├─────────────────────────────┼─────────────────────────────┤
│ ${d.opportunities}          │ ${d.threats}                │
│                             │                             │
│ Key Opportunities:          │ Key Threats:                │
│ • [Market trend 1]          │ • [Competitor action]       │
│ • [Underserved segment]     │ • [Economic risk]           │
│ • [Technology shift]        │ • [Regulatory change]       │
│ • [Partnership potential]   │ • [Technology disruption]   │
│ • [Geographic expansion]    │ • [Market saturation]       │
└─────────────────────────────┴─────────────────────────────┘

STRATEGIC PRIORITIES
─────────────────────

SO Strategies (Use Strengths to Capture Opportunities)
→ ${d.strengths.split(',')[0]} × ${d.opportunities.split(',')[0]}
   Action: [Define a specific initiative that combines these]

ST Strategies (Use Strengths to Counter Threats)
→ ${d.strengths.split(',')[0]} as defense against ${d.threats.split(',')[0]}
   Action: [How your strength reduces this threat's impact]

WO Strategies (Fix Weaknesses to Unlock Opportunities)
→ Address ${d.weaknesses.split(',')[0]} to capture ${d.opportunities.split(',')[0]}
   Action: [Investment or partnership to close this gap]

WT Strategies (Minimize Weaknesses, Avoid Threats)
→ ${d.weaknesses.split(',')[0]} + ${d.threats.split(',')[0]} = your highest-priority risk
   Action: [Contingency or risk mitigation plan]

TOP 3 PRIORITY ACTIONS
───────────────────────
1. [Highest-impact SO strategy — start this week]
2. [Most urgent WT risk mitigation — start this month]
3. [Biggest WO opportunity — plan for next quarter]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Want me to build a full business plan or strategic roadmap based on this SWOT?`;
  }

  _genExecSummary(d) {
    return `📄 EXECUTIVE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${d.business.split(',')[0].toUpperCase()}

THE OPPORTUNITY
────────────────
${d.problem_and_customer}

This is a significant and growing problem. [Add market size statistic here] — and the existing solutions are inadequate because [specific gap].

THE SOLUTION
─────────────
${d.business} offers a [product/service type] that [how it solves the problem] for [target customer].

${d.unique_advantage}

Unlike competitors who [competitor limitation], we [your advantage] — enabling our customers to [specific outcome] faster/cheaper/better.

BUSINESS MODEL & TRACTION
──────────────────────────
${d.model_and_traction}

Key Metrics:
• Revenue: $[X] | Growth: [X]% MoM
• Customers: [X] | Retention: [X]%
• CAC: $[X] | LTV: $[X] | Payback: [X months]

THE TEAM
──────────────────
[Founder 1] — [role + 1 relevant credential]
[Founder 2] — [role + 1 relevant credential]
[Advisor] — [relevant background]

THE ASK
──────────────────
${d.ask_and_outcome}

Use of Funds:
• [X]% Product & Engineering
• [X]% Sales & Marketing  
• [X]% Operations
• Expected outcome: [milestone] by [date]

WHY NOW
──────────────────
• [Market timing reason 1 — why this works today]
• [Technology or behavioral shift enabling this]
• Early traction demonstrates strong demand and product-market fit

Contact: [Name] | [Email] | [Website]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Want me to build a full pitch deck or business plan next?`;
  }

  _genMissionStatement(d) {
    const name = d.what_you_do.split(' ')[0];
    return `✨ MISSION & VISION — ${name.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MISSION STATEMENT
──────────────────
(What you do, for whom, and why — present tense)

Option 1 (Action-focused):
"We exist to [${d.desired_impact}] for [${d.who_you_help}] through [${d.what_you_do}]."

Option 2 (Customer-focused):
"We help [${d.who_you_help}] to [desired outcome] so they can [deeper benefit]."

Option 3 (Purpose-focused):
"[${d.what_you_do}] — because [${d.who_you_help}] deserve [${d.desired_impact}]."

VISION STATEMENT
─────────────────
(Aspirational — the world you're building toward)

Option 1 (Bold future):
"A world where [${d.who_you_help}] can [aspirational outcome] without [current barrier]."

Option 2 (Market leadership):
"To be the most trusted [category] for [${d.who_you_help}] globally."

Option 3 (Impact-focused):
"To [${d.desired_impact}] for [X million/billion] people by [year]."

CORE VALUES
───────────────────
Your values: ${d.values}

For each value, define what it means in practice:
• [Value 1]: "We [specific behavior that demonstrates this]"
• [Value 2]: "We always [action], even when [it's hard]"
• [Value 3]: "We never [opposite behavior]"

Values are only real when they affect decisions and have trade-offs.

HOW TO USE THESE
──────────────────
□ Mission goes in the About section of your website
□ Vision goes in investor materials and team documents
□ Values go in the hiring process and performance reviews
□ All three go in your employee handbook
□ Mission should be memorable — if your team can't recite it, simplify it

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pick the options that resonate most and refine them to match your voice.
Want me to create a brand strategy or business plan next?`;
  }

  // ─── BUSINESS NAME GENERATOR ─────────────────────────────────────
  _generateNames(industry) {
    const prefixes = ['Pro','Next','Smart','Swift','Prime','Peak','Pulse','Nexus','Zenith','Apex','Spark','Velo','Titan','Nova','Halo','Fuse','Bold','Core','Edge','Rise','Arc','Flux','Leap','Crest','Vibe'];
    const suffixes = ['Hub','Lab','Works','Studio','Tech','Solutions','Co','Labs','HQ','Forge','Craft','Shift','Base','Group','Agency','Partners','Collective','Ventures','Brands'];
    const terms = this._industryTerms(industry);

    const names = new Set();
    while (names.size < 5) {
      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
      const s = suffixes[Math.floor(Math.random() * suffixes.length)];
      names.add(p + s);
    }
    while (names.size < 9) {
      const t = terms[Math.floor(Math.random() * terms.length)];
      const p = prefixes[Math.floor(Math.random() * prefixes.length)];
      names.add(`${t} ${p}`);
    }

    const list = [...names].slice(0, 9);
    return `✨ Business Name Ideas${industry !== 'general' ? ' for ' + industry.charAt(0).toUpperCase() + industry.slice(1) : ''}\n\n${list.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\n💡 How to choose the right one:\n• Say it out loud — easy to say and spell?\n• Check domain: search [name].com on Namecheap or GoDaddy\n• Google it — anything confusing already using the name?\n• Trademark search: USPTO.gov (US) or WIPO.int (international)\n• Keep it under 12 characters if possible\n• Ask 5 people: "What does this name make you think of?"\n\nWant a different style? Try: "generate modern names for a [industry] startup" or "give me names for a [adjective] brand"\nWant logo concepts for any of these? Just ask!`;
  }

  // ─── LOGO SUGGESTIONS ────────────────────────────────────────────
  _logoSuggestions(name, industry) {
    const concepts = [
      { type: 'Abstract Geometric', desc: `Minimalist shapes representing growth and innovation. Scales to any size. Versatile across digital and print.`, inspo: 'Airbnb, Slack, Stripe, Notion' },
      { type: 'Wordmark / Logotype', desc: `Stylized typography of "${name}". Strongest for brand name recognition. Modify one letter for uniqueness.`, inspo: 'Google, FedEx, Coca-Cola, Netflix' },
      { type: 'Icon + Wordmark', desc: `Symbol beside your name. Icon works alone as app icon/favicon, full version for official use.`, inspo: 'Amazon, Adidas, Twitter/X, Spotify' },
      { type: 'Monogram', desc: `Initials in a distinctive mark. Clean, premium feel. Works beautifully as favicon and profile picture.`, inspo: 'Louis Vuitton, GE, IBM, Chanel' },
      { type: 'Mascot / Character', desc: `A character representing your brand personality. Memorable across social media and very shareable.`, inspo: 'Duolingo, Mailchimp, Reddit, Michelin' },
    ];
    let out = `🎨 Logo Concept Ideas for "${name}"\n\n`;
    concepts.forEach((c, i) => { out += `${i + 1}. ${c.type}\n   ${c.desc}\n   Inspired by: ${c.inspo}\n\n`; });
    out += `🎨 Color Psychology for ${industry} brands:\n${this._colorGuide(industry)}\n\n`;
    out += `📐 Essential formats to get from your designer:\n• SVG (scales infinitely — use everywhere)\n• PNG transparent background (digital use)\n• PNG white background (documents)\n• Dark version + Light version\n• Icon-only version (for app icons / favicons)\n\n`;
    out += `💡 Tip: Start black and white. If your logo works without color, color is a bonus. Great logos are recognizable at 16×16px.`;
    return out;
  }

  // ─── SITUATIONAL ADVICE ──────────────────────────────────────────
  _initSituations() {
    return {
      conflict: { adv: `Conflict Resolution:\n1. Listen to understand all sides before responding\n2. Acknowledge emotions without judgment\n3. Separate the person from the problem\n4. Focus on shared goals — what does everyone want to achieve?\n5. Brainstorm 3+ solutions collaboratively\n6. Agree on specific actions with owners and deadlines\n7. Follow up to verify the resolution held`, tips: ['Regulate your own emotions first — you can\'t help others if you\'re reactive','Use "I" statements: "I feel..." vs "You always..."','Document what was agreed in writing','Address issues at the earliest signal — small fires are easier to put out','Ask "What outcome do you want?" before proposing solutions'] },
      deadline: { adv: `Deadline Crunch Strategy:\n1. Audit ruthlessly: what absolutely MUST be done vs nice-to-have?\n2. Break the remaining work into the smallest possible tasks\n3. Communicate delays early — surprises damage trust more than delays\n4. Delegate: who can absorb even part of the workload?\n5. Eliminate all distractions — single-task mode only\n6. Execute in 90-minute deep work blocks\n7. Deliver something excellent on the critical items, cut everything else`, tips: ['Communicate status proactively — never go silent','Cut scope, not quality on the items that matter most','Ask: "What can I stop doing to make room for this?"','Set buffer time — deadlines always take longer than estimated','Tracking progress hour-by-hour when critical prevents surprises'] },
      presentation: { adv: `Presentation Framework:\n1. Know your audience: what do they care about, what worries them?\n2. Lead with the conclusion — busy people want the answer first\n3. Use the rule of 3: max 3 key messages anyone will remember\n4. Support each message with: data + story + visual\n5. Anticipate the top 5 questions and prepare crisp answers\n6. Close with one specific, clear call to action\n7. Practice out loud until it flows naturally`, tips: ['Practice with real feedback, not just in your head','Prepare for technical failure — have an offline backup','Arrive early to test the room and tech','Make eye contact with individuals, not the screen or ceiling','Pause deliberately for emphasis — silence signals confidence'] },
      negotiation: { adv: `Negotiation Playbook:\n1. Define your BATNA before you start (Best Alternative To a Negotiated Agreement)\n2. Research the other party's interests, constraints, and options\n3. Anchor first with justification if you're the seller\n4. Focus on interests, not positions — "why do you want that?" unlocks solutions\n5. Listen more than you talk — information is leverage\n6. Trade concessions strategically — never give without getting something\n7. Confirm all agreements in writing the same day`, tips: ['The first number anchors the entire conversation','Never accept the first offer — always counter','Emotional detachment makes you a better negotiator — it\'s not personal','Silence after an offer is powerful — resist the urge to fill it','Know your walk-away point before you start, not during'] },
      decision: { adv: `Decision-Making Framework:\n1. Define the decision precisely — what exactly needs to be decided?\n2. Set a decision deadline — every decision needs one\n3. Gather the minimum necessary information\n4. Generate at least 3 options — binary choices limit creative solutions\n5. Use the "10/10/10" test: how will you feel about this in 10 minutes, 10 months, 10 years?\n6. Consider the reversibility — reversible: decide fast. Irreversible: slow down.\n7. Commit fully — half-hearted execution of a good plan beats perfect planning with poor execution`, tips: ['Distinguish reversible from irreversible decisions','For reversible: decide fast, iterate','For irreversible: gather diverse perspectives before deciding','Document your reasoning — future-you will thank present-you','Doing nothing is also a decision — factor in the cost of inaction'] },
      failure: { adv: `Recovering from Failure:\n1. Accept what happened — denial wastes energy better spent recovering\n2. Identify the root cause, not the symptoms\n3. Extract the specific lesson (not "work harder" but "we underestimated X")\n4. Adjust the approach — same effort + same approach = same result\n5. Share the learning with your team openly — it builds psychological safety\n6. Move forward with conviction and set a clear "back on track" milestone\n7. Measure recovery with a specific metric and timeline`, tips: ['Failure is the most efficient feedback mechanism available','Ask "what will I do differently?" not "why did this happen to me?"','Share failures openly — it builds psychological safety and prevents repetition','Separate your identity from the outcome — you are not your failures','Speed of recovery matters more than avoiding failure entirely'] },
      motivation: { adv: `Rebuilding Motivation:\n1. Reconnect with your original why — why did you start this?\n2. Set a meaningful short-term goal you can achieve in 48 hours\n3. Remove the physical and digital obstacles making it hard\n4. Find an accountability partner — commitment to others is stronger\n5. Celebrate small wins consciously — progress fuels motivation\n6. Change your environment (new location, earlier start time)\n7. Strategic breaks restore motivation more than pushing through`, tips: ['Motivation follows action — start small, don\'t wait to feel motivated','Break the task into the smallest possible next step','Identify your peak energy hours and protect them','Remove decision fatigue by planning tomorrow the night before','Your "why" must be bigger than the discomfort'] },
      stress: { adv: `Managing Professional Stress:\n1. Name exactly what's causing stress — vague stress is harder to address\n2. Separate urgent from important — most "urgent" things can wait\n3. Communicate clearly what you can and cannot do with current capacity\n4. Protect your non-negotiables: sleep, movement, basic nutrition\n5. Use a brain dump: write every worry down to free mental RAM\n6. Delegate at least one thing today\n7. Ask for help directly — it's a strength`, tips: ['Overwhelm is often scope and not difficulty — reduce the list','Deep breathing activates the parasympathetic nervous system in 60 seconds','Block "worry time" to contain rumination — outside that block, redirect','Check: is this stress about something real, or assumed?','Recovery time is not optional — burnout costs 10× more than the break would have'] },
      communication: { adv: `Communication Framework:\n1. Know your audience before writing or speaking\n2. Lead with the conclusion — context second, detail third\n3. Be specific: replace vague language with precise words and numbers\n4. Use active voice and short sentences\n5. Check tone — re-read as the recipient, not as yourself\n6. Summarize action items clearly at the end of every communication\n7. Confirm understanding explicitly, don't assume it`, tips: ['Match channel to message: urgent = call, detailed = email, quick = Slack','Written communication: subject/headline first, then context, then ask','Verbal: pause before responding — better quality answer every time','Over-communicate on important projects — radio silence breeds anxiety','If it needs more than 3 replies to resolve via text, pick up the phone'] },
    };
  }

  _detectSituation(msg) {
    const directKeys = Object.keys(this.situationBank);
    for (const s of directKeys) { if (msg.includes(s)) return s; }
    const map = {
      conflict:      ['argument','disagreement','dispute','tension','clashing','friction','fight with my team'],
      deadline:      ['running out of time','behind schedule','overdue','time crunch','rushed','need to deliver'],
      presentation:  ['present','presenting','speech','talk in front','public speaking','slides','pitch meeting'],
      negotiation:   ['negotiate','counter offer','salary negotiation','price negotiation','deal terms'],
      decision:      ['decide','can\'t decide','which option','should i choose','making a decision'],
      failure:       ['failed','didn\'t work','went wrong','lost the deal','mistake','things went bad'],
      motivation:    ['unmotivated','no motivation','demotivated','burned out','lost passion','don\'t feel like'],
      stress:        ['stressed','overwhelmed','too much on my plate','can\'t cope','burning out','anxious about work'],
      communication: ['miscommunication','misunderstood','hard to explain','how to tell','how to communicate'],
    };
    for (const [sit, kws] of Object.entries(map)) {
      if (kws.some(k => msg.includes(k))) return sit;
    }
    return null;
  }

  _formatSituation(key) {
    const s = this.situationBank[key];
    return `💡 ${key.charAt(0).toUpperCase() + key.slice(1)} Guidance\n\n${s.adv}\n\n🔑 Key Tips:\n${s.tips.map(t => '• ' + t).join('\n')}`;
  }

  // ─── ROLE HELP ────────────────────────────────────────────────────
  _detectRole(msg) {
    const roles = {
      entrepreneur: ['entrepreneur','founder','startup founder','i started a business','my startup'],
      developer: ['developer','programmer','coder','software engineer','frontend','backend','fullstack','devops'],
      designer: ['designer','ux designer','ui designer','graphic designer','product designer','visual designer'],
      marketer: ['marketer','marketing manager','growth manager','demand gen','brand manager'],
      manager: ['manager','team lead','team leader','supervisor','director','people manager'],
      sales: ['sales rep','account executive','sales manager','bdr','sdr','in sales'],
      hr: ['hr manager','human resources','people ops','talent','recruiter'],
      finance: ['cfo','finance manager','financial analyst','accountant','treasurer','controller'],
      consultant: ['consultant','advisor','business consultant','strategy consultant'],
      'product manager': ['product manager','pm ','product owner','po '],
      analyst: ['data analyst','business analyst','data scientist','bi analyst'],
      copywriter: ['copywriter','content writer','writer'],
      teacher: ['teacher','educator','instructor','professor','trainer','tutor'],
      coach: ['coach','life coach','business coach','executive coach'],
    };
    for (const [role, aliases] of Object.entries(roles)) {
      if (aliases.some(a => msg.includes(a))) return role;
    }
    return null;
  }

  _roleHelp(role, msg) {
    const roleGuides = {
      entrepreneur: `👔 Entrepreneur — I can help you with:\n\n1. "Create a business plan" — full document with all sections\n2. "Create a pitch deck" — investor-ready 11-slide structure\n3. "Create a marketing plan" — channel strategy + content plan\n4. "Create a financial plan" — projections and unit economics\n5. "Create a startup roadmap" — phase-by-phase growth plan\n6. "Create a sales plan" — pipeline and closing strategy\n7. "Create a brand strategy" — positioning + messaging\n8. "Do a SWOT analysis" — for my business\n9. "Create a mission statement" — for my company\n10. "Generate business names" — for my industry\n\nWhat would you like to create?`,
      developer: `👔 Developer — I can help you with:\n\n1. Code review checklist — what to check in every PR\n2. Architecture design framework — how to plan your system\n3. API documentation structure — what to include\n4. Debugging methodology — systematic approach to fixing bugs\n5. Technical spec template — how to write a good spec\n6. Sprint planning framework — how to run agile sprints\n\nWhat do you need help with?`,
      marketer: `👔 Marketer — I can help you with:\n\n1. "Create a marketing plan" — full strategy document\n2. "Create a content plan" — platform strategy + calendar\n3. Campaign framework — goal → audience → channels → creative → metrics\n4. "Create an email sequence" — welcome or sales drip\n5. SEO strategy — keyword research + content framework\n6. "Do a SWOT analysis" — competitive positioning\n\nWhat would you like to create?`,
      default: `I can help you create any business document, strategy, or plan. Just say what you need, for example:\n• "Create a business plan"\n• "Write a pitch deck"\n• "Build a marketing plan"\n• "Make a financial plan"\n\nWhat would you like to work on?`
    };
    return roleGuides[role] || roleGuides.default;
  }

  // ─── KNOWLEDGE BASE ───────────────────────────────────────────────
  _initKB() {
    return {
      business:            { def:'An organization engaged in commercial activities to generate income and create value.', points:['Requires planning and clear strategy','Market research is essential before starting','Financial management is critical','Customer satisfaction drives long-term success','Innovation keeps businesses competitive'] },
      startup:             { def:'A young company founded to develop and validate a scalable business model.', points:['Secure funding to extend runway','Build the right team early','Achieve product-market fit before scaling','Manage cash flow week by week','Scale operations only after validation'] },
      marketing:           { def:'The process of promoting products or services to attract and retain customers.', points:['Know your ICP (ideal customer profile) deeply','Create content that solves real problems','Use multiple distribution channels','Measure every campaign with clear metrics','Continuously optimize based on data'] },
      sales:               { def:'The process of converting prospects into paying customers.', points:['Prospect → Qualify → Present → Handle objections → Close → Follow up','Listen more than you talk in discovery','Personalize every touchpoint to the buyer\'s specific situation','Track pipeline metrics weekly','80% of sales happen after the 5th contact'] },
      finance:             { def:'The management of money, investments, and financial strategy for a business.', points:['Cash flow is more critical than profit for survival','Know your unit economics: CAC, LTV, payback period','Budget monthly and reforecast quarterly','Separate business and personal finances immediately','Monitor burn rate and runway at all times'] },
      leadership:          { def:'The ability to guide, inspire, and develop others toward shared goals.', points:['Communicate vision clearly and repeatedly','Build psychological safety for honest feedback','Develop your team — their growth is your growth','Make decisions with the best available information','Hold yourself to the standards you set for others'] },
      branding:            { def:'The process of creating a distinctive identity that builds recognition and trust.', points:['Positioning: define who you\'re for and who you\'re not for','Consistency builds recognition — inconsistency destroys it','Brand voice matters as much as visual identity','Great brands are built on a clear promise delivered consistently','Emotional connection drives loyalty more than features'] },
      'customer service':  { def:'The support and experience you provide to customers before, during, and after purchase.', points:['Respond fast — speed is the primary driver of customer satisfaction','Solve the problem fully in one interaction when possible','Turn complaints into loyalty with exceptional recovery','Measure NPS and CSAT quarterly','Your support team knows your product\'s weaknesses best — listen to them'] },
      strategy:            { def:'A plan of action to achieve long-term goals and competitive advantage.', points:['Strategy is what you choose NOT to do as much as what you do','Analyze strengths, weaknesses, opportunities, and threats (SWOT)','Align resources with your highest-value priorities','Review and adapt strategy quarterly','The best strategy is focused — avoid trying to win everywhere'] },
      operations:          { def:'The day-to-day processes that keep the business running efficiently.', points:['Document repeatable processes so anyone can execute them','Identify bottlenecks that limit your throughput','Measure operational efficiency with key metrics','Continuously improve — small gains compound over time','Automate before you hire for repetitive tasks'] },
    };
  }

  _searchKB(msg) {
    const words = msg.split(/\s+/).filter(w => w.length > 2);
    const all = { ...this._initKB(), ...this.userDocuments };
    let best = null, bestScore = 0;
    for (const [topic, data] of Object.entries(all)) {
      let score = 0;
      const blob = [topic, data.def || '', ...(data.points || [])].join(' ').toLowerCase();
      words.forEach(w => { if (topic.includes(w)) score += 10; else if (blob.includes(w)) score += 2; });
      if (score > bestScore) { bestScore = score; best = { topic, data }; }
    }
    return bestScore >= 4 ? best : null;
  }

  _formatKB(hit) {
    const d = hit.data;
    const topic = hit.topic.charAt(0).toUpperCase() + hit.topic.slice(1);
    let out = `📚 ${topic}\n\n`;
    if (d.def) out += `${d.def}\n\n`;
    if (d.points && d.points.length) { out += `Key Points:\n`; d.points.forEach(p => { out += `• ${p}\n`; }); }
    return out;
  }

  // ─── KNOWLEDGE LEARNING ───────────────────────────────────────────
  _handleLearn(raw) {
    const topicMatch = raw.match(/(?:about|topic|teach you about|add knowledge[:\s]+)\s*([^:,.\n]{2,40})/i);
    const topic = topicMatch ? topicMatch[1].trim() : null;
    const defMatch = raw.match(/(?:definition|means?|is|:)[:\s]+([^.\n]{10,})/i);
    const def = defMatch ? defMatch[1].trim() : null;
    if (topic && def) {
      this.userDocuments[topic.toLowerCase()] = { def, source: 'user', addedAt: new Date().toISOString() };
      this._saveUserDocs();
      return `✅ Got it! I've learned about "${topic}" and can now answer questions on that topic.`;
    }
    return `📚 To teach me something, use this format:\n"Teach you about [topic]: definition is [your definition]"\n\nExample: "Teach you about blockchain: definition is a distributed ledger technology that records transactions across multiple computers without a central authority"`;
  }

  _loadUserDocs() { try { const s = localStorage.getItem('cf_knowledge'); return s ? JSON.parse(s) : {}; } catch { return {}; } }
  _saveUserDocs() { try { localStorage.setItem('cf_knowledge', JSON.stringify(this.userDocuments)); } catch {} }

  // ─── HELPERS ──────────────────────────────────────────────────────
  _extractIndustry(msg) {
    const industries = ['tech','software','saas','finance','fintech','health','healthcare','retail','education','food','restaurant','consulting','real estate','ecommerce','marketing','legal','insurance','manufacturing','fitness','fashion','travel','media','entertainment'];
    for (const i of industries) { if (msg.includes(i)) return i; }
    return 'general';
  }

  _industryTerms(industry) {
    const map = {
      tech:        ['Byte','Code','Cloud','Data','Logic','Pixel','Stack','Cipher','Nexus','Sync'],
      software:    ['Code','Dev','Stack','Build','Deploy','Ship','Loop','Branch','Merge'],
      saas:        ['Cloud','Scale','Flow','Automate','Connect','Sync','Deploy','Stream'],
      finance:     ['Capital','Wealth','Trust','Assets','Coin','Ledger','Apex','Summit','Fund'],
      fintech:     ['Pay','Coin','Wallet','Transfer','Vault','Block','Ledger','Fiat'],
      health:      ['Care','Vital','Heal','Life','Pulse','Thrive','Renew','Mend','Cure'],
      retail:      ['Shop','Store','Style','Market','Trend','Pick','Select','Found','Shelf'],
      education:   ['Learn','Skill','Master','Wisdom','Path','Spark','Grow','Bright','Teach'],
      food:        ['Bite','Flavor','Harvest','Brew','Craft','Fresh','Plate','Nourish','Serve'],
      consulting:  ['Advise','Expert','Insight','Strategy','Clarity','Think','Guide','Solve'],
      'real estate':['Home','Property','Realty','Haven','Estate','Land','Place','Space','Key'],
      fitness:     ['Fit','Strong','Lift','Endure','Peak','Sweat','Form','Move','Gain'],
      fashion:     ['Thread','Stitch','Wear','Drape','Loom','Cloth','Couture','Style','Knit'],
      default:     ['Prime','Smart','Elite','Future','Quantum','Dynamic','Clarity','Vision','Bold'],
    };
    return map[industry] || map.default;
  }

  _extractQuoted(text) {
    const m = text.match(/["']([^"']{2,40})["']/);
    return m ? m[1].trim() : null;
  }

  _colorGuide(industry) {
    const guides = {
      tech:      'Blue (trust, intelligence) + White (clean, modern) → see Google, IBM, Microsoft',
      finance:   'Deep Blue or Green (trust, stability, growth) → see JPMorgan, Fidelity, Robinhood',
      health:    'Green or Blue (clean, healing, trust) → see NHS, Hims, Headspace',
      retail:    'Bold colors matching demo — luxury: black/gold; youth: bright/playful → see Nike, Supreme',
      food:      'Red/Yellow = appetite stimulus; Green = healthy/organic; Brown = artisan/craft',
      education: 'Blue (knowledge) + Yellow (optimism) → see Duolingo, Khan Academy, Coursera',
      fitness:   'Black + neon accent (power, energy) → see Nike, Under Armour, Peloton',
      default:   'Blue (trust) | Green (growth) | Orange (energy) | Purple (creativity) | Black (premium)',
    };
    return guides[industry] || guides.default;
  }
}

// ─── INITIALISE ───────────────────────────────────────────────────────
const chatEnhancements = new ChatbotEnhancements();

/**
 * Called from getBotReply as Pass 6 fallback.
 * Returns a string or null (main chatbot handles null).
 */
function getEnhancedResponse(userInput) {
  return chatEnhancements.generateResponse(userInput);
}
