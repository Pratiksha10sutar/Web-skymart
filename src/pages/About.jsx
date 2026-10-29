import React from "react";
import {
  Zap,
  Package,
  Users,
  Star,
  Truck,
  ShieldCheck,
  Heart,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router";

const About = () => {
  const statsData = [
    {
      icon: Package,
      value: "20K+",
      label: "Products",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Avg. Rating",
    },
    {
      icon: Truck,
      value: "99%",
      label: "On-time Delivery",
    },
  ];

  const teamData = [
    {
      name: "Aryan Shah",
      role: "Founder & CEO",
      initial: "A",
      bgColor: "bg-[#a3e635] text-black",
    },
    {
      name: "Priya Mehta",
      role: "Head of Product",
      initial: "P",
      bgColor: "bg-[#3b82f6] text-white",
    },
    {
      name: "Rohan Verma",
      role: "Lead Engineer",
      initial: "R",
      bgColor: "bg-[#a855f7] text-white",
    },
    {
      name: "Sneha Kapoor",
      role: "Design Director",
      initial: "S",
      bgColor: "bg-[#ef4444] text-white",
    },
  ];

  const valuesData = [
    {
      icon: ShieldCheck,
      title: "Trust",
      description:
        "Every product is verified for quality and authenticity before listing.",
    },
    {
      icon: Truck,
      title: "Speed",
      description:
        "We obsess over delivery times so your orders arrive when promised.",
    },
    {
      icon: Heart,
      title: "Community",
      description:
        "Built around real customer feedback, not just business metrics.",
    },
    {
      icon: Star,
      title: "Quality",
      description:
        "We curate the best — no filler, no junk, just great products.",
    },
  ];

  let navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 py-12 sm:px-6 lg:px-8 font-sans selection:bg-[#a3e635] selection:text-black">
      <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="bg-[#a3e635] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#a3e635]/10">
            <Zap className="fill-black text-black" size={29} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="text-[#a3e635]">SkyMart</span>
          </h1>
          <p className="text-white/40 text-base sm:text-lg leading-relaxed">
            SkyMart is a next-generation e-commerce platform built to make
            online shopping fast, fair, and enjoyable — for everyone.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((val, index) => {
            const Icon = val.icon;
            return (
              <div
                key={index}
                className="bg-[#111111] border border-zinc-800/80 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-2"
              >
                <Icon size={22} className="text-[#a3e635]" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {val.value}
                </h3>
                <p className="text-white/40 text-xs sm:text-sm font-medium">
                  {val.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Our Story Card */}
        <div className="bg-[#111111] border border-zinc-800/80 rounded-3xl p-6 sm:p-10 lg:p-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Our Story
          </h2>
          <div className="space-y-4 text-white/40 text-sm sm:text-lg leading-relaxed">
            <p>
              SkyMart started in 2022 as a small side project — two engineers
              tired of bloated, slow e-commerce experiences. We asked ourselves:
              what if shopping online was actually{" "}
              <em className="italic text-white/60">enjoyable</em>?
            </p>
            <p>
              Three years later, SkyMart serves over 50,000 customers across the
              country. We stock electronics, fashion, jewelry, and everyday
              essentials — all at prices that don't require a second mortgage.
            </p>
            <p>
              We're still the same team at heart: obsessed with speed,
              transparency, and making you feel good about every purchase you
              make here.
            </p>
          </div>
        </div>

        {/* What We Stand For Section */}
        <div className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
            What We Stand For
          </h2>
          <div className="max-w-4xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {valuesData.map((elem, index) => {
                const Icon = elem.icon;
                return (
                  <div
                    key={index}
                    className="bg-[#111111] border border-zinc-800/80 rounded-2xl p-6 flex items-center gap-4"
                  >
               
                    <div className="bg-[#182a0d] rounded-xl shrink-0 w-12 h-12 flex items-center justify-center">
                      <Icon size={22} className="text-[#a3e635]" />
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-base font-bold text-white">
                        {elem.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {elem.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div className="space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">
            Meet the Team
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Aryan Shah */}
            {teamData.map((val, index) => (
              <div
                key={index}
                className="bg-[#111111] border border-zinc-800/80 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-3"
              >
                <div
                  className={`${val.bgColor} text-black w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl`}
                >
                  {val.initial}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{val.name}</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">{val.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Card Section */}
        <div className="bg-[#111111] border border-zinc-800/80 rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to shop?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
            Explore thousands of products at unbeatable prices.
          </p>
          <div className="pt-2">
            <button
            onClick={() =>navigate("/shop")}
             className="inline-flex items-center justify-center gap-2 bg-[#a3e635] text-black font-bold text-sm sm:text-base px-6 py-3 rounded-2xl hover:bg-[#8ece28] transition-colors">
              Browse Products
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
