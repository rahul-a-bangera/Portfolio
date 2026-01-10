import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Particle {
    baseRadius: number;     // Base distance from cursor
    angle: number;          // Position angle around cursor
    size: number;
    rotationSpeed: number;  // How fast it orbits
    radiusVariance: number; // For breathing effect
    phaseOffset: number;    // For varied breathing timing
    layer: number;          // Which ring layer (for gradient)
}

@Component({
    selector: 'app-matrix-particles',
    standalone: true,
    imports: [CommonModule],
    template: `
    <canvas #particleCanvas class="particle-canvas"></canvas>
  `,
    styles: [`
    .particle-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    @media (max-width: 960px) {
      .particle-canvas {
        display: none;
      }
    }
  `]
})
export class MatrixParticlesComponent implements OnInit, OnDestroy {
    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private animationId: any;
    private mouseX: number = -1000;
    private mouseY: number = -1000;
    private targetMouseX: number = -1000;
    private targetMouseY: number = -1000;
    private lastMouseX: number = -1000;
    private lastMouseY: number = -1000;
    private time: number = 0;
    private velocity: number = 0;
    private isMouseOnScreen: boolean = false;
    private isDestroyed: boolean = false;

    // Configuration - tuned to match Antigravity style
    private readonly PARTICLE_COUNT = 200;          // More particles for denser field
    private readonly LAYER_COUNT = 8;               // More ring layers
    private readonly MIN_RADIUS = 60;               // Inner ring
    private readonly MAX_RADIUS = 400;              // Outer ring (large circumference)
    private readonly BREATHING_AMPLITUDE = 30;      // How much the ring breathes
    private readonly BREATHING_SPEED = 0.015;       // Speed of breathing animation
    private readonly WARP_EXPANSION = 120;          // Extra expansion when moving fast
    private readonly VELOCITY_DECAY = 0.94;         // How fast velocity decays
    private readonly MOUSE_SMOOTHING = 0.15;        // Smooth mouse following

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.isDestroyed = false;
        this.canvas = this.elementRef.nativeElement.querySelector('canvas');
        const context = this.canvas.getContext('2d');
        if (!context) return;

        this.ctx = context;
        this.resizeCanvas();
        this.initParticles();
        this.animate();
    }

    ngOnDestroy(): void {
        this.isDestroyed = true;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Clear canvas completely
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // Clear particles array
        this.particles = [];
    }

    @HostListener('window:resize')
    onResize(): void {
        if (!this.isDestroyed) {
            this.resizeCanvas();
        }
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent): void {
        if (this.isDestroyed) return;
        
        this.targetMouseX = event.clientX;
        this.targetMouseY = event.clientY;
        this.isMouseOnScreen = true;

        // Calculate velocity for warp effect
        const dx = this.targetMouseX - this.lastMouseX;
        const dy = this.targetMouseY - this.lastMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Increase velocity based on movement speed
        this.velocity = Math.min(this.velocity + speed * 0.08, 1);

        this.lastMouseX = this.targetMouseX;
        this.lastMouseY = this.targetMouseY;
    }

    @HostListener('window:mouseleave')
    onMouseLeave(): void {
        if (!this.isDestroyed) {
            this.isMouseOnScreen = false;
        }
    }

    @HostListener('window:mouseenter', ['$event'])
    onMouseEnter(event: MouseEvent): void {
        if (this.isDestroyed) return;
        
        this.targetMouseX = event.clientX;
        this.targetMouseY = event.clientY;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.isMouseOnScreen = true;
    }

    private resizeCanvas(): void {
        if (this.isDestroyed) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private initParticles(): void {
        if (this.isDestroyed) return;
        
        this.particles = [];

        for (let i = 0; i < this.PARTICLE_COUNT; i++) {
            // Distribute across layers (more particles in outer layers)
            const layer = Math.floor(Math.random() * this.LAYER_COUNT);
            const layerRatio = layer / (this.LAYER_COUNT - 1);

            // Radius increases with layer - outer layers have more particles
            const baseRadius = this.MIN_RADIUS + (this.MAX_RADIUS - this.MIN_RADIUS) * layerRatio;

            // Random angle for each particle
            const angle = Math.random() * Math.PI * 2;

            this.particles.push({
                baseRadius: baseRadius + (Math.random() - 0.5) * 30,
                angle: angle,
                size: 3 + Math.random() * 10 + layerRatio * 4, // Outer particles slightly larger
                rotationSpeed: (0.0003 + Math.random() * 0.0008) * (Math.random() > 0.5 ? 1 : -1),
                radiusVariance: 10 + Math.random() * this.BREATHING_AMPLITUDE,
                phaseOffset: Math.random() * Math.PI * 2,
                layer: layer
            });
        }
    }

    private animate(): void {
        // Stop animation if component is destroyed
        if (this.isDestroyed) {
            return;
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineCap = 'round';

        this.time += this.BREATHING_SPEED;

        // Decay velocity over time (for warp effect)
        this.velocity *= this.VELOCITY_DECAY;

        // Smooth mouse position interpolation
        if (this.isMouseOnScreen) {
            this.mouseX += (this.targetMouseX - this.mouseX) * this.MOUSE_SMOOTHING;
            this.mouseY += (this.targetMouseY - this.mouseY) * this.MOUSE_SMOOTHING;
        }

        // Only render if mouse is on screen
        if (!this.isMouseOnScreen) {
            this.animationId = requestAnimationFrame(() => this.animate());
            return;
        }

        // Update and draw particles
        for (const p of this.particles) {
            // Rotate particle around cursor (slow orbital movement)
            p.angle += p.rotationSpeed;

            // Calculate breathing effect (pulsing radius) - wave-like
            const breathingOffset = Math.sin(this.time * 1.5 + p.phaseOffset) * p.radiusVariance;

            // Additional wave for organic feel
            const secondaryWave = Math.sin(this.time * 0.7 + p.angle * 2) * 8;

            // Calculate warp expansion based on velocity (black hole effect)
            const warpExpansion = this.velocity * this.WARP_EXPANSION;

            // Final radius = base + breathing + secondary wave + warp
            const finalRadius = p.baseRadius + breathingOffset + secondaryWave + warpExpansion;

            // Calculate particle position relative to cursor
            const x = this.mouseX + Math.cos(p.angle) * finalRadius;
            const y = this.mouseY + Math.sin(p.angle) * finalRadius;

            // Skip if off screen
            if (x < -50 || x > this.canvas.width + 50 || y < -50 || y > this.canvas.height + 50) {
                continue;
            }

            // Calculate opacity based on distance from cursor
            // Center is LIGHTER (lower opacity), edges are DARKER (higher opacity)
            const distanceRatio = (p.baseRadius - this.MIN_RADIUS) / (this.MAX_RADIUS - this.MIN_RADIUS);

            // Radial gradient: center lighter, edges more visible
            const baseOpacity = 0.2 + distanceRatio * 0.6; // Range: 0.2 (center) to 0.8 (edge)

            // Add subtle flicker for organic feel
            const flicker = 0.85 + Math.sin(this.time * 2.5 + p.phaseOffset * 3) * 0.15;
            const finalOpacity = baseOpacity * flicker;

            // Color: blue spectrum with slight variation
            // Inner particles: lighter blue, outer particles: deeper blue
            const hue = 210 + distanceRatio * 20; // 210 (blue) to 230 (deeper blue)
            const saturation = 70 + distanceRatio * 25; // 70% to 95%
            const lightness = 75 - distanceRatio * 25; // 75% (light) to 50% (darker)

            // Draw particle (dash/capsule shape pointing tangentially)
            this.ctx.save();
            this.ctx.translate(x, y);

            // Particles point tangent to the circle (perpendicular to radius)
            // Add some random rotation variance for organic look
            this.ctx.rotate(p.angle + Math.PI / 2 + (Math.sin(p.phaseOffset) * 0.3));
            this.ctx.globalAlpha = finalOpacity;

            this.ctx.beginPath();
            this.ctx.moveTo(-p.size / 2, 0);
            this.ctx.lineTo(p.size / 2, 0);

            this.ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            this.ctx.lineWidth = 1.5 + distanceRatio * 0.5; // Slightly thicker at edges
            this.ctx.stroke();

            this.ctx.restore();
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}
