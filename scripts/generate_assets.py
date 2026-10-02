import os
import struct
import subprocess

def convert_headshot_to_bmp():
    src_png = "/Users/abhi/Documents/Portfolio/portfolio/public/images/profile.png"
    out_bmp = "/tmp/abhi_profile.bmp"
    subprocess.run(["sips", "-s", "format", "bmp", src_png, "--out", out_bmp], check=True, stdout=subprocess.DEVNULL)
    return out_bmp

def generate_ascii_lines(bmp_path, width=92, height=54):
    with open(bmp_path, 'rb') as f:
        bmp = f.read()

    offset = struct.unpack('<I', bmp[10:14])[0]
    w = 512
    h = 512
    row_bytes = (w * 3 + 3) & ~3

    # Framing: Center on Abhishek's face and upper torso
    crop_x1, crop_x2 = 100, 412
    crop_y1, crop_y2 = 40, 450

    lines = []
    for ty in range(height):
        sy = int(crop_y1 + ty * (crop_y2 - crop_y1) / height)
        row_start = offset + sy * row_bytes
        chars = []
        for tx in range(width):
            sx = int(crop_x1 + tx * (crop_x2 - crop_x1) / width)
            b = bmp[row_start + sx * 3]
            g = bmp[row_start + sx * 3 + 1]
            r = bmp[row_start + sx * 3 + 2]
            lum = 0.299 * r + 0.587 * g + 0.114 * b

            # High-tech HUD tone ramp
            if lum < 28:
                if (tx + ty) % 11 == 0:
                    ch = '.'
                elif (tx * 2 + ty) % 19 == 0:
                    ch = ':'
                else:
                    ch = ' '
            elif lum < 50:
                ch = '.'
            elif lum < 75:
                ch = '-'
            elif lum < 105:
                ch = '='
            elif lum < 135:
                ch = '+'
            elif lum < 170:
                ch = '*'
            elif lum < 210:
                ch = '%'
            else:
                ch = '#'
            chars.append(ch)
        
        # Escape for XML
        raw_str = ''.join(chars)
        escaped_str = raw_str.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        lines.append(escaped_str)
    return lines

def generate_dark_svg(ascii_lines, out_path):
    start_y = 79.98
    step_y = 7.55

    ascii_tspans = []
    for i, line in enumerate(ascii_lines):
        y_pos = f"{start_y + i * step_y:.2f}"
        ascii_tspans.append(f'<tspan x="30" y="{y_pos}" xml:space="preserve">{line}</tspan>')
    ascii_xml = "\n".join(ascii_tspans)

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1180" height="610" viewBox="0 0 1180 610">
<defs>
  <linearGradient id="asciiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#22D3EE">
      <animate attributeName="stop-color" values="#22D3EE;#7C3AED;#38BDF8;#22D3EE" dur="9s" repeatCount="indefinite"/>
    </stop>
    <stop offset="100%" stop-color="#7C3AED">
      <animate attributeName="stop-color" values="#7C3AED;#38BDF8;#22D3EE;#7C3AED" dur="9s" repeatCount="indefinite"/>
    </stop>
  </linearGradient>
  <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#7C3AED"/>
    <stop offset="50%" stop-color="#22D3EE"/>
    <stop offset="100%" stop-color="#10B981"/>
  </linearGradient>
  <radialGradient id="bgGlow" cx="30%" cy="20%" r="80%">
    <stop offset="0%" stop-color="#0B1120"/>
    <stop offset="100%" stop-color="#050816"/>
  </radialGradient>
  <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#22D3EE" stop-opacity="0"/>
    <stop offset="45%" stop-color="#22D3EE" stop-opacity="0.05"/>
    <stop offset="50%" stop-color="#A5F3FC" stop-opacity="0.65"/>
    <stop offset="55%" stop-color="#22D3EE" stop-opacity="0.05"/>
    <stop offset="100%" stop-color="#7C3AED" stop-opacity="0"/>
  </linearGradient>
  <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="4" height="1" fill="#7DD3FC" opacity="0.05"/>
  </pattern>
  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="4" result="blur"/>
    <feMerge>
      <feMergeNode in="blur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
  <mask id="revealMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1180" height="620">
    <rect x="0" y="0" width="1180" height="0" fill="#fff">
      <animate attributeName="height" from="0" to="560" dur="2.6s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1"/>
    </rect>
  </mask>
  <clipPath id="lc0"><rect x="500" y="26.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="0.75s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc1"><rect x="500" y="50.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="0.86s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc2"><rect x="500" y="72.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="0.98s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc3"><rect x="500" y="94.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.09s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc4"><rect x="500" y="116.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.21s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc5"><rect x="500" y="138.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.32s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc6"><rect x="500" y="160.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.44s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc7"><rect x="500" y="182.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.55s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc8"><rect x="500" y="204.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.67s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc9"><rect x="500" y="226.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.78s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc10"><rect x="500" y="248.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.90s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc11"><rect x="500" y="270.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.02s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc12"><rect x="500" y="292.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.13s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc13"><rect x="500" y="314.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.25s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc14"><rect x="500" y="336.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.36s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc15"><rect x="500" y="358.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.48s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc16"><rect x="500" y="380.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.59s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc17"><rect x="500" y="402.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.71s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc18"><rect x="500" y="424.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.82s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc19"><rect x="500" y="446.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.94s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc20"><rect x="500" y="468.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="3.05s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc21"><rect x="500" y="490.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="3.17s" fill="freeze"/></rect></clipPath>
  <style>
    .ascii  {{ font-family: 'Courier New', Consolas, monospace; font-size: 7.4px; fill: url(#asciiGrad); letter-spacing: -0.2px; }}
    .key    {{ font-family: 'Courier New', Consolas, monospace; font-size: 14.5px; fill: #22D3EE; font-weight: bold; }}
    .value  {{ font-family: 'Courier New', Consolas, monospace; font-size: 14.5px; fill: #E5E7EB; }}
    .cc     {{ font-family: 'Courier New', Consolas, monospace; font-size: 14.5px; fill: #475569; }}
    .head   {{ font-family: 'Courier New', Consolas, monospace; font-size: 16.5px; fill: #7C3AED; font-weight: bold; }}
    .accent {{ font-family: 'Courier New', Consolas, monospace; font-size: 14.5px; fill: #10B981; font-weight: bold; }}
    text, tspan {{ white-space: pre; }}
    
    .term-label {{ font-family: 'Courier New', Consolas, monospace; font-size: 12px; fill: #64748B; letter-spacing: 0.5px; }}
    .scan-label {{ font-family: 'Courier New', Consolas, monospace; font-size: 10px; fill: #F87171; letter-spacing: 1px; }}
    .panel-title {{ font-family: 'Courier New', Consolas, monospace; font-size: 11px; fill: #38BDF8; letter-spacing: 2px; opacity: 0.7; }}
    .cursor-blink {{ fill: #22D3EE; }}
  </style>
</defs>

<rect width="1180" height="610" rx="18" fill="url(#bgGlow)"/>

<!-- Terminal Header Bar -->
<circle cx="50" cy="22" r="5.5" fill="#EF4444"/>
<circle cx="68" cy="22" r="5.5" fill="#F59E0B"/>
<circle cx="86" cy="22" r="5.5" fill="#10B981"/>

<text x="590" y="26" text-anchor="middle" class="term-label">abhishek@devos ~ % ./profile.sh --live</text>

<g id="scan-badge">
  <circle cx="1066" cy="22" r="4" fill="#F87171">
    <animate attributeName="opacity" values="1;0.2;1" dur="1.1s" repeatCount="indefinite"/>
  </circle>
  <text x="1076" y="26" class="scan-label">SCANNING</text>
</g>

<!-- Panels -->
<g transform="translate(0,38)">
  <!-- Left Panel: VISUAL.MAP -->
  <rect x="14" y="26" width="488" height="468" rx="14" fill="#0B1120" fill-opacity="0.35" stroke="url(#borderGrad)" stroke-width="1" opacity="0.35"/>
  <rect x="508" y="10" width="655" height="500" rx="14" fill="#0B1120" fill-opacity="0.35" stroke="url(#borderGrad)" stroke-width="1" opacity="0.35"/>
  <text x="30" y="24" class="panel-title">VISUAL.MAP</text>
  <text x="524" y="24" class="panel-title">SYSTEM.INFO</text>

  <g mask="url(#revealMask)">
    <text x="30" y="0" class="ascii">
{ascii_xml}
    </text>
  </g>

  <!-- Right Panel: SYSTEM.INFO -->
  <g clip-path="url(#lc0)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="42" class="head">abhishek@devos</tspan><tspan class="cc"> -——————————————————————————————————————————-—-</tspan></text></g>
  <g clip-path="url(#lc1)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="66" class="cc">. </tspan><tspan class="key">Subject</tspan><tspan class="cc">: .................. </tspan><tspan class="value">Abhishek Bhatnagar</tspan></text></g>
  <g clip-path="url(#lc2)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="88" class="cc">. </tspan><tspan class="key">Role</tspan><tspan class="cc">: ..................... </tspan><tspan class="value">Lead BA &amp; Product Manager (FinTech)</tspan></text></g>
  <g clip-path="url(#lc3)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="110" class="cc">. </tspan><tspan class="key">Origin</tspan><tspan class="cc">: ................... </tspan><tspan class="value">Mumbai &amp; Delhi NCR, India</tspan></text></g>
  <g clip-path="url(#lc4)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="132" class="cc">. </tspan><tspan class="key">Domain</tspan><tspan class="cc">: ................... </tspan><tspan class="value">BFSI • Digital Banking &amp; Lending</tspan></text></g>
  <g clip-path="url(#lc5)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="154" class="cc">. </tspan><tspan class="key">Focus</tspan><tspan class="cc">: .................... </tspan><tspan class="value">LOS/LMS • Underwriting • 100-pt RAM</tspan></text></g>
  <g clip-path="url(#lc6)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="176" class="cc">. </tspan><tspan class="key">ToolChain</tspan><tspan class="cc">: ................ </tspan><tspan class="value">JIRA, Confluence, Figma, Postman, Git</tspan></text></g>
  <g clip-path="url(#lc7)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="198" class="cc">. </tspan></text></g>
  <g clip-path="url(#lc8)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="220" class="cc">. </tspan><tspan class="key">Core</tspan><tspan class="cc">.</tspan><tspan class="key">Banking</tspan><tspan class="cc">: ............. </tspan><tspan class="value">Digital Lending, CAM, MPBF, LOS/LMS</tspan></text></g>
  <g clip-path="url(#lc9)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="242" class="cc">. </tspan><tspan class="key">Core</tspan><tspan class="cc">.</tspan><tspan class="key">Product</tspan><tspan class="cc">: ............. </tspan><tspan class="value">PRDs, BRDs, User Journeys, Backlogs</tspan></text></g>
  <g clip-path="url(#lc10)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="264" class="cc">. </tspan><tspan class="key">Core</tspan><tspan class="cc">.</tspan><tspan class="key">APIs</tspan><tspan class="cc">: ................ </tspan><tspan class="value">REST, Webhooks, Banking Gateways</tspan></text></g>
  <g clip-path="url(#lc11)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="286" class="cc">. </tspan><tspan class="key">Core</tspan><tspan class="cc">.</tspan><tspan class="key">Apps</tspan><tspan class="cc">: ................ </tspan><tspan class="value">Flutter, Dart, TypeScript, Node.js</tspan></text></g>
  <g clip-path="url(#lc12)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="308" class="cc">. </tspan><tspan class="key">Core</tspan><tspan class="cc">.</tspan><tspan class="key">Security</tspan><tspan class="cc">: ............ </tspan><tspan class="value">Zero-Telemetry, RBAC, Encryption</tspan></text></g>
  <g clip-path="url(#lc13)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="330" class="cc">. </tspan></text></g>
  <g clip-path="url(#lc14)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="352" class="accent">- Contact</tspan><tspan class="cc"> -————————————————————————————————————————————-—-</tspan></text></g>
  <g clip-path="url(#lc15)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="374" class="cc">. </tspan><tspan class="key">Grid</tspan><tspan class="cc">.</tspan><tspan class="key">Mail</tspan><tspan class="cc">: ................ </tspan><tspan class="value">abhi.bhatnagar.official@gmail.com</tspan></text></g>
  <g clip-path="url(#lc16)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="396" class="cc">. </tspan><tspan class="key">Grid</tspan><tspan class="cc">.</tspan><tspan class="key">Portfolio</tspan><tspan class="cc">: ........... </tspan><tspan class="value">idea-into-impact.firebaseapp.com</tspan></text></g>
  <g clip-path="url(#lc17)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="418" class="cc">. </tspan><tspan class="key">Grid</tspan><tspan class="cc">.</tspan><tspan class="key">LinkedIn</tspan><tspan class="cc">: ............ </tspan><tspan class="value">abhishek-bhatnagar-44022b131</tspan></text></g>
  <g clip-path="url(#lc18)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="440" class="cc">. </tspan><tspan class="key">Grid</tspan><tspan class="cc">.</tspan><tspan class="key">Github</tspan><tspan class="cc">: .............. </tspan><tspan class="value">bhatnagar-built</tspan></text></g>
  <g clip-path="url(#lc19)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="462" class="cc">. </tspan></text></g>
  <g clip-path="url(#lc20)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="484" class="accent">- Live Telemetry</tspan><tspan class="cc"> -————————————————————————————————————————————-—-</tspan></text></g>
  <g clip-path="url(#lc21)"><text x="520" y="0" fill="#dbeafe"><tspan x="520" y="506" class="cc">. </tspan><tspan class="value">See live GitHub stats badges below in README ↓</tspan></text></g>

  <!-- Cursor Blink -->
  <rect x="522" y="491.0" width="9" height="16" class="cursor-blink" opacity="0">
    <animate attributeName="opacity" values="0;0;1;0;1;0;1;0" keyTimes="0;0.01;0.02;0.3;0.5;0.7;0.85;1" dur="1.4s" begin="3.66s" repeatCount="indefinite"/>
  </rect>
</g>

<!-- Laser Scan Beam -->
<rect x="0" y="-70" width="1180" height="70" fill="url(#scanGrad)" opacity="0.7" style="mix-blend-mode:screen">
  <animateTransform attributeName="transform" type="translate" from="0 -70" to="0 680" dur="4.2s" repeatCount="indefinite"/>
</rect>

<!-- Glowing Pulsing Border -->
<rect x="3" y="3" width="1174" height="604" rx="16" fill="none" stroke="url(#borderGrad)" stroke-width="2" opacity="0.8">
  <animate attributeName="opacity" values="0.5;0.95;0.5" dur="3.2s" repeatCount="indefinite"/>
</rect>
</svg>
'''
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated {out_path} ({len(svg_content)} bytes)")

def generate_light_svg(ascii_lines, out_path):
    start_y = 79.98
    step_y = 7.55

    ascii_tspans = []
    for i, line in enumerate(ascii_lines):
        y_pos = f"{start_y + i * step_y:.2f}"
        ascii_tspans.append(f'<tspan x="30" y="{y_pos}" xml:space="preserve">{line}</tspan>')
    ascii_xml = "\n".join(ascii_tspans)

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1180" height="610" viewBox="0 0 1180 610">
<defs>
  <linearGradient id="asciiGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#4F46E5">
      <animate attributeName="stop-color" values="#4F46E5;#7C3AED;#0EA5E9;#4F46E5" dur="9s" repeatCount="indefinite"/>
    </stop>
    <stop offset="100%" stop-color="#7C3AED">
      <animate attributeName="stop-color" values="#7C3AED;#0EA5E9;#4F46E5;#7C3AED" dur="9s" repeatCount="indefinite"/>
    </stop>
  </linearGradient>
  <linearGradient id="borderGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#7C3AED"/>
    <stop offset="50%" stop-color="#0EA5E9"/>
    <stop offset="100%" stop-color="#059669"/>
  </linearGradient>
  <radialGradient id="bgGlowLight" cx="30%" cy="20%" r="80%">
    <stop offset="0%" stop-color="#F8FAFC"/>
    <stop offset="100%" stop-color="#E2E8F0"/>
  </radialGradient>
  <linearGradient id="scanGradLight" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#0EA5E9" stop-opacity="0"/>
    <stop offset="45%" stop-color="#0EA5E9" stop-opacity="0.06"/>
    <stop offset="50%" stop-color="#38BDF8" stop-opacity="0.55"/>
    <stop offset="55%" stop-color="#0EA5E9" stop-opacity="0.06"/>
    <stop offset="100%" stop-color="#7C3AED" stop-opacity="0"/>
  </linearGradient>
  <pattern id="scanlinesLight" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="4" height="1" fill="#334155" opacity="0.035"/>
  </pattern>
  <mask id="revealMaskLight" maskUnits="userSpaceOnUse" x="0" y="0" width="1180" height="620">
    <rect x="0" y="0" width="1180" height="0" fill="#fff">
      <animate attributeName="height" from="0" to="560" dur="2.6s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1"/>
    </rect>
  </mask>
  <clipPath id="lc0"><rect x="500" y="26.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="0.75s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc1"><rect x="500" y="50.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="0.86s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc2"><rect x="500" y="72.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="0.98s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc3"><rect x="500" y="94.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.09s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc4"><rect x="500" y="116.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.21s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc5"><rect x="500" y="138.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.32s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc6"><rect x="500" y="160.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.44s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc7"><rect x="500" y="182.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.55s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc8"><rect x="500" y="204.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.67s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc9"><rect x="500" y="226.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.78s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc10"><rect x="500" y="248.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="1.90s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc11"><rect x="500" y="270.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.02s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc12"><rect x="500" y="292.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.13s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc13"><rect x="500" y="314.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.25s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc14"><rect x="500" y="336.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.36s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc15"><rect x="500" y="358.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.48s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc16"><rect x="500" y="380.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.59s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc17"><rect x="500" y="402.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.71s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc18"><rect x="500" y="424.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.82s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc19"><rect x="500" y="446.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="2.94s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc20"><rect x="500" y="468.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="3.05s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc21"><rect x="500" y="490.00" width="0" height="24"><animate attributeName="width" from="0" to="655" dur="0.38s" begin="3.17s" fill="freeze"/></rect></clipPath>
  <style>
    .ascii  {{ font-family: 'Courier New', Consolas, monospace; font-size: 7.4px; fill: url(#asciiGradLight); letter-spacing: -0.2px; }}
    .key    {{ font-family: 'Courier New', Consolas, monospace; font-size: 14.5px; fill: #0284C7; font-weight: bold; }}
    .value  {{ font-family: 'Courier New', Consolas, monospace; font-size: 14.5px; fill: #0F172A; }}
    .cc     {{ font-family: 'Courier New', Consolas, monospace; font-size: 14.5px; fill: #94A3B8; }}
    .head   {{ font-family: 'Courier New', Consolas, monospace; font-size: 16.5px; fill: #6D28D9; font-weight: bold; }}
    .accent {{ font-family: 'Courier New', Consolas, monospace; font-size: 14.5px; fill: #059669; font-weight: bold; }}
    text, tspan {{ white-space: pre; }}
    
    .term-label {{ font-family: 'Courier New', Consolas, monospace; font-size: 12px; fill: #475569; letter-spacing: 0.5px; }}
    .scan-label {{ font-family: 'Courier New', Consolas, monospace; font-size: 10px; fill: #DC2626; letter-spacing: 1px; }}
    .panel-title {{ font-family: 'Courier New', Consolas, monospace; font-size: 11px; fill: #0284C7; letter-spacing: 2px; opacity: 0.85; font-weight: bold; }}
    .cursor-blink {{ fill: #0284C7; }}
  </style>
</defs>

<rect width="1180" height="610" rx="18" fill="url(#bgGlowLight)"/>

<!-- Terminal Header Bar -->
<circle cx="50" cy="22" r="5.5" fill="#EF4444"/>
<circle cx="68" cy="22" r="5.5" fill="#F59E0B"/>
<circle cx="86" cy="22" r="5.5" fill="#10B981"/>

<text x="590" y="26" text-anchor="middle" class="term-label">abhishek@devos ~ % ./profile.sh --live</text>

<g id="scan-badge">
  <circle cx="1066" cy="22" r="4" fill="#DC2626">
    <animate attributeName="opacity" values="1;0.2;1" dur="1.1s" repeatCount="indefinite"/>
  </circle>
  <text x="1076" y="26" class="scan-label">SCANNING</text>
</g>

<!-- Panels -->
<g transform="translate(0,38)">
  <rect x="14" y="26" width="488" height="468" rx="14" fill="#FFFFFF" fill-opacity="0.75" stroke="url(#borderGradLight)" stroke-width="1.2" opacity="0.6"/>
  <rect x="508" y="10" width="655" height="500" rx="14" fill="#FFFFFF" fill-opacity="0.75" stroke="url(#borderGradLight)" stroke-width="1.2" opacity="0.6"/>
  <text x="30" y="24" class="panel-title">VISUAL.MAP</text>
  <text x="524" y="24" class="panel-title">SYSTEM.INFO</text>

  <g mask="url(#revealMaskLight)">
    <text x="30" y="0" class="ascii">
{ascii_xml}
    </text>
  </g>

  <!-- Right Panel: SYSTEM.INFO -->
  <g clip-path="url(#lc0)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="42" class="head">abhishek@devos</tspan><tspan class="cc"> -——————————————————————————————————————————-—-</tspan></text></g>
  <g clip-path="url(#lc1)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="66" class="cc">. </tspan><tspan class="key">Subject</tspan><tspan class="cc">: .................. </tspan><tspan class="value">Abhishek Bhatnagar</tspan></text></g>
  <g clip-path="url(#lc2)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="88" class="cc">. </tspan><tspan class="key">Role</tspan><tspan class="cc">: ..................... </tspan><tspan class="value">Lead BA &amp; Product Manager (FinTech)</tspan></text></g>
  <g clip-path="url(#lc3)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="110" class="cc">. </tspan><tspan class="key">Origin</tspan><tspan class="cc">: ................... </tspan><tspan class="value">Mumbai &amp; Delhi NCR, India</tspan></text></g>
  <g clip-path="url(#lc4)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="132" class="cc">. </tspan><tspan class="key">Domain</tspan><tspan class="cc">: ................... </tspan><tspan class="value">BFSI • Digital Banking &amp; Lending</tspan></text></g>
  <g clip-path="url(#lc5)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="154" class="cc">. </tspan><tspan class="key">Focus</tspan><tspan class="cc">: .................... </tspan><tspan class="value">LOS/LMS • Underwriting • 100-pt RAM</tspan></text></g>
  <g clip-path="url(#lc6)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="176" class="cc">. </tspan><tspan class="key">ToolChain</tspan><tspan class="cc">: ................ </tspan><tspan class="value">JIRA, Confluence, Figma, Postman, Git</tspan></text></g>
  <g clip-path="url(#lc7)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="198" class="cc">. </tspan></text></g>
  <g clip-path="url(#lc8)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="220" class="cc">. </tspan><tspan class="key">Core</tspan><tspan class="cc">.</tspan><tspan class="key">Banking</tspan><tspan class="cc">: ............. </tspan><tspan class="value">Digital Lending, CAM, MPBF, LOS/LMS</tspan></text></g>
  <g clip-path="url(#lc9)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="242" class="cc">. </tspan><tspan class="key">Core</tspan><tspan class="cc">.</tspan><tspan class="key">Product</tspan><tspan class="cc">: ............. </tspan><tspan class="value">PRDs, BRDs, User Journeys, Backlogs</tspan></text></g>
  <g clip-path="url(#lc10)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="264" class="cc">. </tspan><tspan class="key">Core</tspan><tspan class="cc">.</tspan><tspan class="key">APIs</tspan><tspan class="cc">: ................ </tspan><tspan class="value">REST, Webhooks, Banking Gateways</tspan></text></g>
  <g clip-path="url(#lc11)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="286" class="cc">. </tspan><tspan class="key">Core</tspan><tspan class="cc">.</tspan><tspan class="key">Apps</tspan><tspan class="cc">: ................ </tspan><tspan class="value">Flutter, Dart, TypeScript, Node.js</tspan></text></g>
  <g clip-path="url(#lc12)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="308" class="cc">. </tspan><tspan class="key">Core</tspan><tspan class="cc">.</tspan><tspan class="key">Security</tspan><tspan class="cc">: ............ </tspan><tspan class="value">Zero-Telemetry, RBAC, Encryption</tspan></text></g>
  <g clip-path="url(#lc13)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="330" class="cc">. </tspan></text></g>
  <g clip-path="url(#lc14)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="352" class="accent">- Contact</tspan><tspan class="cc"> -————————————————————————————————————————————-—-</tspan></text></g>
  <g clip-path="url(#lc15)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="374" class="cc">. </tspan><tspan class="key">Grid</tspan><tspan class="cc">.</tspan><tspan class="key">Mail</tspan><tspan class="cc">: ................ </tspan><tspan class="value">abhi.bhatnagar.official@gmail.com</tspan></text></g>
  <g clip-path="url(#lc16)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="396" class="cc">. </tspan><tspan class="key">Grid</tspan><tspan class="cc">.</tspan><tspan class="key">Portfolio</tspan><tspan class="cc">: ........... </tspan><tspan class="value">idea-into-impact.firebaseapp.com</tspan></text></g>
  <g clip-path="url(#lc17)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="418" class="cc">. </tspan><tspan class="key">Grid</tspan><tspan class="cc">.</tspan><tspan class="key">LinkedIn</tspan><tspan class="cc">: ............ </tspan><tspan class="value">abhishek-bhatnagar-44022b131</tspan></text></g>
  <g clip-path="url(#lc18)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="440" class="cc">. </tspan><tspan class="key">Grid</tspan><tspan class="cc">.</tspan><tspan class="key">Github</tspan><tspan class="cc">: .............. </tspan><tspan class="value">bhatnagar-built</tspan></text></g>
  <g clip-path="url(#lc19)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="462" class="cc">. </tspan></text></g>
  <g clip-path="url(#lc20)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="484" class="accent">- Live Telemetry</tspan><tspan class="cc"> -————————————————————————————————————————————-—-</tspan></text></g>
  <g clip-path="url(#lc21)"><text x="520" y="0" fill="#1E293B"><tspan x="520" y="506" class="cc">. </tspan><tspan class="value">See live GitHub stats badges below in README ↓</tspan></text></g>

  <rect x="522" y="491.0" width="9" height="16" class="cursor-blink" opacity="0">
    <animate attributeName="opacity" values="0;0;1;0;1;0;1;0" keyTimes="0;0.01;0.02;0.3;0.5;0.7;0.85;1" dur="1.4s" begin="3.66s" repeatCount="indefinite"/>
  </rect>
</g>

<!-- Laser Scan Beam -->
<rect x="0" y="-70" width="1180" height="70" fill="url(#scanGradLight)" opacity="0.6" style="mix-blend-mode:multiply">
  <animateTransform attributeName="transform" type="translate" from="0 -70" to="0 680" dur="4.2s" repeatCount="indefinite"/>
</rect>

<!-- Border -->
<rect x="3" y="3" width="1174" height="604" rx="16" fill="none" stroke="url(#borderGradLight)" stroke-width="2" opacity="0.75">
  <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3.2s" repeatCount="indefinite"/>
</rect>
</svg>
'''
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated {out_path} ({len(svg_content)} bytes)")

def generate_jet_heatmap(out_path):
    colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353', '#9be9a8']
    
    import random
    random.seed(42)
    
    rects = []
    ping_targets = []
    
    for col in range(34):
        x = 20.0 + col * 14.0
        for row in range(7):
            y = 15.0 + row * 14.0
            
            weight = random.random()
            if weight < 0.22:
                c = '#161b22'
            elif weight < 0.42:
                c = '#0e4429'
            elif weight < 0.65:
                c = '#006d32'
            elif weight < 0.85:
                c = '#26a641'
            elif weight < 0.95:
                c = '#39d353'
            else:
                c = '#9be9a8'
            
            if c in ['#39d353', '#9be9a8', '#26a641'] and random.random() < 0.12 and len(ping_targets) < 14:
                ping_targets.append((x + 5.5, y + 5.5, col / 34.0))
                
            rects.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="11" height="11" rx="2" ry="2" fill="{c}"/>')
    
    grid_xml = "\n".join(rects)
    
    pings_xml = []
    for cx, cy, progress in ping_targets:
        t_start = progress
        t_peak = min(1.0, t_start + 0.018)
        pings_xml.append(f'''<circle cx="{cx:.1f}" cy="{cy:.1f}" r="0" fill="none" stroke="#56d364" stroke-width="1.6" opacity="0">
  <animate attributeName="r" dur="20s" repeatCount="indefinite" keyTimes="0;{t_start:.4f};{t_peak:.4f};1" values="0;1;9;9"/>
  <animate attributeName="opacity" dur="20s" repeatCount="indefinite" keyTimes="0;{t_start:.4f};{t_peak:.4f};1" values="0;1;1;0"/>
</circle>''')
        
    pings_combined = "\n".join(pings_xml)

    jet_svg = f'''<svg viewBox="0 0 513 170" xmlns="http://www.w3.org/2000/svg">
<rect x="0" y="0" width="513" height="170" fill="#0d1117" rx="8"/>

<!-- Twinkling Outer Starfield -->
<circle cx="8" cy="20" r="1.1" fill="#8b949e"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite"/></circle>
<circle cx="8" cy="60" r="1.1" fill="#8b949e"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite"/></circle>
<circle cx="8" cy="100" r="1.1" fill="#8b949e"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/></circle>
<circle cx="505" cy="25" r="1.1" fill="#8b949e"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite"/></circle>
<circle cx="505" cy="70" r="1.1" fill="#8b949e"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite"/></circle>
<circle cx="505" cy="110" r="1.1" fill="#8b949e"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/></circle>
<circle cx="30" cy="164" r="1.1" fill="#8b949e"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite"/></circle>
<circle cx="483" cy="164" r="1.1" fill="#8b949e"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.6s" repeatCount="indefinite"/></circle>

<!-- Contribution Grid -->
<g id="grid">
{grid_xml}
{pings_combined}
</g>

<!-- Supersonic Jet Cruiser -->
<g id="jet">
  <g transform="translate(0,0)">
    <!-- Main fuselage -->
    <polygon points="0,-16 8,6 4,3 -4,3 -8,6" fill="#38BDF8" stroke="#0284C7" stroke-width="1"/>
    <!-- Left Wing -->
    <polygon points="-8,6 -14,12 -4,7" fill="#0EA5E9"/>
    <!-- Right Wing -->
    <polygon points="8,6 14,12 4,7" fill="#0EA5E9"/>
    <!-- Canopy Glass -->
    <circle cx="0" cy="-6" r="2.2" fill="#E0F2FE"/>
    <!-- Afterburner Jet Flame -->
    <polygon points="-3,7 3,7 0,15" fill="#F59E0B">
      <animate attributeName="opacity" values="0.5;1;0.6;1" dur="0.18s" repeatCount="indefinite"/>
    </polygon>
  </g>
  <animateTransform attributeName="transform" attributeType="XML" type="translate"
    dur="20s" repeatCount="indefinite"
    keyTimes="0;0.5;1"
    values="35.00,140.00;478.00,140.00;35.00,140.00"/>
</g>
</svg>'''

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(jet_svg)
    print(f"Generated {out_path} ({len(jet_svg)} bytes)")

if __name__ == '__main__':
    base_dir = "/Users/abhi/Documents/Github/bhatnagar-built"
    bmp_path = convert_headshot_to_bmp()
    lines = generate_ascii_lines(bmp_path)
    
    generate_dark_svg(lines, os.path.join(base_dir, "dark.svg"))
    generate_light_svg(lines, os.path.join(base_dir, "light.svg"))
    generate_jet_heatmap(os.path.join(base_dir, "dist", "github-jet.svg"))
