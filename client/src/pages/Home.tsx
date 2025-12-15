import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Component, ReactNode, useState, useEffect, useRef } from "react";
import parchmentTexture from "@assets/generated_images/old_worn_parchment_paper_texture.png";
import skullLogo from "@assets/generated_images/one_piece_style_jolly_roger_skull_and_crossbones_with_chef_hat.png";
import onePieceLogo from "@assets/LS20251215001355_1765758034044.png";
import onePieceBg from "@assets/219506_1765758833921.gif";
import zoroGif from "@assets/2e55f7894bf872a68daca8829ff27379_(1)_1765764032811.gif";

const ONE_PIECE_THEME_URL = "/windmill-village.mp3";

// Enter Screen Component - User must click to start
function EnterScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black"
    >
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${zoroGif})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
        }}
      />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <motion.img
          src={onePieceLogo}
          alt="One Piece"
          className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(255,215,0,0.8)' }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black font-bold text-2xl rounded-full shadow-[0_0_30px_rgba(255,215,0,0.5)] border-4 border-yellow-300 font-cairo tracking-wider"
          animate={{
            boxShadow: [
              '0 0 20px rgba(255,215,0,0.4)',
              '0 0 40px rgba(255,215,0,0.6)',
              '0 0 20px rgba(255,215,0,0.4)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ENTER
        </motion.button>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
          className="text-yellow-500/70 text-sm font-cairo"
        >
          Click to start the adventure
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// Loading Screen Component with Zoro Split Animation
function LoadingScreen({ onMusicStart }: { onMusicStart: () => void }) {
  const [isSplitting, setIsSplitting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((err) => {
        console.log('Audio autoplay prevented:', err);
      });
    }
    onMusicStart();
    
    const splitTimer = setTimeout(() => {
      setIsSplitting(true);
    }, 2500);
    
    return () => clearTimeout(splitTimer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${isSplitting ? 'bg-transparent pointer-events-none' : 'bg-black'}`}
    >
      <audio ref={audioRef} src={ONE_PIECE_THEME_URL} loop />
      
      {/* Left Split */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'inset(0 50% 0 0)' }}
        animate={isSplitting ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <img 
          src={zoroGif} 
          alt="Zoro" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-orange-500/30" />
      </motion.div>

      {/* Right Split */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'inset(0 0 0 50%)' }}
        animate={isSplitting ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <img 
          src={zoroGif} 
          alt="Zoro" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-orange-500/30" />
      </motion.div>

    </motion.div>
  );
}

// Floating Gold Particles Component
function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,180,0,0.4) 50%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px rgba(255,215,0,0.6)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated Waves Component
function AnimatedWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
      {/* Wave Layer 1 */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-20"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,50,100,0.2) 50%, rgba(0,30,60,0.4) 100%)',
          borderRadius: '100% 100% 0 0',
        }}
        animate={{
          y: [0, -8, 0],
          scaleX: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Wave Layer 2 */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,40,80,0.3) 100%)',
          borderRadius: '80% 80% 0 0',
        }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a1628] to-transparent" />
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [hasEntered, setHasEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3300);
    return () => clearTimeout(timer);
  };

  const handleMusicStart = () => {
    setMusicStarted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-cairo">
      <AnimatePresence mode="wait">
        {!hasEntered && <EnterScreen key="enter" onEnter={handleEnter} />}
        {hasEntered && isLoading && <LoadingScreen key="loading" onMusicStart={handleMusicStart} />}
      </AnimatePresence>

      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src={onePieceBg} 
          alt="One Piece Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-background via-transparent to-black/40" />
      </div>

      {/* Animated Effects Layer */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <GoldParticles />
        <AnimatedWaves />
      </div>

      {/* Content */}
      <div className="relative z-30">
        <Navbar />
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-4 perspective-1000 pt-20">
          <motion.div 
            style={{ y, opacity }}
            className="space-y-6 max-w-5xl mx-auto flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="relative mb-8"
            >
              <img 
                src={onePieceLogo} 
                alt="One Piece Restaurant Logo" 
                className="w-48 h-48 md:w-80 md:h-80 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-10"
            >
              <h1 className="text-7xl md:text-9xl font-pirate text-primary drop-shadow-[0_0_30px_rgba(255,215,0,0.6)] tracking-wider leading-none">
                ONE PIECE
              </h1>
              <h2 className="text-4xl md:text-6xl font-cinzel text-white mt-4 drop-shadow-lg tracking-widest border-t-2 border-primary/50 pt-4 inline-block">
                RESTAURANT
              </h2>
            </motion.div>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-200 font-cairo max-w-2xl mx-auto leading-relaxed drop-shadow-md bg-black/30 p-4 rounded-lg backdrop-blur-sm border border-white/10"
            >
              Start your culinary adventure in the heart of Algiers. 
              <br/>
              <span className="text-primary font-bold">The ultimate dining experience for pirates and foodies alike.</span>
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-8"
            >
              <a 
                href="#menu" 
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-pirate text-2xl tracking-widest overflow-hidden transition-transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.6)]"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  VIEW BOUNTY
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scroll"><path d="M8 17.5a5 5 0 0 1 5-5c2.5 0 5 2.5 5 5v4a5 5 0 0 1-5-5c-2.5 0-5 2.5-5 5v4a5 5 0 0 1-5-5c-2.5 0-5 2.5-5 5v4a5 5 0 0 1-5-5v-4"/><path d="M12 2a4 4 0 0 1 4 4v11.5"/></svg>
                </span>
              </a>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="min-h-screen py-24 px-4 relative">
           <div className="max-w-7xl mx-auto">
             <SectionTitle title="Wanted Menu" subtitle="Dead or Alive (Delicious)" />
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16 px-4">
               <WantedPoster 
                 name="MEAT FEAST WOK"
                 bounty="1,200"
                 description="Premium beef strips, stir-fried with pirate spices."
                 image="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800"
                 type="WOK"
               />
               <WantedPoster 
                 name="ALL BLUE SEAFOOD"
                 bounty="1,500"
                 description="Fresh catch: Shrimp, calamari, & mussels."
                 image="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=800"
                 type="SPECIAL"
               />
               <WantedPoster 
                 name="ZORO'S SUSHI"
                 bounty="1,800"
                 description="Three-sword style selection of Sashimi."
                 image="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800"
                 type="SUSHI"
               />
               <WantedPoster 
                 name="CHOPPER'S SWEET"
                 bounty="600"
                 description="Cotton candy dessert to cure any blues."
                 image="https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&q=80&w=800"
                 type="DESSERT"
               />
               <WantedPoster 
                 name="NAMI'S ORANGE"
                 bounty="1,100"
                 description="Tangerine chicken, sweet and savory."
                 image="https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=800"
                 type="WOK"
               />
               <WantedPoster 
                 name="FRANKY'S WINGS"
                 bounty="900"
                 description="Super Cola glazed chicken wings!"
                 image="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=800"
                 type="SNACK"
               />
             </div>
           </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-24 px-4 bg-black/60 backdrop-blur-md border-y border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
            <SectionTitle title="Drop Anchor" subtitle="Sidi Yahia, Hydra, Algiers" />
            
            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-8 bg-card/40 border border-primary/30 rounded-lg backdrop-blur-sm">
                 <h4 className="text-2xl font-pirate text-primary mb-4">Opening Hours</h4>
                 <ul className="space-y-2 font-cairo text-lg">
                   <li className="flex justify-between"><span>Mon - Thu:</span> <span>11:00 - 23:00</span></li>
                   <li className="flex justify-between"><span>Fri:</span> <span>14:00 - 00:00</span></li>
                   <li className="flex justify-between"><span>Sat - Sun:</span> <span>11:00 - 23:00</span></li>
                 </ul>
               </div>
               
               <div className="p-8 bg-card/40 border border-primary/30 rounded-lg backdrop-blur-sm flex flex-col justify-center">
                  <h4 className="text-2xl font-pirate text-primary mb-4">Contact Us</h4>
                  <p className="text-xl font-cairo mb-2">+213 555 123 456</p>
                  <p className="text-muted-foreground">nakama@onepiecerestaurant.dz</p>
               </div>
            </div>

            <button className="px-10 py-4 bg-primary text-black font-bold font-pirate text-2xl rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-105 transform duration-300">
              OPEN IN GOOGLE MAPS
            </button>
          </div>
        </section>

        <Footer />
      </div>

      <MusicPlayer />
    </div>
  );
}

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.3, duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center bg-gradient-to-b from-black/95 via-black/70 to-transparent pointer-events-none transition-all duration-300"
    >
      <div className="pointer-events-auto flex items-center gap-3 group cursor-pointer">
        <motion.img 
          src={onePieceLogo} 
          className="w-14 h-14 object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.4)] transition-transform group-hover:scale-110" 
          alt="logo"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        />
        <span className="text-2xl font-pirate text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 tracking-widest hidden md:block drop-shadow-lg">ONE PIECE</span>
      </div>
      <div className="flex gap-6 md:gap-8 pointer-events-auto bg-black/50 backdrop-blur-lg px-6 md:px-8 py-3 rounded-full border border-yellow-500/20 shadow-lg shadow-black/30">
        <NavLink href="#menu">Bounties</NavLink>
        <NavLink href="#location">Island</NavLink>
        <NavLink href="#">Crew</NavLink>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-white hover:text-primary font-cinzel text-sm md:text-lg transition-colors uppercase tracking-widest relative group font-bold">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center space-y-3 mb-12">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-12 bg-primary/50" />
        <h3 className="text-primary font-pirate text-xl md:text-2xl tracking-widest uppercase">{subtitle}</h3>
        <div className="h-px w-12 bg-primary/50" />
      </div>
      <h2 className="text-5xl md:text-7xl font-cinzel text-white drop-shadow-lg uppercase">{title}</h2>
    </div>
  );
}

function WantedPoster({ name, bounty, description, image, type }: { name: string; bounty: string; description: string; image: string; type: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, rotate: (Math.random() - 0.5) * 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: (Math.random() - 0.5) * 2 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 10, y: -10 }}
      className="relative p-5 pb-10 group transition-all duration-500 cursor-pointer"
      style={{
        backgroundImage: `url(${parchmentTexture})`,
        backgroundSize: 'cover',
        boxShadow: '0 15px 40px rgba(0,0,0,0.6), 0 5px 15px rgba(0,0,0,0.4), inset 0 0 50px rgba(139,69,19,0.1)',
        filter: 'drop-shadow(0 0 2px rgba(139,69,19,0.3))',
      }}
    >
      {/* Burn Effect Corners */}
      <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-transparent via-transparent to-[#3e2723]/20 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#2d1f1a]/30 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#2d1f1a]/25 via-transparent to-transparent" />
      <div className="absolute bottom-0 right-0 w-14 h-14 bg-gradient-to-tl from-[#3e2723]/20 via-transparent to-transparent" />

      {/* Wanted Poster Layout */}
      <div className="border-4 border-[#3e2723] p-3 h-full flex flex-col items-center text-center relative">
        {/* Top Decorative Line */}
        <div className="absolute top-1 left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-[#8b4513]/50 to-transparent" />
        
        <div className="w-full flex justify-between items-center px-2 mb-2">
          <span className="font-pirate text-3xl text-[#3e2723] drop-shadow-sm" style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.3)' }}>WANTED</span>
          <span className="font-pirate text-lg text-[#5d4037] bg-[#8b4513]/20 px-2 py-0.5 rounded">{type}</span>
        </div>
        
        <div className="w-full aspect-square bg-black overflow-hidden mb-3 border-3 border-[#5d4037] shadow-inner relative">
          <img src={image} alt={name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-115 sepia-[.2] group-hover:sepia-0 group-hover:brightness-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <h3 className="text-3xl font-pirate text-[#3e2723] mb-2 tracking-wider leading-none drop-shadow-sm" style={{ textShadow: '1px 1px 0 rgba(255,255,255,0.2)' }}>{name}</h3>
        <p className="text-sm font-cairo text-[#5d4037] mb-4 leading-relaxed px-2 italic">{description}</p>
        
        <div className="mt-auto w-full border-t-2 border-[#3e2723] pt-3 flex items-center justify-between px-2">
           <div className="flex items-center gap-2">
             <img src={skullLogo} className="w-7 h-7 invert brightness-0 opacity-70" alt="coin" />
             <span className="font-bold text-[#3e2723] font-mono text-2xl tracking-wide">{bounty}</span>
           </div>
           <motion.span 
             className="text-sm font-bold rotate-[-12deg] border-2 border-red-800 text-red-800 px-2 py-0.5 rounded bg-red-100/50"
             whileHover={{ scale: 1.1, rotate: 0 }}
           >
             DA
           </motion.span>
        </div>
      </div>

      {/* Enhanced Pin Effect */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-lg border border-gray-300 relative">
          <div className="absolute top-0.5 left-0.5 w-2 h-2 rounded-full bg-white/60" />
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-gray-400/50" />
      </div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="py-16 text-center text-muted-foreground font-cairo text-sm bg-gradient-to-t from-black via-[#0a0a0a] to-black/90 border-t border-yellow-500/20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="flex justify-center items-center gap-6 mb-10">
          <SocialIcon icon="instagram" />
          <SocialIcon icon="facebook" />
          <SocialIcon icon="twitter" />
        </div>
        <p className="text-2xl font-pirate text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-3 tracking-widest">ONE PIECE RESTAURANT</p>
        <p className="text-gray-400">© 2024. All Rights Reserved.</p>
        <p className="mt-6 text-xs opacity-40 max-w-md mx-auto leading-relaxed">
          This is a fan-made website inspired by One Piece. We are not affiliated with Toei Animation or Eiichiro Oda.
        </p>
      </motion.div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  return (
    <motion.div 
      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-yellow-500 hover:to-yellow-600 hover:text-black hover:border-yellow-500 transition-all duration-300 cursor-pointer shadow-lg"
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="capitalize font-bold">{icon[0].toUpperCase()}</span>
    </motion.div>
  )
}

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <audio ref={audioRef} src={ONE_PIECE_THEME_URL} loop />
      
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="bg-black/80 backdrop-blur-lg rounded-full px-4 py-2 border border-yellow-500/30 flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-yellow-500"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isPlaying 
            ? 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-black shadow-yellow-500/40' 
            : 'bg-black/80 backdrop-blur-lg border border-yellow-500/30 text-yellow-500'
        }`}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </motion.button>
      
      {isPlaying && (
        <motion.div
          className="absolute -top-8 right-0 text-xs text-yellow-500/80 font-cairo whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ♪ Windmill Village - One Piece ♪
        </motion.div>
      )}
    </motion.div>
  );
}
