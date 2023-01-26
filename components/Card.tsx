import type { ComponentChildren } from "preact";
import classNames from 'classnames';

interface Props {
  children: ComponentChildren;
  className?: string;
}

export const Card = ({ children, className }: Props) => {
  return (
    <div className={classNames("rounded-lg shadow w-full bg-white border border-[#D1D1DB] py-10 px-4", className)}>
      {children}
    </div>
  );
};
