export type SortableItemProps = {
  id: string;
  children: (props: { dragHandleProps: { [x: string]: Function }; isDragging: boolean }) => React.ReactNode;
};
