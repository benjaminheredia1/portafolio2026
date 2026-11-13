import PipeScene from "../components/PipeScene";
import ScrollFX from "../components/ScrollFX";

const TICKS = Array.from({ length: 13 }, (_, i) => i);

function Gauge({ name, cls }: { name: string; cls: string }) {
  return (
    <figure className={`gauge ${cls}`}>
      <svg viewBox="0 0 100 100" focusable="false">
        <circle className="g-rim" cx="50" cy="50" r="48" />
        <circle className="g-face" cx="50" cy="50" r="41" />
        <path className="g-glare" d="M14 44A37 37 0 0 1 86 44C70 36 30 36 14 44Z" />
        {TICKS.map((i) => {
          const a = ((-120 + i * 20) * Math.PI) / 180;
          const major = i % 3 === 0;
          const r1 = 36;
          const r2 = major ? 27 : 31;
          const x = (r: number) => (50 + Math.sin(a) * r).toFixed(2);
          const y = (r: number) => (50 - Math.cos(a) * r).toFixed(2);
          return (
            <line
              key={i}
              className={major ? "g-tick major" : "g-tick"}
              x1={x(r1)}
              y1={y(r1)}
              x2={x(r2)}
              y2={y(r2)}
            />
          );
        })}
        <g className="needle">
          <line className="g-needle-line" x1="50" y1="54" x2="50" y2="17" />
        </g>
        <circle className="g-hub" cx="50" cy="50" r="5" />
      </svg>
      <figcaption>{name}</figcaption>
    </figure>
  );
}

function Tokens({ items }: { items: string[] }) {
  return (
    <>
      {items.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </>
  );
}

const VOICE_CHAIN = [
  { tag: "VAD", text: "Detecta cuándo la persona habla y cuándo termina." },
  { tag: "STT", text: "Pasa la voz a texto." },
  {
    tag: "LLM",
    text: "Con tool calling: consulta productos, revisa inventario, calcula precios y arma el pedido en tiempo real sobre la interfaz del sistema.",
  },
  { tag: "TTS", text: "Devuelve la respuesta hablada." },
];

export default function Home() {
  return (
    <>
      <PipeScene />
      <ScrollFX />

      <div className="page">
        <div className="spine" data-anchor="spine" aria-hidden="true" />

        <header className="hero">
          <div className="instruments" aria-hidden="true">
            <Gauge name="Señal" cls="g-signal" />
            <Gauge name="Recorrido" cls="g-run" />
            <Gauge name="Carga" cls="g-load" />
            <div className="lamps">
              <span className="lamp green" />
              <span className="lamp green" />
              <span className="lamp amber" />
            </div>
          </div>

          <div className="hero-pipe" data-anchor="hero-pipe">
            <h1>
              <span>Benjamin</span> <span>Heredia</span>
            </h1>
          </div>

          <div className="hero-foot">
            <p className="role">Full-stack · IA en producción</p>
            <p className="place">
              <span>Ingeniero de sistemas</span>
              <span className="sep"> · </span>
              <span>Santa Cruz de la Sierra · Bolivia</span>
            </p>
          </div>
        </header>

        <main className="line">
          <section aria-labelledby="oficio">
            <h2 id="oficio" className="big" data-aos="plate">
              Una señal, varios sistemas y una persona al final
            </h2>
            <div className="prose" data-aos="stage">
              <p>
                Construyo el sistema completo y le pongo IA que trabaja en
                producción: un agente de voz que atiende kioscos de
                autoservicio, una IA por WhatsApp que vende, asesora y escala a
                una persona cuando hace falta, flujos de n8n que reemplazan
                trabajo manual.
              </p>
              <p>
                También sistemas de salud, ERP y plataformas académicas, con
                refactor de código legado.
              </p>
            </div>
            <dl className="fittings" data-aos="stage">
              <div>
                <dt>Backend</dt>
                <dd>
                  <Tokens
                    items={["Laravel", "NestJS", "Express.js", "Django", "Python"]}
                  />
                </dd>
              </div>
              <div>
                <dt>Frontend</dt>
                <dd>
                  <Tokens
                    items={["React", "Next.js", "Vue.js", "Angular", "Flutter"]}
                  />
                </dd>
              </div>
              <div>
                <dt>IA y automatización</dt>
                <dd>
                  <Tokens
                    items={[
                      "LLM con tool calling",
                      "LangChain",
                      "GPT-4",
                      "n8n",
                      "Make",
                      "agentes de voz",
                    ]}
                  />
                </dd>
              </div>
              <div>
                <dt>Datos e infraestructura</dt>
                <dd>
                  <Tokens
                    items={["PostgreSQL", "MySQL", "Docker", "dokploy", "AWS"]}
                  />
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="recorrido">
            <h2 id="recorrido" className="big" data-aos="plate">
              Recorrido
            </h2>

            <article className="stage" data-aos="stage">
              <header className="stage-head">
                <div>
                  <h3 className="company">trabajito</h3>
                  <p className="role-line">Full-stack developer</p>
                  <p className="meta">Sep 2026 – hoy · Santa Cruz, Bolivia</p>
                </div>
                <span className="tag" data-flange>
                  2026
                </span>
              </header>
            </article>

            <article className="stage" data-aos="stage">
              <header className="stage-head">
                <div>
                  <h3 className="company">Nexus Patio Tech</h3>
                  <p className="role-line">AI Software Engineer</p>
                  <p className="meta">Abr – Sep 2026 · Santa Cruz, Bolivia</p>
                </div>
                <span className="tag" data-flange>
                  2026
                </span>
              </header>
              <p className="prose" style={{ marginTop: 20, maxWidth: "62ch" }}>
                Agente de voz para kioscos de autoservicio, de punta a punta:
              </p>
              <ol className="chain">
                {VOICE_CHAIN.map((s) => (
                  <li key={s.tag} data-aos="stage">
                    <span className="tag" data-flange>
                      {s.tag}
                    </span>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
              <ul className="points">
                <li>
                  IA conversacional por WhatsApp para ventas y soporte: atiende,
                  asesora y califica clientes todo el día y escala a una persona
                  según la intención de compra.
                </li>
                <li>
                  Automatizaciones en n8n entre los sistemas del cliente.
                </li>
                <li>
                  Estrategia de despliegue (nube, on-premise o híbrida) según la
                  latencia, la privacidad y el costo de cada cliente, con Docker
                  y dokploy.
                </li>
              </ul>
            </article>

            <article className="stage" data-aos="stage">
              <header className="stage-head">
                <div>
                  <h3 className="company">Nexus Patio Tech</h3>
                  <p className="role-line">Back End Developer</p>
                  <p className="meta">Feb – Jun 2026 · Santa Cruz, Bolivia</p>
                </div>
                <span className="tag" data-flange>
                  2026
                </span>
              </header>
              <ul className="points">
                <li>Servicios backend con Express.js sobre PostgreSQL y MySQL.</li>
                <li>
                  APIs REST e integraciones con pagos, WhatsApp Business y ERP.
                </li>
              </ul>
            </article>

            <article className="stage" data-aos="stage">
              <header className="stage-head">
                <div>
                  <h3 className="company">PuntoCom SRL</h3>
                  <p className="role-line">AI Automation Developer</p>
                  <p className="meta">Ene 2025 – Feb 2026 · Montero, Santa Cruz</p>
                </div>
                <span className="tag" data-flange>
                  2025
                </span>
              </header>
              <ul className="points">
                <li>
                  Automatización con IA que reemplazó trabajo manual de
                  oficina, con flujos de n8n en producción.
                </li>
                <li>
                  LLM (GPT-4) integrados para clasificar, rutear y responder.
                </li>
                <li>
                  Lógica de decisión que separa lo que resuelve el modelo de lo
                  que escala a una persona.
                </li>
                <li>
                  Flujos documentados y entregados para que el equipo los
                  mantenga sin ayuda de desarrollo.
                </li>
              </ul>
            </article>

            <article className="stage" data-aos="stage">
              <header className="stage-head">
                <div>
                  <h3 className="company">Desarrollamelo</h3>
                  <p className="role-line">Full-Stack Developer</p>
                  <p className="meta">Jun 2024 – Ene 2025 · Remoto</p>
                </div>
                <span className="tag" data-flange>
                  2024
                </span>
              </header>
              <ul className="points">
                <li>
                  Contratado a tiempo completo tras la pasantía. Sistemas web a
                  medida para clientes de agencia, del concepto a producción,
                  con Laravel.
                </li>
                <li>
                  Último nivel de escalamiento de soporte técnico: diagnosticar
                  y corregir en código los errores que soporte no podía
                  resolver.
                </li>
              </ul>
            </article>

            <article className="stage" data-aos="stage">
              <header className="stage-head">
                <div>
                  <h3 className="company">Desarrollamelo</h3>
                  <p className="role-line">Web Developer · pasantía</p>
                  <p className="meta">Ene – Jun 2024 · Remoto</p>
                </div>
                <span className="tag" data-flange>
                  2024
                </span>
              </header>
              <ul className="points">
                <li>
                  Módulos en Laravel y PHP para sistemas de clientes de agencia,
                  100 % remoto desde el primer día.
                </li>
                <li>
                  Resolución de tickets de soporte en sistemas en producción.
                </li>
              </ul>
            </article>
          </section>

          <section aria-labelledby="encargos">
            <header className="stage-head">
              <h2 id="encargos" className="big" data-aos="plate">
                Encargos
              </h2>
              <span className="tag" data-flange>
                Freelance
              </span>
            </header>
            <ul className="jobs" data-aos="stage">
              <li>
                <h3>Boring Ventures</h3>
                <p>Cochabamba. Fullstack AI Engineer con Next.js y Supabase.</p>
              </li>
              <li>
                <h3>Rocaz Soluciones</h3>
                <p>
                  Servidores en Hostinger, Laravel y MySQL. Mantenimiento de
                  código sin documentar.
                </p>
              </li>
              <li>
                <h3>UTEPSA</h3>
                <p>
                  Mesa de ayuda y luego sistemas académicos con Vue, React,
                  Laravel y Python. Automatizaciones con n8n y Selenium,
                  LangChain y Google SDK.
                </p>
              </li>
            </ul>
          </section>

          <section className="contacto" aria-labelledby="contacto">
            <div className="branch-run" data-anchor="branch-run" aria-hidden="true" />
            <h2 id="contacto" data-aos="plate">
              A persona
            </h2>
            <p className="lead" data-aos="stage">
              Si tienes un sistema, un bot o una automatización por resolver, o
              buscas a alguien que lo ponga en producción, escríbeme.
            </p>
            <div className="reach" data-aos="stage">
              <a
                data-valve
                href="https://www.linkedin.com/in/pablobenjaminheredia"
                rel="noopener"
              >
                LinkedIn
              </a>
              <a data-valve href="https://linktr.ee/benjaminheredia" rel="noopener">
                Todos mis canales
              </a>
            </div>
            <p className="langs">
              Español nativo · Inglés A2 · Ingeniería en sistemas, UTEPSA
            </p>
            <p className="foot">Benjamin Heredia · Santa Cruz de la Sierra · 2026</p>
          </section>
        </main>
      </div>
    </>
  );
}
