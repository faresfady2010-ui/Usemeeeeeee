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
        this.roleContexts = this.initializeRoleContexts();
        this.generatedNames = [];
        this.generatedLogos = [];
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.userDocuments = this.loadUserDocuments();
        this.conversationHistory = [];
    }

    /**
     * Initialize built-in knowledge base
     */
    initializeKnowledgeBase() {
        return {
            'business': {
                definition: 'A business is an organization or entity engaged in commercial, industrial, or professional activities to generate income and create value.',
                types: ['Sole Proprietorship', 'Partnership', 'Corporation', 'LLC', 'Non-profit'],
                basics: [
                    'Business requires proper planning and strategy',
                    'Market research is essential before starting',
                    'Financial management is critical',
                    'Customer satisfaction drives success',
                    'Innovation keeps businesses competitive'
                ]
            },
            'startup': {
                definition: 'A startup is a young company founded to develop and validate a scalable business model.',
                stages: ['Ideation', 'Planning', 'Funding', 'Launch', 'Growth', 'Scale'],
                challenges: [
                    'Securing funding and investors',
                    'Building the right team',
                    'Achieving product-market fit',
                    'Managing cash flow',
                    'Scaling operations efficiently'
                ]
            },
            'marketing': {
                definition: 'Marketing is the process of promoting and selling products or services through various channels.',
                strategies: ['Content Marketing', 'Social Media', 'Email Marketing', 'SEO', 'Paid Ads', 'Influencer Marketing'],
                fundamentals: [
                    'Know your target audience',
                    'Create valuable content',
                    'Use multiple channels',
                    'Measure and analyze results',
                    'Continuously optimize campaigns'
                ]
            },
            'sales': {
                definition: 'Sales is the activity of selling goods or services to customers for revenue.',
                techniques: ['Cold Calling', 'Consultative Selling', 'Solution Selling', 'Account-Based Selling'],
                process: [
                    'Prospecting - Find potential customers',
                    'Qualification - Assess fit and need',
                    'Presentation - Showcase value',
                    'Handling Objections - Address concerns',
                    'Closing - Secure commitment',
                    'Follow-up - Build relationships'
                ]
            },
            'customer service': {
                definition: 'Customer service is the support provided to customers before, during, and after purchase.',
                principles: [
                    'Listen actively to understand customer needs',
                    'Respond promptly to inquiries',
                    'Solve problems efficiently',
                    'Maintain professional communication',
                    'Follow up to ensure satisfaction'
                ],
                channels: ['Phone', 'Email', 'Chat', 'Social Media', 'In-person', 'Video Call']
            },
            'leadership': {
                definition: 'Leadership is the ability to guide, influence, and inspire others toward common goals.',
                styles: ['Autocratic', 'Democratic', 'Laissez-faire', 'Transformational', 'Situational', 'Servant Leadership'],
                qualities: [
                    'Vision and clarity',
                    'Emotional intelligence',
                    'Integrity and trust',
                    'Communication skills',
                    'Decision-making ability',
                    'Adaptability'
                ]
            },
            'teamwork': {
                definition: 'Teamwork is the collaborative effort of a group to achieve common objectives.',
                benefits: [
                    'Increased productivity',
                    'Better decision-making',
                    'Enhanced creativity',
                    'Improved employee satisfaction',
                    'Knowledge sharing'
                ],
                practices: [
                    'Clear communication',
                    'Define roles and responsibilities',
                    'Foster trust and respect',
                    'Celebrate wins together',
                    'Address conflicts promptly'
                ]
            },
            'project management': {
                definition: 'Project management is the discipline of planning, organizing, and managing resources to deliver projects.',
                methodologies: ['Waterfall', 'Agile', 'Scrum', 'Kanban', 'Lean', 'Six Sigma'],
                phases: ['Initiation', 'Planning', 'Execution', 'Monitoring', 'Closure'],
                tools: ['Gantt Charts', 'RACI Matrix', 'Risk Register', 'Burndown Charts']
            },
            'product development': {
                definition: 'Product development is the process of creating new or improved products to meet market needs.',
                stages: ['Ideation', 'Research', 'Prototyping', 'Testing', 'Launch', 'Post-launch'],
                considerations: [
                    'Market demand and trends',
                    'User feedback and testing',
                    'Cost and feasibility',
                    'Competition analysis',
                    'Regulatory compliance'
                ]
            },
            'finance': {
                definition: 'Finance is the management of money and investments for individuals, businesses, and organizations.',
                areas: ['Personal Finance', 'Corporate Finance', 'Public Finance', 'Investment Finance'],
                basics: [
                    'Budgeting and cash flow management',
                    'Revenue and expense tracking',
                    'Profit and loss analysis',
                    'Investment decisions',
                    'Risk management'
                ]
            }
        };
    }

    /**
     * Load user-added documents and knowledge
     */
    loadUserDocuments() {
        const stored = localStorage.getItem('chatbot_knowledge_base');
        return stored ? JSON.parse(stored) : {};
    }

    /**
     * Add new knowledge from user input, documents, or websites
     * @param {string} topic - Topic name
     * @param {object} data - Knowledge data {definition, content, examples, etc}
     */
    addKnowledge(topic, data) {
        const normalizedTopic = topic.toLowerCase().trim();
        
        this.userDocuments[normalizedTopic] = {
            ...data,
            addedDate: new Date().toISOString(),
            source: data.source || 'user-input'
        };
        
        localStorage.setItem('chatbot_knowledge_base', JSON.stringify(this.userDocuments));
        
        return {
            success: true,
            message: `✅ Knowledge added for "${topic}". The chatbot can now help with questions about this topic.`,
            topic: normalizedTopic
        };
    }

    /**
     * Parse and learn from plain text documents
     * @param {string} text - Document text
     * @param {string} topic - Main topic
     */
    learnFromText(text, topic) {
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        
        const knowledge = {
            definition: lines[0] || `Information about ${topic}`,
            content: lines,
            wordCount: text.split(/\s+/).length,
            source: 'document'
        };
        
        return this.addKnowledge(topic, knowledge);
    }

    /**
     * Extract key information from a URL (simulated - stores URL reference)
     * @param {string} url - Website URL
     * @param {string} topic - Main topic
     * @param {string} summary - User-provided summary
     */
    learnFromWebsite(url, topic, summary) {
        const knowledge = {
            definition: summary || `Information from ${url}`,
            source: 'website',
            url: url,
            content: [summary]
        };
        
        return this.addKnowledge(topic, knowledge);
    }

    /**
     * Get knowledge from local knowledge base
     */
    getKnowledge(topic) {
        const normalizedTopic = topic.toLowerCase().trim();
        
        // Check user documents first
        if (this.userDocuments[normalizedTopic]) {
            return this.userDocuments[normalizedTopic];
        }
        
        // Check built-in knowledge base
        if (this.knowledgeBase[normalizedTopic]) {
            return this.knowledgeBase[normalizedTopic];
        }
        
        return null;
    }

    /**
     * Search knowledge base for similar topics
     */
    searchKnowledge(query) {
        const queryWords = query.toLowerCase().split(/\s+/);
        const allKnowledge = { ...this.knowledgeBase, ...this.userDocuments };
        const results = [];
        
        for (const [topic, data] of Object.entries(allKnowledge)) {
            let relevanceScore = 0;
            
            // Check if query words match topic
            queryWords.forEach(word => {
                if (word.length > 2) {
                    if (topic.includes(word)) relevanceScore += 10;
                    if (data.definition && data.definition.toLowerCase().includes(word)) relevanceScore += 5;
                    if (data.content && Array.isArray(data.content)) {
                        const contentStr = data.content.join(' ').toLowerCase();
                        if (contentStr.includes(word)) relevanceScore += 3;
                    }
                }
            });
            
            if (relevanceScore > 0) {
                results.push({ topic, data, score: relevanceScore });
            }
        }
        
        return results.sort((a, b) => b.score - a.score);
    }

    /**
     * Fallback intent matching using knowledge base
     */
    fallbackIntentMatching(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Search for relevant knowledge
        const searchResults = this.searchKnowledge(message);
        
        if (searchResults.length > 0) {
            const topResult = searchResults[0];
            const knowledge = topResult.data;
            
            let response = `📚 **${topResult.topic.charAt(0).toUpperCase() + topResult.topic.slice(1)}**\n\n`;
            
            if (knowledge.definition) {
                response += `📖 Definition:\n${knowledge.definition}\n\n`;
            }
            
            if (knowledge.basics || knowledge.principles || knowledge.fundamentals) {
                const items = knowledge.basics || knowledge.principles || knowledge.fundamentals;
                response += `✓ Key Points:\n`;
                items.slice(0, 4).forEach(item => {
                    response += `  • ${item}\n`;
                });
                response += `\n`;
            }
            
            if (knowledge.content && Array.isArray(knowledge.content)) {
                response += `📋 Additional Info:\n`;
                knowledge.content.slice(0, 3).forEach(item => {
                    if (typeof item === 'string' && item.trim().length > 0) {
                        response += `  • ${item}\n`;
                    }
                });
            }
            
            if (knowledge.source === 'website' && knowledge.url) {
                response += `\n🔗 Source: ${knowledge.url}`;
            } else if (knowledge.source === 'document') {
                response += `\n📄 From: User Document`;
            }
            
            return response;
        }
        
        return null;
    }

    /**
     * Initialize role contexts
     */
    initializeRoleContexts() {
        return {
            'entrepreneur': {
                tasks: ['business plan', 'pitch deck', 'market analysis', 'financial projections', 'startup roadmap'],
                advice: 'entrepreneurship,startup,business strategy,fundraising,scaling'
            },
            'developer': {
                tasks: ['code review', 'architecture design', 'debugging', 'api documentation', 'deployment'],
                advice: 'programming,debugging,architecture,best practices,performance'
            },
            'designer': {
                tasks: ['ui/ux design', 'branding', 'color scheme', 'typography', 'user flow'],
                advice: 'design principles,user experience,accessibility,design trends,prototyping'
            },
            'marketer': {
                tasks: ['campaign strategy', 'content calendar', 'audience analysis', 'seo strategy', 'social media plan'],
                advice: 'marketing,branding,seo,content strategy,analytics'
            },
            'manager': {
                tasks: ['team planning', 'project timeline', 'risk assessment', 'performance review', 'communication'],
                advice: 'team management,project management,leadership,delegation,conflict resolution'
            },
            'sales': {
                tasks: ['sales pitch', 'negotiation strategy', 'customer research', 'closing techniques', 'pipeline management'],
                advice: 'sales strategy,closing techniques,objection handling,lead generation,customer retention'
            },
            'hr': {
                tasks: ['hiring strategy', 'employee handbook', 'performance metrics', 'training plan', 'culture development'],
                advice: 'recruitment,employee management,workplace culture,training,compliance'
            },
            'finance': {
                tasks: ['budget planning', 'financial analysis', 'cash flow projection', 'investment analysis', 'risk management'],
                advice: 'financial planning,budgeting,investment,taxation,financial reporting'
            }
        };
    }

    /**
     * Generate business names
     */
    generateBusinessNames(industry, style = 'modern') {
        const prefixes = ['Pro', 'Next', 'Smart', 'Swift', 'Prime', 'Peak', 'Pulse', 'Flow', 'Nexus', 'Zenith', 'Apex', 'Spark'];
        const suffixes = ['Hub', 'Lab', 'Works', 'Studio', 'Tech', 'Solutions', 'Systems', 'Group', 'Ventures', 'Labs', 'Co'];
        const industryTerms = this.getIndustryTerms(industry);

        const names = [];

        for (let i = 0; i < 3; i++) {
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
            names.push(`${prefix}${suffix}`);
        }

        for (let i = 0; i < 2; i++) {
            const term = industryTerms[Math.floor(Math.random() * industryTerms.length)];
            const modifier = prefixes[Math.floor(Math.random() * prefixes.length)];
            names.push(`${term} ${modifier}`);
        }

        const acronym = this.generateAcronym(industry);
        names.push(acronym);

        this.generatedNames = names;
        return names;
    }

    /**
     * Generate brand names with style variations
     */
    generateBrandNames(businessType, quantity = 10) {
        const brandPrefixes = ['Quantum', 'Velocity', 'Nexus', 'Aurora', 'Titan', 'Stellar', 'Zenith', 'Vigor', 'Compass', 'Horizon'];
        const brandSuffixes = ['AI', 'Labs', 'Works', 'Hub', 'Innovations', 'Technologies', 'Solutions', 'Studio', 'Ventures', 'Collective'];
        const brandModifiers = ['Pro', 'Plus', 'Elite', 'Prime', 'Max', 'Ultra', 'Pure', 'Smart', 'Advanced', 'Next'];

        const brands = [];
        for (let i = 0; i < quantity; i++) {
            const prefix = brandPrefixes[Math.floor(Math.random() * brandPrefixes.length)];
            const suffix = brandSuffixes[Math.floor(Math.random() * brandSuffixes.length)];
            const modifier = brandModifiers[Math.floor(Math.random() * brandModifiers.length)];
            
            const variations = [
                `${prefix}${suffix}`,
                `${modifier} ${prefix}`,
                `${prefix} ${businessType}`,
            ];
            
            brands.push(variations[Math.floor(Math.random() * variations.length)]);
        }
        
        return [...new Set(brands)].slice(0, quantity);
    }

    /**
     * Generate logo suggestions
     */
    generateLogoSuggestions(businessName, industry) {
        const logos = [
            {
                concept: 'Abstract Geometric',
                description: `Modern geometric shapes representing growth and innovation. Use primary brand colors with minimalist design. Perfect for tech and startup industries.`,
                colors: ['#007BFF', '#28A745', '#FFC107'],
                style: 'Minimalist, Modern'
            },
            {
                concept: 'Iconic Symbol',
                description: `Custom icon/symbol that represents your ${industry} business. Use negative space for sophistication. Consider what your business does visually.`,
                colors: ['#34495E', '#ECF0F1', '#E74C3C'],
                style: 'Professional, Timeless'
            },
            {
                concept: 'Wordmark',
                description: `Stylized typography of "${businessName}" with unique font treatment. Add subtle design element to one letter. Good for brand recognition.`,
                colors: ['#2C3E50', '#3498DB'],
                style: 'Typography-focused'
            },
            {
                concept: 'Mascot/Character',
                description: `Friendly character or mascot representing your brand personality. Memorable and versatile across platforms.`,
                colors: ['#F39C12', '#E67E22', '#D35400'],
                style: 'Approachable, Friendly'
            },
            {
                concept: 'Combination Mark',
                description: `Icon + wordmark combination for versatility. Icon works standalone, text with icon creates full logo.`,
                colors: ['#16A085', '#27AE60', '#229954'],
                style: 'Flexible, Professional'
            }
        ];

        this.generatedLogos = logos;
        return logos;
    }

    /**
     * Generate advanced logo concepts with detailed specifications
     */
    generateAdvancedLogoConcepts(businessName, industry, targetAudience = 'general') {
        const concepts = [
            {
                concept: 'Abstract Geometric',
                description: `Modern geometric shapes representing growth and innovation. Use primary brand colors with minimalist design. Perfect for tech and startup industries.`,
                colors: ['#007BFF', '#28A745', '#FFC107'],
                style: 'Minimalist, Modern',
                techniques: ['Negative space', 'Geometric shapes', 'Linear progression'],
                bestFor: ['Tech', 'Startup', 'Finance', 'SaaS'],
                inspiration: 'Think abstract but recognizable - like Airbnb or Slack'
            },
            {
                concept: 'Iconic Symbol',
                description: `Custom icon/symbol that represents your ${industry} business. Use negative space for sophistication. Consider what your business does visually.`,
                colors: ['#34495E', '#ECF0F1', '#E74C3C'],
                style: 'Professional, Timeless',
                techniques: ['Icon design', 'Symbolic meaning', 'Memorable mark'],
                bestFor: ['Healthcare', 'Finance', 'Education', 'Professional Services'],
                inspiration: 'Apple, Nike, Target - simple and iconic'
            },
            {
                concept: 'Wordmark/Logotype',
                description: `Stylized typography of "${businessName}" with unique font treatment. Add subtle design element to one letter. Excellent for brand recognition.`,
                colors: ['#2C3E50', '#3498DB'],
                style: 'Typography-focused',
                techniques: ['Custom font', 'Letter modification', 'Typography art'],
                bestFor: ['Media', 'Publishing', 'Entertainment', 'Luxury'],
                inspiration: 'Google, Sony, Coca-Cola - type as the brand'
            },
            {
                concept: 'Mascot/Character Logo',
                description: `Friendly character or mascot representing your brand personality. Memorable and versatile across platforms. Great for audience engagement.`,
                colors: ['#F39C12', '#E67E22', '#D35400'],
                style: 'Approachable, Friendly',
                techniques: ['Character design', 'Animation potential', 'Storytelling'],
                bestFor: ['Retail', 'Entertainment', 'Food & Beverage', 'Kids brands'],
                inspiration: 'Tweety Bird, Ronald McDonald, Geico Gecko'
            },
            {
                concept: 'Combination Mark',
                description: `Icon + wordmark combination for versatility. Icon works standalone, text with icon creates full logo. Maximum flexibility.`,
                colors: ['#16A085', '#27AE60', '#229954'],
                style: 'Flexible, Professional',
                techniques: ['Dual usage', 'Icon-text integration', 'Scalability'],
                bestFor: ['Multi-industry', 'Large corporations', 'Global brands'],
                inspiration: 'Amazon, Adidas, Firefox - works both ways'
            },
            {
                concept: '3D/Dimensional Logo',
                description: `Modern 3D rendered logo for premium feel. Adds depth and sophistication. Great for tech and luxury brands.`,
                colors: ['#FF6B6B', '#4ECDC4', '#44AF69'],
                style: 'Contemporary, Premium',
                techniques: ['3D rendering', 'Depth perception', 'Gradient shading'],
                bestFor: ['Technology', 'Luxury', 'Gaming', 'Innovation'],
                inspiration: 'Tesla, Adobe, Slack 3D versions'
            }
        ];

        return concepts;
    }

    /**
     * Get situational advice
     */
    getSituationalAdvice(situation, context = '') {
        const situationKeywords = situation.toLowerCase();
        
        const adviceBank = {
            'conflict': {
                advice: 'Conflict Resolution Framework:\n1. Listen actively to understand all perspectives\n2. Acknowledge emotions without judgment\n3. Focus on common goals\n4. Brainstorm solutions collaboratively\n5. Implement agreed actions\n6. Follow up to ensure resolution',
                tips: ['Stay calm and professional', 'Use "I" statements', 'Separate people from the problem', 'Focus on interests not positions', 'Seek win-win solutions']
            },
            'deadline': {
                advice: 'Deadline Crunch Strategy:\n1. Prioritize ruthlessly - what MUST be done?\n2. Break into smaller milestones\n3. Communicate realistic timelines\n4. Delegate where possible\n5. Identify what can be deferred\n6. Execute with focus',
                tips: ['Over-communicate delays early', 'Ask for help proactively', 'Set buffer time', 'Focus on quality critical items', 'Track progress daily']
            },
            'presentation': {
                advice: 'Presentation Success:\n1. Know your audience deeply\n2. Start with a hook (problem, stat, question)\n3. Use the rule of 3 for main points\n4. Show, don\'t tell (use visuals)\n5. Tell a story with data\n6. End with clear call-to-action',
                tips: ['Practice with real feedback', 'Prepare for tough questions', 'Arrive early to test tech', 'Use visual hierarchy', 'Engage, don\'t lecture']
            },
            'negotiation': {
                advice: 'Negotiation Tactics:\n1. Research and prepare thoroughly\n2. Start with your ideal, not your limit\n3. Listen more than you talk\n4. Focus on interests, not positions\n5. Have walk-away criteria ready\n6. Always leave room for agreement',
                tips: ['Silence is powerful', 'Create win-win solutions', 'Document agreements', 'Ask open questions', 'Find creative trades']
            },
            'decision': {
                advice: 'Decision-Making Framework:\n1. Define the decision clearly\n2. Gather relevant information\n3. Identify 3+ options\n4. List pros/cons for each\n5. Consider worst-case scenario\n6. Make a decision and commit',
                tips: ['Don\'t overthink', 'Get input from smart people', 'Any decision beats no decision', 'Set a deadline', 'Review decisions periodically']
            },
            'failure': {
                advice: 'Recovering from Failure:\n1. Accept responsibility\n2. Analyze what went wrong\n3. Extract the lesson\n4. Adjust strategy\n5. Move forward with conviction\n6. Share learnings with team',
                tips: ['Failure is feedback', 'Share learnings with team', 'Stay resilient', 'Focus on growth', 'Avoid blame games']
            },
            'anxiety': {
                advice: 'Managing Professional Anxiety:\n1. Acknowledge the anxiety without judgment\n2. Identify specific concerns\n3. Create an action plan\n4. Focus on controllables\n5. Practice self-care\n6. Seek support when needed',
                tips: ['Breathe deeply and slowly', 'Break tasks into small steps', 'Talk to mentors or counselors', 'Exercise regularly', 'Maintain perspective']
            },
            'motivation': {
                advice: 'Boosting Motivation:\n1. Reconnect with your why\n2. Set meaningful short-term goals\n3. Celebrate small wins\n4. Find an accountability partner\n5. Remove obstacles\n6. Take strategic breaks',
                tips: ['Celebrate progress', 'Visualize success', 'Find your inspiration', 'Help others', 'Mix up your routine']
            }
        };

        for (const [key, value] of Object.entries(adviceBank)) {
            if (situationKeywords.includes(key)) {
                return value.advice + '\n\n💡 Tips: ' + value.tips.join(' • ');
            }
        }

        return null;
    }

    /**
     * Get role-specific task assistance with advanced guidance
     */
    getRoleTaskAssistance(role, task) {
        const normalizedRole = role.toLowerCase();
        const roleData = this.roleContexts[normalizedRole];

        if (!roleData) {
            return `I can help with tasks for: ${Object.keys(this.roleContexts).join(', ')}.\n\nPlease specify your role and what you need help with.`;
        }

        const taskGuides = {
            'business plan': `BUSINESS PLAN STRUCTURE:\n1. Executive Summary (1 page)\n2. Company Description\n3. Market Analysis\n4. Organization\n5. Service/Product Line\n6. Marketing Strategy\n7. Financial Projections\n8. Funding Request\n9. Appendix`,
            'pitch deck': `PITCH DECK STRUCTURE (10-15 slides):\n1. Title Slide\n2. The Problem\n3. Your Solution\n4. Market Size\n5. Business Model\n6. Traction\n7. Team\n8. Competition\n9. Use of Funds\n10. Financial Projections`,
            'code review': `CODE REVIEW CHECKLIST:\n✓ Functionality - Does it work as intended?\n✓ Code Quality - Is it clean and maintainable?\n✓ Security - Are there vulnerabilities?\n✓ Performance - Is it optimized?\n✓ Testing - Is it well-tested?\n✓ Documentation - Is it clear?\n✓ Style - Does it follow standards?`,
            'ui/ux design': `UX DESIGN PROCESS:\n1. Research - Understand user needs\n2. Wireframing - Map user flows\n3. Prototyping - Create interactive mock\n4. User Testing - Validate with real users\n5. Visual Design - Apply branding\n6. Accessibility Testing - Ensure inclusivity\n7. Iteration - Refine based on feedback`,
            'campaign strategy': `MARKETING CAMPAIGN FRAMEWORK:\n1. Goal - What are we trying to achieve?\n2. Audience - Who are we targeting?\n3. Message - What's the key message?\n4. Channels - Where will we reach them?\n5. Creative - What content?\n6. Budget - How much to spend?\n7. Timeline - When to launch?\n8. Metrics - How to measure success?`,
            'sales pitch': `SALES PITCH STRUCTURE:\n1. Introduction - Establish credibility\n2. Hook - Grab attention\n3. Problem - What's the pain point?\n4. Solution - How do you solve it?\n5. Benefits - What's the value?\n6. Social Proof - Who else uses it?\n7. Call-to-Action - What's next?`,
            'financial analysis': `FINANCIAL ANALYSIS FRAMEWORK:\n1. Gather Data - Revenue, expenses, assets\n2. Calculate Ratios - Profitability, liquidity, efficiency\n3. Analyze Trends - Year-over-year changes\n4. Compare - Vs competitors, vs industry\n5. Identify Issues - What needs attention?\n6. Recommend Actions - Improvements\n7. Present Findings - Clear communication`,
            'team planning': `TEAM PLANNING PROCESS:\n1. Define Roles - Who does what?\n2. Set Goals - What are we achieving?\n3. Plan Timeline - When do we deliver?\n4. Allocate Resources - Budget and tools\n5. Establish Communication - How do we sync?\n6. Identify Risks - What could go wrong?\n7. Track Progress - Weekly check-ins`,
            'default': `TASK COMPLETION FRAMEWORK:\n1. CLARIFY - Define the deliverable clearly\n2. PLAN - Break into manageable sub-tasks\n3. EXECUTE - Follow your plan with focus\n4. REVIEW - Check that it meets requirements\n5. DELIVER - Present professionally\n6. ITERATE - Get feedback and improve`
        };

        const guidance = taskGuides[task.toLowerCase()] || taskGuides['default'];
        return `${role.charAt(0).toUpperCase() + role.slice(1)} - ${task}\n\n${guidance}`;
    }

    /**
     * Advanced task completion for any role
     */
    getAdvancedTaskGuidance(role, task, skillLevel = 'intermediate') {
        const guidance = {
            beginner: 'Basic overview and step-by-step instructions',
            intermediate: 'Detailed framework with best practices',
            advanced: 'Expert strategies, advanced techniques, and optimization'
        };

        const taskFramework = `
🎯 ADVANCED TASK COMPLETION - ${task.toUpperCase()}

📋 STRATEGIC FRAMEWORK:
1. CONTEXT ANALYSIS
   - Understand the business context
   - Identify stakeholders and their needs
   - Assess available resources
   - Consider timing and market conditions

2. DEEP PLANNING
   - Break down into logical phases
   - Create detailed timeline with milestones
   - Identify critical path items
   - Plan for contingencies

3. EXECUTION EXCELLENCE
   - Apply best practices from your industry
   - Leverage templates and frameworks
   - Maintain quality standards
   - Document progress

4. QUALITY ASSURANCE
   - Review against requirements
   - Get feedback from stakeholders
   - Refine and optimize
   - Prepare for scaling

5. DELIVERY & PRESENTATION
   - Present with confidence and clarity
   - Highlight key achievements
   - Show measurable results
   - Plan for next steps

💡 ADVANCED TIPS:
   • Anticipate challenges and prepare solutions
   • Leverage data and metrics to support decisions
   • Build in flexibility for changes
   • Create feedback loops for continuous improvement
   • Document learnings for future projects
`;

        return taskFramework;
    }

    /**
     * Analyze user intent
     */
    analyzeUserIntent(userMessage) {
        const msg = userMessage.toLowerCase();
        
        if (msg.includes('generate name') || msg.includes('business name') || msg.includes('brand name')) {
            return { type: 'name_generation', priority: 1 };
        }
        if (msg.includes('logo') || msg.includes('brand') || msg.includes('design')) {
            return { type: 'logo_generation', priority: 1 };
        }

        for (const role of Object.keys(this.roleContexts)) {
            if (msg.includes(role)) {
                return { type: 'role_identified', role, priority: 2 };
            }
        }

        const situationKeywords = ['what if', 'how do i handle', 'facing', 'advice', 'conflict', 'deadline', 'presentation', 'negotiation', 'anxiety', 'motivation'];
        if (situationKeywords.some(keyword => msg.includes(keyword))) {
            return { type: 'situation_advice', priority: 2 };
        }

        if (msg.includes('help me') || msg.includes('i need') || msg.includes('create') || msg.includes('make')) {
            return { type: 'task_help', priority: 2 };
        }

        if (msg.includes('learn') || msg.includes('add knowledge') || msg.includes('teach') || msg.includes('add document') || msg.includes('from website')) {
            return { type: 'knowledge_learning', priority: 2 };
        }

        return { type: 'general', priority: 3 };
    }

    /**
     * Main response generator with fallback
     */
    generateResponse(userMessage) {
        const intent = this.analyzeUserIntent(userMessage);
        
        switch (intent.type) {
            case 'name_generation': {
                const industry = this.extractIndustry(userMessage);
                const names = this.generateBusinessNames(industry);
                const brandNames = this.generateBrandNames(industry, 5);
                return `✨ Generated Business Names for ${industry}:\n\n${names.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\n🌟 Premium Brand Names:\n${brandNames.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\nWould you like logo suggestions for any of these?`;
            }

            case 'logo_generation': {
                const businessName = this.extractBusinessName(userMessage) || 'Your Business';
                const industry = this.extractIndustry(userMessage);
                const logos = this.generateAdvancedLogoConcepts(businessName, industry);
                return `🎨 Logo Design Suggestions for ${businessName}:\n\n${logos.map((logo, i) => 
                    `${i + 1}. ${logo.concept}\n   ${logo.description}\n   💡 Best for: ${logo.bestFor.join(', ')}\n   🎨 Techniques: ${logo.techniques.join(', ')}`
                ).join('\n\n')}`;
            }

            case 'situation_advice': {
                const situation = this.extractSituation(userMessage);
                const advice = this.getSituationalAdvice(situation);
                if (advice) return advice;
                break;
            }

            case 'role_identified': {
                const task = this.extractTask(userMessage);
                const skillLevel = this.extractSkillLevel(userMessage);
                if (this.isAdvancedRequest(userMessage)) {
                    return this.getAdvancedTaskGuidance(intent.role, task, skillLevel);
                }
                return this.getRoleTaskAssistance(intent.role, task);
            }

            case 'task_help': {
                const task = this.extractTask(userMessage);
                const skillLevel = this.extractSkillLevel(userMessage);
                if (this.isAdvancedRequest(userMessage)) {
                    return this.getAdvancedTaskGuidance('general', task, skillLevel);
                }
                return this.getRoleTaskAssistance('general', task);
            }

            case 'knowledge_learning': {
                return this.handleKnowledgeLearning(userMessage);
            }
        }

        // FALLBACK: Check knowledge base and search
        const fallbackResponse = this.fallbackIntentMatching(userMessage);
        if (fallbackResponse) {
            return fallbackResponse;
        }

        // Final fallback with helpful suggestions
        return `🤖 I'm here to help with:\n\n💼 **Business Names & Logos** - Generate creative business names and advanced logo designs\n🎨 **Brand Identity** - Premium branding concepts\n💡 **Situational Advice** - Get guidance on conflicts, deadlines, presentations, and more\n👔 **Role-Specific Tasks** - Help for entrepreneurs, developers, designers, marketers, managers, sales, HR, and finance roles\n📚 **Knowledge Base** - Learn and teach me about any topic\n🚀 **Advanced Guidance** - Expert strategies for any task\n\nWhat would you like help with?`;
    }

    /**
     * Handle knowledge learning requests
     */
    handleKnowledgeLearning(userMessage) {
        const msg = userMessage.toLowerCase();
        
        // Pattern: "add knowledge: topic is [X], definition: [Y], points: [Z]"
        if (msg.includes('add knowledge') || msg.includes('teach me about')) {
            const topicMatch = msg.match(/(?:add knowledge|teach me about)[:\s]+([^\n,]+)/i);
            const topic = topicMatch ? topicMatch[1].trim() : 'new topic';
            
            const definitionMatch = msg.match(/(?:definition|is)[:\s]+([^\n,]+)/i);
            const definition = definitionMatch ? definitionMatch[1].trim() : '';
            
            if (definition.length > 0) {
                const result = this.addKnowledge(topic, { 
                    definition,
                    source: 'user-input'
                });
                return result.message;
            }
        }
        
        // Pattern: "learn from website: [URL] about [topic] - [description]"
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
        
        // Pattern: "add document about [topic]: [content]"
        if (msg.includes('add document') || msg.includes('document about')) {
            const topicMatch = msg.match(/(?:add document|document about)[:\s]+([^:]+)/i);
            const topic = topicMatch ? topicMatch[1].trim() : 'document';
            
            const contentMatch = msg.match(/:\s+(.+)/s);
            const content = contentMatch ? contentMatch[1].trim() : '';
            
            if (content.length > 0) {
                const result = this.learnFromText(content, topic);
                return result.message;
            }
        }
        
        // Default knowledge learning help
        return `📚 **Knowledge Learning Mode**\n\nYou can teach me about any topic! Here are the formats:\n\n**1️⃣ Direct Knowledge:**\n"Add knowledge: Marketing is the process of promoting products or services"\n\n**2️⃣ From Website:**\n"Learn from website: https://example.com about topic - Key insights here"\n\n**3️⃣ From Document:**\n"Add document about topic: Full text content here"\n\nOnce added, I can help answer questions about these topics!`;
    }

    /**
     * Get all stored knowledge topics
     */
    getStoredTopics() {
        const allKnowledge = { ...this.knowledgeBase, ...this.userDocuments };
        const builtIn = Object.keys(this.knowledgeBase);
        const userAdded = Object.keys(this.userDocuments);
        
        return {
            builtIn,
            userAdded,
            total: Object.keys(allKnowledge).length
        };
    }

    /**
     * Export knowledge base
     */
    exportKnowledge() {
        const allKnowledge = { ...this.knowledgeBase, ...this.userDocuments };
        return JSON.stringify(allKnowledge, null, 2);
    }

    /**
     * Import knowledge base
     */
    importKnowledge(jsonData) {
        try {
            const imported = JSON.parse(jsonData);
            for (const [topic, data] of Object.entries(imported)) {
                this.userDocuments[topic] = data;
            }
            localStorage.setItem('chatbot_knowledge_base', JSON.stringify(this.userDocuments));
            return { success: true, message: `✅ Imported ${Object.keys(imported).length} knowledge topics` };
        } catch (e) {
            return { success: false, message: `❌ Error importing: ${e.message}` };
        }
    }

    /**
     * Clear all user knowledge (keep built-in)
     */
    clearUserKnowledge() {
        this.userDocuments = {};
        localStorage.setItem('chatbot_knowledge_base', JSON.stringify({}));
        return { success: true, message: '🗑️ User knowledge cleared. Built-in knowledge preserved.' };
    }

    // Helper methods
    getIndustryTerms(industry) {
        const terms = {
            'tech': ['Byte', 'Code', 'Net', 'Cloud', 'Data', 'Logic', 'Matrix', 'Pixel'],
            'finance': ['Capital', 'Wealth', 'Invest', 'Trust', 'Assets', 'Portfolio', 'Coin'],
            'health': ['Care', 'Vital', 'Heal', 'Wellness', 'Life', 'Medical', 'Plus'],
            'retail': ['Shop', 'Store', 'Trends', 'Style', 'Choice', 'Market', 'Buy'],
            'consulting': ['Advise', 'Expert', 'Insight', 'Strategy', 'Clarity', 'Think'],
            'education': ['Learn', 'Skill', 'Academy', 'Master', 'Wisdom', 'Path'],
            'default': ['Pro', 'Smart', 'Elite', 'Dynamic', 'Future', 'Quantum', 'Infinite']
        };

        return terms[industry.toLowerCase()] || terms['default'];
    }

    generateAcronym(industry) {
        const words = industry.split(' ');
        return words.map(w => w.charAt(0).toUpperCase()).join('') || 'BIZ';
    }

    extractIndustry(message) {
        const industries = ['tech', 'finance', 'health', 'retail', 'consulting', 'education', 'software', 'ai', 'ecommerce', 'saas'];
        for (const industry of industries) {
            if (message.toLowerCase().includes(industry)) return industry;
        }
        return 'general';
    }

    extractBusinessName(message) {
        const match = message.match(/(?:for\s+)?["\']?([^"\',.?!]+)["\']?(?:\s+(?:logo|name|design))?/i);
        return match ? match[1].trim() : null;
    }

    extractSituation(message) {
        return message.replace(/^.*?(how|what|can|should|would).*?\?/i, '').trim() || 'situation';
    }

    extractTask(message) {
        const taskKeywords = ['help', 'need', 'with', 'create', 'build', 'make', 'generate'];
        for (const keyword of taskKeywords) {
            if (message.toLowerCase().includes(keyword)) {
                return message.replace(keyword, '').trim();
            }
        }
        return 'general task';
    }

    extractSkillLevel(message) {
        const msg = message.toLowerCase();
        if (msg.includes('advanced') || msg.includes('expert') || msg.includes('complex')) return 'advanced';
        if (msg.includes('beginner') || msg.includes('basic') || msg.includes('simple')) return 'beginner';
        return 'intermediate';
    }

    isAdvancedRequest(message) {
        const msg = message.toLowerCase();
        return msg.includes('advanced') || msg.includes('expert') || msg.includes('complex') || msg.includes('how to') || msg.includes('strategy');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotEnhancements;
}
