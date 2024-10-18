import { Button } from "./ui/button";


export default function NoData({
    className = '',
    title = 'No Data',
    description = 'No data to display',
    buttonText = 'Add Data',
    onClick = () => {},
}) {
    return (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        <Button className="mt-4" onClick={onClick}>{buttonText}</Button>
        </div>
        </div>
    );
}
