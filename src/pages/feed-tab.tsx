import { PostCard } from "@/components/feed/post-card";
import { useAppContext } from "@/contexts/app-context";

export default function FeedTab() {
  const { feedItems } = useAppContext();
  
  return (
    <div className="p-4 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Skills & Achievements</h2>
      </div>
      
      {/* Skills Feed */}
      <div className="space-y-4">
        {feedItems.map(item => (
          <PostCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
