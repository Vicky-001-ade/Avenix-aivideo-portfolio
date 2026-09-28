import { Project, AIVisual, Service, ProcessStep, Testimonial } from '../types';

import heroImg from '../assets/images/hero_cinematic_visual_1790332675440.jpg';
import portraitImg from '../assets/images/about_director_portrait_1790332688831.jpg';
import fashionImg from '../assets/images/showcase_fashion_film_1790332700354.jpg';
import archImg from '../assets/images/visuals_futuristic_arch_1790332712746.jpg';
import jewelryImg from '../assets/images/jewelry_commercial_still_1790332761081.jpg';
import beautyImg from '../assets/images/beauty_serum_still_1790332774451.jpg';
import fitnessImg from '../assets/images/fitness_cyber_still_1790332786693.jpg';
import haircareImg from '../assets/images/haircare_silk_still_1790332801423.jpg';
import lifestyleImg from '../assets/images/lifestyle_pod_still_1790332813205.jpg';

export { portraitImg };

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'fashion-film-01',
    number: '01',
    title: 'AI Fashion Film: Elysium Chroma',
    category: 'AI Fashion Film',
    client: 'Maison Vesper / Paris',
    year: '2026',
    duration: '0:45',
    description: 'Cinematic fashion campaign created with AI-generated characters, architectural environments and physical cloth simulation motion.',
    longDescription: 'Commissioned as a seasonal digital haute-couture premiere, Elysium Chroma synthesizes fluid chrome drapery, brutalist spatial lighting, and photorealistic AI talent. Rendered with custom LoRA conditioning and temporal frame-blending, the piece achieved cinematic consistency previously thought impossible in synthetic cinematography.',
    image: fashionImg,
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    tools: ['Runway Gen-3 Alpha', 'Midjourney v6.1', 'Premiere Pro', 'ComfyUI'],
    aspectSpan: 'col-span-12 lg:col-span-8',
    metrics: '+4.2M Organic Impressions · 88% Brand Recall',
    directorNote: 'The breakthrough was treating AI not as a filter, but as a virtual stage. Every light source in the brutalist atrium was locked to 4500K tungsten with an anamorphic 2.39:1 crop.',
    promptExcerpt: 'hyper-detailed avant-garde Haute Couture model walking through monumental concrete rotunda, iridescent liquid mercury flowing gown, anamorphic 35mm lens flare, blue hour twilight volumetric fog'
  },
  {
    id: 'beauty-campaign-02',
    number: '02',
    title: 'AI Beauty Campaign: Luminescent Dew',
    category: 'AI Beauty Campaign',
    client: 'Aura Botanica',
    year: '2026',
    duration: '0:30',
    description: 'Micro-cinematography beauty commercial focusing on bioluminescent botanicals and hyper-detailed skin texture.',
    longDescription: 'Created for an eco-luxury skincare debut, this commercial captures micro-droplet diffusion, authentic human skin pores without plastic artifacts, and sub-surface scattering through frosted laboratory glass.',
    image: beautyImg,
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    tools: ['FLUX.1 Pro', 'Kling AI 1.5', 'CapCut Pro', 'DaVinci Resolve'],
    aspectSpan: 'col-span-12 lg:col-span-4',
    metrics: '3.4x CTR vs Standard Live-Action Beauty Ads',
    directorNote: 'Clean macro beauty requires sub-millimeter precision. We combined high-frequency skin textures with slow orbital camera sweeps to preserve genuine human warmth.',
    promptExcerpt: 'extreme macro commercial photography of luxury botanical facial serum bottle, glowing luminescent cyan hydration bead, clean water reflections, crisp studio rim light'
  },
  {
    id: 'jewelry-commercial-03',
    number: '03',
    title: 'AI Jewelry Commercial: Astral Platinum',
    category: 'AI Jewelry Commercial',
    client: 'Vanguard Fine Jewels',
    year: '2026',
    duration: '0:25',
    description: 'Zero-gravity commercial film capturing refractive diamond caustics and fluid metallic motion.',
    longDescription: 'A pure demonstration of zero-gravity physics and light ray refraction. We simulated custom light dispersions across 12-facet cushion cut diamonds, synchronizing the camera orbit with an orchestral score.',
    image: jewelryImg,
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    tools: ['Google Veo 2', 'Midjourney v6.1', 'After Effects', 'Splice Sound'],
    aspectSpan: 'col-span-12 lg:col-span-4',
    metrics: 'Featured on AI Creative Direction Showcase 2026',
    directorNote: 'Diamonds are notorious in AI generation for hallucinating flawed facets. We used depth maps and iterative frame anchors to guarantee razor-sharp light refractions.',
    promptExcerpt: 'flawless 8-carat diamond platinum solitaire ring suspended over deep dark pool, refracted electric blue light ripples, anamorphic crystal flare, cinematic slow motion'
  },
  {
    id: 'product-film-04',
    number: '04',
    title: 'AI Product Film: Nexus Chrono & Sound',
    category: 'AI Product Film',
    client: 'Kaelen Spatial Audio',
    year: '2026',
    duration: '0:40',
    description: 'Exploded-view product commercial blending acoustic wave visualizations with machined matte titanium.',
    longDescription: 'A high-impact commercial film demonstrating the internal magnetic drivers of next-generation noise-canceling headphones. Atmospheric sound waves visually deform liquid ferrofluid around the casing.',
    image: heroImg,
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    tools: ['Runway Gen-3', 'FLUX.1 Dev', 'ElevenLabs', 'Premiere Pro'],
    aspectSpan: 'col-span-12 lg:col-span-8',
    metrics: '+62% Kickstarter Funding Goal Reached in 48h',
    directorNote: 'Sound made visible: each bass kick in the edit triggers micro-vibrations in the floating liquid chrome around the ear-cups.',
    promptExcerpt: 'matte black and electric blue futuristic audiophile hardware floating in zero gravity studio, exploded internal acoustic drivers, ferrofluid droplets, cinematic commercial lighting'
  },
  {
    id: 'ugc-campaign-05',
    number: '05',
    title: 'AI UGC Campaign: Kinetic Velocity',
    category: 'AI UGC Campaign',
    client: 'Stride Athleticwear',
    year: '2026',
    duration: '0:20',
    description: 'High-energy organic-style UGC videos engineered with AI talent for social conversion and paid TikTok reels.',
    longDescription: 'Combining authentic hand-held phone physics with synthetic fitness talent, this UGC campaign delivered 12 distinct video variations in 3 days, outperforming conventional influencer creative by 210%.',
    image: fitnessImg,
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    tools: ['Higgsfield AI', 'CapCut Pro', 'ElevenLabs Voice Clone'],
    aspectSpan: 'col-span-12 lg:col-span-4',
    metrics: '2.1x ROAS on TikTok & Meta Reels Ads',
    directorNote: 'The secret to AI UGC is intentional imperfection: natural micro-shakes, realistic ambient room reverb, and authentic human cadence.',
    promptExcerpt: 'first-person POV runner unboxing high-performance carbon-plated running shoes, dynamic city street daylight, handheld mobile camera authentic motion'
  },
  {
    id: 'haircare-campaign-08',
    number: '06',
    title: 'AI Haircare Campaign: Silk Metamorphosis',
    category: 'AI Haircare Campaign',
    client: 'Kératine Paris',
    year: '2026',
    duration: '0:28',
    description: 'Fluid simulation campaign illustrating microscopic hair cuticle repair into mirror-gloss sapphire strands.',
    longDescription: 'Visualizing bond-building science: damaged hair strands seamlessly transform into liquid silk waves under laboratory blue rim lights. Clean, editorial, and scientifically convincing.',
    image: haircareImg,
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    tools: ['FLUX.1 Pro', 'Kling AI 1.5', 'Premiere Pro'],
    aspectSpan: 'col-span-12 lg:col-span-4',
    metrics: '89% Consumer Trust Index Rating',
    directorNote: 'Bridging pharmaceutical precision with luxury cosmetics. Every individual hair strand reacts to a virtual wind turbine with zero jitter.',
    promptExcerpt: 'macro cinematography of glossy brunette hair transforming into liquid sapphire silk ribbons, water droplets dispersing, electric blue backlighting, 8k commercial'
  },
  {
    id: 'lifestyle-film-09',
    number: '07',
    title: 'AI Lifestyle Film: Nocturne Sanctuary',
    category: 'AI Lifestyle Film',
    client: 'Nordic Living Residences',
    year: '2026',
    duration: '0:50',
    description: 'Atmospheric architectural mood film exploring biophilic Scandinavian coastal retreats at dusk.',
    longDescription: 'An evocative slow-cinema exploration of cantilevered seaside glass architecture. Raindrops gently strike panoramic ocean-view windows while subtle electric blue floor lighting warms the interior.',
    image: lifestyleImg,
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    tools: ['Google Veo 2', 'Midjourney v6.1', 'Premiere Pro'],
    aspectSpan: 'col-span-12 lg:col-span-4',
    metrics: '$18M in Pre-Sale Architectural Inquiries',
    directorNote: 'A meditation on quiet luxury. We prioritized stillness, rain audio, and subtle light shifts over fast cuts to evoke profound calm.',
    promptExcerpt: 'cinematic wide angle shot of minimalist Scandinavian architectural pavilion overlooking stormy dark ocean, wet glass reflections, subtle blue floor seam lighting, 35mm film grain'
  }
];

export const AI_VISUALS_GALLERY: AIVisual[] = [
  {
    id: 'vis-01',
    title: 'Biophilic Horizon Pavilion',
    category: 'Architecture',
    image: archImg,
    aspectClass: 'aspect-[4/3]',
    dimensions: '4096 × 3072',
    tools: 'Midjourney v6.1 · Upscale Pro',
    prompt: 'futuristic biophilic cantilevered pavilion over black water, glowing blue geometric fissures, overcast dusk atmosphere, 35mm lens, architectural digest',
    lightingSetup: 'Ambient twilight + 450nm cobalt neon interior accent'
  },
  {
    id: 'vis-02',
    title: 'Liquid Platinum High Jewelry',
    category: 'Product',
    image: jewelryImg,
    aspectClass: 'aspect-[16/9]',
    dimensions: '5120 × 2880',
    tools: 'Google Veo 2 · FLUX.1 Pro',
    prompt: 'macro photograph of floating diamond engagement ring in zero gravity, refracted caustic blue light ripples, 8k luxury commercial',
    lightingSetup: 'Tungsten key light + underwater blue refractive caustics'
  },
  {
    id: 'vis-03',
    title: 'Haute Couture Monolith',
    category: 'Fashion',
    image: fashionImg,
    aspectClass: 'aspect-[16/9]',
    dimensions: '3840 × 2160',
    tools: 'Runway Gen-3 · Midjourney v6.1',
    prompt: 'avant-garde fashion model draped in fluid chrome and cobalt silk, brutalist concrete atrium, volumetric blue morning mist',
    lightingSetup: 'High-contrast directional window beam + soft blue fill'
  },
  {
    id: 'vis-04',
    title: 'Bioluminescent Serum Core',
    category: 'Beauty',
    image: beautyImg,
    aspectClass: 'aspect-[4/3]',
    dimensions: '3072 × 2304',
    tools: 'FLUX.1 Pro · ComfyUI',
    prompt: 'frosted cosmetic serum dropper bottle with bioluminescent organic cyan droplets, clean clinical aesthetic, studio macro still',
    lightingSetup: 'Diffused top softbox + internal fluorescent backlight'
  },
  {
    id: 'vis-05',
    title: 'Velocitas Cybernetic Sprint',
    category: 'Character',
    image: fitnessImg,
    aspectClass: 'aspect-[16/9]',
    dimensions: '3840 × 2160',
    tools: 'Runway Gen-3 · Kling AI',
    prompt: 'dynamic sprinter in sleek technical aerodynamic apparel, dark stadium, high power electric blue volumetric floodlights',
    lightingSetup: 'Backlit stadium spots + floor haze dispersion'
  },
  {
    id: 'vis-06',
    title: 'Zero-G Fragrance Genesis',
    category: 'Product',
    image: heroImg,
    aspectClass: 'aspect-[16/9]',
    dimensions: '3840 × 2160',
    tools: 'Midjourney v6.1 · FLUX Dev',
    prompt: 'futuristic luxury fragrance bottle floating in zero gravity surrounded by swirling liquid metal and water droplets, blue rim light',
    lightingSetup: 'Dual side rim strips + subtle anamorphic streak'
  },
  {
    id: 'vis-07',
    title: 'Sapphire Wave Metamorphosis',
    category: 'Experimental',
    image: haircareImg,
    aspectClass: 'aspect-[4/3]',
    dimensions: '3072 × 2304',
    tools: 'Kling AI 1.5 · Stable Diffusion XL',
    prompt: 'extreme close up flowing dark silk hair ribbon, sapphire tint, micro water dispersion, 8k beauty editorial still',
    lightingSetup: 'Cool 6500K key light with 460nm blue gel backlight'
  },
  {
    id: 'vis-08',
    title: 'Nocturne Seaside Sanctuary',
    category: 'Lifestyle',
    image: lifestyleImg,
    aspectClass: 'aspect-[16/9]',
    dimensions: '3840 × 2160',
    tools: 'Google Veo 2 · Photoshop Neural',
    prompt: 'luxury architectural room overlooking stormy dark ocean at night, rain on glass, subtle blue floor perimeter lighting',
    lightingSetup: 'Low-key interior mood lighting with dusk ocean ambient'
  }
];

export const SERVICES: Service[] = [
  {
    number: '01',
    title: 'AI Video Production',
    description: 'Cinematic AI-generated videos designed for brands, campaigns and social media. From multi-scene brand films to high-conversion product trailers.',
    deliverables: ['Full 4K Video Masters', 'Horizontal 16:9 & Vertical 9:16 Cuts', 'Sound Design & Sync Music', 'Color Grading & Film Grain'],
    typicalTimeline: '1 to 2 Weeks'
  },
  {
    number: '02',
    title: 'AI Commercials',
    description: 'High-impact product and brand commercials built with AI. Zero physical location constraints, infinite creative freedom, cinema-level output.',
    deliverables: ['Custom Storyboards & Animatics', 'Photorealistic Synthetic Talent', 'Impossible VFX & Physics', 'Broadcast / Web Ready Deliverables'],
    typicalTimeline: '2 to 3 Weeks'
  },
  {
    number: '03',
    title: 'AI Product Videos',
    description: 'Cinematic product visuals and advertising content. Zero-gravity reveals, exploded hardware views, macro fluid simulations and dynamic lighting.',
    deliverables: ['CAD / Concept-to-Video Synthesis', 'Fluid & Material Simulations', 'Product Macro Stills & Loops', 'Turnkey E-commerce Cutdowns'],
    typicalTimeline: '1 to 2 Weeks'
  },
  {
    number: '04',
    title: 'AI UGC & Social Content',
    description: 'AI-powered UGC-style content for social campaigns and paid ads. Engineered to blend organic creator authenticity with high-converting hooks.',
    deliverables: ['Multiple Hook Variations', 'Hyper-Realistic Voice Clones', 'Subtitled Vertical Assets', 'A/B Testing Content Matrix'],
    typicalTimeline: '4 to 7 Days'
  },
  {
    number: '05',
    title: 'AI Image Generation',
    description: 'Premium AI-generated product, fashion and lifestyle imagery. Bespoke LoRA models trained on brand guidelines to maintain flawless visual identity.',
    deliverables: ['Ultra-Resolution 8K Image Assets', 'Custom Brand Model Fine-tuning', 'Lookbook & Editorial Spreads', 'Social Grid Packs'],
    typicalTimeline: '3 to 5 Days'
  },
  {
    number: '06',
    title: 'Creative Direction',
    description: 'Concept development, visual storytelling and creative direction for AI campaigns. Bridging the gap between raw AI tools and polished brand luxury.',
    deliverables: ['Visual Treatment Decks', 'Prompt Architecture & Styleguides', 'AI Toolchain Selection', 'Executive Creative Guidance'],
    typicalTimeline: 'Ongoing / Project-based'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Concept & Briefing',
    description: 'We deconstruct your brand narrative, target audience, visual moodboards, and core campaign objectives to establish an unshakeable creative foundation.',
    deliverable: 'Creative Treatment Deck & Tone Guide',
    activities: ['Brand aesthetic audit', 'Audience hook analysis', 'Cinematic reference curation']
  },
  {
    number: '02',
    title: 'Creative Direction & Storyboard',
    description: 'We formulate the visual language, camera movements, lighting schema, and scene-by-scene prompt blueprints before initiating synthetic generation.',
    deliverable: 'Dynamic Animatics & Prompt Architecture',
    activities: ['Scene pacing layout', 'Talent & wardrobe definition', 'Lighting & color temperature maps']
  },
  {
    number: '03',
    title: 'AI Generation & Exploration',
    description: 'Harnessing state-of-the-art models (Runway, Kling, Veo, FLUX) to generate raw cinematic plates with rigorous continuity control and character lock.',
    deliverable: 'Curated 4K Video & Visual Plates',
    activities: ['Iterative seed selection', 'Custom LoRA model integration', 'Camera path conditioning']
  },
  {
    number: '04',
    title: 'Motion, Color & Sound Polish',
    description: 'Raw AI outputs are shaped into cohesive cinema through precise editorial pacing, anamorphic lens correction, film grain, and bespoke audio design.',
    deliverable: 'Director Cut with Sound Mix',
    activities: ['Temporal deflicker & upscaling', 'Custom sound design & VO', 'Cinematic ACES color grading']
  },
  {
    number: '05',
    title: 'Final Delivery & Optimization',
    description: 'Multi-aspect exports formatted for omnichannel deployment—billboards, web, broadcast, and paid social vertical formats ready to launch.',
    deliverable: 'Master Production Suite in All Aspect Ratios',
    activities: ['16:9, 9:16, 1:1 multi-cut exports', 'Metadata & caption bundles', 'Archival source package']
  }
];

export const TOOLS_TECHNOLOGY = [
  { name: 'Seedance', category: 'Motion Generation' },
  { name: 'Runway Gen-3', category: 'Cinematography' },
  { name: 'Kling AI 1.5', category: 'Physical Simulation' },
  { name: 'Google Veo 2', category: 'Generative Video' },
  { name: 'Higgsfield', category: 'Character Motion' },
  { name: 'Midjourney v6.1', category: 'Art Direction' },
  { name: 'FLUX.1 Pro', category: 'Photorealism' },
  { name: 'Stable Diffusion', category: 'Custom LoRAs' },
  { name: 'ElevenLabs', category: 'Voice Synthesis' },
  { name: 'ChatGPT / Gemini', category: 'Narrative Scripts' },
  { name: 'Adobe Premiere Pro', category: 'Master Editorial' },
  { name: 'CapCut Pro', category: 'Social Velocity' },
  { name: 'After Effects', category: 'VFX & Clean-up' },
  { name: 'DaVinci Resolve', category: 'ACES Color Grade' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Goodluck transformed our luxury fragrance launch. The cinematic fluidity and zero-gravity realism he delivered in days would have taken a traditional VFX studio months and triple the budget.',
    author: 'Camille Laurent',
    role: 'Global Creative Director',
    company: 'Maison Vesper Paris',
    verifiedMetric: '+4.2M Organic Impressions'
  },
  {
    id: 'test-2',
    quote: 'His sense of lighting and editorial restraint sets him leagues apart from generic AI prompts. Every frame felt like an art-directed Vogue commercial. Our paid ad ROAS jumped 2.4x.',
    author: 'Marcus Vance',
    role: 'Head of Growth Marketing',
    company: 'Aura Botanica & Wellness',
    verifiedMetric: '2.4x Higher Paid ROAS'
  },
  {
    id: 'test-3',
    quote: 'Working with Ogunleye Goodluck was an eye-opener. He operates like a veteran film director who happens to command the frontier of AI tools. Seamless communication, uncompromising taste.',
    author: 'Elena Rostova',
    role: 'Chief Brand Officer',
    company: 'Kaelen Spatial Audio',
    verifiedMetric: '62% Funding in 48 Hours'
  }
];

export const STATS = [
  { label: 'Total Viewership', value: '45M+' },
  { label: 'AI Films & Assets Produced', value: '120+' },
  { label: 'Global Brand Collaborations', value: '30+' },
  { label: 'Client Retention Rate', value: '99.4%' }
];
