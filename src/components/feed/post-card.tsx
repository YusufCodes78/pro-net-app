import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { FeedItem } from "@/data/mock-data";
import { formatTimeAgo } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PostCardProps {
  item: FeedItem;
}

export function PostCard({ item }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 20) + 5);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [showReactions, setShowReactions] = useState(false);
  
  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };
  
  const handleReaction = (emoji: string) => {
    setLiked(true);
    setLikesCount(likesCount + 1);
    setShowReactions(false);
  };
  
  const reactions = ["👍", "🎉", "❤️", "🚀", "🙌", "👏"];
  
  return (
    <GlassCard className="p-4 relative overflow-visible">
      <div className="flex items-start mb-3">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gradient-to-r from-primary to-accent flex-shrink-0">
          <img 
            src={item.user.avatar} 
            alt={item.user.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold">{item.user.name}</h4>
          <p className="text-xs text-gray-400">{item.user.title}</p>
        </div>
        <div className="ml-auto text-xs text-gray-400 flex items-center">
          <i className="icon ion-md-time mr-1"></i>
          {formatTimeAgo(item.timestamp)}
        </div>
      </div>
      
      <div className="mb-3">
        <p>{item.content}</p>
      </div>
      
      {item.type === 'achievement' && (
        <div className="mb-4">
          <div className="glass-dark rounded-xl p-3">
            <div className="flex items-center text-accent text-sm font-medium mb-2">
              <i className="icon ion-md-trophy mr-2"></i>
              <span>New Skill Achievement</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 flex-grow rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${(item.metadata?.level || 1) * 20}%` }}
                ></div>
              </div>
              <span className="ml-2 text-xs font-medium">Level {item.metadata?.level}</span>
            </div>
            <h5 className="font-semibold mt-2">{item.metadata?.title}</h5>
          </div>
        </div>
      )}
      
      {item.type === 'project' && item.metadata?.imageUrl && (
        <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
          <img 
            src={item.metadata.imageUrl} 
            alt={item.metadata.title || 'Project image'} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-3">
              {item.metadata.category && (
                <div className="text-xs bg-accent/20 backdrop-blur-sm text-white px-2 py-1 rounded-full inline-block mb-1">
                  {item.metadata.category}
                </div>
              )}
              <h5 className="font-medium text-white">{item.metadata.title}</h5>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats row */}
      <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
        <div className="flex items-center">
          {liked ? (
            <div className="flex items-center">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 mr-1">
                <i className="icon ion-md-heart text-primary"></i>
              </span>
            </div>
          ) : likesCount > 0 ? (
            <div className="flex items-center">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 mr-1">
                <i className="icon ion-md-thumbs-up"></i>
              </span>
            </div>
          ) : null}
          {likesCount > 0 && (
            <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
          )}
        </div>
        
        <div className="flex space-x-3">
          {comments.length > 0 && (
            <button 
              className="hover:underline"
              onClick={() => setShowComments(!showComments)}
            >
              {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
            </button>
          )}
          <button className="hover:underline">Share</button>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between border-t border-b border-white/5 py-2">
        {/* Like/Reaction button */}
        <div className="relative">
          <motion.button 
            className={`flex items-center justify-center rounded-lg px-3 py-1.5 text-sm ${liked ? 'text-primary' : 'hover:bg-white/5'}`}
            onClick={handleLike}
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
            whileTap={{ scale: 0.95 }}
          >
            <i className={`icon ${liked ? 'ion-md-heart' : 'ion-md-thumbs-up'} mr-2`}></i>
            <span>{liked ? 'Liked' : (item.type === 'achievement' ? 'Congratulate' : 'Like')}</span>
          </motion.button>
          
          {/* Reactions menu */}
          <AnimatePresence>
            {showReactions && (
              <motion.div 
                className="absolute -top-12 left-0 flex bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10 shadow-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {reactions.map((emoji, index) => (
                  <motion.button
                    key={emoji}
                    className="w-8 h-8 text-xl flex items-center justify-center hover:bg-white/10 rounded-full"
                    onClick={() => handleReaction(emoji)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.05 }
                    }}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Comment button */}
        <motion.button 
          className="flex items-center justify-center rounded-lg px-3 py-1.5 text-sm hover:bg-white/5"
          onClick={() => setShowComments(!showComments)}
          whileTap={{ scale: 0.95 }}
        >
          <i className="icon ion-md-chatbubbles mr-2"></i>
          <span>Comment</span>
        </motion.button>
        
        {/* Share button */}
        <motion.button 
          className="flex items-center justify-center rounded-lg px-3 py-1.5 text-sm hover:bg-white/5"
          whileTap={{ scale: 0.95 }}
        >
          <i className="icon ion-md-share-alt mr-2"></i>
          <span>Share</span>
        </motion.button>
      </div>
      
      {/* Comments section */}
      <AnimatePresence>
        {showComments && (
          <motion.div 
            className="mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Comment input */}
            <form onSubmit={handleAddComment} className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gradient-to-r from-primary/20 to-accent/20 flex-shrink-0">
                <img 
                  src="https://i.pravatar.cc/150?u=you" 
                  alt="Your avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow glass-dark border border-white/10 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <GlassButton 
                type="submit" 
                size="xs" 
                variant="primary"
                disabled={!comment.trim()}
                className="ml-2"
              >
                <i className="icon ion-md-send"></i>
              </GlassButton>
            </form>
            
            {/* Comment list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {comments.map((text, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gradient-to-r from-primary/20 to-accent/20 flex-shrink-0">
                    <img 
                      src="https://i.pravatar.cc/150?u=you" 
                      alt="Your avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="glass-dark rounded-lg px-3 py-2 text-sm">
                    <div className="font-medium text-xs text-primary mb-1">You</div>
                    <p>{text}</p>
                  </div>
                  <div className="ml-2 flex flex-col text-xs text-gray-400 space-y-1">
                    <button className="hover:text-white">Like</button>
                    <button className="hover:text-white">Reply</button>
                  </div>
                </motion.div>
              ))}
              
              {comments.length === 0 && (
                <div className="text-center py-4 text-sm text-gray-400">
                  Be the first to comment on this post
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
