// Projects Data - Updated from Resume & GitHub

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image?: string;
  links: {
    github?: string;
    demo?: string;
    paper?: string;
  };
  featured: boolean;
  category: 'rag' | 'computer-vision' | 'nlp' | 'research' | 'software' | 'other';
}

export const projects: Project[] = [
  {
    id: 'llm-refactoring',
    title: 'LLM-Assisted Code Refactoring',
    description: 'Fully automated refactoring system using LangGraph, static analysis (Radon, CQI, Bandit), and iterative prompting. Published at PROFES 2025.',
    longDescription: 'Developed a fully automated LLM-driven refactoring system demonstrating measurable improvements in software maintainability and outlining integration pathways into CI/CD workflows.',
    technologies: ['LangGraph', 'Python', 'Static Analysis', 'LLM', 'CI/CD'],
    links: {
      paper: '#publications',
    },
    featured: true,
    category: 'research',
  },
  {
    id: 'visual-compositionality-vlm',
    title: 'Visual Compositionality in VLMs',
    description: 'M.Sc. thesis investigating compositional representations in vision-language models. Evaluated 15+ models across 3 geometric spaces, discovered attention collapse in DINOv2, achieved SOTA with SigLIP v2.',
    longDescription: 'Comprehensive study of compositional zero-shot learning (CZSL) using Geodesic Decomposition Embeddings (GDE). Evaluated CLIP, SigLIP, DINO family (v1/v2/v3-7B), MERU, and HyCoCLIP on MIT-States, UT-Zappos, and C-GQA datasets. Developed gradient-weighted attention visualization pipeline. Key finding: GDE outperforms LDE by 3-17x; SigLIP v2 achieves 24.2% AUC on UT-Zappos.',
    technologies: ['PyTorch', 'CLIP', 'SigLIP', 'DINOv2', 'DINOv3-7B', 'MERU', 'Hyperbolic Geometry', 'Attention Mechanisms', 'HPC'],
    links: {},
    featured: true,
    category: 'research',
  },
  {
    id: 'arol-chatbot',
    title: 'AROL Industrial Chatbot',
    description: 'RAG-powered chatbot for industrial documentation using fine-tuned LLaMA-3B with LoRA and Pinecone vector search.',
    longDescription: 'Fine-tuned LLaMA-3B using LoRA (Unsloth) with 4/8-bit quantization. Built full pipeline including scraping (Scrapy + Firecrawl), dataset creation, and deployment on Hugging Face Spaces with GPU inference.',
    technologies: ['LLaMA', 'LoRA', 'Unsloth', 'Pinecone', 'RAG', 'Hugging Face', 'Gradio'],
    links: {
      github: 'https://github.com/MelDashti/Arol-ChatBot',
    },
    featured: true,
    category: 'rag',
  },
  {
    id: 'ai-meeting-assistant',
    title: 'AI Meeting Assistant',
    description: 'Production-grade meeting assistant with multi-model transcription (WhisperX, MLX), achieving sub-2s latency and 95% accuracy.',
    longDescription: 'Architected real-time LLM moderator using LangGraph with safety controls, semantic deduplication. Implemented RAG pipeline with ChromaDB and cross-encoder reranking. Built Talk-to-SQL agent for secure database interaction.',
    technologies: ['WhisperX', 'LangGraph', 'ChromaDB', 'FastAPI', 'WebSockets', 'React', 'Electron'],
    links: {},
    featured: true,
    category: 'rag',
  },
  {
    id: 'affordance3d',
    title: 'Affordance3DHighlighter',
    description: '3D affordance detection and visualization for advanced ML course at Politecnico di Torino.',
    longDescription: 'Computer vision project for detecting and highlighting object affordances in 3D space, enabling robots and AI systems to understand how objects can be used.',
    technologies: ['PyTorch', 'Computer Vision', '3D Deep Learning', 'Python'],
    links: {
      github: 'https://github.com/MelDashti/Affordance3DHighlighter',
    },
    featured: true,
    category: 'computer-vision',
  },
  {
    id: 'neural-networks-tf',
    title: 'Neural Networks with TensorFlow',
    description: 'Deep learning implementations and experiments using TensorFlow framework.',
    longDescription: 'Collection of neural network architectures implemented from scratch using TensorFlow, including CNNs, RNNs, and various deep learning experiments.',
    technologies: ['TensorFlow', 'Python', 'Deep Learning', 'Jupyter'],
    links: {
      github: 'https://github.com/MelDashti/Neural-Networks-With-TensorFlow',
    },
    featured: false,
    category: 'nlp',
  },
  {
    id: 'ci-symbolic-regression',
    title: 'Symbolic Regression Research',
    description: 'Computational Intelligence project on symbolic regression using genetic programming.',
    technologies: ['Python', 'Genetic Programming', 'Machine Learning'],
    links: {
      github: 'https://github.com/MelDashti/CI2024_project-work',
    },
    featured: false,
    category: 'research',
  },
  {
    id: 'citizen-app',
    title: 'Citizen Complaint App',
    description: 'Android application for city-wide complaint reporting using MVVM architecture.',
    longDescription: 'Developed and shipped Android application using MVVM, Retrofit, and RESTful JSON APIs, streamlining citizen-municipality workflows.',
    technologies: ['Android', 'Kotlin', 'MVVM', 'Retrofit', 'REST APIs'],
    links: {},
    featured: false,
    category: 'software',
  },
];

export const featuredProjects = projects.filter(p => p.featured);

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category);
}
