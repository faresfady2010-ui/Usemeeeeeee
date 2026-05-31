/**
 * Enhanced Chatbot Features
 * - Name and Logo Generation
 * - Situational Advice
 * - Role-Specific Task Completion
 */

class ChatbotEnhancements {
    constructor() {
        this.roleContexts = this.initializeRoleContexts();
        this.generatedNames = [];
        this.generatedLogos = [];
    }

    /**
     * Initialize context for different professional roles
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
     * Generate creative business names
     * @param {string} industry - Industry/business type
     * @param {string} style - Style preference (modern, classic, playful, etc.)
     * @returns {Array} Array of generated names
     */
    generateBusinessNames(industry, style = 'modern') {
        const prefixes = ['Pro', 'Next', 'Smart', 'Swift', 'Prime', 'Peak', 'Pulse', 'Flow', 'Nexus', 'Zenith', 'Apex', 'Spark'];
        const suffixes = ['Hub', 'Lab', 'Works', 'Studio', 'Tech', 'Solutions', 'Systems', 'Group', 'Ventures', 'Labs', 'Co'];
        const industryTerms = this.getIndustryTerms(industry);

        const names = [];

        // Generate combination names
        for (let i = 0; i < 3; i++) {
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
            names.push(`${prefix}${suffix}`);
        }

        // Generate industry-based names
        for (let i = 0; i < 2; i++) {
            const term = industryTerms[Math.floor(Math.random() * industryTerms.length)];
            const modifier = prefixes[Math.floor(Math.random() * prefixes.length)];
            names.push(`${term} ${modifier}`);
        }

        // Generate acronym-style names
        const acronym = this.generateAcronym(industry);
        names.push(acronym);

        this.generatedNames = names;
        return names;
    }

    /**
     * Generate logo design suggestions
     * @param {string} businessName - Business name
     * @param {string} industry - Industry type
     * @returns {Array} Array of logo concepts
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
     * Provide situational advice for specific scenarios
     * @param {string} situation - Describe the situation
     * @param {string} context - Additional context
     * @returns {string} Actionable advice
     */
    getSituationalAdvice(situation, context = '') {
        const situationKeywords = situation.toLowerCase();
        
        const adviceBank = {
            'conflict': {
                advice: 'Conflict Resolution Framework:\n1. Listen actively to understand all perspectives\n2. Acknowledge emotions without judgment\n3. Focus on common goals\n4. Brainstorm solutions together\n5. Agree on next steps and follow up',
                tips: ['Stay calm and professional', 'Use "I" statements', 'Separate people from the problem']
            },
            'deadline': {
                advice: 'Deadline Crunch Strategy:\n1. Prioritize ruthlessly - what MUST be done?\n2. Break into smaller milestones\n3. Communicate realistic timelines\n4. Delegate where possible\n5. Focus on MVP first, polish later',
                tips: ['Over-communicate delays early', 'Ask for help proactively', 'Set buffer time']
            },
            'presentation': {
                advice: 'Presentation Success:\n1. Know your audience deeply\n2. Start with a hook (problem, stat, question)\n3. Use the rule of 3 for main points\n4. Show, don\'t tell (use visuals)\n5. End with clear call-to-action\n6. Practice out loud multiple times',
                tips: ['Practice with real feedback', 'Prepare for tough questions', 'Arrive early to test tech']
            },
            'negotiation': {
                advice: 'Negotiation Tactics:\n1. Research and prepare thoroughly\n2. Start with your ideal, not your limit\n3. Listen more than you talk\n4. Focus on interests, not positions\n5. Have multiple solutions ready\n6. Know your walk-away point',
                tips: ['Silence is powerful', 'Create win-win solutions', 'Document agreements']
            },
            'decision': {
                advice: 'Decision-Making Framework:\n1. Define the decision clearly\n2. Gather relevant information\n3. Identify 3+ options\n4. List pros/cons for each\n5. Consider worst-case scenario\n6. Trust your gut after analysis\n7. Set a review date',
                tips: ['Don\'t overthink', 'Get input from smart people', 'Remember: any decision beats no decision']
            },
            'failure': {
                advice: 'Recovering from Failure:\n1. Accept responsibility (but not blame)\n2. Analyze what went wrong\n3. Extract the lesson\n4. Adjust strategy\n5. Communicate transparently\n6. Move forward with conviction',
                tips: ['Failure is feedback, not final', 'Share learnings with team', 'Stay resilient']
            },
            'hiring': {
                advice: 'Hiring Strategy:\n1. Define role requirements clearly\n2. Look for culture fit AND skills\n3. Ask behavior-based questions\n4. Check references thoroughly\n5. Have multiple interview rounds\n6. Trust team feedback',
                tips: ['First interview: screening only', 'Watch for red flags', 'Negotiate fairly']
            },
            'scaling': {
                advice: 'Scaling Your Business:\n1. Perfect your current model first\n2. Document all processes\n3. Build a strong team\n4. Systematize everything\n5. Track key metrics\n6. Scale gradually and test',
                tips: ['Don\'t scale too fast', 'Culture matters more as you grow', 'Maintain quality']
            }
        };

        for (const [key, value] of Object.entries(adviceBank)) {
            if (situationKeywords.includes(key)) {
                return value.advice + '\n\n💡 Tips: ' + value.tips.join(' • ');
            }
        }

        // Generic situational advice
        return `Situational Analysis for: ${situation}\n\n` +
               `1. Assess Current State:\n   - What exactly is happening?\n   - Who is involved?\n   - What's the timeline?\n\n` +
               `2. Identify Options:\n   - What are 3 possible approaches?\n   - What are the trade-offs?\n   - Which aligns with your values?\n\n` +
               `3. Take Action:\n   - Choose your approach\n   - Execute with clarity\n   - Monitor and adjust\n\n` +
               `${context ? `Additional Context: ${context}` : ''}`;
    }

    /**
     * Get role-specific task assistance
     * @param {string} role - Professional role
     * @param {string} task - Specific task
     * @returns {string} Task guidance
     */
    getRoleTaskAssistance(role, task) {
        const normalizedRole = role.toLowerCase();
        const roleData = this.roleContexts[normalizedRole];

        if (!roleData) {
            return `I can help with tasks for: ${Object.keys(this.roleContexts).join(', ')}.\n\nPlease specify your role and what you need help with.`;
        }

        const taskGuides = {
            'business plan': `BUSINESS PLAN STRUCTURE:
1. Executive Summary (1 page) - Hook, problem, solution, market size
2. Company Description - Mission, vision, values
3. Market Analysis - Industry trends, target audience, competition
4. Organization - Structure, key team members, roles
5. Service/Product Line - What you offer, unique value
6. Marketing Strategy - How you'll reach customers
7. Financial Projections - Revenue, expenses, break-even
8. Funding Requirements - How much and how you'll use it

Pro Tips: Keep it 20-30 pages, update quarterly, make it action-oriented.`,

            'pitch deck': `PITCH DECK STRUCTURE (10-15 slides):
1. Title Slide
2. The Problem - Make it relatable
3. Your Solution - Show, don't tell
4. Market Size - Total Addressable Market (TAM)
5. Business Model - How you make money
6. Traction - Proof points, metrics
7. Team - Why you can execute
8. Competition - Your differentiation
9. Use of Funds - Where money goes
10. Call to Action - What you're asking for

Pro Tips: Tell a story, use visuals, practice timing (15 mins), anticipate questions.`,

            'code review': `CODE REVIEW CHECKLIST:
✓ Functionality - Does it work as intended?
✓ Code Quality - Is it clean and maintainable?
✓ Security - Any vulnerabilities?
✓ Performance - Efficient algorithms?
✓ Testing - Adequate test coverage?
✓ Documentation - Clear comments?
✓ Style - Follows conventions?

Giving Feedback: Be constructive, praise good work, ask questions, suggest improvements.`,

            'ui/ux design': `UX DESIGN PROCESS:
1. Research - User interviews, surveys, testing
2. Wireframing - Low-fidelity layouts
3. Prototyping - Interactive mockups
4. User Testing - Get feedback early
5. Visual Design - Colors, typography, spacing
6. Testing - Usability and accessibility
7. Iteration - Refine based on feedback

Golden Rules: Consistency, clarity, accessibility, mobile-first, reduce friction.`,

            'campaign strategy': `MARKETING CAMPAIGN FRAMEWORK:
1. Goal - What are you trying to achieve?
2. Audience - Who are you targeting?
3. Message - What's your core message?
4. Channels - Where will you reach them?
5. Creative - Content, visuals, copy
6. Budget - Resource allocation
7. Timeline - When and how often?
8. Metrics - How will you measure success?

Pro Tips: Start with one channel, test, scale what works, track ROI.`,

            'default': `TASK COMPLETION FRAMEWORK:
Step 1: CLARIFY
- Define the exact deliverable
- Identify success metrics
- Set realistic timeline

Step 2: PLAN
- Break into sub-tasks
- Identify dependencies
- Allocate resources

Step 3: EXECUTE
- Follow your plan
- Document progress
- Flag blockers early

Step 4: REVIEW
- Check against success metrics
- Get feedback
- Iterate if needed

Step 5: DELIVER
- Present professionally
- Provide documentation
- Offer support for adoption`
        };

        const guidance = taskGuides[task.toLowerCase()] || taskGuides['default'];
        return `${role.charAt(0).toUpperCase() + role.slice(1)} - ${task}\n\n${guidance}`;
    }

    /**
     * Get industry-specific terms for name generation
     */
    getIndustryTerms(industry) {
        const terms = {
            'tech': ['Byte', 'Code', 'Net', 'Cloud', 'Data', 'Logic', 'Matrix', 'Cyber'],
            'finance': ['Capital', 'Wealth', 'Invest', 'Trust', 'Assets', 'Portfolio', 'Equity', 'Funds'],
            'health': ['Care', 'Vital', 'Heal', 'Wellness', 'Life', 'Medical', 'Health', 'Plus'],
            'retail': ['Shop', 'Store', 'Trends', 'Style', 'Choice', 'Market', 'Direct', 'Hub'],
            'consulting': ['Advise', 'Expert', 'Insight', 'Strategy', 'Clarity', 'Navigate', 'Thrive', 'Growth'],
            'education': ['Learn', 'Academy', 'Insight', 'Master', 'Edu', 'School', 'Institute', 'Smart'],
            'default': ['Pro', 'Smart', 'Elite', 'Dynamic', 'Future', 'Quantum', 'Velocity', 'Vision']
        };

        return terms[industry.toLowerCase()] || terms['default'];
    }

    /**
     * Generate acronym from industry/business type
     */
    generateAcronym(industry) {
        const words = industry.split(' ');
        return words.map(w => w.charAt(0).toUpperCase()).join('') || 'BIZ';
    }

    /**
     * Identify the user's intent and provide appropriate response
     */
    analyzeUserIntent(userMessage) {
        const msg = userMessage.toLowerCase();
        
        // Name/Logo generation
        if (msg.includes('generate name') || msg.includes('business name') || msg.includes('company name')) {
            return { type: 'name_generation', priority: 1 };
        }
        if (msg.includes('logo') || msg.includes('design suggestion')) {
            return { type: 'logo_generation', priority: 1 };
        }

        // Role detection
        for (const role of Object.keys(this.roleContexts)) {
            if (msg.includes(role) || msg.includes('i am a ' + role) || msg.includes('as a ' + role)) {
                return { type: 'role_identified', role, priority: 2 };
            }
        }

        // Situational advice
        const situationKeywords = ['what if', 'how do i handle', 'facing', 'dealing with', 'advice', 'help with situation', 'scenario'];
        if (situationKeywords.some(keyword => msg.includes(keyword))) {
            return { type: 'situation_advice', priority: 2 };
        }

        // Task request
        if (msg.includes('help me') || msg.includes('i need') || msg.includes('create') || msg.includes('build')) {
            return { type: 'task_help', priority: 2 };
        }

        return { type: 'general', priority: 3 };
    }

    /**
     * Generate comprehensive response based on user input
     */
    generateResponse(userMessage) {
        const intent = this.analyzeUserIntent(userMessage);
        
        switch (intent.type) {
            case 'name_generation': {
                const industry = this.extractIndustry(userMessage);
                const style = this.extractStyle(userMessage);
                const names = this.generateBusinessNames(industry, style);
                return `Generated Business Names for ${industry} industry (${style} style):\n\n${names.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\nWould you like me to suggest logos for any of these names?`;
            }

            case 'logo_generation': {
                const businessName = this.extractBusinessName(userMessage) || 'Your Business';
                const industry = this.extractIndustry(userMessage);
                const logos = this.generateLogoSuggestions(businessName, industry);
                return `Logo Design Suggestions for "${businessName}":\n\n${logos.map((logo, i) => 
                    `${i + 1}. ${logo.concept}\n   ${logo.description}\n   Colors: ${logo.colors.join(', ')}\n   Style: ${logo.style}`
                ).join('\n\n')}\n\nChoose the one that resonates with you and let me know!`;
            }

            case 'situation_advice': {
                const situation = this.extractSituation(userMessage);
                return this.getSituationalAdvice(situation);
            }

            case 'role_identified': {
                const task = this.extractTask(userMessage);
                return this.getRoleTaskAssistance(intent.role, task);
            }

            case 'task_help': {
                const role = this.extractRole(userMessage) || 'general';
                const task = this.extractTask(userMessage);
                return this.getRoleTaskAssistance(role, task);
            }

            default:
                return `I'm here to help with:\n\n` +
                       `💼 Business name and logo generation\n` +
                       `🎯 Role-specific guidance (entrepreneur, developer, designer, marketer, manager, etc.)\n` +
                       `📋 Task completion assistance\n` +
                       `💡 Situational advice for specific scenarios\n\n` +
                       `What can I help you with? You can ask things like:\n` +
                       `- "Generate business names for a tech startup"\n` +
                       `- "I'm a developer, help me with a code review process"\n` +
                       `- "How do I handle a conflict with a team member?"\n` +
                       `- "Suggest a logo for my consulting business"`;
        }
    }

    // Helper extraction methods
    extractIndustry(message) {
        const industries = ['tech', 'finance', 'health', 'retail', 'consulting', 'education'];
        for (const industry of industries) {
            if (message.toLowerCase().includes(industry)) return industry;
        }
        return 'general';
    }

    extractStyle(message) {
        const styles = ['modern', 'classic', 'playful', 'minimal', 'bold'];
        for (const style of styles) {
            if (message.toLowerCase().includes(style)) return style;
        }
        return 'modern';
    }

    extractBusinessName(message) {
        const match = message.match(/(?:for\s+)?["\']?([^"\',.?!]+)["\']?(?:\s+(?:logo|name|design))?/i);
        return match ? match[1].trim() : null;
    }

    extractSituation(message) {
        return message.replace(/^.*?(how|what|can|should|would).*?\?/i, '').trim() || 'general situation';
    }

    extractTask(message) {
        const taskKeywords = ['help', 'need', 'with', 'create', 'build', 'make', 'develop'];
        for (const keyword of taskKeywords) {
            if (message.toLowerCase().includes(keyword)) {
                return message.replace(keyword, '').trim();
            }
        }
        return 'general task';
    }

    extractRole(message) {
        for (const role of Object.keys(this.roleContexts)) {
            if (message.toLowerCase().includes(role)) return role;
        }
        return 'general';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotEnhancements;
}
