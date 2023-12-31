import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@hygraph/baukasten';
import { SortableItemProps } from './DraggableAssetCardContainer.types';

const DraggableAssetCardContainer = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'default'
  };

  const zIndexValue = isDragging ? 1000 : 0;

  return (
    <Box ref={setNodeRef} style={{ ...style, zIndex: zIndexValue }} {...attributes}>
      {children({ dragHandleProps: { ...listeners }, isDragging })}
    </Box>
  );
};

export { DraggableAssetCardContainer };
