"use client";

import Link from "next/link";
import React from "react";

export default function CVPage() {
  const [place, setPlace] = React.useState("Chakdaha");
  const [dateString, setDateString] = React.useState("10/07/2026");

  React.useEffect(() => {
    // Set dynamic current date (format: DD/MM/YYYY)
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    setDateString(`${dd}/${mm}/${yyyy}`);

    // Helper to fallback to IP Geolocation
    const fallbackToIp = () => {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          if (data.city) {
            setPlace(data.city);
          }
        })
        .catch(() => {
          // Fallback to secondary location API if ipapi is down or rate-limited
          return fetch("https://freeipapi.com/api/json")
            .then((res) => res.json())
            .then((data) => {
              if (data.cityName) {
                setPlace(data.cityName);
              }
            });
        })
        .catch((err) => {
          console.error("IP Geolocation fallback failed:", err);
        });
    };

    // 1. Try GPS Geolocation first (most precise)
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocode using OpenStreetMap Nominatim API
          fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
            .then((res) => res.json())
            .then((data) => {
              const addr = data.address;
              const cityOrTown = addr.city || addr.town || addr.village || addr.suburb || addr.municipality || addr.county;
              if (cityOrTown) {
                setPlace(cityOrTown);
              } else {
                fallbackToIp();
              }
            })
            .catch((err) => {
              console.error("Reverse geocoding failed:", err);
              fallbackToIp();
            });
        },
        (error) => {
          console.warn("GPS Geolocation failed. Using IP fallback.", error);
          fallbackToIp();
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      fallbackToIp();
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 flex flex-col items-center py-6 px-4 md:py-12 print:py-0 print:px-0 print:bg-white print:text-black relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none print:hidden"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none print:hidden"></div>

      {/* Top Glass Navigation Bar */}
      <header className="w-full max-w-[21cm] p-4! mb-6! mt-6! flex justify-between items-center px-4 py-3 bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-xl shadow-lg print:hidden z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition text-sm"
          id="back-home-btn"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Portfolio
        </Link>
        <button
          onClick={handlePrint}
          className="flex p-2! items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer text-sm"
          id="print-cv-btn"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print / Save PDF
        </button>
      </header>

      {/* Main CV Sheet (Styled with site's dark mode theme on screen, switches to black & white on print) */}
      <main className="w-full p-4! mb-6! max-w-[21cm] bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 sm:p-10 md:p-[1.5cm] shadow-2xl rounded-2xl print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none print:bg-white print:text-black flex flex-col gap-5.5 relative z-10 break-words overflow-hidden">
        
        {/* Header Section */}
        <section className="text-center flex flex-col items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-white print:text-black uppercase font-sans">
            Souvik Chakraborty
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 print:text-gray-700 font-medium">
            Chakdaha, Nadia, West Bengal, 741222
          </p>
          
          {/* Contact Row */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 mt-1.5 text-xs sm:text-sm text-slate-300 print:text-gray-800">
            {/* Phone */}
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-indigo-400 print:text-black font-semibold">☎</span>
              <a href="tel:+918617382987" className="hover:underline">+91 8617382987</a>
            </div>
            
            {/* Email */}
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-indigo-400 print:text-black font-semibold">✉</span>
              <a href="mailto:souvik00chakraborty@gmail.com" className="text-cyan-400 hover:text-cyan-300 print:text-blue-700 hover:underline">
                souvik00chakraborty@gmail.com
              </a>
            </div>
            
            {/* LinkedIn */}
            <div className="flex items-center gap-1.5">
              <svg 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 print:text-blue-700 fill-current shrink-0" 
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <a 
                href="https://linkedin.com/in/souvik-chakraborty-301849234" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyan-400 hover:text-cyan-300 print:text-blue-700 hover:underline break-all sm:break-normal"
              >
                linkedin.com/in/souvik-chakraborty-301849234
              </a>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="flex flex-col gap-1.5">
          <h2 className="text-sm pb-2! font-bold text-indigo-400 print:text-black border-b border-slate-800/80 print:border-black pb-0.5 tracking-wider uppercase">
            Summary
          </h2>
          <p className="text-[13px] leading-relaxed text-justify text-slate-300 print:text-gray-900 font-sans">
            Dynamic and detail-oriented Frontend Developer with extensive experience designing and
            implementing user-centric web applications using JavaScript, ReactJS, HTML, and CSS. Skilled at
            creating reusable UI components, optimizing user experience, and collaborating efficiently with
            back-end teams for seamless API integration. Proven ability to deliver innovative, high-quality
            solutions in fast-paced environments. Committed to enhancing usability and achieving business
            goals through modern web technologies.
          </p>
        </section>

        {/* Skills Section */}
        <section className="flex flex-col gap-1.5">
          <h2 className="text-sm pb-2! font-bold text-indigo-400 print:text-black border-b border-slate-800/80 print:border-black pb-0.5 tracking-wider uppercase">
            Skills
          </h2>
          <div className="grid grid-cols-1 p-4! sm:grid-cols-3 gap-x-8 gap-y-1 text-[13px] text-slate-300 print:text-gray-900 leading-normal pl-4">
            {/* Column 1 */}
            <ul className="list-disc flex flex-col gap-1">
              <li>Front end web development</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>Responsive design</li>
              <li>Next JS</li>
              <li>React JS</li>
            </ul>
            {/* Column 2 */}
            <ul className="list-disc flex flex-col gap-1">
              <li>Angular JS</li>
              <li>JavaScript (ES6+)</li>
              <li>Figma (UI/UX design)</li>
              <li>Penpot (UI/UX design, open-source tool)</li>
            </ul>
            {/* Column 3 */}
            <ul className="list-disc flex flex-col gap-1">
              <li>Cross-browser compatibility</li>
              <li>UI component libraries (e.g., Material-UI, Bootstrap)</li>
            </ul>
          </div>
        </section>

        {/* Experience Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm pb-2! font-bold text-indigo-400 print:text-black border-b border-slate-800/80 print:border-black pb-0.5 tracking-wider uppercase">
            Experience
          </h2>
          
          {/* Job 1 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <h3 className="text-[13px] font-bold text-white print:text-black">
                Web Developer, InfluxIQ Tech Private Limited
              </h3>
              <span className="text-[11.5px] font-semibold text-indigo-300 print:text-gray-800 whitespace-nowrap">
                March 2025 – Present
              </span>
            </div>
            <ul className="list-disc pl-5 p-4! text-[12.5px] leading-relaxed text-slate-300 print:text-gray-900 flex flex-col gap-1.5 text-justify">
              <li>Implemented responsive web designs to ensure optimal performance across various devices and screen sizes.</li>
              <li>Optimized website performance by minimizing load times and improving rendering speed.</li>
              <li>Conducted thorough testing and debugging to ensure cross-browser compatibility and a bug-free user experience.</li>
              <li>Integrated third-party libraries and tools to enhance functionality and user interaction.</li>
              <li>Participated in code reviews and collaborated with team members to maintain code quality and consistency.</li>
              <li>Utilized version control systems like Git for efficient source code management and collaboration.</li>
              <li>Worked closely with UI/UX designers to translate design mockups into functional, interactive web interfaces.</li>
              <li>Developed and maintained comprehensive documentation for front-end development processes and components.</li>
              <li>Stayed updated with the latest industry trends and best practices to continuously improve front-end architecture.</li>
              <li>Implemented accessibility standards (WCAG) to make web applications usable for people with disabilities.</li>
            </ul>
          </div>

          {/* Job 2 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
              <h3 className="text-[13px] font-bold text-white print:text-black">
                Trainee Web Developer, Creatixia
              </h3>
              <span className="text-[11.5px] font-semibold text-indigo-300 print:text-gray-800 whitespace-nowrap">
                December 2022 – February 2025
              </span>
            </div>
            <ul className="list-disc pl-5 p-4! text-[12.5px] leading-relaxed text-slate-300 print:text-gray-900 flex flex-col gap-1.5 text-justify">
              <li>Developed and maintained user-facing websites using HTML, CSS, JavaScript, and ReactJS.</li>
              <li>Collaborated closely with the back-end developers to integrate API calls into the front-end codebase.</li>
              <li>Created UI components with reusable codes for a better user experience.</li>
            </ul>
          </div>
        </section>

        {/* Education Section */}
        <section className="flex flex-col gap-2">
          <h2 className="text-sm pb-2! font-bold text-indigo-400 print:text-black border-b border-slate-800/80 print:border-black pb-0.5 tracking-wider uppercase">
            Education
          </h2>
          <div className="flex flex-col gap-3.5 text-[13px] text-slate-300 print:text-gray-900 leading-normal">
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-white print:text-black uppercase">
                Bachelor of Technology in Civil Engineering - 2022
              </span>
              <span className="text-slate-400 print:text-gray-800">
                Regent Education and Research Foundation, Barrackpore
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-white print:text-black uppercase">
                Diploma in Civil Engineering - 2019
              </span>
              <span className="text-slate-400 print:text-gray-800">
                KIIT Polytechnic, Bhubaneswar
              </span>
            </div>
          </div>
        </section>

        {/* Hobbies Section */}
        <section className="flex flex-col gap-1.5">
          <h2 className="text-sm pb-2! font-bold text-indigo-400 print:text-black border-b border-slate-800/80 print:border-black pb-0.5 tracking-wider uppercase">
            Hobbies & Interests
          </h2>
          <ul className="list-disc pl-5 p-4! text-[13px] leading-relaxed text-slate-300 print:text-gray-900 flex flex-col gap-0.5">
            <li>Learning new programming languages and frameworks.</li>
            <li>Mentoring or coaching junior developers.</li>
            <li>Keeping up with news and current affairs.</li>
            <li>Watching matches (football and other sports).</li>
          </ul>
        </section>

        {/* Career Goals Section */}
        <section className="flex flex-col gap-1.5">
          <h2 className="text-sm pb-2! font-bold text-indigo-400 print:text-black border-b border-slate-800/80 print:border-black pb-0.5 tracking-wider uppercase">
            Career Goals
          </h2>
          <p className="text-[13px] leading-relaxed text-justify text-slate-300 print:text-gray-900 font-sans">
            To leverage my expertise in front-end development, modern web technologies, and UI/UX design to
            build engaging, high-performance web applications. I aim to continuously enhance my skills,
            contribute to innovative projects, and collaborate with talented teams where I can drive user
            experience and deliver robust digital solutions that support organizational growth and customer
            satisfaction. My long-term goal is to grow into a lead developer role and inspire best practices
            in web development.
          </p>
        </section>

        {/* Signature Footer */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mt-6 text-[13px] text-slate-300 print:text-gray-900 leading-normal">
          <div className="flex flex-col gap-3">
            <div><strong>Place:</strong> {place}</div>
            <div><strong>Date:</strong> {dateString}</div>
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0 w-full sm:w-auto">
            {/* Cursive Signature Graphic */}
            <div 
              className="px-6 py-1.5 border border-slate-800/80 rounded bg-slate-950 font-serif italic text-lg tracking-wide text-indigo-400 select-none shadow-sm print:border-slate-200 print:bg-slate-50 print:text-blue-900" 
              style={{ fontFamily: "Great Vibes, Dancing Script, Brush Script MT, cursive" }}
            >
              Souvik Chakraborty
            </div>
            <div className="w-40 border-t border-dotted border-slate-800 print:border-black mt-1"></div>
            <span className="text-[11.5px] font-semibold text-slate-400 print:text-gray-800 text-center">
              Signature of The Candidate
            </span>
          </div>
        </section>

      </main>

      {/* Bottom Actions Area (Centered, client download and back buttons) */}
      <footer className="w-full  mb-6! max-w-[21cm] mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 px-4 print:hidden z-20">
        <a 
          href="/SouvikCV-123.pdf" 
          download="Souvik_Chakraborty_CV.pdf"
          className="w-full p-3! sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer text-center text-sm"
          id="download-original-pdf-btn"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Original CV PDF
        </a>
      </footer>
    </div>
  );
}
