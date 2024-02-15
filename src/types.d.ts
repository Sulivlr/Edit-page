export interface ApiPage {
  title: string;
  content: string;
}

export interface Page extends ApiPage {
  id: string;
}

export interface ApiPages {
  [about: string]: ApiPage;
  [contacts: string]: ApiPage;
}