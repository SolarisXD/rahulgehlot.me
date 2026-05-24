export type StackDecision = {
  choice: string;
  alternative: string;
  reasoning: string;
};

export const stackDecisions: StackDecision[] = [
  {
    choice: 'AES-256 encrypted SQLite over plain SQLite',
    alternative: 'Unencrypted SQLite or application-layer encryption',
    reasoning: 'Client financial data at rest with no encryption is unacceptable — especially for a desktop app running on hardware you don\'t control. Application-layer encryption means rolling your own crypto. Page-level AES-256 encryption is battle-tested and leaves no attack surface I wrote myself.',
  },
  {
    choice: 'Write-Ahead Logging (WAL) for Hisaab Pro',
    alternative: 'Default SQLite journal mode',
    reasoning: 'The businesses using Hisaab Pro work in environments where USB drives get removed mid-operation. WAL mode keeps the database consistent even in unclean shutdowns. Default journal mode doesn\'t give the same guarantee for that exact failure pattern.',
  },
  {
    choice: 'Pure NumPy inference over PyTorch serving',
    alternative: 'Serve the PyTorch model directly in production',
    reasoning: 'PyTorch carries significant overhead when you just need to run a trained model — loading the runtime, the model weights, the graph. A pure NumPy forward pass is faster to initialise, crash-resistant, and requires no PyTorch in the prod environment. Reduced backend crashes to near-zero.',
  },
  {
    choice: '475 Jest tests for Hisaab Pro',
    alternative: 'Manual QA or fewer unit tests',
    reasoning: 'Silent wrong accounting is worse than a crash. A crash is visible. A ledger that silently processes a transaction twice is not. The test suite exists so any change that breaks payroll logic fails before it reaches a client\'s books.',
  },
  {
    choice: 'Gemini Flash over OpenAI for the portfolio chatbot',
    alternative: 'OpenAI GPT-3.5, Mistral, Groq',
    reasoning: 'Gemini Flash has a free tier (1,500 req/day, 1M tokens/day) with no credit card required. For a portfolio chatbot with unknown traffic, starting free and upgrading when there\'s a reason to is the only rational default.',
  },
];
