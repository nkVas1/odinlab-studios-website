export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-odin-dark py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-display text-2xl font-bold text-white">
            ODINLAB<span className="text-odin-gold">.</span>
          </h3>
          <p className="text-sm text-odin-muted mt-2">
            © 2025 OdinLab Studios. Все права защищены.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-odin-text">
          <a href="#" className="hover:text-odin-gold transition-colors">
            Telegram
          </a>
          <a href="#" className="hover:text-odin-gold transition-colors">
            Behance
          </a>
          <a href="#" className="hover:text-odin-gold transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
