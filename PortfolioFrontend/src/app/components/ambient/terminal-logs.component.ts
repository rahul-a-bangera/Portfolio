import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LogEntry {
  text: string;
  type: 'ok' | 'warn' | 'info';
  visible: boolean;
}

@Component({
  selector: 'app-terminal-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="terminal-logs-container" [class.left]="position === 'left'" [class.right]="position === 'right'">
      <div class="terminal-log" 
           *ngFor="let log of logs; let i = index"
           [class.visible]="log.visible"
           [class.ok]="log.type === 'ok'"
           [class.warn]="log.type === 'warn'"
           [class.info]="log.type === 'info'">
        <span class="log-prefix">[{{ log.type.toUpperCase() }}]</span>
        <span class="log-text">{{ log.text }}</span>
      </div>
    </div>
  `,
  styles: [`
    .terminal-logs-container {
      position: fixed;
      top: 25%;
      width: 280px;
      pointer-events: none;
      user-select: none;
      z-index: 0;
    }

    .terminal-logs-container.left {
      left: 210px;
    }

    .terminal-logs-container.right {
      right: 210px;
    }

    .terminal-log {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 11px;
      line-height: 1.6;
      margin-bottom: 8px;
      opacity: 0;
      transition: opacity 2s ease-in-out;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .terminal-log.visible {
      opacity: 1;
    }

    .terminal-log.ok {
      color: rgba(0, 255, 157, 0.25);
    }

    .terminal-log.warn {
      color: rgba(77, 255, 255, 0.2);
    }

    .terminal-log.info {
      color: rgba(0, 255, 157, 0.15);
    }

    .log-prefix {
      font-weight: 600;
      margin-right: 6px;
    }

    .log-text {
      opacity: 0.9;
    }

    @media (max-width: 1400px) {
      .terminal-logs-container {
        display: none;
      }
    }
  `]
})
export class TerminalLogsComponent implements OnInit, OnDestroy {
  position: 'left' | 'right' = 'left';
  logs: LogEntry[] = [];
  private intervalId: any;
  private readonly LOG_TEMPLATES = [
    { text: 'Initializing portfolio modules...', type: 'ok' as const },
    { text: 'Loading skills.js...', type: 'ok' as const },
    { text: 'Latency spike detected (0.4ms)', type: 'warn' as const },
    { text: 'Fetching experience timeline...', type: 'ok' as const },
    { text: 'Rendering UI components...', type: 'ok' as const },
    { text: 'Cache invalidation (127.0.0.1)', type: 'info' as const },
    { text: 'Database connection established', type: 'ok' as const },
    { text: 'Memory usage: 48% (nominal)', type: 'info' as const },
    { text: 'API endpoints ready', type: 'ok' as const },
    { text: 'WebSocket connection active', type: 'ok' as const },
    { text: 'Request timeout warning (3.2s)', type: 'warn' as const },
    { text: 'Loading authentication module...', type: 'ok' as const }
  ];

  ngOnInit(): void {
    // Set position to left side
    this.position = 'left';
    
    // Initialize with random logs (increased from 6 to 12)
    this.logs = this.getRandomLogs(12);
    
    // Start the fade cycle
    this.startFadeCycle();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private getRandomLogs(count: number): LogEntry[] {
    const shuffled = [...this.LOG_TEMPLATES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(log => ({
      ...log,
      visible: false
    }));
  }

  private startFadeCycle(): void {
    // Fade in logs one by one at start
    this.logs.forEach((log, index) => {
      setTimeout(() => {
        log.visible = true;
      }, index * 800);
    });

    // Continuous fade cycle
    this.intervalId = setInterval(() => {
      // Pick a random log to fade out
      const visibleLogs = this.logs.filter(l => l.visible);
      if (visibleLogs.length > 0) {
        const randomLog = visibleLogs[Math.floor(Math.random() * visibleLogs.length)];
        randomLog.visible = false;

        // After 2 seconds, replace it with a new log
        setTimeout(() => {
          const newLog = this.LOG_TEMPLATES[Math.floor(Math.random() * this.LOG_TEMPLATES.length)];
          Object.assign(randomLog, { ...newLog, visible: true });
        }, 2000);
      }
    }, 6000); // Cycle every 6 seconds
  }
}
