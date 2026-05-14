(function () {
  const grid = document.getElementById("work-grid");
  const empty = document.getElementById("work-empty");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (!grid || typeof works === "undefined") {
    return;
  }

  if (!works.length) {
    empty.hidden = false;
    return;
  }

  const fragment = document.createDocumentFragment();

  works.forEach(function (item) {
    const li = document.createElement("li");
    li.className = "work-card";

    const hasDestination =
      typeof item.href === "string" && item.href.trim().length > 0;

    const shell = document.createElement(hasDestination ? "a" : "article");
    shell.className = "work-card__link";

    if (hasDestination) {
      shell.href = item.href;
      shell.rel = "noopener noreferrer";
      if (/^https?:\/\//i.test(item.href)) {
        shell.target = "_blank";
      }
    }

    const thumb = document.createElement("div");
    thumb.className = "work-card__thumb";

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.imageAlt || "";
      img.loading = "lazy";
      thumb.appendChild(img);
    } else {
      thumb.textContent = "Image";
    }

    const body = document.createElement("div");
    body.className = "work-card__body";

    const title = document.createElement("h3");
    title.className = "work-card__title";
    title.textContent = item.title || "Untitled";

    body.appendChild(title);

    if (item.year) {
      const meta = document.createElement("p");
      meta.className = "work-card__meta";
      meta.textContent = item.year;
      body.appendChild(meta);
    }

    if (item.description) {
      const desc = document.createElement("p");
      desc.className = "work-card__desc";
      desc.textContent = item.description;
      body.appendChild(desc);
    }

    shell.appendChild(thumb);
    shell.appendChild(body);
    li.appendChild(shell);
    fragment.appendChild(li);
  });

  grid.appendChild(fragment);
})();
