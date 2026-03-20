// Progress tracking using localStorage
// Rollback: clear localStorage key 'vidyayantra_progress'

export interface LessonProgress {
  completed: boolean
  quizScore: number | null
  xpEarned: number
  completedAt: string | null
}

export interface CourseProgress {
  courseId: string
  lessons: Record<string, LessonProgress>
  startedAt: string
  lastAccessedAt: string
}

export interface UserProgress {
  totalXp: number
  level: number
  streak: number
  lastActiveDate: string
  courses: Record<string, CourseProgress>
  achievements: string[]
}

const STORAGE_KEY = 'vidyayantra_progress'

function getDefaultProgress(): UserProgress {
  return {
    totalXp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    courses: {},
    achievements: [],
  }
}

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return getDefaultProgress()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return getDefaultProgress()
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function completeLesson(courseId: string, lessonId: string, xp: number, quizScore?: number): UserProgress {
  const progress = getProgress()
  const today = new Date().toISOString().split('T')[0]

  // Initialize course if not exists
  if (!progress.courses[courseId]) {
    progress.courses[courseId] = {
      courseId,
      lessons: {},
      startedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
    }
  }

  const course = progress.courses[courseId]
  const existingLesson = course.lessons[lessonId]

  // Only add XP if not already completed
  if (!existingLesson?.completed) {
    progress.totalXp += xp
    course.lessons[lessonId] = {
      completed: true,
      quizScore: quizScore ?? null,
      xpEarned: xp,
      completedAt: new Date().toISOString(),
    }
  } else if (quizScore !== undefined) {
    // Update quiz score if retaking
    course.lessons[lessonId].quizScore = quizScore
  }

  course.lastAccessedAt = new Date().toISOString()

  // Update streak
  if (progress.lastActiveDate !== today) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    if (progress.lastActiveDate === yesterday.toISOString().split('T')[0]) {
      progress.streak += 1
    } else {
      progress.streak = 1
    }
    progress.lastActiveDate = today
  }

  // Level up every 500 XP
  progress.level = Math.floor(progress.totalXp / 500) + 1

  // Check achievements
  checkAchievements(progress)

  saveProgress(progress)
  return progress
}

function checkAchievements(progress: UserProgress): void {
  const a = progress.achievements
  if (progress.totalXp >= 100 && !a.includes('first_100_xp')) a.push('first_100_xp')
  if (progress.totalXp >= 500 && !a.includes('xp_500')) a.push('xp_500')
  if (progress.totalXp >= 1000 && !a.includes('xp_1000')) a.push('xp_1000')
  if (progress.totalXp >= 5000 && !a.includes('xp_5000')) a.push('xp_5000')
  if (progress.streak >= 3 && !a.includes('streak_3')) a.push('streak_3')
  if (progress.streak >= 7 && !a.includes('streak_7')) a.push('streak_7')
  if (progress.streak >= 30 && !a.includes('streak_30')) a.push('streak_30')
  if (Object.keys(progress.courses).length >= 3 && !a.includes('explorer_3')) a.push('explorer_3')

  const totalLessons = Object.values(progress.courses).reduce(
    (sum, c) => sum + Object.values(c.lessons).filter(l => l.completed).length, 0
  )
  if (totalLessons >= 10 && !a.includes('lessons_10')) a.push('lessons_10')
  if (totalLessons >= 50 && !a.includes('lessons_50')) a.push('lessons_50')
}

export function getCourseProgress(courseId: string): CourseProgress | null {
  const progress = getProgress()
  return progress.courses[courseId] || null
}

export function isLessonCompleted(courseId: string, lessonId: string): boolean {
  const course = getCourseProgress(courseId)
  return course?.lessons[lessonId]?.completed ?? false
}

export function getCourseCompletionPercent(courseId: string, totalLessons: number): number {
  const course = getCourseProgress(courseId)
  if (!course) return 0
  const completed = Object.values(course.lessons).filter(l => l.completed).length
  return Math.round((completed / totalLessons) * 100)
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export const ACHIEVEMENTS = {
  first_100_xp: { title: 'First Steps', icon: '\ud83c\udf1f', desc: 'Earned 100 XP' },
  xp_500: { title: 'Rising Star', icon: '\u2b50', desc: 'Earned 500 XP' },
  xp_1000: { title: 'Knowledge Seeker', icon: '\ud83d\udca1', desc: 'Earned 1000 XP' },
  xp_5000: { title: 'Grand Master', icon: '\ud83c\udfc6', desc: 'Earned 5000 XP' },
  streak_3: { title: '3-Day Streak', icon: '\ud83d\udd25', desc: '3 days in a row' },
  streak_7: { title: 'Week Warrior', icon: '\u2694\ufe0f', desc: '7-day streak' },
  streak_30: { title: 'Monthly Champion', icon: '\ud83d\udc51', desc: '30-day streak' },
  explorer_3: { title: 'Explorer', icon: '\ud83e\udded', desc: 'Started 3 courses' },
  lessons_10: { title: 'Scholar', icon: '\ud83c\udf93', desc: 'Completed 10 lessons' },
  lessons_50: { title: 'Genius', icon: '\ud83e\udde0', desc: 'Completed 50 lessons' },
} as const
