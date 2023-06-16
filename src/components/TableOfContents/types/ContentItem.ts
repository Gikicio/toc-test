export type ContentItem = {
    id: string;
    level: number;
    name: string;
    parentId?: string | null;
    __typename?: string;
};

export type TableOfContentsArg = {
    items: ContentItem[];
};
