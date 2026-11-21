type CardProps = {
  title: string;
  body: string;
};

export default function Card({ title, body }: CardProps) {
  return (
    <div className="min-h-44 w-full rounded-md border border-emerald-600 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 p-6 text-white shadow-md transition-colors dark:border-sky-400 dark:from-sky-900 dark:via-blue-800 dark:to-indigo-900 dark:text-sky-50">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 text-emerald-50 dark:text-sky-100">{body}</p>
    </div>
  );
}