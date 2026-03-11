import React from "react";
import { motion } from "framer-motion";
import { Award, Clock, Heart } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description:
        "Every frame is crafted with attention to detail and made to last.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Quick turnaround times ensuring you get your artwork ASAP.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Made with Passion",
      description: "Created by car enthusiasts for car enthusiasts.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-5 md:px-10 bg-stone-800 text-white relative"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            className="max-w-[251px] mx-auto mb-6"
            src="/logo.png"
            alt="error logo"
            loading="lazy"
          />

          <h3 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-stone-300">
            About Tag Poster
          </h3>
          <p className="text-lg text-stone-400 leading-relaxed max-w-3xl mx-auto">
            Tag Poster creates high-end framed artworks designed who appreciate
            details. Every poster is printed with precision and framed using
            premium materials. We believe every posters lover deserves to
            showcase their passion in style.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-stone-900 p-8 rounded-2xl hover:bg-stone-950 transition-colors duration-300 group"
            >
              <div className="w-14 h-14 bg-stone-100 text-stone-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-3 text-stone-400">
                {feature.title}
              </h4>
              <p className="text-stone-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
