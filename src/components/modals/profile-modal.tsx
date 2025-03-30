import { useAppContext } from "@/contexts/app-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SkillTag } from "@/components/ui/skill-tag";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, UserCheck, MapPin, GraduationCap } from "lucide-react";

export function ProfileModal() {
  const { profileModal, hideProfileModal, profiles } = useAppContext();
  const [currentProfile, setCurrentProfile] = useState<typeof profiles[0] | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (profileModal.isOpen && profileModal.profileId) {
      const profile = profiles.find(p => p.id === profileModal.profileId);
      setCurrentProfile(profile);
      setIsPending(false);
    } else {
      setCurrentProfile(undefined);
    }
  }, [profileModal, profiles]);

  if (!currentProfile) return null;

  return (
    <Dialog open={profileModal.isOpen} onOpenChange={hideProfileModal}>
      <DialogContent className="sm:rounded-xl dark:bg-black bg-white border dark:border-white/10 border-black/10 p-0 overflow-hidden max-w-lg shadow-xl">
        <div className="relative">
          {/* Cover/Background */}
          <div className="h-40 bg-gradient-to-r from-primary via-accent to-primary relative">
            {currentProfile.avatar && (
              <img
                src={currentProfile.avatar}
                alt="Profile background"
                className="w-full h-full object-cover opacity-20"
              />
            )}
          </div>

          {/* Profile Avatar */}
          <div className="absolute bottom-0 left-6 transform translate-y-1/2">
            <div className="w-24 h-24 rounded-xl overflow-hidden border-4 dark:border-black border-white shadow-lg">
              {currentProfile.avatar ? (
                <img
                  src={currentProfile.avatar}
                  alt={currentProfile.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{currentProfile.fullName.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-16 dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{currentProfile.fullName}</DialogTitle>
            <p className="dark:text-gray-400 text-gray-600">{currentProfile.title} at {currentProfile.company}</p>
          </DialogHeader>

          <div className="mt-4 grid gap-4">
            {/* Bio */}
            <div>
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-sm dark:text-gray-400 text-gray-600">{currentProfile.bio}</p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-semibold mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {currentProfile.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <SkillTag>{skill}</SkillTag>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Location and Experience */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Location</h4>
                <p className="text-sm dark:text-gray-400 text-gray-600 flex items-center">
                  <MapPin className="mr-1 h-4 w-4 text-accent" />
                  {currentProfile.location}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Experience</h4>
                <p className="text-sm dark:text-gray-400 text-gray-600 flex items-center">
                  <GraduationCap className="mr-1 h-4 w-4 text-primary" />
                  {currentProfile.experience} years
                </p>
              </div>
            </div>

            {/* Connect Button */}
            <div className="flex justify-between mt-4">
              <Button
                variant="default"
                className={`w-full text-white text-lg py-6 ${
                  isPending ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
                }`}
                onClick={() => setIsPending(!isPending)}
              >
                {isPending ? (
                  <>
                    <UserCheck className="h-5 w-5 mr-2" />
                    Connection Pending
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Connect with {currentProfile.fullName.split(' ')[0]}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}