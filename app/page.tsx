"use client";

import { useState, useEffect } from "react"; // Añadimos los hooks de React
import { Playfair_Display, Inter } from "next/font/google";
import { motion } from "framer-motion";

// Configuración de Fuentes
const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

// --- Interfaces de TypeScript ---
interface MenuItem {
  id: string;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  category: "cafe" | "reposteria" | "metodos";
}

interface NavLink {
  label: string;
  href: string;
  external?: boolean; 
}

export default function Home() {
  
  // --- LÓGICA DE REINICIO DE ANIMACIONES ---
  // Este estado cambiará cada vez que el usuario vuelva al principio de la página
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    let isAtTop = true;
    const handleScroll = () => {
      // Si subimos hasta arriba (menos de 10px de scroll)
      if (window.scrollY < 10 && !isAtTop) {
        isAtTop = true;
        setAnimationKey((prev) => prev + 1); // Forzamos el reinicio de Framer Motion
      } else if (window.scrollY > 50 && isAtTop) {
        isAtTop = false;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- CONFIGURACIÓN DE WHATSAPP ---
  const NUMERO_WHATSAPP = "56912345678"; 
  const MENSAJE_WHATSAPP = encodeURIComponent("hola quisiera hacer un pedido");
  const LINK_WHATSAPP = `https://wa.me/${NUMERO_WHATSAPP}?text=${MENSAJE_WHATSAPP}`;

  const navLinks: NavLink[] = [
    { label: "Inicio", href: "#" },
    { label: "Nuestro Café", href: "#menu" },
    { label: "Ubicación", href: "#ubicacion" },
    { label: "Reservar", href: LINK_WHATSAPP, external: true }, 
  ];

  const menuItems: MenuItem[] = [
    {
      id: "1",
      title: "Espresso Imperial",
      price: "$4.50",
      description:
        "Extracción doble de grano de altura, notas a cacao y nuez. Servido en cerámica artesanal.",
      imageUrl:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800&h=600",
      category: "cafe",
    },
    {
      id: "2",
      title: "Repostería del Convento",
      price: "$3.80",
      description:
        "Recetas tradicionales: Medialunas de mantequilla o tarta de almendras horneada en el día.",
      imageUrl:
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=800&h=600",
      category: "reposteria",
    },
    {
      id: "3",
      title: "Cold Brew Colonial",
      price: "$5.20",
      description:
        "Infusión en frío por 16 horas, refrescante, ligero y con dulzura natural. Ideal para las tardes.",
      imageUrl:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800&h=600",
      category: "metodos",
    },
  ];

  return (
    <div
      className={`${sans.variable} ${serif.variable} font-sans bg-white text-primary scroll-smooth overflow-hidden relative`}
    >
      {/* --- 1. HEADER / NAVBAR --- */}
      <header className="bg-primary text-[#c69e69] p-4 fixed w-full top-0 z-50 shadow-md">
        <nav className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-[#c69e69] rounded-full flex items-center justify-center font-serif text-xl">
              C
            </div>
            <a href="#">
                <h1 className="font-serif text-3xl font-bold tracking-tight">
              Cafe <span className="font-light">Colonial</span>
            </h1>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-6 font-medium text-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : ""}
                className="hover:text-white transition-colors border-b-2 border-transparent hover:border-secondary pb-1"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        {/* --- 2. HERO SECTION --- */}
        <section className="relative h-[85vh] flex items-center justify-center text-center">
          <img
            src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1920&h=1080"
            alt="Taza de café de especialidad sobre mesa de madera"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/30"></div>
          
          <motion.div 
            key={`hero-${animationKey}`} // Vinculamos la animación al reset global
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} // Cambiado a once: true
            transition={{ duration: 1 }}
            className="relative z-10 container mx-auto px-6 mt-20"
          >
            <span className="inline-block border-2 border-[#c69e69] bg-black/30 text-white px-4 py-1 mt-20 md:mt-0 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-lg backdrop-blur-sm">
              Est. 1742 | Un Oasis de Historia
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
              Tradición y Aroma en el Corazón Colonial
            </h2>
            <p className="md:text-xl text-lg text-white mb-10 max-w-2xl mx-auto font-light">
              Descubre el sabor auténtico del café de especialidad, servido en
              un entorno que cuenta siglos de historia. Tu rincón de paz te
              espera.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="#menu"
                className="bg-[#c69e69] text-primary md:px-8 px-2  py-3 rounded-md font-bold text-lg shadow-lg hover:bg-white hover:text-[#c69e69] transition-all cursor-pointer"
              >
                Ver el Menú
              </a>
              <a
                href="#ubicacion"
                 className="bg-[#c69e69] text-primary md:px-8 px-2  py-3 rounded-md font-bold text-lg shadow-lg hover:bg-white hover:text-[#c69e69] transition-all cursor-pointer"
              >
                Cómo Llegar
              </a>
            </div>
          </motion.div>
        </section>

        {/* --- 3. NUESTRA HISTORIA --- */}
        <section className="bg-secondary py-24 text-primary overflow-hidden">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              key={`hist-txt-${animationKey}`}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }} // Cambiado a once: true
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-20 h-1 bg-primary"></div>
              <h3 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                Más que Café, una Experiencia Temporal
              </h3>
              <p className="text-lg opacity-90 leading-relaxed">
                Ubicados en una casona restaurada, combinamos la arquitectura de
                arcos y cantera con los métodos más modernos de extracción de
                café de especialidad. Ven a vivir la calma de nuestros patios
                históricos.
              </p>
            </motion.div>

            <motion.div 
              key={`hist-img-${animationKey}`}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }} // Cambiado a once: true
              transition={{ duration: 0.8 }}
              className="aspect-4/3 rounded-2xl shadow-2xl flex items-center justify-center border-5 border-bg-primary/20 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1920&h=1080"
                alt="Interior de cafetería colonial"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* --- 4. MENÚ DESTACADO --- */}
        <section id="menu" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div 
              key={`menu-tit-${animationKey}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} // Cambiado a once: true
              transition={{ duration: 0.6 }}
              className="text-center mb-16 space-y-2"
            >
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-primary">
                Nuestras Joyas Artesanales
              </h3>
              <p className="text-primary/70 text-lg max-w-xl mx-auto">
                Una selección exclusiva para los paladares más exigentes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={`menu-item-${item.id}-${animationKey}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }} // Cambiado a once: true
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                  className="border border-stone-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group bg-white flex flex-col"
                >
                  <div className="relative h-64 bg-stone-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className={`object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ${item.category === "reposteria" ? "brightness-75" : ""}`}
                    />
                    {item.category === "reposteria" && (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8 z-10 bg-black/20 pointer-events-none">
                        <h4 className="font-serif text-2xl font-bold tracking-wide">
                          Dulces Tradicionales
                        </h4>
                      </div>
                    )}
                    {item.category === "metodos" && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 pointer-events-none">
                        <span className="text-secondary font-serif text-3xl font-bold tracking-wide">
                          Métodos Fríos
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-3 grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-serif text-2xl font-bold text-primary pr-4">
                          {item.title}
                        </h4>
                        <span className="font-bold text-xl text-primary">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-sm text-primary/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5. UBICACIÓN Y HORARIOS --- */}
        <section id="ubicacion" className="bg-primary text-secondary py-24 overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div 
              key={`loc-${animationKey}`}
              initial={{ opacity: 0, x: -150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }} // Cambiado a once: true
              transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Información de Contacto */}
              <div className="space-y-12">
                <div>
                  <h3 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-white">
                    Visítanos
                  </h3>
                  <div className="w-20 h-1 bg-secondary mb-8"></div>
                  <p className="font-bold text-2xl mb-2">
                    Calle Arturo Prat 123
                  </p>
                  <p className="text-lg opacity-80 mb-6">
                    Centro Histórico, La Serena
                    <br />
                    Coquimbo, Chile
                  </p>

                  <div className="space-y-4">
                    <h4 className="font-serif text-2xl font-bold text-white mt-8 mb-4">
                      Horarios de Calma
                    </h4>
                    <div className="flex justify-between border-b border-secondary/20 pb-3">
                      <span className="text-lg">Lunes - Viernes</span>
                      <span className="font-bold text-lg">07:30 - 21:00</span>
                    </div>
                    <div className="flex justify-between pt-3">
                      <span className="text-lg">Sábados y Domingos</span>
                      <span className="font-bold text-lg">09:00 - 22:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa Real de Google Maps */}
              <div className="h-100 lg:h-125 w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary/20 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.8856555197576!2d-71.25191842369677!3d-29.902347774994243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9691ca71339bd643%3A0xc5dc6b5e02419ec6!2sPlaza%20de%20Armas%20de%20La%20Serena!5e0!3m2!1ses!2scl!4v1708000000000!5m2!1ses!2scl"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* --- 6. FOOTER --- */}
      <footer className="bg-black text-secondary/60 py-12 text-center text-sm">
        <div className="container mx-auto px-6 space-y-4">
          <p className="font-serif text-3xl font-bold text-secondary mb-6">
            Coffea Colonial
          </p>
          <p>
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
          <div className="flex justify-center gap-8 pt-6 text-secondary">
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition-colors">
              TripAdvisor
            </a>
          </div>
        </div>
      </footer>

      {/* --- BOTÓN FLOTANTE DE WHATSAPP --- */}
      <motion.a
        href={LINK_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-colors flex items-center justify-center hover:bg-[#1ebe57]"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </motion.a>

    </div>
  );
}