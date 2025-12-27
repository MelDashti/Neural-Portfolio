// Publications Data

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueShort: string;
  year: number;
  abstract?: string;
  links: {
    paper?: string;
    doi?: string;
    code?: string;
    slides?: string;
  };
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: 'profes-2025',
    title: 'Enhancing Software Maintainability through LLM-Assisted Code Refactoring',
    authors: ['Meelad Dashti'],
    venue: 'International Conference on Product-Focused Software Process Improvement',
    venueShort: 'PROFES 2025',
    year: 2025,
    abstract: 'This paper explores the application of Large Language Models for automated code refactoring to improve software maintainability.',
    links: {},
    tags: ['LLM', 'Software Engineering', 'Code Refactoring', 'AI'],
  },
];
