import React from "react";
import PageContent from "../layout/PageContent";
import { ChevronRight, Users, Award, Star, Heart } from "lucide-react";
import { STRINGS } from "../constants/strings";

export default function AboutPage() {
  const stats = [
    { number: "50K+", label: "Mutlu Müşteri", icon: Users },
    { number: "15+", label: "Yıllık Deneyim", icon: Award },
    { number: "500+", label: "Benzersiz Tasarım", icon: Star },
    { number: "98%", label: "Müşteri Memnuniyeti", icon: Heart },
  ];

  const values = [
    {
      title: "Usta İşçilik",
      description:
        "Her parça, dünya çapında seçilen en iyi kumaş ve malzemeler kullanılarak, detaylara özenle işlenir.",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    },
    {
      title: "Zamansız Zarafet",
      description:
        "Tasarımlarımız sezonluk trendlerin ötesine geçer; yıllar boyu şık ve güncel kalır.",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    },
    {
      title: "Sürdürülebilir Moda",
      description:
        "Etik ve sürdürülebilir uygulamalara bağlıyız; güzellikten ödün vermeden gezegenimizin geleceğini koruruz.",
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
              {STRINGS.ABOUT.TITLE}
            </h1>
            <nav className="flex items-center text-sm" aria-label="Breadcrumb">
              <span className="font-medium text-gray-900">
                {STRINGS.ABOUT.BREADCRUMB_HOME}
              </span>
              <ChevronRight size={16} className="mx-2 text-gray-400" />
              <span className="text-gray-400">
                {STRINGS.ABOUT.BREADCRUMB_ABOUT}
              </span>
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
                {STRINGS.ABOUT.HERO_TITLE}
              </h2>
              <p className="text-lg leading-relaxed text-fgray">
                {STRINGS.ABOUT.HERO_P1}
              </p>
              <p className="text-lg leading-relaxed text-fgray">
                {STRINGS.ABOUT.HERO_P2}
              </p>
              <button className="transform rounded-lg bg-primary px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-primary/90">
                {STRINGS.ABOUT.HERO_CTA}
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
              {STRINGS.ABOUT.STATS_TITLE}
            </h2>
            <p className="mx-auto max-w-2xl text-fgray">
              {STRINGS.ABOUT.STATS_P}
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
              {STRINGS.ABOUT.STORY_TITLE}
            </h2>
            <div className="prose prose-lg mx-auto text-fgray">
              <p className="mb-6 text-lg leading-relaxed">
                {STRINGS.ABOUT.STORY_P1}
              </p>
              <p className="mb-6 text-lg leading-relaxed">
                {STRINGS.ABOUT.STORY_P2}
              </p>
              <p className="text-lg leading-relaxed">
                {STRINGS.ABOUT.STORY_P3}
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
              {STRINGS.ABOUT.VALUES_TITLE}
            </h2>
            <p className="mx-auto max-w-2xl text-fgray">
              {STRINGS.ABOUT.VALUES_SUBTITLE}
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
                {STRINGS.ABOUT.CTA_TAG}
              </h5>
              <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                {STRINGS.ABOUT.CTA_TITLE}
              </h2>
              <p className="text-lg leading-relaxed text-fgray">
                {STRINGS.ABOUT.CTA_P}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="transform rounded-lg bg-primary px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-primary/90">
                  {STRINGS.ABOUT.CTA_BTN_PRIMARY}
                </button>
                <button className="transform rounded-lg border-2 border-primary bg-transparent px-8 py-4 font-semibold text-primary transition-all hover:scale-105 hover:bg-primary hover:text-white">
                  {STRINGS.ABOUT.CTA_BTN_SECONDARY}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContent>
  );
}
