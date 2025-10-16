'use client';

export default function PalettePage() {
  const options = [
    {
      name: "Opción 1: Transición Azul-Gris Suave",
      description: "Gris azulado suave, perfecto para interfaces modernas",
      colors: [
        { name: "Primary", code: "#64748b", description: "Slate-600: Gris azulado medio" },
        { name: "Secondary", code: "#94a3b8", description: "Slate-400: Gris azulado claro" },
        { name: "Accent", code: "#475569", description: "Slate-600: Gris azulado oscuro" },
        { name: "Neutral", code: "#6b7280", description: "Gray-500: Gris neutro" }
      ]
    },
    {
      name: "Opción 2: Transición Azul-Gris Corporativa",
      description: "Más corporativo y profesional, ideal para B2B",
      colors: [
        { name: "Primary", code: "#475569", description: "Slate-600: Azul-gris corporativo" },
        { name: "Secondary", code: "#64748b", description: "Slate-500: Azul-gris medio" },
        { name: "Accent", code: "#334155", description: "Slate-700: Azul-gris oscuro" },
        { name: "Neutral", code: "#4b5563", description: "Gray-600: Gris neutro oscuro" }
      ]
    },
    {
      name: "Opción 3: Gradación Azul-Gris Elegante",
      description: "Elegante y sofisticado, más hacia grises neutros",
      colors: [
        { name: "Primary", code: "#52525b", description: "Zinc-600: Gris neutro con toque azul" },
        { name: "Secondary", code: "#71717a", description: "Zinc-500: Gris medio neutro" },
        { name: "Accent", code: "#3f3f46", description: "Zinc-700: Gris oscuro elegante" },
        { name: "Light", code: "#a1a1aa", description: "Zinc-400: Gris claro" }
      ]
    },
    {
      name: "Opción 4: Profesional Azul-Gris",
      description: "Muy profesional y serio, máxima credibilidad",
      colors: [
        { name: "Primary", code: "#0f172a", description: "Slate-900: Azul-gris muy oscuro" },
        { name: "Secondary", code: "#1e293b", description: "Slate-800: Azul-gris oscuro" },
        { name: "Accent", code: "#334155", description: "Slate-700: Azul-gris medio" },
        { name: "Neutral", code: "#64748b", description: "Slate-500: Gris azulado" }
      ]
    }
  ];

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    alert(`Color ${color} copiado!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎨 Opciones de Paleta Corporativa
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Paletas &ldquo;grises azules yendo a grises&rdquo; para V7MPC
          </p>
          <p className="text-sm text-gray-500">
            Haz clic en cualquier color para copiar su código
          </p>
        </div>

        <div className="space-y-8">
          {options.map((option, optionIndex) => (
            <div key={optionIndex} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {option.name}
                </h2>
                <p className="text-gray-600">
                  {option.description}
                </p>
              </div>

              {/* Paleta de Colores */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {option.colors.map((color, colorIndex) => (
                  <div key={colorIndex} className="text-center">
                    <div
                      className="w-24 h-24 mx-auto rounded-xl shadow-md cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
                      style={{ backgroundColor: color.code }}
                      onClick={() => copyColor(color.code)}
                      title={`Clic para copiar ${color.code}`}
                    ></div>
                    <h3 className="font-semibold text-sm mt-3 text-gray-800">
                      {color.name}
                    </h3>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-700">
                      {color.code}
                    </code>
                    <p className="text-xs text-gray-500 mt-1">
                      {color.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Vista Previa de Aplicación */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Vista Previa:</h3>
                <div className="flex flex-wrap gap-3">
                  {/* Botón Primary */}
                  <button 
                    className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: option.colors[0].code }}
                  >
                    Botón Primary
                  </button>

                  {/* Botón Secondary */}
                  <button 
                    className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: option.colors[1].code }}
                  >
                    Botón Secondary
                  </button>

                  {/* Texto con Accent */}
                  <div 
                    className="px-4 py-2 rounded-lg font-medium text-white"
                    style={{ backgroundColor: option.colors[2].code }}
                  >
                    Texto Accent
                  </div>

                  {/* Elemento Neutral */}
                  <div 
                    className="px-4 py-2 rounded-lg font-medium text-white"
                    style={{ backgroundColor: option.colors[3].code }}
                  >
                    Elemento Neutral
                  </div>
                </div>
              </div>

              {/* Simulación de Navbar */}
              <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="h-4 w-full"
                  style={{ backgroundColor: option.colors[0].code }}
                ></div>
                <div className="bg-white p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-6 bg-gray-300 rounded"></div>
                    <span 
                      className="font-medium"
                      style={{ color: option.colors[2].code }}
                    >
                      V7 Marketplace
                    </span>
                  </div>
                  <button 
                    className="px-3 py-1 text-sm rounded-md font-medium text-white"
                    style={{ backgroundColor: option.colors[1].code }}
                  >
                    Cotizar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>💡 <strong>Tip:</strong> Cada opción muestra cómo se vería aplicada en el navbar y botones</p>
        </div>
      </div>
    </div>
  );
}