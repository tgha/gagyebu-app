export default function BottomScene() {
  return (
    <div style={{ width: '100%', maxWidth: '540px', margin: '0 auto' }}>
      <svg
        viewBox="0 0 540 220"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', borderRadius: '20px', display: 'block' }}
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffc8dc" />
            <stop offset="100%" stopColor="#fff5f8" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d4e8a0" />
            <stop offset="100%" stopColor="#b8d478" />
          </linearGradient>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c8b89a" />
            <stop offset="100%" stopColor="#a89070" />
          </linearGradient>
        </defs>

        {/* 하늘 배경 */}
        <rect width="540" height="220" fill="url(#sky)" />

        {/* 멀리 보이는 산 */}
        <ellipse cx="80"  cy="150" rx="110" ry="55" fill="#f0b8cc" opacity="0.45" />
        <ellipse cx="430" cy="145" rx="130" ry="60" fill="#e8a8c0" opacity="0.45" />
        <ellipse cx="270" cy="140" rx="100" ry="45" fill="#f4c0d0" opacity="0.35" />

        {/* 잔디 / 지면 */}
        <rect x="0" y="172" width="540" height="48" fill="url(#ground)" />

        {/* 돌담 - 경복궁 스타일 */}
        {/* 돌담 기둥 (경복궁 특유의 큰 돌) */}
        <rect x="0"   y="130" width="540" height="44" fill="url(#wall)" />

        {/* 돌담 돌 무늬 - 1행 */}
        {[0, 55, 110, 165, 220, 275, 330, 385, 440, 495].map((x, i) => (
          <rect key={`s1-${i}`} x={x + 2} y="132" width="51" height="18"
            fill={i % 2 === 0 ? '#b8a888' : '#c4b094'}
            rx="1" stroke="#9a8060" strokeWidth="0.5" />
        ))}
        {/* 돌담 돌 무늬 - 2행 (오프셋) */}
        {[-26, 29, 84, 139, 194, 249, 304, 359, 414, 469, 524].map((x, i) => (
          <rect key={`s2-${i}`} x={x + 2} y="152" width="51" height="18"
            fill={i % 2 === 0 ? '#c4b094' : '#b8a888'}
            rx="1" stroke="#9a8060" strokeWidth="0.5" />
        ))}

        {/* 돌담 상단 테두리 돌 */}
        <rect x="0" y="126" width="540" height="8" fill="#d0c0a0" />
        {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520].map((x, i) => (
          <rect key={`top-${i}`} x={x + 1} y="124" width="37" height="6"
            fill={i % 2 === 0 ? '#ddd0b0' : '#c8b898'}
            rx="1" stroke="#b0a080" strokeWidth="0.3" />
        ))}

        {/* 왼쪽 벚꽃나무 */}
        <rect x="42" y="80" width="10" height="55" fill="#8b6347" rx="3" />
        <circle cx="47" cy="72" r="30" fill="#ffb7c5" opacity="0.85" />
        <circle cx="30" cy="80" r="20" fill="#ffc8d4" opacity="0.75" />
        <circle cx="65" cy="78" r="22" fill="#ffadc0" opacity="0.75" />
        <circle cx="47" cy="58" r="18" fill="#ffd0dc" opacity="0.7" />
        {/* 벚꽃 꽃잎 */}
        {['🌸','🌸','🌸','🌸'].map((e, i) => (
          <text key={i} x={22 + i * 14} y={95 + (i % 2) * 8} fontSize="10">{e}</text>
        ))}

        {/* 오른쪽 벚꽃나무 */}
        <rect x="485" y="75" width="10" height="60" fill="#8b6347" rx="3" />
        <circle cx="490" cy="66" r="32" fill="#ffb7c5" opacity="0.85" />
        <circle cx="470" cy="74" r="22" fill="#ffc8d4" opacity="0.75" />
        <circle cx="510" cy="72" r="20" fill="#ffadc0" opacity="0.75" />
        <circle cx="490" cy="50" r="18" fill="#ffd0dc" opacity="0.7" />
        {['🌸','🌸','🌸'].map((e, i) => (
          <text key={i} x={468 + i * 14} y={90 + (i % 2) * 8} fontSize="10">{e}</text>
        ))}

        {/* 중간 작은 벚나무 */}
        <rect x="148" y="100" width="7" height="32" fill="#8b6347" rx="2" />
        <circle cx="151" cy="94" r="20" fill="#ffb7c5" opacity="0.7" />
        <circle cx="138" cy="100" r="13" fill="#ffc8d4" opacity="0.6" />
        <circle cx="164" cy="98" r="14" fill="#ffadc0" opacity="0.6" />

        <rect x="388" y="104" width="7" height="28" fill="#8b6347" rx="2" />
        <circle cx="391" cy="98" r="18" fill="#ffb7c5" opacity="0.7" />
        <circle cx="378" cy="104" r="12" fill="#ffc8d4" opacity="0.6" />
        <circle cx="404" cy="102" r="13" fill="#ffadc0" opacity="0.6" />

        {/* 떨어지는 꽃잎들 */}
        <text x="90"  y="115" fontSize="11" opacity="0.8">🌸</text>
        <text x="195" y="125" fontSize="9"  opacity="0.7">🌸</text>
        <text x="310" y="118" fontSize="10" opacity="0.75">🌸</text>
        <text x="430" y="120" fontSize="9"  opacity="0.7">🌸</text>
        <text x="130" y="145" fontSize="8"  opacity="0.6">🌸</text>
        <text x="370" y="140" fontSize="8"  opacity="0.6">🌸</text>

        {/* 커플 실루엣 - 돌담길을 걷는 행복한 연인 */}
        {/* 여성 (왼쪽) */}
        {/* 머리 */}
        <circle cx="240" cy="147" r="10" fill="#3d2010" />
        {/* 머리카락 */}
        <ellipse cx="240" cy="142" rx="11" ry="7" fill="#2a1508" />
        <path d="M230 145 Q226 155 228 162" stroke="#2a1508" strokeWidth="4" fill="none" />
        <path d="M250 145 Q254 152 252 160" stroke="#2a1508" strokeWidth="3" fill="none" />
        {/* 몸 */}
        <path d="M240 157 Q238 168 236 178" stroke="#3d2010" strokeWidth="7" fill="none" strokeLinecap="round" />
        {/* 치마 */}
        <path d="M236 172 Q230 180 226 188" stroke="#c06080" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M236 172 Q240 182 238 188" stroke="#c06080" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* 왼팔 */}
        <path d="M238 161 Q232 167 234 172" stroke="#3d2010" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* 오른팔 - 남자 손 잡는 쪽 */}
        <path d="M242 161 Q248 165 252 168" stroke="#3d2010" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* 남성 (오른쪽) */}
        {/* 머리 */}
        <circle cx="300" cy="143" r="11" fill="#3d2010" />
        {/* 머리카락 */}
        <ellipse cx="300" cy="138" rx="11" ry="5" fill="#2a1508" />
        {/* 몸 */}
        <path d="M300 154 Q298 167 296 180" stroke="#3d2010" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* 다리 */}
        <path d="M296 174 Q292 182 290 190" stroke="#2a3060" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M298 174 Q302 182 302 190" stroke="#2a3060" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* 왼팔 - 여자 손 잡는 쪽 */}
        <path d="M298 158 Q290 163 284 167" stroke="#3d2010" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* 오른팔 */}
        <path d="M302 158 Q308 165 306 172" stroke="#3d2010" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* 잡은 손 연결 */}
        <path d="M252 168 Q264 171 284 167" stroke="#3d2010" strokeWidth="3.5" fill="none" strokeLinecap="round" />

        {/* 하트 */}
        <text x="260" y="138" fontSize="16" textAnchor="middle">❤️</text>

        {/* 경복궁 글씨 느낌의 작은 장식 - 하단 풀숲 */}
        <ellipse cx="270" cy="186" rx="270" ry="12" fill="#a8c870" opacity="0.5" />

        {/* 작은 꽃들 (지면) */}
        <text x="100" y="192" fontSize="10">🌷</text>
        <text x="200" y="194" fontSize="9">🌼</text>
        <text x="340" y="193" fontSize="9">🌼</text>
        <text x="430" y="191" fontSize="10">🌷</text>
      </svg>
    </div>
  );
}
