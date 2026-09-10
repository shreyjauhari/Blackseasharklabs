import {
  Brain,
  Atom,
  HeartPulse,
  CircuitBoard,
  Cpu,
  Bot,
  type LucideIcon,
} from 'lucide-react';

export interface Division {
  id: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  subtitle: string;
  description: string;
  tags: string[];
  lead: string;
  members: number;
}

export const divisions: Division[] = [
  {
    id: 'ai',
    name: 'BlackSeaShark5 AI',
    shortName: 'AI',
    icon: Brain,
    subtitle: 'Reasoning, scaling & evaluation',
    description:
      'Researching the foundations of machine intelligence — from large-scale reasoning systems and emergent capabilities to rigorous evaluation science. We build open models, benchmarks, and training infrastructure that advance the frontier of artificial intelligence while remaining fully reproducible.',
    tags: ['Reasoning systems', 'Scaling laws', 'Evaluation science', 'Alignment', 'Synthetic data'],
    lead: 'Dr. Ada Reyes',
    members: 34,
  },
  {
    id: 'quantum',
    name: 'BlackSeaShark5 Quantum',
    shortName: 'Quantum',
    icon: Atom,
    subtitle: 'Computing, sensing & cryptography',
    description:
      'Advancing quantum information science across computing architectures, sensing platforms, and post-quantum cryptographic protocols. Our work spans superconducting qubit systems, photonic networks, and error-correcting codes designed for fault-tolerant operation at scale.',
    tags: ['Superconducting qubits', 'Quantum sensing', 'Post-quantum crypto', 'Error correction'],
    lead: 'Dr. Igor Demidov',
    members: 21,
  },
  {
    id: 'medical',
    name: 'BlackSeaShark5 Medical',
    shortName: 'Medical',
    icon: HeartPulse,
    subtitle: 'Diagnostics, genomics & therapeutics',
    description:
      'Bridging computational science and clinical medicine to develop diagnostic tools, genomic analysis pipelines, and therapeutic discovery platforms. We partner with hospitals and research institutions to translate open science into measurable patient outcomes.',
    tags: ['Genomic analysis', 'Medical imaging', 'Therapeutic discovery', 'Clinical AI'],
    lead: 'Dr. Hannah Berg',
    members: 18,
  },
  {
    id: 'neuro',
    name: 'BlackSeaShark5 Neuro / BCI',
    shortName: 'Neuro / BCI',
    icon: CircuitBoard,
    subtitle: 'Neural interfaces & brain mapping',
    description:
      'Developing bidirectional brain-computer interfaces, neural decoding algorithms, and high-resolution cortical mapping techniques. Our research aims to restore communication and motor function for patients with neurological conditions while advancing fundamental neuroscience.',
    tags: ['Neural decoding', 'Cortical mapping', 'Motor prosthetics', 'Signal processing'],
    lead: 'Dr. Nadia Hassan',
    members: 16,
  },
  {
    id: 'robotics',
    name: 'BlackSeaShark5 Robotics',
    shortName: 'Robotics',
    icon: Bot,
    subtitle: 'Manipulation, locomotion & autonomy',
    description:
      'Building autonomous systems that perceive, reason, and act in unstructured environments. From dexterous manipulation and legged locomotion to multi-agent coordination, we develop the control algorithms and hardware platforms that enable robots to work alongside humans.',
    tags: ['Dexterous manipulation', 'Legged locomotion', 'Multi-agent systems', 'Sim-to-real'],
    lead: 'Dr. Maria Voss',
    members: 22,
  },
  {
    id: 'chip',
    name: 'BlackSeaShark5 Chip',
    shortName: 'Chip',
    icon: Cpu,
    subtitle: 'Silicon, photonics & neuromorphic design',
    description:
      'Designing next-generation computing hardware — from neuromorphic silicon and photonic accelerators to domain-specific architectures optimized for AI workloads. We tape out open chips, publish full RTL, and build the tooling that makes custom silicon accessible to researchers.',
    tags: ['Neuromorphic silicon', 'Photonic computing', 'Open RTL', 'AI accelerators'],
    lead: 'Dr. Pavel Rostov',
    members: 18,
  },
];
