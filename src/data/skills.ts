// Skills Data - Updated from Resume

export interface Skill {
  id: string;
  name: string;
  category: 'ai-ml' | 'frameworks' | 'languages' | 'cloud' | 'tools';
  proficiency: number; // 1-5
}

export const skills: Skill[] = [
  // AI/ML Core
  { id: 'rag', name: 'RAG Systems', category: 'ai-ml', proficiency: 5 },
  { id: 'langchain', name: 'LangChain', category: 'ai-ml', proficiency: 5 },
  { id: 'langgraph', name: 'LangGraph', category: 'ai-ml', proficiency: 5 },
  { id: 'lora', name: 'LoRA/QLoRA Fine-tuning', category: 'ai-ml', proficiency: 5 },
  { id: 'prompt-eng', name: 'Prompt Engineering', category: 'ai-ml', proficiency: 5 },
  { id: 'cv', name: 'Computer Vision', category: 'ai-ml', proficiency: 4 },
  { id: 'nlp', name: 'NLP', category: 'ai-ml', proficiency: 5 },
  { id: 'diffusion', name: 'Diffusion Models', category: 'ai-ml', proficiency: 3 },
  { id: 'whisperx', name: 'WhisperX/FasterWhisper', category: 'ai-ml', proficiency: 5 },
  { id: 'clip', name: 'CLIP', category: 'ai-ml', proficiency: 4 },

  // Frameworks
  { id: 'pytorch', name: 'PyTorch', category: 'frameworks', proficiency: 5 },
  { id: 'tensorflow', name: 'TensorFlow', category: 'frameworks', proficiency: 4 },
  { id: 'huggingface', name: 'Hugging Face', category: 'frameworks', proficiency: 5 },
  { id: 'sklearn', name: 'scikit-learn', category: 'frameworks', proficiency: 4 },
  { id: 'fastapi', name: 'FastAPI', category: 'frameworks', proficiency: 5 },
  { id: 'react', name: 'React', category: 'frameworks', proficiency: 4 },
  { id: 'electron', name: 'Electron', category: 'frameworks', proficiency: 3 },

  // Languages
  { id: 'python', name: 'Python', category: 'languages', proficiency: 5 },
  { id: 'javascript', name: 'JavaScript', category: 'languages', proficiency: 4 },
  { id: 'typescript', name: 'TypeScript', category: 'languages', proficiency: 4 },
  { id: 'java', name: 'Java', category: 'languages', proficiency: 4 },
  { id: 'cpp', name: 'C++', category: 'languages', proficiency: 3 },
  { id: 'kotlin', name: 'Kotlin', category: 'languages', proficiency: 3 },
  { id: 'sql', name: 'SQL', category: 'languages', proficiency: 4 },

  // Cloud & Infrastructure
  { id: 'aws-s3', name: 'AWS S3', category: 'cloud', proficiency: 4 },
  { id: 'aws-lambda', name: 'AWS Lambda', category: 'cloud', proficiency: 3 },
  { id: 'aws-ecs', name: 'AWS ECS', category: 'cloud', proficiency: 4 },
  { id: 'aws-opensearch', name: 'AWS OpenSearch', category: 'cloud', proficiency: 4 },
  { id: 'aws-sagemaker', name: 'AWS SageMaker', category: 'cloud', proficiency: 3 },
  { id: 'aws-bedrock', name: 'AWS Bedrock', category: 'cloud', proficiency: 4 },
  { id: 'docker', name: 'Docker', category: 'cloud', proficiency: 5 },

  // Tools & DBs
  { id: 'pinecone', name: 'Pinecone', category: 'tools', proficiency: 5 },
  { id: 'chromadb', name: 'ChromaDB', category: 'tools', proficiency: 5 },
  { id: 'websockets', name: 'WebSockets', category: 'tools', proficiency: 4 },
  { id: 'git', name: 'Git', category: 'tools', proficiency: 5 },
  { id: 'mcp', name: 'MCP Servers', category: 'tools', proficiency: 4 },
  { id: 'pandas', name: 'pandas/NumPy', category: 'tools', proficiency: 5 },
];

export const skillCategories = [
  { id: 'ai-ml', name: 'AI & Machine Learning', color: '#00ff41' },
  { id: 'frameworks', name: 'Frameworks', color: '#00d4ff' },
  { id: 'languages', name: 'Languages', color: '#ff0080' },
  { id: 'cloud', name: 'Cloud & AWS', color: '#f0ff00' },
  { id: 'tools', name: 'Tools & Databases', color: '#9d00ff' },
];

export function getSkillsByCategory(category: string): Skill[] {
  return skills.filter(s => s.category === category);
}
