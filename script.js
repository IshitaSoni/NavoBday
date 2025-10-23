(function () {
	// Run after DOM is ready
	function onReady(fn) {
		if (document.readyState !== 'loading') {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	onReady(function () {
		// Smooth scrolling with offset for fixed nav
		const nav = document.getElementById('topnav');
		const navHeight = nav ? nav.offsetHeight : 64;
		const navLinks = document.querySelectorAll('.topnav .nav-link');

		navLinks.forEach(link => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const targetId = link.getAttribute('href').substring(1);
				const target = document.getElementById(targetId) || document.querySelector('.hero');
				if (!target) return;
				const rect = target.getBoundingClientRect();
				const scrollTop = window.scrollY + rect.top - navHeight + 8; // small gap
				window.scrollTo({ top: scrollTop, behavior: 'smooth' });
			});
		});

		// Highlight active nav link while scrolling
		const sections = [document.getElementById('hero'), document.getElementById('carousel'), document.getElementById('gallery')];

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					navLinks.forEach(l => l.classList.remove('active'));
					const id = entry.target.id || 'hero';
					const link = document.querySelector(`.topnav a[href="#${id}"]`);
					if (link) link.classList.add('active');
				}
			});
		}, { threshold: 0.5, rootMargin: `-${navHeight}px 0px -${navHeight}px 0px` });

		sections.forEach(sec => {
			if (sec) observer.observe(sec);
		});

		// Duplicate carousel track content so animation can scroll seamlessly
		const track = document.querySelector('.carousel .track');
		if (track) {
			const parentWidth = track.parentElement.getBoundingClientRect().width;
			// clone once for smoothness
			const clone = track.innerHTML;
			track.innerHTML += clone;
			// If still not wide enough, append again
			let totalWidth = track.getBoundingClientRect().width;
			if (totalWidth < parentWidth * 2) track.innerHTML += clone;
		}
	});
})();

