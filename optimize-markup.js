const fs = require("fs");
const path = require("path");

const root = __dirname;
const baseUrl = "https://codenexus.vercel.app";
const brandName = "SR Tech Innovation & Solution Pvt. Ltd.";
const logoFile = "company_logo.png";
const defaultImage = `${baseUrl}/${logoFile}`;
const today = "2026-06-27";

const pageMeta = {
  "index.html": {
    title: `${brandName} | Websites, School Software, AI Chatbots & Automation`,
    description: `${brandName} builds professional websites, school management systems, website + ERP bundles, AI chatbots, Python automation tools, and maintenance packages for schools and small businesses.`,
    priority: "1.0",
    changefreq: "weekly"
  },
  "about.html": {
    title: `About ${brandName} | Technology Service Studio`,
    description: `Learn about ${brandName}, a Rewa-based technology service studio led by Ritik Kushwaha for websites, AI tools, Python software, robotics, and school digital systems.`,
    priority: "0.7",
    changefreq: "monthly"
  },
  "services.html": {
    title: `Services | ${brandName}`,
    description: `Explore ${brandName} services for web development, school websites, school management systems, website + ERP software, AI chatbots, Python software, dashboards, robotics, IoT, and website maintenance.`,
    priority: "0.9",
    changefreq: "weekly"
  },
  "pricing.html": {
    title: `Pricing & Service Packages | ${brandName}`,
    description: `Compare ${brandName} pricing for business websites, school websites, ERP software, AI chatbots, Python tools, landing pages, maintenance, dashboards, and IoT projects.`,
    priority: "0.9",
    changefreq: "weekly"
  },
  "order.html": {
    title: `Request a Quote | ${brandName}`,
    description: `Send a project inquiry to ${brandName} for websites, school software, AI chatbots, Python automation, dashboards, maintenance, robotics, or custom digital solutions.`,
    priority: "0.9",
    changefreq: "weekly"
  },
  "projects.html": {
    title: `Client Work & Project Samples | ${brandName}`,
    description: `View ${brandName} project samples including school websites, school management systems, AI chatbots, Python tools, automation projects, dashboards, and live website demos.`,
    priority: "0.8",
    changefreq: "monthly"
  },
  "contact.html": {
    title: `Contact ${brandName} | WhatsApp, Email & Project Inquiry`,
    description: `Contact ${brandName} in Rewa, Madhya Pradesh for websites, school management software, AI chatbots, Python automation, dashboards, robotics, and maintenance projects.`,
    priority: "0.8",
    changefreq: "monthly"
  },
  "web_development.html": {
    title: `Web Development Services | ${brandName}`,
    description: `Professional web development services by ${brandName} for responsive business websites, landing pages, portfolios, school websites, SEO setup, and Vercel deployment.`,
    priority: "0.6",
    changefreq: "monthly"
  },
  "AI.html": {
    title: `AI Solutions | ${brandName}`,
    description: `AI solutions by ${brandName} for chatbots, lead assistants, FAQ automation, support workflows, computer vision concepts, and business automation planning.`,
    priority: "0.6",
    changefreq: "monthly"
  },
  "ai-chatbot.html": {
    title: `AI Chatbot Development | ${brandName}`,
    description: `AI chatbot development by ${brandName} for FAQ automation, lead capture, website assistant workflows, customer support, and content-based business inquiries.`,
    priority: "0.85",
    changefreq: "weekly"
  },
  "python-software.html": {
    title: `Custom Python Software | ${brandName}`,
    description: `Custom Python software development by ${brandName} for automation, billing tools, PDF and QR generators, attendance tools, data reports, desktop utilities, and workflow apps.`,
    priority: "0.85",
    changefreq: "weekly"
  },
  "pyhton.html": {
    title: `Python Development Moved | ${brandName}`,
    description: `The old Python development page now redirects to the current ${brandName} custom Python software service page.`,
    canonical: `${baseUrl}/python-software`,
    priority: "0.1",
    changefreq: "yearly",
    excludeFromSitemap: true
  },
  "Robotics.html": {
    title: `Robotics & IoT Projects | ${brandName}`,
    description: `Robotics and IoT project support by ${brandName} for Arduino builds, ESP32 prototypes, sensors, automation concepts, wiring guidance, and project documentation.`,
    priority: "0.6",
    changefreq: "monthly"
  },
  "school-website.html": {
    title: `School Website Development | ${brandName}`,
    description: `Affordable school website development by ${brandName} with admission pages, notices, gallery, academics, contact forms, WhatsApp inquiry, SEO setup, and Vercel deployment.`,
    priority: "0.95",
    changefreq: "weekly"
  },
  "school-management-system.html": {
    title: `School Management System | ${brandName}`,
    description: `School management system development by ${brandName} for attendance, students, staff, marksheets, reports, fee records, admin workflows, and custom school modules.`,
    priority: "0.95",
    changefreq: "weekly"
  },
  "website-erp-software.html": {
    title: `Website + ERP Software | ${brandName}`,
    description: `Website + ERP software package by ${brandName} combining a public school website with ERP modules for attendance, student records, reports, marksheets, and admin workflows.`,
    priority: "0.95",
    changefreq: "weekly"
  },
  "website-maintenance.html": {
    title: `Website Maintenance Packages | ${brandName}`,
    description: `Website maintenance packages by ${brandName} for prebuilt website management, content updates, bug fixes, redesign, rebuilds, new feature additions, and deployment support.`,
    priority: "0.95",
    changefreq: "weekly"
  },
  "privacy-policy.html": {
    title: `Privacy Policy | ${brandName}`,
    description: `Read the ${brandName} privacy policy for project inquiries, contact details, WhatsApp communication, Vercel hosting, and third-party services.`,
    priority: "0.4",
    changefreq: "yearly"
  },
  "terms-and-conditions.html": {
    title: `Terms and Conditions | ${brandName}`,
    description: `Review ${brandName} terms and conditions for service inquiries, project scope, pricing, delivery, revisions, intellectual property, and client responsibilities.`,
    priority: "0.4",
    changefreq: "yearly"
  },
  "service-policy.html": {
    title: `Service Policy | ${brandName}`,
    description: `Understand the ${brandName} service policy for project scope, timelines, revisions, delivery, support, client content, and maintenance work.`,
    priority: "0.4",
    changefreq: "yearly"
  },
  "disclaimer.html": {
    title: `Disclaimer | ${brandName}`,
    description: `Read the ${brandName} disclaimer for service information, project estimates, demo links, third-party tools, and website content accuracy.`,
    priority: "0.4",
    changefreq: "yearly"
  }
};

const imageAlts = {
  "company_logo.png": `${brandName} rocket logo`,
  "logo.png": `${brandName} logo`,
  "logo01.png": `${brandName} brand logo`,
  "web.jpeg": "Responsive web development service illustration",
  "AI.jpeg": "Artificial intelligence service illustration",
  "Robot.png": "Robotics and IoT service icon",
  "python.jpeg": "Python software development service illustration",
  "chitti.jpg": "Arduino robot project prototype",
  "robocar.jpg": "Arduino robo car project prototype",
  "image11.png": "Responsive website project screenshot",
  "chatbot.PNG": "AI chatbot project screenshot",
  "automation.jpg": "Automation project screenshot",
  "parking_system.jpg": "Smart parking system project screenshot",
  "Attendance_system.png": "Attendance system project screenshot",
  "Job_Portal.png": "Job portal website project screenshot",
  "AI-healthcare.png": "AI healthcare project screenshot",
  "pdf-summerizer.png": "PDF summarizer tool screenshot",
  "pdf-summarizer.webp": "PDF summarizer tool screenshot",
  "QR-code-generator.png": "QR code generator tool screenshot",
  "marksheet-generator.png": "Marksheet generator software screenshot",
  "YT-video-installer.png": "YouTube video downloader project screenshot",
  "youtube-downloader.webp": "YouTube video downloader project screenshot",
  "Object-distance-ditector.png": "Object distance detector project screenshot",
  "object-distance-detector.webp": "Object distance detector project screenshot",
  "teaching-app.png": "Teaching app concept screenshot",
  "Tech-news-hub-site.png": "Tech news hub website screenshot",
  "Automobile-site.png": "Automobile website screenshot",
  "import-export-site.png": "Import export business website screenshot",
  "ActivityDitector.png": "Activity watcher detection system screenshot",
  "activity-detector.webp": "Activity watcher detection system screenshot",
  "receipt-maker.png": "Receipt maker software screenshot",
  "image2.png": "Robo car prototype photo",
  "School-website.png": "Savvy Mother Toddler School website screenshot",
  "school-management.png": "School management system screenshot"
};

const serviceOffers = [
  "Business Website",
  "School Website",
  "School Management System",
  "Website + ERP Software",
  "AI Chatbot",
  "Custom Python Software",
  "Robotics and IoT Project",
  "Website Maintenance"
];

function isExternalReference(value) {
  return /^(https?:|mailto:|tel:|#|javascript:|data:)/i.test(value) || value.startsWith("?");
}

function checkLocalReferences() {
  const files = fs.readdirSync(root)
    .filter((file) => file.endsWith(".html"))
    .sort();
  const missing = [];

  files.forEach((file) => {
    const html = fs.readFileSync(path.join(root, file), "utf8");
    const matches = Array.from(html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi));

    matches.forEach((match) => {
      const raw = match[1];
      if (isExternalReference(raw)) {
        return;
      }

      const clean = raw.split("#")[0].split("?")[0];
      if (!clean || clean.includes("/") || clean.startsWith("#")) {
        return;
      }

      if (!fs.existsSync(path.join(root, clean))) {
        missing.push(`${file}: ${raw}`);
      }
    });
  });

  if (missing.length) {
    console.error("Missing local references:");
    missing.forEach((item) => console.error(`- ${item}`));
    process.exitCode = 1;
    return;
  }

  console.log(`Checked ${files.length} HTML files. No missing local references.`);
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function decodeEntities(value) {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function pageUrl(file, meta) {
  if (meta.canonical) {
    return meta.canonical;
  }

  return file === "index.html" ? `${baseUrl}/` : `${baseUrl}/${file.replace(/\.html$/i, "")}`;
}

function getMeta(file, html) {
  const fallbackTitle = (html.match(/<title>([^<]+)<\/title>/i) || [null, brandName])[1].trim();
  return {
    title: fallbackTitle,
    description: `${brandName} provides practical technology services for websites, school software, AI chatbots, Python automation, robotics, and digital business systems.`,
    priority: "0.5",
    changefreq: "monthly",
    ...pageMeta[file]
  };
}

function normalizeText(html) {
  return html
    .replace(/&amp;amp;/g, "&amp;")
    .replace(/©/g, "&copy;")
    .replace(/Â©/g, "&copy;")
    .replace(/Letâ€™s/g, "Let's")
    .replace(/letâ€™s/g, "let's")
    .replace(/â€™/g, "'")
    .replace(/â€“/g, "-")
    .replace(/â€”/g, "-")
    .replace(/ðŸ“\s*/g, "")
    .replace(/ðŸ“ž\s*/g, "")
    .replace(/âœ‰\s*/g, "")
    .replace(/My Services/g, "Client Services")
    .replace(/My Projects/g, "Client Work")
    .replace(/Showcasing Innovation, Technology & Creativity/g, "Websites, software tools, automation demos, and service-ready builds")
    .replace(/Follow Me/g, "Connect")
    .replace(/CodeNexus is a technology-driven freelance brand founded by/g, `${brandName} is a technology service studio led by`)
    .replace(/CodeNexus is a technology service studio led by/g, `${brandName} is a technology service studio led by`)
    .replace(/Follow CodeNexus/g, `Connect with ${brandName}`)
    .replace(/GitHub Pages deployment/g, "Vercel deployment")
    .replace(/GitHub Pages launches/g, "Vercel launches")
    .replace(/GitHub Pages support/g, "deployment support")
    .replace(/GitHub Pages links/g, "live website links")
    .replace(/GitHub Pages, /g, "")
    .replace(/GitHub Pages/g, "Vercel")
    .replace(/(?<![\/_A-Za-z0-9-])CodeNexus(?![A-Za-z0-9-])/g, brandName)
    .replace(/Pvt\. Ltd\.\./g, "Pvt. Ltd.")
    .replace(/logo01\.png/g, logoFile)
    .replace(/(?<!company_)logo\.png/g, logoFile);
}

function ensureTitleDescriptionCanonical(html, file, meta) {
  const canonical = pageUrl(file, meta);

  if (/<title>[^<]*<\/title>/i.test(html)) {
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttr(meta.title)}</title>`);
  } else {
    html = html.replace(/<\/head>/i, `<title>${escapeAttr(meta.title)}</title>\n</head>`);
  }

  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeAttr(meta.description)}">`);
  } else {
    html = html.replace(/<meta name="viewport" content="width=device-width, initial-scale=1.0">/i, `$&\n<meta name="description" content="${escapeAttr(meta.description)}">`);
  }

  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeAttr(canonical)}">`);
  } else {
    html = html.replace(/<meta name="description" content="[^"]*">/i, `$&\n<link rel="canonical" href="${escapeAttr(canonical)}">`);
  }

  return html;
}

function buildSchema(file, meta) {
  const url = pageUrl(file, meta);
  const organization = {
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#business`,
    name: brandName,
    url: `${baseUrl}/`,
    logo: defaultImage,
    image: defaultImage,
    description: pageMeta["index.html"].description,
    telephone: "+91 6266324835",
    email: "codenexus199@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rewa",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN"
    },
    founder: {
      "@type": "Person",
      name: "Ritik Kushwaha"
    },
    areaServed: ["India", "Madhya Pradesh", "Rewa"],
    sameAs: [
      "https://www.linkedin.com/in/ritik-kushwaha-bb76a0355/",
      "https://github.com/rk-creater-ctrl",
      "https://x.com/_CodeNexus",
      "https://www.instagram.com/_.ritik_25"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${brandName} service packages`,
      itemListElement: serviceOffers.map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name
        }
      }))
    }
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: brandName,
      url: `${baseUrl}/`
    },
    provider: {
      "@id": `${baseUrl}/#business`
    }
  };

  const graph = [organization, webPage];

  if (file === "pricing.html") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: [
        ["Can you manage an existing website?", "Yes. Existing websites can be managed, updated, redesigned, fixed, or improved with new features."],
        ["Can I start with a low budget?", "Yes. Small landing pages, bug fixes, feature add-ons, and content updates are available at low starter prices."],
        ["Can features be added later?", "Yes. Websites, school systems, dashboards, and Python tools can be built in phases as the budget grows."],
        ["Is support included after delivery?", "Basic handover support is included. Ongoing support is available through website maintenance packages."]
      ].map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: {
          "@type": "Answer",
          text
        }
      }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}

function ensureSocialAndSchema(html, file, meta) {
  const url = pageUrl(file, meta);
  const block = [
    `<meta property="og:type" content="website" data-codenexus-seo>`,
    `<meta property="og:site_name" content="${escapeAttr(brandName)}" data-codenexus-seo>`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" data-codenexus-seo>`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" data-codenexus-seo>`,
    `<meta property="og:url" content="${escapeAttr(url)}" data-codenexus-seo>`,
    `<meta property="og:image" content="${escapeAttr(defaultImage)}" data-codenexus-seo>`,
    `<meta name="twitter:card" content="summary_large_image" data-codenexus-seo>`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" data-codenexus-seo>`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" data-codenexus-seo>`,
    `<meta name="twitter:image" content="${escapeAttr(defaultImage)}" data-codenexus-seo>`,
    `<script type="application/ld+json" data-codenexus-schema>${JSON.stringify(buildSchema(file, meta))}</script>`
  ].join("\n");

  html = html.replace(/\n?<meta[^>]+data-codenexus-seo[^>]*>/gi, "");
  html = html.replace(/\n?<script type="application\/ld\+json" data-codenexus-schema>[\s\S]*?<\/script>/gi, "");
  return html.replace(/<\/head>/i, `${block}\n</head>`);
}

function attrValue(attrs, name) {
  const match = attrs.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match ? match[1] : "";
}

function inferAlt(src) {
  const file = path.basename(src);
  if (imageAlts[file]) {
    return imageAlts[file];
  }

  if (file.toLowerCase().endsWith(".webp")) {
    const base = file.replace(/\.webp$/i, "");
    const candidate = [
      `${base}.png`,
      `${base}.PNG`,
      `${base}.jpg`,
      `${base}.jpeg`
    ].find((name) => imageAlts[name]);

    if (candidate) {
      return imageAlts[candidate];
    }
  }

  return file
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function maybeWebp(src) {
  if (/^https?:\/\//i.test(src) || src.includes("/") || src.toLowerCase().includes("logo")) {
    return src;
  }

  const ext = path.extname(src).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    return src;
  }

  const webp = `${src.slice(0, -ext.length)}.webp`;
  return fs.existsSync(path.join(root, webp)) ? webp : src;
}

function enhanceImages(html) {
  return html.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    let updatedAttrs = attrs.trim();
    const src = attrValue(updatedAttrs, "src");

    if (!src) {
      return match;
    }

    const optimizedSrc = maybeWebp(src);
    if (optimizedSrc !== src) {
      updatedAttrs = updatedAttrs.replace(/src\s*=\s*["'][^"']*["']/i, `src="${optimizedSrc}"`);
    }

    const isLogo = /logo/i.test(optimizedSrc);
    const inferredAlt = inferAlt(optimizedSrc);

    if (/\salt\s*=/.test(updatedAttrs)) {
      updatedAttrs = updatedAttrs.replace(/\salt\s*=\s*["'][^"']*["']/i, ` alt="${escapeAttr(inferredAlt)}"`);
    } else {
      updatedAttrs += ` alt="${escapeAttr(inferredAlt)}"`;
    }

    if (!isLogo && !/\sloading\s*=/.test(updatedAttrs)) {
      updatedAttrs += ` loading="lazy"`;
    }

    if (!/\sdecoding\s*=/.test(updatedAttrs)) {
      updatedAttrs += ` decoding="async"`;
    }

    return `<img ${updatedAttrs}>`;
  });
}

function enhanceExternalLinks(html) {
  return html.replace(/<a\b([^>]*target=["']_blank["'][^>]*)>/gi, (match, attrs) => {
    if (/\srel\s*=/.test(attrs)) {
      return match;
    }

    return `<a${attrs} rel="noopener">`;
  });
}

function ensureContactLinks(html) {
  return html
    .replace(/<p><i class="fas fa-phone"><\/i> \+91 6266324835<\/p>/g, '<p><i class="fas fa-phone"></i> <a href="tel:+916266324835">+91 6266324835</a></p>')
    .replace(/<p><i class="fas fa-envelope"><\/i> ritikkushwaha3893@gmail\.com<\/p>/g, '<p><i class="fas fa-envelope"></i> <a href="mailto:ritikkushwaha3893@gmail.com">ritikkushwaha3893@gmail.com</a></p>')
    .replace(/<li><i class="fas fa-phone"><\/i> \+91 6266324835<\/li>/g, '<li><i class="fas fa-phone"></i> <a href="tel:+916266324835">+91 6266324835</a></li>')
    .replace(/<li><i class="fas fa-envelope"><\/i> ritikkushwaha3893@gmail\.com , codenexus199@gmail\.com<\/li>/g, '<li><i class="fas fa-envelope"></i> <a href="mailto:codenexus199@gmail.com">codenexus199@gmail.com</a></li>');
}

function ensureTrackingAttributes(html) {
  html = html.replace(/<a\b([^>]*data-order-service="([^"]+)"[^>]*)>/gi, (match, attrs, service) => {
    if (/\sdata-track\s*=/.test(attrs)) {
      return match;
    }
    return `<a${attrs} data-track="order_click" data-track-label="${escapeAttr(decodeEntities(service))}">`;
  });

  html = html.replace(/<a\b([^>]*href="pricing\.html"[^>]*)>/gi, (match, attrs) => {
    if (/\sdata-track\s*=/.test(attrs)) {
      return match;
    }
    return `<a${attrs} data-track="pricing_click" data-track-label="Pricing">`;
  });

  html = html.replace(/<form\b([^>]*data-whatsapp-form[^>]*)>/gi, (match, attrs) => {
    if (/\sdata-track\s*=/.test(attrs)) {
      return match;
    }
    return `<form${attrs} data-track="form_submit">`;
  });

  return html;
}

function processHtml(file) {
  const fullPath = path.join(root, file);
  let html = fs.readFileSync(fullPath, "utf8");
  const meta = getMeta(file, html);

  if (file === "pyhton.html") {
    html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${escapeAttr(meta.description)}">
<link rel="canonical" href="${escapeAttr(meta.canonical)}">
<meta http-equiv="refresh" content="0; url=python-software.html">
<title>${escapeAttr(meta.title)}</title>
<link rel="icon" type="image/png" href="${logoFile}">
</head>
<body>
<main>
<h1>Python Development Page Moved</h1>
<p>The Python service page has moved to <a href="python-software.html">Custom Python Software</a>.</p>
</main>
</body>
</html>
`;
    fs.writeFileSync(fullPath, html);
    return true;
  }

  const before = html;
  html = normalizeText(html);
  html = ensureTitleDescriptionCanonical(html, file, meta);
  html = enhanceImages(html);
  html = enhanceExternalLinks(html);
  html = ensureContactLinks(html);
  html = ensureTrackingAttributes(html);
  html = ensureSocialAndSchema(html, file, meta);

  if (html !== before) {
    fs.writeFileSync(fullPath, html);
    return true;
  }

  return false;
}

function updateSitemap(files) {
  const entries = files
    .filter((file) => pageMeta[file] && !pageMeta[file].excludeFromSitemap)
    .sort((a, b) => {
      const priority = Number(pageMeta[b]?.priority || 0.5) - Number(pageMeta[a]?.priority || 0.5);
      return priority || a.localeCompare(b);
    })
    .map((file) => {
      const meta = pageMeta[file] || {};
      const loc = pageUrl(file, meta);
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${meta.changefreq || "monthly"}</changefreq>
    <priority>${meta.priority || "0.5"}</priority>
  </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;

  fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);
}

function updateRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  fs.writeFileSync(path.join(root, "robots.txt"), robots);
}

function main() {
  if (process.argv.includes("--check-links")) {
    checkLocalReferences();
    return;
  }

  const files = fs.readdirSync(root)
    .filter((file) => file.endsWith(".html"))
    .sort();

  const changed = files.filter(processHtml);
  updateSitemap(files);
  updateRobots();

  console.log(`Processed ${files.length} HTML files.`);
  console.log(`Updated ${changed.length} HTML files, sitemap.xml, and robots.txt.`);
}

main();
