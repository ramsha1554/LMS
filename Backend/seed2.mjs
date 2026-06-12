import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import bcrypt from "bcryptjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

const MONGO_URI = process.env.MONGO_URI;

const userSchema = new mongoose.Schema({ name: String, email: String, password: String, role: String, enrolledCourses: Array, photo: String }, { strict: false });
const User = mongoose.model("User", userSchema);

const lectureSchema = new mongoose.Schema({ lectureTitle: String, videoUrl: String, isPreviewFree: { type: Boolean, default: false } }, { timestamps: true });
const Lecture = mongoose.model("Lecture", lectureSchema);

const courseSchema = new mongoose.Schema({ title: String, subTitle: String, description: String, category: String, level: String, price: Number, thumbnail: String, enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }], creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, isPublished: Boolean, reviews: Array }, { timestamps: true });
const Course = mongoose.model("Course", courseSchema);

const sampleVideos = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://res.cloudinary.com/demo/video/upload/cld-sample-video.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
];

const getVideo = (i) => sampleVideos[i % sampleVideos.length];

const educators = [
  { name: "Priya Sharma", email: "priya.sharma@gmail.com" },
  { name: "Rahul Verma", email: "rahul.verma@gmail.com" },
  { name: "Sneha Patel", email: "sneha.patel@gmail.com" },
  { name: "Amit Khanna", email: "amit.khanna@gmail.com" },
  { name: "Neha Joshi", email: "neha.joshi@gmail.com" },
];

const courses = [
  { title: "Deep Learning with TensorFlow", subTitle: "Build neural networks from scratch", description: "Master deep learning concepts including CNNs, RNNs, LSTMs, and transformers using TensorFlow and Keras.", category: "AI/ML", level: "Advanced", price: 3499, thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop", lectures: [{ title: "Intro to Deep Learning", free: true, vi: 0 }, { title: "Building CNNs", free: false, vi: 1 }, { title: "Transfer Learning", free: false, vi: 2 }], educator: 0 },
  { title: "Natural Language Processing with Python", subTitle: "Text classification and sentiment analysis", description: "Learn NLP from basics to advanced — tokenization, embeddings, BERT, and building chatbots.", category: "AI/ML", level: "Intermediate", price: 2799, thumbnail: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&auto=format&fit=crop", lectures: [{ title: "NLP Fundamentals", free: true, vi: 3 }, { title: "Word Embeddings", free: false, vi: 4 }, { title: "BERT Fine-tuning", free: false, vi: 5 }], educator: 0 },
  { title: "Generative AI & Prompt Engineering", subTitle: "Master ChatGPT, DALL-E and LLM APIs", description: "Learn how to build AI-powered apps using OpenAI APIs, LangChain, and vector databases.", category: "AI/ML", level: "Beginner", price: 1999, thumbnail: "https://images.unsplash.com/photo-1684391784001-dc4f4e2fd835?w=800&auto=format&fit=crop", lectures: [{ title: "What is Generative AI?", free: true, vi: 6 }, { title: "Prompt Engineering", free: false, vi: 7 }, { title: "LangChain Basics", free: false, vi: 8 }], educator: 1 },
  { title: "Django REST Framework Masterclass", subTitle: "Build powerful APIs with Python and Django", description: "Learn to build production-ready REST APIs using Django, DRF, PostgreSQL, and JWT authentication.", category: "Backend Development", level: "Intermediate", price: 2299, thumbnail: "https://images.unsplash.com/photo-1569748130764-3fed0c102c59?w=800&auto=format&fit=crop", lectures: [{ title: "Django Setup", free: true, vi: 9 }, { title: "DRF Serializers", free: false, vi: 0 }, { title: "JWT Auth", free: false, vi: 1 }], educator: 1 },
  { title: "Microservices with Docker & Kubernetes", subTitle: "Build and deploy scalable microservices", description: "Design, build, and deploy microservices using Docker, Kubernetes, API Gateway, and RabbitMQ.", category: "Backend Development", level: "Advanced", price: 3299, thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&auto=format&fit=crop", lectures: [{ title: "Microservices Overview", free: true, vi: 2 }, { title: "Docker Containers", free: false, vi: 3 }, { title: "Kubernetes Pods", free: false, vi: 4 }], educator: 2 },
  { title: "Google Cloud Platform Essentials", subTitle: "Master GCP services and certification prep", description: "Comprehensive GCP course covering Compute Engine, Cloud Storage, BigQuery, and Cloud Run.", category: "Cloud Computing", level: "Intermediate", price: 2599, thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop", lectures: [{ title: "GCP Overview", free: true, vi: 5 }, { title: "Compute Engine", free: false, vi: 6 }, { title: "BigQuery Basics", free: false, vi: 7 }], educator: 2 },
  { title: "DevOps with CI/CD Pipelines", subTitle: "Automate deployments with GitHub Actions", description: "Learn DevOps practices — CI/CD pipelines, Terraform, monitoring with Grafana, and GitOps.", category: "Cloud Computing", level: "Intermediate", price: 2899, thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop", lectures: [{ title: "DevOps Introduction", free: true, vi: 8 }, { title: "GitHub Actions", free: false, vi: 9 }, { title: "Terraform Basics", free: false, vi: 0 }], educator: 3 },
  { title: "CompTIA Security+ Exam Prep", subTitle: "Pass the Security+ certification", description: "Full preparation for CompTIA Security+ covering threats, cryptography, network security, and risk assessment.", category: "Cybersecurity", level: "Beginner", price: 2499, thumbnail: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop", lectures: [{ title: "Security Fundamentals", free: true, vi: 1 }, { title: "Cryptography", free: false, vi: 2 }, { title: "Network Security", free: false, vi: 3 }], educator: 3 },
  { title: "Web Application Penetration Testing", subTitle: "Find and fix vulnerabilities in web apps", description: "Learn OWASP Top 10, SQL injection, XSS, CSRF, and tools like Burp Suite and Metasploit.", category: "Cybersecurity", level: "Advanced", price: 3199, thumbnail: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&auto=format&fit=crop", lectures: [{ title: "OWASP Top 10", free: true, vi: 4 }, { title: "SQL Injection", free: false, vi: 5 }, { title: "Burp Suite", free: false, vi: 6 }], educator: 4 },
  { title: "SQL for Data Analysis", subTitle: "Master SQL from basics to advanced queries", description: "Learn SQL for data analysis — joins, subqueries, window functions, CTEs, PostgreSQL and MySQL.", category: "Data Science", level: "Beginner", price: 1499, thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop", lectures: [{ title: "SQL Basics", free: true, vi: 7 }, { title: "Joins and Subqueries", free: false, vi: 8 }, { title: "Window Functions", free: false, vi: 9 }], educator: 0 },
  { title: "Data Visualization with Power BI", subTitle: "Build interactive dashboards and reports", description: "Master Power BI — data modeling, DAX formulas, interactive dashboards, and Power BI Service.", category: "Data Science", level: "Intermediate", price: 1999, thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop", lectures: [{ title: "Power BI Interface", free: true, vi: 0 }, { title: "DAX Formulas", free: false, vi: 1 }, { title: "Dashboard Design", free: false, vi: 2 }], educator: 1 },
  { title: "Adobe Photoshop for Beginners", subTitle: "Master photo editing and graphic design", description: "Learn Photoshop from scratch — layers, masks, retouching, compositing, and social media graphics.", category: "Design", level: "Beginner", price: 1299, thumbnail: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&auto=format&fit=crop", lectures: [{ title: "Photoshop Interface", free: true, vi: 3 }, { title: "Layers and Masks", free: false, vi: 4 }, { title: "Photo Retouching", free: false, vi: 5 }], educator: 2 },
  { title: "Motion Graphics with After Effects", subTitle: "Create stunning animations and visual effects", description: "Learn After Effects for motion graphics, animations, visual effects, and video editing.", category: "Design", level: "Intermediate", price: 2199, thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop", lectures: [{ title: "After Effects Basics", free: true, vi: 6 }, { title: "Keyframe Animation", free: false, vi: 7 }, { title: "Motion Typography", free: false, vi: 8 }], educator: 3 },
  { title: "Kali Linux for Ethical Hackers", subTitle: "Master the hacker OS from scratch", description: "Complete guide to Kali Linux — tools, network analysis, password cracking, and wireless attacks.", category: "Ethical Hacking", level: "Intermediate", price: 2799, thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop", lectures: [{ title: "Kali Linux Setup", free: true, vi: 9 }, { title: "Network Analysis Tools", free: false, vi: 0 }, { title: "Password Cracking", free: false, vi: 1 }], educator: 4 },
  { title: "Bug Bounty Hunting", subTitle: "Find vulnerabilities and earn rewards", description: "Learn bug bounty hunting — recon, finding vulnerabilities, writing reports, HackerOne and Bugcrowd.", category: "Ethical Hacking", level: "Advanced", price: 3499, thumbnail: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop", lectures: [{ title: "Bug Bounty Overview", free: true, vi: 2 }, { title: "Recon Techniques", free: false, vi: 3 }, { title: "Writing Reports", free: false, vi: 4 }], educator: 0 },
  { title: "Content Marketing Strategy", subTitle: "Build a content engine that drives traffic", description: "Learn content strategy, editorial calendars, SEO-optimized content, and distribution channels.", category: "Marketing", level: "Beginner", price: 1199, thumbnail: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&auto=format&fit=crop", lectures: [{ title: "Content Strategy Basics", free: true, vi: 5 }, { title: "SEO Writing", free: false, vi: 6 }, { title: "Content Distribution", free: false, vi: 7 }], educator: 1 },
  { title: "Social Media Marketing Mastery", subTitle: "Grow your brand on Instagram and LinkedIn", description: "Complete social media course — Instagram growth, LinkedIn B2B, TikTok strategy, paid ads, analytics.", category: "Marketing", level: "Beginner", price: 1399, thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop", lectures: [{ title: "Social Media Overview", free: true, vi: 8 }, { title: "Instagram Growth", free: false, vi: 9 }, { title: "Paid Ads Setup", free: false, vi: 0 }], educator: 2 },
  { title: "React Native for Beginners", subTitle: "Build cross-platform apps with JavaScript", description: "Learn React Native — components, navigation, state management, REST APIs, App Store deployment.", category: "Mobile Development", level: "Beginner", price: 1999, thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop", lectures: [{ title: "React Native Setup", free: true, vi: 1 }, { title: "Core Components", free: false, vi: 2 }, { title: "Navigation", free: false, vi: 3 }], educator: 3 },
  { title: "iOS Development with Swift", subTitle: "Build native iPhone apps from scratch", description: "Learn Swift and iOS — UIKit, SwiftUI, Core Data, networking, and publishing to the App Store.", category: "Mobile Development", level: "Intermediate", price: 2699, thumbnail: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?w=800&auto=format&fit=crop", lectures: [{ title: "Swift Basics", free: true, vi: 4 }, { title: "SwiftUI Components", free: false, vi: 5 }, { title: "Core Data", free: false, vi: 6 }], educator: 4 },
  { title: "TypeScript for JavaScript Developers", subTitle: "Add types to your JavaScript projects", description: "Learn TypeScript — types, interfaces, generics, decorators, and integrating with React and Node.js.", category: "Web Development", level: "Intermediate", price: 1799, thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop", lectures: [{ title: "TypeScript Basics", free: true, vi: 7 }, { title: "Interfaces and Types", free: false, vi: 8 }, { title: "Generics", free: false, vi: 9 }], educator: 0 },
  { title: "Next.js Full Stack Development", subTitle: "Build SEO-friendly full stack apps", description: "Master Next.js 14 — app router, server components, server actions, API routes, and Vercel deployment.", category: "Web Development", level: "Advanced", price: 2999, thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&auto=format&fit=crop", lectures: [{ title: "Next.js Overview", free: true, vi: 0 }, { title: "App Router", free: false, vi: 1 }, { title: "Server Components", free: false, vi: 2 }], educator: 1 },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const hashedPassword = await bcrypt.hash("Educator@123", 10);

  const createdEducators = [];
  for (const e of educators) {
    const existing = await User.findOne({ email: e.email });
    if (existing) {
      console.log(`Already exists: ${e.email}`);
      createdEducators.push(existing);
    } else {
      const user = await User.create({ name: e.name, email: e.email, password: hashedPassword, role: "educator", enrolledCourses: [], photo: "" });
      console.log(`Created educator: ${e.name}`);
      createdEducators.push(user);
    }
  }

  let created = 0;
  for (const c of courses) {
    const educator = createdEducators[c.educator];
    const lectureIds = [];
    for (const l of c.lectures) {
      const lec = await Lecture.create({ lectureTitle: l.title, isPreviewFree: l.free, videoUrl: getVideo(l.vi) });
      lectureIds.push(lec._id);
    }
    await Course.create({
      title: c.title, subTitle: c.subTitle, description: c.description, category: c.category,
      level: c.level, price: c.price, thumbnail: c.thumbnail,
      lectures: lectureIds, creator: educator._id, isPublished: true,
    });
    console.log(`✓ ${c.title} — by ${educator.name}`);
    created++;
  }

  console.log(`\nDone! ${created} courses seeded across 5 educators.`);
  console.log(`All educator passwords: Educator@123`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
