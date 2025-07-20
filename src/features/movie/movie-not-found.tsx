import { Clapperboard } from "lucide-react";

export const MovieNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <Clapperboard className="size-20 text-muted-foreground mb-2" />
        <h2 className="text-2xl font-bold">Фильм не найден</h2>
        <p className="text-muted-foreground max-w-md">
          К сожалению, мы не смогли найти фильм по вашему запросу. Попробуйте
          изменить параметры поиска.
        </p>
      </div>
    </div>
  );
};
