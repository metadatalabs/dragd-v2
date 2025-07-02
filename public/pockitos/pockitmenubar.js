class PockitMenubar {
  constructor(container = document.body) {
    this.container = container;
    this.menubar = document.createElement('div');
    this.menubar.className = 'pockit-menubar flex items-center bg-gray-900 text-white px-2 py-1';
    // Ensure absolute positioning at the top, full width
    this.menubar.style.position = 'absolute';
    this.menubar.style.top = '0';
    this.menubar.style.left = '0';
    this.menubar.style.right = '0';
    this.menubar.style.width = '100%';
    this.menubar.style.zIndex = 100000;
    this.menubar.style.height = '32px';
    this.menubar.style.userSelect = 'none';
    this.container.appendChild(this.menubar);
    this.menus = [];
  }

  addMenu(label, options) {
    const menuWrapper = document.createElement('div');
    menuWrapper.className = 'relative group mr-4';
    menuWrapper.style.display = 'inline-block';

    const btn = document.createElement('button');
    btn.className = 'px-3 py-1 hover:bg-gray-700 rounded';
    btn.textContent = label;
    menuWrapper.appendChild(btn);

    const dropdown = document.createElement('div');
    dropdown.className = 'absolute left-0 mt-1 bg-white text-black border border-gray-300 shadow-lg rounded hidden group-hover:block';
    dropdown.style.minWidth = '120px';
    dropdown.style.zIndex = 100001;

    options.forEach(opt => {
      const item = document.createElement('div');
      item.className = 'px-4 py-2 hover:bg-gray-200 cursor-pointer';
      item.textContent = opt.label;
      item.onclick = (e) => {
        e.stopPropagation();
        dropdown.style.display = 'none';
        opt.onClick();
      };
      dropdown.appendChild(item);
    });

    // Show/hide logic
    btn.onclick = (e) => {
      e.stopPropagation();
      // Hide all other dropdowns
      document.querySelectorAll('.pockit-menubar .dropdown-open').forEach(el => {
        el.classList.remove('dropdown-open');
        el.style.display = 'none';
      });
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      if (dropdown.style.display === 'block') {
        dropdown.classList.add('dropdown-open');
      }
    };

    // Hide dropdown on click outside
    document.addEventListener('click', () => {
      dropdown.style.display = 'none';
      dropdown.classList.remove('dropdown-open');
    });

    menuWrapper.appendChild(dropdown);
    this.menubar.appendChild(menuWrapper);
    this.menus.push({ label, options });
  }
}

// Attach to window for dynamic import usage
window.PockitMenubar = PockitMenubar;
