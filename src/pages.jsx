import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero.jsx';
import { Page, PageHero, Heading, CtaBand, Icon, Count, LazyVideo, VideoShowcase } from './shared.jsx';
import { PHONE, PHONE_HREF, areas } from './data.js';
import { stats, about, credentials, triage, services, steps, categories, classes, sectors, jobs, reviews, areaPins, faqs, areaOptions, reel, pillars, signs, causes } from './mock.js';

/* ---------- reusable blocks ---------- */
function StepsGrid() {
  return (
    <div className="steps">
      {steps.map((s, i) => (
        <div className="stepcard fx rv" key={s.title} style={{ transitionDelay: `${i * 80}ms` }}>
          <span className="num">0{i + 1}</span>
          <span className="time">{s.time}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

function ServiceCard({ s }) {
  return (
    <article className="card svc fx rv">
      <div className="duo"><img src={s.img} alt="" loading="lazy" /></div>
      <div className="svcbody">
        <h3>{s.title}</h3>
        <p>{s.text}</p>
      </div>
    </article>
  );
}

function Reviews() {
  return (
    <div className="reviews">
      {reviews.map((r) => (
        <figure className="card fx rv" key={r.name}>
          <blockquote>“{r.text}”</blockquote>
          <figcaption>{r.name} · {r.area}<em>Sample review</em></figcaption>
        </figure>
      ))}
    </div>
  );
}

function AreaChips() {
  return <div className="chips">{areas.map((a) => <span key={a}>{a}</span>)}</div>;
}

function MapCard() {
  return (
    <div className="island rv">
      <svg viewBox="0 0 400 320" role="img" aria-label="Map of Maui with service locations">
        <path d="M60 110 C70 70 110 60 140 80 C165 95 175 130 200 140 C225 110 260 100 290 130 C330 150 350 200 330 240 C305 280 250 285 215 260 C190 240 170 245 150 235 C110 215 50 170 60 110Z" fill="rgba(58,184,198,.12)" stroke="#3ab8c6" strokeOpacity=".7" strokeWidth="1.2" />
        {areaPins.map((p) => (
          <g className="pin" key={p.name}>
            <circle cx={p.x} cy={p.y} r="4" />
            <text x={p.x + 9} y={p.y + 4}>{p.name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const MockNote = ({ children }) => <p className="mock-note">{children}</p>;

/* ---------- HOME ---------- */
export function Home() {
  return (
    <>
      <Hero />
      <Page title="Wai Ola Restoration | 24/7 Water Mitigation & Restoration in Maui, HI" description="24/7 emergency water damage mitigation across Maui: extraction, structural drying, mold remediation and insurance-ready documentation.">
        <section className="strip">
          <div className="wrap rv">
            <div className="statgrid">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <strong>{s.text ? s.text : <Count {...s} />}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <ul className="creds">{credentials.map((x) => <li key={x}>{x}</li>)}</ul>
            <MockNote>Sample figures and credentials for the mockup. Replace with verified client data.</MockNote>
          </div>
        </section>

        <section>
          <div className="wrap">
            <Heading eyebrow="Why choose us" sub="The three things that decide how much of your property you keep after a water loss.">Built around speed, proof and paperwork.</Heading>
            <div className="pillars">
              {pillars.map((p, i) => (
                <article className="pillar fx rv" key={p.title} style={{ transitionDelay: `${i * 90}ms` }}>
                  <span className="ic"><Icon name={p.icon} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <Heading eyebrow="Services" sub="One team from the first call to the final moisture reading.">What we do.</Heading>
            <div className="bento">{services.map((s) => <ServiceCard key={s.title} s={s} />)}</div>
            <div className="more rv"><Link className="btn g" to="/services">Service details →</Link></div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <Heading eyebrow="Warning signs" sub="Water damage is not always a flood. These are the quiet signs that it is already happening.">When to call a professional.</Heading>
            <div className="signs">
              {signs.map((s, i) => (
                <div className="sign fx rv" key={s.title} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                  <span className="ic"><Icon name={s.icon} /></span>
                  <div><h3>{s.title}</h3><p>{s.text}</p></div>
                </div>
              ))}
            </div>
            <div className="more rv"><Link className="btn g" to="/emergency">Emergency steps →</Link></div>
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <Heading eyebrow="How it works" sub="A defined sequence from first call to dry standard.">The first 72 hours.</Heading>
            <StepsGrid />
            <div className="more rv"><Link className="btn g" to="/process">See the full process →</Link></div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <Heading eyebrow="On the job" sub="Short clips of the work itself: finding the source, fixing it and cleaning up.">See how we work.</Heading>
            <VideoShowcase items={reel} />
          </div>
        </section>

        <section className="alt">
          <div className="wrap causesgrid">
            <div className="rv">
              <div className="eyebrow">Local knowledge</div>
              <h2>What causes water damage in Maui.</h2>
              <p className="sub">Island conditions create problems mainland crews do not see every day. Knowing the cause is how we make sure it does not come back.</p>
            </div>
            <ol className="causes">
              {causes.map((c, i) => (
                <li className="rv" key={c.title} style={{ transitionDelay: `${i * 60}ms` }}>
                  <span>0{i + 1}</span>
                  <div><h3>{c.title}</h3><p>{c.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section>
          <div className="wrap">
            <Heading eyebrow="Projects" sub="Recent jobs with the result measured and documented.">Completed work.</Heading>
            <div className="jobs">
              {jobs.map((j) => (
                <article className="job fx rv" key={j.title}>
                  <div className="duo jobimg"><img src={j.img} alt="" loading="lazy" /><span className="tag">{j.tag}</span></div>
                  <div className="jobbody">
                    <small>{j.type}</small>
                    <h3>{j.title}</h3>
                    <div className="jobmeta"><b>{j.result}</b><span>{j.note}</span></div>
                  </div>
                </article>
              ))}
            </div>
            <div className="more rv"><Link className="btn g" to="/projects">All projects →</Link></div>
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <div className="teaser rv">
              <div>
                <div className="eyebrow">Emergency help</div>
                <h2>Water damage right now?</h2>
                <p className="sub">Pick your type of loss for the safety steps to take while a crew is on the way.</p>
              </div>
              <div className="ctabtns">
                <Link className="btn p" to="/emergency">Get emergency steps</Link>
                <a className="btn g" href={PHONE_HREF}>Call {PHONE}</a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap mapgrid">
            <div className="rv">
              <div className="eyebrow">Service area</div>
              <h2>Island-wide<br />coverage.</h2>
              <p className="sub">Crews are staged across Maui to keep response times short.</p>
              <AreaChips />
              <div className="more left"><Link className="btn g" to="/areas">Coverage details →</Link></div>
            </div>
            <MapCard />
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <Heading eyebrow="Client feedback">What property owners say.</Heading>
            <Reviews />
          </div>
        </section>

        <section>
          <div className="wrap narrow">
            <Heading eyebrow="FAQ" center>Quick answers.</Heading>
            <div className="faqlist rv">
              {faqs.slice(0, 4).map(([q, a], i) => (
                <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
            <div className="more rv" style={{ textAlign: 'center' }}><Link className="btn g" to="/faq">All questions →</Link></div>
          </div>
        </section>

        <CtaBand />
      </Page>
    </>
  );
}

/* ---------- SERVICES ---------- */
export function Services() {
  return (
    <Page title="Water Damage Services | Wai Ola Restoration" description="Disaster recovery, flood and water extraction, mold remediation, odor control, trauma scene cleanup and post-loss cleaning on Maui.">
      <PageHero title="Services" sub="Mitigation and restoration under one accountable team, from the first call to the final moisture reading." />
      <section>
        <div className="wrap">
          <div className="bento">{services.map((s) => <ServiceCard key={s.title} s={s} />)}</div>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <Heading eyebrow="Who we serve">Residential and commercial properties.</Heading>
          <div className="sectors">
            {sectors.map((s, i) => (
              <div className="sector rv" key={s.title} style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="idx">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}

/* ---------- PROCESS ---------- */
export function Process() {
  return (
    <Page title="Our Water Damage Process | Wai Ola Restoration" description="The first 72 hours of a water damage job: dispatch, extraction, structural drying, verification and documentation.">
      <PageHero title="Process" sub="A defined sequence from first call to dry standard, with documentation at every stage." />
      <section>
        <div className="wrap">
          <StepsGrid />
          <VideoShowcase items={reel} />
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <Heading eyebrow="Industry standards" sub="Every job is classified by contamination level and drying difficulty, as used across the water-damage industry (ANSI/IICRC S500).">
            Category and class<br />classification.
          </Heading>
          <div className="tables">
            <div className="tbl fx rv">
              <h3>Water category</h3>
              <table>
                <thead><tr><th>Category</th><th>Source</th><th>Typical cause</th></tr></thead>
                <tbody>
                  {categories.map((r) => (
                    <tr key={r.cat}><td><b>{r.cat}</b></td><td>{r.source}</td><td>{r.example}<small>{r.note}</small></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="tbl fx rv">
              <h3>Damage class</h3>
              <table>
                <thead><tr><th>Class</th><th>Description</th></tr></thead>
                <tbody>
                  {classes.map((r) => (
                    <tr key={r.cls}><td><b>{r.cls}</b></td><td>{r.text}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}

/* ---------- PROJECTS ---------- */
export function Projects() {
  return (
    <Page title="Completed Projects | Wai Ola Restoration" description="Recent water damage mitigation projects on Maui with documented, measured results.">
      <PageHero title="Projects" sub="Recent jobs with the result measured and documented." />
      <section>
        <div className="wrap">
          <div className="jobs">
            {jobs.map((j) => (
              <article className="job fx rv" key={j.title}>
                <div className="duo jobimg"><img src={j.img} alt="" loading="lazy" /><span className="tag">{j.tag}</span></div>
                <div className="jobbody">
                  <small>{j.type}</small>
                  <h3>{j.title}</h3>
                  <div className="jobmeta"><b>{j.result}</b><span>{j.note}</span></div>
                </div>
              </article>
            ))}
          </div>
          <MockNote>Sample projects. Replace with real project photos and measured results.</MockNote>
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}

/* ---------- AREAS ---------- */
export function Areas() {
  return (
    <Page title="Service Areas on Maui | Wai Ola Restoration" description="Water damage response across South Side, Central Maui, West Maui, the North Shore and Upcountry.">
      <PageHero title="Service area" crumb="Areas" sub="Crews are staged across Maui to keep response times short, which limits how far water travels through a structure." />
      <section className="areasec">
        <div className="duo bgvid"><LazyVideo src="/media/ocean.mp4" /></div>
        <div className="wrap mapgrid">
          <div className="rv">
            <h2>We cover<br />all of Maui.</h2>
            <AreaChips />
            <ul className="regions">
              <li><b>South Side</b><span>Kihei, Wailea</span></li>
              <li><b>Central Maui</b><span>Kahului, Wailuku</span></li>
              <li><b>West Maui</b><span>Lahaina</span></li>
              <li><b>North Shore</b><span>Paia</span></li>
              <li><b>Upcountry</b><span>Makawao, Kula, Haiku, Pukalani</span></li>
            </ul>
          </div>
          <MapCard />
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}

/* ---------- ABOUT ---------- */
export function About() {
  return (
    <Page title="About | Wai Ola Restoration" description="Family-owned, Maui-based water damage mitigation and restoration team.">
      <PageHero title="About us" crumb="About" sub={about.text} />
      <section>
        <div className="wrap">
          <Heading eyebrow="Why us">{about.title}</Heading>
          <ul className="checks rv">
            {about.points.map((p) => <li key={p}>{p}</li>)}
            <li>Direct coordination with your adjuster</li>
            <li>Time-stamped daily moisture readings</li>
          </ul>
        </div>
      </section>
      <section className="alt">
        <div className="wrap">
          <Heading eyebrow="Client feedback">What property owners say.</Heading>
          <Reviews />
        </div>
      </section>
      <CtaBand />
    </Page>
  );
}

/* ---------- FAQ ---------- */
export function Faq() {
  return (
    <Page title="Water Damage FAQ | Wai Ola Restoration" description="Answers about water damage, mold, drying times, insurance and service areas in Maui.">
      <PageHero title="Frequently asked questions" crumb="FAQ" sub="Straight answers to the questions we hear most." />
      <section>
        <div className="wrap narrow">
          <div className="faqlist rv">
            {faqs.map(([q, a], i) => (
              <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Still have a question?" text="Call us any time. A live person answers." />
    </Page>
  );
}

/* ---------- EMERGENCY HELP ---------- */
export function Emergency() {
  const [tri, setTri] = useState(0);
  const c = triage[tri];
  return (
    <Page title="Emergency Water Damage Steps | Wai Ola Restoration" description="Immediate safety steps for burst pipes, flooding, appliance leaks, sewage backups and commercial water loss.">
      <PageHero title="Emergency help" sub="Select the type of loss to see immediate safety steps while a crew is dispatched." />
      <section>
        <div className="wrap">
          <div className="triage rv">
            <div className="opts">
              {triage.map((t, i) => (
                <button key={t.title} type="button" className={`opt${i === tri ? ' on' : ''}`} onClick={() => setTri(i)}>
                  <span className="ic"><Icon name={t.icon} /></span>
                  <span><strong>{t.title}</strong><small>{t.sub}</small></span>
                </button>
              ))}
            </div>
            <div className="result" key={tri}>
              <span className="warn">Safety note: {c.warn}</span>
              <h3>{c.head}</h3>
              <ol>{c.steps.map((s) => <li key={s}>{s}</li>)}</ol>
              <a className="btn p" href={PHONE_HREF}>Dispatch a crew · {PHONE}</a>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

/* ---------- CONTACT ---------- */
export function Contact() {
  return (
    <Page title="Contact | Wai Ola Restoration" description="Request a crew or call our 24/7 emergency line for water damage on Maui.">
      <PageHero title="Contact" sub="Call for emergencies, or send a request below and a crew lead will call you back." />
      <section className="final">
        <div className="wrap">
          <div className="rv">
            <div className="eyebrow">24/7 emergency dispatch</div>
            <a className="bigcall" href={PHONE_HREF}>{PHONE}</a>
            <p className="sub">Staffed around the clock, every day of the year.</p>
          </div>
        </div>
      </section>
    </Page>
  );
}
