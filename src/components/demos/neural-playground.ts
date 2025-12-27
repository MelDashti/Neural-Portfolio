// Neural Network Playground - Lightweight ML Demo
// This is a simple neural network implementation for 2D classification visualization

interface Point {
  x: number;
  y: number;
  label: 0 | 1;
}

interface PlaygroundConfig {
  layers: number[];
  learningRate: number;
  activation: 'relu' | 'tanh' | 'sigmoid';
}

export class NeuralPlayground {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private layers: number[];
  private weights: number[][][];
  private biases: number[][];
  private learningRate: number;
  private activation: 'relu' | 'tanh' | 'sigmoid';
  private dataPoints: Point[] = [];
  private isTraining: boolean = false;
  private epoch: number = 0;
  private loss: number = 0;
  private animationId: number | null = null;

  constructor(canvas: HTMLCanvasElement, config: Partial<PlaygroundConfig> = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.layers = config.layers || [2, 6, 4, 1];
    this.learningRate = config.learningRate || 0.03;
    this.activation = config.activation || 'relu';
    this.weights = [];
    this.biases = [];

    this.initializeNetwork();
    this.generateDefaultData();
    this.render();
    this.setupInteraction();
  }

  private initializeNetwork(): void {
    this.weights = [];
    this.biases = [];

    for (let i = 1; i < this.layers.length; i++) {
      const prevSize = this.layers[i - 1];
      const currSize = this.layers[i];

      // Xavier initialization
      const scale = Math.sqrt(2 / (prevSize + currSize));

      this.weights.push(
        Array.from({ length: currSize }, () =>
          Array.from({ length: prevSize }, () => (Math.random() - 0.5) * 2 * scale)
        )
      );
      this.biases.push(Array.from({ length: currSize }, () => 0));
    }

    this.epoch = 0;
    this.loss = 0;
  }

  private generateDefaultData(): void {
    this.dataPoints = [];

    // Generate a spiral pattern
    const pointsPerClass = 50;

    for (let i = 0; i < pointsPerClass; i++) {
      const r = i / pointsPerClass * 0.8;
      const t = 1.75 * i / pointsPerClass * 2 * Math.PI;

      // Class 0 - one arm of spiral
      this.dataPoints.push({
        x: r * Math.sin(t),
        y: r * Math.cos(t),
        label: 0,
      });

      // Class 1 - other arm of spiral
      this.dataPoints.push({
        x: r * Math.sin(t + Math.PI),
        y: r * Math.cos(t + Math.PI),
        label: 1,
      });
    }
  }

  private setupInteraction(): void {
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Alternate labels
      const lastLabel = this.dataPoints.length > 0
        ? this.dataPoints[this.dataPoints.length - 1].label
        : 1;

      this.dataPoints.push({
        x,
        y,
        label: lastLabel === 0 ? 1 : 0,
      });

      this.render();
    });
  }

  private activate(x: number, isOutput: boolean = false): number {
    if (isOutput) {
      // Sigmoid for output layer
      return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
    }

    switch (this.activation) {
      case 'relu':
        return Math.max(0, x);
      case 'tanh':
        return Math.tanh(x);
      case 'sigmoid':
        return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
    }
  }

  private activateDerivative(x: number, isOutput: boolean = false): number {
    if (isOutput) {
      const s = this.activate(x, true);
      return s * (1 - s);
    }

    switch (this.activation) {
      case 'relu':
        return x > 0 ? 1 : 0;
      case 'tanh':
        const t = Math.tanh(x);
        return 1 - t * t;
      case 'sigmoid':
        const s = this.activate(x);
        return s * (1 - s);
    }
  }

  private forward(input: number[]): { activations: number[][]; zValues: number[][] } {
    const activations: number[][] = [input];
    const zValues: number[][] = [];
    let current = input;

    for (let i = 0; i < this.weights.length; i++) {
      const z: number[] = [];
      const a: number[] = [];
      const isOutput = i === this.weights.length - 1;

      for (let j = 0; j < this.weights[i].length; j++) {
        let sum = this.biases[i][j];
        for (let k = 0; k < current.length; k++) {
          sum += this.weights[i][j][k] * current[k];
        }
        z.push(sum);
        a.push(this.activate(sum, isOutput));
      }

      zValues.push(z);
      activations.push(a);
      current = a;
    }

    return { activations, zValues };
  }

  private train(epochs: number = 1): void {
    for (let e = 0; e < epochs; e++) {
      let totalLoss = 0;

      for (const point of this.dataPoints) {
        const input = [point.x, point.y];
        const target = point.label;

        // Forward pass
        const { activations, zValues } = this.forward(input);
        const output = activations[activations.length - 1][0];

        // Binary cross-entropy loss
        const clampedOutput = Math.max(1e-7, Math.min(1 - 1e-7, output));
        totalLoss += -(target * Math.log(clampedOutput) + (1 - target) * Math.log(1 - clampedOutput));

        // Backward pass
        const deltas: number[][] = [];

        // Output layer delta
        const outputDelta = [output - target];
        deltas.unshift(outputDelta);

        // Hidden layer deltas
        for (let l = this.weights.length - 2; l >= 0; l--) {
          const delta: number[] = [];
          for (let j = 0; j < this.weights[l].length; j++) {
            let error = 0;
            for (let k = 0; k < this.weights[l + 1].length; k++) {
              error += deltas[0][k] * this.weights[l + 1][k][j];
            }
            delta.push(error * this.activateDerivative(zValues[l][j]));
          }
          deltas.unshift(delta);
        }

        // Update weights and biases
        for (let l = 0; l < this.weights.length; l++) {
          for (let j = 0; j < this.weights[l].length; j++) {
            for (let k = 0; k < this.weights[l][j].length; k++) {
              this.weights[l][j][k] -= this.learningRate * deltas[l][j] * activations[l][k];
            }
            this.biases[l][j] -= this.learningRate * deltas[l][j];
          }
        }
      }

      this.epoch++;
      this.loss = totalLoss / this.dataPoints.length;
    }
  }

  public render(): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const resolution = 40;

    // Clear canvas
    this.ctx.fillStyle = '#0a0a0f';
    this.ctx.fillRect(0, 0, width, height);

    // Draw decision boundary as heatmap
    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const x = (i / resolution) * 2 - 1;
        const y = (j / resolution) * 2 - 1;

        const { activations } = this.forward([x, y]);
        const output = activations[activations.length - 1][0];

        // Cyan to magenta gradient based on output
        const r = Math.floor((1 - output) * 255);
        const g = Math.floor(50);
        const b = Math.floor(output * 255);

        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.7)`;
        this.ctx.fillRect(
          (i / resolution) * width,
          (j / resolution) * height,
          width / resolution + 1,
          height / resolution + 1
        );
      }
    }

    // Draw data points
    for (const point of this.dataPoints) {
      const px = ((point.x + 1) / 2) * width;
      const py = ((point.y + 1) / 2) * height;

      // Glow effect
      this.ctx.beginPath();
      this.ctx.arc(px, py, 12, 0, Math.PI * 2);
      const gradient = this.ctx.createRadialGradient(px, py, 0, px, py, 12);
      gradient.addColorStop(0, point.label === 0 ? 'rgba(255, 0, 255, 0.5)' : 'rgba(0, 255, 255, 0.5)');
      gradient.addColorStop(1, 'transparent');
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Point
      this.ctx.beginPath();
      this.ctx.arc(px, py, 6, 0, Math.PI * 2);
      this.ctx.fillStyle = point.label === 0 ? '#ff00ff' : '#00ffff';
      this.ctx.fill();
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
    }
  }

  public startTraining(): void {
    if (this.isTraining) return;
    this.isTraining = true;

    const trainLoop = () => {
      if (!this.isTraining) return;

      this.train(10);
      this.render();

      this.animationId = requestAnimationFrame(trainLoop);
    };

    trainLoop();
  }

  public stopTraining(): void {
    this.isTraining = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public reset(): void {
    this.stopTraining();
    this.initializeNetwork();
    this.render();
  }

  public clearData(): void {
    this.stopTraining();
    this.dataPoints = [];
    this.initializeNetwork();
    this.render();
  }

  public getStats(): { epoch: number; loss: number } {
    return { epoch: this.epoch, loss: this.loss };
  }

  public setLearningRate(rate: number): void {
    this.learningRate = rate;
  }

  public setLayers(layers: number[]): void {
    this.layers = layers;
    this.initializeNetwork();
    this.render();
  }
}

export function initPlayground(canvas: HTMLCanvasElement, config?: Partial<PlaygroundConfig>): NeuralPlayground {
  return new NeuralPlayground(canvas, config);
}
