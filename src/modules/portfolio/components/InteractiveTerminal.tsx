'use client';

import React, { FormEvent, useId, useMemo, useRef, useState } from 'react';

export interface TerminalCommand {
  command: string;
  output: string[];
  aliases?: string[];
}

interface TerminalEntry {
  id: number;
  prompt?: string;
  command?: string;
  output: string[];
  tone?: 'default' | 'error' | 'system';
}

interface InteractiveTerminalProps {
  prompt: string;
  commands: TerminalCommand[];
  initialEntries?: TerminalEntry[];
  placeholder?: string;
  className?: string;
}

export const InteractiveTerminal = ({
  prompt,
  commands,
  initialEntries = [],
  placeholder = 'help',
  className = '',
}: InteractiveTerminalProps) => {
  const [entries, setEntries] = useState<TerminalEntry[]>(initialEntries);
  const [inputValue, setInputValue] = useState('');
  const nextId = useRef(initialEntries.length + 1);
  const inputId = useId();

  const commandMap = useMemo(() => {
    const map = new Map<string, TerminalCommand>();

    commands.forEach((item) => {
      map.set(item.command.toLowerCase(), item);
      item.aliases?.forEach((alias) => map.set(alias.toLowerCase(), item));
    });

    return map;
  }, [commands]);

  const runCommand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const rawCommand = inputValue.trim();
    if (!rawCommand) return;

    if (rawCommand.toLowerCase() === 'clear') {
      setEntries([]);
      setInputValue('');
      return;
    }

    const knownCommand = commandMap.get(rawCommand.toLowerCase());
    const output = knownCommand
      ? knownCommand.output
      : [`command not found: ${rawCommand}`, 'type "help" to list available commands'];

    setEntries((current) => [
      ...current,
      {
        id: nextId.current++,
        prompt,
        command: rawCommand,
        output,
        tone: knownCommand ? 'default' : 'error',
      },
    ]);
    setInputValue('');
  };

  return (
    <div
      className={`terminal-surface font-label text-sm leading-7 text-zinc-300 ${className}`}
      onClick={(event) => {
        const input = event.currentTarget.querySelector('input');
        input?.focus();
      }}
    >
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {entry.command && (
              <div className="flex min-w-0 flex-wrap gap-x-2">
                <span className="text-[#39ff14]">{entry.prompt}</span>
                <span className="break-words text-on-surface">{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, index) => (
              <p
                key={`${entry.id}-${index}`}
                className={
                  entry.tone === 'error'
                    ? 'break-words text-[#ff5f56]'
                    : entry.tone === 'system'
                      ? 'break-words text-secondary'
                      : 'break-words text-zinc-400'
                }
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={runCommand} className="mt-4 flex min-w-0 flex-wrap items-center gap-x-2">
        <label htmlFor={inputId} className="text-[#39ff14]">
          {prompt}
        </label>
        <span className="relative inline-flex min-w-[10rem] flex-1 items-center">
          <input
            id={inputId}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder={placeholder}
            spellCheck={false}
            autoComplete="off"
            className="terminal-command-input w-full bg-transparent text-on-surface outline-none placeholder:text-zinc-600"
            aria-label="Terminal command"
          />
          {!inputValue && <span className="terminal-cursor terminal-cursor-real pointer-events-none absolute left-0" />}
        </span>
      </form>
    </div>
  );
};
