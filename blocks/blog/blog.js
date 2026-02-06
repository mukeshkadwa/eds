export default function decorate(block) {
  if (!block) return;

  const rows = [...block.children];
  if (!rows.length) return;

  block.innerHTML = '';

  /* ---------------- Container ---------------- */
  const container = document.createElement('div');
  container.className = 'container';

  /* ---------------- Heading + Blog List ---------------- */
  const listWrapper = document.createElement('div');
  listWrapper.className = 'blogs-item-list-wrapper';

  /* -------- Heading -------- */
  const headingRow = rows.shift();
  const headingText = headingRow?.textContent?.trim();

  const heading = document.createElement('h2');
  heading.className = 'blogs-heading';
  heading.textContent = headingText || '';
  listWrapper.appendChild(heading);

  /* -------- Blog List -------- */
  const blogsList = document.createElement('div');
  blogsList.className = 'blogs-list';

  const sidebarImages = [];

  rows.forEach((row) => {
    const content = row.querySelector(':scope > div');
    if (!content) return;

    const paragraphs = [...content.querySelectorAll('p')];
    const picture = content.querySelector('picture');

    /* ---- Blog item ---- */
    if (paragraphs.length === 4 && !picture) {
      const blogItem = document.createElement('div');
      blogItem.className = 'blog-item';

      const titleDateWrapper = document.createElement('div');
      titleDateWrapper.className = 'blog-item-title-wrapper';

      const title = document.createElement('h3');
      title.className = 'blog-title';
      title.textContent = paragraphs[0].textContent.trim();

      const date = document.createElement('p');
      date.className = 'blog-date';
      date.textContent = paragraphs[1].textContent.trim();

      titleDateWrapper.append(title, date);

      const desc = document.createElement('p');
      desc.className = 'blog-description';
      desc.textContent = paragraphs[2].textContent.trim();

      const linkWrapper = document.createElement('div');
      linkWrapper.className = 'blog-link';

      const link = paragraphs[3].querySelector('a');
      if (link) {
        const a = link.cloneNode(true);
        a.className = 'blog-read-more';
        linkWrapper.appendChild(a);
      }

      blogItem.append(titleDateWrapper, desc, linkWrapper);
      blogsList.appendChild(blogItem);
    }

    /* ---- Sidebar image ---- */
    if (picture) {
      sidebarImages.push(picture.cloneNode(true));
    }
  });

  listWrapper.appendChild(blogsList);
  container.appendChild(listWrapper);

  /* ---------------- Sidebar ---------------- */
  if (sidebarImages.length) {
    const sidebar = document.createElement('div');
    sidebar.className = 'blogs-sidebar';

    const imagesWrapper = document.createElement('div');
    imagesWrapper.className = 'sidebar-images-wrapper';

    sidebarImages.slice(0, 2).forEach((img) => {
      imagesWrapper.appendChild(img);
    });

    sidebar.appendChild(imagesWrapper);
    container.appendChild(sidebar);
  }

  block.appendChild(container);
}
