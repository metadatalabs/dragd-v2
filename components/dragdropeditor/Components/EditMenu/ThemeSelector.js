export default function ThemeSelector({ selectedTheme, onSelect }) {
  const Theme = ({ theme }) => {
    return (
      <div
        class={`border-base-content/20 border-2 
        ${selectedTheme == theme ? "ring-2" : ""}
        hover:border-base-content/40 outline-base-content overflow-hidden rounded-lg border outline-2 outline-offset-2`}
        data-set-theme={theme}
        data-act-class="outline"
        onClick={(e) => {
          onSelect(theme);
        }}
      >
        <div
          data-theme={theme}
          class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
        >
          <div class="grid grid-cols-5 grid-rows-3">
            <div class="bg-base-200 col-start-1 row-span-2 row-start-1"></div>{" "}
            <div class="bg-base-300 col-start-1 row-start-3"></div>{" "}
            <div class="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
              <div class="font-bold">
                {theme == undefined ? "default" : theme}
              </div>{" "}
              <div class="flex flex-wrap gap-1">
                <div class="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                  <div class="text-primary-content text-sm font-bold">A</div>
                </div>{" "}
                <div class="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                  <div class="text-secondary-content text-sm font-bold">A</div>
                </div>{" "}
                <div class="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                  <div class="text-accent-content text-sm font-bold">A</div>
                </div>{" "}
                <div class="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                  <div class="text-neutral-content text-sm font-bold">A</div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  };
  return (
    <div className="p-2">
      <div class="rounded-box grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
        {[
          undefined,
          "light",
          "dark",
          "cupcake",
          "bumblebee",
          "emerald",
          "corporate",
          "synthwave",
          "retro",
          "cyberpunk",
          "valentine",
          "halloween",
          "garden",
          "forest",
          "aqua",
          "lofi",
          "pastel",
          "fantasy",
          "wireframe",
          "black",
          "luxury",
          "dracula",
          "cmyk",
          "autumn",
          "business",
          "acid",
          "lemonade",
          "night",
          "coffee",
          "winter",
        ].map((theme) => (
          <Theme theme={theme} />
        ))}
      </div>
    </div>
  );
}
