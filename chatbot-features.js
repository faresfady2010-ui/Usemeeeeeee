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
     * Get situational advice
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
                advice: 'Presentation Success:\n1. Know your audience deeply\n2. Start with a hook (problem, stat, question)\n3. Use the rule of 3 for main points\n4. Show, don\'t tell (use visuals)\n5. End with clear call-to-action',
                tips: ['Practice with real feedback', 'Prepare for tough questions', 'Arrive early to test tech']
            },
            'negotiation': {
                advice: 'Negotiation Tactics:\n1. Research and prepare thoroughly\n2. Start with your ideal, not your limit\n3. Listen more than you talk\n4. Focus on interests, not positions\n5. Have multiple solutions ready',
                tips: ['Silence is powerful', 'Create win-win solutions', 'Document agreements']
            },
            'decision': {
                advice: 'Decision-Making Framework:\n1. Define the decision clearly\n2. Gather relevant information\n3. Identify 3+ options\n4. List pros/cons for each\n5. Consider worst-case scenario',
                tips: ['Don\'t overthink', 'Get input from smart people', 'Any decision beats no decision']
            },
            'failure': {
                advice: 'Recovering from Failure:\n1. Accept responsibility\n2. Analyze what went wrong\n3. Extract the lesson\n4. Adjust strategy\n5. Move forward with conviction',
                tips: ['Failure is feedback', 'Share learnings with team', 'Stay resilient']
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
     * Get role-specific task assistance
     */
    getRoleTaskAssistance(role, task) {
        const normalizedRole = role.toLowerCase();
        const roleData = this.roleContexts[normalizedRole];

        if (!roleData) {
            return `I can help with tasks for: ${Object.keys(this.roleContexts).join(', ')}.\n\nPlease specify your role and what you need help with.`;
        }

        const taskGuides = {
            'business plan': `BUSINESS PLAN STRUCTURE:\n1. Executive Summary (1 page)\n2. Company Description\n3. Market Analysis\n4. Organization\n5. Service/Product Line\n6. Marketing Strategy\n7. Financial Projections\n8. Funding Requirements`,
            'pitch deck': `PITCH DECK STRUCTURE (10-15 slides):\n1. Title Slide\n2. The Problem\n3. Your Solution\n4. Market Size\n5. Business Model\n6. Traction\n7. Team\n8. Competition\n9. Use of Funds\n10. Call to Action`,
            'code review': `CODE REVIEW CHECKLIST:\n✓ Functionality\n✓ Code Quality\n✓ Security\n✓ Performance\n✓ Testing\n✓ Documentation\n✓ Style`,
            'ui/ux design': `UX DESIGN PROCESS:\n1. Research\n2. Wireframing\n3. Prototyping\n4. User Testing\n5. Visual Design\n6. Accessibility Testing\n7. Iteration`,
            'campaign strategy': `MARKETING CAMPAIGN FRAMEWORK:\n1. Goal\n2. Audience\n3. Message\n4. Channels\n5. Creative\n6. Budget\n7. Timeline\n8. Metrics`,
            'default': `TASK COMPLETION FRAMEWORK:\n1. CLARIFY - Define deliverable\n2. PLAN - Break into sub-tasks\n3. EXECUTE - Follow your plan\n4. REVIEW - Check success\n5. DELIVER - Present professionally`
        };

        const guidance = taskGuides[task.toLowerCase()] || taskGuides['default'];
        return `${role.charAt(0).toUpperCase() + role.slice(1)} - ${task}\n\n${guidance}`;
    }

    /**
     * Analyze user intent
     */
    analyzeUserIntent(userMessage) {
        const msg = userMessage.toLowerCase();
        
        if (msg.includes('generate name') || msg.includes('business name')) {
            return { type: 'name_generation', priority: 1 };
        }
        if (msg.includes('logo')) {
            return { type: 'logo_generation', priority: 1 };
        }

        for (const role of Object.keys(this.roleContexts)) {
            if (msg.includes(role)) {
                return { type: 'role_identified', role, priority: 2 };
            }
        }

        const situationKeywords = ['what if', 'how do i handle', 'facing', 'advice', 'conflict', 'deadline', 'presentation', 'negotiation'];
        if (situationKeywords.some(keyword => msg.includes(keyword))) {
            return { type: 'situation_advice', priority: 2 };
        }

        if (msg.includes('help me') || msg.includes('i need') || msg.includes('create')) {
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
                return `✨ Generated Business Names for ${industry}:\n\n${names.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\nWould you like logo suggestions for any of these?`;
            }

            case 'logo_generation': {
                const businessName = this.extractBusinessName(userMessage) || 'Your Business';
                const industry = this.extractIndustry(userMessage);
                const logos = this.generateLogoSuggestions(businessName, industry);
                return `🎨 Logo Design Suggestions for ${businessName}:\n\n${logos.map((logo, i) => 
                    `${i + 1}. ${logo.concept}\n   ${logo.description}`
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
                return this.getRoleTaskAssistance(intent.role, task);
            }

            case 'task_help': {
                const task = this.extractTask(userMessage);
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
        return `🤖 I'm here to help with:\n\n💼 **Business Names & Logos** - Generate creative names and logo ideas\n💡 **Situational Advice** - Get guidance on conflicts, deadlines, presentations, negotiations\n👔 **Role-Specific Guidance** - Help tailored to your profession\n📚 **Learn & Remember** - Add your own knowledge and documents\n\n📝 **Example Questions:**\n• "Generate names for tech startup"\n• "Help me with code review"\n• "How handle team conflict?"\n• "Add knowledge about marketing"\n• "Learn from website: [topic]"\n\n💾 Your knowledge is saved locally!`;
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
        return `📚 **Knowledge Learning Mode**\n\nYou can teach me about any topic! Here are the formats:\n\n**1️⃣ Direct Knowledge:**\n"Add knowledge: Marketing is the process of promoting products. Key points: SEO, Content, Social Media"\n\n**2️⃣ From Website:**\n"Learn from website: https://example.com about AI\n- Artificial Intelligence is..."\n\n**3️⃣ From Document:**\n"Add document about Python:\nPython is a programming language\nUsed for web, data science, automation"\n\n💾 **All knowledge is saved locally** and used when answering future questions!\n\n🔍 Try any topic - business, technology, personal development, etc!`;
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
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatbotEnhancements;
}
