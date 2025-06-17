import { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll_area';
import { Terminal, ChevronRight, Power, Wifi, HardDrive, Cpu, Activity } from 'lucide-react';

interface Command {
  id: string;
  command: string;
  output: string[];
  timestamp: Date;
  type: 'success' | 'error' | 'warning' | 'info';
}

const mockSystemStatus = {
  power: 'ONLINE',
  network: 'CONNECTED',
  storage: '67%',
  cpu: '34%',
  memory: '56%'
};

export function TerminalPage() {
  const [commands, setCommands] = useState<Command[]>([
    {
      id: '1',
      command: 'system status',
      output: [
        'TACTICAL DEFENSE SYSTEM v2.4.1',
        'Status: OPERATIONAL',
        'Power: ONLINE',
        'Network: CONNECTED',
        'Last Update: 2024-12-16 14:23:07'
      ],
      timestamp: new Date(Date.now() - 30000),
      type: 'success'
    },
    {
      id: '2',
      command: 'radar scan',
      output: [
        'Initiating radar sweep...',
        'Scanning sectors 1-8...',
        'No hostile contacts detected',
        'Sweep complete - 0 threats identified'
      ],
      timestamp: new Date(Date.now() - 15000),
      type: 'info'
    }
  ]);

  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Available commands
  const availableCommands = {
    'help': {
      output: [
        'Available Commands:',
        '  system status    - Display system information',
        '  radar scan       - Perform radar sweep',
        '  defense status   - Show defense system status',
        '  network test     - Test network connectivity',
        '  clear           - Clear terminal',
        '  sensors check   - Check sensor array status',
        '  threat assess   - Run threat assessment',
        '  backup create   - Create system backup'
      ],
      type: 'info' as const
    },
    'system status': {
      output: [
        'TACTICAL DEFENSE SYSTEM v2.4.1',
        `Status: OPERATIONAL`,
        `Power: ${mockSystemStatus.power}`,
        `Network: ${mockSystemStatus.network}`,
        `Storage: ${mockSystemStatus.storage} used`,
        `CPU Load: ${mockSystemStatus.cpu}`,
        `Memory: ${mockSystemStatus.memory}`,
        `Last Update: ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`
      ],
      type: 'success' as const
    },
    'clear': {
      output: [],
      type: 'success' as const,
      special: 'clear'
    },
    'radar scan': {
      output: [
        'Initiating radar sweep...',
        'Scanning sectors 1-8...',
        Math.random() > 0.7 ? 'WARNING: Potential contact detected in sector 3' : 'No hostile contacts detected',
        'Sweep complete'
      ],
      type: Math.random() > 0.7 ? 'warning' as const : 'info' as const
    },
    'defense status': {
      output: [
        'DEFENSE SYSTEMS STATUS',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'Primary Systems: ONLINE',
        'Backup Systems: STANDBY',
        'Weapon Systems: ARMED',
        'Shield Grid: 98% CAPACITY',
        'Auto-Defense: ENABLED'
      ],
      type: 'success' as const
    },
    'network test': {
      output: [
        'Testing network connectivity...',
        'Primary Network: CONNECTED (867ms)',
        'Backup Network: CONNECTED (1.2s)',
        'Satellite Link: ACTIVE',
        'All network systems operational'
      ],
      type: 'success' as const
    }
  };

  const getPrompt = () => {
    return 'tactical@defense:~$';
  };

  const getTypeColor = (type: Command['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      case 'info':
      default:
        return 'text-gray-300';
    }
  };

  const processCommand = (cmd: string): Command => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const commandDef = availableCommands[trimmedCmd as keyof typeof availableCommands];

    if (commandDef) {
      if (commandDef.special === 'clear') {
        return {
          id: Date.now().toString(),
          command: cmd,
          output: [],
          timestamp: new Date(),
          type: commandDef.type,
        };
      }
      
      return {
        id: Date.now().toString(),
        command: cmd,
        output: commandDef.output,
        timestamp: new Date(),
        type: commandDef.type,
      };
    }

    return {
      id: Date.now().toString(),
      command: cmd,
      output: [
        `Command '${cmd}' not found.`,
        'Type "help" for available commands.'
      ],
      timestamp: new Date(),
      type: 'error',
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim() || isProcessing) return;

    setIsProcessing(true);
    
    // Add to history
    setCommandHistory(prev => [...prev, currentCommand]);
    setHistoryIndex(-1);

    // Process command
    const newCommand = processCommand(currentCommand);
    
    // Simulate processing delay
    setTimeout(() => {
      if (newCommand.command.toLowerCase().trim() === 'clear') {
        setCommands([]);
      } else {
        setCommands(prev => [...prev, newCommand]);
      }
      
      setCurrentCommand('');
      setIsProcessing(false);
      
      // Scroll to bottom
      setTimeout(() => {
        if (scrollAreaRef.current) {
          const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
          if (scrollElement) {
            scrollElement.scrollTop = scrollElement.scrollHeight;
          }
        }
      }, 100);
    }, Math.random() * 500 + 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  // Auto-focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Keep input focused
  const handleTerminalClick = () => {
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="h-full bg-gray-950 overflow-hidden">
      <div className="p-6 space-y-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-200 mb-2">TERMINAL</h1>
            <p className="text-gray-400">Command Line Interface</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Power className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">{mockSystemStatus.power}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">{mockSystemStatus.network}</span>
              </div>
              <div className="flex items-center space-x-2">
                <HardDrive className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{mockSystemStatus.storage}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">{mockSystemStatus.cpu}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal */}
        <Card className="bg-gray-900 border-gray-700 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300 font-mono">Tactical Defense Terminal</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-hidden flex flex-col" onClick={handleTerminalClick}>
            <div className="flex-1 overflow-hidden">
              <ScrollArea ref={scrollAreaRef} className="h-full">
                <div className="p-4 font-mono text-sm space-y-2">
                  {commands.map((cmd) => (
                    <div key={cmd.id} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <ChevronRight className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-400">{getPrompt()}</span>
                        <span className="text-gray-300">{cmd.command}</span>
                      </div>
                      
                      <div className={`ml-5 whitespace-pre-wrap ${getTypeColor(cmd.type)}`}>
                        {cmd.output.map((line, index) => (
                          <div key={index}>{line}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Current command input */}
                  <form onSubmit={handleSubmit} className="flex items-center space-x-2 min-h-[28px]">
                    <ChevronRight className="w-3 h-3 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-400 flex-shrink-0">{getPrompt()}</span>
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-none outline-none font-mono text-gray-300 placeholder-gray-500 text-sm leading-6 px-0 py-0 focus:ring-0"
                        placeholder={isProcessing ? "Processing..." : "Enter command..."}
                        autoComplete="off"
                        disabled={isProcessing}
                        spellCheck={false}
                        style={{
                          fontSize: 'inherit',
                          fontFamily: 'inherit',
                          lineHeight: 'inherit'
                        }}
                      />
                      {/* Cursor */}
                      <div 
                        className={`absolute top-0 bottom-0 w-2 bg-gray-300 transition-opacity duration-300 ${
                          isProcessing ? 'opacity-0' : 'opacity-100 animate-pulse'
                        }`}
                        style={{
                          left: `${currentCommand.length * 0.6}em`,
                          animation: isProcessing ? 'none' : 'terminal-cursor 1s infinite'
                        }}
                      />
                    </div>
                  </form>
                  
                  {/* Processing indicator */}
                  {isProcessing && (
                    <div className="flex items-center space-x-2 text-gray-400 ml-5">
                      <Activity className="w-3 h-3 animate-spin" />
                      <span className="text-sm">Processing command...</span>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}