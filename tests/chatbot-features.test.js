const test = require('node:test');
const assert = require('node:assert/strict');
const ChatbotEnhancements = require('../chatbot-features.js');

const bot = new ChatbotEnhancements();

test('primary sector definitions answer the exact wording the user asked for', () => {
  const response = bot.generateResponse('what is primary sector');
  assert.match(response.toLowerCase(), /primary sector/i);
  assert.match(response.toLowerCase(), /farming|mining|agriculture|raw materials/i);
});

test('sector classification questions do not return business startup advice', () => {
  const response = bot.generateResponse('what sector is a restaurant in');
  assert.match(response.toLowerCase(), /tertiary sector/i);
  assert.doesNotMatch(response.toLowerCase(), /menu design|startup cost|location strategy/i);
});

test('restaurant sector questions get a tailored answer', () => {
  const response = bot.generateResponse('how do i start a restaurant business in dubai');
  assert.match(response.toLowerCase(), /restaurant|food/i);
  assert.match(response.toLowerCase(), /location|licen|staff|menu|cash flow/i);
});

test('franchise business type gets a specific answer', () => {
  const response = bot.generateResponse('how do i start a franchise business');
  assert.match(response.toLowerCase(), /franchise/i);
  assert.match(response.toLowerCase(), /brand|training|royalty|legal/i);
});

test('saas business type gets a clear model answer', () => {
  const response = bot.generateResponse('how do i start a saas company');
  assert.match(response.toLowerCase(), /saas|software as a service|subscription/i);
  assert.match(response.toLowerCase(), /customer|mrr|retention|pricing/i);
});
