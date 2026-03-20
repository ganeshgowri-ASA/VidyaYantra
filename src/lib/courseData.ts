export type LessonType = 'video' | 'reading' | 'quiz' | 'exercise' | 'lab'

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface Lesson {
  id: string
  title: string
  type: LessonType
  duration: string
  xp: number
  content: {
    overview: string
    keyPoints: string[]
    videoTitle?: string
    videoDuration?: string
    transcript?: string
    codeExample?: string
    quiz?: QuizQuestion[]
    exercise?: {
      title: string
      instructions: string
      starterCode?: string
      solution?: string
      hints?: string[]
    }
  }
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Course {
  id: string
  title: string
  description: string
  grade: string
  subject: string
  icon: string
  color: string
  totalLessons: number
  totalDuration: string
  xpReward: number
  modules: Module[]
}

export const courses: Course[] = [
  {
    id: 'c1-maths',
    title: 'Class 1 - Mathematics',
    description: 'Fun with numbers! Learn counting, shapes, addition & subtraction through games and stories.',
    grade: '1-2',
    subject: 'Mathematics',
    icon: '🔢',
    color: 'bg-blue-500',
    totalLessons: 12,
    totalDuration: '6 hours',
    xpReward: 600,
    modules: [
      {
        id: 'c1m-m1',
        title: 'Numbers & Counting (1-100)',
        lessons: [
          {
            id: 'c1m-1-1',
            title: 'Counting 1 to 20 with Fun Objects',
            type: 'video',
            duration: '8 min',
            xp: 30,
            content: {
              overview: 'Learn to count from 1 to 20 using colorful fruits, animals, and toys. Interactive counting exercises with drag-and-drop activities.',
              keyPoints: ['Count objects 1-20', 'Match numbers to quantities', 'Write numbers correctly'],
              videoTitle: 'Counting Adventure 1-20',
              videoDuration: '8:00',
              quiz: [
                { id: 1, question: 'How many apples are there? 🍎🍎🍎🍎🍎', options: ['3', '4', '5', '6'], correct: 2, explanation: 'Count each apple: 1, 2, 3, 4, 5. There are 5 apples!' },
                { id: 2, question: 'What number comes after 7?', options: ['6', '8', '9', '5'], correct: 1, explanation: 'After 7 comes 8. Remember: 6, 7, 8, 9, 10!' },
                { id: 3, question: 'Which group has MORE stars? A: ⭐⭐⭐ B: ⭐⭐⭐⭐⭐', options: ['Group A', 'Group B', 'Both same', 'Cannot tell'], correct: 1, explanation: 'Group B has 5 stars while Group A has only 3. 5 is more than 3!' }
              ]
            }
          },
          {
            id: 'c1m-1-2',
            title: 'Numbers 21 to 50 - Tens & Ones',
            type: 'exercise',
            duration: '10 min',
            xp: 40,
            content: {
              overview: 'Explore bigger numbers by grouping into tens and ones. Use virtual blocks to build numbers!',
              keyPoints: ['Group objects in tens', 'Understand place value basics', 'Count from 21 to 50'],
              exercise: {
                title: 'Build Numbers with Blocks',
                instructions: 'Drag tens-blocks and ones-blocks to make the number shown. Example: 35 = 3 tens + 5 ones.',
                hints: ['Each long block = 10', 'Each small cube = 1', 'Count the tens first, then add ones']
              }
            }
          },
          {
            id: 'c1m-1-3',
            title: 'Counting to 100 - Number Chart',
            type: 'quiz',
            duration: '8 min',
            xp: 50,
            content: {
              overview: 'Master counting to 100 with the interactive number chart. Find patterns and missing numbers!',
              keyPoints: ['Count 1-100 confidently', 'Spot patterns in number chart', 'Fill in missing numbers'],
              quiz: [
                { id: 1, question: 'What is the missing number? 45, 46, __, 48', options: ['44', '47', '49', '50'], correct: 1, explanation: '47 comes between 46 and 48.' },
                { id: 2, question: 'Which number is the BIGGEST? 32, 78, 15, 99', options: ['32', '78', '15', '99'], correct: 3, explanation: '99 is the biggest. It is closest to 100!' },
                { id: 3, question: 'Count by 10s: 10, 20, 30, __', options: ['31', '35', '40', '50'], correct: 2, explanation: 'Counting by 10s: each time we add 10. 30 + 10 = 40.' }
              ]
            }
          }
        ]
      },
      {
        id: 'c1m-m2',
        title: 'Addition & Subtraction',
        lessons: [
          {
            id: 'c1m-2-1',
            title: 'Addition with Pictures (Sums up to 10)',
            type: 'video',
            duration: '10 min',
            xp: 40,
            content: {
              overview: 'Learn addition by combining groups of objects. See how putting things together makes MORE!',
              keyPoints: ['Addition means combining', 'Use + and = signs', 'Add numbers up to 10'],
              videoTitle: 'Adding is Fun!',
              videoDuration: '10:00',
              quiz: [
                { id: 1, question: '🐱🐱 + 🐱🐱🐱 = ?', options: ['4', '5', '6', '3'], correct: 1, explanation: '2 cats + 3 cats = 5 cats total!' },
                { id: 2, question: '4 + 3 = ?', options: ['5', '6', '7', '8'], correct: 2, explanation: 'Start at 4, count up 3 more: 5, 6, 7. So 4 + 3 = 7!' }
              ]
            }
          },
          {
            id: 'c1m-2-2',
            title: 'Subtraction Stories (Taking Away)',
            type: 'exercise',
            duration: '10 min',
            xp: 40,
            content: {
              overview: 'Subtraction means taking away! Learn with fun stories about birds flying away and cookies being eaten.',
              keyPoints: ['Subtraction means taking away', 'Use - and = signs', 'Subtract numbers up to 10'],
              exercise: {
                title: 'Cookie Subtraction Game',
                instructions: 'You have cookies on a plate. Click to eat some! Then write how many are left. Example: 8 cookies - eat 3 = 5 left.',
                hints: ['Count how many you start with', 'Count how many you take away', 'Count what remains']
              }
            }
          }
        ]
      },
      {
        id: 'c1m-m3',
        title: 'Shapes & Patterns',
        lessons: [
          {
            id: 'c1m-3-1',
            title: 'Circles, Squares, Triangles & Rectangles',
            type: 'lab',
            duration: '12 min',
            xp: 50,
            content: {
              overview: 'Discover shapes all around you! Draw, color, and find shapes in everyday objects like windows, wheels, and rooftops.',
              keyPoints: ['Identify 4 basic shapes', 'Count sides and corners', 'Find shapes in real life'],
              quiz: [
                { id: 1, question: 'How many sides does a triangle have?', options: ['2', '3', '4', '5'], correct: 1, explanation: 'A triangle has exactly 3 sides. Tri means three!' },
                { id: 2, question: 'A wheel is shaped like a...', options: ['Square', 'Triangle', 'Circle', 'Rectangle'], correct: 2, explanation: 'A wheel is round like a circle!' }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c1-evs',
    title: 'Class 1 - EVS (My World)',
    description: 'Explore the world around you! Learn about plants, animals, family, food, and seasons.',
    grade: '1-2',
    subject: 'EVS',
    icon: '🌿',
    color: 'bg-green-500',
    totalLessons: 10,
    totalDuration: '5 hours',
    xpReward: 500,
    modules: [
      {
        id: 'c1e-m1',
        title: 'My Family & Home',
        lessons: [
          {
            id: 'c1e-1-1',
            title: 'My Family Members',
            type: 'video',
            duration: '8 min',
            xp: 30,
            content: {
              overview: 'Learn about different family members - parents, grandparents, siblings. Draw your family tree!',
              keyPoints: ['Name family members', 'Understand family relationships', 'Draw a family tree'],
              videoTitle: 'My Lovely Family',
              videoDuration: '8:00',
              quiz: [
                { id: 1, question: 'Your mothers mother is your...', options: ['Aunt', 'Grandmother', 'Sister', 'Cousin'], correct: 1, explanation: 'Your mothers mother is your grandmother (Nani)!' },
                { id: 2, question: 'Who are your siblings?', options: ['Parents', 'Brothers and Sisters', 'Grandparents', 'Teachers'], correct: 1, explanation: 'Siblings means your brothers and sisters.' }
              ]
            }
          },
          {
            id: 'c1e-1-2',
            title: 'Parts of My House',
            type: 'exercise',
            duration: '10 min',
            xp: 35,
            content: {
              overview: 'Explore different rooms in a house. Learn what activities happen in kitchen, bedroom, bathroom, and living room.',
              keyPoints: ['Name rooms in a house', 'Match activities to rooms', 'Understand home safety'],
              exercise: {
                title: 'Match the Room Game',
                instructions: 'Drag each activity to the correct room. Where do we cook? Where do we sleep? Where do we study?',
                hints: ['Cooking happens in the kitchen', 'We sleep in the bedroom', 'We bathe in the bathroom']
              }
            }
          }
        ]
      },
      {
        id: 'c1e-m2',
        title: 'Plants & Animals Around Us',
        lessons: [
          {
            id: 'c1e-2-1',
            title: 'Types of Plants - Big & Small',
            type: 'lab',
            duration: '12 min',
            xp: 45,
            content: {
              overview: 'Discover trees, shrubs, herbs, and climbers. Virtual garden lab where you plant and grow different plants!',
              keyPoints: ['Identify trees, shrubs, herbs', 'Parts of a plant', 'Plants need water and sunlight'],
              quiz: [
                { id: 1, question: 'Which part of the plant makes food?', options: ['Root', 'Stem', 'Leaf', 'Flower'], correct: 2, explanation: 'Leaves make food for the plant using sunlight!' },
                { id: 2, question: 'Mango tree is a...', options: ['Herb', 'Shrub', 'Tree', 'Climber'], correct: 2, explanation: 'Mango tree is a big tree with a thick trunk!' }
              ]
            }
          },
          {
            id: 'c1e-2-2',
            title: 'Animals - Pet vs Wild',
            type: 'quiz',
            duration: '8 min',
            xp: 40,
            content: {
              overview: 'Learn the difference between pet animals and wild animals. Where do they live? What do they eat?',
              keyPoints: ['Pet animals vs wild animals', 'Animal homes', 'Animal food habits'],
              quiz: [
                { id: 1, question: 'Which is a pet animal?', options: ['Lion', 'Dog', 'Tiger', 'Bear'], correct: 1, explanation: 'Dogs are pet animals that live with us at home!' },
                { id: 2, question: 'Where does a lion live?', options: ['House', 'Nest', 'Forest', 'Pond'], correct: 2, explanation: 'Lions live in forests. They are wild animals!' },
                { id: 3, question: 'What does a cow eat?', options: ['Meat', 'Grass', 'Fish', 'Insects'], correct: 1, explanation: 'Cows eat grass and plants. They are herbivores!' }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c3-english',
    title: 'Class 3 - English',
    description: 'Build reading, writing & grammar skills with fun stories, poems, and interactive exercises.',
    grade: '3-5',
    subject: 'English',
    icon: '📚',
    color: 'bg-purple-500',
    totalLessons: 14,
    totalDuration: '7 hours',
    xpReward: 700,
    modules: [
      {
        id: 'c3e-m1',
        title: 'Reading Comprehension',
        lessons: [
          {
            id: 'c3e-1-1',
            title: 'The Clever Fox - Story Time',
            type: 'reading',
            duration: '12 min',
            xp: 40,
            content: {
              overview: 'Read an engaging story about a clever fox who helps forest animals. Answer questions to test your understanding.',
              keyPoints: ['Read with expression', 'Understand the story meaning', 'Answer who, what, where, when questions'],
              quiz: [
                { id: 1, question: 'What does comprehension mean?', options: ['Writing fast', 'Understanding what you read', 'Drawing pictures', 'Counting words'], correct: 1, explanation: 'Comprehension means understanding what you read.' },
                { id: 2, question: 'Which is a good reading habit?', options: ['Skip difficult words', 'Read too fast', 'Re-read if confused', 'Only look at pictures'], correct: 2, explanation: 'Re-reading when confused helps you understand better!' }
              ]
            }
          },
          {
            id: 'c3e-1-2',
            title: 'Poetry Fun - Rhyme & Rhythm',
            type: 'exercise',
            duration: '10 min',
            xp: 35,
            content: {
              overview: 'Discover the magic of poems! Find rhyming words, clap the rhythm, and even write your own short poem.',
              keyPoints: ['Identify rhyming words', 'Understand rhythm in poems', 'Create simple rhymes'],
              exercise: {
                title: 'Rhyme Time Challenge',
                instructions: 'Find the rhyming pairs! Match words that sound alike at the end. Then create your own 4-line poem using rhyming words.',
                hints: ['Cat rhymes with bat, hat, mat', 'Look at the ending sounds', 'Your poem lines 1&2 should rhyme, and 3&4 should rhyme']
              }
            }
          }
        ]
      },
      {
        id: 'c3e-m2',
        title: 'Grammar Basics',
        lessons: [
          {
            id: 'c3e-2-1',
            title: 'Nouns - Naming Words',
            type: 'video',
            duration: '10 min',
            xp: 40,
            content: {
              overview: 'Learn what nouns are - names of people, places, animals, and things. Play the Noun Hunt game!',
              keyPoints: ['Nouns name people, places, things', 'Common vs Proper nouns', 'Find nouns in sentences'],
              videoTitle: 'Noun Adventures',
              videoDuration: '10:00',
              quiz: [
                { id: 1, question: 'Which word is a noun? "The cat sat on the mat."', options: ['sat', 'on', 'the', 'cat'], correct: 3, explanation: 'Cat is a noun - it names an animal!' },
                { id: 2, question: '"Delhi" is a...', options: ['Common noun', 'Proper noun', 'Verb', 'Adjective'], correct: 1, explanation: 'Delhi is a proper noun - it names a specific place and starts with a capital letter!' },
                { id: 3, question: 'How many nouns in: "Ram ate rice with a spoon"?', options: ['1', '2', '3', '4'], correct: 2, explanation: 'Ram (person), rice (thing), spoon (thing) = 3 nouns!' }
              ]
            }
          },
          {
            id: 'c3e-2-2',
            title: 'Verbs - Action Words',
            type: 'exercise',
            duration: '10 min',
            xp: 40,
            content: {
              overview: 'Verbs show action! Run, jump, eat, sleep, dance - these are all verbs. Act them out and identify them in sentences.',
              keyPoints: ['Verbs show action', 'Every sentence needs a verb', 'Identify verbs in sentences'],
              exercise: {
                title: 'Verb Charades',
                instructions: 'Look at each animated character. What action are they doing? Type the verb! Then fill verbs into the story blanks.',
                hints: ['Think about what the character is DOING', 'Running, jumping, eating are all verbs', 'The word that shows action is the verb']
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c5-science',
    title: 'Class 5 - Science',
    description: 'Discover the wonders of science! Experiments with light, magnets, human body, and the solar system.',
    grade: '3-5',
    subject: 'Science',
    icon: '🔬',
    color: 'bg-yellow-500',
    totalLessons: 16,
    totalDuration: '8 hours',
    xpReward: 800,
    modules: [
      {
        id: 'c5s-m1',
        title: 'Human Body Systems',
        lessons: [
          {
            id: 'c5s-1-1',
            title: 'The Digestive System - Food Journey',
            type: 'video',
            duration: '12 min',
            xp: 50,
            content: {
              overview: 'Follow a bite of food on its amazing journey through your body! From mouth to stomach to intestines.',
              keyPoints: ['Organs of digestive system', 'Journey of food through body', 'Role of each organ'],
              videoTitle: 'Food Adventure Inside You',
              videoDuration: '12:00',
              quiz: [
                { id: 1, question: 'Where does digestion begin?', options: ['Stomach', 'Mouth', 'Intestine', 'Liver'], correct: 1, explanation: 'Digestion begins in the mouth where teeth chew food and saliva starts breaking it down!' },
                { id: 2, question: 'What does the stomach do?', options: ['Pumps blood', 'Breaks down food with acids', 'Filters air', 'Makes bones'], correct: 1, explanation: 'The stomach uses acid and muscles to break food into smaller pieces!' },
                { id: 3, question: 'Where are nutrients absorbed?', options: ['Mouth', 'Stomach', 'Small intestine', 'Large intestine'], correct: 2, explanation: 'The small intestine absorbs nutrients from digested food into the blood!' }
              ]
            }
          },
          {
            id: 'c5s-1-2',
            title: 'Build a Body - Interactive Lab',
            type: 'lab',
            duration: '15 min',
            xp: 60,
            content: {
              overview: 'Drag and drop organs to build the human body! Place the heart, lungs, stomach, brain in the right positions.',
              keyPoints: ['Location of major organs', 'Function of each organ', 'How organs work together'],
              exercise: {
                title: 'Body Builder Lab',
                instructions: 'Drag each organ to its correct position in the body outline. Click an organ to learn what it does!',
                hints: ['Heart goes in the chest, slightly left', 'Brain is inside the skull', 'Stomach is below the chest on the left side']
              }
            }
          }
        ]
      },
      {
        id: 'c5s-m2',
        title: 'Light & Shadows',
        lessons: [
          {
            id: 'c5s-2-1',
            title: 'How Shadows Form',
            type: 'lab',
            duration: '12 min',
            xp: 50,
            content: {
              overview: 'Virtual shadow lab! Move the light source and objects to see how shadows change size and direction.',
              keyPoints: ['Light travels in straight lines', 'Opaque objects block light', 'Shadow size changes with distance'],
              quiz: [
                { id: 1, question: 'What is needed to form a shadow?', options: ['Only light', 'Light and opaque object', 'Only darkness', 'Water'], correct: 1, explanation: 'A shadow forms when an opaque object blocks light!' },
                { id: 2, question: 'When is your shadow longest?', options: ['Noon', 'Morning/Evening', 'Midnight', 'Never changes'], correct: 1, explanation: 'Shadows are longest in morning and evening when the sun is low!' }
              ]
            }
          }
        ]
      },
      {
        id: 'c5s-m3',
        title: 'The Solar System',
        lessons: [
          {
            id: 'c5s-3-1',
            title: 'Planets in Our Solar System',
            type: 'video',
            duration: '14 min',
            xp: 50,
            content: {
              overview: 'Take a virtual space tour! Visit all 8 planets and learn fun facts about each one.',
              keyPoints: ['Names of 8 planets in order', 'Special features of each planet', 'Earth is the only planet with life'],
              videoTitle: 'Space Tour - 8 Planets',
              videoDuration: '14:00',
              quiz: [
                { id: 1, question: 'Which is the largest planet?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correct: 2, explanation: 'Jupiter is the largest planet - over 1000 Earths could fit inside it!' },
                { id: 2, question: 'Which planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], correct: 1, explanation: 'Mercury is the closest planet to the Sun!' },
                { id: 3, question: 'Which planet has rings?', options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'], correct: 2, explanation: 'Saturn is famous for its beautiful rings made of ice and rock!' }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c6-science',
    title: 'Class 6 - Science',
    description: 'Explore food, materials, living world, motion, magnets & electricity with hands-on experiments.',
    grade: '6-8',
    subject: 'Science',
    icon: '⚗️',
    color: 'bg-teal-500',
    totalLessons: 18,
    totalDuration: '10 hours',
    xpReward: 900,
    modules: [
      {
        id: 'c6s-m1',
        title: 'Food - Where Does It Come From?',
        lessons: [
          {
            id: 'c6s-1-1',
            title: 'Sources of Food & Food Chain',
            type: 'video',
            duration: '12 min',
            xp: 50,
            content: {
              overview: 'Understand where our food comes from - plants and animals. Learn about herbivores, carnivores, omnivores and food chains.',
              keyPoints: ['Plant and animal sources of food', 'Herbivore, carnivore, omnivore', 'Food chain concept'],
              videoTitle: 'Journey of Our Food',
              videoDuration: '12:00',
              quiz: [
                { id: 1, question: 'An animal that eats only plants is called a...', options: ['Carnivore', 'Herbivore', 'Omnivore', 'Decomposer'], correct: 1, explanation: 'Herbivores eat only plants. Examples: cow, deer, rabbit.' },
                { id: 2, question: 'Which is an omnivore?', options: ['Lion', 'Deer', 'Bear', 'Cow'], correct: 2, explanation: 'Bears eat both plants (berries) and animals (fish), making them omnivores!' },
                { id: 3, question: 'In a food chain: Grass -> Grasshopper -> Frog -> Snake. What eats the frog?', options: ['Grass', 'Grasshopper', 'Snake', 'Frog'], correct: 2, explanation: 'In this food chain, the snake eats the frog!' }
              ]
            }
          },
          {
            id: 'c6s-1-2',
            title: 'Components of Food - Nutrients Lab',
            type: 'lab',
            duration: '15 min',
            xp: 60,
            content: {
              overview: 'Virtual lab to test food for starch, protein, and fats! Use iodine test, biuret test, and paper test interactively.',
              keyPoints: ['Carbohydrates, proteins, fats, vitamins, minerals', 'Tests for nutrients', 'Balanced diet'],
              exercise: {
                title: 'Virtual Food Testing Lab',
                instructions: 'Select a food item and drag the test reagent onto it. Observe the color change to identify the nutrient present!',
                hints: ['Iodine turns blue-black with starch', 'Greasy spot on paper means fats present', 'A balanced diet has all nutrients']
              }
            }
          }
        ]
      },
      {
        id: 'c6s-m2',
        title: 'Separation of Substances',
        lessons: [
          {
            id: 'c6s-2-1',
            title: 'Methods of Separation',
            type: 'video',
            duration: '14 min',
            xp: 50,
            content: {
              overview: 'Learn handpicking, winnowing, sieving, filtration, evaporation, and magnetic separation through animated demos.',
              keyPoints: ['Different separation methods', 'Which method for which mixture', 'Real-life applications'],
              videoTitle: 'Separating Mixtures',
              videoDuration: '14:00',
              quiz: [
                { id: 1, question: 'To separate sand from water, we use...', options: ['Winnowing', 'Handpicking', 'Filtration', 'Magnetic separation'], correct: 2, explanation: 'Filtration separates insoluble solids (sand) from liquids (water) using a filter!' },
                { id: 2, question: 'Farmers separate grain from husk using...', options: ['Filtration', 'Winnowing', 'Evaporation', 'Sieving'], correct: 1, explanation: 'Winnowing uses wind to blow away lighter husk from heavier grain!' }
              ]
            }
          }
        ]
      },
      {
        id: 'c6s-m3',
        title: 'Electricity & Circuits',
        lessons: [
          {
            id: 'c6s-3-1',
            title: 'Build a Circuit - Interactive Lab',
            type: 'lab',
            duration: '15 min',
            xp: 60,
            content: {
              overview: 'Virtual circuit builder! Drag and connect battery, wires, bulb, and switch to make a working circuit.',
              keyPoints: ['Components of electric circuit', 'Open vs closed circuit', 'Conductors and insulators'],
              exercise: {
                title: 'Circuit Builder Lab',
                instructions: 'Drag components to build a working circuit. Connect battery -> wire -> switch -> bulb -> wire -> battery. Toggle the switch!',
                hints: ['Circuit must be complete for current to flow', 'Switch controls the flow of electricity', 'If bulb doesnt glow, check for gaps in circuit']
              },
              quiz: [
                { id: 1, question: 'What happens when a circuit is open?', options: ['Bulb glows brighter', 'Current flows', 'Current stops flowing', 'Battery charges'], correct: 2, explanation: 'In an open circuit, the path is broken and current cannot flow!' },
                { id: 2, question: 'Which is a conductor?', options: ['Rubber', 'Wood', 'Copper', 'Plastic'], correct: 2, explanation: 'Copper is a conductor - it allows electricity to pass through it!' }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c8-maths',
    title: 'Class 8 - Mathematics',
    description: 'Master algebra, geometry, mensuration, data handling and rational numbers with interactive problems.',
    grade: '6-8',
    subject: 'Mathematics',
    icon: '📊',
    color: 'bg-indigo-500',
    totalLessons: 20,
    totalDuration: '12 hours',
    xpReward: 1000,
    modules: [
      {
        id: 'c8m-m1',
        title: 'Rational Numbers',
        lessons: [
          {
            id: 'c8m-1-1',
            title: 'Introduction to Rational Numbers',
            type: 'video',
            duration: '12 min',
            xp: 50,
            content: {
              overview: 'Understand rational numbers as p/q form. Learn properties: closure, commutativity, associativity with visual number lines.',
              keyPoints: ['Rational numbers as p/q', 'Properties of rational numbers', 'Representation on number line'],
              videoTitle: 'Rational Numbers Explained',
              videoDuration: '12:00',
              quiz: [
                { id: 1, question: 'Which of these is a rational number?', options: ['sqrt(2)', 'pi', '3/4', 'sqrt(3)'], correct: 2, explanation: '3/4 is rational because it is in p/q form where p and q are integers and q is not 0.' },
                { id: 2, question: 'What is -3/5 + 4/5?', options: ['-7/5', '1/5', '7/5', '-1/5'], correct: 1, explanation: '-3/5 + 4/5 = (-3+4)/5 = 1/5' },
                { id: 3, question: 'The product of a rational number and its reciprocal is...', options: ['0', '2', '1', 'The number itself'], correct: 2, explanation: 'Any number times its reciprocal = 1. Example: 3/4 x 4/3 = 1' }
              ]
            }
          },
          {
            id: 'c8m-1-2',
            title: 'Operations on Rational Numbers',
            type: 'exercise',
            duration: '15 min',
            xp: 60,
            content: {
              overview: 'Practice adding, subtracting, multiplying and dividing rational numbers with step-by-step guided problems.',
              keyPoints: ['Add/subtract: find LCM of denominators', 'Multiply: multiply numerators and denominators', 'Divide: multiply by reciprocal'],
              exercise: {
                title: 'Rational Number Calculator Challenge',
                instructions: 'Solve each step shown on screen. Drag the correct answer tile to complete each step. Work from left to right!',
                starterCode: '2/3 + 5/6 = ?\nStep 1: LCM of 3 and 6 = __\nStep 2: 2/3 = __/6\nStep 3: __/6 + 5/6 = __/6',
                solution: 'LCM=6, 2/3=4/6, 4/6+5/6=9/6=3/2',
                hints: ['Find LCM of denominators first', 'Convert to equivalent fractions', 'Add numerators, keep denominator']
              }
            }
          }
        ]
      },
      {
        id: 'c8m-m2',
        title: 'Linear Equations in One Variable',
        lessons: [
          {
            id: 'c8m-2-1',
            title: 'Solving Linear Equations',
            type: 'exercise',
            duration: '15 min',
            xp: 60,
            content: {
              overview: 'Use the balance method to solve equations. Interactive balance scale shows how to keep equations balanced!',
              keyPoints: ['Transposition method', 'Cross multiplication', 'Word problems to equations'],
              exercise: {
                title: 'Balance the Equation',
                instructions: 'Use the virtual balance scale. Whatever you do to one side, do to the other! Solve for x step by step.',
                starterCode: '2x + 5 = 13\nSolve for x:',
                solution: '2x = 13 - 5 = 8\nx = 8/2 = 4',
                hints: ['Move constants to one side', 'Move x terms to other side', 'Divide both sides by coefficient of x']
              }
            }
          },
          {
            id: 'c8m-2-2',
            title: 'Word Problems - Equations',
            type: 'quiz',
            duration: '12 min',
            xp: 55,
            content: {
              overview: 'Translate real-life situations into equations and solve them. Age problems, number problems, geometry problems.',
              keyPoints: ['Identify unknowns', 'Form the equation', 'Solve and verify'],
              quiz: [
                { id: 1, question: 'Ravi has twice as many marbles as Sam. Together they have 36. How many does Sam have?', options: ['9', '12', '18', '24'], correct: 1, explanation: 'Let Sam have x. Ravi has 2x. x + 2x = 36, 3x = 36, x = 12. Sam has 12!' },
                { id: 2, question: 'If 3(x-2) = 12, then x = ?', options: ['2', '4', '6', '8'], correct: 2, explanation: '3(x-2) = 12 => x-2 = 4 => x = 6' }
              ]
            }
          }
        ]
      },
      {
        id: 'c8m-m3',
        title: 'Mensuration - Areas & Volumes',
        lessons: [
          {
            id: 'c8m-3-1',
            title: 'Area of Quadrilaterals & Polygons',
            type: 'lab',
            duration: '15 min',
            xp: 60,
            content: {
              overview: 'Interactive geometry lab - drag vertices to change shapes and watch area calculations update in real time!',
              keyPoints: ['Area of trapezium, rhombus, polygon', 'Using diagonals in area formulas', 'Composite shapes'],
              quiz: [
                { id: 1, question: 'Area of trapezium with parallel sides 8cm, 5cm and height 4cm?', options: ['26 sq cm', '40 sq cm', '20 sq cm', '52 sq cm'], correct: 0, explanation: 'Area = 1/2 x (sum of parallel sides) x height = 1/2 x (8+5) x 4 = 26 sq cm' },
                { id: 2, question: 'A rhombus has diagonals 12cm and 8cm. Its area is?', options: ['96 sq cm', '48 sq cm', '40 sq cm', '24 sq cm'], correct: 1, explanation: 'Area of rhombus = 1/2 x d1 x d2 = 1/2 x 12 x 8 = 48 sq cm' }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c10-science',
    title: 'Class 10 - Science',
    description: 'Master chemical reactions, life processes, electricity, light, carbon compounds for board exams.',
    grade: '9-10',
    subject: 'Science',
    icon: '🧪',
    color: 'bg-red-500',
    totalLessons: 24,
    totalDuration: '16 hours',
    xpReward: 1500,
    modules: [
      {
        id: 'c10s-m1',
        title: 'Chemical Reactions & Equations',
        lessons: [
          {
            id: 'c10s-1-1',
            title: 'Types of Chemical Reactions',
            type: 'video',
            duration: '15 min',
            xp: 60,
            content: {
              overview: 'Learn combination, decomposition, displacement, double displacement and redox reactions with animated molecular simulations.',
              keyPoints: ['5 types of chemical reactions', 'Balancing chemical equations', 'Identifying reaction types from equations'],
              videoTitle: 'Chemical Reactions Animated',
              videoDuration: '15:00',
              quiz: [
                { id: 1, question: 'A + B -> AB is which type of reaction?', options: ['Decomposition', 'Combination', 'Displacement', 'Double displacement'], correct: 1, explanation: 'When two substances combine to form one product, it is a combination reaction!' },
                { id: 2, question: 'In Zn + CuSO4 -> ZnSO4 + Cu, what happens?', options: ['Combination', 'Decomposition', 'Displacement', 'No reaction'], correct: 2, explanation: 'Zinc displaces copper from copper sulphate - this is a displacement reaction!' },
                { id: 3, question: 'Which reaction requires light energy?', options: ['Thermal decomposition', 'Photolytic decomposition', 'Electrolytic decomposition', 'Combination'], correct: 1, explanation: 'Photolytic decomposition uses light energy to break compounds. Example: AgCl -> Ag + Cl2 in sunlight.' }
              ]
            }
          },
          {
            id: 'c10s-1-2',
            title: 'Balancing Equations - Interactive Lab',
            type: 'lab',
            duration: '15 min',
            xp: 70,
            content: {
              overview: 'Use the virtual atom counter to balance chemical equations. Drag atoms to make both sides equal!',
              keyPoints: ['Law of conservation of mass', 'Steps to balance equations', 'Checking atom counts'],
              exercise: {
                title: 'Equation Balancer',
                instructions: 'Count atoms on each side. Add coefficients (numbers before formulas) to make atom counts equal on both sides.',
                starterCode: 'Balance: H2 + O2 -> H2O\nLeft: H=2, O=2\nRight: H=2, O=1\nAnswer: 2H2 + O2 -> 2H2O',
                solution: '2H2 + O2 -> 2H2O',
                hints: ['Count each element separately', 'Only add coefficients, never change subscripts', 'Check your work by counting atoms on both sides']
              }
            }
          }
        ]
      },
      {
        id: 'c10s-m2',
        title: 'Life Processes',
        lessons: [
          {
            id: 'c10s-2-1',
            title: 'Nutrition in Plants & Animals',
            type: 'video',
            duration: '14 min',
            xp: 60,
            content: {
              overview: 'Explore photosynthesis, autotrophs, heterotrophs. Virtual photosynthesis simulation with light, CO2, and water variables.',
              keyPoints: ['Photosynthesis equation', 'Autotrophs vs heterotrophs', 'Types of heterotrophic nutrition'],
              videoTitle: 'How Plants Make Food',
              videoDuration: '14:00',
              quiz: [
                { id: 1, question: 'What is the equation for photosynthesis?', options: ['CO2+H2O->C6H12O6+O2', 'C6H12O6+O2->CO2+H2O', 'H2O->H2+O2', 'N2+O2->NO2'], correct: 0, explanation: '6CO2 + 6H2O + sunlight -> C6H12O6 + 6O2. Plants use CO2 and water to make glucose and release oxygen!' },
                { id: 2, question: 'Which organelle is the site of photosynthesis?', options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'], correct: 2, explanation: 'Chloroplasts contain chlorophyll which captures light energy for photosynthesis!' }
              ]
            }
          }
        ]
      },
      {
        id: 'c10s-m3',
        title: 'Electricity',
        lessons: [
          {
            id: 'c10s-3-1',
            title: 'Ohms Law & Circuits',
            type: 'lab',
            duration: '18 min',
            xp: 70,
            content: {
              overview: 'Virtual circuit lab - adjust voltage and resistance, measure current. Plot V-I graphs. Series vs parallel circuits.',
              keyPoints: ['V = IR (Ohms law)', 'Series vs parallel resistance', 'Power and energy calculations'],
              exercise: {
                title: 'Ohms Law Virtual Lab',
                instructions: 'Use sliders to change voltage (1-12V) and resistance (1-100 ohms). Observe current change. Plot V vs I graph.',
                hints: ['Current = Voltage / Resistance', 'V-I graph is a straight line for ohmic conductors', 'Slope of V-I graph = Resistance']
              },
              quiz: [
                { id: 1, question: 'A 6V battery drives 2A through a resistor. Its resistance is?', options: ['12 ohms', '3 ohms', '8 ohms', '4 ohms'], correct: 1, explanation: 'R = V/I = 6/2 = 3 ohms' },
                { id: 2, question: 'Two 4-ohm resistors in series give total resistance of?', options: ['2 ohms', '4 ohms', '8 ohms', '16 ohms'], correct: 2, explanation: 'Series: R_total = R1 + R2 = 4 + 4 = 8 ohms' }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c10-maths',
    title: 'Class 10 - Mathematics',
    description: 'Ace your board exams! Real numbers, polynomials, quadratics, trigonometry, coordinate geometry & statistics.',
    grade: '9-10',
    subject: 'Mathematics',
    icon: '📐',
    color: 'bg-orange-500',
    totalLessons: 26,
    totalDuration: '18 hours',
    xpReward: 1800,
    modules: [
      {
        id: 'c10m-m1',
        title: 'Quadratic Equations',
        lessons: [
          {
            id: 'c10m-1-1',
            title: 'Solving by Factorisation',
            type: 'exercise',
            duration: '15 min',
            xp: 70,
            content: {
              overview: 'Learn to split the middle term and factorise quadratic equations. Step-by-step guided practice with instant feedback.',
              keyPoints: ['Standard form: ax2+bx+c=0', 'Splitting middle term method', 'Finding roots by factorisation'],
              exercise: {
                title: 'Quadratic Factorisation Trainer',
                instructions: 'For each equation, find two numbers that multiply to ac and add to b. Then split the middle term and factorise.',
                starterCode: 'Solve: x2 + 5x + 6 = 0\nFind: two numbers that multiply to 6 and add to 5\nAnswer: 2 and 3\nSo: (x+2)(x+3) = 0\nx = -2 or x = -3',
                solution: 'x = -2 or x = -3',
                hints: ['List factor pairs of c (constant term)', 'Find pair that adds to b (middle coefficient)', 'Each factor gives you one root']
              }
            }
          },
          {
            id: 'c10m-1-2',
            title: 'Quadratic Formula & Discriminant',
            type: 'video',
            duration: '15 min',
            xp: 65,
            content: {
              overview: 'Use the quadratic formula for any equation. Understand discriminant to predict nature of roots without solving!',
              keyPoints: ['x = (-b +/- sqrt(b2-4ac)) / 2a', 'Discriminant D = b2-4ac', 'D>0: 2 real roots, D=0: 1 root, D<0: no real roots'],
              videoTitle: 'The Quadratic Formula',
              videoDuration: '15:00',
              quiz: [
                { id: 1, question: 'For x2 - 5x + 6 = 0, discriminant = ?', options: ['1', '25', '49', '-1'], correct: 0, explanation: 'D = b2 - 4ac = 25 - 24 = 1. Since D>0, two distinct real roots exist!' },
                { id: 2, question: 'If D = 0, the quadratic has...', options: ['No real roots', 'Two distinct real roots', 'One repeated root', 'Infinite roots'], correct: 2, explanation: 'When D=0, the formula gives x = -b/2a, which is one repeated (equal) root!' }
              ]
            }
          }
        ]
      },
      {
        id: 'c10m-m2',
        title: 'Introduction to Trigonometry',
        lessons: [
          {
            id: 'c10m-2-1',
            title: 'Trigonometric Ratios',
            type: 'lab',
            duration: '18 min',
            xp: 70,
            content: {
              overview: 'Interactive right triangle lab! Change the angle and watch sin, cos, tan values update. Visualize SOH-CAH-TOA.',
              keyPoints: ['sin, cos, tan definitions', 'Values at 0, 30, 45, 60, 90 degrees', 'Trigonometric identities'],
              exercise: {
                title: 'Trig Ratio Explorer',
                instructions: 'Use the slider to change angle theta (0-90 degrees). See how sin, cos and tan change. Memorize the standard values table!',
                hints: ['SOH: sin = Opposite/Hypotenuse', 'CAH: cos = Adjacent/Hypotenuse', 'TOA: tan = Opposite/Adjacent']
              },
              quiz: [
                { id: 1, question: 'sin 30 degrees = ?', options: ['1/2', 'sqrt(3)/2', '1/sqrt(2)', '1'], correct: 0, explanation: 'sin 30 = 1/2. Remember: sin 0=0, sin 30=1/2, sin 45=1/sqrt2, sin 60=sqrt3/2, sin 90=1' },
                { id: 2, question: 'In a right triangle, if tan A = 3/4, what is sin A?', options: ['3/5', '4/5', '3/4', '4/3'], correct: 0, explanation: 'tan A = 3/4 means opposite=3, adjacent=4. Hypotenuse = sqrt(9+16) = 5. sin A = 3/5' }
              ]
            }
          }
        ]
      },
      {
        id: 'c10m-m3',
        title: 'Statistics & Probability',
        lessons: [
          {
            id: 'c10m-3-1',
            title: 'Mean, Median, Mode of Grouped Data',
            type: 'exercise',
            duration: '18 min',
            xp: 65,
            content: {
              overview: 'Calculate central tendency for grouped frequency distributions. Interactive data table with auto-calculation checks.',
              keyPoints: ['Direct method for mean', 'Finding median class', 'Finding modal class'],
              exercise: {
                title: 'Statistics Data Analyzer',
                instructions: 'Fill in the frequency table columns (midpoint, fx, cf). The tool will verify your calculations. Then find mean, median and mode.',
                hints: ['Mean = Sum(fx) / Sum(f)', 'Median class: find cf that crosses n/2', 'Modal class: highest frequency class']
              }
            }
          }
        ]
      }
    ]
  }
  ,
  {
    id: 'c1-english',
    title: 'Class 1 - English',
    description: 'Start your English journey! Learn the alphabet, simple words, and fun sentences with pictures and stories.',
    grade: '1-2',
    subject: 'English',
    icon: '📖',
    color: 'bg-purple-500',
    totalLessons: 8,
    totalDuration: '4 hours',
    xpReward: 400,
    modules: [
      {
        id: 'c1en-m1',
        title: 'Alphabet & Sounds',
        lessons: [
          {
            id: 'c1en-1-1',
            title: 'A to Z - The Alphabet Song! 🎵',
            type: 'video',
            duration: '10 min',
            xp: 30,
            content: {
              overview: 'Sing and learn all 26 letters of the English alphabet! Each letter comes with a fun animal or object to help you remember.',
              keyPoints: ['Learn all 26 letters', 'Big letters (CAPITAL) and small letters', 'Each letter makes a special sound'],
              videoTitle: 'The Alphabet Song Adventure',
              videoDuration: '10:00',
              quiz: [
                { id: 1, question: 'Which letter comes after "C"?', options: ['A', 'B', 'D', 'E'], correct: 2, explanation: 'A, B, C, D! The letter D comes after C. Great job!' },
                { id: 2, question: '"A" is for Apple 🍎. "B" is for...?', options: ['Cat', 'Ball', 'Dog', 'Egg'], correct: 1, explanation: 'B is for Ball! 🏀 Ball starts with the letter B.' }
              ]
            }
          },
          {
            id: 'c1en-1-2',
            title: 'Vowels - A E I O U! 🌟',
            type: 'exercise',
            duration: '8 min',
            xp: 35,
            content: {
              overview: 'Meet the 5 special letters called vowels: A, E, I, O, U. They are in almost every word we speak!',
              keyPoints: ['5 vowels: A, E, I, O, U', 'Vowels are in every word', 'Find vowels in simple words'],
              exercise: {
                title: 'Vowel Hunt Game',
                instructions: 'Look at each picture word. Circle all the vowels you can find! Example: C-A-T has the vowel A.',
                hints: ['Remember: A, E, I, O, U are vowels', 'Say the word out loud to hear the vowel sound', 'Every word has at least one vowel']
              }
            }
          }
        ]
      },
      {
        id: 'c1en-m2',
        title: 'Simple Words & Sentences',
        lessons: [
          {
            id: 'c1en-2-1',
            title: 'Three-Letter Words - CVC Fun! 🐱',
            type: 'reading',
            duration: '12 min',
            xp: 40,
            content: {
              overview: 'Learn to read short words like CAT, DOG, SUN, HEN! These 3-letter words have a consonant, vowel, and consonant.',
              keyPoints: ['Read 3-letter CVC words', 'Blend letter sounds together', 'Match words to pictures'],
              quiz: [
                { id: 1, question: 'What word does C-A-T spell?', options: ['Cut', 'Cat', 'Cot', 'Cit'], correct: 1, explanation: 'C + A + T = CAT 🐱 A cat says meow!' },
                { id: 2, question: 'Which picture matches the word "SUN"?', options: ['🌙 Moon', '⭐ Star', '☀️ Sun', '🌧️ Rain'], correct: 2, explanation: 'SUN ☀️ is the big bright light in the sky during daytime!' }
              ]
            }
          },
          {
            id: 'c1en-2-2',
            title: 'My First Sentences! ✍️',
            type: 'exercise',
            duration: '10 min',
            xp: 45,
            content: {
              overview: 'Put words together to make sentences! A sentence starts with a capital letter and ends with a full stop.',
              keyPoints: ['A sentence has a subject and action', 'Start with a capital letter', 'End with a full stop (.)'],
              exercise: {
                title: 'Sentence Builder Game',
                instructions: 'Drag the words into the correct order to make a sentence. Then write it with a capital letter at the start!',
                hints: ['Who is doing the action? That comes first', 'What are they doing? That comes next', 'Remember the full stop at the end!']
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c1-hindi',
    title: 'Class 1 - Hindi',
    description: 'हिंदी सीखो! Varnamala, simple shabda, and vakya through colorful pictures and fun activities.',
    grade: '1-2',
    subject: 'Hindi',
    icon: '🕉️',
    color: 'bg-orange-500',
    totalLessons: 8,
    totalDuration: '4 hours',
    xpReward: 400,
    modules: [
      {
        id: 'c1hi-m1',
        title: 'Varnamala - स्वर और व्यंजन',
        lessons: [
          {
            id: 'c1hi-1-1',
            title: 'स्वर - अ, आ, इ, ई... 🌈',
            type: 'video',
            duration: '10 min',
            xp: 30,
            content: {
              overview: 'हिंदी के 11 स्वर सीखो! Learn the vowels of Hindi with colorful pictures and fun songs that make learning easy.',
              keyPoints: ['11 Hindi vowels (स्वर)', 'Each vowel has its own sound', 'स्वर appear at the start of words'],
              videoTitle: 'Hindi Swar - Animated Song',
              videoDuration: '10:00',
              quiz: [
                { id: 1, question: '"अ" से क्या बनता है? ("A" is for...)', options: ['आम (Mango) 🥭', 'अनार (Pomegranate) 🍎', 'इमली (Tamarind)', 'उल्लू (Owl) 🦉'], correct: 1, explanation: '"अ" से अनार! 🍎 Anaar starts with the vowel "अ". Great!' },
                { id: 2, question: 'Hindi mein kitne swar hote hain? (How many vowels in Hindi?)', options: ['10', '11', '13', '26'], correct: 1, explanation: 'Hindi mein 11 swar hote hain: अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ, अं' }
              ]
            }
          },
          {
            id: 'c1hi-1-2',
            title: 'व्यंजन - क, ख, ग, घ... ✨',
            type: 'exercise',
            duration: '12 min',
            xp: 40,
            content: {
              overview: 'Hindi ke 33 vyanjan (consonants) seekho! Start with the first row: क, ख, ग, घ, ङ with picture clues.',
              keyPoints: ['33 Hindi consonants (व्यंजन)', 'क to ञ - first group', 'Each letter with a picture word'],
              exercise: {
                title: 'Vyanjan Matching Game',
                instructions: 'Match each Hindi letter to its picture! क - कमल (lotus), ख - खरगोश (rabbit), ग - गाय (cow)...',
                hints: ['Say the letter sound out loud', 'The picture word starts with that letter', 'Trace the letter with your finger first']
              }
            }
          }
        ]
      },
      {
        id: 'c1hi-m2',
        title: 'शब्द और वाक्य',
        lessons: [
          {
            id: 'c1hi-2-1',
            title: 'सरल शब्द - दो अक्षर के शब्द 🌸',
            type: 'reading',
            duration: '10 min',
            xp: 40,
            content: {
              overview: 'Seekho simple 2-letter Hindi words like कल, फल, जल, घर! These words use the basic consonant sounds.',
              keyPoints: ['Read 2-letter Hindi words', 'Combine consonant + vowel sounds', 'Match Hindi words to pictures'],
              quiz: [
                { id: 1, question: '"घर" ka matlab kya hai? (What does "घर" mean?)', options: ['Water 💧', 'Home 🏠', 'Fruit 🍎', 'Sun ☀️'], correct: 1, explanation: '"घर" means home or house! We all live in a घर. 🏠' },
                { id: 2, question: '"फल" means...', options: ['Flower 🌸', 'Leaf 🍃', 'Fruit 🍎', 'Tree 🌳'], correct: 2, explanation: '"फल" means fruit! 🍎 Aam, kela, angoor are all फल.' }
              ]
            }
          },
          {
            id: 'c1hi-2-2',
            title: 'छोटे वाक्य बनाओ! 📝',
            type: 'exercise',
            duration: '10 min',
            xp: 45,
            content: {
              overview: 'Words ko jodke sentences banao! Learn simple Hindi sentences like "यह एक बिल्ली है" and "राम खाना खाता है".',
              keyPoints: ['Hindi sentence structure', 'Subject + Object + Verb', 'Simple present tense sentences'],
              exercise: {
                title: 'Vakya Banao Game',
                instructions: 'Drag the Hindi words in the correct order to make a sentence. Use the pictures for clues!',
                hints: ['Hindi mein verb (kriya) last mein aati hai', 'Subject (naam) pehle aata hai', 'Example: राम + खेलता + है = राम खेलता है']
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c2-maths',
    title: 'Class 2 - Mathematics',
    description: 'Level up your maths! Addition & subtraction up to 100, introduction to multiplication, and fun number games.',
    grade: '1-2',
    subject: 'Mathematics',
    icon: '➕',
    color: 'bg-blue-600',
    totalLessons: 9,
    totalDuration: '5 hours',
    xpReward: 500,
    modules: [
      {
        id: 'c2m-m1',
        title: 'Addition & Subtraction to 100',
        lessons: [
          {
            id: 'c2m-1-1',
            title: 'Adding Big Numbers - Tens & Ones! 🎉',
            type: 'video',
            duration: '12 min',
            xp: 45,
            content: {
              overview: 'Learn to add 2-digit numbers by breaking them into tens and ones! See colorful blocks come together as you add.',
              keyPoints: ['Add 2-digit numbers', 'Line up tens and ones columns', 'Carry over when ones exceed 9'],
              videoTitle: 'Big Number Addition Adventure',
              videoDuration: '12:00',
              quiz: [
                { id: 1, question: '24 + 35 = ?', options: ['49', '59', '58', '69'], correct: 1, explanation: 'Ones: 4+5=9. Tens: 2+3=5. So 24+35 = 59! 🎉' },
                { id: 2, question: '47 + 26 = ?', options: ['63', '73', '72', '83'], correct: 1, explanation: 'Ones: 7+6=13, write 3 carry 1. Tens: 4+2+1=7. Answer = 73! 🌟' }
              ]
            }
          },
          {
            id: 'c2m-1-2',
            title: 'Subtraction up to 100 🎯',
            type: 'exercise',
            duration: '12 min',
            xp: 45,
            content: {
              overview: 'Take away tens and ones to find the difference! Use virtual base-10 blocks to see subtraction happen right before your eyes.',
              keyPoints: ['Subtract 2-digit numbers', 'Borrowing from tens place', 'Check subtraction using addition'],
              exercise: {
                title: 'Number Line Subtraction',
                instructions: 'Use the number line to jump backwards! Start at the bigger number and hop back the smaller number. Where do you land?',
                hints: ['Start at the bigger number', 'Jump back (left) by the number you subtract', 'Count your jumps carefully!']
              }
            }
          },
          {
            id: 'c2m-1-3',
            title: 'Adding & Subtracting - Word Problems! 📖',
            type: 'quiz',
            duration: '10 min',
            xp: 50,
            content: {
              overview: 'Solve fun story problems! Mia has 45 stickers and gets 28 more - how many does she have? Use addition and subtraction to find out!',
              keyPoints: ['Read word problems carefully', 'Identify add or subtract', 'Write the number sentence'],
              quiz: [
                { id: 1, question: 'Riya had 63 chocolates 🍫. She gave 28 to friends. How many left?', options: ['35', '45', '91', '25'], correct: 0, explanation: '63 - 28 = 35. Riya has 35 chocolates left! 🍫' },
                { id: 2, question: 'There are 37 red birds 🐦 and 45 blue birds. How many birds in all?', options: ['72', '82', '8', '92'], correct: 1, explanation: '37 + 45 = 82. There are 82 birds altogether! 🐦🐦' }
              ]
            }
          }
        ]
      },
      {
        id: 'c2m-m2',
        title: 'Introduction to Multiplication',
        lessons: [
          {
            id: 'c2m-2-1',
            title: 'Multiplication as Repeated Addition ⭐',
            type: 'video',
            duration: '10 min',
            xp: 50,
            content: {
              overview: '3 groups of 4 apples is the same as 4+4+4=12! Discover how multiplication is just a faster way to add equal groups.',
              keyPoints: ['Multiplication = repeated addition', 'Groups of equal numbers', 'Use × sign'],
              videoTitle: 'Multiplication Magic!',
              videoDuration: '10:00',
              quiz: [
                { id: 1, question: '2 + 2 + 2 = 3 × ?', options: ['2', '3', '6', '4'], correct: 0, explanation: '2+2+2 means 3 groups of 2, which is 3 × 2 = 6! ⭐' },
                { id: 2, question: '4 × 3 = ?', options: ['7', '43', '12', '8'], correct: 2, explanation: '4 × 3 = 4+4+4 = 12. Four groups of three makes twelve! 🌟' }
              ]
            }
          },
          {
            id: 'c2m-2-2',
            title: 'Times Tables 2 & 5 - Let\'s Memorise! 🏆',
            type: 'exercise',
            duration: '12 min',
            xp: 55,
            content: {
              overview: 'Master the 2 times table and 5 times table with songs, skip counting, and fun games! These are the easiest tables to start with.',
              keyPoints: ['2 times table (skip count by 2)', '5 times table (skip count by 5)', 'Use patterns to remember'],
              exercise: {
                title: 'Times Table Trainer',
                instructions: 'Count by 2s: 2, 4, 6, 8, 10... Count by 5s: 5, 10, 15, 20, 25! Fill in the blanks in the multiplication table.',
                hints: ['2 times table: always even numbers', '5 times table: ends in 0 or 5', 'Use your fingers to skip count!']
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c2-english',
    title: 'Class 2 - English',
    description: 'Grow your English skills! Reading comprehension, grammar basics, and writing simple sentences and paragraphs.',
    grade: '1-2',
    subject: 'English',
    icon: '📝',
    color: 'bg-purple-600',
    totalLessons: 8,
    totalDuration: '4 hours',
    xpReward: 450,
    modules: [
      {
        id: 'c2en-m1',
        title: 'Reading Comprehension',
        lessons: [
          {
            id: 'c2en-1-1',
            title: 'The Little Seed - Read & Understand 🌱',
            type: 'reading',
            duration: '12 min',
            xp: 40,
            content: {
              overview: 'Read a short story about a tiny seed that grows into a big tree! Answer questions to show you understood the story.',
              keyPoints: ['Read the full story carefully', 'Answer who, what, where, why questions', 'Find the main idea of a story'],
              quiz: [
                { id: 1, question: 'What do good readers do when they don\'t understand a sentence?', options: ['Skip it', 'Re-read it slowly', 'Stop reading', 'Only look at pictures'], correct: 1, explanation: 'Good readers re-read confusing parts! Reading again often helps you understand. 📖' },
                { id: 2, question: 'The "main idea" of a story is...', options: ['The last sentence', 'What the whole story is about', 'The first word', 'The title only'], correct: 1, explanation: 'The main idea is what the WHOLE story is mostly about. Great thinking! 🌟' }
              ]
            }
          },
          {
            id: 'c2en-1-2',
            title: 'New Words - Building My Vocabulary! 📚',
            type: 'exercise',
            duration: '10 min',
            xp: 35,
            content: {
              overview: 'Learn 20 exciting new words with pictures! The more words you know, the better you can read and write.',
              keyPoints: ['Learn new words with pictures', 'Use context clues to guess meaning', 'Use new words in sentences'],
              exercise: {
                title: 'Word Wall Builder',
                instructions: 'Match each picture to its word. Then use the word in your own sentence. Try to use 5 new words in a short story!',
                hints: ['Look at the picture for clues about the word', 'Try using the word in a sentence you know', 'Practice saying the word out loud']
              }
            }
          }
        ]
      },
      {
        id: 'c2en-m2',
        title: 'Grammar Basics',
        lessons: [
          {
            id: 'c2en-2-1',
            title: 'Nouns & Pronouns - Names & Replacements! 🏷️',
            type: 'video',
            duration: '10 min',
            xp: 45,
            content: {
              overview: 'A noun is a naming word! A pronoun replaces a noun so we don\'t repeat the same word. "Priya ran. She was fast." She replaces Priya!',
              keyPoints: ['Nouns name people, places, and things', 'Pronouns replace nouns', 'Common pronouns: he, she, it, they, we'],
              videoTitle: 'Nouns and Pronouns Explained',
              videoDuration: '10:00',
              quiz: [
                { id: 1, question: 'Replace with pronoun: "The dog barked. ___ was loud."', options: ['He', 'She', 'It', 'They'], correct: 2, explanation: 'We use "It" for animals and things when we don\'t know their gender. The dog barked. It was loud! 🐕' },
                { id: 2, question: 'Which is a NOUN in "The big elephant splashed water"?', options: ['big', 'splashed', 'The', 'elephant'], correct: 3, explanation: 'Elephant 🐘 is a noun - it names an animal! Big is an adjective and splashed is a verb.' }
              ]
            }
          },
          {
            id: 'c2en-2-2',
            title: 'Describing Words - Adjectives! 🌈',
            type: 'exercise',
            duration: '10 min',
            xp: 45,
            content: {
              overview: 'Adjectives make sentences colorful and interesting! Big, small, red, happy, soft - these words describe nouns.',
              keyPoints: ['Adjectives describe nouns', 'Size, color, shape, feeling adjectives', 'Use adjectives to make sentences interesting'],
              exercise: {
                title: 'Adjective Artist',
                instructions: 'Look at each picture. Choose the best adjectives to describe it! Then write a sentence using 2 adjectives.',
                hints: ['Think about color, size, shape, or feeling', 'Adjectives go before the noun usually', 'Example: The BIG RED ball rolled away.']
              }
            }
          }
        ]
      }
    ]
  },
  {
    id: 'c2-science',
    title: 'Class 2 - Science',
    description: 'Explore the natural world! Learn about plants, animals, water, air, and how living things grow and survive.',
    grade: '1-2',
    subject: 'Science',
    icon: '🌱',
    color: 'bg-green-600',
    totalLessons: 8,
    totalDuration: '4 hours',
    xpReward: 450,
    modules: [
      {
        id: 'c2sc-m1',
        title: 'Plants & Animals',
        lessons: [
          {
            id: 'c2sc-1-1',
            title: 'How Plants Grow 🌱➡️🌳',
            type: 'video',
            duration: '10 min',
            xp: 35,
            content: {
              overview: 'Watch a seed sprout and grow into a plant! Learn the parts of a plant and what plants need to stay alive and healthy.',
              keyPoints: ['Parts of a plant: root, stem, leaf, flower, fruit', 'Plants need sunlight, water, and soil', 'Plants make their own food using sunlight'],
              videoTitle: 'A Plant\'s Amazing Life',
              videoDuration: '10:00',
              quiz: [
                { id: 1, question: 'What do plants need to grow? 🌱', options: ['Only water', 'Only sunlight', 'Water, sunlight, and soil', 'Just soil'], correct: 2, explanation: 'Plants need water 💧, sunlight ☀️, and soil 🌍 to grow strong and healthy!' },
                { id: 2, question: 'Which part of the plant drinks water from the soil?', options: ['Leaf', 'Flower', 'Root', 'Stem'], correct: 2, explanation: 'Roots go deep into the soil to drink water and hold the plant in place! 🌱' }
              ]
            }
          },
          {
            id: 'c2sc-1-2',
            title: 'Animals - Where They Live & What They Eat 🐘🐠',
            type: 'lab',
            duration: '12 min',
            xp: 45,
            content: {
              overview: 'Animals live in different habitats - forests, oceans, deserts, farms! Each animal eats food that matches where it lives.',
              keyPoints: ['Animal habitats: forest, water, farm, desert', 'What different animals eat', 'How animals protect themselves'],
              quiz: [
                { id: 1, question: 'A fish lives in...', options: ['Forest 🌳', 'Desert 🏜️', 'Water 🌊', 'Sky ☁️'], correct: 2, explanation: 'Fish live in water! 🐠 They breathe through gills and swim using fins.' },
                { id: 2, question: 'Which animal eats grass? 🌿', options: ['Tiger 🐯', 'Cow 🐄', 'Eagle 🦅', 'Shark 🦈'], correct: 1, explanation: 'Cows 🐄 eat grass! Animals that eat only plants are called herbivores.' }
              ]
            }
          }
        ]
      },
      {
        id: 'c2sc-m2',
        title: 'Water & Air Around Us',
        lessons: [
          {
            id: 'c2sc-2-1',
            title: 'Water - Where It Comes From 💧',
            type: 'video',
            duration: '10 min',
            xp: 40,
            content: {
              overview: 'Water falls as rain, flows in rivers, and sits in lakes and oceans! Learn the water cycle and why saving water is so important.',
              keyPoints: ['Sources of water: rain, rivers, lakes, wells', 'Uses of water for living things', 'Save water - it is precious!'],
              videoTitle: 'The Amazing Water Cycle',
              videoDuration: '10:00',
              quiz: [
                { id: 1, question: 'Which of these is a source of water? 💧', options: ['Rock', 'River', 'Sand', 'Wind'], correct: 1, explanation: 'Rivers are a great source of freshwater! 🌊 Fish live there and we use river water for drinking and farming.' },
                { id: 2, question: 'Why should we save water? 💧', options: ['Water is heavy', 'Water is limited and precious', 'Water is cold', 'Water is wet'], correct: 1, explanation: 'Freshwater is limited! 💧 We must save water so there is enough for everyone and all living things.' }
              ]
            }
          },
          {
            id: 'c2sc-2-2',
            title: 'Air is Everywhere! 🌬️',
            type: 'exercise',
            duration: '10 min',
            xp: 40,
            content: {
              overview: 'We can\'t see air but it is all around us! Air helps us breathe, makes wind, and keeps balloons and tyres inflated.',
              keyPoints: ['Air is all around us even if we cannot see it', 'We breathe air (oxygen) to live', 'Moving air is called wind'],
              exercise: {
                title: 'Air Explorer Activity',
                instructions: 'Try these activities to prove air exists: Blow into a bag and seal it. Fan yourself with paper. Watch leaves move in the wind. Draw what you observe!',
                hints: ['Can you feel the air when you fan yourself?', 'What makes the balloon stay big?', 'What makes the leaves on trees move?']
              }
            }
          }
        ]
      }
    ]
  }
]

export function getAllCourses(): Course[] {
  return courses
}

export function getCourse(id: string): Course | undefined {
  return courses.find(c => c.id === id)
}

export function getCoursesByGrade(grade: string): Course[] {
  return courses.filter(c => c.grade === grade)
}

export function getAllGrades(): string[] {
  return ['1-2', '3-5', '6-8', '9-10']
}

export function getGradeLabel(grade: string): string {
  const labels: Record<string, string> = {
    '1-2': 'Classes 1-2',
    '3-5': 'Classes 3-5',
    '6-8': 'Classes 6-8',
    '9-10': 'Classes 9-10'
  }
  return labels[grade] || grade
}
