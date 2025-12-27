// Experience Data - Updated from Resume

export interface Experience {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
  link?: string;
}

export const experiences: Experience[] = [
  {
    id: 'zirak',
    type: 'work',
    title: 'AI/ML Engineer',
    organization: 'Zirak srl',
    location: 'Turin, Italy (Remote)',
    period: 'Feb 2025 - Present',
    description: [
      'Architected production-focused AI meeting assistant with multi-model transcription (WhisperX, MLX Whisper), achieving sub-2s latency and 95% accuracy',
      'Built real-time LLM moderator using LangGraph with safety controls, semantic deduplication, reducing repeated output by 80%',
      'Implemented RAG pipeline using ChromaDB (BGE-M3 embeddings) and cross-encoder reranking for context-aware reasoning',
      'Developed agentic workflows with multi-provider LLMs (Groq Llama-3.3-70B) with 9-stage reasoning loop and sub-10s processing',
      'Containerized FastAPI microservices with async WebSocket streaming, bridging Python inference with React/Electron frontend',
      'Migrating to AWS (OpenSearch, S3, ECS, Bedrock) for scalable inference and production deployment',
      'Built Talk-to-SQL agent (Qwen-3-14B + LangGraph) with SQL safety checks and human-in-the-loop approval',
    ],
    technologies: ['LangGraph', 'RAG', 'ChromaDB', 'FastAPI', 'AWS', 'WhisperX', 'WebSockets', 'Docker'],
  },
  {
    id: 'arol',
    type: 'work',
    title: 'AI/ML Engineer',
    organization: 'AROL Group & Politecnico di Torino',
    location: 'Turin, Italy',
    period: 'Jun 2024 - Feb 2025',
    description: [
      'Fine-tuned LLaMA-3B using LoRA (Unsloth) with 4/8-bit quantization for efficient training and inference',
      'Built supporting pipeline: scraping (Scrapy + Firecrawl), dataset creation, and supervised evaluation',
      'Integrated RAG with Pinecone vector search to ground answers in internal documentation',
      'Deployed chatbot on Hugging Face Spaces with GPU inference and Gradio frontend',
    ],
    technologies: ['LLaMA', 'LoRA', 'Unsloth', 'Pinecone', 'RAG', 'Scrapy', 'Hugging Face', 'Gradio'],
  },
  {
    id: 'pishgaman',
    type: 'work',
    title: 'Software Engineer',
    organization: 'Pishgaman Innovation Accelerator',
    location: 'Yazd, Iran',
    period: 'Dec 2021 - Feb 2023',
    description: [
      'Developed and shipped Android application using MVVM, Retrofit, and RESTful JSON APIs',
      'Enabled city-wide complaint reporting, streamlining citizen-municipality workflows',
    ],
    technologies: ['Android', 'Kotlin', 'MVVM', 'Retrofit', 'REST APIs'],
  },
  {
    id: 'utwente',
    type: 'education',
    title: 'Master Thesis Research',
    organization: 'University of Twente',
    location: 'Enschede, Netherlands',
    period: 'Jul 2025 - Mar 2026 (Expected)',
    description: [
      'Thesis: "Hyperbolic Compositionality in Vision-Language Models"',
      'Designing and scaling PyTorch pipelines on GPU cluster with DINOv3-7B, CLIP, and Qwen-VL',
      'Analyzing hyperbolic embeddings to improve compositional reasoning in multimodal AI',
    ],
    link: 'https://www.utwente.nl/',
  },
  {
    id: 'polito',
    type: 'education',
    title: 'M.Sc. Computer Engineering',
    organization: 'Politecnico di Torino',
    location: 'Turin, Italy',
    period: '2023 - Apr 2026 (Expected)',
    description: [
      'Specialization: AI and Data Analytics',
      'Expected Grade: 104/110',
    ],
    link: 'https://www.polito.it/',
  },
  {
    id: 'yazd',
    type: 'education',
    title: 'B.Sc. Computer Engineering',
    organization: 'Yazd University',
    location: 'Yazd, Iran',
    period: '2018 - 2022',
    description: [
      'Specialization: Software Engineering',
    ],
  },
];

export const workExperience = experiences.filter(e => e.type === 'work');
export const education = experiences.filter(e => e.type === 'education');
