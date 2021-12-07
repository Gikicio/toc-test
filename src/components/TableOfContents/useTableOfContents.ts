import { ContentItem } from './types/ContentItem';

type TableOfContentsArg = {
    items: ContentItem[];
};

// TODO: expand/collapse of items
export const useTableOfContents = ({ items }: TableOfContentsArg) => {
    const onClick = (item: ContentItem) => () => console.log(item);

    return { items, onClick };
};
