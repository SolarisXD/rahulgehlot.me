export type StackDecision = {
  choice: string;
  alternative: string;
  reasoning: string;
};

export const stackDecisions: StackDecision[] = [
  {
    choice: 'AES-256 encrypted SQLite over plain SQLite',
    alternative: 'Unencrypted SQLite or application-layer encryption',
    reasoning: 'Financial data at rest without encryption is unacceptable on client hardware. Page-level AES-256 is battle-tested, zero-config, and leaves no custom crypto attack surface.',
  },
  {
    choice: 'Pure NumPy inference over PyTorch serving',
    alternative: 'Serve the PyTorch model directly in production',
    reasoning: "PyTorch's runtime overhead is unnecessary for static inference. A pure NumPy forward pass is faster, crash-resistant, and eliminated production backend crashes.",
  },
  {
    choice: 'Automated test suite for Hisaab Pro',
    alternative: 'Manual QA or post-deployment bug fixing',
    reasoning: 'Silent wrong accounting is worse than a crash. The test suite ensures any regression in payroll or ledger logic fails the build before reaching client books.',
  },
  {
    choice: 'Offline-first SQLite over cloud sync for PulseSense',
    alternative: 'Firebase / Supabase with real-time sync',
    reasoning: 'Privacy is the core product. Storing structured health data locally via SQLite avoids cloud database dependencies, mandatory accounts, and network latency.',
  },
];
