export default function Header({
  title,
  subtitle,
  icon
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}) {
  return (
    <header className="">
      <div className="flex items-center">
        {icon && <div className="mr-2">{icon}</div>}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </header>
  );
}
