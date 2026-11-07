// js/main.js — Shared interactions for the auction pages

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    initScrollUi();
    initReveals();
    initAuctionQuerySync();
});

/* --------------------------------------------------------------------------
   Scroll progress + back to top
   -------------------------------------------------------------------------- */
function initScrollUi() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);

    const topBtn = document.createElement('button');
    topBtn.className = 'back-to-top';
    topBtn.type = 'button';
    topBtn.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
    topBtn.innerHTML = '<i class="bi bi-arrow-up" aria-hidden="true"></i>';
    document.body.appendChild(topBtn);

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    let ticking = false;
    const update = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;

        topBtn.classList.toggle('is-visible', window.scrollY > 620);
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
}

/* --------------------------------------------------------------------------
   Scroll reveal (also watches dynamically injected content)
   -------------------------------------------------------------------------- */
let revealObserver = null;

function initReveals() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('[data-reveal], .img-reveal').forEach((el) => {
            el.classList.add('is-revealed');
        });
        return;
    }

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-reveal], .img-reveal').forEach(observeReveal);

    const mo = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (!(node instanceof Element)) return;
                if (node.matches('[data-reveal], .img-reveal')) observeReveal(node);
                node.querySelectorAll('[data-reveal], .img-reveal').forEach(observeReveal);
            });
        });
    });

    mo.observe(document.body, { childList: true, subtree: true });
}

function observeReveal(el) {
    if (!revealObserver || el.classList.contains('is-revealed')) return;
    const delay = Number(el.dataset.delay || 0);
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
    revealObserver.observe(el);
}

window.observeReveals = () => {
    document.querySelectorAll('[data-reveal], .img-reveal').forEach(observeReveal);
};

/* --------------------------------------------------------------------------
   Auction helpers
   -------------------------------------------------------------------------- */
function getAuctionStatusClass(status) {
    if (status === 'جاري') return 'status-live';
    if (status === 'منتهي') return 'status-ended';
    if (status === 'قريبًا') return 'status-upcoming';
    return '';
}

function auctionCardHTML(auction, index) {
    const statusClass = getAuctionStatusClass(auction.status);
    const liveDot = auction.status === 'جاري' ? '<span class="dot"></span>' : '';
    const number = String(auction.id || index + 1).padStart(2, '0');

    return `
        <article class="auction-card" data-reveal data-delay="${(index % 3) * 90}">
            <a class="auction-image-wrapper" href="${auction.url}" aria-label="${auction.title} — تفاصيل المزاد">
                <span class="auction-status ${statusClass}">${liveDot}${auction.status}</span>
                <img src="${auction.image}" alt="${auction.title}" class="auction-image" loading="lazy" decoding="async"
                     onerror="this.style.display='none'; this.parentElement.classList.add('image-missing');">
                <span class="auction-open" aria-hidden="true"><i class="bi bi-arrow-up-left"></i></span>
            </a>
            <div class="auction-content">
                <div class="auction-meta">
                    <span><i class="bi bi-geo-alt" aria-hidden="true"></i> ${auction.location}</span>
                    <span class="auction-index">No. ${number}</span>
                </div>
                <h3 class="auction-title"><a href="${auction.url}">${auction.title}</a></h3>
                <div class="auction-dates-box">
                    <div class="date-row">
                        <span class="date-label">بداية المزاد</span>
                        <span class="date-value">${auction.start}</span>
                    </div>
                    <div class="date-row">
                        <span class="date-label">نهاية المزاد</span>
                        <span class="date-value">${auction.end}</span>
                    </div>
                </div>
                <div class="auction-meta-bottom">
                    <span><i class="bi bi-lightning-charge" aria-hidden="true"></i> ${auction.type}</span>
                    <span><i class="bi bi-buildings" aria-hidden="true"></i> ${auction.propertiesCount}</span>
                </div>
            </div>
        </article>`;
}

/* --------------------------------------------------------------------------
   Auctions page — keep filters in sync with shareable URLs
   -------------------------------------------------------------------------- */
function initAuctionQuerySync() {
    const grid = document.getElementById('auctions-page-grid');
    if (!grid) return;

    const params = new URLSearchParams(window.location.search);
    const city = params.get('city');
    const status = params.get('status');
    const search = params.get('q');

    if (!city && !status && !search) return;

    // The auctions page renders its own controls on DOMContentLoaded. Wait for
    // that work to finish before applying URL values.
    window.setTimeout(() => {
        const cityFilter = document.getElementById('city-filter');
        const statusButtons = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('search-input');

        if (city && cityFilter) {
            const hasCity = [...cityFilter.options].some((option) => option.value === city);
            if (hasCity) cityFilter.value = city;
        }

        if (status) {
            statusButtons.forEach((button) => {
                button.classList.toggle('active', button.dataset.status === status);
            });
        }

        if (search && searchInput) {
            searchInput.value = search;
        }

        if (city || status || search) {
            const active = document.querySelector('.filter-btn.active');
            if (active) active.click();
        }
    }, 0);
}
