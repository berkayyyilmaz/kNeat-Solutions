import React from "react";
import PageContent from "../layout/PageContent";
import { ChevronRight, Users, Award, Star, Heart } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users },
    { number: "15+", label: "Years of Excellence", icon: Award },
    { number: "500+", label: "Unique Designs", icon: Star },
    { number: "98%", label: "Customer Satisfaction", icon: Heart },
  ];

  const values = [
    {
      title: "Quality Craftsmanship",
      description:
        "Every piece is meticulously crafted with attention to detail, using only the finest fabrics and materials sourced from around the world.",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    },
    {
      title: "Timeless Elegance",
      description:
        "Our designs transcend seasonal trends, creating pieces that remain stylish and relevant for years to come.",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    },
    {
      title: "Sustainable Fashion",
      description:
        "We are committed to ethical and sustainable practices, ensuring our beautiful pieces don't compromise our planet's future.",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1126&q=80",
    },
  ];

  return (
    <PageContent>
      {/* Breadcrumb Section */}
      <section className="bg-lightGray py-8">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              About Us
            </h1>
            <nav className="flex items-center text-sm" aria-label="Breadcrumb">
              <span className="font-medium text-gray-900">Home</span>
              <ChevronRight size={16} className="mx-2 text-gray-400" />
              <span className="text-gray-400">About</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Content */}
            <div className="order-2 space-y-6 lg:order-1">
              <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                Crafting Elegance Since 2008
              </h2>
              <p className="text-lg leading-relaxed text-fgray">
                kNeat is more than a fashion brand – we're curators of timeless
                elegance and sophisticated style. For over 15 years, we've been
                designing premium women's clothing that empowers confidence and
                celebrates femininity.
              </p>
              <p className="text-lg leading-relaxed text-fgray">
                From our atelier to your wardrobe, every piece tells a story of
                passion, precision, and uncompromising quality.
              </p>
              <button className="transform rounded-lg bg-primary px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-primary/90">
                Explore Our Collection
              </button>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Elegant fashion design process"
                  className="h-[400px] w-full object-cover md:h-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Numbers That Define Our Legacy
            </h2>
            <p className="mx-auto max-w-2xl text-fgray">
              Over the years, we've built more than just a brand – we've created
              a community of women who appreciate the finer things in life.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="group text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                    {stat.number}
                  </h3>
                  <p className="font-medium text-fgray">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-lightGray py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-fgray">
              <p className="mb-6 text-lg leading-relaxed">
                Born from a vision to redefine women's fashion, kNeat began as a
                small atelier with big dreams. Our founder, inspired by the
                timeless elegance of European fashion houses, set out to create
                a brand that would celebrate the modern woman's strength, grace,
                and individuality.
              </p>
              <p className="mb-6 text-lg leading-relaxed">
                Today, we continue to honor that original vision. Each
                collection is thoughtfully designed to offer versatile pieces
                that seamlessly transition from boardroom to evening soirée,
                from casual weekends to special occasions.
              </p>
              <p className="text-lg leading-relaxed">
                We believe that true style is not about following trends, but
                about expressing your authentic self through carefully curated
                pieces that make you feel confident and beautiful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              What We Stand For
            </h2>
            <p className="mx-auto max-w-2xl text-fgray">
              Our core values guide every decision we make, from design
              conception to final delivery.
            </p>
          </div>

          <div className="space-y-16">
            {values.map((value, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="h-[400px] w-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                >
                  <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    {value.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-fgray">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-lightGray py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Woman wearing elegant clothing"
                  className="h-[400px] w-full object-cover md:h-[500px]"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 space-y-6 lg:order-2">
              <h5 className="font-semibold uppercase tracking-wide text-primary">
                Join Our Story
              </h5>
              <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                Become Part of Our Elegant Community
              </h2>
              <p className="text-lg leading-relaxed text-fgray">
                Discover a world where sophistication meets comfort, where every
                piece is designed to make you feel extraordinary. Join thousands
                of women who have made kNeat their go-to destination for premium
                fashion.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="transform rounded-lg bg-primary px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-primary/90">
                  Shop New Arrivals
                </button>
                <button className="transform rounded-lg border-2 border-primary bg-transparent px-8 py-4 font-semibold text-primary transition-all hover:scale-105 hover:bg-primary hover:text-white">
                  View Lookbook
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContent>
  );
}
