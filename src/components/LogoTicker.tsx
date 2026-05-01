import { motion } from "framer-motion";

interface Logo {
  name: string;
  logo: string;
}

interface LogoTickerProps {
  logos: Logo[];
  title?: string;
}

export function LogoTicker({ logos, title }: LogoTickerProps) {
  // Duplicate logos to create seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="py-12 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        {title && <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>}
      </div>
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
        <motion.div
          className="flex flex-none gap-16 pr-16 items-center"
          animate={{
            translateX: "-33.33%",
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 min-w-[150px]">
              {logo.logo === "/placeholder.svg" ? (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{logo.name[0]}</span>
                  </div>
                  <span className="text-lg font-bold text-foreground/70 whitespace-nowrap">{logo.name}</span>
                </div>
              ) : (
                <img src={logo.logo} alt={logo.name} className="h-10 w-auto object-contain" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
