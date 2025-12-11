import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  uniform float u_intensity;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vDisplacement;
  varying float vCycleState;

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

  // Функция для плавного смешивания шумов
  float blendNoise(vec3 pos, float time) {
     float n1 = snoise(pos * 1.5 + time * 0.1); // Медленный, крупный (Спокойствие)
     float n2 = snoise(pos * 3.0 + time * 0.3); // Средний, динамичный
     float n3 = snoise(pos * 6.0 + time * 0.8); // Быстрый, мелкий (Хаос)
     
     // Цикличный миксер: 0..1..0..1
     // Используем медленный синус для глобального состояния
     float cycle = sin(time * 0.2) * 0.5 + 0.5; 
     
     // Смешиваем шумы на основе цикла
     return mix(n1, n3 * 0.5 + n2 * 0.3, cycle); 
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    // Глобальный цикл дыхания (0.0 - Спокойствие, 1.0 - Хаос/Структура)
    float cycle = sin(u_time * 0.2) * 0.5 + 0.5;
    vCycleState = cycle;
    
    // Вычисляем смещение
    float noiseVal = blendNoise(position, u_time);
    
    // Реакция на мышь
    float mouseDist = distance(uv, u_mouse);
    float interact = smoothstep(0.4, 0.0, mouseDist) * u_intensity;

    // Кристаллизация (Structure) появляется на пиках другого цикла
    // cos вместо sin, чтобы фазы были сдвинуты
    float structCycle = smoothstep(0.7, 1.0, cos(u_time * 0.15)); 
    
    // Применяем дискретизацию (Low Poly эффект) только когда structCycle высок
    vec3 pos = position;
    if (structCycle > 0.01) {
       float grid = 4.0;
       vec3 quantized = floor(pos * grid) / grid;
       pos = mix(pos, quantized, structCycle);
    }

    // Финальное смещение вершин
    float displacement = noiseVal + interact;
    vDisplacement = displacement; // Для цвета

    vec3 newPos = pos + normal * displacement * 0.4;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  
  varying vec3 vNormal;
  varying float vDisplacement;
  varying float vCycleState;

  void main() {
    vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
    vec3 normal = normalize(vNormal);
    
    // --- ПАЛИТРА ---
    vec3 cDark = vec3(0.01, 0.02, 0.05); 
    vec3 cBlue = vec3(0.05, 0.1, 0.4);
    vec3 cPlasma = vec3(0.5, 0.0, 1.0); // Более насыщенный индиго
    vec3 cGold = vec3(1.0, 0.8, 0.2); 

    // --- ЛОГИКА СМЕШИВАНИЯ (БЕСШОВНАЯ) ---
    // Мы используем vCycleState (синус времени) как главный миксер
    // 0.0 = Полное спокойствие
    // 1.0 = Пик Хаоса
    
    float chaosMix = smoothstep(0.2, 0.8, vCycleState); // Мягкий порог входа в хаос
    
    // 1. Базовый цвет (Спокойствие)
    // Шум влияет на цвет: синий с редкими золотыми искрами
    float calmNoise = smoothstep(0.4, 0.6, vDisplacement + 0.3);
    vec3 baseColor = mix(cDark, cBlue, 0.8);
    baseColor = mix(baseColor, cGold, calmNoise * 0.2); // +20% золота
    
    // 2. Цвет Хаоса
    // Плазма, реагирующая на искажения
    float plasmaNoise = abs(sin(vDisplacement * 8.0));
    vec3 activeColor = mix(cBlue, cPlasma, plasmaNoise);
    activeColor += cGold * smoothstep(0.9, 1.0, plasmaNoise); // Золотые пики
    
    // Смешиваем базу и хаос
    vec3 finalColor = mix(baseColor, activeColor, chaosMix);
    
    // --- УЛУЧШЕННЫЙ ФРЕНЕЛЬ ---
    // pow(..., 1.8) вместо 3.0 делает свечение шире (менее сфокусированным)
    float fresnelBase = 1.0 - dot(viewDir, normal);
    float fresnel = pow(fresnelBase, 1.8); // 1.8 = Широкое свечение
    
    // Делаем френель цветным (Золото + Плазма)
    vec3 fresnelColor = mix(cGold, cPlasma, chaosMix * 0.5);
    
    // Добавляем свечение (Additive blending)
    // Умножаем на 0.8 для яркости
    finalColor += fresnelColor * fresnel * 0.8; 
    
    // Дополнительный "Rim Light" для объема
    float rim = smoothstep(0.6, 1.0, fresnelBase);
    finalColor += vec3(1.0) * rim * 0.2;

    // Гамма-коррекция
    finalColor = pow(finalColor, vec3(0.9));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const FluidMaterial = shaderMaterial(
  {
    u_time: 0,
    u_mouse: new THREE.Vector2(0.5, 0.5),
    u_intensity: 0.0,
  },
  vertexShader,
  fragmentShader
);
