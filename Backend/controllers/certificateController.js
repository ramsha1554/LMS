import PDFDocument from "pdfkit";
import CourseProgress from "../models/courseProgressModel.js";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

export const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress?.isCompleted) {
      return res.status(403).json({ success: false, message: "Course not completed yet" });
    }

    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({ success: false, message: "Course or user not found" });
    }

    const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 0 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="certificate-${course.title.replace(/\s+/g, "-")}.pdf"`
    );

    doc.pipe(res);

    const W = 841.89;
    const H = 595.28;

    // Background
    doc.rect(0, 0, W, H).fill("#ffffff");

    // Border
    doc.rect(24, 24, W - 48, H - 48)
      .lineWidth(2)
      .stroke("#1a1a1a");
    doc.rect(30, 30, W - 60, H - 60)
      .lineWidth(0.5)
      .stroke("#888888");

    // Header bar
    doc.rect(0, 0, W, 80).fill("#1a1a1a");

    // App name
    doc.fontSize(22).fillColor("#ffffff").font("Helvetica-Bold")
      .text("SkillSync", 0, 26, { align: "center" });

    // Title
    doc.fontSize(36).fillColor("#1a1a1a").font("Helvetica-Bold")
      .text("Certificate of Completion", 0, 110, { align: "center" });

    // Divider
    doc.moveTo(200, 165).lineTo(W - 200, 165).lineWidth(1).stroke("#cccccc");

    // Body text
    doc.fontSize(14).fillColor("#555555").font("Helvetica")
      .text("This is to certify that", 0, 185, { align: "center" });

    // Student name
    doc.fontSize(32).fillColor("#1a1a1a").font("Helvetica-Bold")
      .text(user.name || "Student", 0, 215, { align: "center" });

    // Underline name
    const nameWidth = doc.widthOfString(user.name || "Student");
    const nameX = (W - nameWidth) / 2;
    doc.moveTo(nameX, 255).lineTo(nameX + nameWidth, 255).lineWidth(1).stroke("#1a1a1a");

    doc.fontSize(14).fillColor("#555555").font("Helvetica")
      .text("has successfully completed the course", 0, 268, { align: "center" });

    // Course title
    doc.fontSize(22).fillColor("#1a1a1a").font("Helvetica-Bold")
      .text(course.title, 60, 298, { align: "center", width: W - 120 });

    // Date
    const date = new Date().toLocaleDateString("en-IN", {
      year: "numeric", month: "long", day: "numeric",
    });

    doc.fontSize(11).fillColor("#888888").font("Helvetica")
      .text(`Issued on ${date}`, 0, 390, { align: "center" });

    // Footer
    doc.rect(0, H - 60, W, 60).fill("#1a1a1a");
    doc.fontSize(10).fillColor("#aaaaaa").font("Helvetica")
      .text("SkillSync Learning Platform  •  Empowering learners worldwide", 0, H - 38, { align: "center" });

    doc.end();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
