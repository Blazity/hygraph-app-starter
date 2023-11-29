import { SVGAttributes } from 'react';

type Nullable<T> = T | null;
type Icon = (props: SVGAttributes<unknown>) => React.ReactElement;

export type { Nullable, Icon };
