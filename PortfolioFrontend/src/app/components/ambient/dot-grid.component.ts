import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Dot {
  baseX: number;
  baseY: number;
  currentX: number;
  currentY: number;
  velocityX: number;
  velocityY: number;
  isActive: boolean;
  returnStartTime: number;
}

@Component({
  selector: 'app-dot-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #dotGridCanvas class="dot-grid-canvas"></canvas>
  `,
  styles: [`
    .dot-grid-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    @media (max-width: 960px) {
      .dot-grid-canvas {
        display: none;
      }
    }
  `]
})
export class DotGridComponent implements OnInit, OnDestroy {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private dots: Dot[] = [];
  private animationId: any;
  private mouseX: number = -10000;
  private mouseY: number = -10000;
  private isDestroyed = false;

  // Configuration - matching the React example
  private readonly DOT_SIZE = 4;
  private readonly GAP = 26;
  private readonly BASE_COLOR = '#86e488'; // Light green (default state)
  private readonly ACTIVE_COLOR = '#111831'; // Dark blue/black (pushed state)
  private readonly PROXIMITY = 50; // Distance at which dots react (reduced from 150)
  private readonly SPEED_TRIGGER = 100; // Distance at which dots start moving
  private readonly SHOCK_RADIUS = 60; // Radius of the "shock wave" effect (reduced from 120 to 60)
  private readonly SHOCK_STRENGTH = 1.5; // Strength of the shock wave push (reduced from 3 to 1.5)
  private readonly MAX_SPEED = 5000; // Maximum speed for dots
  private readonly RESISTANCE = 750; // Resistance to movement (lower = more movement)
  private readonly RETURN_DURATION = 2; // Seconds to return to base position

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.isDestroyed = false;
    this.canvas = this.elementRef.nativeElement.querySelector('canvas');
    const context = this.canvas.getContext('2d');
    if (!context) return;

    this.ctx = context;
    this.resizeCanvas();
    this.initDots();
    this.animate();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.dots = [];
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!this.isDestroyed) {
      this.resizeCanvas();
      this.initDots();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDestroyed) return;

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  @HostListener('window:mouseleave')
  onMouseLeave(): void {
    if (!this.isDestroyed) {
      this.mouseX = -10000;
      this.mouseY = -10000;
    }
  }

  private resizeCanvas(): void {
    if (this.isDestroyed) return;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initDots(): void {
    if (this.isDestroyed) return;

    this.dots = [];

    const cols = Math.ceil(this.canvas.width / (this.DOT_SIZE + this.GAP));
    const rows = Math.ceil(this.canvas.height / (this.DOT_SIZE + this.GAP));

    // Center the grid
    const totalWidth = cols * (this.DOT_SIZE + this.GAP) - this.GAP;
    const totalHeight = rows * (this.DOT_SIZE + this.GAP) - this.GAP;
    const offsetX = (this.canvas.width - totalWidth) / 2;
    const offsetY = (this.canvas.height - totalHeight) / 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * (this.DOT_SIZE + this.GAP) + this.DOT_SIZE / 2;
        const y = offsetY + row * (this.DOT_SIZE + this.GAP) + this.DOT_SIZE / 2;

        this.dots.push({
          baseX: x,
          baseY: y,
          currentX: x,
          currentY: y,
          velocityX: 0,
          velocityY: 0,
          isActive: false,
          returnStartTime: 0
        });
      }
    }
  }

  private animate(): void {
    if (this.isDestroyed) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const now = performance.now();

    for (const dot of this.dots) {
      // Calculate distance from mouse to dot's BASE position
      const dx = this.mouseX - dot.baseX;
      const dy = this.mouseY - dot.baseY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Check if dot should be pushed (within shock radius)
      if (distance < this.SHOCK_RADIUS && distance > 0) {
        dot.isActive = true;
        dot.returnStartTime = 0;

        // Calculate push force (stronger when closer)
        const force = Math.max(0, (this.SHOCK_RADIUS - distance) / this.SHOCK_RADIUS);
        const pushStrength = force * this.SHOCK_STRENGTH;

        // Calculate direction AWAY from mouse
        const angle = Math.atan2(-dy, -dx); // Negative to push away

        // Apply velocity (pushing away from mouse) - very gentle push
        const speed = pushStrength * (this.MAX_SPEED / this.RESISTANCE) * 0.15; // Reduced from 0.3 to 0.15
        dot.velocityX += Math.cos(angle) * speed;
        dot.velocityY += Math.sin(angle) * speed;

        // Clamp velocity to max speed - very limited displacement
        const currentSpeed = Math.sqrt(dot.velocityX * dot.velocityX + dot.velocityY * dot.velocityY);
        if (currentSpeed > this.MAX_SPEED / 250) { // Increased from 150 to 250 for even smaller displacement
          const scale = (this.MAX_SPEED / 250) / currentSpeed;
          dot.velocityX *= scale;
          dot.velocityY *= scale;
        }
      } else {
        // Start returning to base position
        if (dot.isActive) {
          dot.isActive = false;
          dot.returnStartTime = now;
        }
      }

      // Apply velocity with resistance
      dot.currentX += dot.velocityX;
      dot.currentY += dot.velocityY;

      // Apply resistance (friction)
      dot.velocityX *= 0.85;
      dot.velocityY *= 0.85;

      // Return to base position if not active
      if (!dot.isActive) {
        const elapsed = dot.returnStartTime > 0 ? (now - dot.returnStartTime) / 1000 : 0;
        const progress = Math.min(elapsed / this.RETURN_DURATION, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        // Interpolate back to base position
        const targetX = dot.baseX;
        const targetY = dot.baseY;

        const returnSpeed = 0.15 * (1 + eased);
        dot.currentX += (targetX - dot.currentX) * returnSpeed;
        dot.currentY += (targetY - dot.currentY) * returnSpeed;

        // Reset return time if close enough to base
        const distToBase = Math.sqrt(
          Math.pow(dot.currentX - dot.baseX, 2) + 
          Math.pow(dot.currentY - dot.baseY, 2)
        );

        if (distToBase < 0.5) {
          dot.currentX = dot.baseX;
          dot.currentY = dot.baseY;
          dot.returnStartTime = 0;
          dot.velocityX = 0;
          dot.velocityY = 0;
        }
      }

      // Draw dot
      this.drawDot(dot, distance);
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private drawDot(dot: Dot, distanceFromMouse: number): void {
    // Calculate color based on whether dot is displaced
    const displacement = Math.sqrt(
      Math.pow(dot.currentX - dot.baseX, 2) + 
      Math.pow(dot.currentY - dot.baseY, 2)
    );

    // Interpolate between base and active color based on displacement
    let color = this.BASE_COLOR;
    
    if (displacement > 1 || distanceFromMouse < this.PROXIMITY) {
      const ratio = Math.min(displacement / 50, 1); // Max displacement for color change
      color = this.interpolateColor(this.BASE_COLOR, this.ACTIVE_COLOR, ratio);
    }

    // Draw circle with reduced opacity for dimmer appearance
    this.ctx.globalAlpha = 0.10;
    this.ctx.beginPath();
    this.ctx.arc(dot.currentX, dot.currentY, this.DOT_SIZE / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.globalAlpha = 1.0; // Reset alpha for next draw operations
  }

  private interpolateColor(color1: string, color2: string, ratio: number): string {
    // Convert hex to RGB
    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);

    if (!c1 || !c2) return color1;

    // Interpolate
    const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
    const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
    const b = Math.round(c1.b + (c2.b - c1.b) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}
