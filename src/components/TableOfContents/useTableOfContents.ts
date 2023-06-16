import { useState, useCallback, useMemo } from 'react';
import { ContentItem } from './types/ContentItem';
import { TableOfContentsArg } from './types/ContentItem';

const buildParentChildrenMap = (items: ContentItem[]) => {
    const map: Record<string, ContentItem[]> = {};
    items.forEach((item: ContentItem) => {
        const parentId = item.parentId || 'root';
        map[parentId] = map[parentId] || [];
        map[parentId].push(item);
    });
    return map;
};

export const useTableOfContents = ({ items }: TableOfContentsArg) => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set());

    const toggleExpand = useCallback((itemId: string) => {
        setExpanded((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    }, []);

    const expandAll = useCallback(() => {
        setExpanded(new Set(items.map(item => item.id)));
    }, [items]);

    const closeAll = useCallback(() => {
        setExpanded(new Set());
    }, []);

    const childrenMap = useMemo(() => buildParentChildrenMap(items), [items]);

    return { items, expanded, toggleExpand, expandAll, closeAll, childrenMap };
};
