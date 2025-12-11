import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_intensity;
  uniform float u_phase; // 0 = Calm, 1 = Chaos, 2 = Structure

  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vDisplacement;
  varying float vPhaseState;

  // --- Noise Functions ---
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Кристаллизация (Structure)
  vec3 quantize(vec3 p, float s) {
    return floor(p * s) / s;
  }

  // 4D сворачивание (Chaos)
  vec3 fold4D(vec3 p) {
    p = abs(p) - 0.4;
    if (p.x < p.y) p.xy = p.yx;
    if (p.x < p.z) p.xz = p.zx;
    if (p.y < p.z) p.yz = p.zy;
    return p;
  }

  void main() {
    vUv = uv;
    
    // Базовый шум
    float nSmooth = snoise(position * 1.5 + u_time * 0.1);
    float nChaos = snoise(fold4D(position * 2.0 + u_time * 0.4));
    
    vec3 finalPos = position;
    float disp = 0.0;

    if (u_phase < 1.0) { 
       // Фаза 1: Спокойствие -> Хаос
       float t = smoothstep(0.0, 1.0, u_phase);
       disp = mix(nSmooth * 0.2, nChaos * 0.6, t);
       finalPos = position + normal * disp;
    } else if (u_phase < 2.0) {
       // Фаза 2: Хаос -> Структура
       float t = smoothstep(0.0, 1.0, u_phase - 1.0);
       vec3 structPos = quantize(position + normal * nChaos * 0.3, 3.0);
       finalPos = mix(position + normal * nChaos * 0.6, structPos, t);
       disp = nChaos;
    } else {
       // Фаза 3: Структура -> Спокойствие
       float t = smoothstep(0.0, 1.0, u_phase - 2.0);
       vec3 structPos = quantize(position, 3.0);
       finalPos = mix(structPos, position + normal * nSmooth * 0.2, t);
       disp = mix(0.5, nSmooth * 0.2, t);
    }
    
    // Реакция на мышь
    float mouseDist = distance(uv, u_mouse);
    float interact = smoothstep(0.3, 0.0, mouseDist) * u_intensity;
    finalPos += normal * interact * 0.5;

    vDisplacement = disp;
    vNormal = normalize(normalMatrix * normal);
    vPhaseState = u_phase;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  
  varying vec3 vNormal;
  varying float vDisplacement;
  varying float vPhaseState;

  // Функция для плавного смешивания 3 цветов
  vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
      return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    vec3 normal = normalize(vNormal);
    
    // Базовые цвета OdinLab (более глубокие и спокойные)
    vec3 cDark = vec3(0.02, 0.05, 0.1); 
    vec3 cBlue = vec3(0.08, 0.15, 0.4);
    vec3 cGold = vec3(0.8, 0.6, 0.2); // Менее яркое золото
    vec3 cNeon = vec3(0.0, 0.8, 0.9); // Циан вместо кислотного неона

    // Френель (свечение по краям) - делаем мягче
    float fresnel = pow(1.0 - dot(viewDir, normal), 3.0);
    
    vec3 finalColor = cDark;
    
    // Используем sin(u_time) для бесконечно плавной пульсации внутри фаз
    float pulse = sin(u_time * 0.5) * 0.5 + 0.5;

    if (vPhaseState < 1.0) {
        // Фаза 1: Calm -> Chaos
        // Плавный градиент от синего к золоту
        float t = smoothstep(0.0, 1.0, vDisplacement * 1.5 + 0.5); 
        finalColor = mix(cBlue, cGold, t * 0.7); // Ограничиваем влияние золота
    } else if (vPhaseState < 2.0) {
        // Фаза 2: Chaos (Пик активности)
        // Здесь разрешаем немного неона, но смешиваем его с темной базой
        // Используем vDisplacement для органичности
        float chaosLevel = smoothstep(0.4, 0.8, abs(sin(vDisplacement * 8.0 + u_time)));
        
        // Кислота появляется только на пиках
        vec3 chaosColor = mix(cGold, cNeon, chaosLevel);
        finalColor = mix(cDark, chaosColor, 0.6); 
    } else {
        // Фаза 3: Structure
        // Элегантная сетка
        float grid = step(0.95, fract(vDisplacement * 15.0)); // Тонкие линии
        finalColor = mix(cBlue * 0.5, cGold, grid);
    }

    // Мягкий блик
    finalColor += cGold * fresnel * 0.3;
    
    // Общее тонирование для целостности
    finalColor = mix(finalColor, cDark, 0.2);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const FluidMaterial = shaderMaterial(
  {
    u_time: 0,
    u_mouse: new THREE.Vector2(0.5, 0.5),
    u_intensity: 0.0,
    u_phase: 0.0,
  },
  vertexShader,
  fragmentShader
);
