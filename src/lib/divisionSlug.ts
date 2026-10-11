/** URL slug for a division, derived from its short name: "Neuro / BCI" -> "neuro-bci". */
export function divisionSlug(shortName: string): string {
  return shortName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export type PublicationStatus = 'published' | 'preprint' | 'ongoing';

export const statusLabels: Record<PublicationStatus, string> = {
  published: 'Published',
  preprint: 'Preprint',
  ongoing: 'Ongoing research',
};
