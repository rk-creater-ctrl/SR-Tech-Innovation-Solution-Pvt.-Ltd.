(function () {
  const whatsappNumber = "916266324835";
  const brandName = "SR Tech Innovation & Solution Pvt. Ltd.";
  const brandMain = "SR Tech Innovation";
  const brandSub = "Solution Pvt. Ltd.";

  const fallbackLinks = {
    x: "https://x.com/_CodeNexus",
    instagram: "https://www.instagram.com/_.ritik_25",
    whatsapp: `https://wa.me/${whatsappNumber}`
  };

  const importantPages = [
    { href: "privacy-policy.html", label: "Privacy Policy", icon: "fa-user-shield" },
    { href: "terms-and-conditions.html", label: "Terms and Conditions", icon: "fa-file-contract" },
    { href: "service-policy.html", label: "Service Policy", icon: "fa-clipboard-list" },
    { href: "disclaimer.html", label: "Disclaimer", icon: "fa-exclamation-circle" }
  ];

  const footerLinks = Array.from(document.querySelectorAll(".footer a, footer a"));

  function buildWhatsappUrl(message) {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function ensureSellingNavLinks() {
    document.querySelectorAll("header .menu").forEach((menu) => {
      const links = Array.from(menu.querySelectorAll(":scope > a"));
      const hasPricing = links.some((link) => (link.getAttribute("href") || "").includes("pricing.html"));
      const hasOrder = links.some((link) => (link.getAttribute("href") || "").includes("order.html"));
      const contactLink = links.find((link) => (link.getAttribute("href") || "").includes("contact.html"));
      const insertBefore = contactLink || null;
      const baseClassName = (contactLink?.className || "menu-item").replace(/\bactive\b/g, "").trim() || "menu-item";

      if (!hasPricing) {
        const pricing = document.createElement("a");
        pricing.href = "pricing.html";
        pricing.textContent = "Pricing";
        pricing.className = baseClassName;
        menu.insertBefore(pricing, insertBefore);
      }

      if (!hasOrder) {
        const order = document.createElement("a");
        order.href = "order.html";
        order.textContent = "Order";
        order.className = baseClassName;
        menu.insertBefore(order, insertBefore);
      }
    });
  }

  function ensureFooterSellingLinks() {
    buildCategorizedFooter();
  }

  function ensureFooterImportantLinks() {
    buildCategorizedFooter();
  }

  function makeFooterColumn(className, title, links) {
    const column = document.createElement("div");
    column.className = className;
    const list = links.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join("");
    column.innerHTML = `<h3>${title}</h3><ul>${list}</ul>`;
    return column;
  }

  function buildCategorizedFooter() {
    document.querySelectorAll(".footer-container").forEach((container) => {
      if (container.dataset.categorized === "true") {
        return;
      }

      const existingLinksColumn = container.querySelector(".footer-links");
      const contactColumn = container.querySelector(".footer-contact");
      const socialColumn = container.querySelector(".footer-social");

      existingLinksColumn?.remove();

      const quickColumn = makeFooterColumn("footer-links footer-nav-links", "Quick Links", [
        { href: "index.html", label: "Home" },
        { href: "about.html", label: "About" },
        { href: "projects.html", label: "Projects" },
        { href: "contact.html", label: "Contact" }
      ]);

      const serviceColumn = makeFooterColumn("footer-links footer-service-links", "Services", [
        { href: "services.html", label: "Services" },
        { href: "school-website.html", label: "School Website" },
        { href: "school-management-system.html", label: "School Management" },
        { href: "website-erp-software.html", label: "Website + ERP" },
        { href: "website-maintenance.html", label: "Maintenance" },
        { href: "pricing.html", label: "Pricing" },
        { href: "order.html", label: "Order" }
      ]);

      const policyColumn = makeFooterColumn("footer-links footer-policy-links", "Policies", importantPages);

      if (contactColumn) {
        container.insertBefore(quickColumn, contactColumn);
        container.insertBefore(serviceColumn, contactColumn);
        container.insertBefore(policyColumn, contactColumn);
      } else if (socialColumn) {
        container.insertBefore(quickColumn, socialColumn);
        container.insertBefore(serviceColumn, socialColumn);
        container.insertBefore(policyColumn, socialColumn);
      } else {
        container.appendChild(quickColumn);
        container.appendChild(serviceColumn);
        container.appendChild(policyColumn);
      }

      container.dataset.categorized = "true";
    });
  }

  function buildImportantPagesMenu(navLinks, mobileToggle) {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const isPolicyPage = importantPages.some((page) => page.href === currentPage);

    const menu = document.createElement("div");
    menu.className = `cn-legal-menu${isPolicyPage ? " active" : ""}`;

    const button = document.createElement("button");
    button.className = "cn-legal-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Important pages");
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");
    button.title = "Important pages";
    button.innerHTML = '<i class="fas fa-file-alt" aria-hidden="true"></i><span class="cn-sr-only">Important pages</span>';

    const dropdown = document.createElement("div");
    dropdown.className = "cn-legal-dropdown";
    dropdown.setAttribute("role", "menu");

    importantPages.forEach((page) => {
      const link = document.createElement("a");
      link.href = page.href;
      link.setAttribute("role", "menuitem");
      link.innerHTML = `<i class="fas ${page.icon}" aria-hidden="true"></i><span>${page.label}</span>`;
      if (page.href === currentPage) {
        link.classList.add("active");
      }
      dropdown.appendChild(link);
    });

    menu.appendChild(button);
    menu.appendChild(dropdown);

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      closeOpenDropdowns(navLinks, menu);
      const isOpen = menu.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });

    dropdown.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target)) {
        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      }
    });

    return menu;
  }

  function pageNameFromHref(href) {
    return (href || "").split("/").pop() || "index.html";
  }

  function findNavLink(links, page) {
    return links.find((link) => pageNameFromHref(link.getAttribute("href")) === page);
  }

  function closeOpenDropdowns(navLinks, exceptMenu) {
    navLinks.querySelectorAll(".cn-nav-group.open, .cn-legal-menu.open").forEach((menu) => {
      if (menu === exceptMenu) {
        return;
      }

      menu.classList.remove("open");
      menu.querySelector("button")?.setAttribute("aria-expanded", "false");
    });
  }

  function buildNavGroup(label, groupLinks, currentPage, navLinks, mobileToggle) {
    const availableLinks = groupLinks.filter(Boolean);
    const isActive = availableLinks.some((link) => pageNameFromHref(link.getAttribute("href")) === currentPage);
    const group = document.createElement("div");
    group.className = `cn-nav-group${isActive ? " active" : ""}`;

    const button = document.createElement("button");
    button.className = "cn-nav-group-toggle";
    button.type = "button";
    button.setAttribute("aria-haspopup", "true");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = `<span>${label}</span><i class="fas fa-chevron-down" aria-hidden="true"></i>`;

    const dropdown = document.createElement("div");
    dropdown.className = "cn-nav-dropdown";
    dropdown.setAttribute("role", "menu");

    availableLinks.forEach((link) => {
      link.classList.remove("nav-link");
      link.setAttribute("role", "menuitem");
      dropdown.appendChild(link);
    });

    group.appendChild(button);
    group.appendChild(dropdown);

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      closeOpenDropdowns(navLinks, group);
      const isOpen = group.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });

    dropdown.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        group.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!group.contains(event.target)) {
        group.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      }
    });

    return group;
  }

  function buildGroupedNavigation(navLinks, links, mobileToggle) {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const homeLink = findNavLink(links, "index.html");
    const projectLink = findNavLink(links, "projects.html");

    if (homeLink) {
      homeLink.classList.add("nav-link");
      homeLink.textContent = "Home";
      navLinks.appendChild(homeLink);
    }

    navLinks.appendChild(buildNavGroup("Services", [
      findNavLink(links, "services.html"),
      findNavLink(links, "pricing.html"),
      findNavLink(links, "order.html")
    ], currentPage, navLinks, mobileToggle));

    if (projectLink) {
      projectLink.classList.add("nav-link");
      projectLink.textContent = "Work";
      navLinks.appendChild(projectLink);
    }

    navLinks.appendChild(buildNavGroup("Company", [
      findNavLink(links, "about.html"),
      findNavLink(links, "contact.html")
    ], currentPage, navLinks, mobileToggle));
  }

  function findFooterLink(test, fallback) {
    const match = footerLinks.find((link) => {
      const href = link.getAttribute("href") || "";
      return href !== "#" && test(href.toLowerCase(), link);
    });

    return match ? match.href : fallback;
  }

  function iconClass(name) {
    return `fab fa-${name}`;
  }

  function buildFloatingSocials() {
    if (document.querySelector(".floating-socials")) {
      return;
    }

    const socials = [
      {
        name: "x",
        label: `Follow ${brandName} on X`,
        href: findFooterLink((href) => href.includes("x.com") || href.includes("twitter.com"), fallbackLinks.x)
      },
      {
        name: "instagram",
        label: `Follow ${brandName} on Instagram`,
        href: findFooterLink((href) => href.includes("instagram.com"), fallbackLinks.instagram)
      },
      {
        name: "whatsapp",
        label: `Chat with ${brandName} on WhatsApp`,
        href: findFooterLink((href) => href.includes("wa.me") || href.includes("whatsapp"), fallbackLinks.whatsapp)
      }
    ];

    const wrapper = document.createElement("div");
    wrapper.className = "floating-socials";

    socials.forEach((social) => {
      const link = document.createElement("a");
      link.className = `${social.name}-link`;
      link.href = social.href;
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", social.label);
      link.title = social.label;
      link.innerHTML = social.name === "x"
        ? '<span aria-hidden="true">X</span>'
        : `<i class="${iconClass(social.name)}"></i>`;
      wrapper.appendChild(link);
    });

    document.body.appendChild(wrapper);
  }

  function activateCurrentNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const serviceDetailPages = [
      "school-website.html",
      "school-management-system.html",
      "website-erp-software.html",
      "website-maintenance.html",
      "ai-chatbot.html",
      "python-software.html",
      "web_development.html",
      "AI.html",
      "Robotics.html"
    ];
    const activePage = serviceDetailPages.includes(currentPage) ? "services.html" : currentPage;

    document.querySelectorAll(".menu a").forEach((link) => {
      const linkPage = (link.getAttribute("href") || "").split("/").pop();
      link.classList.remove("active");
      if (linkPage === activePage) {
        link.classList.add("active");
      }
    });
  }

  function enhanceSavvyNavbar() {
    document.querySelectorAll("header .menu").forEach((menu) => {
      if (menu.classList.contains("cn-savvy-menu")) {
        return;
      }

      const header = menu.closest("header");
      const logo = menu.querySelector(":scope > img");
      const links = Array.from(menu.querySelectorAll(":scope > a"));

      if (!header || !logo || links.length === 0) {
        return;
      }

      header.classList.add("cn-savvy-header");
      menu.classList.add("cn-savvy-menu");

      const brand = document.createElement("a");
      brand.className = "cn-brand-pill";
      brand.href = "index.html";
      brand.setAttribute("aria-label", `${brandName} Home`);
      logo.replaceWith(brand);
      brand.appendChild(logo);

      const brandText = document.createElement("span");
      brandText.className = "cn-brand-text";
      brandText.innerHTML = `<span class="cn-brand-main">${brandMain}</span><span class="cn-brand-sub">${brandSub}</span>`;
      brand.appendChild(brandText);

      const navLinks = document.createElement("div");
      navLinks.className = "cn-nav-links";
      navLinks.id = "navMenu";

      const indicator = document.createElement("span");
      indicator.className = "cn-nav-indicator";
      indicator.id = "navIndicator";
      navLinks.appendChild(indicator);

      const toggle = document.createElement("button");
      toggle.className = "cn-menu-toggle";
      toggle.id = "menuToggle";
      toggle.type = "button";
      toggle.setAttribute("aria-label", "Toggle navigation menu");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = "<span></span><span></span><span></span>";

      links.forEach((link) => {
        link.classList.add("nav-link");
        navLinks.appendChild(link);
      });
      navLinks.appendChild(buildImportantPagesMenu(navLinks, toggle));

      menu.appendChild(navLinks);
      menu.appendChild(toggle);

      const moveIndicator = (targetLink) => {
        if (!targetLink || window.innerWidth <= 1180) {
          indicator.style.opacity = 0;
          return;
        }

        const rect = targetLink.getBoundingClientRect();
        const containerRect = navLinks.getBoundingClientRect();
        indicator.style.width = `${rect.width}px`;
        indicator.style.transform = `translateX(${rect.left - containerRect.left}px)`;
        indicator.style.opacity = 1;
      };

      const currentActive = () => navLinks.querySelector(".nav-link.active")
        || navLinks.querySelector(".cn-legal-menu.active .cn-legal-toggle")
        || navLinks.querySelector(".nav-link");

      setTimeout(() => moveIndicator(currentActive()), 120);

      navLinks.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("mouseenter", () => moveIndicator(link));
        link.addEventListener("focus", () => moveIndicator(link));
        link.addEventListener("click", () => {
          navLinks.classList.remove("open");
          toggle.classList.remove("active");
          toggle.setAttribute("aria-expanded", "false");
        });
      });

      navLinks.querySelectorAll(".cn-legal-toggle").forEach((button) => {
        button.addEventListener("mouseenter", () => moveIndicator(button));
        button.addEventListener("focus", () => moveIndicator(button));
      });

      navLinks.addEventListener("mouseleave", () => moveIndicator(currentActive()));

      toggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        toggle.classList.toggle("active", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        navLinks.querySelectorAll(".cn-legal-menu.open").forEach((menu) => {
          menu.classList.remove("open");
          menu.querySelector("button")?.setAttribute("aria-expanded", "false");
        });
      });

      window.addEventListener("resize", () => moveIndicator(currentActive()));
    });
  }

  function enhanceScrollAnimations() {
    document.querySelectorAll(".page-hero, .container, .about-grid, .contact-container, .map-section, .section-heading, .package-card, .process-card, .trust-card, .quote-card, .project-cta").forEach((element) => {
      element.classList.add("scroll-animate");
    });

    const animated = Array.from(document.querySelectorAll(".scroll-animate"));

    animated.forEach((element, index) => {
      element.classList.add("cn-stagger");
      element.style.setProperty("--cn-delay", `${Math.min(index % 6, 5) * 70}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      animated.forEach((element) => element.classList.add("show"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

    animated.forEach((element) => observer.observe(element));
  }

  function getFieldLabel(field) {
    if (field.dataset.label) {
      return field.dataset.label;
    }

    const label = field.closest(".form-group")?.querySelector("label");
    if (label && label.textContent.trim()) {
      return label.textContent.trim();
    }

    return field.name.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function buildFormMessage(form) {
    const title = form.dataset.formTitle || "Project Inquiry";
    const lines = [`Hello ${brandName}, I want to discuss: ${title}`];
    const fields = Array.from(form.querySelectorAll("input[name], select[name], textarea[name]"));

    fields.forEach((field) => {
      if (field.type === "hidden" || field.type === "submit") {
        return;
      }

      const value = field.value.trim();
      if (!value) {
        return;
      }

      lines.push(`${getFieldLabel(field)}: ${value}`);
    });

    lines.push("Please contact me with details and next steps.");
    return lines.join("\n");
  }

  function attachWhatsappForms() {
    document.querySelectorAll("form[data-whatsapp-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const url = buildWhatsappUrl(buildFormMessage(form));
        trackConversion("form_submit", form.dataset.formTitle || "Project Inquiry");
        const status = form.querySelector(".form-status");
        if (status) {
          status.textContent = "Opening WhatsApp with your project details.";
        }

        const opened = window.open(url, "_blank", "noopener");
        if (!opened) {
          window.location.href = url;
        }
      });
    });
  }

  function attachOrderButtons() {
    document.querySelectorAll("[data-order-service]").forEach((button) => {
      const service = button.dataset.orderService || `a ${brandName} service`;
      const message = `Hello ${brandName}, I want to order or discuss: ${service}\nPlease share package details and next steps.`;
      button.setAttribute("href", buildWhatsappUrl(message));
      button.setAttribute("target", "_blank");
      button.setAttribute("rel", "noopener");
    });
  }

  function tagProject(title) {
    const normalized = title.toLowerCase();
    const tags = [];

    if (/school|website|site|portal|portfolio|hub/.test(normalized)) {
      tags.push("Website");
    }

    if (/system|generator|app|software|receipt|attendance|marksheet|dashboard/.test(normalized)) {
      tags.push("Software");
    }

    if (/ai|chatbot|detector|watcher/.test(normalized)) {
      tags.push("Automation");
    }

    if (/robot|robo|car|parking|arduino/.test(normalized)) {
      tags.push("Prototype");
    }

    tags.push("Custom build");
    return Array.from(new Set(tags)).slice(0, 3);
  }

  function professionalizePortfolioCards() {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.querySelectorAll(".like-dislike").forEach((controls) => controls.remove());

      const content = card.querySelector(".project-content");
      if (!content || content.querySelector(".project-proof")) {
        return;
      }

      const title = content.querySelector("h3")?.textContent?.trim() || "Project";
      const proof = document.createElement("div");
      proof.className = "project-proof";
      proof.setAttribute("aria-label", `${title} project categories`);
      proof.innerHTML = tagProject(title)
        .map((tag) => `<span>${tag}</span>`)
        .join("");
      content.appendChild(proof);
    });
  }

  function enhanceSocialLabels() {
    document.querySelectorAll(".social-icons a, .social-links a, .whatsapp-icon").forEach((link) => {
      if (link.getAttribute("aria-label")) {
        return;
      }

      const href = (link.getAttribute("href") || "").toLowerCase();
      let label = `Connect with ${brandName}`;
      if (href.includes("linkedin")) label = `${brandName} on LinkedIn`;
      if (href.includes("github")) label = `${brandName} on GitHub`;
      if (href.includes("instagram")) label = `${brandName} on Instagram`;
      if (href.includes("x.com") || href.includes("twitter")) label = `${brandName} on X`;
      if (href.includes("wa.me")) label = `Chat with ${brandName} on WhatsApp`;
      link.setAttribute("aria-label", label);
      link.title = label;
    });
  }

  function trackConversion(action, label) {
    const detail = {
      action,
      label: label || "",
      page: window.location.pathname.split("/").pop() || "index.html"
    };

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: `codenexus_${action}`,
        codenexus_label: detail.label,
        codenexus_page: detail.page
      });
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", action, {
        event_category: brandName,
        event_label: detail.label
      });
    }

    window.dispatchEvent(new CustomEvent("codenexus:track", { detail }));
  }

  function attachAnalyticsHooks() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) {
        return;
      }

      if (link.dataset.track) {
        trackConversion(link.dataset.track, link.dataset.trackLabel || link.textContent.trim());
        return;
      }

      const href = link.getAttribute("href") || "";
      if (href.includes("wa.me")) {
        trackConversion("whatsapp_click", link.dataset.orderService || link.textContent.trim() || "WhatsApp");
      } else if (link.classList.contains("visit-btn") || /^https?:\/\//i.test(href)) {
        trackConversion("demo_visit", link.textContent.trim() || href);
      }
    });
  }

  function addCardTilt() {
    const cards = document.querySelectorAll(".service-item, .project-card, .testimonial-item, .package-card, .process-card, .trust-card");

    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureSellingNavLinks();
    ensureFooterSellingLinks();
    ensureFooterImportantLinks();
    activateCurrentNav();
    enhanceSavvyNavbar();
    enhanceScrollAnimations();
    professionalizePortfolioCards();
    enhanceSocialLabels();
    attachAnalyticsHooks();
    addCardTilt();
    attachOrderButtons();
    attachWhatsappForms();
    buildFloatingSocials();
  });
})();
