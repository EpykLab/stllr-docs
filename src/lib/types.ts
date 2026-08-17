export type NavNode = {
  title: string;
  href: string;
  children: NavNode[];
};

export type SearchDoc = {
  id: string;
  title: string;
  href: string;
  summary: string;
  content: string;
  tags: string[];
};

export type DocHeading = {
  id: string;
  text: string;
  level: number;
};
