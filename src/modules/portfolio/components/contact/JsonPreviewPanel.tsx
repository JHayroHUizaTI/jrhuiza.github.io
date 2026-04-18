import { CodeEditorShell } from './CodeEditorShell';
import { InteractiveTerminal, TerminalCommand } from '../InteractiveTerminal';

type CodeTokenVariant = 'plain' | 'key' | 'string' | 'value' | 'symbol';

interface CodeToken {
  text: string;
  variant: CodeTokenVariant;
}

interface CodeLineProps {
  number: number;
  tokens: CodeToken[];
}

const jsonLines: CodeToken[][] = [
  [{ text: '{', variant: 'symbol' }],
  [
    { text: '  ', variant: 'plain' },
    { text: '"status"', variant: 'key' },
    { text: ': ', variant: 'plain' },
    { text: '"available for projects"', variant: 'string' },
    { text: ',', variant: 'plain' },
  ],
  [
    { text: '  ', variant: 'plain' },
    { text: '"email"', variant: 'key' },
    { text: ': ', variant: 'plain' },
    { text: '"jhayro.huiza@tecsup.edu.pe"', variant: 'value' },
    { text: ',', variant: 'plain' },
  ],
  [
    { text: '  ', variant: 'plain' },
    { text: '"endpoint"', variant: 'key' },
    { text: ': ', variant: 'plain' },
    { text: '"/api/contact"', variant: 'value' },
    { text: ',', variant: 'plain' },
  ],
  [
    { text: '  ', variant: 'plain' },
    { text: '"validation"', variant: 'key' },
    { text: ': ', variant: 'plain' },
    { text: '"client + server"', variant: 'value' },
  ],
  [{ text: '}', variant: 'symbol' }],
];

const codeClasses: Record<CodeTokenVariant, string> = {
  key: 'text-secondary',
  plain: 'text-on-surface/85',
  string: 'text-[#39ff14]',
  symbol: 'text-[#39ff14]/80',
  value: 'text-on-surface/70',
};

const CodeLine = ({ number, tokens }: CodeLineProps) => (
  <div className="grid grid-cols-[2rem_1fr] gap-4 font-label text-[12px] leading-7 sm:grid-cols-[2.25rem_1fr] sm:text-[13px] sm:leading-8">
    <span className="select-none text-right tabular-nums text-zinc-600">{number}</span>
    <div className="min-w-0 whitespace-pre-wrap break-words">
      {tokens.map((token, index) => (
        <span key={`${number}-${index}`} className={codeClasses[token.variant]}>
          {token.text}
        </span>
      ))}
    </div>
  </div>
);

const contactCommands: TerminalCommand[] = [
  {
    command: 'help',
    output: ['available: ping, open endpoint, email, status, clear'],
  },
  {
    command: 'ping',
    output: ['pong: contact endpoint listening'],
  },
  {
    command: 'open endpoint',
    output: ['POST /api/contact', 'validation: client + server'],
    aliases: ['endpoint'],
  },
  {
    command: 'email',
    output: ['jhayro.huiza@tecsup.edu.pe'],
  },
  {
    command: 'status',
    output: ['available for projects'],
  },
];

export const JsonPreviewPanel = () => {
  return (
    <CodeEditorShell
      accent="secondary"
      fileIcon="&lt;/&gt;"
      fileName="contact_info.json"
      showWindowControls
      className="lg:mt-3"
    >
      <div
        className="px-4 py-6 transition-colors duration-300 sm:px-6 sm:py-6"
        style={{ background: 'rgba(4, 16, 8, 0.3)' }}
      >
        <div className="space-y-0.5">
          {jsonLines.map((tokens, index) => (
            <CodeLine key={index} number={index + 1} tokens={tokens} />
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <p className="font-label text-[12px] italic leading-7 text-zinc-600 sm:text-[13px]">
            {'// Ready for incoming messages'}
          </p>
          <InteractiveTerminal
            prompt="contact@api:~$"
            commands={contactCommands}
            placeholder="try ping"
            initialEntries={[
              {
                id: 0,
                command: 'status',
                prompt: 'contact@api:~$',
                output: ['available for projects'],
                tone: 'system',
              },
            ]}
          />
        </div>
      </div>
    </CodeEditorShell>
  );
};
