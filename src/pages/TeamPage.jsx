import React from "react";
import PageContent from "../layout/PageContent";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Erhan FIRAT",
      role: "Project Owner",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQGOVSatSpGS4w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731534956362?e=1759363200&v=beta&t=d5I9DLTzxN5XnvBLulYFR5SHMZbfM3JR4EUoPeoQ5LU",
      linkedin: "https://www.linkedin.com/in/erhanfirat/",
      email: "mockmail@gmail.com",
    },
    {
      id: 2,
      name: "Gökhan Özdemir",
      role: "Scrum Master",
      image:
        "https://media.licdn.com/dms/image/v2/C4D03AQE8uHbxXDXfmw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1635783306921?e=1759363200&v=beta&t=I83tV468PbyIJOZ3kMGVuL1GrKec2KAnSngOIF0eZWA",
      linkedin: "https://www.linkedin.com/in/gnozdemir/",
      email: "mockmail@gmail.com",
    },
    {
      id: 3,
      name: "Berkay Yılmaz",
      role: "Full Stack Developer",
      image: "https://byilmaz.vercel.app/assets/photo-B8Kj6NvK.jpg",
      linkedin: "https://linkedin.com/in/berkay-yilmaz",
      email: "yilmaz.berkay@gmail.com",
      website: "https://byilmaz.vercel.app",
    },
  ];

  return (
    <PageContent>
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center lg:px-8 xl:px-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Meet Our Team
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-fgray">
            Get to know the talented professionals behind kNeat who bring
            passion, expertise, and innovation to every project.
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="bg-lightGray py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Profile Image */}
                <div className="mb-6 text-center">
                  <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-gray-200 transition-colors duration-300 group-hover:border-primary">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=128&background=FF7B47&color=fff`;
                      }}
                    />
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mb-6 text-sm font-medium uppercase tracking-wide text-primary">
                    {member.role}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-300 hover:bg-primary hover:text-white"
                        title={`${member.name} - Email`}
                      >
                        <Mail size={18} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-300 hover:bg-secondary hover:text-white"
                        title={`${member.name} - LinkedIn`}
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {member.website && (
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-300 hover:bg-green-500 hover:text-white"
                        title={`${member.name} - Website`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div className="group">
              <div className="mb-4 text-4xl font-bold text-primary transition-colors duration-300 group-hover:text-primary/80">
                3
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Team Members
              </h3>
              <p className="text-fgray">
                Experienced and passionate professionals
              </p>
            </div>
            <div className="group">
              <div className="mb-4 text-4xl font-bold text-primary transition-colors duration-300 group-hover:text-primary/80">
                1
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Active Project
              </h3>
              <p className="text-fgray">E-commerce platform development</p>
            </div>
            <div className="group">
              <div className="mb-4 text-4xl font-bold text-primary transition-colors duration-300 group-hover:text-primary/80">
                100%
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Success Rate
              </h3>
              <p className="text-fgray">Quality delivery on time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4 text-center lg:px-8 xl:px-12">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Want to Work With Us?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Join our talented team and let's create amazing projects together.
          </p>
          <a
            href="/contact"
            className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-secondary transition-all duration-300 hover:bg-gray-100 hover:shadow-lg"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </PageContent>
  );
}
