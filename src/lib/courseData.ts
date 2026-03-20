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
]

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
