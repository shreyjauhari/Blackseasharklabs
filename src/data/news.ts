export interface NewsItem {
  id: string;
  date: string;
  category: 'Breakthrough' | 'Announcement' | 'Award' | 'Event' | 'Conference';
  headline: string;
  summary: string;
}

export const newsItems: NewsItem[] = [
  {
    id: '1',
    date: 'JUL 28, 2026',
    category: 'Breakthrough',
    headline: 'Atlas-7 reasoning system demonstrates emergent multi-step planning at trillion-parameter scale',
    summary:
      'Our AI division has shown that Atlas-7 exhibits spontaneous multi-step reasoning and tool-use capabilities, with full checkpoints and evaluation suites released openly.',
  },
  {
    id: '2',
    date: 'JUL 15, 2026',
    category: 'Award',
    headline: 'Dr. Nadia Hassan receives the Kavli Foundation Neuroscience Prize for BCI communication work',
    summary:
      'The Kavli Foundation has awarded Dr. Hassan its annual neuroscience prize in recognition of her work restoring real-time communication for patients with advanced ALS.',
  },
  {
    id: '3',
    date: 'JUN 30, 2026',
    category: 'Announcement',
    headline: 'BlackSeaShark5 Labs opens second research campus focused on quantum and silicon integration',
    summary:
      'The new campus will house 40 researchers working at the intersection of quantum computing and custom silicon, with fabrication facilities opening in Q4 2026.',
  },
  {
    id: '4',
    date: 'JUN 15, 2026',
    category: 'Breakthrough',
    headline: 'Surface code optimization achieves three orders of magnitude logical error rate reduction',
    summary:
      'The Quantum division demonstrated practical error correction on a 1000-qubit array using a biased-noise aware surface code, published in Nature Physics.',
  },
  {
    id: '5',
    date: 'MAY 20, 2026',
    category: 'Event',
    headline: 'Open Science Symposium 2026: registration opens for the annual open reproducibility conference',
    summary:
      'Researchers from 30 institutions will gather to discuss open benchmarks, reproducible training, and responsible release practices. Registration is free and virtual attendance is supported.',
  },
  {
    id: '6',
    date: 'MAY 03, 2026',
    category: 'Breakthrough',
    headline: 'Tidewave BCI achieves 78 words per minute real-time cortical decoding in clinical trial',
    summary:
      'A 128-channel cortical array enabled ALS patients to communicate at 78 WPM with 92% accuracy, results published in Nature Medicine with full open hardware release.',
  },
  {
    id: '7',
    date: 'APR 20, 2026',
    category: 'Conference',
    headline: 'BlackSeaShark5 presents 4 papers at ICRA 2026 on sim-to-real transfer and legged locomotion',
    summary:
      'The Robotics division will present work on the Tidewave sim-to-real framework, Kelp manipulation environments, and multi-agent coordination at the IEEE International Conference on Robotics and Automation.',
  },
  {
    id: '8',
    date: 'MAR 10, 2026',
    category: 'Announcement',
    headline: 'Meridian Imaging foundation model weights released under permissive open license',
    summary:
      'The Medical division has released full model weights, fine-tuning scripts, and clinical evaluation pipelines for the Meridian multi-modal imaging foundation model.',
  },
];
