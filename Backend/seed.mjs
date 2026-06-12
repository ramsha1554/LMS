import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

const MONGO_URI = process.env.MONGO_URI;

const lectureSchema = new mongoose.Schema({ lectureTitle: String, videoUrl: String, isPreviewFree: { type: Boolean, default: false } }, { timestamps: true });
const Lecture = mongoose.model("Lecture", lectureSchema);

const courseSchema = new mongoose.Schema({ title: String, subTitle: String, description: String, category: String, level: String, price: Number, thumbnail: String, enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }], creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, isPublished: { type: Boolean, default: false }, reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }] }, { timestamps: true });
const Course = mongoose.model("Course", courseSchema);

const courses = [
  {
    title: "Complete Web Development Bootcamp",
    subTitle: "From zero to full-stack developer",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB in this comprehensive bootcamp. Build real-world projects and land your first dev job.",
    category: "Web Development",
    level: "Beginner",
    price: 1999,
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop",
    lectures: [
      { title: "Introduction to HTML", free: true },
      { title: "CSS Fundamentals", free: false },
      { title: "JavaScript Basics", free: false },
    ],
  },
  {
    title: "React & Redux Masterclass",
    subTitle: "Build production-grade React applications",
    description: "Deep dive into React 19, hooks, Redux Toolkit, React Router, and advanced patterns. Build scalable frontend applications used by millions.",
    category: "Web Development",
    level: "Intermediate",
    price: 2499,
    thumbnail: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800&auto=format&fit=crop",
    lectures: [
      { title: "React Fundamentals", free: true },
      { title: "useState and useEffect", free: false },
      { title: "Redux Toolkit Setup", free: false },
    ],
  },
  {
    title: "Python for Data Science",
    subTitle: "Master Python, Pandas, NumPy and Matplotlib",
    description: "Comprehensive Python course covering data manipulation, visualization, and analysis. Perfect for aspiring data scientists and analysts.",
    category: "Data Science",
    level: "Beginner",
    price: 1799,
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop",
    lectures: [
      { title: "Python Basics", free: true },
      { title: "Pandas DataFrames", free: false },
      { title: "Data Visualization", free: false },
    ],
  },
  {
    title: "Machine Learning A-Z",
    subTitle: "Hands-on machine learning with Python and scikit-learn",
    description: "Learn supervised and unsupervised learning, neural networks, and model evaluation. Work on real datasets and Kaggle-style projects.",
    category: "Data Science",
    level: "Advanced",
    price: 2999,
    thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop",
    lectures: [
      { title: "What is Machine Learning?", free: true },
      { title: "Linear Regression", free: false },
      { title: "Decision Trees", free: false },
    ],
  },
  {
    title: "UI/UX Design Fundamentals",
    subTitle: "Design beautiful interfaces users love",
    description: "Learn design thinking, wireframing, prototyping in Figma, and user research. Build a professional design portfolio from scratch.",
    category: "Design",
    level: "Beginner",
    price: 1499,
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop",
    lectures: [
      { title: "Design Thinking", free: true },
      { title: "Figma Basics", free: false },
      { title: "Prototyping", free: false },
    ],
  },
  {
    title: "Node.js & Express Backend Development",
    subTitle: "Build REST APIs and backend systems",
    description: "Master Node.js, Express, MongoDB, authentication, file uploads, and deployment. Build production-ready backend systems from scratch.",
    category: "Backend Development",
    level: "Intermediate",
    price: 2199,
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    lectures: [
      { title: "Node.js Introduction", free: true },
      { title: "Express Routing", free: false },
      { title: "MongoDB Integration", free: false },
    ],
  },
  {
    title: "AWS Cloud Practitioner",
    subTitle: "Pass the AWS certification exam",
    description: "Complete preparation for the AWS Cloud Practitioner exam. Covers EC2, S3, Lambda, RDS, IAM, and core cloud concepts with practice tests.",
    category: "Cloud Computing",
    level: "Beginner",
    price: 2799,
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop",
    lectures: [
      { title: "What is Cloud Computing?", free: true },
      { title: "AWS EC2 Basics", free: false },
      { title: "S3 Storage", free: false },
    ],
  },
  {
    title: "Ethical Hacking & Cybersecurity",
    subTitle: "Learn penetration testing and network security",
    description: "Understand how hackers think and how to defend against attacks. Covers network scanning, exploitation, web app security, and CTF challenges.",
    category: "Cybersecurity",
    level: "Intermediate",
    price: 2599,
    thumbnail: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop",
    lectures: [
      { title: "Introduction to Cybersecurity", free: true },
      { title: "Network Scanning", free: false },
      { title: "Web App Vulnerabilities", free: false },
    ],
  },
  {
    title: "Flutter Mobile App Development",
    subTitle: "Build iOS and Android apps with Flutter",
    description: "Learn Dart and Flutter to build beautiful cross-platform mobile apps. Covers state management, Firebase integration, and app store deployment.",
    category: "Mobile Development",
    level: "Intermediate",
    price: 2299,
    thumbnail: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&auto=format&fit=crop",
    lectures: [
      { title: "Dart Fundamentals", free: true },
      { title: "Flutter Widgets", free: false },
      { title: "State Management", free: false },
    ],
  },
  {
    title: "Digital Marketing Masterclass",
    subTitle: "SEO, Social Media, Google Ads and more",
    description: "Complete digital marketing course covering SEO, content marketing, social media strategy, Google Ads, email marketing, and analytics.",
    category: "Marketing",
    level: "Beginner",
    price: 1299,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    lectures: [
      { title: "Digital Marketing Overview", free: true },
      { title: "SEO Fundamentals", free: false },
      { title: "Google Ads Setup", free: false },
    ],
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const User = mongoose.model("User", new mongoose.Schema({ name: String, email: String, role: String, enrolledCourses: Array, photo: String }, { strict: false }));
  const educator = await User.findOne({ role: "educator" });
  if (!educator) {
    console.error("No educator found. Please create an educator account first.");
    process.exit(1);
  }
  console.log(`Using educator: ${educator.name} (${educator.email})`);

  let created = 0;
  for (const c of courses) {
    const lectureIds = [];
    for (const l of c.lectures) {
      const lec = await Lecture.create({ lectureTitle: l.title, isPreviewFree: l.free, videoUrl: "" });
      lectureIds.push(lec._id);
    }
    await Course.create({
      title: c.title,
      subTitle: c.subTitle,
      description: c.description,
      category: c.category,
      level: c.level,
      price: c.price,
      thumbnail: c.thumbnail,
      lectures: lectureIds,
      creator: educator._id,
      isPublished: true,
    });
    console.log(`✓ Created: ${c.title}`);
    created++;
  }

  console.log(`\nDone! ${created} courses seeded.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
