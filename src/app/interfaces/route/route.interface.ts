export interface SelectedRoute {
  parent: string;
  child: string;
  id: string;
}

export interface Link {
  path: string;
  label: string;
  url: string;
}

export interface ActiveLink {
  path: string;
  label: string;
  url: string;
}