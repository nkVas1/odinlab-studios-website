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

  void main() {
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    vec3 normal = normalize(vNormal);
    
    // --- НОВАЯ ПАЛИТРА ODINLAB ---
    // База: Глубокая бездна
    vec3 cDark = vec3(0.01, 0.02, 0.05); 
    // Спокойствие: Благородный синий
    vec3 cBlue = vec3(0.05, 0.1, 0.3);
    // Хаос: Энергичная плазма (Индиго -> Маджента) вместо Циана
    vec3 cPlasma = vec3(0.4, 0.0, 0.8); 
    // Структура: Чистое золото
    vec3 cGold = vec3(1.0, 0.7, 0.1); 

    // Френель (свечение по краям)
    float fresnel = pow(1.0 - dot(viewDir, normal), 3.0);
    
    // Инициализация цвета
    vec3 finalColor = cDark;
    
    // Плавное смешивание фаз
    // vPhaseState меняется от 0 до 3 плавно (благодаря lerp в JS)
    
    if (vPhaseState < 1.0) {
        // --- ФАЗА 1: СПОКОЙСТВИЕ (0 -> 1) ---
        // От темного к синему с золотыми прожилками
        float t = smoothstep(0.0, 1.0, vPhaseState);
        
        // Органический шум для цвета
        float colorNoise = smoothstep(0.3, 0.7, vDisplacement + 0.5);
        
        vec3 calmColor = mix(cDark, cBlue, 0.8);
        calmColor = mix(calmColor, cGold * 0.5, colorNoise * 0.3); // Легкое золото
        
        finalColor = calmColor;
    } 
    else if (vPhaseState < 2.0) {
        // --- ФАЗА 2: ХАОС (1 -> 2) ---
        // Переход от Синего к Плазме
        float t = smoothstep(0.0, 1.0, vPhaseState - 1.0);
        
        // Агрессивное искажение цвета от смещения
        float chaosLevel = abs(sin(vDisplacement * 10.0 + u_time * 2.0));
        vec3 chaosColor = mix(cBlue, cPlasma, chaosLevel);
        
        // Вспышки золота на пиках хаоса
        chaosColor += cGold * smoothstep(0.8, 1.0, chaosLevel) * t;
        
        // Смешиваем с предыдущей фазой для плавности
        finalColor = mix(vec3(0.05, 0.1, 0.3), chaosColor, t);
    } 
    else if (vPhaseState < 3.0) {
        // --- ФАЗА 3: СТРУКТУРА (2 -> 3) ---
        // Переход от Плазмы к Золотой Сетке
        float t = smoothstep(0.0, 1.0, vPhaseState - 2.0);
        
        // Кристаллическая решетка
        float grid = step(0.92, fract(vDisplacement * 20.0));
        
        vec3 structColor = mix(cDark, cGold, grid); // Золотая сетка на темном
        structColor += cPlasma * 0.2; // Остаточное свечение плазмы
        
        // Смешиваем с хаосом
        vec3 prevChaosBase = mix(cBlue, cPlasma, 0.5);
        finalColor = mix(prevChaosBase, structColor, t);
    }
    else {
        // --- ВОЗВРАТ (3 -> 0) ---
        float t = smoothstep(0.0, 1.0, vPhaseState - 3.0);
        
        // Растворение структуры в темноту
        float grid = step(0.92, fract(vDisplacement * 20.0));
        vec3 structColor = mix(cDark, cGold, grid);
        
        finalColor = mix(structColor, cDark, t);
    }

    // Финальные штрихи
    // Добавляем "дорогой" блик
    finalColor += cGold * fresnel * 0.4;
    
    // Гамма-коррекция для сочности
    finalColor = pow(finalColor, vec3(0.9));

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
