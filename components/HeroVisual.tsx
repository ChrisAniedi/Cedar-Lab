'use client';

import { useEffect, useState } from 'react';
import styles from './HeroVisual.module.css';

const REVS = ['$48,240', '$48,891', '$47,550', '$49,100'];
const USERS = ['1,284', '1,291', '1,278', '1,302'];
const PH_REVS = ['$48.2k', '$49.1k', '$47.8k', '$50.3k'];
const PH_USERS = ['1.2k', '1.3k', '1.28k', '1.31k'];
const BUILDS = ['Checkout flow', 'AI dashboard', 'Mobile app', 'Booking system', 'Analytics API'];

export default function HeroVisual() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((prev) => (prev + 1) % REVS.length), 2800);
    return () => clearInterval(id);
  }, []);

  const building = BUILDS[Math.floor(i / 2) % BUILDS.length];

  return (
    <div
      className={styles.bsw}
      role="img"
      aria-label="Phone frame with a mobile dashboard beside a stacked card composition showing an AI support agent and live analytics"
    >
      <div className={styles.scene}>
        {/* PHONE */}
        <div className={styles.phone}>
          <div className={styles.phoneNotch} />
          <div className={styles.phoneScreen}>
            <div className={styles.phHeader}>
              <div className={styles.phAv}>BS</div>
              <div>
                <div className={styles.phName}>BuildSprint</div>
                <div className={styles.phRole}>Mobile dashboard</div>
              </div>
            </div>
            <div className={styles.phDiv} />
            <div className={styles.phRow}>
              <span className={styles.phLbl}>Revenue</span>
              <span className={`${styles.phVal} ${styles.g}`}>{PH_REVS[i]}</span>
            </div>
            <div className={styles.phBarT}><div className={styles.phBar} style={{ width: '74%' }} /></div>
            <div className={styles.phSg}>
              <div className={styles.phSb}>
                <div className={styles.phSn}>{PH_USERS[i]}</div>
                <div className={styles.phSl}>Users</div>
              </div>
              <div className={styles.phSb}>
                <div className={styles.phSn} style={{ color: '#AAEF5A' }}>6.4%</div>
                <div className={styles.phSl}>Conv.</div>
              </div>
            </div>
            <div className={styles.phChart}>
              {['40%', '58%', '35%', '72%', '50%', '88%'].map((h, idx) => (
                <div key={idx} className={`${styles.phCb}${idx === 5 ? ` ${styles.a}` : ''}`} style={{ height: h }} />
              ))}
            </div>
            <div className={styles.phBadge}>
              <div className={styles.phBd} />
              <div className={styles.phBt}>LIVE</div>
            </div>
          </div>
        </div>

        {/* CARD STACK */}
        <div className={styles.stack}>
          {/* BACK: logistics */}
          <div className={`${styles.card} ${styles.cBack}`}>
            <div className={styles.row} style={{ marginBottom: 8 }}>
              <div className={styles.dot} style={{ opacity: 0.5 }} />
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Fleet · Live</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.5)', fontFamily: "'Courier New',monospace" }}>24</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.22)' }}>vehicles on route</span>
            </div>
            <div className={styles.bars}>
              {['42%', '60%', '38%', '75%', '52%', '88%'].map((h, idx) => (
                <div key={idx} className={`${styles.bar}${idx === 5 ? ` ${styles.a}` : ''}`} style={{ height: h }} />
              ))}
            </div>
          </div>

          {/* MID: AI agent */}
          <div className={`${styles.card} ${styles.cMid}`}>
            <div className={styles.row} style={{ marginBottom: 10 }}>
              <div className={`${styles.dot} ${styles.dpulse}`} style={{ background: '#6399FF' }} />
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>AI Support Agent</span>
              <span className={`${styles.tag} ${styles.tb}`} style={{ marginLeft: 'auto' }}>Active</span>
            </div>
            <div className={styles.msgU}>
              <div className={styles.msgTxt}>Payment failed but I was still charged</div>
            </div>
            <div className={styles.msgA}>
              <div className={styles.msgLbl}>Agent</div>
              <div className={styles.msgTxt}>Refund of <span className={styles.hl}>$49.00</span> initiated — arrives in <span className={styles.hl}>2–3 days</span>.</div>
            </div>
            <div className={styles.tdots}>
              <span /><span /><span />
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginLeft: 4 }}>handling next ticket…</span>
            </div>
          </div>

          {/* FRONT: analytics */}
          <div className={`${styles.card} ${styles.cFront}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', marginBottom: 3 }}>Revenue · This month</div>
                <div className={styles.ticker}>{REVS[i]}</div>
              </div>
              <span className={`${styles.tag} ${styles.tg}`}>+24%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 40 }}>
              {['40%', '56%', '34%', '70%', '50%', '65%', '88%'].map((h, idx) => (
                <div key={idx} style={{ flex: 1, height: h, borderRadius: '3px 3px 0 0', background: idx === 6 ? '#AAEF5A' : 'rgba(170,239,90,0.13)' }} />
              ))}
            </div>
            <div className={styles.divr} />
            <div className={styles.srow}>
              <div className={styles.sbox}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.32)', marginBottom: 4 }}>New users</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: "'Courier New',monospace" }}>{USERS[i]}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>↑ 18% vs last mo</div>
              </div>
              <div className={styles.sbox}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.32)', marginBottom: 4 }}>Conversion</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#AAEF5A', fontFamily: "'Courier New',monospace" }}>6.4%</div>
                <div className={styles.bt} style={{ marginTop: 5 }}><div className={styles.bf} style={{ width: '64%' }} /></div>
              </div>
            </div>
          </div>

          {/* PILL */}
          <div className={styles.pill}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div className={`${styles.dot} ${styles.dpulse}`} />
              <div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', lineHeight: 1.2 }}>Now building</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{building}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
