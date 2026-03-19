export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">&#x1F3AF;</span>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">VidyaYantra</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pillars" className="hover:text-white transition">5 Pillars</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition font-medium">Get Started</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Phase 1: Nirmaan - Foundation Active
        </div>
        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          Learn by <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">Doing</span>, Not Just Watching
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mt-6">
          The interactive L&D portal with live coding sandboxes, AI tutoring, 6 exercise types, and Sanskrit-themed gamification. Built to crush the 85% dropout rate.
        </p>
        <div className="flex gap-4 mt-10">
          <a href="#" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg font-semibold text-lg transition shadow-lg shadow-indigo-500/25">
            Start Learning Free
          </a>
          <a href="#" className="px-8 py-3 border border-white/20 hover:bg-white/5 rounded-lg font-semibold text-lg transition">
            View PRD
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          {[
            ['6+', 'Exercise Types'],
            ['45%', 'Target Completion'],
            ['3', 'AI LLM Models'],
            ['5', 'Sanskrit Levels'],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{num}</div>
              <div className="text-sm text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5 Pillars */}
      <section id="pillars" className="px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">The 5 Pillars of VidyaYantra</h2>
        <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">Each pillar is named in Sanskrit, reflecting the depth and purpose of the platform.</p>
        <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {[
            { icon: '&#x1F4DA;', name: 'Vidya', title: 'Course Engine', desc: 'Structured learning paths with video, text & interactive lessons' },
            { icon: '&#x2699;&#xFE0F;', name: 'Yantra', title: 'Code Sandbox', desc: 'Monaco Editor + WebContainers for in-browser coding' },
            { icon: '&#x1F9E0;', name: 'Buddhi', title: 'AI Tutor', desc: 'BudhiBot with GPT-4, Claude & Gemini multi-LLM' },
            { icon: '&#x1F3AE;', name: 'Kreeda', title: 'Gamification', desc: 'XP, badges, leaderboards & Sanskrit-themed levels' },
            { icon: '&#x1F4BC;', name: 'Karma', title: 'Career Hub', desc: 'Certificates, portfolios & LinkedIn integration' },
          ].map((pillar) => (
            <div key={pillar.name} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition group">
              <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: pillar.icon }} />
              <div className="text-xs text-indigo-400 font-mono uppercase tracking-wider">{pillar.name}</div>
              <h3 className="text-lg font-semibold mt-1">{pillar.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Exercise Types */}
      <section id="features" className="px-8 py-20 bg-white/[0.02]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">6 Interactive Exercise Types</h2>
        <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">No more passive video watching. Every lesson has hands-on practice built in.</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: '&#x1F4BB;', title: 'Code Challenge', desc: 'Write code, run tests, instant feedback' },
            { icon: '&#x270D;&#xFE0F;', title: 'Fill-in-the-Blank', desc: 'Complete partial code snippets' },
            { icon: '&#x1F9E9;', title: 'Drag & Drop', desc: 'Arrange code blocks in correct order' },
            { icon: '&#x1F41B;', title: 'Debug Challenge', desc: 'Find and fix bugs in broken code' },
            { icon: '&#x1F5C3;&#xFE0F;', title: 'SQL Playground', desc: 'Write queries against live databases' },
            { icon: '&#x1F310;', title: 'API Testing Lab', desc: 'Build and test REST/GraphQL endpoints' },
          ].map((ex) => (
            <div key={ex.title} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-indigo-500/50 transition">
              <div className="text-2xl mb-2" dangerouslySetInnerHTML={{ __html: ex.icon }} />
              <h3 className="font-semibold">{ex.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{ex.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leveling System */}
      <section className="px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Sanskrit-Themed Leveling</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {[
            { level: 'Shishya', title: 'Student', xp: '0-500 XP', color: 'from-gray-500 to-gray-400' },
            { level: 'Sadhak', title: 'Practitioner', xp: '500-2K XP', color: 'from-green-500 to-emerald-400' },
            { level: 'Vidwan', title: 'Scholar', xp: '2K-5K XP', color: 'from-blue-500 to-cyan-400' },
            { level: 'Acharya', title: 'Teacher', xp: '5K-15K XP', color: 'from-purple-500 to-violet-400' },
            { level: 'Guru', title: 'Master', xp: '15K+ XP', color: 'from-orange-500 to-amber-400' },
          ].map((l) => (
            <div key={l.level} className={`px-6 py-4 rounded-xl bg-gradient-to-r ${l.color} text-white text-center min-w-[140px]`}>
              <div className="font-bold text-lg">{l.level}</div>
              <div className="text-xs opacity-80">{l.title}</div>
              <div className="text-xs mt-1 font-mono">{l.xp}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-8 py-20 bg-white/[0.02]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Powered By Modern Stack</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Monaco Editor', 'WebContainers', 'tRPC', 'Prisma', 'PostgreSQL', 'NextAuth.js', 'OpenAI', 'Claude', 'Gemini', 'Stripe', 'Vercel', 'GitHub Actions'].map((tech) => (
            <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 transition">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Build the Future of Learning?</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">Join VidyaYantra and transform passive learning into active mastery.</p>
        <a href="#" className="inline-block px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg font-semibold text-lg transition shadow-lg shadow-indigo-500/25">
          Get Started Free
        </a>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-white/10 text-center text-sm text-gray-500">
        <p className="italic mb-2">\u0935\u093F\u0926\u094D\u092F\u093E \u0926\u0926\u093E\u0924\u093F \u0935\u093F\u0928\u092F\u092E\u094D \u2014 Knowledge gives humility.</p>
        <p>&copy; 2026 VidyaYantra. Built with the Srishti Workflow.</p>
      </footer>
    </main>
  )
}
