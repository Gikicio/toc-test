import React, { FC, memo } from 'react';
import { ContentItem } from './types/ContentItem';
import { useTableOfContents } from './useTableOfContents';

type TableOfContentsProps = ReturnType<typeof useTableOfContents>;

const Item: FC<{
    item: ContentItem;
    childrenMap: Record<string, ContentItem[]>;
    expanded: Set<string>;
    toggleExpand: (itemId: string) => void;
}> = memo(({ item, childrenMap, expanded, toggleExpand }) => {
    const children = childrenMap[item.id] || [];

    return (
        <div style={{ marginLeft: 20 }}>
            <button onClick={() => toggleExpand(item.id)}>{item.name}</button>
            {expanded.has(item.id) &&
                children.map((child) => (
                    <Item
                        key={child.id}
                        item={child}
                        childrenMap={childrenMap}
                        expanded={expanded}
                        toggleExpand={toggleExpand}
                    />
                ))}
        </div>
    );
});

export const TableOfContents: FC<TableOfContentsProps> = ({
    items,
    expanded,
    toggleExpand,
    expandAll,
    closeAll,
    childrenMap
}) => {
    return (
        <div>
            <button onClick={expandAll}>Expand All</button>
            <button onClick={closeAll}>Close All</button>
            {(childrenMap['root'] || []).map((item) => (
                <Item
                    key={item.id}
                    item={item}
                    childrenMap={childrenMap}
                    expanded={expanded}
                    toggleExpand={toggleExpand}
                />
            ))}
        </div>
    );
};
