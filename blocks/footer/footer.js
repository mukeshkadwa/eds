import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */

export default async function decorate(block) {
  /* ---------------- Load footer fragment ---------------- */
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : '/footer';

  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const root = document.createElement('div');
  while (fragment.firstElementChild) {
    root.append(fragment.firstElementChild);
  }
  block.append(root);

  /* ---------------- Locate section ---------------- */
  const section = block.querySelector('.section');
  if (!section) return;

  const columnsWrapper = section.querySelector(':scope > div > div ');
  if (!columnsWrapper) return;

  const columns = [...columnsWrapper.children];
  if (!columns.length) return;

  /* ---------------- Classify columns ---------------- */
  const linkColumns = [];
  let newsletterCol;

  columns.forEach((col) => {
    const links = col.querySelectorAll('a');
    if (links.length > 0) {
      linkColumns.push(col);
    } else {
      newsletterCol = col;
    }
  });

  /* ---------------- Container ---------------- */
  const container = document.createElement('div');
  container.className = 'container';

  /* ---------------- Footer Columns ---------------- */
  const footerColumns = document.createElement('div');
  footerColumns.className = 'footer-columns';

  linkColumns.forEach((col) => {
    const headingStrong = col.querySelector('strong');
    if (!headingStrong) return;

    const column = document.createElement('div');
    column.className = 'footer-column';

    const heading = document.createElement('h4');
    heading.className = 'footer-heading';
    heading.textContent = headingStrong.textContent.trim();
    column.appendChild(heading);

    const ul = document.createElement('ul');
    ul.className = 'footer-links';

    col.querySelectorAll('a').forEach((link) => {
      const li = document.createElement('li');
      const a = link.cloneNode(true);
      a.classList.add('footer-link');
      li.appendChild(a);
      ul.appendChild(li);
    });

    column.appendChild(ul);
    footerColumns.appendChild(column);
  });

  /* ---------------- Newsletter ---------------- */
  if (newsletterCol) {
    const footerNewsletter = document.createElement('div');
    footerNewsletter.className = 'footer-newsletter';

    const children = [...newsletterCol.children];

    /* Heading */
    if (children[0]?.querySelector('strong')) {
      const h3 = document.createElement('h3');
      h3.className = 'newsletter-heading';
      h3.textContent = children[0].textContent.trim();
      footerNewsletter.appendChild(h3);
    }

    /* Label */
    if (children[1]) {
      const label = document.createElement('label');
      label.className = 'newsletter-label';
      label.textContent = children[1].textContent.trim();
      footerNewsletter.appendChild(label);
    }

    /* Input + Button */
    const inputBtnWrapper = document.createElement('div');
    inputBtnWrapper.className = 'newsletter-input-button-wrapper';

    const input = document.createElement('input');
    input.type = 'email';
    input.className = 'newsletter-input';
    input.placeholder = 'Enter your email';

    const button = document.createElement('button');
    button.className = 'newsletter-button';
    button.textContent = children[2]?.textContent.trim() || 'Sign Up';

    inputBtnWrapper.append(input, button);
    footerNewsletter.appendChild(inputBtnWrapper);

    /* Copyright */
    if (children[3]) {
      const p = document.createElement('p');
      p.className = 'footer-copyright';
      p.textContent = children[3].textContent.trim();
      footerNewsletter.appendChild(p);
    }

    container.append(footerColumns, footerNewsletter);
  } else {
    container.append(footerColumns);
  }

  /* ---------------- Replace section content ---------------- */
  section.innerHTML = '';
  section.appendChild(container);
}

