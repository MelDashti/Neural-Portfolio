// Neural Network Canvas Types

export interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  type: 'decorative' | 'skill' | 'project';
  color: string;
  pulsePhase: number;
  connections: string[];
  hovered: boolean;
  data?: NodeData;
}

export interface NodeData {
  name?: string;
  category?: string;
  description?: string;
}

export interface Connection {
  from: string;
  to: string;
  strength: number;
  dataFlowProgress: number;
  active: boolean;
}

export interface NetworkConfig {
  nodeCount: number;
  connectionDistance: number;
  maxConnections: number;
  nodeSpeed: number;
  pulseSpeed: number;
  mouseInfluenceRadius: number;
  mouseInfluenceStrength: number;
  colors: {
    cyan: string;
    purple: string;
    pink: string;
  };
}

export interface MouseState {
  x: number;
  y: number;
  isOnCanvas: boolean;
}

export const defaultConfig: NetworkConfig = {
  nodeCount: 80,
  connectionDistance: 150,
  maxConnections: 4,
  nodeSpeed: 0.3,
  pulseSpeed: 0.02,
  mouseInfluenceRadius: 200,
  mouseInfluenceStrength: 0.5,
  colors: {
    cyan: '#39ff14',    // Neon green
    purple: '#00ffff',  // Cyan
    pink: '#ff00ff',    // Magenta pink
  },
};

export function getResponsiveConfig(width: number, isMobile: boolean): Partial<NetworkConfig> {
  if (isMobile || width < 768) {
    return {
      nodeCount: 40,
      connectionDistance: 100,
      maxConnections: 3,
    };
  }
  if (width < 1024) {
    return {
      nodeCount: 60,
      connectionDistance: 120,
      maxConnections: 3,
    };
  }
  return {};
}
