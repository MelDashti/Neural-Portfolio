// Neural Network Canvas Visualization
import type { Node, Connection, NetworkConfig, MouseState } from './types';
import { defaultConfig, getResponsiveConfig } from './types';

export class NeuralNetworkCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private nodes: Node[] = [];
  private connections: Connection[] = [];
  private config: NetworkConfig;
  private mouse: MouseState = { x: 0, y: 0, isOnCanvas: false };
  private animationId: number | null = null;
  private lastTime: number = 0;
  private isVisible: boolean = true;

  constructor(canvas: HTMLCanvasElement, customConfig?: Partial<NetworkConfig>) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;

    const isMobile = 'ontouchstart' in window;
    const responsiveConfig = getResponsiveConfig(window.innerWidth, isMobile);
    this.config = { ...defaultConfig, ...responsiveConfig, ...customConfig };

    this.init();
  }

  private init(): void {
    this.resize();
    this.createNodes();
    this.setupEventListeners();
    this.start();
  }

  private resize(): void {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    this.ctx.scale(dpr, dpr);

    // Store display size for calculations
    (this.canvas as any).displayWidth = rect.width;
    (this.canvas as any).displayHeight = rect.height;
  }

  private get width(): number {
    return (this.canvas as any).displayWidth || this.canvas.width;
  }

  private get height(): number {
    return (this.canvas as any).displayHeight || this.canvas.height;
  }

  private createNodes(): void {
    const colors = [this.config.colors.cyan, this.config.colors.purple, this.config.colors.pink];

    this.nodes = [];

    for (let i = 0; i < this.config.nodeCount; i++) {
      const baseRadius = Math.random() * 3 + 2;
      this.nodes.push({
        id: `node-${i}`,
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.config.nodeSpeed,
        vy: (Math.random() - 0.5) * this.config.nodeSpeed,
        radius: baseRadius,
        baseRadius,
        type: 'decorative',
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
        hovered: false,
      });
    }
  }

  private setupEventListeners(): void {
    // Mouse events
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseenter', () => this.mouse.isOnCanvas = true);
    this.canvas.addEventListener('mouseleave', () => this.mouse.isOnCanvas = false);

    // Touch events
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
    this.canvas.addEventListener('touchend', () => this.mouse.isOnCanvas = false);

    // Resize
    window.addEventListener('resize', this.handleResize.bind(this));

    // Visibility
    this.setupVisibilityObserver();
  }

  private handleMouseMove(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
    this.mouse.isOnCanvas = true;
  }

  private handleTouchMove(e: TouchEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const touch = e.touches[0];
    this.mouse.x = touch.clientX - rect.left;
    this.mouse.y = touch.clientY - rect.top;
    this.mouse.isOnCanvas = true;
  }

  private handleResize(): void {
    const isMobile = 'ontouchstart' in window;
    const responsiveConfig = getResponsiveConfig(window.innerWidth, isMobile);
    this.config = { ...this.config, ...responsiveConfig };

    this.resize();

    // Reposition nodes within new bounds
    this.nodes.forEach(node => {
      node.x = Math.min(node.x, this.width);
      node.y = Math.min(node.y, this.height);
    });
  }

  private setupVisibilityObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.animationId) {
            this.start();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(this.canvas);
  }

  private start(): void {
    this.lastTime = performance.now();
    this.animate();
  }

  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate(): void {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    const currentTime = performance.now();
    const deltaTime = Math.min((currentTime - this.lastTime) / 16.67, 2); // Normalize to ~60fps, cap at 2x
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private update(deltaTime: number): void {
    // Update nodes
    this.nodes.forEach(node => {
      // Apply mouse influence
      if (this.mouse.isOnCanvas) {
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.mouseInfluenceRadius && dist > 0) {
          const force = (1 - dist / this.config.mouseInfluenceRadius) * this.config.mouseInfluenceStrength;
          node.vx += (dx / dist) * force * deltaTime;
          node.vy += (dy / dist) * force * deltaTime;
        }
      }

      // Update position
      node.x += node.vx * deltaTime;
      node.y += node.vy * deltaTime;

      // Bounce off edges
      if (node.x < 0 || node.x > this.width) {
        node.vx *= -1;
        node.x = Math.max(0, Math.min(this.width, node.x));
      }
      if (node.y < 0 || node.y > this.height) {
        node.vy *= -1;
        node.y = Math.max(0, Math.min(this.height, node.y));
      }

      // Apply friction
      node.vx *= 0.99;
      node.vy *= 0.99;

      // Maintain minimum velocity
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed < this.config.nodeSpeed * 0.5) {
        const angle = Math.random() * Math.PI * 2;
        node.vx += Math.cos(angle) * 0.01;
        node.vy += Math.sin(angle) * 0.01;
      }

      // Update pulse
      node.pulsePhase += this.config.pulseSpeed * deltaTime;
      node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.5;
    });

    // Update connections
    this.updateConnections();
  }

  private updateConnections(): void {
    this.connections = [];

    for (let i = 0; i < this.nodes.length; i++) {
      let connectionCount = 0;

      for (let j = i + 1; j < this.nodes.length && connectionCount < this.config.maxConnections; j++) {
        const nodeA = this.nodes[i];
        const nodeB = this.nodes[j];

        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.connectionDistance) {
          const strength = 1 - dist / this.config.connectionDistance;
          this.connections.push({
            from: nodeA.id,
            to: nodeB.id,
            strength,
            dataFlowProgress: 0,
            active: strength > 0.5,
          });
          connectionCount++;
        }
      }
    }
  }

  private render(): void {
    // Clear canvas
    this.ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Render connections
    this.renderConnections();

    // Render nodes
    this.renderNodes();
  }

  private renderConnections(): void {
    const nodeMap = new Map(this.nodes.map(n => [n.id, n]));

    this.connections.forEach(conn => {
      const nodeA = nodeMap.get(conn.from);
      const nodeB = nodeMap.get(conn.to);

      if (!nodeA || !nodeB) return;

      this.ctx.beginPath();
      this.ctx.moveTo(nodeA.x, nodeA.y);
      this.ctx.lineTo(nodeB.x, nodeB.y);

      // Create gradient for connection
      const gradient = this.ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
      gradient.addColorStop(0, this.hexToRgba(nodeA.color, conn.strength * 0.3));
      gradient.addColorStop(1, this.hexToRgba(nodeB.color, conn.strength * 0.3));

      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = conn.strength * 1.5;
      this.ctx.stroke();
    });
  }

  private renderNodes(): void {
    this.nodes.forEach(node => {
      // Glow effect
      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.radius * 4
      );
      gradient.addColorStop(0, this.hexToRgba(node.color, 0.3));
      gradient.addColorStop(0.5, this.hexToRgba(node.color, 0.1));
      gradient.addColorStop(1, 'transparent');

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      // Core node
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = node.color;
      this.ctx.fill();
    });
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  public destroy(): void {
    this.stop();
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}

// Initialize function for easy use
export function initNeuralNetwork(canvas: HTMLCanvasElement, config?: Partial<NetworkConfig>): NeuralNetworkCanvas {
  return new NeuralNetworkCanvas(canvas, config);
}
