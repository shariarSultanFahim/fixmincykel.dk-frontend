export interface ArticleSection {
  titleKey: string;
  bodyKey: string;
}

export interface ArticleItem {
  id: string;
  imageId: string;
  imageAltKey: string;
  tagKey: string;
  titleKey: string;
  readTimeKey: string;
  dateKey: string;
  introKey: string;
  sections: ArticleSection[];
}
