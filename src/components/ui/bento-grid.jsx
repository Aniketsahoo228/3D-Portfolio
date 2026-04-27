import { cn } from "../../lib/utils";

export const BentoGrid = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-black/10 bg-[rgba(255,255,255,0.72)] p-4 backdrop-blur-md transition duration-200 hover:shadow-xl dark:border-white/10 dark:bg-[rgba(3,0,20,0.72)] dark:shadow-none",
        className
      )}>
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div
          className="mt-2 mb-2 font-sans font-bold text-gray-900 dark:text-white">
          {title}
        </div>
        <div
          className="font-sans text-xs font-normal text-gray-700 dark:text-gray-300">
          {description}
        </div>
      </div>
    </div>
  );
};
