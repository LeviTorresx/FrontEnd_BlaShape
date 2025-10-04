interface Stats {
  label: string;
  value: string;
  color: string;
}

type StatisticsProps = {
  stats: Stats[];
};

export default function Statistics({ stats }: StatisticsProps) {
  return (
    <>
      {stats.map((item) => (
        <div
          key={item.label}
          className={`bg-gradient-to-r ${item.color} text-white rounded-xl p-4 shadow-md hover:scale-[1.02] transition-transform`}
        >
          <p className="text-sm opacity-80">{item.label}</p>
          <p className="text-2xl font-semibold">{item.value}</p>
        </div>
      ))}
    </>
  );
}
