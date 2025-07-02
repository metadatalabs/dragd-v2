(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
      define([], factory);
    } else if (typeof exports === 'object') {
      module.exports = factory();
    } else {
      root.PockitOS = factory();
    }
  })(typeof self !== 'undefined' ? self : this, function () {
    injectTailwind();

    // --- Debug Window ---
    function showDebugWindow() {
      let dbg = document.getElementById('pockit-debug-window');
      if (!dbg) {
        dbg = document.createElement('div');
        dbg.id = 'pockit-debug-window';
        dbg.style.position = 'absolute';
        dbg.style.top = '12px';
        dbg.style.right = '12px';
        dbg.style.zIndex = 99999;
        dbg.style.background = 'white';
        dbg.style.border = '1px solid #ccc';
        dbg.innerHTML = `
          <div style="font-size:12px;font-weight:bold;margin-bottom:4px;">PockitOS Memory</div>
          <div style="margin-bottom:4px;">
            <button id="pockit-restoreall-btn" style="font-size:11px;padding:2px 8px;border:1px solid #bbb;background:#f3f3f3;cursor:pointer;">Restore All</button>
          </div>
          <textarea id="pockit-debug-textarea" style="width:320px;height:180px;font-size:11px;font-family:monospace;" class="mb-0"></textarea>
        `;
        document.body.appendChild(dbg);

        document.getElementById('pockit-restoreall-btn').onclick = () => {
          PockitOS.restoreAll();
        };
      }
      updateDebugWindow();
    }

    function updateDebugWindow() {
      const dbgTextarea = document.getElementById('pockit-debug-textarea');
      if (!dbgTextarea) return;
      dbgTextarea.value = PockitOS.memory.map(state => {
        return `<div style="left:${state.left};top:${state.top};z-index:${state.zIndex};position:absolute;">${state.value}</div>`;
      }).join('\n\n');
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    // --- Main Class ---
    class PockitOS {
      static zIndexCounter = 1000;
      static memory = [];

      constructor(container = document.body, state = null) {
        this.container = container;
        if (state) {
          this.element = createUI(this, state);
          this.container.appendChild(this.element);
          setPosition(this, state);
          makeDraggable(this);
        } else {
          this.element = createUI(this);
          this.container.appendChild(this.element);
          centerInContainer(this);
          makeDraggable(this);
        }
        const textarea = this.element.querySelector('textarea');
        if (textarea) {
          textarea.addEventListener('input', () => {
            PockitOS.updateMemory();
          });
        }
      }

      static updateMemory() {
        const divs = Array.from(document.querySelectorAll('.pockit-os-window'));
        PockitOS.memory = divs.map(div => {
          const textarea = div.querySelector('textarea');
          return {
            left: div.style.left,
            top: div.style.top,
            zIndex: div.style.zIndex,
            value: textarea ? textarea.value : '',
          };
        });
        updateDebugWindow();
      }

      static restoreAll(container = document.body) {
        const dbgTextarea = document.getElementById('pockit-debug-textarea');
        if (dbgTextarea) {
          const val = dbgTextarea.value.trim();
          if (val.startsWith('<div')) {
            const divs = [];
            // Parse as HTML
            const parser = new DOMParser();
            // Wrap in a root so we can select all outermost divs
            const doc = parser.parseFromString(`<root>${val}</root>`, 'text/html');
            // Select only direct children divs of root
            const nodes = doc.body.querySelectorAll('root > div');
            nodes.forEach(div => {
              const style = div.getAttribute('style') || '';
              const left = /left:([^;]+);/.exec(style)?.[1]?.trim() || '';
              const top = /top:([^;]+);/.exec(style)?.[1]?.trim() || '';
              const zIndex = /z-index:([^;]+);/.exec(style)?.[1]?.trim() || '';
              // Get all inner HTML as text, treating all inner divs as text
              // Remove the outer div, get its innerHTML as text
              // Replace all inner <div> tags with their literal HTML
              let value = Array.from(div.childNodes).map(node => {
                if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'DIV') {
                  // Serialize the inner div as HTML string
                  return node.outerHTML;
                } else if (node.nodeType === Node.TEXT_NODE) {
                  return node.textContent;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                  // For other elements, serialize as HTML
                  return node.outerHTML;
                }
                return '';
              }).join('');
              divs.push({ left, top, zIndex, value });
            });
            if (divs.length > 0) {
              PockitOS.memory = divs;
            }
          }
        }
        Array.from(document.querySelectorAll('.pockit-os-window')).forEach(el => el.remove());
        PockitOS.memory.forEach(state => new PockitOS(container, state));
        showDebugWindow();
        updateDebugWindow();
        Array.from(document.querySelectorAll('.pockit-os-window textarea')).forEach(textarea => {
          textarea.addEventListener('input', () => {
            PockitOS.updateMemory();
          });
        });
      }
    }
  
    // --- Setup Menubar ---
    // Dynamically load PockitMenubar and use it
    (async () => {
      if (!window.PockitMenubar) {
        await import('./pockitmenubar.js');
      }
      const menubar = new window.PockitMenubar(document.body);
      menubar.addMenu('OS', [
        {
          label: 'New Window',
          onClick: () => new PockitOS(document.body)
        }
      ]);
    })();

    showDebugWindow();

    return PockitOS;

    // --- Utilities ---
    function injectTailwind() {
      const id = 'pockit-tailwind-cdn';
      if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.id = id;
        script.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(script);
      }
    }

    function centerInContainer(ctx) {
      const el = ctx.element;
      el.style.left = '50%';
      el.style.top = '50%';
      el.style.transform = 'translate(-50%, -50%)';
    }

    function setPosition(ctx, state) {
      const el = ctx.element;
      el.style.left = state.left || '50%';
      el.style.top = state.top || '50%';
      el.style.transform = '';
      if (state.zIndex) el.style.zIndex = state.zIndex;
    }

    function createUI(ctx, state = null) {
      const wrapper = document.createElement('div');
      wrapper.className = 'pockit-os-window fixed bg-white border border-gray-300 min-w-[300px] min-h-[150px]';
      wrapper.style.zIndex = PockitOS.zIndexCounter++;
      wrapper.style.position = 'absolute';

      const textareaValue = state && state.value ? state.value : '';

      wrapper.innerHTML = `
        <div class="title-bar flex items-center justify-between px-3 py-2 bg-gray-800 cursor-move select-none" style="border-radius:0;padding:0;">
          <span class="font-semibold text-white">PockitOS</span>
          <div class="buttons flex gap-2">
            <button class="btn-add w-6 h-6 flex items-center justify-center bg-green-500 hover:bg-green-600 transition" style="border-radius:0;">+</button>
            <button class="btn-eye w-6 h-6 flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition" style="border-radius:0;">👁️</button>
            <button class="btn-close w-6 h-6 flex items-center justify-center bg-red-500 hover:bg-red-600 transition" style="border-radius:0;">✕</button>
          </div>
        </div>
        <div class="content text-gray-800" style="padding:0;">
          <textarea class="w-full h-32 border border-gray-300 mb-0" placeholder="Type here...">${textareaValue}</textarea>
          <div class="rendered-content w-full min-h-32 p-[1px]" style="display:none;white-space:pre-wrap;overflow:auto;"></div>
        </div>
      `;

      wrapper.querySelector('.btn-close').onclick = () => wrapper.remove();
      wrapper.querySelector('.btn-add').onclick = () => new PockitOS(ctx.container);

      const btnEye = wrapper.querySelector('.btn-eye');
      const textarea = wrapper.querySelector('textarea');
      const renderedDiv = wrapper.querySelector('.rendered-content');
      let isRendered = false;

      function showRendered() {
        renderedDiv.innerHTML = '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = textarea.value;

        // Move all children to renderedDiv
        while (tempDiv.firstChild) {
          renderedDiv.appendChild(tempDiv.firstChild);
        }

        // Handle <script type="importmap">
        const importmapScript = renderedDiv.querySelector('script[type="importmap"]');
        if (importmapScript) {
          // Only add if not already present
          if (!document.querySelector('script[type="importmap"][data-pockit]')) {
            const newImportmap = document.createElement('script');
            newImportmap.type = 'importmap';
            newImportmap.setAttribute('data-pockit', 'true');
            newImportmap.textContent = importmapScript.textContent;
            document.head.appendChild(newImportmap);
          }
        }

        // Handle <script type="module">
        const moduleScript = renderedDiv.querySelector('script[type="module"]');
        if (moduleScript) {
          // Remove any previous module script for this window
          if (renderedDiv._pockitModuleScript) {
            renderedDiv._pockitModuleScript.remove();
          }
          // Create a new script element
          const newScript = document.createElement('script');
          newScript.type = 'module';
          newScript.textContent = moduleScript.textContent;
          // Attach to document body so it runs in page context
          document.body.appendChild(newScript);
          // Keep reference for cleanup if needed
          renderedDiv._pockitModuleScript = newScript;
        }

        textarea.style.display = 'none';
        renderedDiv.style.display = '';
        btnEye.textContent = '✏️';
        isRendered = true;
      }

      function showTextarea() {
        textarea.style.display = '';
        renderedDiv.style.display = 'none';
        btnEye.textContent = '👁️';
        isRendered = false;
      }

      btnEye.onclick = () => {
        if (!isRendered) {
          showRendered();
        } else {
          showTextarea();
        }
      };

      // If textarea changes while in rendered mode, update rendered content
      textarea.addEventListener('input', () => {
        if (isRendered) {
          renderedDiv.innerHTML = textarea.value; // render as HTML
        }
      });

      return wrapper;
    }

    function makeDraggable(ctx) {
      const el = ctx.element;
      const bar = el.querySelector('.title-bar');
      let offsetX = 0, offsetY = 0, isDragging = false;

      const onMouseDown = (e) => {
        isDragging = true;
        const rect = el.getBoundingClientRect();
        const containerRect = ctx.container.getBoundingClientRect();
        const left = rect.left - containerRect.left;
        const top = rect.top - containerRect.top;
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
        el.style.transform = '';
        offsetX = e.clientX - left;
        offsetY = e.clientY - top;
        el.style.zIndex = PockitOS.zIndexCounter++;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const containerRect = ctx.container.getBoundingClientRect();
        let newLeft = e.clientX - containerRect.left - offsetX;
        let newTop = e.clientY - containerRect.top - offsetY;
        el.style.left = `${newLeft}px`;
        el.style.top = `${newTop}px`;
        PockitOS.updateMemory();
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      bar.addEventListener('mousedown', onMouseDown);
    }
  });
