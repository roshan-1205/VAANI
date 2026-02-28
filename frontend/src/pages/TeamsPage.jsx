import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function TeamsPage() {
  const teamMembers = [
    {
      name: "Shiva Kewat",
      role: "Frontend Developer - UI/UX",
      bio: "Leading UI/UX development with 10+ years in Web Development",
      image: "/src/assets/Images/p1.jpeg",
      socials: [
        { icon: "linkedin", url: "#" },
        { icon: "twitter", url: "#" },
        { icon: "github", url: "#" }
      ]
    },
    {
      name: "Aayush Pandey",
      role: "Backend Developer — API Systems Architect",
      bio: "Building scalable infrastructure for millions of voice interactions daily",
      image:  "/src/assets/Images/p2.jpeg",
      socials: [
        { icon: "linkedin", url: "#" },
        { icon: "twitter", url: "#" },
        { icon: "github", url: "#" }
      ]
    },
    {
      name: "Roshan Kumar Singh",
      role: "UI Designer — Accessibility Expert",
      bio: "Crafting inclusive experiences that work for everyone, everywhere",
      image:  "/src/assets/Images/p3.jpeg",
      socials: [
        { icon: "linkedin", url: "#" },
        { icon: "twitter", url: "#" },
        { icon: "dribbble", url: "#" }
      ]
    },
    
    
    
  ]

  const TeamCard = ({ member }) => (
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-200 text-center group">
      <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg group-hover:scale-110 transition-all duration-500 object-cover" />
      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
        {member.name}
      </h3>
      <p className="text-base font-semibold text-purple-600 mb-4">
        {member.role}
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        {member.bio}
      </p>
      <div className="flex justify-center gap-4">
        {member.socials.map((social, idx) => (
          <a
            key={idx}
            href={social.url}
            className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300 group/icon"
          >
            {social.icon === 'linkedin' && (
              <svg className="w-5 h-5 text-gray-700 group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            )}
            {social.icon === 'twitter' && (
              <svg className="w-5 h-5 text-gray-700 group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            )}
            {social.icon === 'github' && (
              <svg className="w-5 h-5 text-gray-700 group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            )}
            {social.icon === 'dribbble' && (
              <svg className="w-5 h-5 text-gray-700 group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-7.21.707-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/>
              </svg>
            )}
          </a>
        ))}
      </div>
    </div>
  )

  return (
    <>
      <Navbar />
      <div className="bg-[#E2E2E2]">
        {/* Header Section */}
        <section className="relative bg-[#E2E2E2] py-24 px-6 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-br from-[#C19A6B] to-[#A67C52] text-white text-sm font-semibold rounded-full shadow-lg">
                  OUR TEAM
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-#01070f mb-6 tracking-tight">
                Meet the People Behind the Platform
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                A passionate team of experts dedicated to making government services accessible to every citizen
              </p>
            </div>
          </div>
        </section>

        {/* Team Members Grid */}
        <section className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <TeamCard key={index} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 sm:px-10 lg:px-20 bg-[#E2E2E2]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#E7E1D6] rounded-3xl p-12 shadow-2xl text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Want to Collaborate with Our Team?
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
                We're always looking for talented individuals who share our vision of making government services accessible to all
              </p>
              <button className="px-8 py-4 bg-[#01070f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Join With Us
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default TeamsPage
