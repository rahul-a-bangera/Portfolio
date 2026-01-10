import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Spark {
  id: number;
  x: number;
  y: number;
  angle: number;
  velocity: number;
  startTime: number;
}

@Component({
  selector: 'app-click-spark',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="click-spark-container">
      <div 
        *ngFor="let spark of activeParks" 
        class="spark"
        [style.left.px]="spark.x"
        [style.top.px]="spark.y"
        [style.transform]="getSparkTransform(spark)"
        [style.opacity]="getSparkOpacity(spark)">
      </div>
    </div>
  `,
  styles: [`
    .click-spark-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }

    .spark {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6);
      pointer-events: none;
      will-change: transform, opacity;
    }

    @media (max-width: 768px) {
      .spark {
        width: 8px;
        height: 8px;
      }
    }
  `]
})
export class ClickSparkComponent implements OnInit, OnDestroy {
  activeParks: Spark[] = [];
  private sparkIdCounter = 0;
  private animationId: any;
  private isDestroyed = false;

  // Configuration
  private readonly SPARK_COLOR = 'rgba(255, 255, 255, 0.9)';
  private readonly SPARK_SIZE = 10;
  private readonly SPARK_RADIUS = 15;
  private readonly SPARK_COUNT = 8;
  private readonly DURATION = 400; // milliseconds
  private readonly EXTRA_SCALE = 1;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.isDestroyed = false;
    this.animate();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    this.activeParks = [];
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.isDestroyed) return;
    
    // Don't create sparks on button clicks or interactive elements
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('.mat-mdc-slide-toggle') ||
        target.closest('.mat-mdc-slider')) {
      return;
    }

    this.createSparks(event.clientX, event.clientY);
  }

  private createSparks(x: number, y: number): void {
    const angleStep = (Math.PI * 2) / this.SPARK_COUNT;
    const now = performance.now();

    for (let i = 0; i < this.SPARK_COUNT; i++) {
      const angle = angleStep * i;
      const velocity = this.SPARK_RADIUS;

      this.activeParks.push({
        id: this.sparkIdCounter++,
        x: x,
        y: y,
        angle: angle,
        velocity: velocity,
        startTime: now
      });
    }

    // Clean up old sparks after duration
    setTimeout(() => {
      this.activeParks = this.activeParks.filter(
        spark => performance.now() - spark.startTime < this.DURATION
      );
    }, this.DURATION);
  }

  private animate(): void {
    if (this.isDestroyed) return;

    const now = performance.now();

    // Remove expired sparks
    this.activeParks = this.activeParks.filter(
      spark => now - spark.startTime < this.DURATION
    );

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  getSparkTransform(spark: Spark): string {
    const now = performance.now();
    const elapsed = now - spark.startTime;
    const progress = Math.min(elapsed / this.DURATION, 1);

    // Ease-out function
    const easeOut = 1 - Math.pow(1 - progress, 3);

    // Calculate position
    const distance = easeOut * spark.velocity;
    const translateX = Math.cos(spark.angle) * distance;
    const translateY = Math.sin(spark.angle) * distance;

    // Calculate scale (starts at EXTRA_SCALE, ends at 0)
    const scale = (1 - progress) * this.EXTRA_SCALE;

    return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  getSparkOpacity(spark: Spark): number {
    const now = performance.now();
    const elapsed = now - spark.startTime;
    const progress = Math.min(elapsed / this.DURATION, 1);

    // Fade out
    return 1 - progress;
  }
}
