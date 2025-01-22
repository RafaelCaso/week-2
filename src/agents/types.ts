export interface Project {
  address: string;
  network: string;
  project_url: string;
  github_url: string;
  demo_url: string;
  submission_time?: Date;
}

export interface Evaluation {
  score: number;
  feedback: string;
  strengths: string[];
  areas_for_improvement: string[];
  agent_name: string;
}

export interface ConsensusResult {
  project: Project;
  final_score: number;
  evaluations: Evaluation[];
  rank?: number;
  reasoning: string;
  unified_strengths: string[];
  unified_improvements: string[];
}
