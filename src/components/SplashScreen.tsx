import { motion, AnimatePresence } from "framer-motion";

type SplashScreenProps = {
    isVisible: boolean;
    progress?: number;
};

export default function SplashScreen({
                                         isVisible,
                                         progress = 0,
                                     }: SplashScreenProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#09111f]"
                >
                    <div className="flex flex-col items-center gap-6">
                        <div className="text-white text-2xl md:text-4xl font-bold tracking-tight">
                            Arthur Bouchaud
                        </div>

                        <div className="h-1.5 w-52 overflow-hidden rounded-full bg-white/10 md:w-72">
                            <motion.div
                                className="h-full bg-[#ff8a00]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeOut" }}
                            />
                        </div>

                        <div className="text-sm text-white/60 md:text-base">
                            Chargement... {Math.round(progress)}%
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}