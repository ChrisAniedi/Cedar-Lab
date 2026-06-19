import { Icon } from '@/lib/icons';
import type { BuildItem } from '@/lib/site-data';

export default function BuildCard({ item, i }: { item: BuildItem; i: number }) {
  return (
    <div className={`bcard reveal d${i % 4}`}>
      <div className="ic"><Icon name={item.icon} /></div>
      <h3>{item.name}</h3>
      <p>{item.desc}</p>
    </div>
  );
}
