import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MatrixColumn {
  characters: string[];
  positions: number[];
  speeds: number[];
  xPosition: number;
}

@Component({
  selector: 'app-matrix-rain',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="matrix-rain-container">
      <div class="matrix-side left" [style.width.px]="width">
        <div class="matrix-column" 
             *ngFor="let column of leftColumns; let colIndex = index"
             [style.left.px]="column.xPosition">
          <div class="matrix-char" 
               *ngFor="let char of column.characters; let i = index"
               [style.top.px]="column.positions[i]"
               [style.opacity]="getOpacity(i, column)">
            {{ char }}
          </div>
        </div>
      </div>
      <div class="matrix-side right" [style.width.px]="width">
        <div class="matrix-column" 
             *ngFor="let column of rightColumns; let colIndex = index"
             [style.left.px]="column.xPosition">
          <div class="matrix-char" 
               *ngFor="let char of column.characters; let i = index"
               [style.top.px]="column.positions[i]"
               [style.opacity]="getOpacity(i, column)">
            {{ char }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .matrix-rain-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 0;
    }

    .matrix-side {
      position: absolute;
      top: 0;
      bottom: 0;
      transition: width 0.3s ease;
      overflow: hidden;
    }

    .matrix-side.left {
      left: 0;
    }

    .matrix-side.right {
      right: 0;
    }

    .matrix-column {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 20px;
    }

    .matrix-char {
      position: absolute;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 13px;
      color: #00ff9d;
      text-shadow: 0 0 8px rgba(0, 255, 157, 0.6);
      transition: top 0.05s linear, opacity 0.3s ease;
      user-select: none;
      font-weight: 300;
    }

    @media (max-width: 1400px) {
      .matrix-side {
        width: 130px !important;
      }
    }

    @media (max-width: 1200px) {
      .matrix-side {
        width: 80px !important;
      }
      
      .matrix-char {
        font-size: 11px;
      }
    }

    @media (max-width: 960px) {
      .matrix-rain-container {
        display: none;
      }
    }
  `]
})
export class MatrixRainComponent implements OnInit, OnDestroy, OnChanges {
  @Input() width: number = 190;

  leftColumns: MatrixColumn[] = [];
  rightColumns: MatrixColumn[] = [];
  private animationId: any;
  private readonly CHARACTERS = '01{}[]#%&@';
  private readonly COLUMN_LENGTH = 12;
  private columnsPerSide: number = 6;
  private readonly BASE_OPACITY = 0.06;
  private readonly MAX_OPACITY = 0.12;

  ngOnInit(): void {
    this.calculateColumnsPerSide();
    this.initializeSide(this.leftColumns);
    this.initializeSide(this.rightColumns);
    this.animate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['width'] && !changes['width'].firstChange) {
      this.calculateColumnsPerSide();
      this.reinitializeColumns();
    }
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private calculateColumnsPerSide(): void {
    // Calculate number of columns based on width (approximately one column per 30px)
    this.columnsPerSide = Math.max(3, Math.floor(this.width / 30));
  }

  private reinitializeColumns(): void {
    this.leftColumns = [];
    this.rightColumns = [];
    this.initializeSide(this.leftColumns);
    this.initializeSide(this.rightColumns);
  }

  private initializeSide(columns: MatrixColumn[]): void {
    const spacing = this.width / (this.columnsPerSide + 1);
    
    for (let col = 0; col < this.columnsPerSide; col++) {
      const column: MatrixColumn = {
        characters: [],
        positions: [],
        speeds: [],
        xPosition: (col + 1) * spacing - 10
      };

      for (let i = 0; i < this.COLUMN_LENGTH; i++) {
        column.characters.push(this.getRandomChar());
        column.positions.push(Math.random() * window.innerHeight - 200);
        column.speeds.push(0.4 + Math.random() * 0.5);
      }

      columns.push(column);
    }
  }

  private getRandomChar(): string {
    return this.CHARACTERS[Math.floor(Math.random() * this.CHARACTERS.length)];
  }

  private animate(): void {
    this.leftColumns.forEach(column => this.updateColumn(column));
    this.rightColumns.forEach(column => this.updateColumn(column));
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private updateColumn(column: MatrixColumn): void {
    for (let i = 0; i < column.positions.length; i++) {
      column.positions[i] += column.speeds[i];
      
      if (column.positions[i] > window.innerHeight) {
        column.positions[i] = -50 - Math.random() * 200;
        column.characters[i] = this.getRandomChar();
        column.speeds[i] = 0.4 + Math.random() * 0.5;
      }

      if (Math.random() < 0.008) {
        column.characters[i] = this.getRandomChar();
      }
    }
  }

  getOpacity(index: number, column: MatrixColumn): number {
    const positions = column.positions;
    const currentPos = positions[index];
    
    const maxPos = Math.max(...positions.filter(p => p >= 0 && p <= window.innerHeight));
    
    if (currentPos < 0 || currentPos > window.innerHeight) {
      return 0;
    }
    
    const distance = Math.abs(maxPos - currentPos);
    const fadeRange = 300;
    const opacityFactor = Math.max(0, 1 - (distance / fadeRange));
    
    return this.BASE_OPACITY + (this.MAX_OPACITY - this.BASE_OPACITY) * opacityFactor;
  }
}
