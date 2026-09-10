export interface Project {
  id: string;
  name: string;
  division: string;
  status: 'Active' | 'In-review';
  overview: string;
  tags: string[];
  repo: string;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'Atlas Reasoner',
    division: 'AI',
    status: 'Active',
    overview:
      'A trillion-parameter reasoning system with multi-step planning, tool use, and self-verification. Atlas Reasoner is trained on curated synthetic data and released with full evaluation suites, training checkpoints, and reproducibility scripts.',
    tags: ['Reasoning', 'Large models', 'Open weights'],
    repo: 'github.com/blackseashark5/atlas-reasoner',
  },
  {
    id: '2',
    name: 'Abyssal Decoder',
    division: 'Quantum',
    status: 'Active',
    overview:
      'An open-source quantum error correction decoder optimized for surface codes on superconducting hardware. Abyssal Decoder achieves real-time decoding throughput compatible with 1000-qubit arrays and supports biased-noise aware decoding.',
    tags: ['Error correction', 'Superconducting qubits', 'Real-time decoding'],
    repo: 'github.com/blackseashark5/abyssal-decoder',
  },
  {
    id: '3',
    name: 'Meridian Imaging',
    division: 'Medical',
    status: 'Active',
    overview:
      'A multi-modal medical imaging foundation model pre-trained on 12 million de-identified scans. Meridian supports zero-shot diagnosis across 8 modalities and is released with full weights, fine-tuning scripts, and clinical evaluation pipelines.',
    tags: ['Medical imaging', 'Foundation models', 'Clinical AI'],
    repo: 'github.com/blackseashark5/meridian-imaging',
  },
  {
    id: '4',
    name: 'Tidewave BCI',
    division: 'Neuro / BCI',
    status: 'In-review',
    overview:
      'A bidirectional brain-computer interface platform for real-time cortical decoding. Tidewave BCI includes electrode array designs, signal processing firmware, and neural decoding models — all released as open hardware and open software.',
    tags: ['BCI', 'Neural decoding', 'Open hardware'],
    repo: 'github.com/blackseashark5/tidewave-bci',
  },
  {
    id: '5',
    name: 'Kelp Manipulation Suite',
    division: 'Robotics',
    status: 'Active',
    overview:
      'A collection of 200 procedurally generated, physics-accurate environments for training and evaluating robotic manipulation policies. Kelp is compatible with standard RL frameworks and ships with baseline policies for benchmarking.',
    tags: ['Manipulation', 'Simulation', 'Reinforcement learning'],
    repo: 'github.com/blackseashark5/kelp-suite',
  },
  {
    id: '6',
    name: 'Trench Silicon',
    division: 'Chip',
    status: 'In-review',
    overview:
      'An open-source photonic neuromorphic accelerator taped out at 28nm. Trench Silicon achieves 40 TOPS/W on vision workloads with complete RTL, GDSII layout, firmware, and a reference compiler released under a permissive license.',
    tags: ['Neuromorphic', 'Photonic computing', 'Open hardware'],
    repo: 'github.com/blackseashark5/trench-silicon',
  },
];
