"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";

/**
 * AFFAN PORTFOLIO — Single-file React site (Tailwind + Framer Motion)
 * ------------------------------------------------------------------
 * ✅ How to edit:
 *  - Change the DATA object below — that's your content.
 *  - Replace resumeUrl with a public link to your PDF.
 *  - Add project links for demo/code when ready.
 * ✅ How to export:
 *  - Copy this file into any React (or Next.js) app as a page/component.
 *  - Tailwind is assumed to be available here; for Next.js, run the Tailwind setup.
 *  - Deploy with Vercel/Netlify/GitHub Pages.
 */

// ---------------------------
// 1) EDIT YOUR DETAILS HERE
// ---------------------------

// ---------------------------
// Animation helpers
// ---------------------------
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

// Direction-aware animation
const item = (dir = "up") => {
  const base = { opacity: 0, x: 0, y: 0 };

  if (dir === "left") base.x = -24;
  if (dir === "right") base.x = 24;
  if (dir === "up") base.y = 24;

  return {
    hidden: base,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
};

// Updated Reveal component
const Reveal = ({ children, i = 0, dir = "up" }) => (
  <motion.div
    variants={item(dir)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    custom={i}
  >
    {children}
  </motion.div>
);


const DATA = {
  name: "Affan Bhatti",
  role: "Software Developer @ University of Toronto",
  tagline: "Honours BSc — Computer Science & Economics (UofT) · Research in Astronomy",
  location: "Mississauga, ON",
  email: "affanbhattizemail@gmail.com",
  phone: "(289) 946-2211",
  resumeUrl: "/Affan_Bhatti_Resume.pdf", // ← Replace with your hosted resume link
  socials: [
    // Add your real links when ready
    { name: "LinkedIn", url: "www.linkedin.com/in/affan-bhatti-561206311"},
  ],
  education: [
    {
      school: "University of Toronto",
      degree:
        "Honours Bachelor of Science — Computer Science & Economics; Research in Astronomy",
      period: "Sept 2024 – Apr 2028",
      logo: "/uoft.jpg",
      details: [
        "Courses: Computer Science/Programming, Diffrential & Integral Calculus, Discrete Math, Princples of Physics, Astronomy, University level Writing, Linear Algebra, Economics"
      ],
    },
    {
      school: "Stephen Lewis Secondary School",
      degree: "Ontario Secondary School Diploma (Honour Roll, Ontario Scholar)",
      period: "Sept 2020 – Jun 2024",
      logo: "/slss.jpg",
      details: [
        "General Executive of Grad Council; Athletic Committee member; Senior Male Athlete of the Year (Grade 11).",
      ],
    },
  ],
  experience: [

    {
      company: "Freelance",
      title: "Software Developer",
      location: "Toronto, ON",
      period: "Apr 2025 - Present",
      bullets: [
   "Build custom websites and software solutions that align with each client’s goals and technical requirements.",
   "Enhance existing websites and applications by adding new features, improving performance, and resolving issues.",
   "Work closely with clients throughout the entire project lifecycle, gathering requirements, translating ideas into technical plans, and providing ongoing guidance and support.",
   "Manage multiple client projects simultaneously, overseeing development, testing, deployment, and post‑launch improvements to ensure high‑quality, reliable results."
],
    },
    {
      company: "Kustomade Renovations",
      title: "Social Media Content Manager",
      location: "Toronto, ON",
      period: "Jul 2024 – May 2025",
      bullets: [
  "Develop and maintain content calendars to showcase renovation projects and services across multiple platforms.",
  "Create engaging posts and stories that highlight before-and-after transformations, boosting brand visibility.",
  "Respond to client inquiries promptly, provide preliminary estimates, and schedule consultations to support the sales pipeline.",
  "Collaborate with the owner to align online marketing with business goals and generate qualified leads."
],
    },
    {
      company: "IAAA Construction",
      title: "Designing Assistant & Assistant Project Manager",
      location: "Toronto, ON",
      period: "Mar 2022 – Apr 2024",
      bullets: [
  "Assisted with CAD drawings and design revisions to support architects and engineers on residential and commercial projects.",
  "Helped prepare schedules, budgets, and material lists under the guidance of senior project managers.",
  "Coordinated with subcontractors and suppliers to confirm timelines, orders, and site requirements.",
  "Supported site visits and progress checks to ensure project milestones and quality standards were met."
],
    },
    {
      company: "Trillium Health Partners",
      title: "Information Desk & Wayfinding · MyChart Survey · Gift Shop (Volunteer)",
      location: "Mississauga, ON",
      period: "Nov 2023 – Jun 2024",
      bullets: [
  "Assisted patients, families, and visitors with wayfinding and hospital information, ensuring a welcoming experience.",
  "Promoted and explained the MyChart patient portal to encourage digital health engagement.",
  "Provided friendly customer service in the hospital gift shop, including sales transactions, restocking, and organizing displays.",
  "Supported hospital staff by addressing inquiries and helping maintain smooth visitor flow during busy hours."
],
    },
  ],
  projects: [
    {
      title: "Nyvo: AI Enhanced Messaging App",
        description: 'Designed and prototyped a next-generation messaging app focused on seamless, people-oriented communication. Integrated AI features for smart message suggestions, personalization, and real-time assistance. Built with a scalable architecture to support group chats, media sharing, and cross-platform use. Developed a modern UI with customizable themes and intuitive navigation to ensure user-friendly interactions. Collaborated on branding and visual identity to align the product design with user-centric goals.',
        tags: ["React Native", "TypeScript", "Node.js", "AI Integration", "Natural Language Processing (NLP)", "UX/UI Design", "Entrepreneurship"],
        links: {},
        image: "/Nyvo_Logo.png",
      },
    {
      title: "Custom Learning Management System (LMS)",
        description: `Designed and built a tailored LMS based on client requirements, ensuring intuitive navigation and user-friendly workflows.

Integrated AI-powered assistance to provide real-time support and streamline learning interactions.

Implemented course management tools for enrollment, content delivery, and progress tracking, improving administrative efficiency.

Delivered a scalable and customizable platform that aligned with the client’s educational objectives.`,
      tags: ["Next.js", "TypeScript", "AI", "Education", "React", "UX/UI Design", "Scalability"],
      links: {},
    },
    {
      title: "Personalized Portfolio Website",
        description: "Designed and developed a responsive personal website to showcase projects, skills, and professional experience. Implemented a clean UI/UX with smooth navigation and modern animations for an engaging user experience. Integrated a downloadable résumé, project demos, and a contact form to support networking and job applications. Deployed and optimized the site for performance, accessibility, and cross-device compatibility.",
        tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "UX/UI Design", "Web Development", "Personal Branding"],
        links: {},
    }
  ],
  skills: {
    programming: ["Python", "Java", "Javascript", "TypeScript", "CSS", "HTML", "SQL"],
    tools: ["AutoCAD", "Google Workspace", "Microsoft Office", "Salesforce", "React", "Next.js", "TailwindCSS", "Framer Motion"],
    domains: ["Software Engineering/Developing", "Artificial Intelligence", "Cybersecurity", "Data Science", "Machine Learning", "Mobile App Development", "Web Development", "UI/UX Design", "Cloud Computing", "Entrepreneurship"],
  },
  certifications: [
    { name: "Salesforce Trailhead — Admin Beginner Badge", 
      logo: "/salesforce.png",
    },
    { name: "Cisco Networking Academy — Intro to Data Science",
      logo: "/cisco.jpg",
    },
    { name: "CERN–Solvay Education Programme",
      logo: "/cern.png",

     },
    { name: "Cisco Networking Academy — Introduction to Internet of Things", 
      logo: "/cisco.jpg",
    },
    { name: "Cisco Networking Academy — Introduction to Cybersecurity", 
      logo: "/cisco.jpg",
    },
  ],
  languages: ["English", "Urdu"],
};

// ---------------------------
// 2) SMALL UTILS
// ---------------------------
const sectionIds = [
  "home",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "certifications",
  "contact",
];

const useActiveSection = () => {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.01 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
};

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide backdrop-blur-sm border-zinc-300/50 bg-white/50 dark:border-zinc-700/60 dark:bg-zinc-900/40">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ y: -20, rotateX: 3, rotateY: -3 }}
    transition={{ type: "spring", stiffness: 250, damping: 18 }}
    className={
      "rounded-3xl border bg-card text-white p-6 shadow-md transition will-change-transform hover:shadow-xl " +
      className
    }
  >
    {children}
  </motion.div>
);



const Section = ({ id, title, subtitle, children }) => (
  <motion.section
    id={id}
    className="scroll-mt-24 py-20 sm:py-28"
    variants={container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="mx-auto max-w-6xl px-4">
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle && (
          <p className="mt-2">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  </motion.section>
);


const Divider = () => (
  <div className="mx-auto my-10 h-px max-w-6xl bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />
);

// ---------------------------
// 3) NAV + THEME TOGGLE
// ---------------------------
const ThemeToggle = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="rounded-full border px-3 py-1 text-sm shadow-sm transition hover:shadow dark:border-zinc-700"
      aria-label="Toggle theme"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
};

const Navbar = ({ active }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-zinc-950/50 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#home" className="font-semibold tracking-tight">
          {DATA.name}
        </a>
        <div className="hidden items-center gap-2 sm:flex">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`rounded-full px-3 py-1 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                active === id
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : ""
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <ThemeToggle />
        </div>
        <button
          className="sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="border-t bg-white/90 px-4 py-3 backdrop-blur dark:bg-zinc-950/70 sm:hidden">
          <div className="flex flex-wrap items-center gap-2">
            {sectionIds.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={`rounded-full px-3 py-1 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  active === id
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : ""
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

// ---------------------------
// 4) MAIN APP
// ---------------------------
export default function Portfolio() {
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard: " + text);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-sand text-zinc-900 antialiased">
      {/* Scroll progress */}
      <motion.div
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-zinc-900 dark:bg-white"
        style={{ scaleX }}
      />

      <Navbar active={active} />

      {/* HERO */}
      <section id="home" className="relative scroll-mt-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-20 sm:grid-cols-2 sm:pb-24 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge>{DATA.location}</Badge>
              <Badge>Open to opportunities</Badge>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              {DATA.name}
            </h1>
            <p className="mt-3 text-lg text-zinc-700 dark:text-zinc-300">
              {DATA.role}
            </p>
            <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
              {DATA.tagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={DATA.resumeUrl}
                className="rounded-xl bg-card text-white px-5 py-3 text-sm font-medium shadow-md transition hover:bg-brand"
              >
                Résumé
              </a>
              <a
                href="#projects"
                className="rounded-xl bg-card text-white px-5 py-3 text-sm font-medium shadow-md transition hover:bg-brand"
              >
                View Projects
              </a>
              <button
                onClick={() => copy(DATA.email)}
                className="rounded-xl bg-card text-white px-5 py-3 text-sm font-medium shadow-md transition hover:bg-brand"
              >
                Copy Email
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >

            <Card className="p-0 bg-black text-white border-black shadow-lg">
              {/* Photo — full color, not dimmed */}
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="/Affan_Snapshot.jpeg"           // <-- your photo in /public
                  alt="Affan Bhatti"
                  width={1600}
                  height={900}
                  priority
                  className="w-full h-72 sm:h-80 md:h-96 object-cover"
                />
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-sand"></p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>📍 {DATA.location}</li>
                  <li>✉️ {DATA.email}</li>
                  <li>📞 {DATA.phone}</li>
                  <li>🌐 Languages: {DATA.languages.join(" · ")}</li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ABOUT */}
      <Section id="about" title="About" subtitle="Who I am & what I care about">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <Card className="md:col-span-2">
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              I’m a Software Developer with a foundation in Computer Science and Economics, where I focus on building clean, high-performing systems and interfaces that feel natural to use. Alongside my work in technology, I’m deeply interested in Economics, developing a strong grounding in fundamentals such as strategy, management, and innovation. I’m also building my knowledge in astronomy, exploring the universe through both theoretical and observational research. My experience as a full-time student athlete taught me discipline, resilience, and how to perform under pressure, which are qualities I carry into every area of my work.
            </p>
          </Card>
          <Card>
            <div className="space-y-3 text-sm">
              <div className="font-semibold">Focus Areas</div>
              <div className="flex flex-wrap gap-2">
                {["Software Development", "Data Structures & Algorithms", "AI & Machine learning", "Scientific Computing", "Astrophysics & Cosmology", "Observational Astronomy", "Data Analysis & Visualization", "Entrepreneurship & Innovation", "Business Strategy & Technology Management", "Economics"].map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title="Experience" subtitle="Roles & impact">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DATA.experience.map((exp) => (
            <motion.div
              key={exp.company + exp.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {exp.company} · {exp.location}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">{exp.period}</span>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" subtitle="Things I've built or am building">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         {DATA.projects.map((p, idx) => (
  <Reveal key={p.title} i={idx} dir={idx % 2 ? "left" : "right"}>
    <Card>
      <div className="flex flex-col">
        {/* Top row: image + title (title vertically centered to image) */}
        <div className="flex items-center gap-4">
          {p.image && (
            <Image
              src={p.image}
              alt={p.title}
              width={80}
              height={80}
              className="rounded-xl shadow"
            />
          )}
          <h3 className="text-lg font-semibold">{p.title}</h3>
        </div>

        {/* Below: description, tags, links */}
        <div className="mt-4">
          <p className="text-sm">{p.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <div className="mt-5 flex gap-3 text-sm">
            {p.links.demo && <a href={p.links.demo}>Live Demo</a>}
            {p.links.code && <a href={p.links.code}>Source Code</a>}
            {p.links.app && <a href={p.links.app}>App</a>}
          </div>
        </div>
      </div>
    </Card>
  </Reveal>
))}



        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills" subtitle="Tech I use & domains I know">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal i={0}>
            <Card>
              <div className="mb-2 font-semibold">Programming</div>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.programming.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal i={1}>
            <Card>
              <div className="mb-2 font-semibold">Tools</div>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.tools.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal i={2}>
            <Card>
              <div className="mb-2 font-semibold">Domains</div>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.domains.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>


      {/* EDUCATION */}
      <Section id="education" title="Education" subtitle="Formal learning">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DATA.education.map((ed, idx) => (
            <Reveal key={ed.school} i={idx}>
              <Card>
                <div className="flex items-start gap-4">
                  {/* Left: logo */}
                  <div className="shrink-0">
                    <img
                      src={ed.logo}
                      alt={`${ed.school} logo`}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                  </div>

                  {/* Right: text */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{ed.school}</h3>
                        <p className="text-sm">{ed.degree}</p>
                      </div>
                      <span className="text-xs">{ed.period}</span>
                    </div>

                    {ed.details?.length ? (
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
                        {ed.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS */}
      <Section id="certifications" title="Certifications" subtitle="Programs & badges">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DATA.certifications.map((c, idx) => (
            <Reveal key={c.name} i={idx}>
              <Card>
                <div className="flex items-center gap-4">
                  {/* Left: logo */}
                  {c.logo && (
                    <img
                      src={c.logo}
                      alt={`${c.name} logo`}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                  )}

                  {/* Right: name + verified */}
                  <div className="flex-1 flex items-center justify-between">
                    <div className="font-medium">{c.name}</div>
                    <span className="text-xs">Verified</span>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>


      {/* CONTACT */}
      <Section id="contact" title="Contact" subtitle="Let’s work together">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Email */}
              <div className="flex items-center gap-3">
                <img src="/gmail.png" alt="Email" className="w-6 h-6 rounded-md" />
                <div>
                  <div className="text-sm">Email</div>
                  <a
                    href={`mailto:${DATA.email}`}
                    className="mt-1 inline-block font-medium underline-offset-4 hover:underline"
                  >
                    {DATA.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <img src="/phone.jpg" alt="Phone" className="w-6 h-6 rounded-md" />
                <div>
                  <div className="text-sm">Phone</div>
                  <a
                    href={`tel:${DATA.phone.replace(/[^+\d]/g, "")}`}
                    className="mt-1 inline-block font-medium underline-offset-4 hover:underline"
                  >
                    {DATA.phone}
                  </a>
                </div>
              </div>

              {/* Socials (LinkedIn, etc.) */}
              <div className="flex items-center gap-3">
                {/* If you only have LinkedIn, keep this img.
                    If you added logos per social in DATA, use the map below instead. */}
                <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6 rounded-md" />
                <div>
                  <div className="text-sm">Socials</div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm">
                    {DATA.socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline-offset-4 hover:underline flex items-center gap-2"
                      >
                        {/* Use per-item logo if you added it in DATA */}
                        {s.logo ? (
                          <img src={s.logo} alt={`${s.name} logo`} className="w-5 h-5 rounded-md" />
                        ) : null}
                        <span>{s.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* FOOTER */}
      <footer className="pb-12 pt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} {DATA.name}. Built with ❤️ using React & Tailwind.
      </footer>
    </div>
  );
}
