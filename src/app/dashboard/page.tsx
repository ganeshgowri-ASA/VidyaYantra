import { BookOpen, Trophy, Flame, Target, Clock, Star, Play, BarChart3, Award, Zap } from 'lucide-react'
import Link from 'next/link'

const userStats = {
  name: 'Learner',
  xp: 4800,
  level: 12,
  streak: 7,
  coursesCompleted: 5,
  coursesInProgress: 3,
  hoursLearned: 48,
  badges: 14,
}

const inProgress = [
  { id: 1, title: 'React Mastery', progress: 65, nextLesson: 'State Management Patterns', xp: 120 },
  { id: 4, title: 'TypeScript Deep Dive', progress: 30, nextLesson: 'Generics & Utility Types', xp: 80 },
  { id: 7, title: 'Next.js Full-Stack', progress: 15, nextLesson: 'Server Components', xp: 60 },
]

const achievements = [
  { icon: Flame, title: '7-Day Streak', desc: 'Learn for 7 days in a row', color: 'text-orange-400' },
  { icon: Trophy, title: 'First Course', desc: 'Complete your first course', color: 'text-yellow-400' },
  { icon: Zap, title: 'Speed Learner', desc: 'Complete a module in under 30min', color: 'text-cyan-400' },
  { icon: Star, title: 'Perfect Score', desc: 'Get 100% on a quiz', color: 'text-indigo-400' },
]

const leaderboard = [
  { rank: 1, name: 'Priya M.', xp: 12400, streak: 30 },
  { rank: 2, name: 'Arjun K.', xp: 11200, streak: 22 },
  { rank: 3, name: 'Sarah L.', xp: 9800, streak: 18 },
  { rank: 4, name: 'You', xp: 4800, streak: 7, isUser: true },
]

export default function Dashboard() {
  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">VidyaYantra</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href="/courses" className="hover:text-white transition">Courses</Link>
          <Link href="/dashboard" className="text-white font-medium">Dashboard</Link>
          <Link href="#" className="hover:text-white transition">Leaderboard</Link>
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">L</div>
        </div>
      </nav>

      <div className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {userStats.name}!</h1>
        <p className="text-slate-400 mb-8">Keep up the momentum. You are on a {userStats.streak}-day streak!</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass rounded-xl p-4 text-center">
            <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.xp.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Total XP</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.streak}</div>
            <div className="text-xs text-slate-500">Day Streak</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.coursesCompleted}</div>
            <div className="text-xs text-slate-500">Completed</div>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.hoursLearned}h</div>
            <div className="text-xs text-slate-500">Hours Learned</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">Continue Learning</h2>
            <div className="space-y-4">
              {inProgress.map((c) => (
                <Link href={`/courses/${c.id}`} key={c.id} className="glass glass-hover rounded-xl p-5 flex items-center justify-between cursor-pointer block">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{c.title}</h3>
                    <p className="text-xs text-slate-500 mb-2">Next: {c.nextLesson}</p>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="text-xs text-slate-500 mt-1">{c.progress}% complete</span>
                  </div>
                  <div className="ml-4 flex flex-col items-center gap-1">
                    <Play className="w-8 h-8 text-indigo-400" />
                    <span className="text-xs text-indigo-400">+{c.xp} XP</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Achievements */}
            <h2 className="text-xl font-bold text-white mb-4 mt-8">Recent Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {achievements.map((a) => (
                <div key={a.title} className="glass rounded-xl p-4 text-center">
                  <a.icon className={`w-8 h-8 mx-auto mb-2 ${a.color}`} />
                  <h3 className="text-sm font-medium text-white">{a.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Sidebar */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Leaderboard</h2>
            <div className="glass rounded-xl p-4">
              {leaderboard.map((u) => (
                <div key={u.rank} className={`flex items-center justify-between py-3 ${u.rank < 4 ? 'border-b border-white/5' : ''} ${u.isUser ? 'bg-indigo-500/10 -mx-4 px-4 rounded-lg' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${u.rank === 1 ? 'text-yellow-400' : u.rank === 2 ? 'text-slate-300' : u.rank === 3 ? 'text-orange-400' : 'text-indigo-400'}`}>#{u.rank}</span>
                    <span className={`text-sm ${u.isUser ? 'text-indigo-300 font-medium' : 'text-white'}`}>{u.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{u.xp.toLocaleString()} XP</div>
                    <div className="text-xs text-slate-500">{u.streak}d streak</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Level Progress */}
            <div className="glass rounded-xl p-4 mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Level {userStats.level}</span>
                <span className="text-sm text-indigo-400">Level {userStats.level + 1}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full" style={{ width: '60%' }} />
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">1,200 XP to next level</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
