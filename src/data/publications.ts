export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  date: string;
  area: string;
  abstract: string;
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: '1',
    title: 'Atlas-7: Scaling Reasoning Systems Beyond Trillion-Parameter Frontiers',
    authors: 'Ada Reyes, Lena Zimmer, Kenji Okada et al.',
    venue: 'NEURIPS 2026',
    date: 'JUL 28, 2026',
    area: 'AI',
    abstract:
      'We present Atlas-7, a trillion-parameter reasoning system demonstrating emergent multi-step planning capabilities. We characterize the scaling laws governing reasoning quality, introduce a novel evaluation suite, and release full training checkpoints under an open license.',
    tags: ['Reasoning', 'Scaling laws', 'Evaluation'],
  },
  {
    id: '2',
    title: 'Surface Code Optimization for Superconducting Qubit Arrays at the 1000-Qubit Scale',
    authors: 'Igor Demidov, Wei Chen, Rashid Omar',
    venue: 'NATURE PHYSICS',
    date: 'JUN 15, 2026',
    area: 'Quantum',
    abstract:
      'This work demonstrates practical quantum error correction on a 1000-qubit superconducting array. We achieve a logical error rate reduction of three orders of magnitude using an optimized surface code with biased-noise awareness.',
    tags: ['Error correction', 'Superconducting qubits', 'Fault tolerance'],
  },
  {
    id: '3',
    title: 'Real-Time Cortical Decoding for ALS Communication Restoration',
    authors: 'Nadia Hassan, Sven Nielsen',
    venue: 'NATURE MEDICINE',
    date: 'MAY 03, 2026',
    area: 'Neuro / BCI',
    abstract:
      'A bidirectional brain-computer interface enabling real-time text communication for patients with advanced ALS. The system achieves 78 words per minute with 92% accuracy using a 128-channel cortical array and novel decoding architecture.',
    tags: ['Neural decoding', 'BCI', 'Clinical trial'],
  },
  {
    id: '4',
    title: 'Tidewave: Sim-to-Real Transfer for Dexterous In-Hand Manipulation',
    authors: 'Maria Voss, Elena Borisova',
    venue: 'ICRA 2026',
    date: 'APR 20, 2026',
    area: 'Robotics',
    abstract:
      'We introduce Tidewave, a sim-to-real framework that closes the reality gap for dexterous manipulation. By combining domain randomization with a learned dynamics adapter, we achieve zero-shot transfer on 14 manipulation tasks.',
    tags: ['Sim-to-real', 'Dexterous manipulation', 'Locomotion'],
  },
  {
    id: '5',
    title: 'Abyssal: Open-Source Photonic Neuromorphic Accelerator at 28nm',
    authors: 'Pavel Rostov, Tomás Almeida',
    venue: 'ISSCC 2026',
    date: 'FEB 11, 2026',
    area: 'Chip',
    abstract:
      'We present Abyssal, the first fully open-source photonic neuromorphic accelerator taped out at 28nm. The chip achieves 40 TOPS/W on vision workloads with complete RTL, layout, and firmware released under a permissive license.',
    tags: ['Neuromorphic silicon', 'Photonic computing', 'Open hardware'],
  },
  {
    id: '6',
    title: 'Meridian: Foundation Models for Multi-Modal Medical Imaging',
    authors: 'Hannah Berg, Yuki Tanaka, Julia Marsh',
    venue: 'NATURE MACHINE INTELLIGENCE',
    date: 'JAN 22, 2026',
    area: 'Medical',
    abstract:
      'Meridian is a foundation model pre-trained on 12 million de-identified medical images across modalities. We demonstrate state-of-the-art transfer performance on 8 diagnostic tasks with full model weights and evaluation code released.',
    tags: ['Medical imaging', 'Foundation models', 'Clinical AI'],
  },
  {
    id: '7',
    title: 'Kelp: Open Manipulation Suite for Unstructured Robotic Environments',
    authors: 'Maria Voss, Elena Borisova',
    venue: 'RSS 2026',
    date: 'JAN 08, 2026',
    area: 'Robotics',
    abstract:
      'The Kelp Manipulation Suite provides 200 procedurally generated environments for training and evaluating robotic manipulation policies. All environments are physics-accurate, fully open-source, and compatible with standard RL frameworks.',
    tags: ['Manipulation', 'Open source', 'Reinforcement learning'],
  },
  {
    id: '8',
    title: 'Post-Quantum Lattice Cryptography for Edge Sensor Networks',
    authors: 'Wei Chen, Igor Demidov',
    venue: 'CRYPTO 2026',
    date: 'DEC 15, 2025',
    area: 'Quantum',
    abstract:
      'We present a lattice-based encryption scheme optimized for resource-constrained edge sensors. The implementation achieves 12ms key exchange on 8-bit microcontrollers with formal security proofs and an open reference library.',
    tags: ['Post-quantum crypto', 'Edge computing', 'Open source'],
  },
];
