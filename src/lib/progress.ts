export interface ActivityEntry {
  type: 'lesson_complete' | 'quiz_complete' | 'achievement' | 'streak'
  title: string
  xp: number
  timestamp: string
  courseId?: string
}

export interface UserProgress {
  completedLessons: string[]
  totalXP: number
  level: number
  streak: number
  lastActive: string
  achievements: string[]
  courseProgress: Record<string, number>
  recentActivity: ActivityEntry[]
}

export const ACHIEVEMENTS = [
  { id: 'first_lesson', title: 'First Step', desc: 'Complete your first lesson', icon: '🌟' },
  { id: 'streak_3', title: '3-Day Streak', desc: 'Study 3 days in a row', icon: '🔥' },
  { id: 'xp_100', title: 'XP Hunter', desc: 'Earn 100 XP', icon: '⚡' },
  { id: 'xp_500', title: 'XP Champion', desc: 'Earn 500 XP', icon: '🏆' },
  { id: 'perfect_quiz', title: 'Perfect Score', desc: 'Get 100% on a quiz', icon: '💯' },
]

const defaultProgress: UserProgress = {
  completedLessons: [],
  totalXP: 0,
  level: 1,
  streak: 0,
  lastActive: '',
  achievements: [],
  courseProgress: {},
  recentActivity: [],
}

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return { ...defaultProgress }
  const s = localStorage.getItem('vy_progress')
  if (!s) return { ...defaultProgress }
  const parsed = JSON.parse(s)
  // Ensure recentActivity exists for backwards compatibility
  if (!parsed.recentActivity) parsed.recentActivity = []
  return parsed
}

export function saveProgress(p: UserProgress) {
  if (typeof window !== 'undefined') localStorage.setItem('vy_progress', JSON.stringify(p))
}

function addActivity(p: UserProgress, entry: Omit<ActivityEntry, 'timestamp'>) {
  p.recentActivity.unshift({ ...entry, timestamp: new Date().toISOString() })
  // Keep only last 20 activities
  if (p.recentActivity.length > 20) p.recentActivity = p.recentActivity.slice(0, 20)
}

function updateStreak(p: UserProgress) {
  const today = new Date().toDateString()
  const lastActive = p.lastActive ? new Date(p.lastActive).toDateString() : ''

  if (lastActive === today) return // Already active today

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  if (lastActive === yesterday.toDateString()) {
    p.streak += 1
    if (p.streak >= 3 && !p.achievements.includes('streak_3')) {
      p.achievements.push('streak_3')
      addActivity(p, { type: 'achievement', title: 'Earned: 3-Day Streak! 🔥', xp: 0 })
    }
  } else if (lastActive !== today) {
    p.streak = 1
  }

  p.lastActive = new Date().toISOString()
}

export function markLessonComplete(courseId: string, lessonId: string, xp: number): UserProgress {
  const p = getProgress()
  if (!p.completedLessons.includes(lessonId)) {
    p.completedLessons.push(lessonId)
    p.totalXP += xp
    p.level = Math.floor(p.totalXP / 100) + 1
    p.courseProgress[courseId] = (p.courseProgress[courseId] || 0) + 1

    // Check achievements
    if (!p.achievements.includes('first_lesson')) {
      p.achievements.push('first_lesson')
      addActivity(p, { type: 'achievement', title: 'Earned: First Step! 🌟', xp: 0 })
    }
    if (p.totalXP >= 100 && !p.achievements.includes('xp_100')) {
      p.achievements.push('xp_100')
      addActivity(p, { type: 'achievement', title: 'Earned: XP Hunter! ⚡', xp: 0 })
    }
    if (p.totalXP >= 500 && !p.achievements.includes('xp_500')) {
      p.achievements.push('xp_500')
      addActivity(p, { type: 'achievement', title: 'Earned: XP Champion! 🏆', xp: 0 })
    }

    updateStreak(p)
    addActivity(p, { type: 'lesson_complete', title: `Completed lesson`, xp, courseId })
  }
  saveProgress(p)
  return p
}

export function resetProgress() {
  if (typeof window !== 'undefined') localStorage.removeItem('vy_progress')
}
