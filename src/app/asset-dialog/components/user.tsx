export function User({ name, picture }: { name: string; picture?: string }) {
  return (
    <div className="flex items-center space-x-1">
      {picture ? <img src={picture} className="h-24 w-24 rounded-full" /> : null}
      <span>{name}</span>
    </div>
  );
}
