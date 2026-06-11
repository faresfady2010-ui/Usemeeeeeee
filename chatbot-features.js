class ChatbotEnhancements {
    constructor() {
        this.roleContexts = this.initializeRoleContexts();
        this.generatedNames = [];
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.userDocuments = this.loadUserDocuments();
        this.BUSINESS_TASKS = this.initializeBusinessTasks();
        this.TASK_SYNONYMS = this.initializeTaskSynonyms();
    }

    initializeBusinessTasks() {
        return {
            // ── PLANNING ──────────────────────────────────────────────────
            'business_plan': {
                keywords: ['business plan','write a business plan','create business plan','business planning','how to plan a business','plan my business'],
                response: `📋 **Business Plan Structure**\n\n✅ **1. Executive Summary** (1 page)\n   - Vision, mission, value proposition, key milestones\n\n✅ **2. Company Description**\n   - Legal structure, founding story, problem you solve\n\n✅ **3. Market Analysis**\n   - TAM/SAM/SOM, target customers, competitor landscape\n\n✅ **4. Organization & Team**\n   - Founders, key roles, advisors, org chart\n\n✅ **5. Products/Services**\n   - Offer details, pricing, development stage, IP\n\n✅ **6. Marketing & Sales Strategy**\n   - Channels, CAC, conversion funnel, growth plan\n\n✅ **7. Financial Projections**\n   - P&L, cash flow, break-even, 3-year forecast\n\n✅ **8. Funding Requirements**\n   - How much, for what, expected returns\n\n✅ **9. Appendix**\n   - Market data, resumes, legal docs, letters of intent\n\n💡 *Tip: Write the Executive Summary LAST — it summarises what you've already built.*`
            },
            'executive_summary': {
                keywords: ['executive summary','write executive summary','exec summary','how to write executive summary'],
                response: `📄 **Executive Summary Guide**\n\nKeep it to ONE page. Investors read this first — if it doesn't hook them, they won't continue.\n\n**Structure:**\n1. 🎯 **Hook** — One powerful sentence describing what you do\n2. 💡 **Problem** — The specific pain point you solve\n3. 🚀 **Solution** — How you solve it uniquely\n4. 📊 **Market** — Size of the opportunity (TAM/SAM)\n5. 💰 **Business Model** — How you make money\n6. 📈 **Traction** — Users, revenue, growth (if any)\n7. 👥 **Team** — Why YOU are the right team\n8. 💵 **Ask** — How much you're raising and for what\n\n💡 *Write it at the 8th-grade reading level. If a non-expert can't understand it in 60 seconds, simplify.*`
            },
            'mission_statement': {
                keywords: ['mission statement','write mission statement','company mission','what is our mission','mission of company','create mission'],
                response: `🎯 **Mission Statement Guide**\n\nA mission statement answers: **What do we do, for whom, and why?**\n\n**Formula:** We [VERB] [TARGET AUDIENCE] so they can [OUTCOME]\n\n**Examples:**\n• Tesla: "To accelerate the world's transition to sustainable energy"\n• Google: "To organize the world's information and make it universally accessible"\n• Airbnb: "To create a world where anyone can belong anywhere"\n\n**Rules:**\n✅ Maximum 2 sentences\n✅ Present tense, active voice\n✅ Specific about who you serve\n✅ Emotionally resonant, not just functional\n❌ No jargon or buzzwords\n❌ Don't confuse mission (now) with vision (future)\n\n💡 *Draft 5 versions in 10 minutes. Pick the one that feels most true.*`
            },
            'vision_statement': {
                keywords: ['vision statement','write vision statement','company vision','what is our vision','create vision'],
                response: `🔭 **Vision Statement Guide**\n\nA vision answers: **What world do we want to create in 10-20 years?**\n\n**Formula:** A world where [BOLD FUTURE STATE]\n\n**Examples:**\n• Microsoft: "A computer on every desk and in every home"\n• IKEA: "To create a better everyday life for the many people"\n• LinkedIn: "Create economic opportunity for every member of the global workforce"\n\n**Rules:**\n✅ Bold and inspiring — slightly unreachable\n✅ Describes a changed world, not just your company\n✅ Timeless — valid in 20 years\n✅ Short enough to memorise\n❌ Don't include specific numbers or dates\n❌ Don't mix in tactics or products\n\n💡 *Ask: "If we fully succeeded, what would the world look like?" That's your vision.*`
            },
            'business_model_canvas': {
                keywords: ['business model canvas','business model','bmc','canvas model','business model design','how to design business model'],
                response: `🗺️ **Business Model Canvas — 9 Building Blocks**\n\n**LEFT SIDE (Operations)**\n1. 🤝 **Key Partners** — Who do you need? (suppliers, partners, alliances)\n2. ⚙️ **Key Activities** — What must you DO to deliver value?\n3. 🏗️ **Key Resources** — What assets are required? (people, IP, cash, tech)\n4. 💰 **Cost Structure** — What are your main costs?\n\n**CENTRE (Value)**\n5. 🎁 **Value Proposition** — Why customers choose YOU over alternatives\n\n**RIGHT SIDE (Customers)**\n6. 🤝 **Customer Relationships** — Personal? Automated? Community?\n7. 📣 **Channels** — How do customers find and receive your value?\n8. 👥 **Customer Segments** — Exactly who are you serving?\n9. 💵 **Revenue Streams** — How do you earn money?\n\n💡 *Print the canvas and use sticky notes. Complete RIGHT SIDE first (customer focus), then LEFT SIDE (operations).*`
            },
            'swot_analysis': {
                keywords: ['swot analysis','swot','strengths weaknesses','swot template','how to do swot','swot for business'],
                response: `⚡ **SWOT Analysis Guide**\n\n**S — Strengths (Internal, Positive)**\n- What do you do better than competitors?\n- Unique assets, skills, or advantages?\n- Why do customers choose you?\n\n**W — Weaknesses (Internal, Negative)**\n- Where do you underperform?\n- What resources are you missing?\n- What causes customer complaints?\n\n**O — Opportunities (External, Positive)**\n- What market trends benefit you?\n- What gaps exist in the market?\n- What could you exploit right now?\n\n**T — Threats (External, Negative)**\n- What are competitors doing better?\n- What market shifts could hurt you?\n- What regulations are coming?\n\n💡 *Key insight: Match your Strengths to Opportunities (SO strategy) and use Strengths to avoid Threats (ST strategy). Fix Weaknesses before Opportunities close.*`
            },
            'startup_roadmap': {
                keywords: ['startup roadmap','business roadmap','roadmap','growth roadmap','how to plan startup','startup timeline'],
                response: `🗺️ **Startup Roadmap Template**\n\n**Phase 1: Validation (Months 1–3)**\n✅ Define problem + target customer\n✅ Interview 20–50 potential customers\n✅ Build MVP (minimum viable product)\n✅ Get 5–10 paying customers OR 100 free users\n\n**Phase 2: Launch (Months 4–6)**\n✅ Product-market fit testing\n✅ First marketing channel activated\n✅ Basic operations set up (legal, banking, tools)\n✅ Refine offer based on feedback\n\n**Phase 3: Growth (Months 7–12)**\n✅ Scale winning acquisition channel\n✅ Build team (hire key role #1)\n✅ Automate repetitive processes\n✅ Prepare funding pitch (if needed)\n\n**Phase 4: Scale (Year 2+)**\n✅ Expand to new markets or segments\n✅ Raise Series A (if VC-backed)\n✅ Build leadership team\n✅ Establish competitive moats\n\n💡 *Most startups skip Phase 1 and go straight to Phase 2. This is the #1 cause of startup failure.*`
            },
            'value_proposition': {
                keywords: ['value proposition','value prop','unique value proposition','uvp','usp','unique selling proposition','what makes us different','why choose us'],
                response: `💎 **Value Proposition Design**\n\n**The Formula:**\n"We help [TARGET CUSTOMER] who [PROBLEM/SITUATION] to [OUTCOME] unlike [ALTERNATIVES] by [UNIQUE APPROACH]"\n\n**Canvases to use:**\n📌 **Jobs-to-be-Done** — What task is the customer really trying to complete?\n📌 **Pains** — What frustrates them about current solutions?\n📌 **Gains** — What would make them delighted?\n\n**Strong VP Examples:**\n• Slack: "Be less busy" (replaces email chaos)\n• Uber: "Get there. Your day belongs to you."\n• Dollar Shave Club: "Great blades for a few bucks a month"\n\n**Test your VP:**\n1. Can a stranger understand it in 5 seconds?\n2. Does it speak to a real pain, not a feature?\n3. Is it measurably better than alternatives?\n4. Is it something competitors cannot easily copy?\n\n💡 *A VP is proven by customers paying for it — not by your belief in it.*`
            },
            'market_opportunity': {
                keywords: ['market opportunity','market size','tam sam som','total addressable market','how big is my market','market analysis'],
                response: `📊 **Market Opportunity Analysis**\n\n**Three Market Size Levels:**\n\n🌍 **TAM (Total Addressable Market)**\n- If you captured 100% of everyone who could use your product globally\n- Biggest number, theoretical maximum\n- Example for food delivery: All restaurant spending globally = $4T+\n\n🎯 **SAM (Serviceable Addressable Market)**\n- The portion you could realistically serve with your current model\n- Filtered by geography, segment, delivery model\n- Example: Online food delivery in your target cities = $50B\n\n🏹 **SOM (Serviceable Obtainable Market)**\n- Realistic 3-5 year target based on resources\n- Investors care most about this number\n- Example: Your city, your niche = $500M → target 1–3% = $5–15M\n\n**How to Calculate:**\n1. Top-down: Industry report × your segment % × addressable geography\n2. Bottom-up: Price × # of target customers you can reach\n\n💡 *Use bottom-up for credibility. Investors trust "20,000 businesses × $500/yr = $10M TAM" more than "1% of a $1B market".*`
            },
            'feasibility_study': {
                keywords: ['feasibility study','feasibility analysis','is my idea feasible','can this business work','viability analysis','validate business idea'],
                response: `🔍 **Business Feasibility Study**\n\n**5 Dimensions to Analyse:**\n\n1. 📊 **Market Feasibility**\n   - Is there real demand? (Validate with interviews, not surveys)\n   - Is the market large enough? (Min $10M for VC, smaller for lifestyle biz)\n   - Is competition a signal of demand or a barrier?\n\n2. 💰 **Financial Feasibility**\n   - What are startup costs? Can you afford them?\n   - What's the break-even timeline?\n   - Unit economics: Does revenue > cost per customer?\n\n3. ⚙️ **Technical/Operational Feasibility**\n   - Can this actually be built or delivered?\n   - Do you have or can you acquire the skills?\n   - What's the supply chain or production model?\n\n4. 👥 **Team Feasibility**\n   - Do you have the skills needed?\n   - Who are the critical missing team members?\n\n5. ⚖️ **Legal/Regulatory Feasibility**\n   - Any licences or permits required?\n   - IP issues? Regulatory barriers?\n\n💡 *If any dimension is "red", fix it before launching — not after spending money.*`
            },
            'go_to_market': {
                keywords: ['go to market','go-to-market','gtm strategy','launch strategy','market entry strategy','how to launch a business','how to enter market'],
                response: `🚀 **Go-to-Market Strategy**\n\n**Step 1: Define Your ICP (Ideal Customer Profile)**\n- Industry, company size, geography, job title (B2B)\n- Age, income, pain point, buying behaviour (B2C)\n\n**Step 2: Choose GTM Motion**\n📣 **Sales-Led** — Sales team finds and closes customers (best for high-ticket B2B)\n📲 **Product-Led** — Product is the sales tool, free tier or trial (Slack, Zoom, Notion)\n📢 **Marketing-Led** — Content and brand drive inbound (SEO, social, PR)\n🤝 **Partner-Led** — Distribution through resellers or integrations\n\n**Step 3: Pricing + Packaging**\n- Match price to customer's perceived value, not your cost\n- Start simple: one SKU is better than five\n\n**Step 4: First 100 Customers Plan**\n- Channel 1: Direct outreach (manual DMs, cold email, calls)\n- Channel 2: Referrals from your network\n- Channel 3: One content piece or partnership\n\n**Step 5: Feedback Loop**\n- Weekly customer calls for first 6 months\n- Track why you win AND why you lose\n\n💡 *Your GTM succeeds when you can predictably acquire a customer for less than they're worth to you.*`
            },
            'competitor_analysis': {
                keywords: ['competitor analysis','competitive analysis','analyse competitors','competition analysis','who are my competitors','competitive landscape'],
                response: `🔎 **Competitor Analysis Framework**\n\n**Step 1: Map the Competitive Landscape**\n- Direct competitors (same product, same customer)\n- Indirect competitors (different product, same problem)\n- Status quo (doing nothing, using a workaround)\n\n**Step 2: Gather Intel on Each Competitor**\n📌 Pricing and packaging\n📌 Target customer segment\n📌 Key differentiators they claim\n📌 Customer reviews (G2, Trustpilot, App Store — read the 3-star reviews)\n📌 Marketing channels (SEMrush for SEO, Meta Ad Library for ads)\n📌 Team size and funding (LinkedIn, Crunchbase)\n\n**Step 3: Competitive Matrix**\nRate each competitor on the dimensions YOUR customers care most about:\n✅ Price, Quality, Speed, UX, Support, Features, Brand\n\n**Step 4: Find the Gap**\n- Where are ALL competitors weak? That's your opening.\n- What do customers consistently complain about across all solutions?\n\n**Step 5: Define Your Competitive Moat**\n- What will you build that they CANNOT easily copy in 12 months?\n\n💡 *The goal isn't to know your competitors better than anyone — it's to understand customers so well that you serve them in ways competitors haven't thought of.*`
            },
            'customer_persona': {
                keywords: ['customer persona','buyer persona','target customer','ideal customer profile','icp','who is my customer','customer profile','customer segment'],
                response: `👤 **Customer Persona (ICP) Guide**\n\n**For B2C — Build One Detailed Character:**\n📌 Name, Age, Location, Income\n📌 Job & Daily Routine\n📌 Primary Goals (what they're trying to achieve)\n📌 Frustrations (what currently blocks them)\n📌 Trusted Information Sources (where they learn)\n📌 Buying Triggers (what makes them finally buy)\n📌 Objections (why they hesitate)\n\n**For B2B — Build a Profile + Buying Committee:**\n📌 Company: industry, size, revenue, tech stack\n📌 Champion: who drives the internal decision\n📌 Decision Maker: who approves budget\n📌 Blocker: who could veto the deal\n\n**How to Validate Your Persona:**\n✅ Interview 10+ real target customers\n✅ Ask: "Walk me through the last time you dealt with [problem]"\n✅ Don't ask hypothetical questions — ask about real past behavior\n✅ Look for patterns across 10 interviews\n\n💡 *Most companies build personas from assumptions. The ones that win build them from real customer conversations.*`
            },
            'market_research': {
                keywords: ['market research','research the market','how to do market research','industry research','customer research','validate market'],
                response: `🔬 **Market Research Playbook**\n\n**Primary Research (First-Hand Data)**\n🎤 Customer Interviews (most valuable)\n  - Talk to 15–30 potential customers\n  - Ask about current behaviour, not hypothetical intentions\n  - "What do you currently use to solve this?" > "Would you buy this?"\n\n📋 Surveys\n  - Use for quantifying patterns you found in interviews\n  - Keep under 10 questions\n  - Offer incentive for completion\n\n🛒 Observation/Ethnography\n  - Watch customers in their natural environment\n  - Identify workarounds and hacks they use\n\n**Secondary Research (Existing Data)**\n📊 Industry reports: Statista, IBISWorld, Grand View Research\n🔍 SEO tools: Google Trends, Ahrefs, SEMrush (what are people searching?)\n📱 Social listening: Reddit, Twitter/X, Facebook Groups, Quora\n⭐ Review mining: Read competitor reviews on Trustpilot, G2, Amazon\n\n**Validate These 3 Things:**\n1. Do people actively suffer from this problem?\n2. Do they currently pay for an inferior solution?\n3. Are they willing to switch?\n\n💡 *If you can find 10 people who say "I would definitely pay for that today" — you have a market.*`
            },
            'business_pivot': {
                keywords: ['pivot strategy','business pivot','when to pivot','pivoting','should i pivot','pivot my business'],
                response: `🔄 **Business Pivot Strategy**\n\n**Signs You Need to Pivot:**\n🚩 Growth has stalled for 3+ months\n🚩 Customer churn > 10%/month\n🚩 Customers are using your product differently than intended\n🚩 You've run out of addressable customers in your ICP\n🚩 A competitor dominates your space with no differentiation possible\n\n**Types of Pivots:**\n1. **Customer Segment Pivot** — Same product, different customer\n2. **Problem Pivot** — Same customer, different problem to solve\n3. **Channel Pivot** — Same product, different distribution\n4. **Revenue Model Pivot** — Same product, different pricing model\n5. **Technology Pivot** — Same market, different tech approach\n\n**Famous Pivots:**\n- Slack: Was a gaming company → became a messaging tool\n- YouTube: Was a video dating site → became video sharing\n- Instagram: Was a check-in app → became photo sharing\n\n**How to Execute a Pivot:**\n1. Preserve what IS working (customers, tech, team)\n2. Kill what isn't (fast, clean, decisive)\n3. Test the pivot with 10 customers BEFORE full commitment\n4. Communicate clearly to team and investors\n\n💡 *Pivoting isn't failure — it's strategic learning. The best founders pivot early and often until they find the thing that really works.*`
            },

            // ── MARKETING ─────────────────────────────────────────────────
            'content_marketing': {
                keywords: ['content marketing','content strategy','content plan','blog strategy','how to do content marketing','content creation strategy'],
                response: `📝 **Content Marketing Strategy**\n\n**Step 1: Choose Your Core Format**\n- 📝 Blog/Articles (best for SEO, long-term traffic)\n- 🎥 Video (YouTube, TikTok — highest engagement)\n- 🎙️ Podcast (great for thought leadership)\n- 📱 Social content (awareness and community)\n- 📧 Email newsletter (direct relationship)\n\n**Step 2: Content Pillars (3–5 themes)**\n- Pick topics your ICP cares about\n- Map each piece to the buyer journey: Awareness → Consideration → Decision\n\n**Step 3: The 80/20 Content Rule**\n- 80% educational, helpful, entertaining\n- 20% product-related, calls to action\n\n**Step 4: Content Calendar**\nWeek 1: Pillar content (deep article/video)\nWeek 2–4: Supporting content (social posts, emails, shorts)\n\n**Step 5: Distribution (Content × Channels)**\n- One piece → 10 repurposed formats\n- Example: 1 YouTube video → Blog post → 5 LinkedIn posts → Email → Quote graphics\n\n**Metrics to track:**\n📊 Traffic, time-on-page, backlinks (SEO)\n📊 Subscribers, open rates (email)\n📊 Reach, saves, shares (social)\n\n💡 *The #1 content mistake: creating content no one is searching for. Use Google and SEO tools to find what people actually want to know.*`
            },
            'social_media_strategy': {
                keywords: ['social media strategy','social media plan','social media marketing','how to grow social media','social media content','instagram strategy','tiktok strategy','linkedin strategy'],
                response: `📱 **Social Media Strategy**\n\n**Platform Selection (Pick 1–2 to start):**\n- 🎨 Instagram: Visual products, lifestyle, B2C\n- 💼 LinkedIn: B2B, professional services, executives\n- 🎵 TikTok: Entertainment, youth, product discovery, B2C viral\n- 🐦 Twitter/X: Tech, news, thought leadership, fast feedback\n- 📌 Pinterest: Decor, fashion, food, DIY — high purchase intent\n- 📹 YouTube: Long-form education, reviews — evergreen content\n\n**Content Mix (per week):**\n- 40% Educational / value-add posts\n- 30% Behind-the-scenes / authentic storytelling\n- 20% User-generated content / testimonials\n- 10% Direct offers / CTAs\n\n**Posting Frequency:**\n- Instagram: 4–5 feed posts + 7 stories/week\n- LinkedIn: 3–4 posts/week\n- TikTok: 1–3 videos/day\n\n**Growth Tactics:**\n✅ Engage with others before posting (warm up algorithm)\n✅ Reply to EVERY comment in the first hour\n✅ Collaborate with non-competing accounts\n✅ Trending audio and hashtags (TikTok/IG Reels)\n✅ Consistent posting time (algorithms reward regularity)\n\n💡 *Quality > quantity. One post that resonates is worth 20 that don't.*`
            },
            'email_marketing': {
                keywords: ['email marketing','email campaign','email strategy','newsletter','email list','email list building','email automation'],
                response: `📧 **Email Marketing Playbook**\n\n**List Building First:**\n- Lead magnet (free guide, template, tool, discount)\n- Exit-intent popups on website\n- Post-purchase and post-signup automation\n- Content upgrades in blog posts\n\n**Email Types:**\n📨 **Welcome Sequence (5-7 emails)**\n- Email 1: Welcome + deliver lead magnet\n- Email 2: Your story + problem you solve\n- Email 3: Social proof + customer success story\n- Email 4: Education / most common question answered\n- Email 5: Soft pitch + call to action\n\n📰 **Newsletter** (weekly/biweekly)\n- 80% value, 20% business\n- Curated insights your audience can't find elsewhere\n\n🔄 **Behavioural Automation**\n- Abandoned cart → reminder + incentive\n- Browse abandonment → relevant content\n- Re-engagement → "We miss you" campaign\n- Post-purchase → onboarding + upsell\n\n**Metrics Benchmarks:**\n- Open rate: 20–30% is good\n- Click rate: 2–5% is good\n- Unsubscribe: < 0.5% is healthy\n\n💡 *Your email list is the only audience you OWN. Social media platforms can ban you tomorrow — your list is yours forever.*`
            },
            'seo_strategy': {
                keywords: ['seo strategy','search engine optimization','seo plan','how to rank on google','keyword strategy','seo for business','organic traffic','google ranking'],
                response: `🔍 **SEO Strategy Guide**\n\n**3 Pillars of SEO:**\n\n**1. Technical SEO (Foundation)**\n✅ Fast loading speed (< 3 seconds)\n✅ Mobile-friendly design\n✅ Secure HTTPS site\n✅ Clean URL structure\n✅ XML sitemap + robots.txt\n✅ No broken links\n\n**2. On-Page SEO (Content)**\n✅ Target ONE primary keyword per page\n✅ Keyword in title, H1, first 100 words, meta description\n✅ Internal links to related content\n✅ Long-form content (1500+ words for competitive keywords)\n✅ Use LSI keywords (semantic variations)\n✅ Optimise images (alt text, file names)\n\n**3. Off-Page SEO (Authority)**\n✅ Get backlinks from relevant sites\n✅ Digital PR and HARO responses\n✅ Guest posting on industry blogs\n✅ Local citations (Google Business Profile, directories)\n\n**Keyword Research Process:**\n1. Brain dump topics your customers search\n2. Use: Google Autocomplete, Ahrefs Free, Ubersuggest, Answer the Public\n3. Target keywords with search volume > 100/month and competition you can beat\n4. Create ONE great piece of content per keyword\n\n💡 *SEO takes 6–12 months to show results. Start today, not when you're ready to grow.*`
            },
            'brand_identity': {
                keywords: ['brand identity','branding','brand guidelines','brand strategy','how to brand my business','build a brand','brand book','visual identity','brand development'],
                response: `🎨 **Brand Identity Guide**\n\n**Brand Strategy First:**\n- Brand Positioning: What space do you own in the customer's mind?\n- Brand Personality: 3–5 adjectives (e.g., bold, friendly, sophisticated)\n- Brand Voice: How you speak (casual vs. formal, playful vs. serious)\n- Brand Promise: The one thing customers can always count on from you\n\n**Visual Identity Elements:**\n🎨 **Logo** — Primary, secondary, icon-only versions\n🎨 **Colour Palette** — Primary (1–2), secondary (2–3), neutral\n🎨 **Typography** — Heading font + body font\n🎨 **Photography Style** — Light/dark, candid/staged, colour grade\n🎨 **Iconography** — Consistent icon style\n🎨 **Brand Patterns** — Optional repeating design element\n\n**Colour Psychology:**\n🔵 Blue: Trust, professionalism (banks, tech)\n🔴 Red: Energy, urgency, passion (food, retail)\n🟢 Green: Growth, health, sustainability\n🟡 Yellow: Optimism, creativity, youth\n⚫ Black: Luxury, premium, sophistication\n🟣 Purple: Creativity, royalty, innovation\n\n**Brand Bible Includes:**\n✅ Logo usage rules\n✅ Colour codes (HEX, RGB, CMYK)\n✅ Typography specs\n✅ Approved imagery style\n✅ Voice and tone guidelines\n\n💡 *Consistency is the superpower of branding. Every touchpoint should feel unmistakably YOU.*`
            },
            'pr_strategy': {
                keywords: ['pr strategy','public relations','press release','media outreach','get press coverage','how to get featured','haro','media strategy'],
                response: `📢 **PR Strategy Guide**\n\n**Types of PR Coverage:**\n- Product launch stories\n- Founder story / mission-driven narrative\n- Data studies (original research gets the most links)\n- Trend commentary (be the expert journalists call)\n- Awards and industry recognition\n\n**How to Get Press Coverage:**\n\n**HARO (Help a Reporter Out):**\n- Sign up at helpareporter.com (free)\n- Respond FAST (within 1 hour) to relevant queries\n- Be specific, quotable, provide unique data\n\n**Pitch a Journalist:**\n- Research what they write about (Twitter, past articles)\n- Make it about THEIR reader, not your product\n- Subject line formula: "[Interesting Data/Story] + Why readers care now"\n- Keep pitch under 150 words\n- Include 3 interview questions you'd answer brilliantly\n\n**Press Release Structure:**\n1. Headline (newsworthy, specific)\n2. Dateline + first paragraph (who, what, where, when, why)\n3. Supporting details and quotes\n4. About the company (boilerplate)\n5. Contact information\n\n💡 *Don't pitch your launch. Pitch a story your journalist's audience would actually want to read. The product is a detail inside the story.*`
            },
            'influencer_marketing': {
                keywords: ['influencer marketing','influencer strategy','influencer campaign','work with influencers','how to find influencers','influencer outreach'],
                response: `🌟 **Influencer Marketing Strategy**\n\n**Influencer Tiers:**\n👤 Nano (1K–10K followers): Highest engagement, niche authority, most affordable\n👥 Micro (10K–100K): Great engagement, specific niches, cost-effective\n🌟 Macro (100K–1M): Broader reach, established trust, higher cost\n💎 Mega (1M+): Mass awareness, expensive, lower engagement rate\n\n**Finding the Right Influencers:**\n- Tools: Modash, Heepsy, Creator.co, TikTok Creator Marketplace, YouTube BrandConnect\n- Manual: Search hashtags in your niche, find who your target customers follow\n- Evaluate: Engagement rate (> 3% for Instagram), audience demographics, brand fit\n\n**Outreach Template:**\n"Hi [Name], I've been following your content on [topic] — especially [specific post]. I run [Company] which [value proposition]. I'd love to explore a collaboration that would genuinely benefit your audience because [reason]. Would a [free product / paid partnership / commission structure] work for you?"\n\n**Campaign Types:**\n- Product review / unboxing\n- Tutorial or "how I use it"\n- Giveaway or discount code\n- Ambassador programme (ongoing)\n- Co-created product\n\n💡 *Micro-influencers with 10K niche followers often outperform celebrities with 1M general followers. Relevance beats reach.*`
            },
            'growth_hacking': {
                keywords: ['growth hacking','growth strategy','growth hack','viral marketing','growth marketing','rapid growth','user acquisition strategy'],
                response: `⚡ **Growth Hacking Strategies**\n\n**Viral Loops:**\n- Product-embedded sharing (Dropbox: "Share, get more storage")\n- Social proof mechanics (Clubhouse invite-only exclusivity)\n- UGC incentivisation (make results shareable)\n\n**Top 10 Growth Hacks by Category:**\n\n🔄 **Referral**\n1. Double-sided referral: Reward both sides\n2. Milestone referral: "Invite 3 friends to unlock Premium"\n\n📢 **Visibility**\n3. PR stunts — do something newsworthy\n4. Product Hunt launch — get votes from your community\n\n🤝 **Partnerships**\n5. Cross-promotion with complementary products\n6. Marketplace listing (where your customers already are)\n\n💬 **Community**\n7. Reddit / Quora — answer questions with genuine expertise\n8. Build a niche community (Facebook Group, Discord, Slack)\n\n🔍 **SEO/Content**\n9. Create free tools that rank (calculators, generators)\n10. Programmatic SEO: 1 template × 1000 page variants\n\n**The AARRR Framework:**\n- Acquisition → Activation → Retention → Referral → Revenue\n- Find your weakest link — that's your #1 growth lever\n\n💡 *Growth hacking is not a shortcut — it's systematic testing. Run 5–10 experiments per week and double down on what works.*`
            },
            'referral_program': {
                keywords: ['referral program','referral marketing','word of mouth','refer a friend','referral system','affiliate program'],
                response: `🤝 **Referral Program Design**\n\n**Why Referrals Win:**\n- Referred customers have 2× higher lifetime value\n- 37% higher retention rate\n- Cost to acquire is 5× lower than paid ads\n- Trust transfer from friend = highest conversion\n\n**Program Structures:**\n💰 **Cash reward**: "Give $20, Get $20" (PayPal, Uber)\n🎁 **Product reward**: "Get a free month" (Dropbox, Spotify)\n🏆 **Tiered rewards**: More referrals = bigger rewards\n👑 **Status/exclusivity**: Early access, VIP tier\n\n**Implementation Steps:**\n1. Set reward that costs less than your CAC\n2. Make sharing frictionless (pre-filled message, one-click share)\n3. Track with unique referral links or codes\n4. Communicate results to referrers (show impact)\n5. Send reminder emails to those who joined but haven't referred\n\n**When to Launch:**\n✅ Wait until NPS > 50 (customers love you first)\n✅ Have a smooth product experience (don't refer people to a broken product)\n\n💡 *Your referral program is only as good as your product. Fix retention first, then activate referrals.*`
            },
            'advertising_campaign': {
                keywords: ['advertising campaign','ad campaign','paid advertising','facebook ads','google ads','paid ads','run ads','pay per click','ppc'],
                response: `💰 **Paid Advertising Playbook**\n\n**Before You Spend Anything:**\n✅ Confirmed organic message works (some organic traction)\n✅ Landing page converts (at least 2–5%)\n✅ Customer lifetime value (LTV) > 3× cost per acquisition\n✅ Tracking pixel installed, conversion events firing\n\n**Platform Selection:**\n🎯 **Google Search**: High intent, people actively searching\n📱 **Meta (FB/IG)**: Broad interest targeting, visual products\n🎵 **TikTok**: Youth audience, product discovery, UGC style\n💼 **LinkedIn**: B2B, professional targeting, expensive but precise\n🛍️ **Pinterest**: Product discovery, female-skewing, high purchase intent\n\n**Campaign Hierarchy (Meta/Google):**\nCampaign (Goal: Conversions)\n└─ Ad Set (Audience + Budget)\n   └─ Ads (Creative variants — test 3–5)\n\n**Testing Process:**\n1. Week 1–2: Test 3–5 audiences, same creative\n2. Week 3–4: Kill losers, scale winners + test new creatives\n3. Month 2+: Scale budget 20% every 3–5 days on winners\n\n**Key Metrics:**\n- ROAS (Revenue ÷ Ad Spend): Target 3–5×\n- CPM (Cost per 1000 impressions): < $15 on Meta\n- CTR (Click-through rate): > 1% is healthy\n- CPA (Cost per acquisition): Must be < LTV ÷ 3\n\n💡 *Most failed ad campaigns aren't ad problems — they're offer problems. Fix the offer before fixing the ads.*`
            },
            'community_building': {
                keywords: ['community building','build a community','community strategy','online community','discord community','facebook group','customer community'],
                response: `🏘️ **Community Building Strategy**\n\n**Why Build a Community:**\n- 10× cheaper to retain than acquire\n- Community members spend 26% more\n- Built-in product feedback loop\n- Organic word of mouth\n\n**Platform Options:**\n💬 Discord: Gaming, tech, web3, young audiences\n👥 Facebook Groups: Broad audiences, older demographics\n📌 Circle.so / Mighty Networks: Paid or private communities\n💼 Slack: B2B, professional, small groups\n💻 Reddit: Anonymous, interest-based, huge reach\n\n**The 6 Stages of Community:**\n1. **Seeding** — Invite 10–20 founding members personally\n2. **Onboarding** — Clear rules, introduction ritual, first win\n3. **Activation** — Weekly events, prompts, challenges\n4. **Growth** — Referrals from members, content marketing\n5. **Retention** — Recognition, roles, exclusive benefits\n6. **Advocacy** — Members become ambassadors\n\n**Content Cadence:**\n- Daily: Welcome new members, share news\n- Weekly: Discussion prompt or challenge\n- Monthly: Event (AMA, live call, workshop)\n\n💡 *The best communities form around identity, not products. "We are people who [shared belief/aspiration]" — not "we use [product]".*`
            },

            // ── FINANCE ───────────────────────────────────────────────────
            'financial_projections': {
                keywords: ['financial projections','revenue projections','financial forecast','revenue forecast','forecast revenue','3 year projection','5 year projection'],
                response: `📊 **Financial Projections Guide**\n\n**Bottom-Up Projection (Most Credible):**\n1. Start with how many customers you can REALISTICALLY get\n2. × Average Revenue Per Customer (ARPC)\n3. × Retention rate to model recurring revenue\n4. - Cost of Goods Sold (COGS)\n= Gross Profit\n5. - Operating expenses (salaries, rent, marketing, tools)\n= EBITDA\n\n**Assumptions to Document:**\n📌 Monthly customer growth rate (be conservative: 10–20%)\n📌 Average contract value / order value\n📌 Churn rate (how many leave per month)\n📌 Gross margin (revenue minus direct costs)\n📌 Hiring plan (biggest cost driver)\n\n**Three Scenarios:**\n📉 Conservative (Base): Things go as planned\n📈 Optimistic (Bull): Best case\n💀 Pessimistic (Bear): Things go slower\n\n**Format:**\n12-month month-by-month, then quarterly for years 2–3\n\n**Investor Red Flags to Avoid:**\n❌ Hockey stick curves with no explanation\n❌ Costs that never increase as you scale\n❌ 100% gross margins (physically impossible)\n❌ "1% of a $10B market" = $100M by year 2\n\n💡 *Investors expect you to miss your projections. What matters is your thought process — can you explain every assumption?*`
            },
            'cash_flow': {
                keywords: ['cash flow','cash flow statement','cash flow management','manage cash flow','cash flow forecast','cash flow problems','running out of cash'],
                response: `💵 **Cash Flow Management**\n\n**The Most Important Rule:**\n*Profit ≠ Cash.* You can be profitable on paper and bankrupt in reality (if your cash is locked in unpaid invoices or inventory).\n\n**Cash Flow Statement Structure:**\n1. 📥 **Operating Activities**: Cash from sales minus cash paid for expenses\n2. 🏗️ **Investing Activities**: Cash for equipment, acquisitions\n3. 💰 **Financing Activities**: Cash from investors/loans minus repayments\n\n**13-Week Rolling Cash Flow:**\nEvery week, track:\n- Opening cash balance\n- + Expected cash inflows (receivables due, new sales)\n- - Expected cash outflows (payroll, rent, suppliers)\n= Closing cash balance\n\nIf you see a negative week coming → act NOW, not when it happens.\n\n**Cash Flow Improvement Tactics:**\n📈 Increase inflows: Invoice faster, offer early payment discounts, collect deposits upfront\n📉 Reduce outflows: Negotiate net-60 with suppliers, delay non-critical spending\n🔄 Smooth timing: Align payment due dates to follow your payroll cycle\n\n**Warning Signs:**\n🚩 Days Sales Outstanding > 45 days\n🚩 Cash balance < 3 months of expenses\n🚩 Consistently using credit to cover payroll\n\n💡 *Build a 3-month cash reserve before you feel you need it. You will need it.*`
            },
            'budget_planning': {
                keywords: ['budget planning','create a budget','annual budget','departmental budget','how to budget','business budget','operational budget'],
                response: `📋 **Business Budget Planning**\n\n**Zero-Based Budgeting Process:**\nStart from zero each period — justify every dollar, don't just copy last year.\n\n**Revenue Budget:**\n- Products/services broken down by line\n- Conservative, base, and optimistic scenarios\n\n**Expense Budget Categories:**\n💼 Personnel (usually 50–70% of total costs)\n🏢 Facilities (rent, utilities, maintenance)\n⚙️ Technology (software, hardware, hosting)\n📣 Marketing & Sales\n📦 COGS / Direct costs\n🛡️ Insurance, legal, accounting\n🎓 Training and development\n🔧 Miscellaneous / contingency (10% buffer)\n\n**Budget Calendar:**\n- Month 1–2 of Q4: Department heads submit requests\n- Month 3 of Q4: Finance consolidates and negotiates\n- January: Approved budget communicated\n- Monthly: Actual vs. budget variance review\n\n**Key Ratios to Target:**\n- Gross margin: 40–80% (depends on industry)\n- Operating expense ratio: < 60% of revenue (profitable)\n- Marketing spend: 10–20% of revenue (growth phase)\n\n💡 *The best budgets have a 10% contingency line. Unexpected costs are certain — their amount is what's uncertain.*`
            },
            'investor_pitch': {
                keywords: ['investor pitch','pitch to investors','investor presentation','fundraising pitch','pitch deck','how to pitch investors','raise funding','venture capital pitch','angel investor pitch'],
                response: `💡 **Investor Pitch Guide**\n\n**The 10-Slide Pitch Deck (Guy Kawasaki Formula):**\n1. 🎯 **Title** — Company name, tagline, your name\n2. 💔 **The Problem** — Crisp, relatable, backed by data\n3. 🚀 **Your Solution** — The "aha moment" slide\n4. 📊 **Market Size** — TAM/SAM/SOM with sources\n5. 🏆 **Product** — Demo or screenshots, key features\n6. 💰 **Business Model** — How you make money\n7. 📈 **Traction** — Revenue, users, growth rate, key wins\n8. 👥 **Team** — Why YOU will win (unfair advantages)\n9. 🗺️ **Go-to-Market** — How you'll reach customers at scale\n10. 💵 **The Ask** — Amount, use of funds, expected milestones\n\n**What Investors ACTUALLY Evaluate:**\n- Team (50% of decision for early stage)\n- Market size (big enough to justify venture returns?)\n- Traction (proof the market wants this)\n- Competition (why can't incumbents copy this?)\n- Unit economics (does it get better at scale?)\n\n**Pitch Delivery Tips:**\n✅ Open with a story or hook (not history)\n✅ Spend most time on problem + team + traction\n✅ Anticipate "What about X competitor?"\n✅ Have your data room ready (financials, legal, metrics)\n✅ End with a clear ask and urgency\n\n💡 *Investors invest in lines, not dots. Show them the trajectory, not just where you are today.*`
            },
            'break_even': {
                keywords: ['break even','break-even analysis','break even point','when will i be profitable','break even calculation','how long to profit'],
                response: `⚖️ **Break-Even Analysis**\n\n**Formula:**\nBreak-Even Point = Fixed Costs ÷ (Price - Variable Cost Per Unit)\n\n**Example:**\n- Fixed costs: $10,000/month (rent, salaries, software)\n- Price per unit: $100\n- Variable cost per unit: $40 (materials, fulfillment)\n- Contribution Margin: $100 - $40 = $60\n- Break-Even: $10,000 ÷ $60 = **167 units/month**\n\n**Key Terms:**\n📌 **Fixed costs**: Same regardless of sales (rent, salaries, subscriptions)\n📌 **Variable costs**: Change with output (materials, commissions, shipping)\n📌 **Contribution margin**: Revenue - Variable costs (per unit)\n📌 **Contribution margin %**: CM ÷ Price × 100\n\n**Break-Even in Revenue (not units):**\nBreak-Even Revenue = Fixed Costs ÷ Contribution Margin %\n\n**Improve Your Break-Even Point:**\n📈 Raise prices (most impactful)\n📉 Reduce fixed costs (less flexible)\n📉 Reduce variable costs per unit (supplier negotiation, process efficiency)\n📈 Increase volume (more customers)\n\n💡 *Always calculate your break-even BEFORE launching. If it takes selling 10,000 units to break even and you've only ever sold 50 — that's a red flag.*`
            },
            'pricing_strategy': {
                keywords: ['pricing strategy','how to price','pricing model','set prices','price my product','price my service','pricing advice','how much to charge'],
                response: `💰 **Pricing Strategy Guide**\n\n**5 Pricing Models:**\n\n1. **Cost-Plus**: Cost × (1 + margin%). Simple but ignores value.\n2. **Competitor-Based**: Price near or against competitors. Reactive, race-to-bottom risk.\n3. **Value-Based**: Price = What customers believe it's worth. Best model for high margins.\n4. **Penetration**: Low price to capture market share, raise later.\n5. **Premium/Luxury**: High price signals quality (brands like Apple, Porsche)\n\n**Value-Based Pricing Process:**\n1. Identify the customer's alternative (what they use now)\n2. Quantify what your solution is worth (time saved, revenue gained, cost reduced)\n3. Price at 20–30% of the value you deliver\n\n**SaaS Pricing Tiers (Classic):**\n- Starter: $29–$49/mo (individuals, small teams)\n- Pro: $99–$199/mo (growing teams)\n- Enterprise: Custom (large orgs, custom features)\n\n**Psychological Pricing:**\n✅ $97 feels much cheaper than $100\n✅ Annual discount (20–30%) improves cash flow and retention\n✅ Decoy pricing: 3 tiers where the middle option looks best\n✅ Anchoring: Show the expensive option first\n\n💡 *Underpricing is the most common startup mistake. Raise prices until 20% of prospects say it's too expensive. That's the optimal point.*`
            },
            'funding_strategy': {
                keywords: ['funding strategy','how to raise money','how to get funding','seed funding','venture capital','angel investor','bootstrapping','raise capital'],
                response: `💵 **Funding Strategy Guide**\n\n**Funding Options by Stage:**\n\n🥾 **Bootstrapping** (Self-funded)\n- Full control, slow growth, best for profitable businesses\n- Best for: Service businesses, lifestyle businesses, B2B with quick revenue\n\n👼 **Angel Investors** ($25K–$500K)\n- Individuals investing their own money\n- Pre-seed and seed stage\n- Find through: AngelList, LinkedIn, founder networks, startup events\n\n🏦 **Venture Capital** ($500K–$50M+)\n- Institutional funds in exchange for equity\n- Expects 10× return in 5–7 years\n- Best for: High-growth, scalable tech businesses\n- Tiers: Pre-seed → Seed → Series A → B → C...\n\n🏛️ **Grants + Government Programs**\n- Non-dilutive (no equity given up)\n- SBIR/STTR (US), Innovate UK, EU Horizon, local programs\n\n🤝 **Revenue-Based Financing**\n- Repay as % of monthly revenue\n- No equity, works for recurring revenue businesses\n\n💳 **Business Loans / Line of Credit**\n- Traditional bank, SBA loans, fintech lenders\n- Best for established businesses with cash flow\n\n**Fundraising Timeline:**\nNetwork → Build pipeline (50+ investor contacts) → Pitch → Due diligence → Term sheet → Closing: 3–6 months typically\n\n💡 *Raise money when you DON'T need it. Investors can smell desperation and it weakens your negotiating position dramatically.*`
            },
            'pl_statement': {
                keywords: ['profit and loss','p&l','income statement','profit loss statement','financial statement','how to read pl','revenue expenses profit'],
                response: `📊 **Profit & Loss Statement Guide**\n\n**P&L Structure:**\n\n📥 **Revenue / Sales**\n- All income from products, services, subscriptions\n\n➖ **Cost of Goods Sold (COGS)**\n- Direct costs to produce/deliver what you sell\n- Materials, fulfillment, direct labour\n\n= **Gross Profit** (Revenue - COGS)\n- Gross Margin % = Gross Profit ÷ Revenue\n- Target: 40–80%+ depending on industry\n\n➖ **Operating Expenses (OPEX)**\n- Salaries (non-production), rent, marketing, software, insurance, R&D\n\n= **Operating Profit / EBITDA**\n- Earnings before interest, tax, depreciation, amortisation\n\n➖ **Interest & Depreciation**\n= **Pre-tax Profit**\n➖ **Taxes**\n= **Net Profit**\n\n**Industry Benchmarks:**\n- SaaS: 60–80% gross margin\n- E-commerce: 20–40% gross margin\n- Restaurant: 3–9% net margin\n- Consulting: 20–40% net margin\n\n**Key Analysis Questions:**\n- Is gross margin improving as you scale?\n- Are any expense categories growing faster than revenue?\n- What's the trend over the last 6 months?\n\n💡 *Review your P&L monthly, not quarterly. Problems found in month 2 are fixed in month 3. Problems found in Q4 review are already a year old.*`
            },
            'roi_analysis': {
                keywords: ['roi analysis','return on investment','is this a good investment','investment analysis','roi calculation','calculate roi'],
                response: `📈 **ROI Analysis Guide**\n\n**ROI Formula:**\nROI = (Net Profit ÷ Investment Cost) × 100\n\n**Example:**\n- Investment: $10,000 marketing campaign\n- Revenue generated: $35,000\n- Direct costs (COGS): $15,000\n- Net profit from campaign: $20,000\n- ROI = ($20,000 ÷ $10,000) × 100 = **200%**\n\n**Payback Period:**\nPayback Period = Investment ÷ Annual Net Profit\n$10,000 investment ÷ $5,000/year profit = 2-year payback\n\n**NPV (Net Present Value) for Multi-Year:**\nUsed when investment pays off over years — accounts for the time value of money.\n\n**Marketing-Specific ROI:**\n- Marketing ROI: Revenue attributable to campaign ÷ Campaign cost\n- Target: 5:1 ratio ($5 revenue per $1 spent)\n\n**When to Say Yes to an Investment:**\n✅ ROI > your cost of capital (usually 15–20%)\n✅ Payback period < 2 years for most business decisions\n✅ Risk-adjusted returns still positive\n✅ Strategic value beyond the numbers (market position, IP)\n\n💡 *Don't just calculate ROI — calculate the cost of NOT making the investment. Missed opportunities have a price too.*`
            },

            // ── SALES ─────────────────────────────────────────────────────
            'sales_strategy': {
                keywords: ['sales strategy','sales plan','sales approach','how to sell','increase sales','improve sales','sales process'],
                response: `💼 **Sales Strategy Framework**\n\n**Step 1: Know Your Buyer**\n- Who makes the decision? (B2B: Economic buyer, champion, influencer)\n- What's their buying process? (How do they evaluate vendors?)\n- What are their top 3 priorities THIS quarter?\n\n**Step 2: Define Your Sales Motion**\n🏃 **Transactional**: Low touch, high volume, online self-serve\n💬 **Inside Sales**: Phone/video demos, $500–$10K deals\n🤝 **Field/Enterprise**: In-person, complex deals, $50K+\n\n**Step 3: Build a Repeatable Sales Process**\n1. Prospecting → 2. Qualification (BANT/MEDDIC) → 3. Discovery → 4. Demo/Proposal → 5. Objection Handling → 6. Close → 7. Handoff to CS\n\n**BANT Qualification:**\n- **B**udget: Do they have money to spend?\n- **A**uthority: Are they the decision maker?\n- **N**eed: Do they have the problem you solve?\n- **T**imeline: Are they buying now or "sometime"?\n\n**Step 4: Set Targets and Track**\n- Quota = Annual target ÷ team size\n- Track: Leads → Opportunities → Proposals → Closes → Win Rate\n- Review pipeline weekly, adjust monthly\n\n💡 *Sales is not persuasion — it's qualification. Spend 80% of your time with people who can and will buy. Disqualify fast.*`
            },
            'sales_pitch': {
                keywords: ['sales pitch','how to pitch','pitch script','sales script','how to sell my product','pitch my service'],
                response: `🎯 **Sales Pitch Structure**\n\n**The 7-Part Pitch (works for any format — call, demo, meeting):**\n\n1. 🤝 **Establish Rapport** (60 seconds)\n   - Personalised opener based on their company/role\n   - "I noticed you recently [relevant thing] — how is that going?"\n\n2. 📌 **Set the Agenda** (30 seconds)\n   - "I'd like to spend 20 minutes to understand your situation, share how we help, and see if there's a fit. Sound good?"\n\n3. ❓ **Discovery** (50% of meeting time)\n   - "Walk me through how you currently handle [problem area]"\n   - "What's the biggest pain with how things work today?"\n   - "What would it mean for the business if you solved this?"\n\n4. 💡 **The Pitch** (based on THEIR answers)\n   - "Based on what you told me, here's exactly how we address that…"\n   - Mirror their language back to them\n\n5. ✅ **Handle Objections**\n   - Price: "What ROI would make this a no-brainer?"\n   - Timing: "What would need to change to make this a priority?"\n   - Competitor: "What would need to be true for us to win your business?"\n\n6. 🎯 **Close**\n   - Assumptive: "Let's get you set up — which team members should be on the kickoff?"\n   - Summary: "So you're solving X and Y — are you ready to move forward?"\n\n7. 📋 **Next Steps**\n   - Always leave with a concrete agreed next step and date\n\n💡 *Listen 70%, talk 30%. The best salespeople are the best listeners.*`
            },
            'lead_generation': {
                keywords: ['lead generation','how to get leads','find clients','prospecting','generate leads','find customers','lead gen'],
                response: `🎯 **Lead Generation Playbook**\n\n**Inbound Lead Generation:**\n📝 Content (blog, YouTube, podcast) → SEO → Free tools or calculators\n📧 Lead magnets (ebooks, templates, checklists, free courses)\n🌟 Social proof (reviews, case studies, press mentions)\n📱 Social media (organic reach → profile traffic → landing page)\n\n**Outbound Lead Generation:**\n📞 Cold calling (still works in B2B — call within 5 min of demo request)\n✉️ Cold email (personalised, problem-led, 3 email sequence)\n💼 LinkedIn outreach (connection → value add → pitch)\n🤝 Networking events and conferences\n\n**Cold Email Formula:**\n- Line 1: Hyper-personalised hook (mention their company/role specifically)\n- Line 2: Problem you solve (relevant to THEM)\n- Line 3: One specific result you've achieved for similar companies\n- Line 4: Low-friction CTA ("Worth a 15-minute call?")\n- Total: < 100 words\n\n**Lead Scoring:**\nGrade leads A–D by:\n- Fit (do they match ICP?)\n- Intent (are they actively looking?)\n- Urgency (timeline to buy?)\n\n💡 *The best lead generation system is one customers forget is marketing — it just feels like you genuinely helping them.*`
            },
            'negotiation': {
                keywords: ['negotiation','negotiation tactics','negotiation strategy','how to negotiate','negotiate a deal','negotiation skills'],
                response: `🤝 **Negotiation Tactics**\n\n**Before You Start:**\n✅ Know your BATNA (Best Alternative to Negotiated Agreement)\n✅ Know their likely BATNA\n✅ Set your walk-away point (and stick to it)\n✅ Anchor first if you have a strong position\n\n**Key Tactics:**\n\n🔇 **The Silence**: After making your offer, go quiet. The first person to speak loses.\n\n⬇️ **The Flinch**: "That's much higher than expected…" — makes them doubt their price.\n\n🔄 **The Trade**: Never give something without getting something. "I can do X if you can do Y."\n\n🐟 **The Red Herring**: Inflate the value of a concession you're willing to make.\n\n🦁 **The Good Cop/Bad Cop**: "I want to give you this, but my boss won't approve above X."\n\n📉 **Anchoring**: First number mentioned acts as reference point. Start high if selling, low if buying.\n\n**Closing the Negotiation:**\n- Summarise agreed points\n- Get everything in writing immediately\n- Leave the other party feeling like they won too\n\n**Common Mistakes:**\n❌ Accepting the first offer\n❌ Revealing your budget\n❌ Negotiating against yourself (conceding before they ask)\n❌ Making it personal\n\n💡 *"No" is the start of negotiation, not the end. "No" usually means "not at this price/time/terms".*`
            },
            'closing_techniques': {
                keywords: ['closing techniques','close a sale','how to close deals','closing a deal','sales closing','close prospects'],
                response: `🔒 **Sales Closing Techniques**\n\n**The Golden Rule:**\nAlways be closing — not with pressure, but with progression. Every interaction should advance to the next step.\n\n**Top Closing Techniques:**\n\n1. **Assumptive Close**\n   "When would you like to start?" (assume yes)\n\n2. **Summary Close**\n   "So you need X, Y, Z — and we can deliver all three. Ready to move forward?"\n\n3. **Alternative Close**\n   "Would you prefer to start with monthly or annual billing?"\n\n4. **Urgency Close (genuine)**\n   "We have one onboarding slot in November — want to secure it?"\n\n5. **Puppy Dog Close**\n   "Try it for 14 days — no credit card required" (let them fall in love)\n\n6. **Ben Franklin Close**\n   Draw a T-chart: reasons to move forward vs. hesitations\n   (Almost always reveals objections you haven't addressed)\n\n7. **The Question Close**\n   "What's holding you back from moving forward today?"\n   (Surfaces the real objection)\n\n**Handling "I need to think about it":**\n"Of course — what specifically would you like to think through? I want to make sure you have everything you need to make the right decision."\n\n💡 *Most sales are lost not because prospects said no — but because salespeople never asked for the business.*`
            },
            'customer_retention': {
                keywords: ['customer retention','keep customers','reduce churn','loyalty strategy','retain customers','customer loyalty','churn reduction'],
                response: `🔄 **Customer Retention Strategy**\n\n**The Economics:**\n- Acquiring a new customer costs 5× more than keeping one\n- A 5% increase in retention → 25–95% increase in profitability\n- Long-term customers spend 67% more than new ones\n\n**Retention Drivers:**\n1. 🏆 **Onboarding Excellence** — Help customers get their first win within 48 hours\n2. 🎯 **Success Milestones** — Define what "success" looks like for each customer\n3. 📞 **Proactive Outreach** — Check in before they have problems, not after\n4. 🔔 **Engagement Monitoring** — Alert when usage drops (before churn)\n5. 🎁 **Loyalty Rewards** — Surprise and delight long-term customers\n\n**Warning Signs of Churn:**\n🚩 Login frequency drops\n🚩 Support ticket escalations\n🚩 Usage of only basic features\n🚩 Ignored emails\n🚩 Decision maker left the company\n\n**Win-Back Campaigns (for churned customers):**\n1. Exit interview (learn WHY they left)\n2. Wait 30–60 days\n3. Reach out with: "We've fixed X" or "New feature solves Y"\n4. Offer 1-month free or significant discount to return\n\n💡 *Retention is a product problem, not a support problem. If customers leave, it's because the product didn't deliver on its promise.*`
            },

            // ── HR ────────────────────────────────────────────────────────
            'hiring_strategy': {
                keywords: ['hiring strategy','recruitment strategy','how to hire','attract talent','hire employees','find good employees','talent acquisition'],
                response: `👥 **Hiring Strategy**\n\n**Before You Post a Job:**\n✅ Write a clear Role Scorecard (outcomes expected in 30/60/90 days)\n✅ Define the 3–5 non-negotiable skills/traits\n✅ Know your employer value proposition (why work here?)\n✅ Budget for salary, benefits, and recruitment\n\n**Sourcing Channels:**\n🔍 LinkedIn (active search + InMail)\n🌐 Your network (referrals convert 5× better)\n💼 Job boards: Indeed, LinkedIn Jobs, AngelList, Wellfound (startups)\n🎓 University recruiting (entry-level)\n🤝 Recruitment agencies (expensive but fast for senior roles)\n\n**Hiring Process Design:**\n1. Application review (30 min)\n2. Async video screen or take-home task (qualify fast)\n3. 30-min phone screen with hiring manager\n4. 60-min structured interview (panel or sequential)\n5. Reference checks (2–3 professional references)\n6. Offer\n\n**Structured Interview:**\nAsk every candidate the SAME questions. Grade on the same rubric. Removes bias, improves quality.\n\n**Red Flags in Interviews:**\n🚩 Can't give specific examples ("we" instead of "I")\n🚩 Never admits mistakes or failures\n🚩 Badmouths previous employer\n🚩 Can't explain their impact in numbers\n\n💡 *Hire slowly, fire quickly. One wrong hire costs 3× their salary in wasted time, missed opportunity, and team morale.*`
            },
            'onboarding_plan': {
                keywords: ['onboarding plan','employee onboarding','new employee onboarding','onboard new hire','first day employee','new hire process'],
                response: `🎉 **Employee Onboarding Plan**\n\n**Why It Matters:**\n- 69% of employees stay 3+ years if they had great onboarding\n- Poor onboarding doubles the chance they quit in year 1\n\n**The 30/60/90-Day Plan:**\n\n**Week 1: Orientation & Culture**\n✅ Computer, tools, and access set up BEFORE day 1\n✅ Welcome lunch or video call with team\n✅ Tour of systems and processes\n✅ Meet key stakeholders\n✅ Company culture, values, history deep dive\n\n**Month 1 (First 30 days): Learning**\n✅ Shadow different team members\n✅ Learn the product deeply (be a customer)\n✅ Complete required training\n✅ First 1:1 with manager (weekly cadence starts)\n✅ First small project to build confidence\n\n**Month 2 (Days 31–60): Contributing**\n✅ Take on real responsibilities\n✅ Propose one improvement or idea\n✅ Mid-point check-in (formal feedback)\n\n**Month 3 (Days 61–90): Owning**\n✅ Fully independent in their role\n✅ Own one project end-to-end\n✅ 90-day review with manager\n\n💡 *Great onboarding doesn't end on day 1 — it ends when the new hire says "I've got this."*`
            },
            'performance_review': {
                keywords: ['performance review','performance evaluation','how to review employees','employee review','performance management','appraisal'],
                response: `📊 **Performance Review System**\n\n**Review Cadence:**\n- Monthly: Informal 1:1 check-in (pulse)\n- Quarterly: Structured review against goals\n- Annually: Full performance and compensation review\n\n**Review Structure:**\n\n1. **Achievements** — What did they accomplish vs. goals set?\n2. **Strengths** — What are they excellent at?\n3. **Development Areas** — Where should they grow?\n4. **Goals for Next Period** — SMART goals agreed together\n5. **Career Development** — Where do they want to go?\n6. **Manager Support** — What can YOU do better for them?\n\n**Rating Systems:**\n❌ Avoid arbitrary 1–5 scales without criteria\n✅ Use: Exceeds Expectations / Meets / Needs Improvement — with specific examples\n\n**OKR Framework (popular in startups):**\n- **Objective**: Qualitative goal ("Become the go-to brand for X")\n- **Key Results**: 3 measurable outcomes ("Achieve 1,000 signups by Q4")\n\n**Effective Feedback Formula (SBI):**\nSituation → Behaviour → Impact\n"In last week's client meeting (S), you interrupted the client three times (B), which meant we missed understanding their core concern (I)."\n\n💡 *Regular, honest feedback is a gift. Annual reviews should never surprise anyone — if something is a problem, address it in the moment.*`
            },
            'training_program': {
                keywords: ['training program','employee training','staff development','learning and development','l&d','how to train employees','workforce development'],
                response: `🎓 **Employee Training Program**\n\n**Types of Training:**\n📌 **Onboarding Training**: Systems, processes, culture (first 90 days)\n📌 **Skills Training**: Job-specific technical skills\n📌 **Leadership Development**: For high-potential managers\n📌 **Compliance Training**: Legal, safety, data protection\n📌 **Cross-Training**: Team members learn multiple roles\n\n**Training Methods:**\n🖥️ E-learning (Coursera, LinkedIn Learning, internal LMS)\n👥 Mentorship (pair junior with senior)\n📚 Books + book clubs\n🎯 On-the-job projects (most effective)\n🎤 External speakers or workshops\n🔄 Job rotation\n\n**70-20-10 Model:**\n- 70% Learning on the job (real challenges)\n- 20% Learning from others (coaching, mentoring)\n- 10% Formal education (courses, workshops)\n\n**Building an Internal LMS:**\nUse tools like: Notion, TalentLMS, Teachable, or Loom for recorded training.\n\n**Measuring Training Effectiveness:**\n1. Reaction (did they like it?)\n2. Learning (did they gain knowledge?)\n3. Behaviour (are they applying it?)\n4. Results (did it impact performance?)\n\n💡 *The only thing worse than training your employees and having them leave is not training them and having them stay.*`
            },
            'conflict_resolution': {
                keywords: ['conflict resolution','resolve workplace conflict','handle employee conflict','team conflict','workplace dispute','manage conflict'],
                response: `🤝 **Workplace Conflict Resolution**\n\n**4-Step Process:**\n\n**1. Act Fast (within 24–48 hours)**\n- Conflict grows with delay\n- Address privately, not publicly\n\n**2. Hear All Sides (Separately First)**\n- Listen without judgment\n- Don't problem-solve in individual meetings\n- Use: "Help me understand what happened from your perspective"\n\n**3. Bring Parties Together**\nSet ground rules: no interruptions, respectful language, focus on behaviour not character\nProcess:\n- Each person states their experience\n- Each person states what they need going forward\n- Identify common ground\n- Agree on concrete changes\n\n**4. Follow Up**\n- Check in after 1 week and 1 month\n- Document the resolution\n- Monitor for recurring patterns\n\n**Common Conflict Causes:**\n🔴 Unclear roles and responsibilities → Fix: RACI matrix\n🔴 Poor communication → Fix: Regular team meetings, shared tools\n🔴 Unequal recognition → Fix: Transparent criteria for recognition\n🔴 Value or style clashes → Fix: Team charter, culture alignment\n\n💡 *Unresolved conflict is like a slow leak. It seems manageable until one day the whole system fails. Tackle it early.*`
            },
            'remote_work_policy': {
                keywords: ['remote work policy','work from home policy','remote team management','remote work guidelines','hybrid work policy'],
                response: `🏠 **Remote Work Policy Design**\n\n**Core Policy Elements:**\n\n**1. Eligibility & Setup**\n- Who can work remotely (all roles, specific roles, hybrid)\n- Home office requirements (desk, internet speed minimum)\n- Equipment provision (company laptop? stipend?)\n\n**2. Working Hours & Availability**\n- Core hours when everyone is online (e.g., 10am–3pm local time)\n- Flexibility outside core hours\n- Response time expectations (< 2 hours during core hours)\n\n**3. Communication Norms**\n- Async first: Document decisions, use Slack/Teams\n- Video calls: Camera-on policy? optional?\n- Status updates: Daily standup async (Loom/Slack) or live?\n\n**4. Meetings**\n- Calendar blocking culture (protect deep work)\n- Meeting-free days (e.g., no-meeting Wednesdays)\n- Always have an agenda\n\n**5. Security**\n- VPN requirement\n- No public Wi-Fi for sensitive work\n- Screen lock and password policies\n\n**6. Performance**\n- Judged on output, not hours\n- Regular 1:1 cadence maintained\n\n**Tools Stack:**\nSlack/Teams → communication\nNotion/Confluence → documentation\nAsana/Linear/Jira → project management\nZoom/Google Meet → video calls\nLoom → async video updates\n\n💡 *Remote work succeeds on documentation and trust. Over-communicate. Under-assume.*`
            },
            'compensation_strategy': {
                keywords: ['compensation strategy','salary structure','how to pay employees','compensation plan','employee salary','pay structure','pay bands'],
                response: `💰 **Compensation Strategy Design**\n\n**Building a Compensation Framework:**\n\n**Step 1: Job Leveling**\nCreate levels: L1 (Junior) → L2 → L3 (Senior) → L4 (Lead) → L5 (Staff/Principal)\nDefine the skills, scope, and impact expected at each level.\n\n**Step 2: Market Benchmarking**\nUse data sources:\n- Levels.fyi (tech), Glassdoor, PayScale\n- LinkedIn Salary, Radford, Mercer surveys\nTarget: 50th (competitive) or 75th (talent magnet) percentile\n\n**Step 3: Salary Bands**\nEach level gets a min/mid/max range.\nExample L3 Engineer: $90K–$110K–$130K\n\n**Step 4: Total Compensation Components:**\n💵 Base salary (most important for retention)\n📈 Equity/stock options (startups)\n🎁 Benefits (health, dental, vision, 401K)\n🏖️ PTO and flexibility (increasingly valued)\n💰 Bonus/commission (variable)\n\n**Step 5: Pay Equity Review**\nAudit for gender and racial pay gaps annually.\n\n**Compensation Philosophy (write this down):**\n"We pay at [X percentile] of market for [location/industry] to [attract / retain] [type of talent]"\n\n💡 *Transparency about how pay decisions are made builds more trust than the actual pay levels.*`
            },

            // ── OPERATIONS ───────────────────────────────────────────────
            'sop': {
                keywords: ['sop','standard operating procedures','operations manual','process documentation','document processes','operations guide','process manual'],
                response: `📋 **Standard Operating Procedures (SOPs)**\n\n**Why Write SOPs:**\n✅ Consistency regardless of who does the task\n✅ Faster training of new employees\n✅ Easier delegation and scaling\n✅ Reduce dependence on key people\n\n**SOP Structure:**\n1. **Title & Purpose**: What is this? Why does it matter?\n2. **Scope**: Who does this? When?\n3. **Prerequisites**: What's needed before starting?\n4. **Step-by-Step Instructions**: Numbered, clear, specific\n5. **Expected Outcome**: What does "done" look like?\n6. **Troubleshooting**: Common problems and fixes\n7. **Owner & Review Date**: Who maintains this document?\n\n**SOP Writing Tips:**\n✅ Write for a new employee, not an expert\n✅ Include screenshots or short videos for complex steps\n✅ Loom recordings can replace 90% of written SOPs for digital processes\n✅ Keep it under 1 page where possible\n\n**Tools for SOPs:**\n- Notion, Confluence, Google Docs (text)\n- Loom, Scribe.how (auto-generates SOPs from screen recording)\n- Process.st (workflow-based SOPs with checklists)\n\n**Priority Order for Writing SOPs:**\n1. Most frequently done tasks first\n2. Tasks with highest mistake cost\n3. Tasks only one person knows\n\n💡 *If it happens more than twice, write it down. The SOP pays for itself the first time someone new follows it successfully.*`
            },
            'process_improvement': {
                keywords: ['process improvement','optimize processes','lean','improve efficiency','operational efficiency','streamline operations','workflow optimization'],
                response: `⚙️ **Process Improvement Guide**\n\n**Lean Principles (from Toyota):**\n1. Define value (from the customer's perspective)\n2. Map the value stream (all steps to deliver value)\n3. Create flow (eliminate waiting, batching, bottlenecks)\n4. Pull (produce only what's needed, when needed)\n5. Pursue perfection (continuous improvement = Kaizen)\n\n**Identifying Waste (8 Types of Waste - TIMWOODS):**\n- **T**ransportation: Moving things unnecessarily\n- **I**nventory: Too much stock, too many WIP tasks\n- **M**otion: Unnecessary movement of people\n- **W**aiting: Idle time between steps\n- **O**verproduction: Making more than needed\n- **O**verprocessing: More effort than customer values\n- **D**efects: Errors that require rework\n- **S**kills: Not using people's full capabilities\n\n**Process Mapping Steps:**\n1. Observe the current process end-to-end\n2. Map every step (swim lane diagram or simple flowchart)\n3. Note time taken at each step and wait time between steps\n4. Identify bottlenecks (where does work pile up?)\n5. Redesign → Test → Measure → Standardise\n\n**Quick Wins:**\n✅ Automate repeating manual data entry\n✅ Eliminate approval steps that add no value\n✅ Co-locate functions that work closely together\n✅ Batch similar tasks (check email 3x/day, not all day)\n\n💡 *Never automate a bad process — you'll just fail faster. Improve first, then automate.*`
            },
            'inventory_management': {
                keywords: ['inventory management','stock management','inventory control','manage inventory','inventory system','stock levels','inventory tracking'],
                response: `📦 **Inventory Management Guide**\n\n**Core Inventory Metrics:**\n📊 **Inventory Turnover** = COGS ÷ Average Inventory\n(Higher = better — inventory moving fast)\n\n📊 **Days Inventory Outstanding (DIO)** = 365 ÷ Turnover\n(Lower = faster cash conversion)\n\n📊 **Reorder Point** = (Daily Usage × Lead Time) + Safety Stock\n\n**Inventory Management Methods:**\n\n📌 **FIFO (First In, First Out)**: Oldest stock sold first (perishables, standard)\n📌 **LIFO (Last In, First Out)**: Newest stock sold first (rarely used)\n📌 **Just-in-Time (JIT)**: Minimal stock, order on demand (low warehouse cost, high supplier risk)\n📌 **ABC Analysis**: Rank items A (high value/volume), B (medium), C (low) — focus management effort on A items\n\n**Safety Stock Formula:**\n= Z-score × √Lead Time × Demand Std Dev\n(Simplified: set at 25–50% of average lead time demand)\n\n**Tech Tools:**\n- Small business: Square for Retail, Shopify POS\n- Mid-market: TradeGecko/Cin7, Fishbowl\n- Enterprise: SAP, Oracle, NetSuite\n\n**Common Mistakes:**\n❌ Not tracking by SKU\n❌ Manual spreadsheet tracking at scale\n❌ No cycle counting (audit small sections regularly)\n\n💡 *Dead stock kills cash flow. Audit monthly and liquidate anything not moving in 90 days.*`
            },
            'workflow_automation': {
                keywords: ['workflow automation','automate workflows','business automation','process automation','automate tasks','productivity automation','tools automation'],
                response: `🤖 **Workflow Automation Guide**\n\n**What to Automate First:**\nPrioritise tasks that are:\n✅ Repetitive (done > 10× per week)\n✅ Rule-based (if X, then Y — no judgment needed)\n✅ Error-prone when done manually\n✅ Time-consuming but low-skill\n\n**Automation Platform Options:**\n🔧 **Zapier**: 5000+ app integrations, no-code, widely used\n🔧 **Make (Integromat)**: More complex workflows, better value for volume\n🔧 **n8n**: Open-source, self-hostable, developer-friendly\n🔧 **Power Automate**: Microsoft ecosystem\n🔧 **Pipedream**: Dev-first, API-heavy\n\n**High-ROI Automation Examples:**\n📧 Lead capture → CRM entry → Welcome email → Slack alert\n📊 Form submission → Spreadsheet row → Project task created\n📅 Calendar event → Zoom created → Reminder sent\n🛒 New order → Invoice sent → Inventory updated → Shipping label created\n👥 New employee → Tools provisioned → Onboarding checklist created\n\n**AI-Powered Automation:**\n- AI email drafting (Gmail AI, Superhuman)\n- AI meeting notes (Otter.ai, Fireflies)\n- AI data entry (Rossum, Nanonets)\n- AI customer support (Intercom, Drift AI)\n\n💡 *Start with one automation that saves 2+ hours per week. Prove the ROI, then expand.*`
            },
            'business_continuity': {
                keywords: ['business continuity','disaster recovery','contingency plan','risk planning','business continuity plan','bcp','what if plan'],
                response: `🛡️ **Business Continuity Plan (BCP)**\n\n**Why You Need It:**\nCOVID showed that any business can be disrupted overnight. A BCP reduces recovery time from weeks to hours.\n\n**Core Components:**\n\n**1. Risk Assessment**\n- List all operational risks: natural disaster, cyberattack, key person departure, supplier failure, power outage\n- Rate each by probability × impact = priority\n\n**2. Business Impact Analysis**\n- Which functions are mission-critical? (< 4 hours downtime acceptable)\n- Which can tolerate 24–72 hours downtime?\n- What's the cost per hour of downtime for each function?\n\n**3. Recovery Strategies**\n- Data backup: 3-2-1 rule (3 copies, 2 media, 1 offsite)\n- Remote work capability for all roles\n- Cross-training for single points of failure\n- Backup suppliers for critical inputs\n- Emergency communication plan\n\n**4. Response Procedures**\nFor each major risk scenario:\n- Who is responsible? (Incident Commander)\n- What steps to take in first 1 hour? 24 hours? 72 hours?\n- Communication tree (who tells who?)\n\n**5. Test Your BCP**\n- Tabletop exercise: Walk through a scenario with your team\n- Annual drill: Actually simulate a system going down\n\n💡 *Your BCP is worth nothing if it lives in a folder that's also gone offline when you need it.*`
            },
            'project_management': {
                keywords: ['project management','project timeline','project planning','project schedule','how to manage projects','agile','scrum','kanban'],
                response: `📅 **Project Management Framework**\n\n**Choose Your Methodology:**\n\n🌊 **Waterfall**: Sequential phases, fixed scope, good for construction/compliance\n⚡ **Agile**: Iterative sprints, adaptive, great for software and marketing\n📋 **Scrum**: Agile framework with sprints (2 weeks), daily standups, sprint reviews\n🃏 **Kanban**: Visual board (To Do / Doing / Done), continuous flow, no sprints\n🏗️ **PRINCE2**: Formal stages, governance-heavy, enterprise/government\n\n**Project Charter (Start Here):**\n📌 Project name and purpose\n📌 Key objectives (SMART)\n📌 Scope (what's IN and OUT)\n📌 Key milestones and deadlines\n📌 Budget and resources\n📌 Risks and dependencies\n📌 Stakeholders and RACI matrix\n\n**RACI Matrix:**\n- **R**esponsible: Does the work\n- **A**ccountable: Owns the outcome\n- **C**onsulted: Input required\n- **I**nformed: Kept updated\n\n**Tools:**\n🛠️ Simple: Trello, Notion, Asana\n🛠️ Mid-complexity: Monday.com, ClickUp, Basecamp\n🛠️ Enterprise: Jira, MS Project\n\n💡 *The biggest project management failure is scope creep. Define scope upfront, get sign-off, and create a change management process for anything outside it.*`
            },
            'vendor_management': {
                keywords: ['vendor management','manage suppliers','vendor relationships','procurement','supplier management','supplier selection'],
                response: `🤝 **Vendor Management Guide**\n\n**Vendor Selection Process:**\n1. Define requirements (specification, quantity, quality, timeline)\n2. Market scan (at least 3 vendors)\n3. RFP/RFQ (Request for Proposal/Quote)\n4. Evaluate on: Price, Quality, Reliability, Support, Terms, Financial stability\n5. Reference checks with existing customers\n6. Pilot before full commitment\n\n**Contract Essentials:**\n📄 Scope of work / deliverables\n📄 Pricing and payment terms\n📄 SLA (service level agreement) with penalties\n📄 IP ownership\n📄 Termination clause\n📄 Confidentiality/NDA\n📄 Liability and indemnification\n\n**Ongoing Vendor Management:**\n- Quarterly business reviews for strategic vendors\n- Track KPIs: On-time delivery, defect rate, response time\n- Build relationships with backup suppliers for critical items\n- Pay on time — good payment history improves your negotiating power\n\n**Supplier Segmentation:**\n- Strategic (partnership, long-term)\n- Tactical (standard process, rotate suppliers)\n- Spot (one-off, lowest price wins)\n\n💡 *Never sole-source a critical supply. Always have a qualified backup. Finding out your only supplier went bankrupt during your busiest period is a nightmare.*`
            },

            // ── PRODUCT ──────────────────────────────────────────────────
            'product_roadmap': {
                keywords: ['product roadmap','product plan','feature roadmap','product strategy','product planning','how to plan product'],
                response: `🗺️ **Product Roadmap Guide**\n\n**What a Roadmap Is (and Isn't):**\n✅ A strategic communication tool showing WHERE you're going and WHY\n❌ Not a fixed project plan — should evolve with learning\n\n**Roadmap Types:**\n📅 **Timeline Roadmap**: Features planned by quarter (good for external communication)\n🎯 **Now/Next/Later**: Current focus, next priorities, long-term bets\n💡 **Theme/Outcome-Based**: Grouped by strategic goals (most agile-friendly)\n\n**Prioritisation Frameworks:**\n\n📊 **RICE Score** = (Reach × Impact × Confidence) ÷ Effort\n\n🍬 **ICE Score** = Impact × Confidence × Ease\n\n📦 **MoSCoW**: Must Have / Should Have / Could Have / Won't Have\n\n🔢 **Kano Model**: Basic needs, Performance needs, Delighters\n\n**Building Your Roadmap:**\n1. Gather: Customer feedback, sales insights, support tickets, analytics\n2. Theme: Group feedback into strategic themes\n3. Prioritise: Score and rank by business impact\n4. Timeline: Assign to quarters (be realistic — halve your estimate)\n5. Communicate: Share with stakeholders, invite input\n\n💡 *The best roadmaps describe outcomes (increase user activation by 30%), not features (add dashboard). Features are HOW — outcomes are WHY.*`
            },
            'mvp': {
                keywords: ['mvp','minimum viable product','what is mvp','build an mvp','mvp development','how to build mvp','validate idea'],
                response: `🚀 **Minimum Viable Product (MVP) Guide**\n\n**What an MVP Is:**\nThe SIMPLEST version of your product that delivers core value to early adopters and allows you to test your riskiest assumptions.\n\n**What an MVP Is NOT:**\n❌ A low-quality product (it's minimal, not bad)\n❌ Every feature you can think of\n❌ What YOU think customers need (it's what THEY tell you they need)\n\n**MVP Building Process:**\n1. **Define your riskiest assumption** — "Customers will pay for X" / "Customers care about Y"\n2. **Define the ONE problem** your MVP tests\n3. **Design the minimum feature set** to test that assumption\n4. **Build/Launch in 4–8 weeks** (if it takes longer, it's not an MVP)\n5. **Get 50–100 users on it** and measure the key metric\n6. **Iterate or pivot** based on data\n\n**MVP Types:**\n- 🧪 Concierge: Do the service manually before automating\n- 🧙 Wizard of Oz: Fake automation, human does it behind the scenes\n- 📹 Explainer video: Show the product before building (Dropbox did this)\n- 🏠 Landing page: Test demand with a sign-up form\n- 🔧 Prototype: Clickable mockup, no code\n\n**The Core MVP Metric:**\nDon't measure everything. Pick ONE. Usually: activation rate, retention, or revenue.\n\n💡 *"If you're not embarrassed by the first version of your product, you launched too late." — Reid Hoffman*`
            },
            'product_launch': {
                keywords: ['product launch','launch strategy','how to launch a product','product launch plan','go to market launch','launching new product'],
                response: `🚀 **Product Launch Playbook**\n\n**Pre-Launch (8–12 weeks out):**\n✅ Define launch goals (users, revenue, media coverage, waitlist)\n✅ Build waitlist / pre-launch community\n✅ Create launch assets (video, screenshots, copy)\n✅ Prepare press kit and media outreach list\n✅ Set up tracking (analytics, conversion events)\n✅ Arm your sales team (scripts, objection handling)\n\n**Launch Day:**\n🎯 Activate waitlist (email + DMs)\n🎯 Post Hunt (Product Hunt, Hacker News "Show HN")\n🎯 Publish launch blog post and video\n🎯 Send press outreach (embargo-lifts)\n🎯 Post across all social channels\n🎯 Personal outreach to 50 best contacts\n🎯 Monitor in real-time (Slack war room)\n\n**Post-Launch (Days 7–30):**\n✅ Onboarding calls with early users\n✅ Collect feedback aggressively\n✅ Fast-follow releases (fix bugs, add most-requested feature)\n✅ Publish case studies with early wins\n✅ Retargeting campaign for website visitors\n\n**Launch Metrics to Track:**\n- Signups / downloads\n- Activation rate (used core feature)\n- Day 1, 7, 30 retention\n- NPS at 30 days\n\n💡 *Your launch is not a moment — it's a campaign. The best launches are sustained over 2–4 weeks, not a single day.*`
            },
            'user_feedback': {
                keywords: ['user feedback','collect feedback','user research','gather feedback','customer feedback','how to get feedback','product feedback','customer insights'],
                response: `🎤 **User Feedback System**\n\n**Qualitative Methods (why + context):**\n🎙️ User Interviews (1:1, 30–60 min) — best for discovery\n👀 Usability Testing (watch users use your product)\n📱 Contextual Inquiry (observe users in their environment)\n💬 Customer Support Analysis (mine tickets for patterns)\n📣 Community Listening (Reddit, Twitter, Slack groups)\n\n**Quantitative Methods (what + how much):**\n📊 In-app surveys (Hotjar, Typeform, UserLeap)\n📈 Analytics (where do users drop off?)\n⭐ NPS (Net Promoter Score) — monthly survey\n📋 CSAT (Customer Satisfaction) — post-interaction\n🔥 Heatmaps (Hotjar, Microsoft Clarity)\n\n**Interview Best Practices:**\n✅ Open-ended questions only ("Tell me about the last time...")\n✅ Silence is your friend — let them think\n✅ Ask "Why?" 5 times to get to root cause\n✅ Record with permission + transcribe (Otter.ai)\n✅ Aim for 8–12 interviews (patterns emerge)\n\n**Closing the Feedback Loop:**\n- Acknowledge feedback received\n- Update customers when their suggestion ships\n- Build in public (share roadmap progress)\n\n💡 *The goal of user research is not to confirm what you already believe — it's to challenge your assumptions.*`
            },
            'customer_journey': {
                keywords: ['customer journey map','customer journey','customer experience','map customer experience','cx','customer touchpoints','experience mapping'],
                response: `🗺️ **Customer Journey Mapping**\n\n**Why Map the Journey:**\nEvery gap in your customer journey is a gap in revenue. Fixing journey friction is often 10× faster than finding new customers.\n\n**Journey Stages:**\n1. 🔍 **Awareness** — They discover you exist\n2. 🧐 **Consideration** — They evaluate you vs. alternatives\n3. 💰 **Purchase** — They decide and buy\n4. 🎉 **Onboarding** — First use, getting value\n5. 🔄 **Retention** — Repeated use, deepening engagement\n6. 🌟 **Advocacy** — They refer others\n\n**For Each Stage, Map:**\n- Touchpoints (what channels do they use?)\n- Customer thoughts (what are they thinking?)\n- Customer emotions (how do they feel?)\n- Pain points (what frustrates them?)\n- Opportunities (what could you improve?)\n\n**How to Run a Journey Mapping Workshop:**\n1. Assemble cross-functional team (product, CS, sales, marketing)\n2. Pick ONE customer segment to map\n3. Use sticky notes on a whiteboard (or Miro)\n4. Fill in stages → touchpoints → emotions → pains\n5. Vote on top 3 pain points to fix\n6. Assign owners and timelines\n\n💡 *Map the journey as it IS, not as you wish it were. The gaps between your intended experience and the actual experience are where the gold is.*`
            },
            'nps': {
                keywords: ['nps','net promoter score','improve nps','customer satisfaction score','csat','customer satisfaction','how to measure satisfaction'],
                response: `⭐ **NPS & Customer Satisfaction**\n\n**Net Promoter Score (NPS):**\nSurvey question: "How likely are you to recommend us to a friend or colleague?" (0–10)\n\n- **Promoters** (9–10): Love you, will refer\n- **Passives** (7–8): Satisfied but not enthusiastic\n- **Detractors** (0–6): Unhappy, may actively complain\n\n**NPS Score = % Promoters - % Detractors**\n\n**NPS Benchmarks by Industry:**\n- SaaS: 30–50 is good\n- E-commerce: 45–55 is good\n- Financial services: 30–40 is good\n- Healthcare: 50–70 is good\n- Airlines: 20–35 is good\n\n**How to Improve NPS:**\n1. Follow up with every detractor (within 24 hours)\n2. Ask: "What would we need to change to turn you into a 9 or 10?"\n3. Fix systemic issues (not just individual complaints)\n4. Create promoter programmes (reward referrals)\n5. Track NPS by customer segment — fix the worst segment first\n\n**Beyond NPS:**\n- CSAT (post-interaction): "How satisfied were you with X?" (1–5)\n- CES (Customer Effort Score): "How easy was it to do X?" (1–7)\n- Use all three for a full picture\n\n💡 *NPS is a lagging indicator. Pair it with usage data and churn data to understand the complete picture.*`
            },
            'faq': {
                keywords: ['faq','frequently asked questions','create faq','help center','knowledge base','self-service support'],
                response: `📚 **FAQ & Help Center Creation**\n\n**Why a Good FAQ Saves You Money:**\n- 80% of customer questions are repeated\n- Great FAQ reduces support tickets by 40–70%\n- Customers who self-serve have higher satisfaction (they solved their own problem)\n\n**Finding FAQ Content:**\n✅ Mine your support ticket history (group by category)\n✅ Listen to onboarding calls (what do new users ask?)\n✅ Survey your team ("Top 10 questions you get daily")\n✅ Check competitors' help centers\n✅ Monitor community channels (Discord, Reddit, Slack)\n\n**FAQ Structure:**\n- Organise by customer journey stage OR by feature/topic\n- Search-first design (people search before browsing)\n- Use customer language, not internal jargon\n- Include visuals for any step-by-step process\n- Link between related articles\n\n**Tools:**\n- Simple: Notion, Google Sites\n- Mid: HelpScout Docs, Freshdesk, Zendesk Guide\n- Enterprise: Salesforce Knowledge, Guru, Confluence\n\n**Maintenance:**\n- Review articles quarterly\n- Track search queries with no results → create missing articles\n- Update after every major product change\n- Flag articles with high contact rate (means article is insufficient)\n\n💡 *The best FAQ answers the question so completely that users don't need to contact support afterward.*`
            },

            // ── LEGAL ──────────────────────────────────────────────────
            'business_registration': {
                keywords: ['business registration','register my business','how to register','company formation','business structure','llc','corporation','sole proprietorship'],
                response: `📜 **Business Registration Guide**\n\n**Choose Your Structure:**\n\n👤 **Sole Proprietorship**\n- Simplest, no separation between you and business\n- Personal liability — your assets at risk\n- Best for: side projects, freelancers testing an idea\n\n🤝 **Partnership**\n- 2+ owners, shared profits/losses\n- Personal liability (general partnership)\n- Add a partnership agreement regardless\n\n🛡️ **LLC (Limited Liability Company)**\n- Personal asset protection\n- Tax flexibility (pass-through or corporate)\n- Simple to run — recommended for most small businesses\n- Cost: $50–$500 filing fee depending on US state\n\n🏛️ **C-Corporation**\n- Required for VC investment\n- Complex (board, bylaws, shareholders)\n- Delaware C-Corp is standard for funded startups\n- Cost: Higher ongoing compliance\n\n**Registration Steps (US LLC Example):**\n1. Choose state (Delaware or your home state)\n2. Choose a unique business name\n3. File Articles of Organization with state\n4. Get an EIN (IRS.gov, free)\n5. Open a business bank account\n6. Apply for business licences (varies by industry/city)\n\n**Other Important Setup:**\n✅ Separate business bank account (critical)\n✅ Business insurance\n✅ Accounting software (QuickBooks, Xero, Wave)\n\n💡 *Consult a lawyer for your specific situation. A $300 consultation can save $30,000 in mistakes.*`
            },
            'terms_of_service': {
                keywords: ['terms of service','terms and conditions','tos','legal terms','write terms of service','user agreement','website terms'],
                response: `📄 **Terms of Service Guide**\n\n**What a ToS Covers:**\n1. **Acceptance**: How users agree (by clicking, signing up)\n2. **Service Description**: What you offer\n3. **User Responsibilities**: What they can and cannot do\n4. **Prohibited Uses**: Illegal activity, spam, abuse\n5. **Intellectual Property**: Who owns what (your content, their content)\n6. **Payment Terms**: Billing, refunds, cancellation\n7. **Limitation of Liability**: Cap on your legal exposure\n8. **Disclaimers**: No warranties, accuracy limitations\n9. **Termination**: When/how you can end access\n10. **Governing Law**: Which jurisdiction applies\n11. **Changes to Terms**: How you'll notify users\n12. **Contact Information**: Legal entity and address\n\n**How to Create It:**\n✅ Use a lawyer for anything involving significant money or risk\n✅ For early-stage: Termly, Iubenda, GetTerms.io (free generators)\n✅ Study competitors' terms for completeness\n✅ Make it readable — plain language ToS builds more trust\n\n**Key Clauses to Not Miss:**\n⚠️ Limitation of liability (caps your exposure)\n⚠️ Dispute resolution (arbitration vs. litigation)\n⚠️ Class action waiver (if applicable)\n⚠️ GDPR/CCPA compliance clauses (if you have EU/CA customers)\n\n💡 *A ToS you can't enforce is worse than none — it gives false confidence. Get it reviewed.*`
            },
            'privacy_policy': {
                keywords: ['privacy policy','write privacy policy','gdpr','data protection policy','ccpa','data privacy','user data policy'],
                response: `🔒 **Privacy Policy Guide**\n\n**Why You Need It:**\n- Legal requirement in most jurisdictions (GDPR, CCPA, PIPEDA)\n- Required by Google, Apple, Facebook to use their platforms\n- Builds trust with privacy-conscious customers\n\n**What to Include:**\n1. **What data you collect**: Email, name, payment, usage data, cookies\n2. **How you collect it**: Sign-up forms, cookies, third-party tools\n3. **Why you collect it**: Service delivery, analytics, marketing\n4. **Who you share it with**: Payment processors, analytics, email tools\n5. **How long you keep it**: Retention periods\n6. **User rights**: Access, delete, export their data\n7. **Cookies policy**: What cookies and for what purpose\n8. **Security measures**: How you protect data\n9. **Children's privacy**: COPPA if under-13 audience\n10. **Contact**: DPO or privacy contact details\n\n**GDPR Essentials (EU customers):**\n✅ Legal basis for processing (consent, legitimate interest, contract)\n✅ Data Subject Rights (access, erasure, portability, objection)\n✅ Data breach notification process\n✅ Appointed DPO if required\n\n**Free Tools:**\nTermly, iubenda, Privacypolicies.com — auto-generate based on your answers\n\n💡 *Update your privacy policy when your data practices change. A stale policy is a legal liability.*`
            },
            'nda': {
                keywords: ['nda','non-disclosure agreement','confidentiality agreement','non compete','protect business secrets','confidential information'],
                response: `🔐 **NDA Guide**\n\n**When to Use an NDA:**\n✅ Before sharing your business idea with potential partners\n✅ With employees who handle confidential information\n✅ With contractors and freelancers\n✅ In due diligence processes (M&A, investment)\n✅ Before a sales demo of proprietary technology\n\n**Types of NDA:**\n📄 **Unilateral**: One party shares info, other keeps it secret (most common)\n📄 **Mutual (MNDA)**: Both parties share confidential info\n\n**Key NDA Clauses:**\n1. **Definition of Confidential Information**: What's covered?\n2. **Exclusions**: What's NOT confidential (public info, already known)\n3. **Obligations**: What the recipient must do (don't share, protect it)\n4. **Duration**: How long does it last? (1–5 years typically)\n5. **Permitted Disclosures**: Who can they show it to? (lawyers, employees who need to know)\n6. **Remedies**: What happens if they breach? (injunction, damages)\n\n**Practical Advice:**\n⚠️ VCs and large companies often refuse to sign NDAs for initial pitch meetings (normal practice)\n⚠️ An NDA is only as good as your ability to detect a breach and enforce it\n✅ Keep track of what you shared and when\n✅ Use services like DocuSign, HelloSign for e-signature\n\n💡 *Ideas have limited legal protection. Execution is your real competitive advantage — focus energy there.*`
            },
            'intellectual_property': {
                keywords: ['intellectual property','ip strategy','patent','trademark','copyright','protect my idea','brand protection','ip protection'],
                response: `⚖️ **Intellectual Property (IP) Strategy**\n\n**4 Types of IP Protection:**\n\n™ **Trademark**\n- Protects: Brand names, logos, slogans\n- Duration: Indefinitely (renew every 10 years)\n- Register with: USPTO (US), EUIPO (EU), WIPO (international)\n- Cost: $250–$400 per class (US)\n- Timeline: 8–14 months\n\n© **Copyright**\n- Protects: Creative works (content, code, art, music)\n- Automatic upon creation (no registration needed but US registration helps in lawsuits)\n- Duration: 70 years after creator's death\n\n🔬 **Patent**\n- Protects: Inventions, processes, designs\n- Utility patent: New/useful process, machine, product\n- Timeline: 2–4 years\n- Cost: $10,000–$30,000+ (with attorney)\n- Duration: 20 years from filing\n\n🤫 **Trade Secrets**\n- Protects: Formulas, processes, strategies (Coca-Cola recipe)\n- Duration: Indefinitely (as long as secret)\n- Protect through: NDAs, access controls, employee agreements\n\n**Startup IP Priorities:**\n1. Trademark your brand name and logo ASAP\n2. Assign IP to the company (not founders personally)\n3. All employee and contractor agreements must include IP assignment clause\n4. Document your inventive process (timestamped records)\n\n💡 *Check if your name is trademark-free BEFORE building brand equity. A cease-and-desist letter after 2 years is devastating.*`
            },

            // ── TECHNOLOGY ───────────────────────────────────────────────
            'tech_stack': {
                keywords: ['tech stack','technology stack','what tech to use','choose technology','tech recommendations','software stack','what to build with'],
                response: `⚙️ **Tech Stack Selection Guide**\n\n**First Question: What Are You Building?**\n\n**Web App (B2B SaaS):**\n🖥️ Frontend: React, Vue, or Next.js\n⚙️ Backend: Node.js, Python/FastAPI, or Rails\n🗄️ Database: PostgreSQL (primary), Redis (cache)\n☁️ Hosting: AWS, GCP, or Vercel + Railway\n\n**Mobile App:**\n📱 Cross-platform: React Native or Flutter (one codebase, two platforms)\n📱 Native iOS: Swift | Native Android: Kotlin (best performance)\n\n**E-commerce:**\n🛒 Shopify (simple, hosted) or WooCommerce (flexible, owned)\n🛒 Custom: Next.js + Stripe + Printful (for dropshipping)\n\n**No-Code/Low-Code (fastest to market):**\n🔧 Webflow (websites), Bubble (web apps), Glide (mobile apps)\n🔧 Airtable + Zapier (data + automation)\n\n**Key Stack Selection Principles:**\n✅ Use what your team ALREADY knows (speed > optimal)\n✅ Choose boring technology (battle-tested, large community)\n✅ Optimise for developer velocity, not architecture purity\n✅ You can always migrate at scale — build for today's scale first\n\n**Don't Over-Engineer:**\n❌ Microservices before 100K users\n❌ Multiple databases before you need them\n❌ Kubernetes before you need orchestration\n\n💡 *The best tech stack is the one your team can ship with fastest. Solve the business problem first.*`
            },
            'cybersecurity': {
                keywords: ['cybersecurity','security checklist','data security','protect my business','cybersecurity plan','it security','information security','cyber threats'],
                response: `🔐 **Business Cybersecurity Checklist**\n\n**Foundation (Do These First):**\n✅ Use a password manager (1Password, Bitwarden) for everyone\n✅ Enable multi-factor authentication (MFA) on ALL accounts\n✅ Keep all software and OS updated (automatic updates on)\n✅ Business-grade antivirus/EDR on all devices\n✅ Encrypted devices (BitLocker/FileVault on by default)\n\n**Data Protection:**\n✅ 3-2-1 backup rule: 3 copies, 2 media types, 1 offsite\n✅ Encrypt sensitive data at rest and in transit\n✅ Map what data you hold and who has access\n✅ Delete data you don't need (less data = less liability)\n✅ Access controls: Least privilege (only access what they need)\n\n**Network Security:**\n✅ VPN for remote workers accessing company systems\n✅ Separate guest WiFi from business network\n✅ Firewall enabled and configured\n✅ Disable unused ports and services\n\n**Email Security:**\n✅ Enable SPF, DKIM, DMARC records (prevent spoofing)\n✅ Train staff to spot phishing (85% of attacks start with email)\n✅ Never click links in unexpected emails — go directly to the site\n\n**Incident Response Plan:**\n1. Detect → 2. Contain → 3. Eradicate → 4. Recover → 5. Learn\n\n💡 *90% of cyber breaches are caused by human error. Security training is your most cost-effective investment.*`
            },
            'digital_transformation': {
                keywords: ['digital transformation','go digital','digitize my business','digital strategy','modernise business','technology adoption','digital tools'],
                response: `🔄 **Digital Transformation Guide**\n\n**What Digital Transformation Actually Means:**\nUsing technology to fundamentally change how your business creates and delivers value — not just adding software to old processes.\n\n**4 Areas of Digital Transformation:**\n\n1. 💼 **Operations**: Automate, streamline, and connect internal processes\n2. 👥 **Customer Experience**: Digital-first touchpoints and personalization\n3. 📊 **Data & Analytics**: Make decisions with data, not gut feel\n4. 🏗️ **Business Model**: New revenue streams enabled by technology\n\n**Step-by-Step Transformation Roadmap:**\n**Phase 1 — Assess (Month 1)**\nAudit current tools, identify biggest operational pain points\n\n**Phase 2 — Foundation (Months 2–4)**\nCRM, cloud storage, communication tools, basic automation\n\n**Phase 3 — Integration (Months 4–8)**\nConnect systems (no data silos), build dashboards, automate workflows\n\n**Phase 4 — Intelligence (Months 8+)**\nAI and analytics layered on top of clean data\n\n**Common Tools by Category:**\n📊 Analytics: Google Analytics 4, Mixpanel, Tableau\n💬 CRM: HubSpot (SMB), Salesforce (enterprise)\n🔄 Automation: Zapier, Make, n8n\n📋 Project Management: Asana, Notion, Monday.com\n\n💡 *Technology solves business problems. Start with the problem, then find the technology — not the other way around.*`
            }
        };
    }

    initializeTaskSynonyms() {
        return {
            // Planning synonyms
            'business plan': 'business_plan', 'write a business plan': 'business_plan', 'create business plan': 'business_plan',
            'business planning': 'business_plan', 'plan my business': 'business_plan',
            'executive summary': 'executive_summary', 'exec summary': 'executive_summary',
            'mission statement': 'mission_statement', 'company mission': 'mission_statement',
            'vision statement': 'vision_statement', 'company vision': 'vision_statement',
            'business model': 'business_model_canvas', 'bmc': 'business_model_canvas', 'canvas model': 'business_model_canvas',
            'swot': 'swot_analysis', 'swot analysis': 'swot_analysis',
            'roadmap': 'startup_roadmap', 'startup roadmap': 'startup_roadmap',
            'value proposition': 'value_proposition', 'value prop': 'value_proposition', 'uvp': 'value_proposition', 'usp': 'value_proposition',
            'market size': 'market_opportunity', 'tam sam som': 'market_opportunity', 'market opportunity': 'market_opportunity',
            'feasibility': 'feasibility_study', 'feasibility study': 'feasibility_study',
            'go to market': 'go_to_market', 'gtm': 'go_to_market', 'launch strategy': 'go_to_market',
            'competitor analysis': 'competitor_analysis', 'competitive analysis': 'competitor_analysis',
            'customer persona': 'customer_persona', 'buyer persona': 'customer_persona', 'icp': 'customer_persona',
            'market research': 'market_research', 'research the market': 'market_research',
            'pivot': 'business_pivot', 'pivot strategy': 'business_pivot',

            // Marketing synonyms
            'content marketing': 'content_marketing', 'content strategy': 'content_marketing',
            'social media': 'social_media_strategy', 'instagram strategy': 'social_media_strategy',
            'email marketing': 'email_marketing', 'newsletter': 'email_marketing',
            'seo': 'seo_strategy', 'search engine': 'seo_strategy', 'rank on google': 'seo_strategy',
            'branding': 'brand_identity', 'brand identity': 'brand_identity', 'brand guidelines': 'brand_identity',
            'public relations': 'pr_strategy', 'press release': 'pr_strategy', 'pr strategy': 'pr_strategy',
            'influencer': 'influencer_marketing', 'influencer marketing': 'influencer_marketing',
            'growth hacking': 'growth_hacking', 'growth strategy': 'growth_hacking',
            'referral program': 'referral_program', 'referral marketing': 'referral_program',
            'paid advertising': 'advertising_campaign', 'facebook ads': 'advertising_campaign', 'google ads': 'advertising_campaign',
            'community': 'community_building', 'build a community': 'community_building',

            // Finance synonyms
            'financial projections': 'financial_projections', 'revenue projections': 'financial_projections',
            'cash flow': 'cash_flow', 'cash flow statement': 'cash_flow',
            'budget': 'budget_planning', 'budgeting': 'budget_planning', 'annual budget': 'budget_planning',
            'investor pitch': 'investor_pitch', 'pitch deck': 'investor_pitch', 'fundraising': 'investor_pitch',
            'break even': 'break_even', 'break-even': 'break_even',
            'pricing': 'pricing_strategy', 'how to price': 'pricing_strategy', 'price my product': 'pricing_strategy',
            'funding': 'funding_strategy', 'raise money': 'funding_strategy', 'venture capital': 'funding_strategy',
            'profit and loss': 'pl_statement', 'p&l': 'pl_statement', 'income statement': 'pl_statement',
            'roi': 'roi_analysis', 'return on investment': 'roi_analysis',

            // Sales synonyms
            'sales strategy': 'sales_strategy', 'sales plan': 'sales_strategy',
            'sales pitch': 'sales_pitch', 'pitch script': 'sales_pitch',
            'lead generation': 'lead_generation', 'generate leads': 'lead_generation',
            'negotiation': 'negotiation', 'negotiate': 'negotiation',
            'closing': 'closing_techniques', 'close a sale': 'closing_techniques',
            'customer retention': 'customer_retention', 'reduce churn': 'customer_retention',

            // HR synonyms
            'hiring': 'hiring_strategy', 'how to hire': 'hiring_strategy', 'recruit': 'hiring_strategy',
            'onboarding': 'onboarding_plan', 'employee onboarding': 'onboarding_plan',
            'performance review': 'performance_review', 'employee review': 'performance_review',
            'training': 'training_program', 'employee training': 'training_program',
            'conflict': 'conflict_resolution', 'workplace conflict': 'conflict_resolution',
            'remote work': 'remote_work_policy', 'work from home': 'remote_work_policy',
            'compensation': 'compensation_strategy', 'salary structure': 'compensation_strategy',

            // Operations synonyms
            'sop': 'sop', 'standard operating': 'sop', 'process documentation': 'sop', 'operations manual': 'sop',
            'process improvement': 'process_improvement', 'lean': 'process_improvement', 'efficiency': 'process_improvement',
            'inventory': 'inventory_management', 'stock management': 'inventory_management',
            'automation': 'workflow_automation', 'automate': 'workflow_automation',
            'business continuity': 'business_continuity', 'disaster recovery': 'business_continuity',
            'project management': 'project_management', 'project planning': 'project_management',
            'vendor management': 'vendor_management', 'supplier': 'vendor_management',

            // Product synonyms
            'product roadmap': 'product_roadmap', 'feature roadmap': 'product_roadmap',
            'mvp': 'mvp', 'minimum viable product': 'mvp', 'build mvp': 'mvp',
            'product launch': 'product_launch', 'launch my product': 'product_launch',
            'user feedback': 'user_feedback', 'collect feedback': 'user_feedback',

            // Customer synonyms
            'customer journey': 'customer_journey', 'cx': 'customer_journey', 'customer experience': 'customer_journey',
            'nps': 'nps', 'net promoter score': 'nps', 'customer satisfaction': 'nps',
            'faq': 'faq', 'help center': 'faq', 'knowledge base': 'faq',

            // Legal synonyms
            'business registration': 'business_registration', 'register business': 'business_registration', 'llc': 'business_registration',
            'terms of service': 'terms_of_service', 'tos': 'terms_of_service', 'terms and conditions': 'terms_of_service',
            'privacy policy': 'privacy_policy', 'gdpr': 'privacy_policy',
            'nda': 'nda', 'non-disclosure': 'nda', 'confidentiality agreement': 'nda',
            'intellectual property': 'intellectual_property', 'patent': 'intellectual_property', 'trademark': 'intellectual_property',

            // Tech synonyms
            'tech stack': 'tech_stack', 'technology stack': 'tech_stack',
            'cybersecurity': 'cybersecurity', 'security checklist': 'cybersecurity',
            'digital transformation': 'digital_transformation', 'go digital': 'digital_transformation'
        };
    }

    /**
     * Get a business task response — exact phrase and synonym matching only.
     * NO fuzzy/overlap matching to prevent false positives.
     */
    getBusinessTaskResponse(query) {
        const q = query.toLowerCase().trim();

        // ── 1. Synonym lookup (whole-word for short synonyms) ──────────────
        for (const [synonym, taskKey] of Object.entries(this.TASK_SYNONYMS)) {
            // Short synonyms (≤4 chars like "seo","nda","bmc") need word boundaries
            // to avoid matching substrings like "nda" inside "agenda"
            if (synonym.length <= 4) {
                const re = new RegExp(`(?:^|\\s|[^a-z])${synonym.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(?:\\s|$|[^a-z])`, 'i');
                if (re.test(q)) return this.BUSINESS_TASKS[taskKey]?.response || null;
            } else {
                if (q.includes(synonym)) return this.BUSINESS_TASKS[taskKey]?.response || null;
            }
        }

        // ── 2. Exact keyword phrase matching (minimum 8 chars to be specific) ─
        let bestTask = null;
        let bestScore = 0;

        for (const [taskKey, taskData] of Object.entries(this.BUSINESS_TASKS)) {
            for (const keyword of taskData.keywords) {
                const kw = keyword.toLowerCase();
                if (kw.length >= 8 && q.includes(kw)) {
                    if (kw.length > bestScore) {
                        bestScore = kw.length;
                        bestTask = taskData;
                    }
                }
            }
        }

        if (bestTask) return bestTask.response;
        return null;
    }

    /**
     * Generate business names with 6 creative styles
     */
    generateBusinessNames(industry, count = 10) {
        const industryLower = industry.toLowerCase();
        const terms = this.getIndustryTerms(industryLower);
        const names = [];

        // Style 1: Compound words (like Snapchat, Instagram, PayPal)
        const compoundA = ['Quick', 'Smart', 'Swift', 'Bold', 'Bright', 'Clear', 'Sharp', 'Spark', 'Flash', 'Wave'];
        const compoundB = ['Hub', 'Flow', 'Link', 'Path', 'Base', 'Core', 'Edge', 'Forge', 'Craft', 'Works'];
        for (let i = 0; i < 2; i++) {
            const a = compoundA[Math.floor(Math.random() * compoundA.length)];
            const b = compoundB[Math.floor(Math.random() * compoundB.length)];
            names.push(a + b);
        }

        // Style 2: Industry term + modern suffix
        const modernSuffixes = ['ly', 'ify', 'io', 'iq', 'ai', 'zy', 'co'];
        const termLower = terms[Math.floor(Math.random() * terms.length)].toLowerCase();
        names.push(termLower + modernSuffixes[Math.floor(Math.random() * modernSuffixes.length)]);

        // Style 3: Premium "The X Co" style
        const premiumTerms = ['Peak', 'Prime', 'Pure', 'True', 'Apex', 'Crest'];
        const premium = premiumTerms[Math.floor(Math.random() * premiumTerms.length)];
        names.push(`${premium} ${terms[Math.floor(Math.random() * terms.length)]}`);

        // Style 4: Made-up portmanteau (like Spotify, Zillow)
        const syllables = ['ver', 'nova', 'kova', 'lux', 'zen', 'vora', 'nexa', 'zyla', 'aura', 'vive'];
        const syl1 = syllables[Math.floor(Math.random() * syllables.length)];
        const syl2 = syllables[Math.floor(Math.random() * syllables.length)];
        const portmanteau = (syl1 + syl2).replace(/(.)\1+/g, '$1');
        names.push(portmanteau.charAt(0).toUpperCase() + portmanteau.slice(1));

        // Style 5: Nature/abstract (like Amazon, Apple, Stripe)
        const nature = ['Cedar', 'Ember', 'Atlas', 'Haven', 'Ridge', 'Dune', 'Cove', 'Fern', 'Pebble', 'Maple'];
        names.push(nature[Math.floor(Math.random() * nature.length)]);

        // Style 6: Latin-inspired (like Amazon, Nike, Aura)
        const latinish = ['Vortex', 'Lumis', 'Altus', 'Verita', 'Solara', 'Onyx', 'Axiom', 'Helix', 'Nexum', 'Stellas'];
        names.push(latinish[Math.floor(Math.random() * latinish.length)]);

        // Style 7: Industry-specific creative names
        for (let i = 0; i < 3; i++) {
            const term = terms[Math.floor(Math.random() * terms.length)];
            const prefix = ['Pro', 'Neo', 'Hyper', 'Ultra', 'Meta'][Math.floor(Math.random() * 5)];
            names.push(prefix + term);
        }

        // Remove duplicates and return
        return [...new Set(names)].slice(0, count);
    }

    /**
     * Analyze user intent with fuzzy matching
     */
    analyzeUserIntent(userMessage) {
        const msg = userMessage.toLowerCase();

        // Logo intent - comprehensive trigger list
        const logoTriggers = [
            'logo', 'brand design', 'brand identity', 'visual identity', 'company logo',
            'brand logo', 'make a logo', 'create logo', 'design logo', 'generate logo',
            'logo ideas', 'logo concept', 'logo for my', 'design me a logo', 'make me a logo',
            'brand mark', 'create a brand', 'design a brand', 'brand image'
        ];
        if (logoTriggers.some(t => msg.includes(t))) {
            return { type: 'logo_generation', priority: 1 };
        }

        // Name generation intent - comprehensive trigger list
        const nameTriggers = [
            'business name', 'company name', 'brand name', 'startup name', 'name ideas',
            'name suggestion', 'name my business', 'name my company', 'name my startup',
            'generate name', 'create name', 'what should i name', 'help me name',
            'good name for', 'suggest a name', 'name for my business', 'name for my company'
        ];
        if (nameTriggers.some(t => msg.includes(t))) {
            return { type: 'name_generation', priority: 1 };
        }

        // Situational advice
        const situationKeywords = [
            'what if', 'how do i handle', 'facing', 'advice on', 'conflict',
            'deadline', 'presentation tips', 'negotiation', 'anxiety', 'motivation'
        ];
        if (situationKeywords.some(kw => msg.includes(kw))) {
            return { type: 'situation_advice', priority: 2 };
        }

        // Task help
        if (/help me|i need|create|make|how to|build|write|generate|develop|design/.test(msg)) {
            return { type: 'task_help', priority: 2 };
        }

        // Knowledge learning
        if (/learn|add knowledge|teach|add document|from website/.test(msg)) {
            return { type: 'knowledge_learning', priority: 2 };
        }

        return { type: 'general', priority: 3 };
    }

    /**
     * Main response generator
     */
    generateResponse(userMessage) {
        const intent = this.analyzeUserIntent(userMessage);

        switch (intent.type) {
            case 'name_generation': {
                const industry = this.extractIndustry(userMessage);
                const names = this.generateBusinessNames(industry, 10);
                return `✨ **Business Name Ideas for ${industry.charAt(0).toUpperCase() + industry.slice(1)}:**\n\n${names.map((n, i) => `${i + 1}. **${n}**`).join('\n')}\n\n💡 *Each name is designed to be memorable, brandable, and available for domain registration. Want a logo for any of these?*`;
            }

            case 'logo_generation': {
                const industry = this.extractIndustry(userMessage);
                return `🎨 I'll generate logo designs for you! Tell me:\n\n1. **Business name** — What's the name?\n2. **Industry** — (e.g., clothing, tech, food, fitness, retail)\n3. **Style preference** — Modern / Classic / Bold / Minimal\n\nOr just say: *"Make a logo for [Business Name] — [Industry]"*`;
            }

            case 'situation_advice': {
                const situation = userMessage;
                const advice = this.getSituationalAdvice(situation);
                if (advice) return advice;
                break;
            }

            case 'knowledge_learning':
                return this.handleKnowledgeLearning(userMessage);
        }

        // Fallback knowledge base search
        const fallback = this.fallbackIntentMatching(userMessage);
        if (fallback) return fallback;

        return `🤖 I'm here to help with your business! I can:\n\n🏢 **Business Planning** — Plans, models, SWOT, roadmaps\n🎨 **Logo & Names** — Generate logos and brand names\n📣 **Marketing** — Content, SEO, social media, ads\n💰 **Finance** — Projections, funding, pricing, cash flow\n💼 **Sales & HR** — Strategy, hiring, performance\n⚙️ **Operations** — SOPs, processes, project management\n📱 **Product & Tech** — Roadmaps, MVPs, tech stack\n⚖️ **Legal** — Registration, terms, privacy, IP\n\nTry: *"Help me write a business plan"* or *"Create a logo for my clothing brand"*`;
    }

    /**
     * Get situational advice
     */
    getSituationalAdvice(situation) {
        const s = situation.toLowerCase();
        const adviceBank = {
            'conflict': 'Conflict Resolution Framework:\n1. Listen actively to all perspectives without judgment\n2. Acknowledge emotions and concerns\n3. Focus on interests (why), not positions (what)\n4. Brainstorm solutions together\n5. Agree on specific next steps\n6. Follow up after 1 week\n\n💡 Tips: Stay calm • Use "I" statements • Focus on the problem, not the person',
            'deadline': 'Deadline Crunch Strategy:\n1. Ruthlessly prioritise — what MUST be done vs. nice-to-have?\n2. Break the remaining work into 90-minute blocks\n3. Communicate proactively with stakeholders\n4. Delegate anything you can delegate\n5. Eliminate everything non-essential\n6. Execute with complete focus\n\n💡 Tips: Over-communicate early • Ask for help immediately • Done is better than perfect',
            'presentation': 'Presentation Success Framework:\n1. Know your audience deeply (what do they care about?)\n2. Open with a hook — problem, statistic, or story\n3. Use the "rule of three" — 3 key points maximum\n4. Show don\'t tell — use visuals over bullet points\n5. Tell a story with your data\n6. End with a clear, specific call to action\n\n💡 Tips: Practice with feedback • Prepare for tough questions • Arrive early',
            'negotiation': 'Negotiation Playbook:\n1. Research thoroughly — know their BATNA and yours\n2. Anchor first with a strong opening position\n3. Listen far more than you speak\n4. Never give without getting ("If I do X, you do Y")\n5. Use silence — it\'s your most powerful tool\n6. Document everything agreed\n\n💡 Tips: "No" starts negotiation, not ends it • Focus on interests not positions',
            'failure': 'Recovering from Failure:\n1. Accept what happened — without self-judgment\n2. Analyze root causes (not symptoms)\n3. Extract the specific lesson\n4. Adjust your strategy with the lesson applied\n5. Restart with conviction\n6. Share learnings with your team\n\n💡 Tips: Failure is data • Resilience is built, not born • Speed of recovery matters more than perfection',
            'motivation': 'Rebuilding Motivation:\n1. Reconnect with your original why — why did you start?\n2. Set one meaningful goal you can win TODAY\n3. Celebrate small wins immediately\n4. Get an accountability partner\n5. Remove the biggest obstacle first\n6. Take a genuine rest (motivation requires recovery)\n\n💡 Tips: Energy management > time management • Motivation follows action — start small'
        };

        for (const [key, value] of Object.entries(adviceBank)) {
            if (s.includes(key)) return value;
        }
        return null;
    }

    /**
     * Fallback intent matching using knowledge base
     */
    fallbackIntentMatching(userMessage) {
        const message = userMessage.toLowerCase();
        const searchResults = this.searchKnowledge(message);

        if (searchResults.length > 0) {
            const topResult = searchResults[0];
            const knowledge = topResult.data;
            let response = `📚 **${topResult.topic.charAt(0).toUpperCase() + topResult.topic.slice(1)}**\n\n`;

            if (knowledge.definition) response += `📖 ${knowledge.definition}\n\n`;

            const items = knowledge.basics || knowledge.principles || knowledge.fundamentals;
            if (items) {
                response += `✓ Key Points:\n`;
                items.slice(0, 4).forEach(item => { response += `  • ${item}\n`; });
                response += '\n';
            }

            if (knowledge.content && Array.isArray(knowledge.content)) {
                response += `📋 Additional Info:\n`;
                knowledge.content.slice(0, 3).forEach(item => {
                    if (typeof item === 'string' && item.trim().length > 0) response += `  • ${item}\n`;
                });
            }

            if (knowledge.source === 'website' && knowledge.url) response += `\n🔗 Source: ${knowledge.url}`;
            return response;
        }
        return null;
    }

    handleKnowledgeLearning(userMessage) {
        const msg = userMessage.toLowerCase();

        if (msg.includes('add knowledge') || msg.includes('teach me about')) {
            const topicMatch = msg.match(/(?:add knowledge|teach me about)[:\s]+([^\n,]+)/i);
            const topic = topicMatch ? topicMatch[1].trim() : 'new topic';
            const definitionMatch = msg.match(/(?:definition|is)[:\s]+([^\n,]+)/i);
            const definition = definitionMatch ? definitionMatch[1].trim() : '';
            if (definition.length > 0) {
                const result = this.addKnowledge(topic, { definition, source: 'user-input' });
                return result.message;
            }
        }

        if (msg.includes('from website') || msg.includes('website:')) {
            const urlMatch = msg.match(/(?:from website|website)[:\s]+([^\s]+)/i);
            const url = urlMatch ? urlMatch[1].trim() : 'unknown-source';
            const topicMatch = msg.match(/(?:about|topic)[:\s]+([^-,]+)/i);
            const topic = topicMatch ? topicMatch[1].trim() : 'web-content';
            const summaryMatch = msg.match(/-\s+(.+)/);
            const summary = summaryMatch ? summaryMatch[1].trim() : 'Web content learned';
            const result = this.learnFromWebsite(url, topic, summary);
            return result.message;
        }

        return `📚 **Knowledge Learning Mode**\n\nYou can teach me about any topic!\n\n**1️⃣ Direct Knowledge:**\n"Add knowledge: Marketing is the process of promoting products"\n\n**2️⃣ From Website:**\n"Learn from website: https://example.com about topic - Key insights"\n\n**3️⃣ From Document:**\n"Add document about topic: Full text here"`;
    }

    // ── Knowledge Base ─────────────────────────────────────────────
    initializeKnowledgeBase() {
        return {
            'business': {
                definition: 'An organization engaged in commercial activities to generate income and create value.',
                basics: ['Requires proper planning and strategy', 'Market research is essential', 'Financial management is critical', 'Customer satisfaction drives success']
            },
            'startup': {
                definition: 'A young company founded to develop and validate a scalable business model.',
                stages: ['Ideation', 'Planning', 'Funding', 'Launch', 'Growth', 'Scale'],
                basics: ['Find product-market fit first', 'Validate before building', 'Hire slow, fire fast', 'Cash is king']
            },
            'marketing': {
                definition: 'The process of promoting and selling products or services through various channels.',
                strategies: ['Content Marketing', 'Social Media', 'Email Marketing', 'SEO', 'Paid Ads'],
                fundamentals: ['Know your target audience', 'Create valuable content', 'Use multiple channels', 'Measure and optimize']
            },
            'sales': {
                definition: 'The activity of selling goods or services to customers for revenue.',
                process: ['Prospecting', 'Qualification', 'Presentation', 'Objection Handling', 'Closing', 'Follow-up'],
                basics: ['Listen more than you talk', 'Solve problems, don\'t push products', 'Follow up consistently', 'Build relationships first']
            },
            'leadership': {
                definition: 'The ability to guide, influence, and inspire others toward common goals.',
                qualities: ['Clear vision and communication', 'Emotional intelligence', 'Integrity and consistency', 'Decision-making clarity', 'Accountability'],
                basics: ['Lead by example', 'Give credit generously', 'Take blame quickly', 'Develop your people']
            },
            'finance': {
                definition: 'The management of money, investments, and financial planning for business growth.',
                basics: ['Cash flow is king', 'Revenue is vanity, profit is sanity, cash is reality', 'Know your numbers daily', 'Budget before you spend']
            },
            'entrepreneurship': {
                definition: 'The process of designing, launching, and running a new business venture.',
                basics: ['Solve a real problem', 'Validate before building', 'Focus on customers obsessively', 'Fail fast and learn faster']
            },
            'innovation': {
                definition: 'The introduction of new ideas, methods, or products that create value.',
                basics: ['Innovation comes from deeply understanding customer frustrations', 'Combine existing ideas in new ways', 'Build a culture of experimentation', 'Kill ideas that don\'t survive testing']
            }
        };
    }

    loadUserDocuments() {
        const stored = localStorage.getItem('chatbot_knowledge_base');
        return stored ? JSON.parse(stored) : {};
    }

    addKnowledge(topic, data) {
        const normalizedTopic = topic.toLowerCase().trim();
        this.userDocuments[normalizedTopic] = { ...data, addedDate: new Date().toISOString(), source: data.source || 'user-input' };
        localStorage.setItem('chatbot_knowledge_base', JSON.stringify(this.userDocuments));
        return { success: true, message: `✅ Knowledge added for "${topic}". I can now answer questions about this topic.`, topic: normalizedTopic };
    }

    learnFromText(text, topic) {
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        return this.addKnowledge(topic, { definition: lines[0] || `Information about ${topic}`, content: lines, source: 'document' });
    }

    learnFromWebsite(url, topic, summary) {
        return this.addKnowledge(topic, { definition: summary || `Information from ${url}`, source: 'website', url, content: [summary] });
    }

    getKnowledge(topic) {
        const nt = topic.toLowerCase().trim();
        return this.userDocuments[nt] || this.knowledgeBase[nt] || null;
    }

    searchKnowledge(query) {
        const queryWords = query.toLowerCase().split(/\s+/);
        const allKnowledge = { ...this.knowledgeBase, ...this.userDocuments };
        const results = [];

        for (const [topic, data] of Object.entries(allKnowledge)) {
            let score = 0;
            queryWords.forEach(word => {
                if (word.length > 2) {
                    if (topic.includes(word)) score += 10;
                    if (data.definition && data.definition.toLowerCase().includes(word)) score += 5;
                    if (data.content && Array.isArray(data.content)) {
                        if (data.content.join(' ').toLowerCase().includes(word)) score += 3;
                    }
                }
            });
            if (score > 0) results.push({ topic, data, score });
        }

        return results.sort((a, b) => b.score - a.score);
    }

    // ── Helper Methods ─────────────────────────────────────────────
    getIndustryTerms(industry) {
        const terms = {
            'tech': ['Byte', 'Cloud', 'Logic', 'Matrix', 'Pixel', 'Node', 'Sync', 'Stack'],
            'finance': ['Capital', 'Wealth', 'Invest', 'Trust', 'Equiti', 'Portfolio', 'Vest', 'Fund'],
            'health': ['Care', 'Vital', 'Heal', 'Wellness', 'Life', 'Medical', 'Cure', 'Clinic'],
            'retail': ['Shop', 'Store', 'Style', 'Choice', 'Market', 'Find', 'Pick', 'Fetch'],
            'clothing': ['Thread', 'Stitch', 'Fiber', 'Drape', 'Style', 'Trim', 'Weave', 'Knit'],
            'food': ['Bite', 'Savor', 'Feast', 'Nourish', 'Plate', 'Table', 'Flavor', 'Zest'],
            'fitness': ['Forge', 'Lift', 'Stride', 'Pulse', 'Drive', 'Peak', 'Surge', 'Vigor'],
            'beauty': ['Bloom', 'Glow', 'Petal', 'Shine', 'Radiance', 'Aura', 'Flush', 'Gleam'],
            'education': ['Learn', 'Skill', 'Wisdom', 'Path', 'Grow', 'Mind', 'Mentor', 'Quest'],
            'consulting': ['Advise', 'Expert', 'Insight', 'Strategy', 'Clarity', 'Think', 'Guide', 'Solve'],
            'real_estate': ['Key', 'Place', 'Haven', 'Ground', 'Space', 'Nest', 'Land', 'Built'],
            'travel': ['Drift', 'Journey', 'Globe', 'Voyage', 'Explore', 'Wander', 'Quest', 'Trek'],
            'marketing': ['Reach', 'Pulse', 'Signal', 'Voice', 'Amplify', 'Boost', 'Drive', 'Spark'],
            'default': ['Pro', 'Smart', 'Elite', 'Dynamic', 'Future', 'Quantum', 'Infinite', 'Apex']
        };

        for (const [key, termList] of Object.entries(terms)) {
            if (industry.includes(key) || key.includes(industry)) return termList;
        }
        return terms['default'];
    }

    extractIndustry(message) {
        const industries = [
            'clothing', 'fashion', 'apparel', 'tech', 'technology', 'software', 'saas',
            'food', 'restaurant', 'cafe', 'health', 'medical', 'fitness', 'gym',
            'beauty', 'salon', 'real estate', 'property', 'education', 'training',
            'consulting', 'finance', 'banking', 'retail', 'ecommerce', 'travel',
            'marketing', 'advertising', 'legal', 'agriculture', 'auto', 'automotive'
        ];

        const msg = message.toLowerCase();
        for (const industry of industries) {
            if (msg.includes(industry)) return industry;
        }
        return 'general';
    }

    initializeRoleContexts() {
        return {
            'entrepreneur': { tasks: ['business plan', 'pitch deck', 'market analysis', 'financial projections', 'startup roadmap'] },
            'developer': { tasks: ['code review', 'architecture design', 'debugging', 'api documentation', 'deployment'] },
            'designer': { tasks: ['brand identity', 'color scheme', 'typography', 'user flow', 'design system'] },
            'marketer': { tasks: ['campaign strategy', 'content calendar', 'audience analysis', 'seo strategy', 'social media'] },
            'manager': { tasks: ['team planning', 'project timeline', 'performance review', 'communication plan'] },
            'sales': { tasks: ['sales pitch', 'negotiation strategy', 'customer research', 'closing techniques', 'pipeline'] },
            'hr': { tasks: ['hiring strategy', 'employee handbook', 'performance metrics', 'training plan', 'culture'] },
            'finance': { tasks: ['budget planning', 'financial analysis', 'cash flow projection', 'investment analysis'] }
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotEnhancements;
}
