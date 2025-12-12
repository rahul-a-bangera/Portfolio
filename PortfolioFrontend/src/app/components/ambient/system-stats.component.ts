import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="system-stats-widget">
      <div class="stats-header">/system/status</div>
      <div class="stats-line">
        <span class="stats-label">CPU:</span>
        <span class="stats-value">{{ cpu }}%</span>
      </div>
      <div class="stats-line">
        <span class="stats-label">RAM:</span>
        <span class="stats-value">{{ ram }}%</span>
      </div>
      <div class="stats-line">
        <span class="stats-label">Net:</span>
        <span class="stats-value">{{ netUp }}kbps ? {{ netDown }}kbps ?</span>
      </div>
      <div class="stats-line">
        <span class="stats-label">Uptime:</span>
        <span class="stats-value">{{ uptime }}</span>
      </div>
    </div>
  `,
  styles: [`
    .system-stats-widget {
      position: fixed;
      bottom: 30px;
      right: 30px;
      padding: 12px 16px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(0, 255, 157, 0.3);
      border-radius: 4px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 11px;
      color: rgba(0, 255, 157, 0.7);
      box-shadow: 0 0 15px rgba(0, 255, 157, 0.2);
      backdrop-filter: blur(5px);
      pointer-events: none;
      user-select: none;
      z-index: 0;
    }

    .stats-header {
      font-size: 10px;
      color: rgba(77, 255, 255, 0.6);
      margin-bottom: 8px;
      padding-bottom: 6px;
      border-bottom: 1px solid rgba(0, 255, 157, 0.2);
      letter-spacing: 0.5px;
    }

    .stats-line {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      line-height: 1.4;
    }

    .stats-line:last-child {
      margin-bottom: 0;
    }

    .stats-label {
      color: rgba(0, 255, 157, 0.5);
      margin-right: 12px;
    }

    .stats-value {
      color: rgba(0, 255, 157, 0.8);
      font-weight: 600;
      text-shadow: 0 0 5px rgba(0, 255, 157, 0.3);
    }

    @media (max-width: 1200px) {
      .system-stats-widget {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .system-stats-widget {
        bottom: 20px;
        right: 20px;
        padding: 10px 12px;
        font-size: 10px;
      }

      .stats-header {
        font-size: 9px;
      }
    }
  `]
})
export class SystemStatsComponent implements OnInit, OnDestroy {
  cpu: number = 23;
  ram: number = 48;
  netUp: number = 120;
  netDown: number = 98;
  uptime: string = '00:00:00';
  
  private intervalId: any;
  private startTime: number = Date.now();

  ngOnInit(): void {
    this.updateStats();
    this.intervalId = setInterval(() => this.updateStats(), 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateStats(): void {
    // Simulate realistic fluctuations
    this.cpu = Math.floor(20 + Math.random() * 15); // 20-35%
    this.ram = Math.floor(45 + Math.random() * 10); // 45-55%
    this.netUp = Math.floor(100 + Math.random() * 50); // 100-150 kbps
    this.netDown = Math.floor(80 + Math.random() * 40); // 80-120 kbps
    
    // Calculate uptime
    const elapsed = Date.now() - this.startTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    this.uptime = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
